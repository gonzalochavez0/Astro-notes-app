import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

/** `false` when the project was built without a `.env` file. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseKey as string)
  : null;

/**
 * Renders a visible banner instead of silently failing when the credentials
 * are missing, which is the most common "blank page" cause for this app.
 */
export function notifyMissingConfig() {
  if (isSupabaseConfigured || typeof document === "undefined") return;

  const banner = document.createElement("div");
  banner.className =
    "fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-lg rounded-xl bg-red-600 px-5 py-3 text-sm text-white shadow-lg";
  banner.textContent =
    "Falta configurar Supabase: copia .env.example a .env y define PUBLIC_SUPABASE_URL y PUBLIC_SUPABASE_ANON_KEY.";
  document.body.appendChild(banner);
}
