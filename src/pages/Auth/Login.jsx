import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import ActionLink from "../../components/ui/ActionLink";
import PageShell from "../../components/common/PageShell";
import InfoCard from "../../components/ui/InfoCard";
import SectionGrid from "../../components/common/SectionGrid";
import {
  formInputClassName,
  primaryButtonClassName,
} from "../../utils/uiClasses";
import { auth } from "../../firebase";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath = location.state?.from?.pathname || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate(fromPath, { replace: true });
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage("Login failed. Check your email and password.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageShell
      eyebrow="Account"
      title="Login"
      description="Sign in to view your booking history, manage upcoming visits, and stay in touch with the salon."
    >
      <SectionGrid columns="split">
        <InfoCard
          title="Client Sign In"
          description="Use your email and password to access your salon account."
        >
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="login-email"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                className={formInputClassName}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                className={formInputClassName}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            {errorMessage ? (
              <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              className={primaryButtonClassName}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </InfoCard>

        <InfoCard
          title="New to Ivonne Orchard?"
          description="Create a client account to keep your appointments and contact details in one place."
          footer={
            <ActionLink to="/auth/signup" variant="secondary">
              Create Account
            </ActionLink>
          }
        />
      </SectionGrid>
    </PageShell>
  );
}

export default Login;
