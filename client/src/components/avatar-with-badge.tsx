import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MdGroups2 } from "react-icons/md";

interface AvatarWithBadgeProps {
  name: string;
  src?: string;
  isOnline?: boolean;
  isGroup?: boolean;
  size?: string;
}

const AvatarWithBadge = ({
  name,
  src,
  isOnline,
  isGroup,
  size = "w-6 h-6",
}: AvatarWithBadgeProps) => {
  const avatar = isGroup ? (
    <MdGroups2 />
  ) : (
    <AvatarImage src={src || ""} alt={name} />
  );
  return (
    <div className="relative shrink-0">
      <Avatar className={size}>
        {avatar}
        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
          {name?.charAt(0)}
        </AvatarFallback>
      </Avatar>
      {isOnline && !isGroup && (
        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 bg-green-500"></span>
      )}
    </div>
  );
};

export default AvatarWithBadge;
