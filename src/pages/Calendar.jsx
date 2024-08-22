import React from "react";
import ComponentCalendar from "../components/ComponentCalendar";
function Calendar() {
  return (
    <div>
      <h1>Calendario</h1>
      <p>
        Organiza tu semana de entrenamientos con nuestro calendario
        personalizado.
      </p>
      <div className="calendar-content">
        <p>Próximamente...</p>
      </div>

      <div>
        <ComponentCalendar />
      </div>
    </div>
  );
}

export default Calendar;
