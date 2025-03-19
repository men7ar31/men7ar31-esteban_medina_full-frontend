// src/pages/Callback.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      fetchAccessToken(code);
    }
  }, []);

  const fetchAccessToken = async (code: string) => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
    const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`, // Base64 encoding
      },
      body: new URLSearchParams({
        code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const data = await response.json();
    console.log("Token response:", data);

    if (data.access_token) {
      localStorage.setItem("spotify_access_token", data.access_token);
      navigate("/search"); // Redirige a la página principal
    } else {
      console.error("Error obteniendo el token:", data);
    }
  };

  return <div className="text-center mt-10">Autenticando...</div>;
};

export default Callback;
