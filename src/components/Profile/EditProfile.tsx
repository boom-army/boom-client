import { Loader } from "../Loader";
import { EditProfileForm } from "./EditProfileForm";
import { styled } from "@mui/material/styles";

const Wrapper = styled("div")((props) => ({
  paddingBottom: "5rem",

  ".flex-wrapper": {
    display: "flex",
    justifyContent: "center",

    form: {
      ".cover-photo": {
        marginBottom: "1rem",
        cursor: "pointer",
      },

      ".avatar-input": {
        marginTop: "-100px",
        marginLeft: "1rem",
        cursor: "pointer",
      },

      "div.bio-wrapper": {
        background: props.theme.tertiaryColor2,
        marginBottom: "1.4rem",
        borderBottom: `1px solid ${props.theme.accentColor}`,
        padding: "0.5rem",

        label: {
          color: props.theme.secondaryColor,
          marginBottom: "0.4rem",
        },

        textarea: {
          fontSize: "1rem",
          width: "100%",
          background: props.theme.tertiaryColor2,
          border: "none",
          fontFamily: props.theme.font,
          color: props.theme.primaryColor,
        },
      },
    },
  },
  "@media screen and (max-width: 760px)": {
    ".flex-wrapper": {
      display: "block",
    },
  },
}));

export const EditProfile = ({ data, loading, setUser }: any) => {
  if (loading) return <Loader />;

  return (
    <Wrapper>
      <div className="flex-wrapper">
        <EditProfileForm profile={data && data?.profile} setUser={setUser} />
      </div>
    </Wrapper>
  );
};
