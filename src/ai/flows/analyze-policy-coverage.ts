// use server'
'use server';
/**
 * @fileOverview Analyzes an insurance policy to identify potential coverage gaps.
 *
 * - analyzePolicyCoverage - A function that analyzes the insurance policy.
 * - AnalyzePolicyCoverageInput - The input type for the analyzePolicyCoverage function.
 * - AnalyzePolicyCoverageOutput - The return type for the analyzePolicyCoverage function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnalyzePolicyCoverageInputSchema = z.object({
  policyFile: z
    .string()
    .describe(
      "The insurance policy document in PDF format, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  insuranceType: z
    .string()
    .describe(
      'The type of insurance policy (e.g., Home, Auto, Health, Life, Other).'
    ),
});
export type AnalyzePolicyCoverageInput = z.infer<
  typeof AnalyzePolicyCoverageInputSchema
>;

const AnalyzePolicyCoverageOutputSchema = z.object({
  coverageGaps: z
    .array(z.string())
    .describe('A list of potential coverage gaps identified in the policy.'),
  recommendations: z
    .array(z.string())
    .describe('Personalized recommendations to address the identified coverage gaps.'),
  summary: z.string().describe('A summary of the policy analysis.'),
});
export type AnalyzePolicyCoverageOutput = z.infer<
  typeof AnalyzePolicyCoverageOutputSchema
>;

export async function analyzePolicyCoverage(
  input: AnalyzePolicyCoverageInput
): Promise<AnalyzePolicyCoverageOutput> {
  return analyzePolicyCoverageFlow(input);
}

const analyzePolicyCoveragePrompt = ai.definePrompt({
  name: 'analyzePolicyCoveragePrompt',
  input: {
    schema: z.object({
      policyFile: z
        .string()
        .describe(
          "The insurance policy document in PDF format, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
        ),
      insuranceType: z
        .string()
        .describe(
          'The type of insurance policy (e.g., Home, Auto, Health, Life, Other).'
        ),
    }),
  },
  output: {
    schema: z.object({
      coverageGaps: z
        .array(z.string())
        .describe('A list of potential coverage gaps identified in the policy.'),
      recommendations: z
        .array(z.string())
        .describe('Personalized recommendations to address the identified coverage gaps.'),
      summary: z.string().describe('A summary of the policy analysis.'),
    }),
  },
  prompt: `You are an AI assistant specialized in analyzing insurance policies.

  Analyze the insurance policy document provided and identify potential coverage gaps based on the policy type.
  Provide personalized recommendations to address these gaps.
  Summarize the policy analysis in a concise manner.

  Insurance Type: {{{insuranceType}}}
  Policy Document: {{media url=policyFile}}

  Output the coverage gaps, recommendations, and summary in the specified format.
  `,
});

const analyzePolicyCoverageFlow = ai.defineFlow<
  typeof AnalyzePolicyCoverageInputSchema,
  typeof AnalyzePolicyCoverageOutputSchema
>(
  {
    name: 'analyzePolicyCoverageFlow',
    inputSchema: AnalyzePolicyCoverageInputSchema,
    outputSchema: AnalyzePolicyCoverageOutputSchema,
  },
  async input => {
    const {output} = await analyzePolicyCoveragePrompt(input);
    return output!;
  }
);
