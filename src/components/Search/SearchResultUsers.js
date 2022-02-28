import React from "react";
import { User } from "../User";
import { CustomResponse } from "../CustomResponse";
import { Loader } from "../Loader";
import { styled } from '@mui/material/styles';

 const Wrapper = styled('div')({
  paddingTop: '0.4rem',
 });

const SearchResultUsers = ({ loading, users }) => {
	if (loading) return <Loader />;

	if (users === undefined)
		return (
			<CustomResponse text="Use the search bar to find tags, people and tweets" />
		);

	return (
		<Wrapper>
			{users?.searchByUser?.length ? (
				users.searchByUser.map(user => <User key={user.id} user={user} />)
			) : (
				<CustomResponse text="No user found, try a different search" />
			)}
		</Wrapper>
	);
};

export default SearchResultUsers;
