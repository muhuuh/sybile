import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PredictiveMain from "./components/Main/PredictiveMain";
import AnalysisMain from "./components/Main/Analysis/AnalysisMain";
import PaymentMain from "./components/Main/Payment/PaymentMain";
import PaymentDetails from "./components/Main/Payment/PaymentDetails";
import LookupMain from "./components/Lookup/LookupMain";
import LandingPage from "./components/LandingPage";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<PredictiveMain />} />
        <Route path="/main/analysis" element={<AnalysisMain />} />
        <Route path="/main/payment" element={<PaymentMain />} />
        <Route path="/main/payment/details" element={<PaymentDetails />} />
        <Route path="/lookup" element={<LookupMain />} />
      </Routes>
    </div>
  );
};

export default App;
