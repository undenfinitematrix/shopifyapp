import { createClient } from "@supabase/supabase-js";

// Provide a sensible fallback so the browser client doesn't break when
// `VITE_SUPABASE_URL` isn't set in the environment (useful for local testing).
const FALLBACK_SUPABASE_URL = "https://zsizcawrakypkqlwqrrx.supabase.co";
const FALLBACK_SUPABASE_ANON =
	"sb_publishable_KB0iGUWFn_-ll7fi-oOOMA_Q_he-529";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || FALLBACK_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
