import React, {useState} from 'react'

const SearchContext = React.createContext()

function Provider({children}) {
  const [searchActive, setSearchActive] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  const toggleSearchResult = () => {
    setSearchActive(false)
  }

  const handleSearchApi = input => {
    setSearchInput(input)
    setSearchActive(true)
  }

  return (
    <SearchContext.Provider
      value={{
        handleSearchApi,
        searchActive,
        toggleSearchResult,
        searchInput,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export {Provider}
export default SearchContext
