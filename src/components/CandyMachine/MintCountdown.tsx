import { Paper, styled } from "@mui/material";
import Countdown from "react-countdown";

const RootWrapper = styled("div")((props) => ({
  display: "flex",
  padding: props.theme.spacing(0),
  "& > *": {
    margin: props.theme.spacing(0.5),
    marginRight: 0,
    width: props.theme.spacing(6),
    height: props.theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    background: "#15202b",
    color: "white",
    borderRadius: 5,
    fontSize: 10,
  },
}));

const SpanItem = styled("span")({
  fontWeight: "bold",
  fontSize: 18,
});

const SpanDone = styled("span")((props) => ({
  display: "flex",
  margin: props.theme.spacing(1),
  marginRight: 0,
  padding: props.theme.spacing(1),
  flexDirection: "column",
  alignContent: "center",
  alignItems: "center",
  justifyContent: "center",
  background: props.theme.tertiaryColor2,
  color: "white",
  borderRadius: 5,
  fontWeight: "bold",
  fontSize: 16,
}));

interface MintCountdownProps {
  date: Date | undefined;
  style?: React.CSSProperties;
  status?: string;
  onComplete?: () => void;
}

interface MintCountdownRender {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

export const MintCountdown: React.FC<MintCountdownProps> = ({
  date,
  status,
  style,
  onComplete,
}) => {
  const renderCountdown = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: MintCountdownRender) => {
    hours += days * 24;
    if (completed) {
      return status ? <SpanDone>{status}</SpanDone> : null;
    } else {
      return (
        <RootWrapper style={style}>
          <Paper elevation={0}>
            <SpanItem>
              {hours < 10 ? `0${hours}` : hours}
            </SpanItem>
            <span>hrs</span>
          </Paper>
          <Paper elevation={0}>
            <SpanItem>
              {minutes < 10 ? `0${minutes}` : minutes}
            </SpanItem>
            <span>mins</span>
          </Paper>
          <Paper elevation={0}>
            <SpanItem>
              {seconds < 10 ? `0${seconds}` : seconds}
            </SpanItem>
            <span>secs</span>
          </Paper>
        </RootWrapper>
      );
    }
  };

  if (date) {
    return (
      <Countdown
        date={date}
        onComplete={onComplete}
        renderer={renderCountdown}
      />
    );
  } else {
    return null;
  }
};
