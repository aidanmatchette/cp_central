import { useState } from 'react'
import { useAxios } from '../../../utils/useAxios'
import GroupSizeInputWithButton from './GroupSizeInputWithButton';
import SuccessfullyGeneratedGroupsModal from './SuccessfullyGeneratedGroupsModal';

function RandomGroupGenerator(props) {

  let backend = useAxios()

  const [groupSize, setGroupSize] = useState('');
  const [activity, setActivity] = useState(null)
  const [showModal, setShowModal] = useState(false);

  const handleCreateGroups = async () => {
    backend.post('api/roster/randomize/', { group_size: groupSize })
      .then((res) => {
        setActivity(res.data.activity)
        setShowModal(true)
        setGroupSize('')
      })
  }

  return (
    <div>
      <GroupSizeInputWithButton
        handleCreateGroups={handleCreateGroups}
        groupSize={groupSize}
        setGroupSize={setGroupSize}
      />
      <SuccessfullyGeneratedGroupsModal activity={activity} showModal={showModal} setShowModal={setShowModal} />
    </div>
  )
}

export default RandomGroupGenerator