import React, { useState, useEffect } from "react";
import { Suggest } from "@blueprintjs/select";
import { MenuItem , Dialog , InputGroup , Button } from "@blueprintjs/core";
import { collection, getDocs , query , where} from "firebase/firestore";
import db from '../../config';
import Description from './Description';

function AddFindings({onValueChange, section, modality}) {
  const [diseases, setDiseases] = useState([]);
  const [disease, setDisease] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newDisease, setNewDisease] = useState("");
  const [diseaseMap, setDiseaseMap] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const diseasesCollection = collection(db, "diseases");
      const q = query(
        diseasesCollection, 
        where("modality", "==", modality),
        where("organ_section", "==", section)
      );
      const diseaseSnapshot = await getDocs(q);
      const diseaseList = diseaseSnapshot.docs.map(doc => doc.data());
      setDiseases(diseaseList);
    };
    
    
    fetchData();
  }, []);

  const renderDisease = (disease, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        label={disease.modality}
        key={disease.name}
        onClick={handleClick}
        text={disease.name}
      />
    );
  };

  const handleDiseaseSelect = (disease) => {
    setDisease(disease.name);
  };


  const handleNewDiseaseChange = (event) => {
    setNewDisease(event.target.value);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogSubmit = () => {
    // Logic to add new disease goes here
    setIsDialogOpen(false);
  };

  return (
    <div>
      <Suggest
        items={diseases}
        itemRenderer={renderDisease}
        onItemSelect={handleDiseaseSelect}
        inputValueRenderer={disease => disease.name}
      />
      <Dialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        title="Add New Disease"
      >
        <div className="bp3-dialog-body">
          <InputGroup
            id="text-input"
            placeholder="Disease Name"
            value={newDisease}
            onChange={handleNewDiseaseChange}
          />
        </div>
        <div className="bp3-dialog-footer">
          <div className="bp3-dialog-footer-actions">
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button intent="primary" onClick={handleDialogSubmit}>Add</Button>
          </div>
        </div>
      </Dialog>
      {disease && <Description onValueChange={onValueChange} section={section} disease={disease} modality={modality} diseaseMap={diseaseMap}/>}
    </div>
  );
}

export default AddFindings;
