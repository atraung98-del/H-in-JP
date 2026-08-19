import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AuthProvider from "./AuthProvider";
import { logoutAccount, refreshAccount } from "./authApi";
import { useAuth } from "./useAuth";

vi.mock("./authApi", () => ({
  loginAccount: vi.fn(),
  logoutAccount: vi.fn(),
  refreshAccount: vi.fn(),
  registerAccount: vi.fn(),
}));

function SessionProbe() {
  const { initializing, isAuthenticated, logout, user } = useAuth();

  if (initializing) {
    return <p>Initializing</p>;
  }

  return isAuthenticated ? (
    <div>
      <p>{user.email}</p>
      <button type="button" onClick={logout}>Log out</button>
    </div>
  ) : (
    <p>Signed out</p>
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  refreshAccount.mockResolvedValue({
    data: {
      access_token: "memory-only-token",
      expires_in: 900,
      user: {
        email: "owner@example.com",
        profile_type: "homeowner",
        role: "user",
      },
    },
  });
  logoutAccount.mockResolvedValue(null);
});

describe("AuthProvider", () => {
  it("restores from the refresh cookie and clears the session on logout", async () => {
    const storageSpy = vi.spyOn(Storage.prototype, "setItem");
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <SessionProbe />
      </AuthProvider>,
    );

    expect(await screen.findByText("owner@example.com")).toBeInTheDocument();
    expect(refreshAccount).toHaveBeenCalledTimes(1);
    expect(storageSpy).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "Log out" }));

    await waitFor(() => expect(screen.getByText("Signed out")).toBeInTheDocument());
    expect(logoutAccount).toHaveBeenCalledTimes(1);
    expect(storageSpy).not.toHaveBeenCalled();
  });
});
