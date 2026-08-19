import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { AuthContext } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function renderProtected(auth) {
  render(
    <AuthContext.Provider value={auth}>
      <MemoryRouter initialEntries={["/provider"]}>
        <Routes>
          <Route element={<ProtectedRoute profileType="homeowner" />}>
            <Route path="/provider" element={<h1>Homeowner dashboard</h1>} />
          </Route>
          <Route path="/auth" element={<h1>Authentication</h1>} />
          <Route path="/" element={<h1>Public home</h1>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  );
}

const baseAuth = {
  initializing: false,
  logout: vi.fn(),
};

describe("ProtectedRoute", () => {
  it("renders a protected homeowner route for a homeowner", () => {
    renderProtected({
      ...baseAuth,
      isAuthenticated: true,
      user: { profile_type: "homeowner" },
    });

    expect(screen.getByRole("heading", { name: "Homeowner dashboard" })).toBeInTheDocument();
  });

  it("redirects an unauthenticated visitor to authentication", () => {
    renderProtected({ ...baseAuth, isAuthenticated: false, user: null });

    expect(screen.getByRole("heading", { name: "Authentication" })).toBeInTheDocument();
  });

  it("redirects a renter away from homeowner routes", () => {
    renderProtected({
      ...baseAuth,
      isAuthenticated: true,
      user: { profile_type: "renter" },
    });

    expect(screen.getByRole("heading", { name: "Public home" })).toBeInTheDocument();
  });
});
