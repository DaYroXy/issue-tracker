'use client'
import { usePathname } from "next/navigation"
import Link from "next/link"
import { AiFillBug } from "react-icons/ai"
import classnames from "classnames";

const NavBar = () => {

    const currentPath = usePathname();

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" },
    ]

    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
            <Link href="/"><AiFillBug /></Link>
            <ul className="flex space-x-6">
                {links.map(({ label, href }, index) => (
                    <Link 
                        key={index}
                        href={href}
                        className={classnames({
                            'text-zinc-900': href === currentPath,
                            'text-zinc-500': href != currentPath,
                            'hover:text-zinc-800 transition-colors': true
                        })}>
                        {label}
                    </Link>
                ))}
            </ul>
        </nav>
    )
}

export default NavBar