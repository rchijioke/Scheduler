
export const getAppointmentsForDay = (state, day) => {
  const selectedDay = state.days.find(item => item.name === day);

  if (!selectedDay || selectedDay.appointments.length === 0) {
    return [];
  }

  const appointmentsForDay = selectedDay.appointments.map(appointmentId => state.appointments[appointmentId]);
  return appointmentsForDay
}

export const getInterview = (state, interview) => {
  // console.log("this is the state", state.interviewers)

   // Return null if there is no interview data provided
if (!interview) {
  return null;
}
const {student, interviewer } = interview;

//if there is no  intervier data return null
if(!interviewer) {
  return null;
}

// Find the interviewer details from state.interviewers based on the interviewer id
const interviewerData = state.interviewers[interviewer];

return {
  student,
  interviewer: {
    id: interviewerData.id,
    name: interviewerData.name,
    avatar: interviewerData.avatar,
  },
};
}

export const getInterviewersForDay = (state, day) => {
  const selectedDay = state.days.find(item => item.name === day);
console.log(selectedDay)
  if (!selectedDay || selectedDay.interviewers.length === 0) {
    return [];
  }

  return selectedDay.interviewers.map((interviewerId) => {
    return state.interviewers[interviewerId]
  })

  
};















