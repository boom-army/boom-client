import React, { useState, useEffect } from "react";

export const TypingDots: React.FC = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length === 3) {
          return "";
        } else {
          return prevDots + ".";
        }
      });
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return dots ? <span>{dots}</span> : <span>&nbsp;</span>;
};
