import { useEffect } from "react";
import { useAuth } from "./hooks/use-auth";
import AppRoutes from "./routes";
import { Spinner } from "./components/ui/spinner";
import { useLocation } from "react-router-dom";
import { isAuthRoute } from "./routes/routes";

const App = () => {
  const { user, isAuthStatus, isAuthStatusLoading } = useAuth();
  const { pathname } = useLocation();

  const isAuth = isAuthRoute(pathname);

  useEffect(() => {
    isAuthStatus();
  }, [isAuthStatus]);

  if (isAuthStatusLoading && !user && !isAuth) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return <AppRoutes />;
};

export default App;
