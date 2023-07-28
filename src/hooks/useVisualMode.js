import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory((prevHistory) => 
    replace ? [...prevHistory.slice(0, prevHistory.length - 1), newMode] : [...prevHistory, newMode]);
  };
  const back = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); 
      setMode(newHistory[newHistory.length - 1]); // Set the mode to the previous one
      setHistory(newHistory); // Update the history array
    }
  };
  return { mode, transition, back };
}