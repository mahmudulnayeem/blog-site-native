import Link from 'next/link'
import { useRouter } from 'next/router'
import { navLinks } from 'public/navLinks'

interface propsType {
    closed?: boolean | undefined
}

const NavBar = ({ closed }: propsType) => {
    const commonClasses = 'flex items-center space-x-2 w-full p-2 block whitespace-nowrap '
    const activeClass = commonClasses + ' bg-blue-500 text-white'
    const inActiveClass = commonClasses + ' text-gray-500'
    const { pathname } = useRouter()

    return (
        <nav>
            <ul>
                {navLinks.map(navlink => {
                    return (
                        <li key={navlink.name}>
                            <Link href={navlink.path} className={pathname === navlink.path ? activeClass : inActiveClass} >
                                <navlink.icon size={24} />  <span className={closed ? 'w-0 transition-width overflow-hidden' : 'w-full transition-width overflow-hidden'}>  {navlink.name}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav >
    )
}

export default NavBar