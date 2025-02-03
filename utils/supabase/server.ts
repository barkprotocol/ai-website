import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { cookies } from "next/headers";

export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase environment variables.");
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string): string | undefined {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions): void {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            console.warn(
              `[Supabase Client] Unable to set cookie '${name}': ${error}`
            );
          }
        },
        remove(name: string, options: CookieOptions): void {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            console.warn(
              `[Supabase Client] Unable to remove cookie '${name}': ${error}`
            );
          }
        },
      },
    }
  );
};
