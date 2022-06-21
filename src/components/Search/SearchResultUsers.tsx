import React from "react";
import { User } from "../User";
import { CustomResponse } from "../CustomResponse";
import { Loader } from "../Loader";
import { User as UserProps } from "../../generated/graphql";
import { Box, Grid } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  users: any;
  loading: boolean;
  fetchMoreUsers: any;
}

const SearchResultUsers = ({ loading, users, fetchMoreUsers }: Props) => {
  if (loading) return <Loader />;

  if (users === undefined)
    return (
      <CustomResponse text="Use the search bar to find tags, people and meeps" />
    );

  return (
    <Grid
      container
      id="userScroll"
      sx={{
        height: "90vh",
        overflow: "auto",
      }}
    >
      <Grid item xs={12}>
        <InfiniteScroll
          dataLength={users?.searchUser?.length}
          next={() =>
            fetchMoreUsers({
              variables: {
                offset: users?.searchUser?.length ?? 0,
              },
            })
          }
          hasMore={true}
          scrollableTarget="userScroll"
          loader={
            loading && (
              <Box sx={{ marginTop: "1rem" }}>
                <Loader />
              </Box>
            )
          }
        >
          {users?.searchUser?.length ? (
            users.searchUser.map((user: UserProps) => (
              <User key={user.id} user={user} />
            ))
          ) : (
            <CustomResponse text="No user found, try a different search" />
          )}
        </InfiniteScroll>
      </Grid>
    </Grid>
  );
};

export default SearchResultUsers;
