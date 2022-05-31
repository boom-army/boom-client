import { Loader } from "../Loader";
import { EditProfileForm } from "./EditProfileForm";

export const EditProfile = ({ data, loading, setUser }: any) => {
  if (loading) return <Loader />;

  return (
    <EditProfileForm profile={data && data?.profile} setUser={setUser} />
  );
};
