import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>PlaylistHub</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/playlists">My Playlists</Link>
        <Link to="/search">Search Music</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;