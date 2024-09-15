import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Countries from "./pages/Countries";
import SingleCountry from "./pages/SingleCountry";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path='/'
            element={<Countries isOpen={isOpen} setIsOpen={setIsOpen} />}
          />
          <Route path='/country/:id' element={<SingleCountry />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
