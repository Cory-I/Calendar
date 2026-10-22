/* Home Page */
import useAuth from "../Auth/AuthContext";
import { useEffect, useState } from "react";
export default function HomePage() {
  const [user, setUser] = useState(null);
  const { token, getUser } = useAuth();
  return (
    <div className="PageMain">
      <p>HomePage</p>
      <div className="SideBox">
        <p>Calendar Side Box</p>
      </div>
      <div className="MainBox">
        <p>Calendar Main Box</p>
      </div>
    </div>
  );
}
