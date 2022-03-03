import React from "react";
import { User } from "../User";
import { CustomResponse } from "../CustomResponse";
import { Loader } from "../Loader";
import { styled } from "@mui/material/styles";
import { User as UserProps } from "../../generated/graphql";

const Wrapper = styled("div")({
  paddingTop: "0.4rem",
});
interface Props{
  users :any,
  loading:boolean
}

const SearchResultUsers = ({ loading, users }:Props) => {
  if (loading) return <Loader />;

  if (users === undefined)
    return (
      <CustomResponse text="Use the search bar to find tags, people and tweets" />
    );

  return (
    <Wrapper>
      {users?.searchByUser?.length ? (
        users.searchByUser.map((user:UserProps) => <User key={user.id} user={user} />)
      ) : (
        <CustomResponse text="No user found, try a different search" />
      )}
    </Wrapper>
  );
};

export default SearchResultUsers;
