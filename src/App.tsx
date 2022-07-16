import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Create from "./pages/create";
import Profile from "./pages/profile";
import "./App.css";

import Deso from "deso-protocol";
const deso = new Deso();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="create" element={
            <Create />
          }/>
          <Route path="profile" element={
            <Profile />
          }/>
          {/* <Route path="teams" element={<Teams />}>
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} />
        </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
