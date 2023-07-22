import { Stack } from '@mui/material'
import React, { useRef, useContext, useState, useEffect } from 'react'
import { Tab, Tabs, Button, Collapse, Icon } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import { ReportFindingsContext } from "../contexts/ReportFindingsContext"
import AddFindings from './Findings/AddFindings'
import AddImpression from './Impression/AddImpression'

export default function Organ({ section, modality, onDisplayChange }) {
  const name = section.charAt(0).toUpperCase() + section.slice(1);
  const [forDisplay, setForDisplay] = useState(name + ": "); 
  const [receivedFinding, setReceivedFinding] = useState("");
  const [receivedImpression, setReceivedImpression] = useState("")
  const [impression, setImpression] = useState([""])
  const [isOpen, setIsOpen] = useState(true); 
  const { state: reportFindings, dispatch } = useContext(ReportFindingsContext);

  const textAreaRef = useRef()


  const onValueChange = (finding) => {
    setReceivedFinding(finding);
  };

  const handleReceivedImpression = (impression) => {
    setReceivedImpression(impression)
  }

  const handleAddClick = () => {
    setForDisplay(prevForDisplay => prevForDisplay + receivedFinding + " ");
  };

  const handleRemoveClick = () => {
    const findings = forDisplay.trim().split(' ');
    findings.pop();
    setForDisplay(findings.join(' ') + ' ');
  };

  const handleLockClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  }, [forDisplay]);


  useEffect(() => {
    onDisplayChange(section, forDisplay);
  }, [forDisplay, onDisplayChange, section]);

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
        <textarea
            ref={textAreaRef}
            value={forDisplay}
            onChange={(event) => setForDisplay(event.target.value)}
            style={{ 
              width: '100%', 
              resize: 'none', 
              border: '1px solid #ced4da', 
              borderRadius: '.25rem',
              fontSize: '14px', // Adjust font size
              fontFamily: 'Arial, sans-serif' // Adjust font family
            }}
            disabled={!isOpen}
          />

          {/* <EditableText
            value={forDisplay}
            onChange={(value) => setForDisplay(value)}
            multiline={true}
            maxLines={5}
            style={{ width: '100%'}}
            disabled={!isOpen}
          /> */}
        </div>
      </div>
      <Collapse isOpen={isOpen}>
      <div style={{ padding: '10px' }}> 
      <Tabs id="findingTabs">
            <Tab id="findings" title="Findings" panel={
              <AddFindings
                onValueChange={onValueChange}
                setImpression={setImpression}
                section={section}
                modality={modality}
              />
            } />
            <Tab id="impressions" title="Impression" panel={
              <AddImpression 
              onValueChange={onValueChange}
              section={section}
              modality={modality}
              impression={impression}
              />
            }  />
          </Tabs>
      </div>
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
