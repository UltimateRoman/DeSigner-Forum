import { FormEventHandler, useState } from "react";
import Loading from "../components/Loading";
import Redirect from "../components/Redirect";
import { useAuth } from "../context/AuthProvider";
import Default from "../layouts/default";

import CreateNFTImage from "../assets/create-nft.png";

const Create: React.FC = (props) => {
  const [title, setTitle] = useState<string>("");
  const [copies, setCopies] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);

  const { isLoading, isAuthenticated, createNFT } = useAuth();

  if (isLoading) return <Loading />;

  if (!isAuthenticated) return <Redirect to="/" />;

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await createNFT(title, parseInt(copies), image as File);
    if (success) alert("NFT created");
    else alert("Some error occured");
    setLoading(false);
  };

  return (
    <Default>
      <div className="h-full pt-[100px] flex flex-col lg:flex-row justify-center items-center">
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-7xl font-black">Create NFT</h1>
          <p className="mt-[10px] text-gray-200 font-medium text-[18px]">
            As a Fashion designer, you can create NFTs of your designs!     
          </p>
          <form
            className="flex flex-col items-start w-full mt-[10px]"
            onSubmit={handleSubmit}
          >
            <div className="mt-[20px] w-full max-w-[400px]">
              <label htmlFor="title" className="text-lg font-bold mb-[10px]">
                Title
              </label>
              <input
                required
                id="title"
                type="text"
                name="title"
                className="border border-gray-300 rounded bg-transparent px-[10px] py-[7px] w-full"
                placeholder="Enter the Title of your design"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mt-[20px] w-full max-w-[400px]">
              <label htmlFor="copies" className="text-lg font-bold mb-[10px]">
                Number of Copies
              </label>
              <input
                required
                id="copies"
                type="number"
                name="copies"
                className="border border-gray-300 rounded bg-transparent px-[10px] py-[7px] w-full"
                placeholder="Enter the number of NFT copies to be created"
                value={copies}
                onChange={(e) => setCopies(e.target.value)}
              />
            </div>
            <div className="mt-[20px] w-full max-w-[400px]">
              <label htmlFor="image" className="text-lg font-bold mb-[10px]">
                Upload Design
              </label>
              <input
                required
                id="image"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                name="image"
                className="border border-gray-300 rounded bg-transparent px-[10px] py-[7px] w-full"
                onChange={(e) => setImage(e.target?.files?.[0])}
              />
            </div>
            <div className="block">
              <div className="relative w-auto group">
                <button
                  type="submit"
                  className="transition-all disabled:bg-gray-600 disabled:cursor-not-allowed duration-150 ease-linear group-hover:text-black group-hover:border-white border border-transparent group-hover:bg-transparent block bg-primary text-white px-[50px] py-[10px] rounded font-bold uppercase mt-[30px]"
                  disabled={loading}
                >
                  Create NFT
                  <span className="transition-all duration-150 ease-linear group-hover:bg-white group-hover:border-0 h-full w-full rounded absolute border top-0 left-0 z-[-1] translate-x-[20px] translate-y-[10px]"></span>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex-1 flex items-center justify-center h-full w-full">
          <img className="h-[500px] w-auto" src={CreateNFTImage} alt="" />
        </div>
      </div>
    </Default>
  );
};

export default Create;
