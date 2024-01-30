import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function VerticalProgress({ Percentage }) {
  console.log(Percentage, "Percentage");
  return (
    <ProgressBar
      now={Percentage}
      variant="success"
      style={{
        width: "50%",
        height: "40px",
        fontSize: "20px",
      }}
      label={`${Percentage}%`}
    />
  );
}
