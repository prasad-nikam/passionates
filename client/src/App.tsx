import "./App.css";
import SideBar from "./components/sidebar/SideBar";
// import Size from "./components/Size";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function AppRouts() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route
        path="/"
        element={
          <div className="fle flex flex-1 gap-2 bg-neutral-100 md:gap-4">
            <div className="w-80">stories</div>
            <div className="flex-1">feed</div>
          </div>
        }
      />
      <Route
        path="/message"
        element={
          <div className="fle flex flex-1 gap-2 bg-neutral-100 md:gap-4">
            <div className="w-80">stories</div>
            <div className="flex-1">feed</div>
          </div>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen w-full flex-col-reverse gap-2 p-2 md:flex-row md:gap-4 md:p-4">
        <div className="h-16 md:h-full md:w-80">
          <SideBar />
        </div>
        <AppRouts />
      </div>
    </BrowserRouter>
  );
}

export default App;
