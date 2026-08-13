import { NextResponse } from "next/server";

/**
 * Proxies student self-registration through Next so the browser never needs
 * direct access to the backend origin.
 */
export async function POST(request: Request) {
  const backendUrl = process.env.BACKEND_API_URL;

  if (!backendUrl) {
    return NextResponse.json(
      { detail: "Server configuration error: BACKEND_API_URL is not set." },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(`${backendUrl}/auth/register/student`, {
      method: "POST",
      headers: {
        "Content-Type": request.headers.get("content-type") ?? "application/json",
      },
      body: await request.text(),
    });

    return new NextResponse(await response.text(), {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") ?? "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { detail: "Backend is unreachable. Please try again later." },
      { status: 502 },
    );
  }
}
