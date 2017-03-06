export default class BaseTranslator {
  sanitizeHTML(html) {
    const match = html.match(/<body[\s\S]*<\/body>/img);
    return match[0].replace(/<script([\s\S]*?)<\/script>/img, '')
                   .replace(/<style([\s\S]*?)<\/style>/img, '')
                   .replace(/<img([\s\S]*?)>/img, '')
                   .replace(/<video([\s\S]*?)>/img, '');
  }

  get failure() {
    return { status: 'failure' };
  }
}
