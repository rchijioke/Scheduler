import React, { useState } from "react"
import InterviewerList from "components/InterviewerList"
import Button from "components/Button"


export default function Form (props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const handleStudentChange = (event) => {
    setError("");
    setStudent(event.target.value);
  };
  const handleInterviewerChange = (interviewerId) => {
    if(interviewerId === null) {
      setError("please Select and interviewer")
    }
    else {setError("");
    setInterviewer(interviewerId);
  }
}
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  }

  function validate() {
    if (student === "") {
      setError("student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("please select an interviewer");
      return;
    }
    setError("")
    props.onSave(student, interviewer);
  }

//   const handleSave = () => {
//   if (!student) {
//     console.log("Student name is blank");
//     setError("Student name cannot be blank")
//   } 

//   else {
//     setError(""); // Clear any existing error message
//    validate()
//   };
// }



const [error, setError] = useState("");

  // const interviewersString = props.interviewers.toString();
  console.log("Props.save:", props.save);
  return <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={student}
        onChange={handleStudentChange}
        data-testid="student-name-input"
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList 
      interviewers={props.interviewers}
      value={interviewer}
      onChange={handleInterviewerChange}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={validate}>Save</Button>
    </section>
  </section>
</main>
}