import { useState } from "react";
import { searchSongs } from "../services/musicService.js";

function SearchMusic() {
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState([]);
  const [message, setMessage] = useState("");

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

  return (
    <div>
      <h1>Search Music</h1>

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
        </div>
      ))}
    </div>
  );
}

export default SearchMusic;