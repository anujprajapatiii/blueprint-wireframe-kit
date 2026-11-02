function unavailable() {
  return new Response('Service unavailable', {
    status: 503,
    headers: { 'Cache-Control': 'no-store' },
  });
}

export default {
  async fetch(request, env) {
    if (typeof env?.CANONICAL_HOST !== 'string' || !env.CANONICAL_HOST) {
      return unavailable();
    }

    if (new URL(request.url).host !== env.CANONICAL_HOST) {
      return new Response('Not found', {
        status: 404,
        headers: { 'Cache-Control': 'no-store' },
      });
    }

    if (typeof env.PROTECTED_SITE?.fetch !== 'function') {
      return unavailable();
    }

    try {
      // Preserve the URL, origin, cookies, request body, and response verbatim.
      // The protected service remains responsible for every authentication check.
      return await env.PROTECTED_SITE.fetch(request);
    } catch {
      return unavailable();
    }
  },
};
