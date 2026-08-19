const rawBaseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export const apiBaseURL = rawBaseURL.replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message, { status = 0, code = "REQUEST_FAILED", fields = {} } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}

export async function apiFetch(path, { accessToken, ...options } = {}) {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const bodyIsFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
  if (options.body && !bodyIsFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${apiBaseURL}${path}`, {
    credentials: "include",
    ...options,
    headers,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ApiError(body?.error?.message || `Request failed with status ${response.status}`, {
      status: response.status,
      code: body?.error?.code,
      fields: body?.error?.fields,
    });
  }

  return response.status === 204 ? null : response.json();
}

export function searchRooms(filters = {}) {
  const query = new URLSearchParams({ page: "1", page_size: "20" });

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, value);
    }
  });

  return apiFetch(`/rooms?${query.toString()}`);
}
