import React from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import AKTUResourceList from "../../components/AKTU/AKTUResourceList";

const PYQs = () => {
  return (
    <AKTUResourceList
      resourceType="pyq"
      title="AKTU Previous Year Papers"
      description="Practice previous year AKTU question papers and understand important exam patterns."
      icon={
        <PictureAsPdfIcon
          sx={{ fontSize: 38 }}
        />
      }
    />
  );
};

export default PYQs;