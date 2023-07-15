import { Autocomplete, Stack, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, createFilterOptions } from "@mui/material";

import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import db from '../../config';
import Description from "./Description";

const filter = createFilterOptions();

function AddFindings({ onValueChange, section, modality }) {
  const [disease, setDisease] = useState("");
  const [diseaseMap, setDiseaseMap] = useState({});
  const [inputValue, setInputValue] = useState('')
  const [diseaseList, setDiseaseList] = useState([]);
  const [localFindings, setLocalFindings] = useState([]);  
  const [open, setOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState({ name: '', findings: '', impression: '' });

  useEffect(() => {
    const fetchDiseases = async () => {
      if (modality && section) {
        const diseasesCol = collection(db, 'diseases');
        const diseasesQuery = query(diseasesCol, where('modality', '==', modality), where('organ_section', '==', section));
        const diseasesSnapshot = await getDocs(diseasesQuery);
        const diseasesMap = diseasesSnapshot.docs.reduce((map, doc) => {
          const data = doc.data();
          map[data.name] = data.findings;  // use the disease name as the key and findings as the value
          return map;
        }, {});
        setDiseaseList(Object.keys(diseasesMap));
        setDiseaseMap(diseasesMap);
      }
    };
    
    fetchDiseases();
  }, [modality, section]);
    
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
    setDialogValue(prevValue => ({
      ...prevValue,
      name: inputValue
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDocumentId = `${modality}_${dialogValue.name}`; // create document id

    // Add the new disease to the Firestore
    const diseasesCol = collection(db, 'diseases');
    await addDoc(diseasesCol, {
      id: newDocumentId,
      name: dialogValue.name,
      findings: dialogValue.findings.split(','),
      impression: dialogValue.impression.split(','),
      organ_section: section,
      modality: modality,
    });
    
    setDiseaseList(prevDiseaseList => [...prevDiseaseList, dialogValue.name]);
    handleClose();
  };

  return (
    <div>
      <Stack spacing={2} width="540px" style={{ padding: "5px" }}>

      <Autocomplete
  id="disease-autocomplete"
  options={diseaseList}
  getOptionLabel={(option) => option}
  renderInput={(params) => <TextField {...params} label="Disease" />}
  value={disease}
  onChange={(event, newValue) => {
    if (typeof newValue === 'string') {
      // Timeout to avoid instant validation of the dialog's form.
      setTimeout(() => {
        if (!diseaseList.includes(newValue) && newValue.includes('Add')) {
          setOpen(true);
          setDialogValue({
            ...dialogValue,
            name: newValue.replace('Add "', '').replace('"', ''),
          });
        }
      });
      setDisease(newValue.replace('Add "', '').replace('"', ''));
    } else {
      setDisease('');
    }
  }}
  filterOptions={(options, params) => {
    const filtered = filter(options, params);
    // Only show the "Add" option if the input value is not in the diseaseList
    if (params.inputValue !== '' && !diseaseList.includes(params.inputValue)) {
      filtered.push(`Add "${params.inputValue}"`);
    }
    return filtered;
  }}
  freeSolo
/>
     <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new disease</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any disease in our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.name}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  name: event.target.value,
                })
              }
              label="name"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="findings"
              value={dialogValue.findings}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  findings: event.target.value,
                })
              }
              label="findings"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="impression"
              value={dialogValue.impression}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  impression: event.target.value,
                })
              }
              label="impression"
              type="text"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
      {disease && <Description onValueChange={onValueChange} section={section} disease={disease} modality={modality} diseaseMap={diseaseMap}/>}

      </Stack>
    </div>
  );
}

export default AddFindings;