import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/home";
import MusicList from "./views/list";

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route element={<Home />} path='/'/>
            <Route element={<MusicList />} path='list'/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
