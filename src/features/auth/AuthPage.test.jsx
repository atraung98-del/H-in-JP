import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AuthPage from "./AuthPage";
import { useAuth } from "./useAuth";

vi.mock("./useAuth", () => ({ useAuth: vi.fn() }));

const login = vi.fn();
const register = vi.fn();

beforeEach(() => {
  login.mockReset();
  register.mockReset();
  useAuth.mockReturnValue({
    initializing: false,
    isAuthenticated: false,
    login,
    register,
    user: null,
  });
});

function renderPage() {
  render(
    <MemoryRouter initialEntries={["/auth"]}>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/provider" element={<h1>Provider page</h1>} />
        <Route path="/" element={<h1>Home page</h1>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("AuthPage", () => {
  it("registers a homeowner using the Go request field names", async () => {
    register.mockResolvedValue({ profile_type: "homeowner" });
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: /homeowner/i }));
    await user.type(screen.getByLabelText("Full name"), "Example Owner");
    await user.type(screen.getByLabelText("Email"), "owner@example.com");
    await user.type(screen.getByLabelText("Password"), "strong-password");
    await user.click(screen.getByRole("button", { name: "Create account" }));

    expect(register).toHaveBeenCalledWith({
      email: "owner@example.com",
      password: "strong-password",
      full_name: "Example Owner",
      profile_type: "homeowner",
    });
    expect(screen.getByRole("heading", { name: "Provider page" })).toBeInTheDocument();
  });

  it("submits login credentials without a UI-selected profile type", async () => {
    login.mockResolvedValue({ user: { profile_type: "renter" } });
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("tab", { name: "Log in" }));
    await user.type(screen.getByLabelText("Email"), "renter@example.com");
    await user.type(screen.getByLabelText("Password"), "strong-password");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(login).toHaveBeenCalledWith({
      email: "renter@example.com",
      password: "strong-password",
    });
    expect(screen.getByRole("heading", { name: "Home page" })).toBeInTheDocument();
  });
});
