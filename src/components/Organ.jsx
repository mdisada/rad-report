import {
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NormalOrAbnormal from "./Findings/NormalOrAbnormal";
import { useState, useEffect } from "react";

export default function Organ({ section , modality }) {
  const name = section.charAt(0).toUpperCase() + section.slice(1);
  const [forDisplay, setForDisplay] = useState([""]); // initialize forDisplay in state
  const [receivedFinding, setReceivedFinding] = useState("");
  const [normal, setNormal] = useState("");
  const [isAbnormal, setIsAbnormal] = useState(false); // New state for abnormal
  const [expanded, setExpanded] = useState(true); // New state variable for accordion expanded status

  const onValueChange = (finding) => {
    setReceivedFinding(finding);
    console.log(receivedFinding);
  };

  const onNormal = (normalDisplay) => {
    setNormal(normalDisplay)
    setIsAbnormal(false);
  };

  const onAbnormal = () => {
    setIsAbnormal(true);
  };

  useEffect(() => {
    if (normal !== "") {
      setExpanded(false);
    }
  }, [normal]);

  const handleAddClick = () => {
    setForDisplay((prevForDisplay) => [
      ...prevForDisplay,
      receivedFinding,
      " ",
    ]); // add new receivedFinding to forDisplay array

    // Check if normal is not an empty string, if it's not, collapse the accordion
    if (normal !== "") {
      setExpanded(false);
    }
  };

  const handleRemoveClick = () => {
    setForDisplay((prevForDisplay) => prevForDisplay.slice(0, -2)); // remove the last two elements (receivedFinding and space) from forDisplay array
  };

  const handleAccordionChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };

  let defValue = name + ": ";
  let abnormalDisplay = defValue + forDisplay.join("");
  let normalDisplay = defValue + normal;
  let display = normal ? normalDisplay : abnormalDisplay; 
 
    
  console.log(modality)

  return (
    <div>
      <Accordion expanded={expanded} onChange={handleAccordionChange}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <TextField 
            value={display}
            variant="standard" 
            onChange={(e) => setForDisplay([e.target.value.slice(defValue.length)])} 
            fullWidth
          />
        </AccordionSummary>
        <AccordionDetails>
          <NormalOrAbnormal
            onValueChange={onValueChange}
            onNormal={onNormal}
            onAbnormal={onAbnormal}
            section={section}
            modality={modality}
          />
          {isAbnormal && (
            <Stack spacing={2} direction="row">
              <Button variant="contained" onClick={handleAddClick}>
                Add
              </Button>
              <Button variant="outlined" onClick={handleRemoveClick}>
                Remove
              </Button>
            </Stack>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
