import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  const origin = req.nextUrl.origin;

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=no_code`);
  }

  try {
    const clientId =
      process.env.GOOGLE_CLIENT_ID ||
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
      "";
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";

    // 1. Exchange authorization code for access token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: `${origin}/api/auth/callback/google`,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      console.error("Google token exchange error:", tokenData);
      return NextResponse.redirect(`${origin}/login?error=token_failed`);
    }

    // 2. Fetch user profile from Google UserInfo endpoint
    const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const profile = await userRes.json();

    const userPayload = {
      name: profile.name || "Reader",
      email: profile.email || "",
      photoURL:
        profile.picture ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          profile.name || "Reader"
        )}&background=ea580c&color=fff&size=256&bold=true`,
      role: "Reader",
    };

    const state = searchParams.get("state");
    const returnPath = state ? decodeURIComponent(state) : "/";
    const targetUrl = new URL(returnPath.startsWith("/") ? returnPath : `/${returnPath}`, origin);
    targetUrl.searchParams.set("auth_success", "true");
    targetUrl.searchParams.set("user", JSON.stringify(userPayload));

    // 3. Redirect back to app with authenticated user
    const redirectRes = NextResponse.redirect(targetUrl.toString());
    redirectRes.cookies.set("booknook_user", JSON.stringify(userPayload), {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return redirectRes;
  } catch (err) {
    console.error("Google OAuth callback exception:", err);
    return NextResponse.redirect(`${origin}/login?error=oauth_error`);
  }
}
