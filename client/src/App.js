import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainSite from "./components/MainSite";
import Create from "./components/Create";
import Navbar from "./components/NavBar";
import Edit from "./components/Edit";
import Detail from "./components/Detail";
function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route exact path="/" element={<MainSite />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
