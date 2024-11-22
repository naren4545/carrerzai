import { NextResponse } from "next/server";

async function verifyToken(token, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const [headerPayload, signature] = token.split(".");
  const verified = await crypto.subtle.verify(
    "HMAC",
    key,
    Uint8Array.from(atob(signature), (c) => c.charCodeAt(0)),
    new TextEncoder().encode(headerPayload)
  );

  if (!verified) {
    throw new Error("Invalid token");
  }

  return JSON.parse(atob(headerPayload.split(".")[1]));
}

export async function middleware(req) {
  const url = req.nextUrl.clone();
  console.log(url);
  const pintudeToken = url.searchParams.get("pintude_token");
  const secret = process.env.NEXT_PUBLIC_PINTUDE_JWT_SECRET;
console.log("Pintude token:", pintudeToken);
console.log("Secret:", secret);
  if (!pintudeToken) return NextResponse.next();

  try {
    const decoded = await verifyToken(pintudeToken, secret);
    console.log("Token verified:", decoded);

    // Set cookie and redirect
    const response = NextResponse.next();
    response.cookies.set("pintude_token", pintudeToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    // url.searchParams.delete("pintude_token");
    return NextResponse.redirect(url);
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/:path*"],
};
