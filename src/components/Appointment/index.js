import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
    
    if(!interviewer || !name){
      transition(ERROR_SAVE, true)
    }
    else{
    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => {
        console.log("showTesting")
        transition("SHOW");
      })
      .catch( error => 
        {
          console.log("testing")
          transition(ERROR_SAVE, true)
        }
        
      );
    }
  }

  function editInterview() {
    transition(EDIT);
  }

  function cancelInterview() {
    transition(CONFIRM);
  }

  function onCancel() {
    // Action to be taken when user cancels the delete operation
    transition(SHOW);
  }

  function destroy() {
    // Action to be taken when user confirms the delete operation
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  }
console.log(props)
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && props.interview?.student &&(
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={cancelInterview}
          onEdit={editInterview}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message={"Saving"} />}

      {mode === DELETING && <Status message={"Deleting"} />}

      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete this appointment?"
          onCancel={onCancel}
          onConfirm={destroy}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && <Error message={"Error saving appointment"} onClose={back} />}
      {mode === ERROR_DELETE && (
        <Error message={"Error deleting appointment"} onClose={back} />
      )}
    </article>
  );
}
