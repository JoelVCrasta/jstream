import React from "react"
import { Search, X } from "lucide-react"

const SearchBar = () => {
  return (
    <div className="flex justify-center">
      <div className="h-14 w-2/3 flex rounded-xl bg-zinc-800">
        <div className="w-full relative" id="search">
          <X
            size={26}
            className="absolute right-3 top-4 text-zinc-600 hover:text-zinc-400 transition"
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-full bg-transparent outline-none pl-4 pr-12 text-xl"
          />
        </div>
        <div
          className="w-20 border-l-[1px] border-zinc-700 flex justify-center items-center cursor-pointer"
          id="find"
        >
          <Search
            size={30}
            className="m-auto text-zinc-600 hover:text-zinc-400 transition "
          />
        </div>
      </div>
    </div>
  )
}

export default SearchBar
