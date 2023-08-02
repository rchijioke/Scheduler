import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import InterviewerList from "components/InterviewerList";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const onAdd = () => {
    transition(CREATE);
  };

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    console.log("Saving interview:", interview);
    transition(SAVING)

    

    props.bookInterview(props.id, interview).then(() => {
    
      transition("SHOW");
    })
  }
  

    function deleteInterview() {
      transition(CONFIRM); 
    }

    function onCancel() {
      // Action to be taken when user cancels the delete operation
      transition(SHOW);
    }

    function onConfirm() {
      // Action to be taken when user confirms the delete operation
      transition(DELETING);
      props.deleteInterview(props.id).then(() => {
        transition(EMPTY);
      });
    }
  

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show 
          student={props.interview.student}
          interviewer={props.interviewers}
          // onDelete={() => transition(CONFIRM)}
          onDelete={deleteInterview}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} save={save} />
      )}
      {mode === SAVING && (
        <Status message={"Saving"} />
      )}

      {mode === DELETING && (
        <Status message={"Deleting"}/>
      )}

      {mode === CONFIRM && ( 
        <Confirm
          message="Are you sure you want to delete this appointment?"
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      )}

  
    </article>
  );
}
