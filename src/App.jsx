import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Schedules } from "./schedules/Schedules";
import { Changes } from "./changes/Changes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Schedules />} />
        <Route path="/changes" element={<Changes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
