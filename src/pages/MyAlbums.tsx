import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LoadingScreen from "../components/LoadingScreen";

interface Album {
  id: string;
  name: string;
  images: { url: string }[];
  release_date: string;
}

const MyAlbums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedAlbums = async () => {
      const token = localStorage.getItem("spotify_access_token");
      if (!token) return;

      try {
        const res = await fetch("https://api.spotify.com/v1/me/albums", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setAlbums(data.items.map((item: any) => item.album));
      } catch (error) {
        console.error("Error fetching saved albums:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedAlbums();
  }, []);

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

      setAlbums((prev) => prev.filter((album) => album.id !== albumId));
    } catch (error) {
      console.error("Error removing album:", error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-[#222222] text-white min-h-screen w-full">
        <Navbar/>

        <main className="flex flex-col items-start text-left md:text-center md:items-center px-6 sm:px-10 md:px-20 lg:px-[80px] mt-10 w-full">
            <h1 className="font-bold text-4xl sm:text-5xl md:text-[64px] leading-tight max-w-[457px]">
                Mis álbumes <span className="text-[#D6F379]">guardados</span>
             </h1>
            <p className="text-[16px] leading-[32px] tracking-normal font-normal max-w-[407px] mt-6 ">
                Disfruta de tu música a un solo click y descubre qué discos has guardado dentro de "Mis álbumes".
            </p>
        </main>

      {loading ? (
        <LoadingScreen text="Cargando..." />
      ) : albums.length === 0 ? (
        <p className="text-white mt-10">No tienes álbumes guardados.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 max-w-[1240px] w-full md:px-20  px-6">
          {albums.map((album) => (
            <div key={album.id} className="p-4 rounded-lg bg-[#222] flex flex-col items-start text-left">
              <img
                src={album.images[0]?.url || "https://via.placeholder.com/200"}
                alt={album.name}
                className="w-full h-[241px] object-cover rounded-[12px]"
              />
              <h3 className="text-[24px] font-semibold text-white mt-4">{album.name}</h3>
              <p className="text-sm text-gray-400 mt-2">Publicado: {album.release_date}</p>
              <div className="flex-grow"></div>
              <button
                onClick={() => removeAlbum(album.id)}
                className="w-[184px] h-[44px] rounded-[24px] bg-[#E3513D] text-white font-bold px-[24px] mt-[42px] hover:bg-[#c53d32] transition cursor-pointer"
              >
                - Remove album
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAlbums;
