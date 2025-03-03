"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns";

// Sample follow-ups
const followUpData = [
  { id: 1, name: "John Doe", date: "2025-02-22", priority: "High" },
  { id: 2, name: "Jane Smith", date: "2025-02-20", priority: "Medium" },
  { id: 3, name: "Michael Johnson", date: "2025-02-18", priority: "Low" },
  { id: 4, name: "Sarah Lee", date: "2025-02-25", priority: "High" },
];

// Priority color mapping
const priorityColors = {
  High: "bg-red-500 hover:bg-red-700 text-white",
  Medium: "bg-yellow-500 hover:bg-yellow-700 text-black",
  Low: "bg-green-500 hover:bg-green-700 text-white",
};

export default function FollowUpCalendar() {
  const currentMonth = new Date(); // Current date
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Follow-up Calendar</h2>
      <div className="grid grid-cols-7 gap-2 border border-gray-300 p-4 rounded-lg">
        {/* Render empty spaces for correct day alignment */}
        {Array.from({ length: getDay(monthStart) }).map((_, index) => (
          <div key={`empty-${index}`} className="p-4"></div>
        ))}

        {/* Render each day in the month */}
        {daysInMonth.map((day) => {
          const formattedDate = format(day, "yyyy-MM-dd");
          const followUpsForDay = followUpData.filter(fu => fu.date === formattedDate);

          return (
            <div key={formattedDate} className="border rounded-lg p-3 min-h-[100px] flex flex-col">
              <span className="text-sm font-semibold">{format(day, "d MMM")}</span>
              {followUpsForDay.length > 0 ? (
                followUpsForDay.map((fu) => (
                  <Badge key={fu.id} className={`mt-1 ${priorityColors[fu.priority]}`}>
                    {fu.name}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-400 text-sm mt-1">No follow-ups</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
