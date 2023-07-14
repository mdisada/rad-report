import Organ from './Organ'
import { Button } from '@mui/material'

function FindingsSection(props) {
    const template = props.template
    const sections = template.organ_sections
    const modality = template.modality

    console.log(modality)

    const listSections = sections.map((section) =>
            <Organ key={section} section={section} modality={modality}></Organ>)
    return (
        <div>
            {listSections}
            <Button>Generate Report</Button>
    </div>
    )
}

export default FindingsSection
