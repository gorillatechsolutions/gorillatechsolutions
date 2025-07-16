
'use server';
/**
 * @fileOverview An AI flow for generating article content, a title, and an excerpt.
 *
 * - generateArticle - A function that handles the article generation process.
 * - GenerateArticleInput - The input type for the generateArticle function.
 * - GenerateArticleOutput - The return type for the generateArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateArticleInputSchema = z.object({
  topic: z.string().describe('The topic or a suggested title for the article.'),
});
export type GenerateArticleInput = z.infer<typeof GenerateArticleInputSchema>;

const GenerateArticleOutputSchema = z.object({
  title: z.string().describe('A compelling and SEO-friendly title for the article.'),
  excerpt: z.string().describe('A concise, engaging summary of the article, around 20-40 words.'),
  articleContent: z.string().describe('The generated article content, formatted in HTML.'),
});
export type GenerateArticleOutput = z.infer<typeof GenerateArticleOutputSchema>;


export async function generateArticle(input: GenerateArticleInput): Promise<GenerateArticleOutput> {
  return generateArticleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateArticlePrompt',
  input: {schema: GenerateArticleInputSchema},
  output: {schema: GenerateArticleOutputSchema},
  prompt: `You are an expert content writer and SEO specialist. Your task is to write a high-quality, engaging, and well-structured article based on the provided topic.

First, create a compelling and SEO-friendly title based on the user's topic.
Second, write a short, engaging excerpt (20-40 words) that summarizes the article.
Then, write the main article content. The article should be formatted using simple HTML tags. Do not include <!DOCTYPE html>, <html>, <head>, or <body> tags.

- Use <h2> for main section headings.
- Use <h3> for subheadings.
- Use <p> for paragraphs.
- Use <strong> for important keywords or phrases.
- Use <ul> and <li> for bulleted lists where appropriate.

Write an article about the following topic:
"{{{topic}}}"

Generate the complete title, excerpt, and article content now.`,
});

const generateArticleFlow = ai.defineFlow(
  {
    name: 'generateArticleFlow',
    inputSchema: GenerateArticleInputSchema,
    outputSchema: GenerateArticleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
