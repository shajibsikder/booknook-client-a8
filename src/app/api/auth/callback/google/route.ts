import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");

  const host =
    req.headers.get("x-forwarded-host") ||
    req.headers.get("host") ||
    req.nextUrl.host;
  const proto =
    req.headers.get("x-forwarded-proto") ||
    (host.includes("localhost") ? "http" : "https");
  const origin = `${proto}://${host}`;

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=no_code`);
  }

  const stateRaw = searchParams.get("state");
  let returnPath = "/";
  let redirectUri = `${origin}/api/auth/callback/google`;

  if (stateRaw) {
    try {
      const decoded = JSON.parse(decodeURIComponent(stateRaw));
      if (decoded.path) returnPath = decoded.path;
      if (decoded.redirectUri) redirectUri = decoded.redirectUri;
    } catch {
      returnPath = decodeURIComponent(stateRaw);
    }
  }

  try {
    const clientId =
      process.env.GOOGLE_CLIENT_ID ||
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
      "";
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      console.error("Google token exchange error:", tokenData);
      const reason = tokenData.error || tokenData.error_description || "token_failed";
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(reason)}`);
    }

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

    const targetUrl = new URL(returnPath.startsWith("/") ? returnPath : `/${returnPath}`, origin);
    targetUrl.searchParams.set("auth_success", "true");
    targetUrl.searchParams.set("user", JSON.stringify(userPayload));

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
