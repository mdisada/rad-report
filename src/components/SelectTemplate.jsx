import React, { useState, useEffect } from 'react'
import { FormGroup, InputGroup, MenuItem, Card } from "@blueprintjs/core"
import { Suggest } from "@blueprintjs/select"
import { collection, getDocs } from 'firebase/firestore'
import db from '../config'
import FindingsSection from "./FindingsSection"


function SelectTemplate () {
  const [studyName , setStudyName] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [template, setTemplate] = useState({
    label: "",
    modality: "",
    always_contrast: null,
    organ_sections: [],
    users: "",
  })

  const [studies, setStudies] = useState([])

  useEffect(() => {
    const fetchStudies = async () => {
      const studiesCol = collection(db, 'templates')
      const studiesSnapshot = await getDocs(studiesCol)
      const studiesList = studiesSnapshot.docs.map(doc => doc.data())
      setStudies(studiesList)
    }

    fetchStudies()
  }, [])

  const handleOnChange = (item) => {
    if (item) {
      setStudyName(item)
      setTemplate({
        label: item.label,
        modality: item.modality,
        always_contrast: item.always_contrast,
        organ_sections: item.organ_sections || [],
        users: item.users
      })
    } else {
      setStudyName(null)
      setTemplate({
        label: "",
        modality: "",
        always_contrast: null,
        organ_sections: [],
        users: "",
      })
    }
  }

  const renderStudy = (study, { handleClick, modifiers }) => {
    if (!modifiers.matchesPredicate) {
      return null
    }
    return (
      <MenuItem
        active={modifiers.active}
        onClick={handleClick}
        text={study.label}
        key={study.label}
      />
    )
  }

  return (
    <Card style={{ padding: "20px", width: "600px" }}>
      <FormGroup label="Templates">
        <Suggest
          items={studies}
          fill ={ true}
          itemRenderer={renderStudy}
          onItemSelect={handleOnChange}
          inputProps={{placeholder: 'Select a template...'}}
          popoverProps={{
            minimal: true,
            usePortal: false,
            matchTargetWidth: true,  // Add this line
          }}
          inputValueRenderer={(item) => item.label}
          noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption"/>}
        >
          <InputGroup 
            disabled
            placeholder={studyName ? studyName.label : "(No selection)"}
          />
        </Suggest>
      </FormGroup>
      <FindingsSection template={template} />
    </Card>
  )
}

export default SelectTemplate
