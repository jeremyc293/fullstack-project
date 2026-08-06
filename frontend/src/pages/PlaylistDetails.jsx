import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPlaylistById, removeSong, } from "../services/playlistService.js";

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

  async function handleRemoveSong(index) {
    const data = await removeSong(id, index);

    if (data.playlist) {
      setPlaylist(data.playlist);
      setMessage(data.message);
    } else {
      setMessage(data.message);
    }
  }

  if (message && !playlist) {
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

      {message && <p>{message}</p>}

      <h2>Songs</h2>

      {playlist.songs.length === 0 ? (
        <p>This playlist does not have any songs yet.</p>
      ) : (
        playlist.songs.map((song, index) => (
          <div key={song._id || index}>
            {song.artwork && (
              <img
                src={song.artwork}
                alt={`${song.title} album cover`}
              />
            )}

            <h3>{song.title}</h3>
            <p>{song.artist}</p>
            <p>{song.album}</p>

            <button
              type="button"
              onClick={() => handleRemoveSong(index)}
            >
              Remove Song
            </button>
          </div>
        ))
      )}

      <p>
        <Link to="/search">Search for Songs</Link>
      </p>

      <p>
        <Link to="/playlists">Back to Playlists</Link>
      </p>
    </div>
  );
}

export default PlaylistDetails;