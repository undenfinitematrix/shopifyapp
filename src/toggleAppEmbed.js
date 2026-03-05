// Auto-enable the WhatsApp widget app embed on the storefront.
// Uses two strategies:
// 1. Programmatic: modify theme settings via Shopify Admin REST API
// 2. Fallback: redirect merchant to theme editor (one-time setup)

const API_VERSION = "2026-01";

// User's app embed details
const APP_EMBED_ID = "91a601ccfdb968f5a7c7f807cea66999/whatsapp-widget";

let hasRedirected = false;

function isEmbedded() {
  try {
    return typeof window !== "undefined" && window.location !== window.parent.location;
  } catch {
    return true;
  }
}

export async function toggleAppEmbed(enable, shopDomain) {
  const embedded = isEmbedded();
  console.log("[AeroChat] Step 1: called", { enable, shopDomain, embedded });
  alert("[AeroChat] toggleAppEmbed called: enable=" + enable + " shopDomain=" + shopDomain + " embedded=" + embedded);

  if (!embedded) {
    alert("[AeroChat] STOPPED: not embedded in Shopify iframe");
    return;
  }
  if (!enable) {
    alert("[AeroChat] STOPPED: enable is false");
    return;
  }

  // Build redirect URL from shopDomain (e.g. "aerochat-ai-2.myshopify.com" → "aerochat-ai-2")
  const storeHandle = shopDomain ? shopDomain.replace(/\.myshopify\.com$/, "") : "";

  // Strategy 1: Try programmatic Theme API approach
  try {
    alert("[AeroChat] Step 2: fetching themes...");
    const themesRes = await fetch(
      `shopify:admin/api/${API_VERSION}/themes.json?role=main`
    );
    if (!themesRes.ok) throw new Error("themes fetch failed: " + themesRes.status);
    const { themes } = await themesRes.json();
    if (!themes || !themes.length) throw new Error("no main theme found");
    const themeId = themes[0].id;
    alert("[AeroChat] Step 3: got theme id=" + themeId);

    const assetRes = await fetch(
      `shopify:admin/api/${API_VERSION}/themes/${themeId}/assets.json?asset[key]=config/settings_data.json`
    );
    if (!assetRes.ok) throw new Error("asset fetch failed: " + assetRes.status);
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

    alert("[AeroChat] Step 4: blockKey=" + blockKey + " (null means block not in theme)");

    if (blockKey) {
      if (!current.blocks[blockKey].disabled) {
        alert("[AeroChat] Block already enabled, nothing to do");
        return;
      }
      current.blocks[blockKey].disabled = false;
    } else {
      throw new Error("app embed block not in theme yet");
    }

    alert("[AeroChat] Step 5: saving modified theme settings...");
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
    if (!putRes.ok) throw new Error("asset save failed: " + putRes.status);
    alert("[AeroChat] SUCCESS: widget enabled programmatically!");
    return;
  } catch (err) {
    console.warn("[AeroChat] Programmatic toggle failed:", err.message);
    alert("[AeroChat] Strategy 1 FAILED: " + err.message + " → trying redirect...");
  }

  // Strategy 2: Redirect to theme editor (one-time, only once per session)
  alert("[AeroChat] Step 6: redirect fallback. storeHandle=" + storeHandle + " hasRedirected=" + hasRedirected);
  if (!hasRedirected) {
    hasRedirected = true;
    if (window.top && storeHandle) {
      const url = `https://admin.shopify.com/store/${storeHandle}/themes/current/editor?context=apps&appEmbed=${APP_EMBED_ID}`;
      alert("[AeroChat] Redirecting to: " + url);
      window.top.location.href = url;
    } else {
      alert("[AeroChat] STOPPED: cannot redirect. window.top=" + !!window.top + " storeHandle=" + storeHandle);
    }
  }
}
