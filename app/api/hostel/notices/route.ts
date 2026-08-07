import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_API_URL;

function getBackendUrl() {
  if (!BACKEND_URL) {
    throw new Error("BACKEND_API_URL is not configured");
  }
  return BACKEND_URL;
}

async function forwardRequest(request: Request, backendPath: string, method?: string) {
  const backendUrl = getBackendUrl();
  const authHeader = request.headers.get("authorization");
  const url = new URL(request.url);
  const query = url.search;

  const response = await fetch(`${backendUrl}${backendPath}${query}`, {
    method: method || request.method,
    headers: {
      ...(authHeader ? { Authorization: authHeader } : {}),
      "Content-Type": request.headers.get("content-type") || "application/json",
    },
    ...(method === "POST" || method === "PUT" || method === "PATCH" ? { body: await request.text() } : {}),
  });

  const responseBody = await response.text();
  return new NextResponse(responseBody, {
    status: response.status,
    headers: { "Content-Type": response.headers.get("content-type") || "application/json" },
  });
}

export async function GET(request: Request) {
  try {
    return await forwardRequest(request, "/hostel-notices");
  } catch {
    return NextResponse.json({ detail: "Backend is unreachable" }, { status: 502 });
  }
}

export async function POST(request: Request) {
  try {
    return await forwardRequest(request, "/hostel-notices", "POST");
  } catch {
    return NextResponse.json({ detail: "Backend is unreachable" }, { status: 502 });
  }
}