
import { ReactNode, useState } from 'react';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import NavBar from './NavBar';
import SearchBar from './SearchBar';

interface Props {
    children?: ReactNode
}


export default function LayOut({ children }: Props) {
    const [closedNav, setClosedNav] = useState<boolean>(false)



    const toggleNav = () => {
        setClosedNav(pre => !pre)
    }
    const getNavWidth = () => closedNav ? 'w-16' : 'w-56'

    return (
        <div className="flex">
            {/* nav section */}
            <div className=" sticky top-0">
                <div className={getNavWidth() + " min-h-screen transition-width border border-r "}>
                    <NavBar closed={closedNav} />
                </div>
            </div>

            {/* content section */}
            <div className="flex-1 min-h-screen h-screen bg-gray-100">
                <div className=" sticky top-0">

                    <div className="flex items-center p-2 space-x-2">

                        <button onClick={toggleNav} >
                            {closedNav ? < AiOutlineMenuUnfold size={25} /> : <AiOutlineMenuFold size={25} />}
                        </button>
                        <SearchBar />
                    </div>
                </div>
                <div className='max-w-screen-lg max-h-[92%] mx-auto overflow-scroll scrollbar-hide '>
                    {children}
                </div>
            </div>
        </div>
    )
}
