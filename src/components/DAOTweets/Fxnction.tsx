import { Box } from "@mui/material";
import React, { useEffect } from "react";

export const Fxnction = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://platform.twitter.com/widgets.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Box px={4}>
      <blockquote className="twitter-tweet" data-theme="dark">
        <p lang="en" dir="ltr">
          DAO Infrastructure is Broken. <br />
          <br />
          As I look at the current infrastructure for DAOs, I ask myself, what
          isn’t working?
          <br />
          <br />
          Let’s take a look 👇{" "}
          <a href="https://t.co/BBhrxM0Iyy">pic.twitter.com/BBhrxM0Iyy</a>
        </p>
        &mdash; fxnction (@fxnction){" "}
        <a href="https://twitter.com/fxnction/status/1643300508864749568?ref_src=twsrc%5Etfw">
          April 4, 2023
        </a>
      </blockquote>
    </Box>
  );
};
