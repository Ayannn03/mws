import React from "react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <button onClick={() => window.open("https://web.facebook.com/ianrenielrey2", "_blank")}>
  Contact Me
</button>
    </div>
  );
};

export default Dashboard;
