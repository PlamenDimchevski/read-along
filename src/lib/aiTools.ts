import OpenAI from 'openai';

const TOKE_LENGTH = 4;
const MAX_REQUEST_TOKEN = 2000;
const PROMPT = `Highlight the characters' speech in the given HTML text and provide the speaker name.
Return the result in the form of JSON array - [ {text: 'what the character says, the precise HTML text', speaker:'name of the speaker, if its unknown, just return unknown, soldier, servant or whatever description is possible to deduce'}].`;
const PROMPT_TOKENS = Math.round(PROMPT.length / TOKE_LENGTH);
const AVAILABLE_REQUEST_TOKENS = MAX_REQUEST_TOKEN - PROMPT_TOKENS;

export async function requestHighlight(content: string) {
   const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
   });

   const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
         {
            role: 'system',
            content: PROMPT,
         },
         { role: 'user', content: content },
      ],
      temperature: 1,
      max_tokens: 4095,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
   });

   return response?.choices?.[0]?.message || '';
}

export function breakContentToBaches(contentList: string[] | unknown[]) {
   let baches: string[] = [];
   let bach = 0;

   for (let i = 0, l = contentList.length; i < l; i++) {
      baches[bach] = (baches[bach] || '') + contentList[i];
      if (baches[bach].length / TOKE_LENGTH > AVAILABLE_REQUEST_TOKENS) {
         bach++;
         baches[bach] = contentList[i] as string;
      }
   }
   return baches;
}

export function processJSON(content: string) {
   let data = content.replace(/^```json/, '').replace(/```$/, '');
   try {
      data = JSON.parse(data);
   } catch (e) {
      console.error(' ------> ', data);
   }
   return data;
}
