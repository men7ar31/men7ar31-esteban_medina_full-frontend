import { useState, useEffect } from "react";

export const useOffline = () => {
  const getOnlineStatus = () => {
    if (navigator.onLine !== undefined) return !navigator.onLine;
    if ((navigator as any).connection) return (navigator as any).connection.effectiveType === "none";
    return false;
  };

  const [isOffline, setIsOffline] = useState(getOnlineStatus());

  useEffect(() => {
    const updateOnlineStatus = () => setIsOffline(getOnlineStatus());

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return isOffline;
};
