/* Week View Page */
import useAuth from "../Auth/AuthContext";
export default function WeekView() {
  const { token, getUser } = useAuth();
  return (
    <div className="PageMain">
      <p>WeekView</p>
      <div className="SideBox">
        <p>Calendar Month Box</p>
      </div>
      <div className="MainBox">
        <p>Calendar Week Box</p>
      </div>
    </div>
  );
}
