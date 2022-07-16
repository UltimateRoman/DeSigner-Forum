import { FormEventHandler, useState } from "react";
import Default from "../layouts/default";

const Create: React.FC = (props) => {
  const [name, setName] = useState<string>("");

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log({ name });
  };

  return (
    <Default>
      <div className="pt-[100px] flex flex-col items-start justify-center">
        <h1 className="text-7xl font-black">Create NFT</h1>
        <p className="mt-[10px] text-gray-200 font-medium text-[18px]">
          Lorem ipsum dolor cool cool dolor lorem ipsum
        </p>
        <form
          className="flex flex-col items-start w-full mt-[10px]"
          onSubmit={handleSubmit}
        >
          {/* To add more fields, duplicate the below div from here */}
          <div className="mt-[20px]">
            <label htmlFor="name" className="text-lg font-bold mb-[10px]">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="border rounded bg-transparent px-[10px] py-[7px] w-full max-w-[400px]"
              placeholder="Enter the name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* to here */}
          <div className="block">
            <div className="relative w-auto group">
              <button
                type="submit"
                className="transition-all duration-150 ease-linear group-hover:text-black group-hover:border border-white group-hover:bg-transparent block bg-primary text-white px-[50px] py-[10px] rounded font-bold uppercase mt-[30px]"
              >
                Create NFT
                <span className="transition-all duration-150 ease-linear group-hover:bg-white group-hover:border-0 h-full w-full rounded absolute border top-0 left-0 z-[-1] translate-x-[20px] translate-y-[10px]"></span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </Default>
  );
};

export default Create;
