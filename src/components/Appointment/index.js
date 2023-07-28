
import React from 'react';
import './styles.scss';
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form";
import useVisualMode from 'hooks/useVisualMode';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"

export default function Appointment(props) {
  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY)
  const onAdd = () => {
    transition(CREATE);
  };
  return <article className="appointment" data-testid="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && <Empty  onAdd={onAdd}/>}
      {mode === SHOW && (
       <Show 
       student={props.interview.student}
       interviewer={props.interviewers}
       />
       )}
       {mode === CREATE && <Form interviewers={[]} onCancel={back} />}
  </article>
      
}