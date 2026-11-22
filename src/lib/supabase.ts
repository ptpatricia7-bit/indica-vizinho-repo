import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_PUBLIC_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY as string | undefined;

// Só a chave pública (publishable/anon) é usada aqui. Nunca coloque a chave secret no site.
export const supabaseReady = Boolean(url && key);
export const supabase = supabaseReady ? createClient(url as string, key as string) : null;
