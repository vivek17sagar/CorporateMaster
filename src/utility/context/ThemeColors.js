// ** React Imports
import { useEffect, useState, createContext } from 'react'

// ** Create Context
const ThemeColors = createContext()

const ThemeContext = ({ children }) => {
  // ** State
  const [colors, setColors] = useState({})

  //** ComponentDidMount
  useEffect(() => {
    if (window !== 'undefined') {
      //** Get variable value
      const getHex = color => window.getComputedStyle(document.body).getPropertyValue(color).trim()

      //** Colors obj
      const obj = {
        primary: {
          light: getHex('--primary').concat('1a'),
          lighter: getHex('--primary').concat('aa'),
          main: getHex('--primary')
        },
        secondary: {
          light: getHex('--secondary').concat('1a'),
          lighter: getHex('--secondary').concat('aa'),
          main: getHex('--secondary')
        },
        success: {
          light: getHex('--success').concat('1a'),
          lighter: getHex('--success').concat('aa'),
          main: getHex('--success')
        },
        danger: {
          light: getHex('--danger').concat('1a'),
          lighter: getHex('--danger').concat('aa'),
          main: getHex('--danger')
        },
        warning: {
          light: getHex('--warning').concat('1a'),
          lighter: getHex('--warning').concat('aa'),
          main: getHex('--warning')
        },
        info: {
          light: getHex('--info').concat('1a'),
          lighter: getHex('--info').concat('aa'),
          main: getHex('--info')
        },
        dark: {
          light: getHex('--dark').concat('1a'),
          main: getHex('--dark')
        },
        cyan: {
          light: getHex('--cyan').concat('1a'),
          lighter: getHex('--cyan').concat('aa'),
          main: getHex('--cyan')
        },
        blue: {
          light: getHex('--blue').concat('1a'),
          lighter: getHex('--blue').concat('aa'),
          main: getHex('--blue')
        }
      }

      setColors({ ...obj })
    }
  }, [])

  return <ThemeColors.Provider value={{ colors }}>{children}</ThemeColors.Provider>
}

export { ThemeColors, ThemeContext }
