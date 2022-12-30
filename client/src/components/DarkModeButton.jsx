import React, { useState, useEffect } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'

const DarkModeButton = () => {
  const [theme, setTheme] = useState('')
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if(theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  const handleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button type='button' onClick={handleTheme}>
        <DarkModeSwitch 
            style={{ marginBottom: '5px' }}
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={32}
            moonColor='gray'
            sunColor='gray'
        />
    </button>
  )
}

export default DarkModeButton