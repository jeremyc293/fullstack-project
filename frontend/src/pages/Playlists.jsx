import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createPlaylist,
  getPlaylists,
} from "../services/playlistService.js";

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const totalPlaylists = playlists.length;

  const totalSongs = playlists.reduce((total, playlist) => {
    return total + playlist.songs.length;
  }, 0);

  useEffect(() => {
    loadPlaylists();
  }, []);

  async function loadPlaylists() {
    const data = await getPlaylists();

    if (Array.isArray(data)) {
      setPlaylists(data);
    } else {
      setMessage(data.message);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const data = await createPlaylist({
      name,
      description,
    });

    if (data.playlist) {
      setPlaylists([data.playlist, ...playlists]);
      setName("");
      setDescription("");
      setMessage("Playlist created successfully.");
    } else {
      setMessage(data.message);
    }
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>My Playlists</h1>
          <p>Create and organize your favorite music.</p>
        </div>

        <Link className="search-link" to="/search">
          Search Music
        </Link>
      </div>

      <div className="stats">
        <div>
          <h3>{totalPlaylists}</h3>
          <p>Total Playlists</p>
        </div>

        <div>
          <h3>{totalSongs}</h3>
          <p>Total Songs</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <h2>Create Playlist</h2>

        <label>Playlist Name</label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Example: Workout Mix"
          required
        />

        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Describe your playlist"
        />

        <button type="submit">Create Playlist</button>
      </form>

      {message && <p className="message">{message}</p>}

      {playlists.length === 0 && !message && (
        <div className="empty-state">
          <h2>No playlists yet</h2>
          <p>Create your first playlist using the form above.</p>
        </div>
      )}

      <div className="playlist-grid">
        {playlists.map((playlist) => (
          <div className="playlist-card" key={playlist._id}>
            <div className="playlist-icon">♫</div>

            <div className="playlist-card-content">
              <h2>{playlist.name}</h2>

              <p>
                {playlist.description || "No description provided."}
              </p>

              <span className="song-count">
                {playlist.songs.length}{" "}
                {playlist.songs.length === 1 ? "song" : "songs"}
              </span>
            </div>

            <Link
              className="view-playlist-link"
              to={`/playlists/${playlist._id}`}
            >
              View Playlist
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlists;