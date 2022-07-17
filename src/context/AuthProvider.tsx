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
}

const deso = new Deso();

export const AuthContext = createContext<AuthContextTypes>({
  userData: null,
  isAuthenticated: false,
  isLoading: true,
  fetchNFTs: () => {},
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
      const request = {
        UserPublicKeyBase58Check: userData?.username,
      };
      const response = await deso.nft.getNftsForUser(request);
      const keys = Object.keys(response?.NFTsMap);
      keys.forEach((key) => {
        const nft = response?.NFTsMap[key];
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

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, userData, login, logout, fetchNFTs }}
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
