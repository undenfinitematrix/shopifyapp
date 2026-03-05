// Auto-enable the WhatsApp widget app embed on the storefront.
// Strategy 1: Programmatic — modify theme settings_data.json via REST API
// Strategy 2: Fallback — redirect merchant to theme editor (one-time)

const API_VERSION = "2026-01";
const EXTENSION_UID = "09cdb58d-960f-56ae-dfdb-d771ce4a4f72e8e7222c";
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
  if (!shopDomain) return "";
  return shopDomain.replace(/\.myshopify\.com$/, "");
}

export async function toggleAppEmbed(enable, shopDomain) {
  if (!isEmbedded()) return;

  // Strategy 1: Programmatic Theme API approach (from version 7 — the working version)
  try {
    // 1. Get the main (published) theme
    const themesRes = await fetch(
      `shopify:admin/api/${API_VERSION}/themes.json?role=main`
    );
    if (!themesRes.ok) throw new Error("themes fetch failed");
    const { themes } = await themesRes.json();
    if (!themes || !themes.length) throw new Error("no main theme");
    const themeId = themes[0].id;

    // 2. Read the theme's settings_data.json
    const assetRes = await fetch(
      `shopify:admin/api/${API_VERSION}/themes/${themeId}/assets.json?asset[key]=config/settings_data.json`
    );
    if (!assetRes.ok) throw new Error("asset fetch failed");
    const { asset } = await assetRes.json();
    const settings = JSON.parse(asset.value);

    const current = settings.current;
    if (!current) throw new Error("no current settings");
    if (!current.blocks) current.blocks = {};

    // 3. Find existing app embed block
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
      // Block exists — toggle it
      const alreadyEnabled = !current.blocks[blockKey].disabled;
      if (alreadyEnabled === enable) return; // already in desired state
      current.blocks[blockKey].disabled = !enable;
    } else if (enable) {
      // Block doesn't exist — add it (this is what version 7 did)
      const newKey = crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36);

      // Get the app handle dynamically from Shopify GraphQL
      const gqlRes = await fetch(
        `shopify:admin/api/${API_VERSION}/graphql.json`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: "{ app { handle installation { id } } }",
          }),
        }
      );
      if (!gqlRes.ok) throw new Error("GraphQL fetch failed");
      const gqlData = await gqlRes.json();
      const appHandle = gqlData?.data?.app?.handle;
      if (!appHandle) throw new Error("Could not get app handle");

      current.blocks[newKey] = {
        type: `shopify://apps/${appHandle}/blocks/whatsapp-chat-widget/${EXTENSION_UID}`,
        disabled: false,
        settings: {},
      };
    } else {
      // Block doesn't exist and we want to disable — nothing to do
      return;
    }

    // 4. Save the modified settings back
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
    return; // Success — no redirect needed
  } catch (err) {
    console.warn("[AeroChat] Programmatic toggle failed:", err.message);
  }

  // Strategy 2: Redirect to theme editor (one-time fallback, only if enabling)
  if (enable && !hasRedirected) {
    hasRedirected = true;
    const storeHandle = getStoreHandle(shopDomain);
    if (window.top && storeHandle) {
      const themeEditorUrl = `https://admin.shopify.com/store/${storeHandle}/themes/current/editor?context=apps&appEmbed=${APP_EMBED_ID}`;
      window.top.location.href = themeEditorUrl;
    }
  }
}
