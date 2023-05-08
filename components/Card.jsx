import { styled } from "@mui/material";
import React from "react";

const CardStyled = styled("div")`
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 5px;
`;

const Card = (props) => {
  return (
    <CardStyled className={props?.className} sx={props.sx}>
      {props.children}
    </CardStyled>
  );
};

export default Card;
