import { apiFetch } from "../../lib/api";

export function registerAccount(input) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function loginAccount(input) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function refreshAccount() {
  return apiFetch("/auth/refresh", { method: "POST" });
}

export function logoutAccount() {
  return apiFetch("/auth/logout", { method: "POST" });
}

export function getCurrentUser(accessToken) {
  return apiFetch("/me", { accessToken });
}
