import React from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import AKTUResourceList from "../../components/AKTU/AKTUResourceList";

const Syllabus = () => {
  return (
    <AKTUResourceList
      resourceType="syllabus"
      title="AKTU Syllabus"
      description="Find branch-wise and semester-wise AKTU syllabus and subject information in one place."
      icon={
        <MenuBookIcon
          sx={{ fontSize: 38 }}
        />
      }
    />
  );
};

export default Syllabus;