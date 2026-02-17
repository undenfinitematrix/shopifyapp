import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  try {
    // fetch the first/only settings record
    const { data, error } = await supabase
      .from("whatsapp_settings")
      .select("*")
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows returned; that's okay, return null
      throw error;
    }

    res.status(200).json({ settings: data || null });
  } catch (err) {
    console.error(err);
    res.status(200).json({ settings: null });
  }
}
