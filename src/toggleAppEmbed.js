// Auto-enable the WhatsApp widget app embed on the storefront.
// Uses two strategies:
// 1. Programmatic: modify theme settings via Shopify Admin REST API
// 2. Fallback: redirect merchant to theme editor (one-time setup)

const API_VERSION = "2026-01";

const APP_EMBED_ID = "91a601ccfdb968f5a7c7f807cea66999/whatsapp-widget";

let hasRedirected = false;

function isEmbedded() {
  try {
    return typeof window !== "undefined" && window.location !== window.parent.location;
  } catch {
    return true;
  }
}

function getStoreHandle(shopDomain) {
  // "aerochat-ai-2.myshopify.com" → "aerochat-ai-2"
  if (!shopDomain) return "";
  return shopDomain.replace(/\.myshopify\.com$/, "");
}

export async function toggleAppEmbed(enable, shopDomain) {
  console.log("[AeroChat] toggleAppEmbed called:", { enable, shopDomain, isEmbedded: isEmbedded() });
  if (!isEmbedded()) return;
  if (!enable) return;

  // Strategy 1: Try programmatic Theme API approach
  try {
    const themesRes = await fetch(
      `shopify:admin/api/${API_VERSION}/themes.json?role=main`
    );
    if (!themesRes.ok) throw new Error("themes fetch failed");
    const { themes } = await themesRes.json();
    if (!themes || !themes.length) throw new Error("no main theme");
    const themeId = themes[0].id;

    const assetRes = await fetch(
      `shopify:admin/api/${API_VERSION}/themes/${themeId}/assets.json?asset[key]=config/settings_data.json`
    );
    if (!assetRes.ok) throw new Error("asset fetch failed");
    const { asset } = await assetRes.json();
    const settings = JSON.parse(asset.value);

    const current = settings.current;
    if (!current) throw new Error("no current settings");
    if (!current.blocks) current.blocks = {};

    // Find existing app embed block
    let blockKey = null;
    for (const [key, block] of Object.entries(current.blocks)) {
      if (
        block.type &&
        (block.type.includes("whatsapp-chat-widget") ||
          block.type.includes("whatsapp-widget"))
      ) {
        blockKey = key;
        break;
      }
    }

    if (blockKey) {
      if (!current.blocks[blockKey].disabled) return; // already enabled
      current.blocks[blockKey].disabled = false;
    } else {
      // Block not found in theme — can't add programmatically, use redirect
      throw new Error("app embed block not in theme yet");
    }

    const putRes = await fetch(
      `shopify:admin/api/${API_VERSION}/themes/${themeId}/assets.json`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          asset: {
            key: "config/settings_data.json",
            value: JSON.stringify(settings),
          },
        }),
      }
    );
    if (!putRes.ok) throw new Error("asset save failed");
    console.log("[AeroChat] Programmatic toggle SUCCESS");
    return; // Success — no redirect needed
  } catch (err) {
    console.warn("[AeroChat] Programmatic toggle failed:", err.message);
  }

  // Strategy 2: Redirect to theme editor (one-time, only once per session)
  const storeHandle = getStoreHandle(shopDomain);
  console.log("[AeroChat] Falling back to redirect. storeHandle:", storeHandle, "hasRedirected:", hasRedirected);
  if (!hasRedirected && storeHandle) {
    hasRedirected = true;
    const themeEditorUrl = `https://admin.shopify.com/store/${storeHandle}/themes/current/editor?context=apps&appEmbed=${APP_EMBED_ID}`;
    console.log("[AeroChat] Redirecting to:", themeEditorUrl);
    if (window.top) {
      window.top.location.href = themeEditorUrl;
    }
  }
}
