'use server';

import { suggestAlterations, type SuggestAlterationsInput, type SuggestAlterationsOutput } from '@/ai/flows/suggest-alterations-from-image';

type ActionResult = {
  success: true;
  data: SuggestAlterationsOutput;
} | {
  success: false;
  error: string;
};

export async function getAISuggestions(input: SuggestAlterationsInput): Promise<ActionResult> {
    try {
        const result = await suggestAlterations(input);
        if (!result.suggestions || result.suggestions.length === 0) {
          return { success: true, data: { suggestions: ["Our AI tailor reviewed the image but couldn't find any clear alterations that would improve the garment. It might already be a great fit! If you still have specific concerns, feel free to contact us directly."] } };
        }
        return { success: true, data: result };
    } catch (error) {
        console.error("Error in getAISuggestions:", error);
        return { success: false, error: 'An unexpected error occurred while analyzing the image. Please try again or use a different photo.' };
    }
}
