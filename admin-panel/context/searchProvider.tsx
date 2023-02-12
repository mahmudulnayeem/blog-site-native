import { searchPost } from 'lib/post'
import { createContext, ReactNode, useContext, useState } from 'react'

interface searchContextProps {
    children: ReactNode
}
type searchContextType = undefined | unknown | any
const SearchContext = createContext<searchContextType>([])

const SearchProvider = ({ children }: searchContextProps) => {
    const [searchResult, setSearchResult] = useState<any>([])
    const handleSearch = async (query: string | undefined) => {
        const { error, posts } = await searchPost(query)
        if (error) return console.log(error)
        setSearchResult(posts)
    }
    const resetSearch = () => {
        setSearchResult([])
    }
    return (
        <SearchContext.Provider value={{ searchResult, handleSearch, resetSearch }}>{children}</SearchContext.Provider>
    )
}

export default SearchProvider


export const useSearch = () => useContext(SearchContext)