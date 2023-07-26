import React, { useState, useEffect,  StrictMode } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment/index"
import { getAppointmentsForDay } from "helpers/selectors";
const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  },

"6": {
  id: 6,
  time: "5pm",
},
};

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

 
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments")
    ])
      .then(([daysResponse, appointmentsResponse]) => {
        console.log([daysResponse, appointmentsResponse] )
        setState(prev => ({
          ...prev,
          days: daysResponse.data,
          appointments: appointmentsResponse.data,
        }));
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const setDay = (day) => {
    setState((prev) => ({ ...prev, day }));
  };
  
  
    // const dailyAppointments = Object.values(state.appointments).filter(appointment => {
    //   const selectedDay = state.days.find(day => day.name === state.day);
    //   return appointment.time === selectedDay.id.toString();
    // });
    const dailyAppointments = getAppointmentsForDay(state, state.day)
 
  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu" >
  <DayList
  days={state.days}
  value={state.day}
  onChange={setDay} 
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => (
          <Appointment
          key={appointment.id}
          time={appointment.time}
          interview={appointment.interview}
          />
        ))}

      </section>
  
    </main>
  );
}
