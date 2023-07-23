import Organ from "./Organ";
import { Button, TextareaAutosize } from "@mui/material";
import { useState } from "react";

function FindingsSection(props) {
  const template = props.template;
  const sections = template.organ_sections;
  const modality = template.modality;
  const [reportFindings, setReportFindings] = useState({});  // Initialize as an empty object
  const [isReportGenerated, setIsReportGenerated] = useState(false);  // State to track report generation

  const handleDisplayChange = (section, newDisplay) => {
    setReportFindings((prevFindings) => ({
      ...prevFindings,
      [section]: newDisplay,  // Use section as key and newDisplay as value
    }));
  };

  const handleGenerateReport = () => {
    setIsReportGenerated(true);
    console.log(JSON.stringify(reportFindings, null, 2));
  };

  const listSections = sections.map((section) => (
    <div style={{ paddingBottom: "5px" }}>
      {" "}
      {/* Add padding to each Organ component */}
      <Organ
        key={section}
        section={section}
        modality={modality}
        onDisplayChange={(newDisplay) => handleDisplayChange(section, newDisplay)}
      ></Organ>
    </div>
  ));

  const findingsReport = Object.values(reportFindings).join('\n');

  return (
    <div>
      {!isReportGenerated && listSections}
      {isReportGenerated && 
        <div>
          <label>FINDINGS</label>
          <textarea  rows={6} value={findingsReport} readOnly />
          <label>IMPRESSION</label>
          <textarea rows={6} />
        </div>
      }
      <Button onClick={handleGenerateReport}>Generate</Button>
    </div>
  );
}

export default FindingsSection;
