import Homepage from "./Components/HomePage/homepage";
import { Routes, Route } from "react-router-dom";
import ResultPage from "./Components/ResultPage/ResultPage";

import "./App.css"
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/result/:item" element={<ResultPage/>}/>
    </Routes>
  );
};

export default App;
