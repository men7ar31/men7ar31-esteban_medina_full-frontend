import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaCheckCircle } from "react-icons/fa";
import LoadingScreen from "../components/LoadingScreen";

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
  followers: { total: number };
  popularity: number;
}

interface Album {
  id: string;
  name: string;
  images: { url: string }[];
  release_date: string;
}

const ArtistDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchArtist = async () => {
      const token = localStorage.getItem("spotify_access_token");
      if (!token) return;

      try {
        const artistRes = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const artistData = await artistRes.json();
        setArtist(artistData);

        const albumsRes = await fetch(`https://api.spotify.com/v1/artists/${id}/albums?limit=8`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const albumsData = await albumsRes.json();
        setAlbums(albumsData.items);
      } catch (error) {
        console.error("Error fetching artist details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  useEffect(() => {
    const fetchSavedAlbums = async () => {
      const token = localStorage.getItem("spotify_access_token");
      if (!token) return;

      try {
        const res = await fetch("https://api.spotify.com/v1/me/albums", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const savedAlbumsIds = data.items.map((item: any) => item.album.id);
        setFavorites(savedAlbumsIds);
      } catch (error) {
        console.error("Error fetching saved albums:", error);
      }
    };

    fetchSavedAlbums();
  }, []);

  const saveAlbum = async (albumId: string) => {
    const token = localStorage.getItem("spotify_access_token");
    if (!token) return;

    try {
      await fetch("https://api.spotify.com/v1/me/albums", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: [albumId] }),
      });

      setFavorites((prev) => [...prev, albumId]);
    } catch (error) {
      console.error("Error saving album:", error);
    }
  };

  const removeAlbum = async (albumId: string) => {
    const token = localStorage.getItem("spotify_access_token");
    if (!token) return;

    try {
      await fetch("https://api.spotify.com/v1/me/albums", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: [albumId] }),
      });

      setFavorites((prev) => prev.filter((id) => id !== albumId));
    } catch (error) {
      console.error("Error removing album:", error);
    }
  };

  const toggleFavorite = (albumId: string) => {
    if (favorites.includes(albumId)) {
      removeAlbum(albumId);
    } else {
      saveAlbum(albumId);
    }
  };

  if (loading) {
    return <LoadingScreen text="Cargando..." />;
  }

  if (!artist) {
    return <div className="text-white text-center mt-10">Artista no encontrado.</div>;
  }

  return (
    <div className="flex flex-col items-center bg-[#222222] text-white min-h-screen w-full">
        <Navbar/>
      <div className="max-w-[1240px] w-full px-6 py-10 md:px-20 px-6">
        <div className="flex flex-col items-left md:flex-row md:items-start md:space-x-10">
          <img
            src={artist.images[0]?.url || "https://via.placeholder.com/300"}
            alt={artist.name}
            className="w-[237px] h-[236px] object-cover rounded-full"
          />
          <div className="md:text-left mt-6 md:mt-0">
            <p className="font-semibold text-[16px] flex items-center gap-2">
              <FaCheckCircle className="text-[#619CED]" />Artista certificado
            </p>
            <h1 className="font-bold text-4xl sm:text-5xl md:text-[64px] leading-[100%] tracking-normal mb-8 mt-[9px]">
              {artist.name}
            </h1>
            <p className="font-semibold text-[16px]">Followers: {artist.followers.total.toLocaleString()}</p>
            <p className="font-semibold text-[16px] mt-[9px]">Oyentes mensuales: {artist.popularity}%</p>
          </div>
        </div>

        <p className="font-[400px] text-[16px] mt-[119px] ml-2">Guarda tus álbumes favoritos de {artist.name}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {albums.map((album) => (
            <div key={album.id} className="p-4 rounded-lg bg-[#222222] relative overflow-hidden flex flex-col min-h-full">
              <img
                src={album.images[0]?.url || "https://via.placeholder.com/200"}
                alt={album.name}
                className="w-full h-[241px] object-cover rounded-[12px]"
              />
              <h3 className="text-[24px] font-semibold text-white mt-4">{album.name}</h3>
              <p className="text-sm text-white mt-2">Publicado: {album.release_date}</p>

              <div className="flex-grow"></div>

              <button
                onClick={() => toggleFavorite(album.id)}
               className={`w-[184px] h-[44px] rounded-[24px]  font-bold px-[24px] mt-[42px] cursor-pointer ${
                  favorites.includes(album.id) ? "bg-[#E3513D] text-white" : "bg-[#D6F379] text-black"
                }`}
              >
                {favorites.includes(album.id) ? "- Remove album" : "+ Add album"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetail;
