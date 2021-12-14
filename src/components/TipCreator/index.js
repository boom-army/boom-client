import React, { useState } from "react";
import { TipIcon2 } from "../Icons";
import { TipInput } from "./tipInput";
import { styled } from "@mui/system";

export const TipCreator = ({ tipAmount, userPubKey, tweetId, userId }) => {
  const [showTip, setShowTip] = useState(false);

  const Wrapper = styled("span")`
    color: #657786;
    position: relative;
  `;
  return (
    <Wrapper>
      <TipIcon2 onClick={() => setShowTip(!showTip)} userPubKey={userPubKey} />
      {tipAmount ? tipAmount : null}
      {showTip ? <TipInput userPubKey={userPubKey} setShowTip={setShowTip} userId={userId} tweetId={tweetId} /> : null}
    </Wrapper>
  );
};
