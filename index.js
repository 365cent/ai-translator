import { Ai } from './vendor/@cloudflare/ai.js';

export default {
  async fetch(request, env) {
    const ai = new Ai(env.AI);
    const url = new URL(request.url);
    const text = url.searchParams.get("text") || "";
    const lang = url.searchParams.get("lang") || "en";
    let sLang = request.headers.get('Accept-Language').substring(0, 2);
    const inputs = {
      text: text,
      source_lang: sLang,
      target_lang: lang
    };
    const response = await ai.run('@cf/meta/m2m100-1.2b', inputs);

    return Response.json({ inputs, response });
  }
};
