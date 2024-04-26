import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PredictiveMain from "./components/Main/PredictiveMain";
import AnalysisMain from "./components/Main/Analysis/AnalysisMain";
import PaymentMain from "./components/Main/Payment/PaymentMain";
import PaymentDetails from "./components/Main/Payment/PaymentDetails";
import LookupMain from "./components/Lookup/LookupMain";
import LandingPage from "./components/LandingPage";
import PaymentLookupMain from "./components/Lookup/Payment/PaymentLookupMain";
import PaymentLookupDetails from "./components/Lookup/Payment/PaymentLookupDetails";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<LandingPage />} />
        <Route path="/main/analysis/predictive" element={<AnalysisMain />} />
        <Route path="/main/payment/predictive" element={<PaymentMain />} />
        <Route path="/main/payment/details" element={<PaymentDetails />} />
        <Route path="/lookup" element={<LookupMain />} />
        <Route path="/main/payment/lookup" element={<PaymentLookupMain />} />
        <Route
          path="/main/payment/details_lookup"
          element={<PaymentLookupDetails />}
        />
      </Routes>
    </div>
  );
};

export default App;
