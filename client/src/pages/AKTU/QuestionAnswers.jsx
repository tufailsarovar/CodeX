import React from "react";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

import AKTUResourceList from "../../components/AKTU/AKTUResourceList";

const QuestionAnswers = () => {
  return (
    <AKTUResourceList
      resourceType="question-answers"
      title="AKTU Question & Answers"
      description="Study important AKTU questions with clear and easy-to-understand answers."
      icon={
        <QuestionAnswerIcon
          sx={{ fontSize: 38 }}
        />
      }
    />
  );
};

export default QuestionAnswers;