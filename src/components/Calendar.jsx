import React, { useState } from "react";
import { format, startOfMonth, endOfMonth, addDays, isSameMonth, isSameDay, addMonths } from "date-fns";

function CustomCalendar({ selectedDate }) {
  // create state for the current month
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // get the first day of the current month
  const firstDayOfMonth = startOfMonth(currentMonth);

  // get the last day of the current month
  const lastDayOfMonth = endOfMonth(currentMonth);

  // create an array of the days of the current month
  const days = [];
  let currentDate = firstDayOfMonth;
  while (currentDate <= lastDayOfMonth) {
    days.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  // render the calendar
  return (
    <div className=" bg-white rounded-lg p-4">
      <div className="grid grid-cols-7 gap-2">
        <div className="text-center text-gray-500 font-bold">Sun</div>
        <div className="text-center text-gray-500 font-bold">Mon</div>
        <div className="text-center text-gray-500 font-bold">Tue</div>
        <div className="text-center text-gray-500 font-bold">Wed</div>
        <div className="text-center text-gray-500 font-bold">Thu</div>
        <div className="text-center text-gray-500 font-bold">Fri</div>
        <div className="text-center text-gray-500 font-bold">Sat</div>
        {
          days.map((day) => (
            <div key={day.getTime()} className={isSameMonth(day, currentMonth) ? "bg-white p-2 text-center " : "bg-gray-100 p-2 text-center"}>
              <div className={isSameDay(day, new Date(selectedDate)) ? "bg-cyan-500 w-full p-2 text-white font-bold  mx-auto flex items-center justify-center" : ""}>
                {format(day, "d")}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default CustomCalendar;
