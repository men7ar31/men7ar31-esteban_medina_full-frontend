// src/services/spotifyAuth.ts
export const getSpotifyAuthUrl = () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
    const scope = 'user-library-read user-library-modify user-read-private';
    const state = Math.random().toString(36).substring(7);  
    
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
    
    return authUrl;
  };
  