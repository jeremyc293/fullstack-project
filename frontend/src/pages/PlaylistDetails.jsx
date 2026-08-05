import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPlaylistById } from "../services/playlistService.js";

function PlaylistDetails() {
  const { id } = useParams();

  const [playlist, setPlaylist] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadPlaylist() {
      const data = await getPlaylistById(id);

      if (data._id) {
        setPlaylist(data);
      } else {
        setMessage(data.message);
      }
    }

    loadPlaylist();
  }, [id]);

  if (message) {
    return (
      <div>
        <p>{message}</p>
        <Link to="/playlists">Back to Playlists</Link>
      </div>
    );
  }

  if (!playlist) {
    return <p>Loading playlist...</p>;
  }

  return (
    <div>
      <h1>{playlist.name}</h1>

      <p>{playlist.description}</p>

      <h2>Songs</h2>

      {playlist.songs.length === 0 ? (
        <p>This playlist does not have any songs yet.</p>
      ) : (
        playlist.songs.map((song) => (
          <div key={song._id}>
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
            <p>{song.album}</p>
          </div>
        ))
      )}

      <Link to="/search">Search for Songs</Link>

      <br />

      <Link to="/playlists">Back to Playlists</Link>
    </div>
  );
}

export default PlaylistDetails;