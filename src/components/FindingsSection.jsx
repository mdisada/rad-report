import Organ from './Organ'

function FindingsSection(props) {
    const sections = props.study['sections']
    const listSections = sections.map((section) => 
    <Organ section={section}></Organ>)
    return (
        <div>
        {listSections}
    </div>
    )
}


export default FindingsSection