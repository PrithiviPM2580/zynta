import { useAuth } from "@/hooks/use-auth";
import type { ChatType } from "@/types/chat.type";
import { useLocation } from "react-router-dom";
import { formatChatTime, getOtherUserGroup } from "@/lib/helper";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import AvatarWithBadge from "../avatar-with-badge";

interface ChatListItemProps {
  chat: ChatType;
  onClick?: () => void;
}

const ChatListItem = ({ chat, onClick }: ChatListItemProps) => {
  const { pathname } = useLocation();

  const { lastMessage, createdAt } = chat;
  const { user } = useAuth();
  const currentUserId = user?._id || null;

  const { name, avatar, isOnline, isGroup } = getOtherUserGroup(
    chat,
    currentUserId,
  );

  const getLastMessageText = () => {
    if (!lastMessage) {
      return isGroup
        ? chat.createdby === currentUserId
          ? "Group created"
          : "You were added"
        : "Send a message";
    }
    if (lastMessage.image) return "📷 Photo";
    if (isGroup && lastMessage.sender) {
      return `${lastMessage.sender._id === currentUserId ? "You" : lastMessage.sender.name}: ${lastMessage.content}`;
    }

    return lastMessage.content;
  };
  return (
    <Button
      onClick={onClick}
      className={cn(
        "w-full items-center flex gap-2 p-2 rounded-sm hover:bg-sidebar-accent transition-colors text-left",
        pathname.includes(chat._id) && "bg-sidebar-accent!",
      )}
    >
      <AvatarWithBadge
        name={name}
        src={avatar}
        isOnline={isOnline}
        isGroup={isGroup}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <h5 className="text-sm font-semibold truncate">{name}</h5>
          <span className="text-xs ml-2 shrink-0 text-muted-foreground">
            {formatChatTime(lastMessage?.updatedAt || createdAt)}
          </span>
        </div>
        <p className="text-xs truncate text-muted-foreground -mt-px">
          {getLastMessageText()}
        </p>
      </div>
    </Button>
  );
};

export default ChatListItem;
