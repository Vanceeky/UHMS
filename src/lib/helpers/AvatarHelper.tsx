"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarFallbackHelperProps {
  name: string;
  imageUrl?: string;
  className?: string;
}

const AvatarHelper: React.FC<AvatarFallbackHelperProps> = ({
  name,
  imageUrl,
  className = "bg-gradient-to-br from-blue-500 to-purple-500 text-white",
}) => {
  // Extract initials (first letter of first two words)
  const getInitials = (name: string) => {
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0]?.toUpperCase() || "";
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
    <Avatar className="h-10 w-10 border">
      {imageUrl ? (
        <AvatarImage src={imageUrl} alt={name} />
      ) : (
        <AvatarFallback className={className}>
          {getInitials(name)}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default AvatarHelper;
