/*
  We are rendering `<Application />` down below, so we need React.createElement
*/

import React from "react";
import axios from "__mocks__/axios"; 
/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/

import {
  render,
  cleanup,
  fireEvent,
  getByText,
  waitForElement,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
} from "@testing-library/react";

/*
  We import the component that we are testing
*/

import Application from "components/Application";

jest.mock("axios");

afterEach(cleanup);

/*
  A test that renders a React Component
*/



describe("Appointment", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { student: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));
  
    console.log(prettyDOM(appointment));
  });

  it("displays the appointment when in SHOW mode", () => {
    // Test code for SHOW mode
  });

  it("switches to CREATE mode when 'Add' button is clicked", () => {
    // Test code for CREATE mode transition
  });

  it("displays the form when in CREATE mode", () => {
    // Test code for CREATE mode form display
  });

  // Add more tests for other modes like SAVING, DELETING, EDIT, etc.

  it("displays an error message when there's an error saving appointment", () => {
    // Test code for ERROR_SAVE mode
  });

  it("displays an error message when there's an error deleting appointment", () => {
    // Test code for ERROR_DELETE mode
  });
});
