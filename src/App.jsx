import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pagination from "./components/Pagination";
import HeroSection from "./components/HeroSection";
import SingleCoin from "./pages/SingleCoin";
import Header from "./components/Header";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const [currency, setCurrency] = useState("usd");

  return (
    <div>
      <Router>
        <Header onCurrencyChange={setCurrency} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection
                  currentPage={currentPage}
                  totalPages={totalPages}
                  currency={currency}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            }
          />

          <Route
            path="/coins/:id"
            element={<SingleCoin currency={currency} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
