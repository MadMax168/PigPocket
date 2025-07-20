"use client"

import Link from "next/link";
import { usePathname } from "next/navigation"
import { Separator } from "@radix-ui/react-separator";
import { 
    SidebarInset, 
    SidebarTrigger 
} from "./ui/sidebar";
import { 
    Breadcrumb, 
    BreadcrumbList, 
    BreadcrumbItem, 
    BreadcrumbPage, 
    BreadcrumbLink, 
    BreadcrumbSeparator 
} from "./ui/breadcrumb";

export function NavHeader() {
    const pathname = usePathname()
    const segments = pathname.split("/").filter(Boolean)

    const pathList = segments.map((seg, idx) => ({
        name: decodeURIComponent(seg.charAt(0).toUpperCase() + seg.slice(1)),
        href: "/" + segments.slice(0, idx + 1).join("/"),
    }))


    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                orientation="vertical"
                className="border mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="/">
                                Pig-Pocket
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        {pathList.map((item, index) => (
                        <div key={item.href} className="flex items-center">
                            <BreadcrumbItem>
                            {index === pathList.length - 1 ? (
                                <BreadcrumbPage>{item.name}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink asChild>
                                <Link href={item.href}>{item.name}</Link>
                                </BreadcrumbLink>
                            )}
                            </BreadcrumbItem>
                            {index < pathList.length - 1 && (
                            <BreadcrumbSeparator />
                            )}
                        </div>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    )
}