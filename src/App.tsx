import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Search from "./pages/Search";
import ArtistDetail from "./pages/ArtistDetail";
import MyAlbums from "./pages/MyAlbums";
import Callback from "./pages/Callback";
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/artist/:id" element={<ArtistDetail />} />
        <Route path="/albums" element={<MyAlbums />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
  );
}

export default App;
