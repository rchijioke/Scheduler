import React, { useState, useEffect,  StrictMode } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment/index"
import Form from "./Appointment/Form";
import Confirm from "./Appointment/Confirm";
import { getAppointmentsForDay, getInterview, getInterviewersForDay, } from "helpers/selectors";
import useVisualMode from "hooks/useVisualMode"
import InterviewerList from "./InterviewerList";

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
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then(([daysResponse, appointmentsResponse, interviewersResponse]) => {
       
        setState(prev => ({
          ...prev,
          days: daysResponse.data,
          appointments: appointmentsResponse.data,
          interviewers: interviewersResponse.data,
        }));
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const setDay = (day) => {
    setState((prev) => ({ ...prev, day }));
  };
  const dailyAppointments = state?.appointments ? getAppointmentsForDay(state, state.day) : []
  const dailyInterviewers = state?.interviewers ? getInterviewersForDay(state, state.day) : [];
  console.log("Daily Interviewers:", dailyInterviewers);
    const schedule = state?.appointments && state?.interviewers? dailyAppointments.map(appointment => {
      const interview = getInterview(state, appointment.interview);
      
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={dailyInterviewers} // Pass the interviewers array to the Appointment component
          bookInterview={bookInterview}
          deleteInterview={deleteInterview}

        
        
        
        />
      );
    }) : [];

 
    function bookInterview(id, interview) {
      // Implement the functionality to book an interview here
      console.log(id, interview);
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview },
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };

      // if(!interview.interviewer){
      //   return false
      // }
    
      return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState((prev) => ({
          ...prev,
          appointments,
        }));
        // Handle successful response (if needed)
        console.log('Interview data updated successfully:', response.data);
      })
      .catch((error) => {
        // Handle error (if needed)
        console.error('Error updating interview data:', error);
      });
    }
   

  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
   
    ;

    // Send a PUT request to update the appointment data in the database
    return axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        setState((prev) => ({
          ...prev,
          appointments,
        }));
    
        // Handle successful response (if needed)
        console.log('Interview data deleted successfully:', response.data);
      })
      .catch((error) => {
        // Handle error (if needed)
        console.error('Error deleting interview data:', error);
      });
  }

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
       
      </section>
    </main>
  );
}
