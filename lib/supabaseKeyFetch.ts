import { createClient as createSupabaseJsClient, type SupabaseClientOptions } from '@supabase/supabase-js';

/**
 * supabase-js puts the API key in Authorization when there is no user session.
 * sb_publishable_ and sb_secret_ are not JWTs, so they stay on the apikey header.
 * A user JWT is left in place. Legacy eyJ keys are unchanged.
 */
export function fetchWithoutNewKeyBearer(inner: typeof fetch = fetch): typeof fetch {
  return (input, init) => {
    const headers = new Headers(init?.headers);
    const authorization = headers.get('Authorization');
    if (authorization) {
      const token = authorization.replace(/^Bearer\s+/i, '').trim();
      if (token.startsWith('sb_publishable_') || token.startsWith('sb_secret_')) {
        headers.delete('Authorization');
      }
    }
    return inner(input, { ...init, headers });
  };
}

export function withSbKeyFetch(options?: SupabaseClientOptions<'public'>): SupabaseClientOptions<'public'> {
  return {
    ...options,
    global: {
      ...options?.global,
      fetch: fetchWithoutNewKeyBearer(options?.global?.fetch ?? fetch),
    },
  };
}

export function createClient(url: string, key: string, options?: SupabaseClientOptions<'public'>) {
  return createSupabaseJsClient(url, key, withSbKeyFetch(options));
}
