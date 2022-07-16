import DefaultLayout from "../layouts/default";

const Home: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="pt-[100px] flex flex-col items-start justify-center">
        <h1 className="text-7xl max-w-[800px] font-black">
          Designer Forum Lorem Ipsum Dolor is Cool
        </h1>
        <p className="mt-[20px] text-gray-200 font-medium">
          lorem ipsum dolor cool cool dolor lorem ipsum
        </p>
        <div className="block">
          <div className="relative w-auto group">
            <button className="transition-all duration-150 ease-linear group-hover:text-black group-hover:border border-white group-hover:bg-transparent block bg-primary text-white px-[50px] py-[10px] rounded font-bold uppercase mt-[30px]">
              Discover
              <span className="transition-all duration-150 ease-linear group-hover:bg-white group-hover:border-0 h-full w-full rounded absolute border top-0 left-0 z-[-1] translate-x-[20px] translate-y-[10px]"></span>
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
