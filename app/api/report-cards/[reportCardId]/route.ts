import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ reportCardId: string }> },
) {
  const backendUrl = process.env.BACKEND_API_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { detail: "Server configuration error: BACKEND_API_URL is not set." },
      { status: 500 },
    );
  }

  try {
    const { reportCardId } = await params;
    const authHeader = request.headers.get("authorization");

    const response = await fetch(
      `${backendUrl}/report-cards/${encodeURIComponent(reportCardId)}`,
      {
        method: "GET",
        headers: { ...(authHeader ? { Authorization: authHeader } : {}) },
      },
    );

    const responseBody = await response.text();
    return new Response(responseBody || null, {
      status: response.status,
      headers: { "Content-Type": response.headers.get("content-type") || "application/json" },
    });
  } catch {
    return NextResponse.json(
      { detail: "Backend is unreachable. Please try again later." },
      { status: 502 },
    );
  }
}
