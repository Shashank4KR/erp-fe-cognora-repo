import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_API_URL;

export async function GET(request: Request) {
  const backendUrl = BACKEND_URL;

  if (!backendUrl) {
    return NextResponse.json(
      { detail: "Server configuration error: BACKEND_API_URL is not set." },
      { status: 500 },
    );
  }

  try {
    const authHeader = request.headers.get("authorization");
    const url = new URL(request.url);
    const query = url.search;

    const response = await fetch(`${backendUrl}/hostel/maintenance/dashboard${query}`, {
      method: "GET",
      headers: {
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
    });

    const responseBody = await response.text();

    return new NextResponse(responseBody, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") || "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { detail: "Backend is unreachable. Please try again later." },
      { status: 502 },
    );
  }
}