import { useChat } from "@/hooks/use-chat";
import React, { useEffect } from "react";
import { Spinner } from "../ui/spinner";
import ChatListItem from "./chat-list-item";

const ChatList = () => {
  const { fetchChats, chats, isChatsLoading } = useChat();

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);
  return (
    <div className="fixed inset-y-0 pb-20 lg:pb-0 lg:max-w-94.75 lg:block border-r border-border bg-sidebar dark:bg-background max-w-[calc(100% - 40px)] w-full left-10 z-50">
      <div className="flex-col">
        <div className="flex-1 h-[calc(100vh - 100px)] overflow-y-auto">
          <div className="px-2 pb-10 pt-1 space-y-1">
            {isChatsLoading ? (
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            ) : chats.length === 0 ? (
              <div className="flex items-center justify-center">
                No chats created
              </div>
            ) : (
              chats.map((chat) => (
                <ChatListItem key={chat._id} chat={chat} onClick={() => null} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
