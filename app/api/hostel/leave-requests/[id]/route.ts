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

  const response = await fetch(backendPath, {
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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    return await forwardRequest(request, `${getBackendUrl()}/hostel-leave-requests/${id}`);
  } catch {
    return NextResponse.json({ detail: "Backend is unreachable" }, { status: 502 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    return await forwardRequest(request, `${getBackendUrl()}/hostel-leave-requests/${id}`, "PUT");
  } catch {
    return NextResponse.json({ detail: "Backend is unreachable" }, { status: 502 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    return await forwardRequest(request, `${getBackendUrl()}/hostel-leave-requests/${id}`, "DELETE");
  } catch {
    return NextResponse.json({ detail: "Backend is unreachable" }, { status: 502 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const url = new URL(request.url);
    const action = url.searchParams.get("action") || "approve";
    return await forwardRequest(request, `${getBackendUrl()}/hostel-leave-requests/${id}/${action}`, "PATCH");
  } catch {
    return NextResponse.json({ detail: "Backend is unreachable" }, { status: 502 });
  }
}