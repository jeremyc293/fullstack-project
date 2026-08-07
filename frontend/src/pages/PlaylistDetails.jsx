import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deletePlaylist,
  getPlaylistById,
  removeSong,
  updatePlaylist,
} from "../services/playlistService.js";

function PlaylistDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [playlist, setPlaylist] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadPlaylist() {
      const data = await getPlaylistById(id);

      if (data._id) {
        setPlaylist(data);
        setName(data.name);
        setDescription(data.description);
      } else {
        setMessage(data.message);
      }
    }

    loadPlaylist();
  }, [id]);

  async function handleUpdate(event) {
    event.preventDefault();

    const data = await updatePlaylist(id, {
      name,
      description,
    });

    if (data.playlist) {
      setPlaylist(data.playlist);
      setMessage(data.message);
    } else {
      setMessage(data.message);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this playlist?"
    );

    if (!confirmed) {
      return;
    }

    const data = await deletePlaylist(id);

    if (data.message === "Playlist deleted successfully.") {
      navigate("/playlists");
    } else {
      setMessage(data.message);
    }
  }

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
        <p className="message">{message}</p>
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

      <form onSubmit={handleUpdate}>
        <h2>Edit Playlist</h2>

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

        <button type="submit">Save Changes</button>
      </form>

      <button type="button" onClick={handleDelete}>
        Delete Playlist
      </button>

      {message && <p className="message">{message}</p>}

      <h2>Songs</h2>

      {playlist.songs.length === 0 ? (
        <p>This playlist does not have any songs yet.</p>
      ) : (
        playlist.songs.map((song, index) => (
          <div className="song-card" key={song._id || index}>
            {song.artwork && (
              <img
                src={song.artwork}
                alt={`${song.title} album cover`}
              />
            )}

            <div className="song-info">
              <h3>{song.title}</h3>

              <p>{song.artist}</p>

              <p>{song.album}</p>

              {song.previewUrl && (
                <audio controls src={song.previewUrl}>
                  Your browser does not support audio playback.
                </audio>
              )}

              <button
                type="button"
                onClick={() => handleRemoveSong(index)}
              >
                Remove Song
              </button>
            </div>
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