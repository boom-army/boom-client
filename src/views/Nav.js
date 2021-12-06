import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";
import { MorePopUp } from "../components/MorePopup";
import { PROFILE } from "../queries/profile";
import Person from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import Language from "@mui/icons-material/Language";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Wrapper = styled.nav`
  font-weight: 500;
  min-height: 100vh;

  .badge {
    padding: 2px 7px;
    border-radius: 50%;
    background: ${(props) => props.theme.accentColor};
    color: white;
    top: -10px;
    position: relative;
    font-size: 0.7em;
  }

  svg {
    width: 28px;
    height: 28px;
    margin-right: 0.5rem;
    position: relative;
    color: ${(props) => props.theme.accentColor};
    top: 7px;
  }

  .logo {
    margin-bottom: 1.3rem;
  }

  ul {
    margin-top: 1.3rem;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  li {
    margin-bottom: 2rem;
  }

  .selected,
  .selected svg {
    color: ${(props) => props.theme.accentColor};
    fill: ${(props) => props.theme.accentColor};
  }

  @media screen and (max-width: 900px) {
    span {
      display: none;
    }

    svg {
      margin-right: 0;
    }

    li {
      margin: none;
    }

    button {
      display: none;
    }
  }

  @media screen and (max-width: 530px) {
    bottom: 0;
    width: 100vw;
    border-right: none;
    height: 4rem;
    border-top: 1px solid ${(props) => props.theme.tertiaryColor};
    z-index: 2;
    background: ${(props) => props.theme.background};

    ul {
      flex-direction: row;
      justify-content: space-between;
    }

    li {
    }

    svg {
      width: 22px;
      height: 22px;
    }
  }

  @media screen and (max-width: 500px) {
  }
`;

export const Nav = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { data } = useQuery(PROFILE, {
    variables: { id: user?.id },
  });

  return (
    <Wrapper>
      <ul>
        <li>
          <NavLink exact activeClassName="selected" to="/">
            <Language /> <span>Global</span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" to="/following">
            <Person /> <span>Following</span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" to="/connect">
            <GroupIcon /> <span>Connect</span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected " to="/notifications">
            <NotificationsIcon /> <span>Notifications</span>
            {data?.profile?.newMentionsCount >= 1 && (
              <span className="badge">{data?.profile?.newMentionsCount}</span>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" to="/profile">
            <AccountCircleIcon /> <span>Profile</span>
          </NavLink>
        </li>
        <li>
          <MorePopUp />
        </li>
        {/* <li> */}
        {/* 	<Logout /> */}
        {/* </li> */}
        {/* <li style={{ display: "" }}> */}
        {/* 	<ToggleTheme /> */}
        {/* </li> */}
      </ul>
    </Wrapper>
  );
};
