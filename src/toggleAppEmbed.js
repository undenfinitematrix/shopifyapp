// Programmatically enable/disable the WhatsApp widget app embed
// in the merchant's active theme via the Shopify Admin REST API.
// Uses App Bridge's shopify: URL scheme for auto-authentication.

const API_VERSION = "2026-01";

function isEmbedded() {
  try {
    return typeof window !== "undefined" && window.location !== window.parent.location;
  } catch {
    return true;
  }
}

export async function toggleAppEmbed(enable) {
  if (!isEmbedded()) return;

  try {
    // 1. Get the main (published) theme
    const themesRes = await fetch(
      `shopify:admin/api/${API_VERSION}/themes.json?role=main`
    );
    if (!themesRes.ok) return;
    const { themes } = await themesRes.json();
    if (!themes || !themes.length) return;
    const themeId = themes[0].id;

    // 2. Read the theme's settings_data.json
    const assetRes = await fetch(
      `shopify:admin/api/${API_VERSION}/themes/${themeId}/assets.json?asset[key]=config/settings_data.json`
    );
    if (!assetRes.ok) return;
    const { asset } = await assetRes.json();
    const settings = JSON.parse(asset.value);

    const current = settings.current;
    if (!current) return;
    if (!current.blocks) current.blocks = {};

    // 3. Find existing app embed block (search for whatsapp-chat-widget in type)
    let blockKey = null;
    for (const [key, block] of Object.entries(current.blocks)) {
      if (block.type && block.type.includes("whatsapp-chat-widget")) {
        blockKey = key;
        break;
      }
    }

    if (blockKey) {
      // Toggle the existing block
      const alreadyEnabled = !current.blocks[blockKey].disabled;
      if (alreadyEnabled === enable) return; // already in desired state
      current.blocks[blockKey].disabled = !enable;
    } else if (enable) {
      // Block doesn't exist yet — add it
      // Generate a random key for the block
      const newKey = crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36);

      // Get the app handle from Shopify
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
      if (!gqlRes.ok) return;
      const gqlData = await gqlRes.json();
      const appHandle = gqlData?.data?.app?.handle;
      if (!appHandle) return;

      // Extension UID from shopify.extension.toml
      const extensionUid = "09cdb58d-960f-56ae-dfdb-d771ce4a4f72e8e7222c";

      current.blocks[newKey] = {
        type: `shopify://apps/${appHandle}/blocks/whatsapp-chat-widget/${extensionUid}`,
        disabled: false,
        settings: {},
      };
    } else {
      // Block doesn't exist and we want to disable — nothing to do
      return;
    }

    // 4. Save the modified settings back
    await fetch(
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
  } catch (err) {
    // Silently fail — don't break the save flow
    console.warn("[AeroChat] Could not toggle app embed:", err.message);
  }
}
