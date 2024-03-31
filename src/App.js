import { Routes, Route } from "react-router-dom";
import VisualMain from "./components/Main/VisualMain";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<VisualMain />} />
        <Route path="/main" element={<VisualMain />} />
      </Routes>
    </div>
  );
};

export default App;
