
export const getAppointmentsForDay = (state, day) => {
  const selectedDay = state.days.find(item => item.name === day);

  if (!selectedDay || selectedDay.appointments.length === 0) {
    return [];
  }

  const appointmentsForDay = selectedDay.appointments.map(appointmentId => state.appointments[appointmentId]);
  return appointmentsForDay
}