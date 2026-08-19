import React from "react";
import QuizIcon from "@mui/icons-material/Quiz";

import AKTUResourceList from "../../components/AKTU/AKTUResourceList";

const Quantum = () => {
  return (
    <AKTUResourceList
      resourceType="quantum"
      title="AKTU Quantum"
      description="Explore exam-focused Quantum resources, important topics and question banks for AKTU preparation."
      icon={
        <QuizIcon
          sx={{ fontSize: 38 }}
        />
      }
    />
  );
};

export default Quantum;