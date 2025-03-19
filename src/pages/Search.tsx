import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Shape.svg";
import { FaChevronLeft, FaChevronRight} from "react-icons/fa";
import Navbar from "../components/Navbar";

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
  followers: { total: number };
}

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Artist[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      fetchArtists();
    }
  }, [page]);

  const fetchArtists = async () => {
    const token = localStorage.getItem("spotify_access_token");
    if (!token) {
      alert("No estás autenticado en Spotify");
      return;
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=4&offset=${(page - 1) * 4}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setResults(data.artists?.items || []);
      setTotalResults(data.artists?.total || 0);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-[#222222] text-white min-h-screen w-full">
      <Navbar/>
      <main className="flex flex-col items-center text-center px-4 md:px-20 mt-10 w-full">
        <h1 className="font-montserrat font-bold text-4xl sm:text-5xl md:text-[64px] leading-tight max-w-[457px]">
          Busca tus <span className="text-[#D6F379]">artistas</span>
        </h1>
        <p className="text-[16px] leading-[32px] tracking-normal text-center font-normal max-w-[457px] mt-6">
             Encuentra tus artistas favoritos gracias a nuestro buscador y guarda tus álbumes favoritos
        </p>


        <div className="flex items-center bg-white rounded-full px-4 py-2 mt-6 w-full max-w-[600px]">
          <input
            type="text"
            placeholder="Nirvana"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-black outline-none px-2"
          />
          <button
            onClick={() => {
              setPage(1);
              fetchArtists();
            }}
            className="bg-[#D6F379] text-black px-6 py-2 rounded-full font-semibold cursor-pointer"
          >
            Search
          </button>
        </div>
      </main>

      <section className="w-full max-w-[1240px] mt-12 px-4 md:px-20 lg:px-[80px] relative">
        {totalResults > 0 && (
          <>
            <p className="text-left">
              Mostrando {results.length} resultados de {totalResults}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4 cursor-pointer">
              {results.map((artist) => (
                <div
                  key={artist.id}
                  onClick={() => navigate(`/artist/${artist.id}`)}
                  className="p-4 rounded-lg bg-[#222222] relative group overflow-hidden transition-all duration-300 hover:bg-[#D6F379] hover:rounded-[12px]"
                >
                  <img
                    src={
                      artist.images?.[0]?.url ||
                      "https://via.placeholder.com/200"
                    }
                    alt={artist.name}
                    className="w-full h-[241px] object-cover rounded-[12px] transition-all duration-300"
                  />
                <h3 className=" font-semibold text-[36px] leading-[100%] text-white group-hover:text-black mt-6">
                     {artist.name}
                </h3>
                <p className="text-sm text-white group-hover:text-black  font-semibold text-[16px] leading-[100%] tracking-[0%] mt-6">
                    Followers: {artist.followers.total}
                </p>

                </div>
              ))}
            </div>
            <Pagination
              page={page}
              totalResults={totalResults}
              setPage={setPage}
            />
          </>
        )}
      </section>
    </div>
  );
};

const Pagination = ({ page, totalResults, setPage }: { page: number; totalResults: number; setPage: (page: number) => void }) => {
  const totalPages = Math.ceil(totalResults / 4);
  const getPages = () => {
    let pages = [];
    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (page <= 3) {
        pages = [1, 2, 3, "...", totalPages];
      } else if (page >= totalPages - 2) {
        pages = [1, "...", totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, "...", page - 1, page, page + 1, "...", totalPages];
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center space-x-2 mt-6 bg-[#222222] p-3 rounded-lg">
      <button onClick={() => setPage(Math.max(page - 1, 1))} disabled={page === 1} className="px-3 py-2 rounded hover:bg-[#484848] text-white text-[10px] cursor-pointer">
        <FaChevronLeft />
      </button>
      {getPages().map((p, index) =>
        p === "..." ? <span key={index} className="px-3 py-2 text-gray-400">...</span> : <button key={index} onClick={() => setPage(Number(p))} className={`px-3 py-2 rounded ${page === p ? "text-[#D6F379]" : "hover:bg-[#484848] text-white text-[14px] cursor-pointer"}`}>{p}</button>
      )}
      <button onClick={() => setPage(Math.min(page + 1, totalPages))} disabled={page === totalPages} className="px-3 py-2 rounded hover:bg-[#484848] text-white text-[10px] cursor-pointer">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Search;