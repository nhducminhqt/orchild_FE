import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router";
import ListOfOrchids from "./components/ListOfOrchids";
import EditOrchid from "./components/EditOrchid";
import HomeScreen from "./components/HomeScreen";
import NavBar from "./components/NavBar";
import ListOfEmployees from "./components/ListOfEmployees";
import DetailOrchid from "./components/DetailOrchid";
import Login from "./components/Login";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ListOfOrchids />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/orchids" element={<ListOfEmployees />} />
        <Route path="/detail/:id" element={<DetailOrchid />} />
        <Route path="/edit/:id" element={<EditOrchid />} />
      </Routes>
    </>
  );
}

export default App;
