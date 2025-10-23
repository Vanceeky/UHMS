"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarFallbackHelperProps {
  name: string;
  imageUrl?: string;
}

const AvatarHelper: React.FC<AvatarFallbackHelperProps> = ({
  name,
  imageUrl,
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
        <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
          {getInitials(name)}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default AvatarHelper;
