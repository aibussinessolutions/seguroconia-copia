'use server';
/**
 * @fileOverview Summarizes an insurance policy provided as a PDF.
 *
 * - summarizePolicy - A function that handles the policy summarization process.
 * - SummarizePolicyInput - The input type for the summarizePolicy function.
 * - SummarizePolicyOutput - The return type for the summarizePolicy function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SummarizePolicyInputSchema = z.object({
  policyDataUri: z
    .string()
    .describe(
      "The insurance policy PDF, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SummarizePolicyInput = z.infer<typeof SummarizePolicyInputSchema>;

const SummarizePolicyOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the insurance policy.'),
});
export type SummarizePolicyOutput = z.infer<typeof SummarizePolicyOutputSchema>;

export async function summarizePolicy(input: SummarizePolicyInput): Promise<SummarizePolicyOutput> {
  return summarizePolicyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePolicyPrompt',
  input: {
    schema: z.object({
      policyDataUri: z
        .string()
        .describe(
          "The insurance policy PDF, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
        ),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A concise summary of the insurance policy.'),
    }),
  },
  prompt: `You are an expert insurance policy analyst.

You will receive an insurance policy document.  Please summarize the key details of the policy, including coverage, exclusions, and any important terms.

Policy Document: {{media url=policyDataUri}}`,
});

const summarizePolicyFlow = ai.defineFlow<
  typeof SummarizePolicyInputSchema,
  typeof SummarizePolicyOutputSchema
>(
  {
    name: 'summarizePolicyFlow',
    inputSchema: SummarizePolicyInputSchema,
    outputSchema: SummarizePolicyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
