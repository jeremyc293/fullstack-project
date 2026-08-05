import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Playlists from "./pages/Playlists.jsx";
import PlaylistDetails from "./pages/PlaylistDetails.jsx";
import SearchMusic from "./pages/SearchMusic.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/playlists/:id" element={<PlaylistDetails />} />
      <Route path="/search" element={<SearchMusic />} />
    </Routes>
  );
}

export default App;