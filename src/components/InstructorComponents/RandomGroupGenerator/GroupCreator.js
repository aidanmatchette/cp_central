import { FormControl, Button, InputGroup } from 'react-bootstrap'

function GroupsCreator(props) {

  const { setGroupSize, handleCreateGroups, groupSize, name, setName } = props


  return (
    <div style={{ width: "90%", display: 'inline-block' }}>

      <InputGroup className="m-3">
        <FormControl
          className='form-floating border-secondary'
          placeholder='Name'
          aria-label="Name"
          aria-describedby="basic-addon1"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          style={{ width: '45%' }}

        />
        <FormControl
          className='form-floating border-secondary'
          placeholder='Size'
          aria-label="SZ"
          aria-describedby="basic-addon1"
          type="number"
          onChange={(e) => setGroupSize(e.target.value)}
          value={groupSize}

        />
        <Button
          variant="secondary"
          id="button-addon1"
          onClick={handleCreateGroups}
          style={{ color: "white" }}
        >
          Create Groups
        </Button>
      </InputGroup>
    </div>
  )
}

export default GroupsCreator
