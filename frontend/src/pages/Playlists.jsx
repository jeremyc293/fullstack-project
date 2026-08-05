import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlaylists } from "../services/playlistService.js";

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadPlaylists() {
      const data = await getPlaylists();

      if (Array.isArray(data)) {
        setPlaylists(data);
      } else {
        setMessage(data.message);
      }
    }

    loadPlaylists();
  }, []);

  return (
    <div>
      <h1>My Playlists</h1>

      {message && <p>{message}</p>}

      {playlists.length === 0 && !message && (
        <p>You do not have any playlists yet.</p>
      )}

      {playlists.map((playlist) => (
        <div key={playlist._id}>
          <h2>{playlist.name}</h2>
          <p>{playlist.description}</p>
          <p>{playlist.songs.length} songs</p>

          <Link to={`/playlists/${playlist._id}`}>View Playlist</Link>
        </div>
      ))}
    </div>
  );
}

export default Playlists;