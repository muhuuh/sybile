import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main/Main";
import AnalysisMain from "./components/Main/Analysis/AnalysisMain";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/main/analysis" element={<AnalysisMain />} />
      </Routes>
    </div>
  );
};

export default App;
