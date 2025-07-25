
'use server';
/**
 * @fileOverview An AI flow for generating legal page content.
 *
 * - generateLegalPage - A function that handles the legal page generation process.
 * - GenerateLegalPageInput - The input type for the generateLegalPage function.
 * - GenerateLegalPageOutput - The return type for the generateLegalPage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateLegalPageInputSchema = z.object({
  pageType: z.string().describe('The type of legal page to generate (e.g., Privacy Policy, Terms and Conditions).'),
  companyName: z.string().describe('The name of the company.'),
  websiteUrl: z.string().url().describe('The full URL of the company\'s website.'),
});
export type GenerateLegalPageInput = z.infer<typeof GenerateLegalPageInputSchema>;

const GenerateLegalPageOutputSchema = z.object({
  content: z.string().describe('The generated legal page content, formatted in HTML.'),
});
export type GenerateLegalPageOutput = z.infer<typeof GenerateLegalPageOutputSchema>;


export async function generateLegalPage(input: GenerateLegalPageInput): Promise<GenerateLegalPageOutput> {
  return generateLegalPageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLegalPagePrompt',
  input: {schema: GenerateLegalPageInputSchema},
  output: {schema: GenerateLegalPageOutputSchema},
  prompt: `You are an expert legal writer specializing in website policies. Your task is to generate a comprehensive and professionally written legal page for a company.

The page content must be formatted using simple HTML tags. Do not include <!DOCTYPE html>, <html>, <head>, or <body> tags.
- Use <h2> for main section headings.
- Use <p> for paragraphs.
- Use <ul> and <li> for bulleted lists where appropriate.
- Use <strong> for important terms.

Generate a "{{pageType}}" for the following company:
- Company Name: {{{companyName}}}
- Website URL: {{{websiteUrl}}}

Ensure the content is thorough, professional, and tailored to the specified page type. For a Privacy Policy, cover data collection, use, sharing, and user rights. For Terms and Conditions, cover user responsibilities, intellectual property, and limitations of liability. For a Disclaimer, include general information, external links, and professional advice disclaimers. For a Refund Policy, detail eligibility, process, and contact information.`,
});

const generateLegalPageFlow = ai.defineFlow(
  {
    name: 'generateLegalPageFlow',
    inputSchema: GenerateLegalPageInputSchema,
    outputSchema: GenerateLegalPageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
