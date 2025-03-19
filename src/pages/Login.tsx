// src/pages/Login.tsx
import React from 'react';
import { getSpotifyAuthUrl } from '../services/spotifyAuth';
import logo from '../assets/Shape.svg'; 
import arrow from '../assets/Vector 2.svg'; 
import arrowButton from '../assets/akar-icons_arrow-right.svg'; 

const Login: React.FC = () => {
  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#222222] text-white">
      {/* Navbar */}
      <header className="absolute top-0 w-full max-w-[1512px] h-[87px] flex items-center justify-start px-8 md:px-[80px] py-[24px]">
        <img src={logo} alt="Logo" className="w-[133px] h-[24px]" />
      </header>

      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-[150px] px-8 md:px-20 w-full max-w-[1240px]">

        {/* Flecha grande */}
        <img src={arrow} alt="Arrow" className="w-[150px] sm:w-[364px] md:w-[464px]" />

        {/* Contenedor de textos */}
        <div className="text-left md:text-left space-y-6 md:space-y-[50px]">


          <h1 className="font-montserrat font-bold text-4xl sm:text-5xl md:text-[64px] leading-[100%] tracking-normal max-w-[597px]">
            Disfruta de la <span className="text-[#D6F379]">mejor música</span>
          </h1>
          <p className="font-montserrat text-lg md:text-xl max-w-[347px]">
            Accede a tu cuenta para guardar tus álbumes favoritos.
          </p>

          {/* Botón de login */}
          <button
            onClick={handleLogin}
              className="mt-4 md:mt-[50px] flex items-center text-white gap-6 md:gap-10 cursor-pointer"

          >
            <span className=" font-semibold text-[16px]">Log in con Spotify</span>
            <img src={arrowButton} alt="Arrow" className="w-[24px] sm:w-[24px] md:w-[24px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
