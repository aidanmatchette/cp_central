import { FormControl, Button, InputGroup } from 'react-bootstrap'

function GroupSizeInputWithButton(props) {

  const { setGroupSize, handleCreateGroups, groupSize } = props


  return (
    <div style={{ width: "12rem" }}>
      <InputGroup className="m-3">
        <FormControl
          className='form-floating border-secondary'
          placeholder='SZ'
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

export default GroupSizeInputWithButton
