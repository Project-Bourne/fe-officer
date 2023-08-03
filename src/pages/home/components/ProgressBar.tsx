import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ProgressBar() {
  return (
    <div>
      <CircularProgressbar
        value={76.6}
        text="76.6"
        strokeWidth={11}
        counterClockwise
        styles={{
          path: {
            stroke: "#4582C4",
          },
          trail: {
            stroke: "#582C4",
          },
          text: {
            fill: "#4582C4",
          },
        }}
      />
    </div>
  );
}

export default ProgressBar;
