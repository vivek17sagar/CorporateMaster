// ** Custom Hooks
import dashboard from '@src/assets/images/icons/dashboard.png'
import { handleContentWidth, handleMenuCollapsed, handleMenuHidden } from '@store/actions/layout'
import '@styles/base/pages/app-chat-list.scss'
import '@styles/base/pages/app-chat.scss'
// ** Styles
import '@styles/react/apps/app-calendar.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
// ** Styles
import 'animate.css/animate.css'
// ** Third Party Components
import classnames from 'classnames'
// ** React Imports
import { Fragment, useEffect } from 'react'
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, Row } from 'reactstrap' // ** React Imports

const LayoutWrapper = props => {
  // ** Props
  const { layout, children, appLayout, wrapperClass, transition, routeMeta } = props

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state)
  const navbarStore = store.navbar
  const contentWidth = store.layout.contentWidth

  //** Vars
  const Tag = layout === 'HorizontalLayout' && !appLayout ? 'div' : Fragment

  // ** Clean Up Function
  const cleanUp = () => {
    if (routeMeta) {
      if (routeMeta.contentWidth) {
        dispatch(handleContentWidth('full'))
      }
      if (routeMeta.menuCollapsed) {
        dispatch(handleMenuCollapsed(!routeMeta.menuCollapsed))
      }
      if (routeMeta.menuHidden) {
        dispatch(handleMenuHidden(!routeMeta.menuHidden))
      }
    }
  }

  // ** ComponentDidMount
  useEffect(() => {
    if (routeMeta) {
      if (routeMeta.contentWidth) {
        dispatch(handleContentWidth(routeMeta.contentWidth))
      }
      if (routeMeta.menuCollapsed) {
        dispatch(handleMenuCollapsed(routeMeta.menuCollapsed))
      }
      if (routeMeta.menuHidden) {
        dispatch(handleMenuHidden(routeMeta.menuHidden))
      }
    }
    return () => cleanUp()
  }, [])

  return (
    <div
      className={classnames('app-content content overflow-hidden', {
        [wrapperClass]: wrapperClass,
        'show-overlay': navbarStore.query.length
      })}
    >
      <div className='content-overlay'></div>
      <div className='header-navbar-shadow' />
      {appLayout && <Row>
        <div className='font-weight-bold px-1 py-50 mb-1' style={{ borderRight: '2px solid lightgrey' }}>
          Chat
        </div>
        <Breadcrumb className='pl-0 pb-1'>
          <BreadcrumbItem tag='li'>
            <Link to='/'>
              <img src={dashboard} width='20' height='20' />
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem tag='li'>
            Chat
          </BreadcrumbItem>
        </Breadcrumb>
      </Row>
      }
      <div
        className={classnames({
          'content-wrapper': !appLayout,
          'content-area-wrapper': appLayout,
          'container p-0': contentWidth === 'boxed',
          [`animate__animated animate__${transition}`]: transition !== 'none' && transition.length
        })}
      >

        <Tag
          /*eslint-disable */
          {...(layout === 'HorizontalLayout' && !appLayout
            ? { className: classnames({ 'content-body': !appLayout }) }
            : {})}
        /*eslint-enable */
        >
          {children}
        </Tag>
      </div>
    </div>
  )
}

export default LayoutWrapper
