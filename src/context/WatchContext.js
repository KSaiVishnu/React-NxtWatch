import React from 'react'

const WatchContext = React.createContext({
  isDark: false,
  changeTheme: () => {},
  savedVideos: [],
  addItem: () => {},
  removeItem: () => {},
})

export default WatchContext
