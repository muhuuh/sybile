import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main/Main";
import AnalysisMain from "./components/Main/Analysis/AnalysisMain";
import PaymentMain from "./components/Main/Payment/PaymentMain";
import PaymentDetails from "./components/Main/Payment/PaymentDetails";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/main/analysis" element={<AnalysisMain />} />
        <Route path="/main/payment" element={<PaymentMain />} />
        <Route path="/main/payment/details" element={<PaymentDetails />} />
      </Routes>
    </div>
  );
};

export default App;
