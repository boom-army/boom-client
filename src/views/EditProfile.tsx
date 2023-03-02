import { Loader } from "../components/Loader";
import { EditProfileForm } from "../components/Profile/EditProfileForm";

export const EditProfile = ({ data, loading, setUser }: any) => {
  if (loading) return <Loader />;

  return (
    <EditProfileForm profile={data && data?.profile} setUser={setUser} />
  );
};
