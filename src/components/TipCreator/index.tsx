import React from "react";
import { TipIcon } from "../Icons";
import { styled } from "@mui/system";

interface Props {
  tipAmount: Number;
}

export const TipCreator: React.FC<Props> = ({ tipAmount }) => {
  const Wrapper = styled("span")`
    color: #657786;
  `;
  return (
    <Wrapper>
      <TipIcon />
      {tipAmount ? tipAmount : null}
    </Wrapper>
  );
};
