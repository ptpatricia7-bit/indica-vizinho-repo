import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    let active = true;

    // Segurança: se o Supabase demorar a responder, não deixa a tela presa em "Carregando".
    const timer = window.setTimeout(() => {
      if (active) setLoading(false);
    }, 4000);

    // O evento INITIAL_SESSION chega logo após assinar e traz a sessão atual (ou null).
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      if (!active) return;
      setSession(next);
      setLoading(false);
    });

    return () => {
      active = false;
      window.clearTimeout(timer);
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, loading };
}
