import React, { useState, useContext } from "react";
import { TipIcon2 } from "../Icons";
import { TipInput } from "./tipInput";
import { styled } from "@mui/material/styles";
import { ThemeContext } from "../../contexts/theme";

interface TipProps{
  tipAmount?:number|null|string,
  userPubKey: any;
  userId: any;
  tweetId: string;
}

export const TipCreator: React.FC<TipProps> = ({ tipAmount, userPubKey, tweetId, userId }) => {
  const { theme } = useContext(ThemeContext);
  const [showTip, setShowTip] = useState(false);

  const Wrapper = styled("span")({
    color: theme.secondaryColor,
    position: "relative",
  });

  return (
    <Wrapper>
      <TipIcon2 onClick={() => setShowTip(!showTip)} userPubKey={userPubKey} />
      {tipAmount ? tipAmount : null}
      {showTip ? (
        <TipInput
          userPubKey={userPubKey}
          setShowTip={setShowTip}
          userId={userId}
          tweetId={tweetId}
        />
      ) : null}
    </Wrapper>
  );
};
