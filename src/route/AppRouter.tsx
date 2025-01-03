import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Character } from "../pages/Character/Character";
import { Home } from "../pages/Home/Home";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<Character />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
