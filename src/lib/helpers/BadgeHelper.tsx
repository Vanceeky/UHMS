"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

interface BadgeHelperProps {
  status: "pending" | "confirmed" | "checked-in" | "checked-out";
}

const BadgeHelper: React.FC<BadgeHelperProps> = ({ status }) => {
  const getBadgeStyle = (status: BadgeHelperProps["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "confirmed":
        return "bg-blue-100 text-blue-800 border border-blue-300";
      case "checked-in":
        return "bg-green-100 text-green-800 border border-green-300";
      case "checked-out":
        return "bg-gray-100 text-gray-700 border border-gray-300";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  // Capitalize status text
  const formatStatus = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <Badge
      variant="outline"
      className={`rounded-full px-3 py-1 text-xs font-medium ${getBadgeStyle(status)}`}
    >
      {formatStatus(status)}
    </Badge>
  );
};

export default BadgeHelper;
