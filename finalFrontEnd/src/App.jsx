import Lenis from "./components/config/Lenis";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import About from "./pages/About";
import AllCars from "./pages/AllCars";
import Loading from "./components/config/Loading";
import SpecificBrand from "./pages/SpecificBrand";
import Detail from "./pages/Detail";
function App() {
  return (
    <>
      <Loading />
      <BrowserRouter>
        <Lenis>
          <Routes>
            <Route path="/" element={<MainLayouts />}>
              <Route path="/" element={<About />} />
              <Route path="/car-brands" element={<Home />} />
              <Route path="/allcars" element={<AllCars />} />
              <Route path="/allcars/:brand" element={<SpecificBrand />} />
              <Route path="/allcars/:brand/detail/:id" element={<Detail />} />
            </Route>
          </Routes>
        </Lenis>
      </BrowserRouter>
    </>
  );
}

export default App;
