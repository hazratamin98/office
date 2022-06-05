import React from "react";
import Rating from "@mui/material/Rating";

const BasicRating = () => {
  return (
    <>
      <Rating name="half-rating" defaultValue={2.5} precision={0.5} readOnly />
    </>
  );
};

export default BasicRating;
