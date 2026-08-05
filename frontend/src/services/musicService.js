const BASE_URL = "https://itunes.apple.com/search";

export async function searchSongs(searchTerm) {
  const term = encodeURIComponent(searchTerm);

  const response = await fetch(
    `${BASE_URL}?term=${term}&entity=song&limit=10`
  );

  const data = await response.json();

  return data.results;
}