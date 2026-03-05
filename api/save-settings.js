import { createClient } from "@supabase/supabase-js";

const FALLBACK_URL = "https://zsizcawrakypkqlwqrrx.supabase.co";
const FALLBACK_KEY = "sb_publishable_KB0iGUWFn_-ll7fi-oOOMA_Q_he-529";

const supabase = createClient(
  process.env.SUPABASE_URL || FALLBACK_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || FALLBACK_KEY
);

export default async function handler(req, res) {
  // CORS headers for embedded app
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") return res.status(405).end();

  try {
    const { phone, welcomeMessage, prefilledMessage, enabled, shop } = req.body;

    // get existing record for this shop (or global if no shop provided)
    let fetchQuery = supabase
      .from("whatsapp_settings")
      .select("id");

    if (shop) {
      fetchQuery = fetchQuery.eq("shop", shop);
    }

    const { data: existing, error: fetchError } = await fetchQuery
      .order("id", { ascending: false })
      .limit(1)
      .single();

    let result;
    if (existing && existing.id) {
      // update existing record for this shop
      const { data, error } = await supabase
        .from("whatsapp_settings")
        .update({
          phone,
          welcome_message: welcomeMessage,
          prefilled_message: prefilledMessage,
          enabled,
        })
        .eq("id", existing.id);

      if (error) throw error;
      result = data;
    } else {
      // insert new record for this shop
      const { data, error } = await supabase
        .from("whatsapp_settings")
        .insert({
          phone,
          welcome_message: welcomeMessage,
          prefilled_message: prefilledMessage,
          enabled,
          shop: shop || null,
        });

      if (error) throw error;
      result = data;
    }

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save settings" });
  }
}
