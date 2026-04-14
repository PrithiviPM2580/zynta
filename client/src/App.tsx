import { useEffect } from "react";
import { useAuth } from "./hooks/use-auth";
import AppRoutes from "./routes";
import { Spinner } from "./components/ui/spinner";

const App = () => {
  const { user, isAuthStatus, isAuthStatusLoading } = useAuth();

  useEffect(() => {
    isAuthStatus();
  }, []);

  if (isAuthStatusLoading && !user) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return <AppRoutes />;
};

export default App;
