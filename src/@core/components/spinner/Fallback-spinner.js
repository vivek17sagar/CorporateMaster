// ** Logo
import logo from '@src/assets/images/icons/loader.gif'

const SpinnerComponent = () => {
  return (
    <div className='fallback-spinner vh-100'>
      <img className='fallback-logo' src={logo} width='75' alt='logo' />
      <div className='loading'>
        {/* <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div> */}
      </div>
    </div>
  )
}

export default SpinnerComponent
