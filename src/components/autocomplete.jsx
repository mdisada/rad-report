import { Stack, Autocomplete, TextField } from "@mui/material"
import { useState } from 'react'
import studies from "../data/StudyTemplates"
import FindingsSection from "./FindingsSection"


function SelectTemplate () {

  const [study , setStudy] = useState(null)
  const [inputValue, setInputValue] = useState('')

  return (
    <Stack spacing={2} width='250px' style={{padding: "20px"}}>
      <Autocomplete 
      options={studies} 
      renderInput={(params) => <TextField {...params}
      label = 'Templates' />}
      autoSelect = {true}
      autoComplete = {true}
      study = {study}
      onChange={(_, newValue) => {
          setStudy(newValue)
        }}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue)
        }}
      />
      <FindingsSection study={study}/>
    </Stack>
  )
}

// const studies = [
//   { label: 'CT Whole Abdomen', modality: 'CT' },
//   { label: 'CT Chest', modality: 'CT' },
//   { label: 'MRI Brain', modality: 'MRI' },
// ];

export default SelectTemplate