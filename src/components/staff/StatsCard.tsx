"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarCheck } from "lucide-react"; // You can pass other icons via props if needed

interface StatsCardProps {
  title?: string;
  value: number | string;
  subtitle?: string;
  sub_color?: string;
  icon?: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title = "Today's Check-Ins",
  value,
  subtitle = "Ready to process",
  sub_color = "text-[#2A4B7C]",
  icon = <CalendarCheck className="w-8 h-8 text-[#2A4B7C]" />,
  gradientFrom = "from-blue-50",
  gradientTo = "to-white",
}) => {
  return (
    <Card
      className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} border-blue-100 hover:shadow-lg transition-shadow`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          {icon}
          <div className="text-3xl text-[#2A4B7C] font-semibold">{value}</div>
        </div>
        <div className="text-sm text-muted-foreground">{title}</div>
        {subtitle && (
          <div className={`mt-2 text-xs ${sub_color}`}>{subtitle}</div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
