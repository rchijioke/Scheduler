import React from "react";
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment/index"
import useApplicationData from "hooks/useApplicationData";
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
 

};

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    interviewers,
    appointments,
  } = useApplicationData();

  
  const schedule = appointments.map(appointment => {
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={appointment.interview}
          interviewers={interviewers} 
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
          />
      )
      })

    


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
<div> 
 
</div>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        
        {schedule}
       <Appointment 
       
       key="last" 
       time="5pm"
       />
      </section>
    </main>
  );
}
