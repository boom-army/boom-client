import React from "react";
import Avatar from "@mui/material/Avatar";
import Follow from "./Profile/Follow";
import PersonIcon from "@mui/icons-material/Person";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Loader } from "./Loader";
import { USERS } from "../queries/others";
import { useQuery } from "@apollo/client";
import { Button } from "@mui/material";

const Wrapper = styled.div`
  margin-left: 0.4rem;
  background: ${(props) => props.theme.tertiaryColor2};
  border-radius: 10px;

  div:last-child {
    border-bottom: none;
  }
`;

export const User = ({ user }) => (
  <>
    <div className="avatar-handle">
      <Link to={`/${user && user.handle}`}>
        <Avatar src={user && user.avatar ? user.avatar : <PersonIcon />} />
      </Link>

      <div className="handle-fullname">
        <Link to={`/${user && user.handle}`}>
          <span>{user && user.fullname}</span>
        </Link>
        <span className="secondary">@{user && user.handle}</span>
      </div>
    </div>

    {/* {user && !user.isSelf ? (
      <Follow sm id={user && user.id} isFollowing={user && user.isFollowing} />
    ) : ( */}
      <Button variant="contained" component={Link} to="/settings/profile">Edit Profile</Button>
    {/* )} */}
  </>
);

export const WhoToFollow = () => {
  const { loading, error, data } = useQuery(USERS);

  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;

  return (
    <Wrapper>
      {data.users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </Wrapper>
  );
};
