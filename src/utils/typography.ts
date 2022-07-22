import linkifyHtml from "linkify-html";
import { sanitize } from "dompurify";

interface TextOptions {}

export const safeLinkifyText = (text: string, options?: TextOptions) => {
  if (!options)
    options = {
      target: { url: "_blank" },
      formatHref: {
        hashtag: (href: any) => `explore?type=TAGS&term=${href.substring(1)}`,
      },
    };
  const linkified = linkifyHtml(text, options);
  return sanitize(linkified, { ALLOWED_TAGS: ['h3','a','strong','em'] });
};
