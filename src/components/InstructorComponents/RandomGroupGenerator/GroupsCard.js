import { useEffect, useState, useContext } from 'react'
import { useAxios } from '../../../utils/useAxios'
import SuccessfullyGeneratedGroupsModal from './SuccessfullyGeneratedGroupsModal';
import { DayContext } from '../../../context/DayProvider';
import { Card, Button } from 'react-bootstrap'
import dayjs from 'dayjs';
import GroupsCreator from './GroupCreator';


function GroupsCard(props) {

  let backend = useAxios()
  const { setDirty, dirty, date } = useContext(DayContext);
  const [activities, setActivites] = useState(null);
  const [groupSize, setGroupSize] = useState('');
  const [activity, setActivity] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('')

  let formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : null

  useEffect(() => {
    console.log('formatted ---->', formattedDate)
    backend.get('api/v1/activity/', { params: { 'date': formattedDate } })
      .then((res) => {
        console.log(res.data)
        setActivites(res.data)
      })
  }, [formattedDate, dirty])

  const handleCreateGroups = async () => {
    backend.post('api/roster/randomize/', { group_size: groupSize, name: name, date: formattedDate })
      .then((res) => {
        setActivity(res.data.activity)
        setShowModal(true)
        setGroupSize('')
        setName('')
        setDirty(!dirty)
      })
  }

  const handleViewGroup = (e) => {
    setActivity(activities.filter((each) => each.id == e.target.value)[0])
    setShowModal(true)
  }




  return (
    <Card className="shadow" border="primary" style={{ height: '100%' }}>
      <h4 className="text-center mt-1">Todays Groups</h4>
      <GroupsCreator
        handleCreateGroups={handleCreateGroups}
        groupSize={groupSize}
        setGroupSize={setGroupSize}
        name={name}
        setName={setName}
      />
      <ol>
        {activities?.length
          ?
          activities.map((activity) => {
            return (
              <div className='d-flex justify-content-around' style={{ width: '90%' }}>
                <li style={{ width: '75%' }}>
                  {activity.name}
                </li>
                <Button variant="outline-secondary" value={activity.id} onClick={handleViewGroup}>
                  View
                </Button>
              </div>
            )
          })
          : <p>Groups haven't been created yet</p>
        }
      </ol>
      <SuccessfullyGeneratedGroupsModal activity={activity} showModal={showModal} setShowModal={setShowModal} />
    </Card>
  )
}

export default GroupsCard