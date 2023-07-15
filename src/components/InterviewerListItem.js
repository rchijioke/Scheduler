import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewerClasses = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  const handleItemClick = () => {
    props.setInterviewer(props.id);
  };

  return (
    <li className={interviewerClasses} onClick={handleItemClick}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}