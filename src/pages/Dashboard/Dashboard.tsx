import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    const testBackend = async () => {
      const token = await user?.getIdToken();
      const res = await fetch("http://localhost:3000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log(await user?.getIdToken());
    };

    if (user) testBackend();
  }, [user]);

  return <div className="p-8">Dashboard </div>;
};

export default Dashboard;
