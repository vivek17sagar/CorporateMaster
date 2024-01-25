// ** User List Component
import Table from './Table'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { useHistory } from 'react-router-dom'

const UsersList = () => {
  const history = useHistory()

  const newEmployee = (e) => {
    // console.log(e)
    history.push('/employees/new')
  }

  return (
    <div className='app-user-list'>
      <Table addHandler={newEmployee} />
    </div>
  )
}

export default UsersList
