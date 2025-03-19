import React from "react";

interface LoadingScreenProps {
  text: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#222222] text-white">
      <h1 className="text-2xl font-semibold mb-4 text-[#D6F379]">{text}</h1>
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute w-full h-full border-4 border-t-[#D6F379] border-l-transparent border-b-transparent border-r-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
