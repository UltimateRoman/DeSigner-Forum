import { createContext, useContext, useEffect, useState } from "react";
import Deso from "deso-protocol";

interface User {
  address: string;
  username: string;
  profilePic: string;
  description: string;
}

interface AuthContextTypes {
  userData: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  fetchNFTs: () => any;
  login: () => any;
  logout: () => any;
  createNFT: (title: string, copies: number, image: File) => any;
}

const deso = new Deso();

export const AuthContext = createContext<AuthContextTypes>({
  userData: null,
  isAuthenticated: false,
  isLoading: true,
  fetchNFTs: () => {},
  createNFT: () => {},
  login: () => {},
  logout: () => {},
});

const AuthProvider: React.FC<{ children: any }> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (!isAuthenticated) {
        const user = deso.user as any;
        if (user?.identity?.loggedInUser !== null) {
          const key = user?.identity?.loggedInKey;
          const pfp = await deso.user.getSingleProfilePicture(key);
          const request = {
            PublicKeyBase58Check: key,
          };
          const response = await deso.user.getSingleProfile(request);
          console.log(response);
          const userData: User = {
            address: key,
            username: response?.Profile?.Username as string,
            description: response?.Profile?.Description as string,
            profilePic: pfp,
          };
          setUserData(userData);
          setIsAuthenticated(true);
        }
      }
      setIsLoading(false);
    })();
  }, []);

  const logout = async () => {
    try {
      const publicKey = deso.identity.getUserKey() as string;
      await deso.identity.logout(publicKey);
      setIsAuthenticated(false);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const fetchNFTs = async () => {
    try {
      const Nfts: any = [];
      const publicKey = deso.identity.getUserKey() as string;
      const request = {
        UserPublicKeyBase58Check: publicKey,
      };
      const response = (await deso.nft.getNftsForUser(request)) as any;
      const keys = Object.keys(response?.data?.NFTsMap);
      keys.forEach((key) => {
        const nft = response?.data?.NFTsMap[key]?.PostEntryResponse;
        Nfts.push(nft);
      });
      return Nfts;
    } catch (error) {
      console.log("Error", error);
    }
  };

  const login = async () => {
    try {
      const user = await deso.identity.login();
      const pfp = await deso.user.getSingleProfilePicture(user.key);
      const request = {
        PublicKeyBase58Check: user.key,
      };
      const response = await deso.user.getSingleProfile(request);
      const userData: User = {
        address: user.key,
        username: response?.Profile?.Username as string,
        description: response?.Profile?.Description as string,
        profilePic: pfp,
      };
      setUserData(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const createNFT = async (title: string, copies: number, image: File) => {
    try {
      const request0 = {
        UserPublicKeyBase58Check: userData?.address,
        file: image,
      };
      const response0 = (await deso.media.uploadImage(request0)) as any;
      const request1 = {
        UpdaterPublicKeyBase58Check: userData?.address as string,
        BodyObj: {
          Body: title,
          ImageURLs: [response0?.ImageURL],
          VideoURLs: [],
        },
      };
      const response1 = await deso.posts.submitPost(request1);
      const request2 = {
        UpdaterPublicKeyBase58Check: userData?.address,
        NFTPostHashHex: response1?.submittedTransactionResponse?.PostEntryResponse?.PostHashHex,
        NumCopies: copies,
        NFTRoyaltyToCreatorBasisPoints: 100,
        NFTRoyaltyToCoinBasisPoints: 100,
        HasUnlockable: false,
        IsForSale: false,
        MinFeeRateNanosPerKB: 1000
      };
      const response2 = await deso.nft.createNft(request2);
      return true;
    } catch (error) {
      console.log("Error", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        userData,
        login,
        logout,
        fetchNFTs,
        createNFT,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextProps = useContext(AuthContext);

  return { ...authContextProps };
};

export default AuthProvider;
