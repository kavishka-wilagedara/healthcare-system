import React from "react";

function Overview() {
  const data = {
    name: "Ashan Vimod",
  };

  return (
    <div className="overview">
      <h1>Welcome {data.name} ,</h1>
      <p>You’re one step closer to feeling your best-let’s make today count!</p>
    </div>
  );
}

export default Overview;
