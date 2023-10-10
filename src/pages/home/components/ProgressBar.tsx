import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ProgressBar({ value }) {
  const confidence = value && typeof value === 'string' ? parseFloat(value) :
                value && typeof value === 'number' ? value : 0
  return (
    <div>
      <CircularProgressbar
        value={confidence}
        text={`${confidence}`}
        strokeWidth={11}
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
