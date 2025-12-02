'use server';
/**
 * @fileOverview An AI agent that suggests alterations for a given clothing image.
 *
 * - suggestAlterations - A function that handles the alteration suggestion process.
 * - SuggestAlterationsInput - The input type for the suggestAlterations function.
 * - SuggestAlterationsOutput - The return type for the suggestAlterations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAlterationsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the clothing item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SuggestAlterationsInput = z.infer<typeof SuggestAlterationsInputSchema>;

const SuggestAlterationsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('An array of suggested alterations.'),
});
export type SuggestAlterationsOutput = z.infer<typeof SuggestAlterationsOutputSchema>;

export async function suggestAlterations(input: SuggestAlterationsInput): Promise<SuggestAlterationsOutput> {
  return suggestAlterationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAlterationsPrompt',
  input: {schema: SuggestAlterationsInputSchema},
  output: {schema: SuggestAlterationsOutputSchema},
  prompt: `You are a professional tailor providing alteration suggestions based on a clothing item photo.

  Analyze the provided image and suggest specific alterations that would improve the garment's appearance, fit, or style.
  Focus on practical and feasible alterations.

  Respond with a list of suggestions.

  Photo: {{media url=photoDataUri}}`,
});

const suggestAlterationsFlow = ai.defineFlow(
  {
    name: 'suggestAlterationsFlow',
    inputSchema: SuggestAlterationsInputSchema,
    outputSchema: SuggestAlterationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
