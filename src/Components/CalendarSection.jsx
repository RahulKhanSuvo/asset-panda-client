import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const CalendarSection = () => {
  return (
    <section className="mt-6 w-full p-6 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
      <h3 className="text-lg font-bold px-4 py-2">Calendar</h3>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "",
        }}
        height="auto"
      />
    </section>
  );
};

export default CalendarSection;
