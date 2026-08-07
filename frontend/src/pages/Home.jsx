import { Link } from "react-router-dom";

function Home() {
  const token = localStorage.getItem("token");

  return (
    <div className="home">
      <h1>Welcome to PlaylistHub</h1>

      <p>
        Create playlists, search for music, and save your favorite songs.
      </p>

      {token ? (
        <Link className="home-button" to="/playlists">
          View My Playlists
        </Link>
      ) : (
        <Link className="home-button" to="/register">
          Get Started
        </Link>
      )}

      <h2>Features</h2>

      <div className="feature-card">
        <ul className="home-list">
          <li>Create, edit, and delete playlists</li>
          <li>Search for songs and artists</li>
          <li>Listen to 30-second song previews</li>
          <li>Add and remove songs from playlists</li>
        </ul>
      </div>

      <h2>Technologies Used</h2>

      <div className="tech-list">
        <span>JavaScript</span>
        <span>React</span>
        <span>Node.js</span>
        <span>Express</span>
        <span>MongoDB</span>
        <span>Mongoose</span>
        <span>JWT</span>
        <span>iTunes API</span>
      </div>
    </div>
  );
}

export default Home;