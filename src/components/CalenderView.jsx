"use client";

import React, { useState } from "react";

export default function CalendarView({ entries, onDateSelect }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];

  const daysInPrevMonth = new Date(year, month, 0).getDate();
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push({
      day: "",
      isCurrentMonth: false,
      dateString: null,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    const dateString = localDate.toISOString().split("T")[0];

    calendarDays.push({
      day: day,
      isCurrentMonth: true,
      dateString: dateString,
      isToday: dateString === new Date().toISOString().split("T")[0],
    });
  }

  const totalCells = Math.ceil(calendarDays.length / 7) * 7;
  let nextMonthDay = 1;
  while (calendarDays.length < totalCells) {
    calendarDays.push({
      day: "",
      isCurrentMonth: false,
      dateString: null,
    });
  }

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  console.log("entriex", entries);
  console.log("calendarDays", calendarDays);

  return (
    <div className="p-4 bg-gradient-to-r from-red-300 to-[#f4bcbcf8] rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {weekdays.map((day) => (
          <div key={day} className="font-medium text-sm text-gray-600 pb-2">
            {day}
          </div>
        ))}

        {calendarDays.map((dayInfo, index) => {
          const entry = dayInfo.dateString
            ? entries.find((entry) => entry.date === dayInfo.dateString)
            : null;
          const moodEmoji = entry?.mood?.emoji;
          const bgColor = entry?.mood?.color;

          return (
            <div
              key={`${dayInfo.dateString}-${index}`} 
              className={`
                p-1 h-[120px] sm:h-24 flex flex-col items-center justify-start border border-gray-200 rounded
                transition duration-150 ease-in-out bg-[#ffffff98]
                ${
                  dayInfo.isCurrentMonth
                    ? ""
                    : "text-gray-400"
                }
                ${dayInfo.isToday ? "border-2 border-blue-500" : ""}
                ${
                  dayInfo.isCurrentMonth
                    ? "cursor-pointer hover:bg-blue-50"
                    : "cursor-default"
                }
              `}
              aria-label={`Date ${dayInfo.day}${
                entry ? `, Mood: ${entry.mood.name}` : ""
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  dayInfo.isToday ? "text-blue-600 font-bold" : "text-gray-800"
                }`}
              >
                {dayInfo.day}
              </span>
              {dayInfo.isCurrentMonth && moodEmoji && (
                <span className="text-2xl mt-1" aria-hidden="true">
                  {moodEmoji}
                </span>
              )}
              <div className="flex items-center flex-wrap">
                {entry?.weather?.icon &&<img src={entry?.weather?.icon} alt="" className="w-8 h-8" />}
                <span className="text-gray-700">{entry?.weather?.temperature}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
