"use client"

import * as React from "react"
import { SideMain } from "./side-main"
import { SideUser } from "./side-user"
import { useUser } from "@/hooks/useUser"
import { 
    Sidebar, 
    SidebarHeader, 
    SidebarContent,
    SidebarFooter,  
    SidebarRail,
} from "./ui/sidebar"
import {
    Mail,
    House,
    Wallet,
    PiggyBank,
} from "lucide-react"

const data = {
    main: [
        {
            title: "home",
            url: "/",
            icon: House,
            isActivate: false,
        },
        {
            title: "pocket-board",
            url: "/wallet",
            icon: Wallet,
            isActivate: true,
            items: [
                {
                    title: "#pocket1",
                    url: "#",
                },
                {
                    title: "#pocket2",
                    url: "#",
                },
            ],
        },
        {
            title: "feedback",
            url: "#",
            icon: Mail,
            isActivate: false,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user, isLoading } = useUser()

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex gap-1 p-1.5 justify-center items-center">
                    <PiggyBank className="!size-5"/>
                    <span className="text-base font-semibold">Pig-Pocket</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SideMain items={data.main} />
            </SidebarContent>
            <SidebarFooter>
                {isLoading ? (
                    <SideUser user={null} />
                ) : (
                    <SideUser user={user} />
                )}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}