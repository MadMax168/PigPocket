"use client"

import * as React from "react"
import { SideMain } from "./side-main"
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
    PiggyBank,
} from "lucide-react"

const data = {
    user: {
        name: "test123",
        email: "test@mail.com",
    },
    main: [
        {
            title: "home",
            url: "#",
            icon: House,
            isActivate: false,
        },
        {
            title: "pocket-board",
            url: "#",
            icon: PiggyBank,
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
                
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}