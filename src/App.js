import { Routes, Route } from "react-router-dom";
import VisualMain from "./components/Main/Visual/VisualMain";
import Header from "./components/Header";
import Main from "./components/Main/Main";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<VisualMain />} />
        <Route path="/main" element={<Main />} />
        <Route path="/main/analysis" element={<VisualMain />} />
      </Routes>
    </div>
  );
};

export default App;
