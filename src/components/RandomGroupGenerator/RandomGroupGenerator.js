import { useState } from 'react'
import { useAxios } from '../../utils/useAxios'
import GroupSizeInputWithButton from './GroupSizeInputWithButton';
import SuccessfullyGeneratedGroupsModal from './SuccessfullyGeneratedGroupsModal';

function RandomGroupGenerator(props) {

  let backend = useAxios()

  const [groupSize, setGroupSize] = useState('');
  const [groups, setGroups] = useState(null)
  const [showModal, setShowModal] = useState(false);

  const handleCreateGroups = async () => {
    backend.post('api/roster/randomize/', { group_size: groupSize })
      .then((res) => {
        setGroups(res.data.groups)
        setShowModal(true)
        setGroupSize('')
        console.log('groups generated response status', res.status)
      })
  }

  return (
    <div>
      <GroupSizeInputWithButton
        handleCreateGroups={handleCreateGroups}
        groupSize={groupSize}
        setGroupSize={setGroupSize}
      />
      <SuccessfullyGeneratedGroupsModal groups={groups} showModal={showModal} setShowModal={setShowModal} />
    </div>
  )
}

export default RandomGroupGenerator