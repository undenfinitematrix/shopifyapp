import { createClient } from "@supabase/supabase-js";

const FALLBACK_URL = "https://zsizcawrakypkqlwqrrx.supabase.co";
const FALLBACK_KEY = "sb_publishable_KB0iGUWFn_-ll7fi-oOOMA_Q_he-529";

const supabase = createClient(
  process.env.SUPABASE_URL || FALLBACK_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || FALLBACK_KEY
);

const DEFAULT_SETTINGS = {
  phone: "",
  welcome_message: "Hello! How can we help you?",
  prefilled_message: "Hi, I have a question about my order",
  enabled: true,
};

export default async function handler(req, res) {
  // CORS headers so the storefront widget can call this endpoint
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  try {
    const shop = req.query.shop || "";

    if (!shop) {
      return res.status(200).json({ settings: DEFAULT_SETTINGS });
    }

    // Fetch settings for this specific shop only
    const { data, error } = await supabase
      .from("whatsapp_settings")
      .select("*")
      .eq("shop", shop)
      .order("id", { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    res.status(200).json({ settings: data || DEFAULT_SETTINGS });
  } catch (err) {
    console.error(err);
    res.status(200).json({ settings: DEFAULT_SETTINGS });
  }
}
