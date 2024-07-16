import { ProcessedContent } from '@/types/content';
import { Character } from '@prisma/client';
import parse from 'node-html-parser';
import sanitizeHtml from 'sanitize-html';

export function processContent(content: string): ProcessedContent[] {
   const sanitizedContent: string = sanitizeHtml(content, {
      allowedTags: ['b', 'i', 'em', 'strong', 'p', 'h1'],
      allowedAttributes: {},
      allowedIframeHostnames: [],
      parser: {
         lowerCaseTags: true,
      },
   });

   return sanitizedContent.split('<h1>').reduce((chapters: ProcessedContent[], chapter: string): ProcessedContent[] => {
      if (!chapter.trim()) {
         return chapters;
      }
      const [title, content] = chapter.split('</h1>');
      return [
         ...chapters,
         {
            title,
            content,
         },
      ];
   }, []);
}

const quotePattern = /["“”]/;
export function processColoredContent(content: string): string[] | unknown[] {
   const speechesWithContext = sanitizeHtml(content, {
      allowedTags: ['p', 'em'],
      allowedAttributes: {},
      allowedIframeHostnames: [],
      parser: {
         lowerCaseTags: true,
      },
   });

   const root = parse(speechesWithContext);

   const contextText = new Set();
   const paragraphList = [...root.querySelectorAll('p')];

   for (let i = 0, l = paragraphList.length; i < l; i++) {
      if (quotePattern.test(paragraphList[i].text)) {
         contextText.add(paragraphList[i - 1]?.outerHTML);
         contextText.add(paragraphList[i].outerHTML);
         contextText.add(paragraphList[i + 1]?.outerHTML);
         continue;
      }

      if (paragraphList[i].querySelector('em')) {
         contextText.add(paragraphList[i - 1]?.outerHTML);
         contextText.add(paragraphList[i].outerHTML);
         contextText.add(paragraphList[i + 1]?.outerHTML);
      }
   }

   return [...contextText];
}

export function highlightContent(text: string, quotes: { text: string; speaker: string }[], characters: Character[]) {
   const regexQuotes = /(?:"[^"]*"|^[^"]*$)/g;
   quotes.forEach(item => {
      if (!item.text) {
         return;
      }
      if (!item.speaker) {
         return;
      }

      const speech = item.text.replace(/[“”]/gm, '"');
      const matches = speech.match(regexQuotes) || [];
      matches.forEach(quote => {
         const clearQuote = quote.replace(/"/gm, '');

         text = text.replace(
            clearQuote,
            `<span class="character tooltip inline" style="background-color: rgba(128, 128, 128, 0.6);" data-tip="${item.speaker}" data-id="null">${clearQuote}</span>`
         );
      });
   });

   return text;
}
