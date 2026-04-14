import { useEffect } from "react";
import { useAuth } from "./hooks/use-auth";
import AppRoutes from "./routes";
import { Spinner } from "./components/ui/spinner";
import { useLocation } from "react-router-dom";
import { isAuthRoute } from "./routes/routes";
import { useSocket } from "./hooks/use-socket";

const App = () => {
  const { user, isAuthStatus, isAuthStatusLoading } = useAuth();
  const { onlineUsers } = useSocket();
  const { pathname } = useLocation();

  console.log("Online Users:", onlineUsers);

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
