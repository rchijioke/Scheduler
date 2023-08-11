import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    const newHistory = () => {
    
      if (replace) {
        return [...history.slice(0, history.length - 1), newMode];
      } else {
        return [...history, newMode];
      }
    };
    setHistory(newHistory());
    
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
