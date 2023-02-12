import { useSearch } from "context/searchProvider"
import React, { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"

const SearchBar = () => {
    const [query, setQuery] = useState('')
    const { handleSearch, resetSearch, searchResult } = useSearch()
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (!query.trim()) return
        handleSearch(query)
    }
    const handleReset = () => {
        resetSearch()
        setQuery('')
    }
    const handleKeyDown = (e: any) => {
        if (e.key === 'Escape') {
            resetSearch()
            setQuery('')
        }
    }
    return (
        <form onSubmit={handleSubmit} className='relative' >
            <input value={query}
                onKeyDown={handleKeyDown}
                onChange={({ target }) => setQuery(target.value)} placeholder="search..." type="text" className="border border-gray-500 outline-none  focus:ring-1  ring-blue-500  w-56 rounded p-1" />
            {searchResult.length ? <button onClick={handleReset} className="absolute top-1/2 -translate-y-1/2 text-gray-500 right-3"><AiOutlineClose /></button> : null}
        </form>
    )
}

export default SearchBar