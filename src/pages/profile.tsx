import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import NFTCard from "../components/NFTCard";
import Redirect from "../components/Redirect";
import { useAuth } from "../context/AuthProvider";
import Default from "../layouts/default";

const Profile = (props: any) => {
  const { userData, isAuthenticated, isLoading, fetchNFTs } = useAuth();

  const [NFTS, setNFTS] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const NFTS = await fetchNFTs();
      setNFTS(NFTS);
    })();
  }, []);

  if (isLoading) return <Loading />;

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <Default>
      <div className="pt-[100px] flex flex-col lg:flex-row lg:items-start lg:justify-start">
        <div className="lg:mr-[50px]">
          <img
            className="rounded"
            src={userData?.profilePic}
            alt=""
            height={300}
            width={300}
          />
        </div>
        <div>
          <h1 className="text-7xl font-black">{userData?.username}</h1>
          <p className="mt-[20px] font-bold text-[20px] text-white">
            Public Key
          </p>
          <p className="text-gray-300 text-[16px] font-medium break-all">
            {userData?.address}
          </p>
          <p className="mt-[20px] font-bold text-[20px] text-white">
            Description
          </p>
          <p className="text-gray-300 text-[16px] font-medium">
            {userData?.description}
          </p>
        </div>
      </div>
      <h2 className="mt-[50px] mb-[30px] font-extrabold text-3xl">NFTs</h2>
      <div className="mb-[100px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
        {NFTS?.map((nft: any) => (
          <NFTCard
            image={nft?.ImageURLs?.[0]}
            postHashHex={nft?.PostHashHex}
            description={nft?.Body}
            key={nft?.PostHashHex}
          />
        ))}
      </div>
    </Default>
  );
};

export default Profile;
