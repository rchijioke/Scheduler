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
  waitFor,
  waitForElement,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
  getByTestId
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
      target: { student: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    console.log(prettyDOM(appointment));
  });



  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment,"Are you sure you want to delete this appointment?")
    ).toBeInTheDocument();
  
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));
  
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
  
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it.only("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Find the appointment to be edited.
    const appointment = getAllByTestId(container, "appointment").find(appointment =>
      queryByText(appointment, "Archie Cohen")
    );
  
    // 4. Find and click the "Edit" button.
    fireEvent.click(queryByAltText(appointment, "Edit"));
  
    // 5. Change the student name.
    fireEvent.change(getByTestId(appointment, "student-name-input"), {
      target: { value: "New Student Name" },
    });
  
    // 6. Save the interview.
    fireEvent.click(getByText(appointment, "Save"));
  
    // 7. Wait for the appointment to transition to "Saving" state.
    await waitForElement(() => getByText(appointment, "Saving"));
  
    // 8. Wait for the appointment to display the updated student name.
    await waitForElement(()=>getByText(appointment, "New Student Name"))
  
    // 9. Check that the DayListItem with the text "Monday" has the same spots remaining.
    const day = getAllByTestId(container, "day").find(day =>
      getByText(day, "Monday")
    );
  
    // Assuming you start with 1 spot remaining, adjust the expected spots remaining accordingly.
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
  
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));
  
    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Could not save appointment")).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
    fireEvent.click(queryByText(appointment, "Confirm"));
  
    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Could not delete appointment")).toBeInTheDocument();
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
