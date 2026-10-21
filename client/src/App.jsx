import { Routes, Route, Link } from "react-router";
import Layout from "./Layout";
import HomePage from "./pages/Home";
import SettingsPage from "./pages/Settings";
import MonthView from "./pages/Month_View";
import WeekView from "./pages/Week_View";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
function App() {
  return (
    <div>
      <h1>Kali</h1>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/Settings" element={<SettingsPage />} />
          <Route path="/MonthView" element={<MonthView />} />
          <Route path="/WeekView" element={<WeekView />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
