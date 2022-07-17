import { useNavigate } from "react-router-dom";

const Redirect = ({ to }: { to: string }) => {
  const navigate = useNavigate();

  navigate(to);

  return (
    <div className="h-screen overflow-hidden z-[10] flex items-center justify-center">
      <h2 className="font-extrabold text-[36px]">Redirecting to {to}...</h2>
    </div>
  );
};

export default Redirect;
