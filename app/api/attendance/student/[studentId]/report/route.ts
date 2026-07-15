import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ studentId: string }> },
) {
  const backendUrl = process.env.BACKEND_API_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { detail: "Server configuration error: BACKEND_API_URL is not set." },
      { status: 500 },
    );
  }

  try {
    const { studentId } = await params;
    const authHeader = request.headers.get("authorization");
    const url = new URL(`${backendUrl}/attendance/student/${studentId}/report`);
    request.headers.forEach((value, key) => {
      if (key.toLowerCase().startsWith("x-") || key.toLowerCase() === "accept") {
        url.searchParams.set(key, value);
      }
    });
    const queryString = request.url.split("?")[1] || "";
    if (queryString) {
      queryString.split("&").forEach((pair) => {
        const [k, v] = pair.split("=");
        if (k && !url.searchParams.has(k)) {
          url.searchParams.set(k, decodeURIComponent(v || ""));
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { ...(authHeader ? { Authorization: authHeader } : {}) },
    });

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
