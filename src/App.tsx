import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Create from "./pages/create";
import Profile from "./pages/profile";
import "./App.css";

import { useState, useEffect } from "react";

import Deso from "deso-protocol";
const deso = new Deso();

interface User {
  address: string;
  username: string;
  profilePic: string;
}

function App() {
  const [userData, setUserData] = useState<User>();

  useEffect(() => {}, []);

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
        profilePic: pfp,
      };
      setUserData(userData);
    } catch (error) {
      console.log("Error", error);
    }
  };

  // const logout = async () => {
  //   try {
  //     await deso.identity.logout();
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // };

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
