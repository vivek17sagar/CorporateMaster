// ** Dropdowns Imports
import { Fragment } from 'react'
// ** Third Party Components
import { Moon, Search, Sun } from 'react-feather'
import { Form, Input, InputGroup, InputGroupAddon, InputGroupText, NavItem, NavLink } from 'reactstrap'
import UserDropdown from './UserDropdown'
import NavbarBookmarks from './NavbarBookmarks'

const ThemeNavbar = props => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  const inputControlStyle = {
    borderTopRightRadius: '50px',
    borderBottomRightRadius: '50px',
    backgroundColor: '#eeeeee'
  }

  const searchIconStyle = {
    borderTopLeftRadius: '50px',
    borderBottomLeftRadius: '50px',
    backgroundColor: '#eeeeee'
  }

  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>
        {/* <NavbarBookmarks setMenuVisibility={setMenuVisibility} /> */}
        <NavItem className='d-none d-lg-block'>
          <NavLink className='nav-link-style'>
            <Form onSubmit={e => e.preventDefault()}>
              <InputGroup className='input-group-merge'>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText style={searchIconStyle}>
                    <Search size={14} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input style={inputControlStyle} placeholder='Type in to search' />
              </InputGroup>
            </Form>
          </NavLink>
        </NavItem>
      </div>
      <ul className='nav navbar-nav align-items-center ml-auto'>
        {/* <IntlDropdown /> */}
        {/* <NavItem className='d-none d-lg-block'>
          <NavLink className='nav-link-style'>
            <ThemeToggler />
          </NavLink>
        </NavItem> */}
        {/* <NavbarSearch /> */}
        {/* <CartDropdown /> */}
        {/* <NotificationDropdown /> */}
        <UserDropdown />
      </ul>
    </Fragment>
  )
}

export default ThemeNavbar
