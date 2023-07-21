import { Stack } from '@mui/material'
import React, { useContext, useState, useEffect } from 'react'
import { EditableText, Button, Collapse, Icon } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import NormalOrAbnormal from "./Findings/NormalOrAbnormal"
import { ReportFindingsContext } from "../contexts/ReportFindingsContext"

export default function Organ({ section, modality, onDisplayChange }) {
  const name = section.charAt(0).toUpperCase() + section.slice(1);
  const [forDisplay, setForDisplay] = useState([""]); 
  const [receivedFinding, setReceivedFinding] = useState("");
  const [normal, setNormal] = useState("");
  const [isAbnormal, setIsAbnormal] = useState(false); 
  const [isOpen, setIsOpen] = useState(true); 
  const { state: reportFindings, dispatch } = useContext(ReportFindingsContext);

  const onValueChange = (finding) => {
    setReceivedFinding(finding);
  };

  const onNormal = (normalDisplay) => {
    setNormal(normalDisplay);
    setIsAbnormal(false);
  };

  const onAbnormal = () => {
    setIsAbnormal(true);
  };

  let defValue = name + ": ";
  let abnormalDisplay = defValue + forDisplay.join("");
  let normalDisplay = defValue + normal;
  let display = normal ? normalDisplay : abnormalDisplay;

  // useEffect(() => {
  //   if (normal !== "") {
  //     setIsOpen(false);
  //   }
  //   dispatch({ type: "ADD_FINDING", payload: { section, display } });
  // }, [normal, display, section, dispatch]);

  const handleAddClick = () => {
    setForDisplay((prevForDisplay) => [
      ...prevForDisplay,
      receivedFinding,
      " ",
    ]); 
  };

  const handleRemoveClick = () => {
    setForDisplay((prevForDisplay) => prevForDisplay.slice(0, -2)); 
  };

  const handleLockClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    onDisplayChange(display);
  }, [display, onDisplayChange]);
 
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button 
          icon={<Icon icon={isOpen ? IconNames.UNLOCK : IconNames.LOCK} size={15} />} 
          minimal={true}
          onClick={handleLockClick}
          style={{ marginRight: '7px' }}

        />
        <div style={{ flexGrow: 1 }}>
          <EditableText
            value={display}
            onChange={(value) => setForDisplay([value.slice(defValue.length)])}
            multiline={true}
            maxLines={5}
            style={{ width: '100%'}}
            disabled={!isOpen}
          />
        </div>
      </div>
      <Collapse isOpen={isOpen}>
        <NormalOrAbnormal
          onValueChange={onValueChange}
          onNormal={onNormal}
          onAbnormal={onAbnormal}
          section={section}
          modality={modality}
        />
          <Stack spacing={2} direction="row">
            <Button intent="primary" onClick={handleAddClick}>
              Add to report
            </Button>
            <Button intent="danger" onClick={handleRemoveClick}>
              Remove from report
            </Button>
          </Stack>
      </Collapse>
    </div>
  )
}