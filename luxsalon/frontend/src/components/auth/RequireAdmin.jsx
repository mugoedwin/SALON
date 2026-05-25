import { Navigate, useLocation } from "react-router-dom";
import ActionLink from "../ui/ActionLink";
import PageShell from "../common/PageShell";
import { useAuth } from "../../auth/AuthProvider";

function RequireAdmin({ children }) {
  const { user, isAuthLoading, isAdmin, isAdminLoading } = useAuth();
  const location = useLocation();

  if (isAuthLoading || isAdminLoading) {
    return (
      <PageShell
        eyebrow="Admin"
        title="Checking access..."
        description="Loading your account permissions."
      >
        <div className="border-t border-rose-100 pt-6">
          <p className="text-sm text-salon-copy">Please wait.</p>
        </div>
      </PageShell>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  if (!isAdmin) {
    return (
      <PageShell
        eyebrow="Admin"
        title="Not authorized"
        description="This page is restricted to salon admins."
        actions={
          <ActionLink to="/" variant="secondary">
            Go Home
          </ActionLink>
        }
      >
        <div className="border-t border-rose-100 pt-6">
          <p className="text-sm text-salon-copy">
            If you should have access, add your user UID as a document in the
            Firestore collection <span className="font-semibold">admins</span>.
          </p>
        </div>
      </PageShell>
    );
  }

  return children;
}

export default RequireAdmin;

