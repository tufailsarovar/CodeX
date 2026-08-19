import React from "react";
import StarIcon from "@mui/icons-material/Star";

import AKTUResourceList from "../../components/AKTU/AKTUResourceList";

const ImportantQuestions = () => {
  return (
    <AKTUResourceList
      resourceType="important-questions"
      title="AKTU Important Questions"
      description="Prepare smarter with important and exam-focused questions selected for AKTU students."
      icon={<StarIcon sx={{ fontSize: 38 }} />}
    />
  );
};

export default ImportantQuestions;