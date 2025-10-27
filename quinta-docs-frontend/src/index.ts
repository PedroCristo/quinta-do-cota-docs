export default {
  async fetch(request, env) {
    const expected = "Basic " + btoa(`${env.BASIC_USER}:${env.BASIC_PASS}`);
    const auth = request.headers.get("Authorization");

    if (auth !== expected) {
      return new Response("Not authorized", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Quinta do Cota Docs"' },
      });
    }

    // ✅ Proxy to your Pages URL
    return fetch("https://quinta-docs.pages.dev", request);
  },
};
