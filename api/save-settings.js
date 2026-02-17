import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { phone, welcomeMessage, prefilledMessage, enabled } = req.body;

    // get existing record (should be only one since this is global settings)
    const { data: existing, error: fetchError } = await supabase
      .from("whatsapp_settings")
      .select("id")
      .limit(1)
      .single();

    let result;
    if (existing && existing.id) {
      // update existing record
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
      // insert new record
      const { data, error } = await supabase
        .from("whatsapp_settings")
        .insert({
          phone,
          welcome_message: welcomeMessage,
          prefilled_message: prefilledMessage,
          enabled,
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
