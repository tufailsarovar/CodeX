import React from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import AKTUResourceList from "../../components/AKTU/AKTUResourceList";

const Notes = () => {
  return (
    <AKTUResourceList
      resourceType="notes"
      title="AKTU Notes"
      description="Access semester-wise and subject-wise AKTU notes designed for easier understanding and exam preparation."
      icon={<MenuBookIcon sx={{ fontSize: 38 }} />}
    />
  );
};

export default Notes;