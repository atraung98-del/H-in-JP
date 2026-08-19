import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getCurrentUser,
  loginAccount,
  logoutAccount,
  refreshAccount,
  registerAccount,
} from "./authApi";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("authentication API", () => {
  it("sends the registration contract expected by Go", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse({ data: { id: "user-id" } }, 201),
    );
    const input = {
      email: "renter@example.com",
      password: "strong-password",
      full_name: "Example Renter",
      profile_type: "renter",
    };

    await registerAccount(input);

    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8080/api/auth/register",
      expect.objectContaining({
        body: JSON.stringify(input),
        credentials: "include",
        method: "POST",
      }),
    );
  });

  it("uses the cookie endpoints for login, refresh, and logout", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch")
      .mockImplementation(() => Promise.resolve(
        jsonResponse({ data: { access_token: "token", expires_in: 900, user: {} } }),
      ));

    await loginAccount({ email: "user@example.com", password: "password" });
    await refreshAccount();
    fetchMock.mockImplementationOnce(() => Promise.resolve(new Response(null, { status: 204 })));
    await logoutAccount();

    expect(fetchMock.mock.calls.map(([url]) => url)).toEqual([
      "http://localhost:8080/api/auth/login",
      "http://localhost:8080/api/auth/refresh",
      "http://localhost:8080/api/auth/logout",
    ]);
    for (const [, options] of fetchMock.mock.calls) {
      expect(options.credentials).toBe("include");
    }
  });

  it("adds the bearer token to the current-user request", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse({ data: { id: "user-id" } }),
    );

    await getCurrentUser("access-token");

    const headers = fetchMock.mock.calls[0][1].headers;
    expect(headers.get("Authorization")).toBe("Bearer access-token");
  });
});
