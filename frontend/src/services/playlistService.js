const BASE_URL = "http://localhost:3000/api/playlists";

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