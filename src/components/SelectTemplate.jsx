import { Stack, Autocomplete, TextField } from "@mui/material"
import { useState } from 'react'
import studies from "../data/StudyTemplates"
import FindingsSection from "./FindingsSection"


function SelectTemplate () {

  const [study , setStudy] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [template, setTemplate] = useState({
    label: "",
    modality: "",
    always_contrast: null,
    sections: [],
  })

  const handleOnChange = (_, newValue) => {
    // Check if newValue is null
    if (newValue) {
      setStudy(newValue);
      setTemplate({
        label: newValue.label,
        modality: newValue.modality,
        always_contrast: newValue.always_contrast,
        sections: newValue.sections
      });
    } else {
      // If newValue is null, reset study and template
      setStudy(null);
      setTemplate({
        label: "",
        modality: "",
        always_contrast: null,
        sections: [],
      });
    }
  };
  return (
    <Stack spacing={2} width='600px' style={{padding: "20px"}}>
      <Autocomplete 
      options={studies} 
      renderInput={(params) => <TextField {...params}
      label = 'Templates' />}
      autoSelect = {true}
      autoComplete = {true}
      study = {study}
      onChange={handleOnChange}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue)
        }
      }
      />
      <FindingsSection template={template}/>
    </Stack>
  )
}

export default SelectTemplate