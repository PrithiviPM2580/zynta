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
    <aside className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/85 md:inset-y-0 md:left-0 md:right-auto md:w-16 md:border-r md:border-t-0">
      <div className="flex h-16 w-full items-center justify-between px-4 md:h-full md:flex-col md:justify-between md:px-2 md:py-4">
        <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
          <FaFacebookMessenger className="h-6 w-6" />
        </div>
        <div className="flex items-center gap-3 md:flex-col">
          <Button
            variant={"outline"}
            size={"icon"}
            className="h-9 w-9 rounded-full border border-border/60 bg-background"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <AvatarWithBadge
                  name={user?.name || "unknown"}
                  src={user?.avatar || ""}
                  isOnline={isOnline}
                  size="w-9 h-9"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-50 w-48 rounded-lg" align="end">
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
