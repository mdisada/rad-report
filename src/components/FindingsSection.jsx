import Organ from './Organ'
import { Button } from '@mui/material'

function FindingsSection(props) {
    const template = props.template
    const sections = template.sections

    const listSections = sections.map((section) =>
            <Organ key={section} section={section}></Organ>)
    return (
        <div>
            {listSections}
            <Button>Generate Report</Button>
    </div>
    )
}

export default FindingsSection
