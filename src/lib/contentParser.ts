import { ProcessedContent } from '@/types/content';
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
