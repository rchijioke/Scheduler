import React from "react"
import DayListItem from "./DayListItem"

function DayList(props){
  console.log("hello")
  return (
  <ul>
{props.days.map((day) => (
  <DayListItem
  key={day.id}
  name={day.name}
  spots={day.spots}
  selected={day.name === props.value}
  setDay={props.onChange}
  />
))}
  </ul>
  );
  
}
export default DayList;