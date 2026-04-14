import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "./theme-provider";
import { isUserOnline } from "@/lib/helper";
import { FaFacebookMessenger } from "react-icons/fa";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import AvatarWithBadge from "./avatar-with-badge";

const AsideBar = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const isOnline = isUserOnline(user?._id);

  return (
    <aside className="top-0 fixed inset-y-0 w-11 left-0 z-50 h-dvh bg-primary/85 shadow-sm">
      <div className="w-full h-full px-1 pt-1 pb-6 flex flex-col items-center justify-between">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
          <FaFacebookMessenger className="h-6 w-6" />
        </div>
        <div className="flex flex-col items-center gap-3">
          <Button
            variant={"outline"}
            size={"icon"}
            className="border-0 rounded-full"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div role="button">
                <AvatarWithBadge
                  name={user?.name || "unknown"}
                  src={user?.avatar || ""}
                  isOnline={isOnline}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 rounded-lg z-50" align="end">
              <DropdownMenuLabel>My account</DropdownMenuLabel>
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  );
};

export default AsideBar;
