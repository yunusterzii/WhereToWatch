import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import MovieInfoPage from "./pages/MovieInfoPage";

function App() {
  return (
      <>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route strict path="/search/:movies" element={<SearchPage/>} />
          <Route strict path="/movie/:movie" element={<MovieInfoPage/>} />
        </Routes>
      </>
  );
}

export default App;
