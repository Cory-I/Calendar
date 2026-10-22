/* Month View Page */
import useAuth from "../Auth/AuthContext";
export default function MonthView() {
  const { login, token, getUser } = useAuth();
  return (
    <div className="PageMain">
      <p>MonthView</p>
      <div className="SideBox">
        <p>Calendar Week Box</p>
      </div>
      <div className="MainBox">
        <p>Calendar Month Box</p>
      </div>
    </div>
  );
}
