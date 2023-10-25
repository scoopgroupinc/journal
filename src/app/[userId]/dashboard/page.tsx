import React from "react";

function Dashboard({ params: { token } }: { params: { token: string } }) {
  return <div>Dashboard {token}</div>;
}

export default Dashboard;
