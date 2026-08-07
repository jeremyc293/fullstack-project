const BASE_URL = `${import.meta.env.VITE_API_URL}/api/playlists`;

export async function getPlaylists() {
  const token = localStorage.getItem("token");

  if (!token) {
    return {
      message: "Access denied. No token provided.",
    };
  }

  const response = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function createPlaylist(playlist) {
  const token = localStorage.getItem("token");

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(playlist),
  });

  return response.json();
}

export async function getPlaylistById(id) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function addSongToPlaylist(playlistId, song) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/${playlistId}/songs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(song),
  });

  return response.json();
}

export async function removeSong(playlistId, songIndex) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${BASE_URL}/${playlistId}/songs/${songIndex}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
}

export async function updatePlaylist(id, playlist) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(playlist),
  });

  return response.json();
}

export async function deletePlaylist(id) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}