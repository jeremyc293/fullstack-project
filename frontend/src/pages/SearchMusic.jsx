import { useEffect, useState } from "react";
import { searchSongs } from "../services/musicService.js";
import {
  addSongToPlaylist,
  getPlaylists,
} from "../services/playlistService.js";

function SearchMusic() {
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadPlaylists() {
      const data = await getPlaylists();

      if (Array.isArray(data)) {
        setPlaylists(data);

        if (data.length > 0) {
          setPlaylistId(data[0]._id);
        }
      }
    }

    loadPlaylists();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!searchTerm) {
      setMessage("Enter a song or artist.");
      return;
    }

    const results = await searchSongs(searchTerm);

    setSongs(results);
    setMessage("");

    if (results.length === 0) {
      setMessage("No songs found.");
    }
  }

  async function handleAddSong(song) {
    if (!playlistId) {
      setMessage("Create or select a playlist first.");
      return;
    }

    const songData = {
      title: song.trackName,
      artist: song.artistName,
      album: song.collectionName,
      artwork: song.artworkUrl100,
    };

    const data = await addSongToPlaylist(playlistId, songData);

    setMessage(data.message);
  }

  return (
    <div>
      <h1>Search Music</h1>

      <label>Select a Playlist</label>

      <select
        value={playlistId}
        onChange={(event) => setPlaylistId(event.target.value)}
      >
        {playlists.length === 0 && (
          <option value="">No playlists available</option>
        )}

        {playlists.map((playlist) => (
          <option key={playlist._id} value={playlist._id}>
            {playlist.name}
          </option>
        ))}
      </select>

      <form onSubmit={handleSubmit}>
        <label>Song or Artist</label>

        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Example: Drake"
        />

        <button type="submit">Search</button>
      </form>

      {message && <p>{message}</p>}

      {songs.map((song) => (
        <div key={song.trackId}>
          <img
            src={song.artworkUrl100}
            alt={`${song.trackName} album cover`}
          />

          <h2>{song.trackName}</h2>
          <p>{song.artistName}</p>
          <p>{song.collectionName}</p>

          <button type="button" onClick={() => handleAddSong(song)}>
            Add to Playlist
          </button>
        </div>
      ))}
    </div>
  );
}

export default SearchMusic;