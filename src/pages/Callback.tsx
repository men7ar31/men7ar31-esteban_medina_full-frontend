import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

const Callback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const error = urlParams.get("error");

    if (error) {
      console.error("Error en la autenticación:", error);
      navigate("/");
      return;
    }

    if (code) {
      console.log("Código recibido:", code); // Debug
      fetchAccessToken(code);
    } else {
      console.error("No se recibió código de autenticación");
      navigate("/");
    }
  }, []);

  const fetchAccessToken = async (code: string) => {
    try {
      const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
      const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
        body: new URLSearchParams({
          code,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }),
      });

      const data = await response.json();
      console.log("Respuesta de Spotify:", data); // Debug

      if (data.access_token) {
        localStorage.setItem("spotify_access_token", data.access_token);
        navigate("/search");
      } else {
        console.error("Error obteniendo el token:", data);
      }
    } catch (error) {
      console.error("Error en la solicitud de token:", error);
    }
  };

  return <LoadingScreen text="Autenticando..." />;
};

export default Callback;
