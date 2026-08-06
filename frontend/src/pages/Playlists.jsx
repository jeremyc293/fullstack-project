import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPlaylist,getPlaylists, } from "../services/playlistService.js";

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

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
      setMessage("");
    } else {
      setMessage(data.message);
    }
  }

  return (
    <div>
      <h1>My Playlists</h1>

      <form onSubmit={handleSubmit}>
        <h2>Create Playlist</h2>

        <label>Playlist Name</label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <button type="submit">Create Playlist</button>
      </form>

      {message && <p>{message}</p>}

      {playlists.length === 0 && !message && (
        <p>You do not have any playlists yet.</p>
      )}

      {playlists.map((playlist) => (
        <div className="playlist-card" key={playlist._id}>
          <h2>{playlist.name}</h2>
          <p>{playlist.description}</p>
          <p>{playlist.songs.length} songs</p>

          <Link to={`/playlists/${playlist._id}`}>
            View Playlist
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Playlists;