import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Basic check for existence and ensure they are not the placeholder values
  if (!supabaseUrl || supabaseUrl === 'YOUR_SUPABASE_URL') {
    console.error('Error: Missing or placeholder Supabase URL. Please check NEXT_PUBLIC_SUPABASE_URL in your .env file.');
    throw new Error('Missing or placeholder Supabase environment variable: NEXT_PUBLIC_SUPABASE_URL');
  }
   // Validate URL structure
   try {
      new URL(supabaseUrl);
   } catch (e) {
       console.error(`Error validating Supabase URL: ${e instanceof Error ? e.message : String(e)}`);
       throw new Error(`Invalid Supabase environment variable: NEXT_PUBLIC_SUPABASE_URL ('${supabaseUrl}') is not a valid URL.`);
   }


  if (!supabaseAnonKey || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
     console.error('Error: Missing or placeholder Supabase Anon Key. Please check NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env file.');
    throw new Error('Missing or placeholder Supabase environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }


  // Create a supabase client on the browser with project's credentials
  // The createBrowserClient function itself might perform further validation.
  try {
      return createBrowserClient(
        supabaseUrl,
        supabaseAnonKey
      )
  } catch (error) {
      console.error("Failed to create Supabase client:", error);
      throw new Error(`Failed to initialize Supabase client. Please check your environment variables and Supabase project status. Error: ${error instanceof Error ? error.message : String(error)}`);
  }
}
