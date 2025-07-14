'use server';
/**
 * @fileOverview An AI flow for generating article content.
 *
 * - generateArticleContent - A function that generates article content based on a given topic.
 * - ArticleContentInput - The input type for the generateArticleContent function.
 * - ArticleContentOutput - The return type for the generateArticleContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ArticleContentInputSchema = z.object({
  topic: z.string().describe('The topic or headline for the article to be generated.'),
});
export type ArticleContentInput = z.infer<typeof ArticleContentInputSchema>;

const ArticleContentOutputSchema = z.object({
  articleContent: z.string().describe('The generated article content in Markdown format.'),
});
export type ArticleContentOutput = z.infer<typeof ArticleContentOutputSchema>;

const generateArticleFlow = ai.defineFlow(
  {
    name: 'generateArticleFlow',
    inputSchema: ArticleContentInputSchema,
    outputSchema: ArticleContentOutputSchema,
  },
  async input => {
    const prompt = ai.definePrompt({
        name: 'articleGeneratorPrompt',
        prompt: `You are an expert content writer for a digital marketing agency called Gorilla Tech Solutions. Your task is to write a well-structured, insightful, and engaging article in Markdown format based on the provided topic.

The article should be:
- Informative and valuable to the reader.
- Structured with headings (e.g., ##, ###), lists, and bold text to improve readability.
- Written in a professional yet approachable tone.
- At least 300 words long.

Topic: {{{topic}}}

Generate the article content now.`,
    });

    const {output} = await prompt(input);
    return output!;
  }
);

export async function generateArticleContent(input: ArticleContentInput): Promise<ArticleContentOutput> {
  return generateArticleFlow(input);
}
