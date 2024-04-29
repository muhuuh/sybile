import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AnalysisMain from "./components/Main/Analysis/AnalysisMain";
import PaymentMain from "./components/Main/Payment/PaymentMain";
import PaymentDetails from "./components/Main/Payment/PaymentDetails";
import LandingPage from "./components/LandingPage";
import PaymentLookupMain from "./components/Lookup/Payment/PaymentLookupMain";
import PaymentLookupDetails from "./components/Lookup/Payment/PaymentLookupDetails";
import AnalysisLookupMain from "./components/Lookup/Analysis/AnalysisLookupMain";
import Faq from "./components/FAQ/Faq";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<LandingPage />} />
        <Route path="/faq" element={<Faq />} />

        <Route path="/main/analysis/predictive" element={<AnalysisMain />} />
        <Route path="/main/payment/predictive" element={<PaymentMain />} />
        <Route path="/main/payment/details" element={<PaymentDetails />} />
        <Route path="/main/payment/lookup" element={<PaymentLookupMain />} />
        <Route
          path="/main/payment/details_lookup"
          element={<PaymentLookupDetails />}
        />

        <Route path="/main/analysis/lookup" element={<AnalysisLookupMain />} />
      </Routes>
    </div>
  );
};

export default App;
