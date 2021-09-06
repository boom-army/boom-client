import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Loader } from "./Loader";
import Follow from "./Profile/Follow";
import { USERS } from "../queries/others";
import Button from "../styles/Button";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";

const Wrapper = styled.div`
  margin-left: 0.4rem;
  background: ${(props) => props.theme.tertiaryColor2};
  border-radius: 10px;

  div:last-child {
    border-bottom: none;
  }
`;

const UserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid ${(props) => props.theme.tertiaryColor};
  font-size: 0.9rem;

  button {
    align-self: flex-start;
  }

  .avatar-handle,
  .avatar {
    display: flex;

    a {
      margin-right: 1rem;
    }
  }

  .handle-fullname {
    display: flex;
    flex-direction: column;

    span:first-child {
      font-weight: 500;
    }

    span.secondary {
      color: ${(props) => props.theme.secondaryColor};
    }
  }
`;

export const User = ({ user }) => (
  <UserWrapper>
    <div className="avatar-handle">
      <Link to={`/${user && user.handle}`}>
        {/* {user && user.avatar ? <Avatar size="large" src={user.avatar} /> : <Avatar size="large" icon={<UserOutlined />} />} */}
        <Avatar>
          <PersonIcon />
        </Avatar>
      </Link>

      <div className="handle-fullname">
        <Link to={`/${user && user.handle}`}>
          <span>{user && user.fullname}</span>
        </Link>
        <span className="secondary">@{user && user.handle}</span>
      </div>
    </div>

    {user && !user.isSelf ? (
      <Follow sm id={user && user.id} isFollowing={user && user.isFollowing} />
    ) : (
      <Link to="/settings/profile">
        <Button sm outline className="action-btn">
          Edit Profile
        </Button>
      </Link>
    )}
  </UserWrapper>
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
