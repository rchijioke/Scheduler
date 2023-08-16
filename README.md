# Interview Scheduler

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
`Application.js`:
 uses the useApplicationData hook to manage the state and data for booking and canceling interviews. It allows users to make book and cancel interviews.

`Button.js`:
is a react component that renders a button with styles based on the props passed to it and it can also be disabled

`DayList`:
is a react component that renders a list of days, where each item is represented by the "DayListItem component, it also allows a day selection by calling "props.onChange" function when a day is clicked.

`DayListItem`:
is a React component that renders an individual day item with the day's name and the number of spots remaining, applying different styles based on whether it is selected or has no available spots, and handling the day selection when clicked.

`InterviewerList`:
is a React component that renders a list of interviewers, where each interviewer item is represented by the "InterviewerListItem" component.
When an interviewer is clicked, it calls the "props.onChange(interviewer.id)" function to handle the selection of the interviewer.

`InterviewerListItem`:
is a React component that renders an individual interviewer item with an avatar, applying selected styling when clicked, and handling the interviewer selection.

`useVisualMode`:
is a custom React hook called "useVisualMode" that manages a a visual mode state by maintaining both the current mode and a history of previous modes.

`stories/index`:
 defines multiple stories for different React components using the Storybook library, showcasing various states and interactions of the components.


`hook/useApplication`:
has a custom react hook named useApplicationData that manages the state and data for booking and cancelling interviews, also updating the number of available spots for each day either when an appointment is deleted or created

`axios.js`
this file defines a set of mock data and mock Axios functions that simulate HTTP requests for testing purposes in a React application using Jest. 

`appointments.spec.js`:
this file contains multiple Cypress tests for an appointment booking and management feature in a React application.

`navigation`
this file contains Cypress tests that check the navigation functionality within a React application.

`cypress.json`:
This configuration file for Cypress specifies the base URL of the application being tested as "http://localhost:8000". It also sets the viewport width to 1280 pixels and the viewport height to 720 pixels, controlling the dimensions of the test browser window.

`Package.json`:
This package.json file for the "scheduler" project specifies its dependencies, development dependencies, and scripts for managing the application.
