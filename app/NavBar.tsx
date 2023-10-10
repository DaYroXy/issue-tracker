'use client'
import { usePathname } from "next/navigation"
import Link from "next/link"
import { AiFillBug } from "react-icons/ai"
import classnames from "classnames";
import { useSession } from "next-auth/react"
import { Avatar, Box, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


const NavBar = () => {

    const currentPath = usePathname();
    const { status, data: session } = useSession()

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" },
    ]

    return (
        <nav className="border-b mb-5 px-5 py-3">
            <Flex justify="between">
                <Flex align="center" gap="3">
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
                </Flex>
                <Box>
                    {status === 'loading' &&
                        <Skeleton width="3rem" />
                    }

                    {status === 'authenticated' && (
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <Avatar className="cursor-pointer" size="2" radius="full" src={session.user!.image!} fallback="?" />
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                <DropdownMenu.Label>
                                    <Text size="2">{session.user!.name}</Text>
                                </DropdownMenu.Label>
                                <DropdownMenu.Item>
                                    <Link href="/api/auth/signout">Log out</Link>
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                        // <Link href="/api/auth/signout">Log out</Link>
                    )}
                    {status === 'unauthenticated' && <Link href="/api/auth/signin">Login</Link>}
                </Box>
            </Flex>


        </nav>
    )
}

export default NavBar