import Default from "../layouts/default";

const Profile: React.FC = (props) => {
  return (
    <Default>
      <div className="pt-[100px] flex flex-col items-start justify-center">
        <h1 className="text-7xl font-black">Profile</h1>
        <p className="mt-[20px] text-gray-200 font-medium">
          lorem ipsum dolor cool cool dolor lorem ipsum (remove this if
          unnecessary)
        </p>
      </div>
    </Default>
  );
};

export default Profile;
