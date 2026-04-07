import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Movies from "./pages/Movies";
import CreateMoviesPage from "./pages/CreateMovies";
import EditMovie from "./pages/EditMovie";
// import CommentPage from "./pages/CommentPage";
// import SettingPage from "./pages/SettingPage";
import "./styles/main.css";

function App() {
  return (
    <Router>
      <Routes>

        {/* ✅ DEFAULT REDIRECT */}
        <Route path="/" element={<Navigate to="/movies" replace />} />

        {/* ✅ MAIN PAGES */}
        <Route path="/movies" element={<Movies />} />
        <Route path="/create-movie" element={<CreateMoviesPage />} />
        <Route path="/edit-movie/:id" element={<EditMovie />} />

        {/* FUTURE PAGES */}
        {/* <Route path="/comment" element={<CommentPage />} />
        <Route path="/setting" element={<SettingPage />} /> */}

      </Routes>
    </Router>
  );
}

export default App;
