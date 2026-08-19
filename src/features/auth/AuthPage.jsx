import { useState } from "react";
import { Building2, CheckCircle, User } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "../../pages/design.css";
import { ApiError } from "../../lib/api";
import { useAuth } from "./useAuth";

const emptyForm = {
  email: "",
  fullName: "",
  password: "",
  profileType: "renter",
};

export default function AuthPage() {
  const [mode, setMode] = useState("register");
  const [form, setForm] = useState(emptyForm);
  const [fields, setFields] = useState({});
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { initializing, isAuthenticated, login, register, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!initializing && isAuthenticated) {
    const destination = user.profile_type === "homeowner" ? "/provider" : "/";
    return <Navigate to={destination} replace />;
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setFields((current) => ({ ...current, [name]: undefined }));
  }

  function selectProfileType(profileType) {
    setForm((current) => ({ ...current, profileType }));
    setFields((current) => ({ ...current, profile_type: undefined }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFields({});
    setMessage("");
    setSubmitting(true);

    try {
      let session;
      if (mode === "register") {
        await register({
          email: form.email,
          password: form.password,
          full_name: form.fullName,
          profile_type: form.profileType,
        });
        session = { profile_type: form.profileType };
      } else {
        session = (await login({ email: form.email, password: form.password })).user;
      }

      const requestedPath = location.state?.from?.pathname;
      const defaultPath = session.profile_type === "homeowner" ? "/provider" : "/";
      navigate(requestedPath || defaultPath, { replace: true });
    } catch (error) {
      if (error instanceof ApiError) {
        setFields(error.fields);
        setMessage(error.message);
      } else {
        setMessage("Unable to reach the server. Check that the Go API is running.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="desi">
      <div className="background" aria-hidden="true">
        <img src="/ChatGPT Image Jun 30, 2026, 10_48_18 AM.png" alt="" />
      </div>

      <section className="twoopt" aria-labelledby="auth-heading">
        <div className="twobtn" role="tablist" aria-label="Authentication mode">
          <button
            type="button"
            className={mode === "register" ? "signupbtn active" : "signupbtn"}
            onClick={() => setMode("register")}
            role="tab"
            aria-selected={mode === "register"}
          >
            Create account
          </button>
          <button
            type="button"
            className={mode === "login" ? "cabtn active" : "cabtn"}
            onClick={() => setMode("login")}
            role="tab"
            aria-selected={mode === "login"}
          >
            Log in
          </button>
        </div>

        <h1 id="auth-heading">{mode === "register" ? "Create your account" : "Welcome back"}</h1>

        <form className="formdata auth-form" onSubmit={handleSubmit} noValidate>
          {mode === "register" && (
            <>
              <fieldset className="profile-type-fieldset">
                <legend>I am a…</legend>
                <div className="option">
                  <button
                    type="button"
                    className={`seeker ${form.profileType === "renter" ? "active" : ""}`}
                    onClick={() => selectProfileType("renter")}
                    aria-pressed={form.profileType === "renter"}
                  >
                    <CheckCircle className="checkicon" size={24} />
                    <User size={24} />
                    <strong>Renter</strong>
                    <span>I'm looking for a place to live</span>
                  </button>
                  <button
                    type="button"
                    className={`provider ${form.profileType === "homeowner" ? "active" : ""}`}
                    onClick={() => selectProfileType("homeowner")}
                    aria-pressed={form.profileType === "homeowner"}
                  >
                    <CheckCircle className="checkicon" size={24} />
                    <Building2 size={24} />
                    <strong>Homeowner</strong>
                    <span>I want to list and rent out my property</span>
                  </button>
                </div>
                {fields.profile_type && <p className="field-error">{fields.profile_type}</p>}
              </fieldset>

              <label htmlFor="full-name">Full name</label>
              <input
                id="full-name"
                name="fullName"
                value={form.fullName}
                onChange={updateField}
                autoComplete="name"
                aria-invalid={Boolean(fields.full_name)}
                aria-describedby={fields.full_name ? "full-name-error" : undefined}
              />
              {fields.full_name && <p id="full-name-error" className="field-error">{fields.full_name}</p>}
            </>
          )}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            autoComplete="email"
            aria-invalid={Boolean(fields.email)}
            aria-describedby={fields.email ? "email-error" : undefined}
          />
          {fields.email && <p id="email-error" className="field-error">{fields.email}</p>}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={updateField}
            autoComplete={mode === "register" ? "new-password" : "current-password"}
            aria-invalid={Boolean(fields.password)}
            aria-describedby={fields.password ? "password-error" : undefined}
          />
          {fields.password && <p id="password-error" className="field-error">{fields.password}</p>}

          {message && <p className="form-error" role="alert">{message}</p>}

          <button className="signbtn" type="submit" disabled={submitting || initializing}>
            {submitting ? "Please wait…" : mode === "register" ? "Create account" : "Log in"}
          </button>
        </form>
      </section>
    </main>
  );
}
