import { Routes, Route, Link } from "react-router";
import Layout from "./Layout";
import HomePage from "./Home";
import SettingsPage from "./Settings";
import MonthView from "./Month_View";
import WeekView from "./Week_View";
function App() {
  return (
    <div>
      <h1>Calendar</h1>
      <Routes>
        <Route element={<Layout />}>
          {/*           <Route path="/" element={<LoginPage />} /> */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/Settings" element={<SettingsPage />} />
          <Route path="/MonthView" element={<MonthView />} />
          <Route path="/WeekView" element={<WeekView />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
