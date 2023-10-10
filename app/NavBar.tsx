'use client'
import { usePathname } from "next/navigation"
import Link from "next/link"
import { AiFillBug } from "react-icons/ai"
import classnames from "classnames";
import { useSession } from "next-auth/react"
import { Box } from "@radix-ui/themes";

const NavBar = () => {

    const currentPath = usePathname();
    const { status, data: session } = useSession()

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" },
    ]

    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
            <Link href="/"><AiFillBug /></Link>
            <ul className="flex space-x-6">
                {links.map(({ label, href }, index) => (
                    <li key={index}>
                        <Link 
                            href={href}
                            className={classnames({
                                'text-zinc-900': href === currentPath,
                                'text-zinc-500': href != currentPath,
                                'hover:text-zinc-800 transition-colors': true
                            })}>
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
            <Box>
                {status === 'authenticated' && <Link href="/api/auth/signout">Log out</Link>}
                {status === 'unauthenticated' && <Link href="/api/auth/signin">Login</Link>}
            </Box>
        </nav>
    )
}

export default NavBar