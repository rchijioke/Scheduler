// hooks/useApplicationData.js
import { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function useApplicationData() {
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
    setState(prev => ({ ...prev, day }));
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        setState(prev => ({
          ...prev,
          appointments,
        }));
        console.log('Interview data updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating interview data:', error);
      });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        setState(prev => ({
          ...prev,
          appointments,
        }));
        console.log('Interview data deleted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error deleting interview data:', error);
      });
  };

  const interviewers = getInterviewersForDay(state, state.day);
  const appointmentsForDay = getAppointmentsForDay(state, state.day).map(appointment => ({
    ...appointment,
    interview: getInterview(state, appointment.interview),
  }));

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    interviewers,
    appointments: appointmentsForDay,
  };
}
