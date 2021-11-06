import React from "react";
import Layout from "../components/Layout";
import ActionBar from "../components/ActionBar";
import DayItem from "../components/DayItem";

const Days: React.FC = () => {
  const handleAddDay = () => {};

  return (
    <Layout title="Days">
      <DayItem title="Tomorrow" taskCount={4} />
      <ActionBar
        navigationText="Home"
        navigationLink="/"
        actionText="Add day"
        handleAction={handleAddDay}
      />
    </Layout>
  );
};

export default Days;
