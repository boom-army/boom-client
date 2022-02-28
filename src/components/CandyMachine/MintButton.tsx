import Button from "@material-ui/core/Button";
import { CandyMachineAccount } from "../../utils/candy-machine";
import { CircularProgress } from "@material-ui/core";
import { GatewayStatus, useGateway } from "@civic/solana-gateway-react";
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";

export const CTAButton = styled(Button)((props) => ({
  "&.MuiButton-root": {
    width: "100%",
    height: "60px",
    marginTop: "10px",
    marginBottom: "5px",
    backgroundColor: props.theme.accentColor,
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
  },
  "&.Mui-disabled": {
    backgroundColor: props.theme.tertiaryColor2,
    opacity: "0.3",
    color: "white",
  },
}));

export const MintButton = ({
  onMint,
  candyMachine,
  isMinting,
}: {
  onMint: () => Promise<void>;
  candyMachine?: CandyMachineAccount;
  isMinting: boolean;
}) => {
  const { requestGatewayToken, gatewayStatus } = useGateway();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (gatewayStatus === GatewayStatus.ACTIVE && clicked) {
      onMint();
      setClicked(false);
    }
  }, [gatewayStatus, clicked, setClicked, onMint]);

  const getMintButtonContent = () => {
    if (candyMachine?.state.isSoldOut) {
      return "SOLD OUT";
    } else if (isMinting) {
      return <CircularProgress />;
    } else if (candyMachine?.state.isPresale) {
      return "PRESALE MINT";
    }

    return "MINT";
  };

  return (
    <CTAButton
      disabled={
        candyMachine?.state.isSoldOut ||
        isMinting ||
        !candyMachine?.state.isActive
      }
      onClick={async () => {
        setClicked(true);
        if (candyMachine?.state.isActive && candyMachine?.state.gatekeeper) {
          if (gatewayStatus === GatewayStatus.ACTIVE) {
            setClicked(true);
          } else {
            await requestGatewayToken();
          }
        } else {
          await onMint();
          setClicked(false);
        }
      }}
      variant="contained"
    >
      {getMintButtonContent()}
    </CTAButton>
  );
};
