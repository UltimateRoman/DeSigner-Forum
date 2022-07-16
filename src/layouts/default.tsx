import Navbar from "../components/Navbar";

const Default: React.FC<{ children: any }> = (props: any) => {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="max-w-[1440px] mx-auto w-full h-full px-[32px] md:px-[64px] lg:px-[120px]">
        {props.children}
      </div>
    </div>
  );
};

export default Default;
