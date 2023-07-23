import React, { useState, useEffect } from "react";
import { Suggest } from "@blueprintjs/select";
import { MenuItem , Dialog , InputGroup , Button } from "@blueprintjs/core";
import { collection, addDoc, getDocs, query, where, setDoc, doc } from "firebase/firestore";
import db from '../../config';
import Description from './Description';

function AddFindings({onValueChange, section, modality, setImpression}) {
  const [diseases, setDiseases] = useState([]);
  const [disease, setDisease] = useState("Normal");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newDisease, setNewDisease] = useState("");
  const [newFinding, setNewFinding] = useState([""]);
  const [newImpression, setNewImpression] = useState("")
  const [diseaseMap, setDiseaseMap] = useState({});

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

  useEffect(() => {
    fetchData();
  }, []);

  const filterDisease = (query, disease, _index, exactMatch) => {
    const normalizedName = disease.name.toLowerCase();
    const normalizedQuery = query.toLowerCase();

    if (exactMatch) {
      return normalizedName === normalizedQuery;
    } else {
      return normalizedName.indexOf(normalizedQuery) >= 0;
    }
  };



  const renderDisease = (disease, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        key={disease.name}
        onClick={handleClick}
        text={disease.name}
      />
    );
  };



  const handleDiseaseSelect = (selectedItem) => {
    if (typeof selectedItem === 'string') {
      // If disease is string, it's a newly created item.
      // Open dialog for adding new disease.
      setIsDialogOpen(true);
      setNewDisease(selectedItem);
    } else if (selectedItem !== null && typeof selectedItem === 'object') {
      setDisease(selectedItem.name);
      setImpression(selectedItem.impression)
      onValueChange(selectedItem.name);

    } else {
      // Clear the selected disease if nothing is selected.
      setDisease(null);
    }
  };

  const handleNewFindingChange = (event, index) => {
    const values = [...newFinding];
    values[index] = event.target.value;
    setNewFinding(values);
  };


  const handleAddNewFindingClick = () => {
    setNewFinding([...newFinding, ""]);
  };

  const handleRemoveNewFindingClick = () => {
    const values = [...newFinding];
    values.splice(values.length - 1, 1);
    setNewFinding(values);
  };


  // const handleNewDiseaseChange = (event) => {
  //   setNewDisease(event.target.value);
  // };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogSubmit = async () => {
    const diseasesCollection = collection(db, "diseases");
    
    const newDiseaseData = {
      name: newDisease,
      findings: newFinding,
      impression: newImpression,
      modality: modality,
      organ_section: section,
    };
    
    // create a new document reference with a custom ID
    const newDiseaseId = `${modality} - ${newDisease}`.toLowerCase();
    const newDiseaseRef = doc(diseasesCollection, newDiseaseId);
  
    try {
      // set new disease data in Firestore using the custom ID
      await setDoc(newDiseaseRef, newDiseaseData);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
    // close the dialog
    setIsDialogOpen(false);
    
    // Reset the new disease name
    setNewDisease("");
    
    // Optionally, you can refetch the diseases here to immediately show the new disease in the Suggest dropdown
    fetchData();
  };

  return (
    <div>
      <div>
      <Suggest
        items={diseases}
        itemRenderer={renderDisease}
        itemPredicate={filterDisease}
        onItemSelect={handleDiseaseSelect}
        // inputValueRenderer={disease => disease.name}
        inputValueRenderer={disease => disease.name}
        createNewItemFromQuery={(newDiseaseName) => newDiseaseName}
        createNewItemRenderer={(query, active, handleClick) => (
          <MenuItem
            icon="add"
            text={`Add "${query}"`}
            active={active}
            onClick={handleClick}
            shouldDismissPopover={false}
          />
        )}
        popoverProps={{ matchTargetWidth: true, minimal: true, usePortal: true, fill: true }}
      />
      </div>
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
            // onChange={handleNewDiseaseChange}
            onChange={(e) => setNewDisease(e.target.value)}
          />
{newFinding.map((finding, index) => (
            <InputGroup
              key={index}
              id={`finding-input-${index}`}
              placeholder="Finding"
              value={finding}
              onChange={event => handleNewFindingChange(event, index)}
            />
          ))}
                    <Button onClick={handleAddNewFindingClick}>+ finding</Button>
          <Button onClick={handleRemoveNewFindingClick}>- finding</Button>
          <InputGroup
            id="text-input"
            aria-label="Impression"
            placeholder="Impression"
            value={newImpression}
            // onChange={handleNewDiseaseChange}
            onChange={(e) => setNewImpression(e.target.value)}
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
