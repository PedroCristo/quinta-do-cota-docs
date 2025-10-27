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

    // ✅ Auth ok → proxy to your docs site
    return fetch("https://quinta-do-cota-docs.pages.dev", request);
  },
};
