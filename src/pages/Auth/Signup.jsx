import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ActionLink from "../../components/ui/ActionLink";
import PageShell from "../../components/common/PageShell";
import InfoCard from "../../components/ui/InfoCard";
import SectionGrid from "../../components/common/SectionGrid";
import {
  formInputClassName,
  primaryButtonClassName,
} from "../../utils/uiClasses";
import { auth, db } from "../../firebase";

function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSignup(event) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      await updateProfile(credential.user, { displayName: fullName.trim() });

      await setDoc(doc(db, "users", credential.user.uid), {
        name: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        role: "client",
        createdAt: serverTimestamp(),
      });

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Signup failed", error);
      setErrorMessage("Could not create account. Try a different email/password.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageShell
      eyebrow="Account"
      title="Create Account"
      description="Set up a simple profile for faster salon bookings and appointment updates."
    >
      <SectionGrid columns="split">
        <InfoCard
          title="Create Your Profile"
          description="Share the basics so the salon can recognize and support you faster."
        >
          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label
                htmlFor="signup-name"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Full Name
              </label>
              <input
                id="signup-name"
                type="text"
                placeholder="Enter your full name"
                className={formInputClassName}
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                autoComplete="name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="signup-phone"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Phone Number
              </label>
              <input
                id="signup-phone"
                type="tel"
                placeholder="e.g. 0712 345 678"
                className={formInputClassName}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                autoComplete="tel"
              />
            </div>

            <div>
              <label
                htmlFor="signup-email"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Email Address
              </label>
              <input
                id="signup-email"
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
                htmlFor="signup-password"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                placeholder="Create a password"
                className={formInputClassName}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
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
              {isSubmitting ? "Creating..." : "Create Account"}
            </button>
          </form>
        </InfoCard>

        <InfoCard
          title="Already have an account?"
          description="Return to the login page to access your dashboard and history."
          footer={
            <ActionLink to="/auth/login" variant="secondary">
              Go to Login
            </ActionLink>
          }
        />
      </SectionGrid>
    </PageShell>
  );
}

export default Signup;
