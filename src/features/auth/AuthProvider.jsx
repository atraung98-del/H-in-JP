import { useCallback, useEffect, useMemo, useState } from "react";
import { apiFetch, ApiError } from "../../lib/api";
import { AuthContext } from "./AuthContext";
import {
  loginAccount,
  logoutAccount,
  refreshAccount,
  registerAccount,
} from "./authApi";

let refreshRequest;

function requestOneRefresh() {
  if (!refreshRequest) {
    refreshRequest = refreshAccount().finally(() => {
      refreshRequest = undefined;
    });
  }

  return refreshRequest;
}

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const applySessionResponse = useCallback((response) => {
    const nextSession = {
      accessToken: response.data.access_token,
      expiresAt: Date.now() + response.data.expires_in * 1000,
      user: response.data.user,
    };
    setSession(nextSession);
    return nextSession;
  }, []);

  const clearSession = useCallback(() => {
    setSession(null);
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      return applySessionResponse(await requestOneRefresh());
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        clearSession();
      }
      throw error;
    }
  }, [applySessionResponse, clearSession]);

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      try {
        const response = await requestOneRefresh();
        if (active) {
          applySessionResponse(response);
        }
      } catch (error) {
        if (!(error instanceof ApiError) || error.status !== 401) {
          console.error("Unable to restore the authentication session", error);
        }
      } finally {
        if (active) {
          setInitializing(false);
        }
      }
    }

    restoreSession();
    return () => {
      active = false;
    };
  }, [applySessionResponse]);

  const login = useCallback(
    async (credentials) => applySessionResponse(await loginAccount(credentials)),
    [applySessionResponse],
  );

  const register = useCallback(
    async (input) => {
      const registration = await registerAccount(input);
      await login({ email: input.email, password: input.password });
      return registration.data;
    },
    [login],
  );

  const logout = useCallback(async () => {
    await logoutAccount();
    clearSession();
  }, [clearSession]);

  const authenticatedFetch = useCallback(
    async (path, options = {}) => {
      let accessToken = session?.accessToken;

      if (!accessToken) {
        accessToken = (await refreshSession()).accessToken;
      }

      try {
        return await apiFetch(path, { ...options, accessToken });
      } catch (error) {
        if (!(error instanceof ApiError) || error.status !== 401) {
          throw error;
        }

        const refreshed = await refreshSession();
        return apiFetch(path, { ...options, accessToken: refreshed.accessToken });
      }
    },
    [refreshSession, session?.accessToken],
  );

  const value = useMemo(
    () => ({
      accessToken: session?.accessToken ?? null,
      authenticatedFetch,
      initializing,
      isAuthenticated: Boolean(session?.user),
      login,
      logout,
      refreshSession,
      register,
      user: session?.user ?? null,
    }),
    [authenticatedFetch, initializing, login, logout, refreshSession, register, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
