import React from 'react';
import { getSpotifyAuthUrl } from '../services/spotifyAuth';
import logo from '../assets/Shape.svg'; 
import arrow from '../assets/Vector 2.svg'; 
import arrowButton from '../assets/akar-icons_arrow-right.svg'; 
import { useOffline } from '../hooks/useOffline';

const Login: React.FC = () => {

  const isOffline = useOffline();

  const handleLogin = () => {
    if (!isOffline) {
      window.location.href = getSpotifyAuthUrl();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#222222] text-white px-6 md:px-20">
      <header className="absolute top-0 w-full max-w-[1512px] h-[87px] flex items-center justify-start px-8 md:px-[80px] py-[24px]">
        <img src={logo} alt="Logo" className="w-[133px] h-[24px]" />
      </header>

      <div className="flex flex-col lg:flex-row items-left gap-10 md:gap-[100px] w-full max-w-[1240px]">
        <div className="flex-1 arrow-ipad flex items-center justify-center">
          <img 
            src={arrow} 
            alt="Arrow" 
            className="w-full max-w-[200px] md:max-w-[350px] lg:max-w-[400px] h-auto object-contain" 
          />
        </div>

        <div className="flex-1 flex flex-col justify-left space-y-6 md:space-y-[50px] h-full">
          <h1 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-[64px] leading-[100%] tracking-normal max-w-[597px]">
            Disfruta de la <span className="text-[#D6F379]">mejor música</span>
          </h1>
          <p className="font-montserrat text-lg md:text-xl max-w-[347px]">
            Accede a tu cuenta para guardar tus álbumes favoritos.
          </p>
          
          {isOffline ? (
            <p className="text-center text-lg text-red-500">Parece que no tienes conexión a Internet. Conéctate para continuar.</p>
          ) : (
            <button
              onClick={handleLogin}
              className="mt-4 md:mt-[30px] flex items-center text-white gap-4 md:gap-6 cursor-pointer"
            >
              <span className="font-semibold text-[16px]">Log in con Spotify</span>
              <img src={arrowButton} alt="Arrow" className="w-[24px]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

