import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const origin = requestUrl.origin; // ⚡️ Muy importante sacar el origen limpio

    if (!code) {
      console.warn("No code found in callback URL. Redirecting to /auth.");
      return NextResponse.redirect(`${origin}/auth`);
    }

    const supabase = createRouteHandlerClient({ cookies });
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error.message);
      return NextResponse.redirect(`${origin}/auth`);
    }

    console.log("Session exchanged successfully. Redirecting to dashboard...");
    return NextResponse.redirect(`${origin}/dashboard`);
  } catch (err) {
    console.error("Unexpected error during callback handling:", err);
    return NextResponse.redirect("https://seguroconia.com/auth");
  }
}
