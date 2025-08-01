"use client"

import { 
    LucideIcon, 
    ChevronRight,
} from "lucide-react"
import { 
    SidebarGroup, 
    SidebarMenu, 
    SidebarMenuItem, 
    SidebarMenuButton, 
    SidebarMenuSub, 
    SidebarMenuSubItem, 
    SidebarMenuSubButton, 
} from "./ui/sidebar"
import { 
    Collapsible, 
    CollapsibleTrigger, 
    CollapsibleContent, 
} from "@radix-ui/react-collapsible"

export function SideMain(
    {
        items,
    }: {
        items: {
            title: string
            url: string
            icon?: LucideIcon
            isActive?: boolean
            items?: {
            title: string
            url: string
            }[]
        }[]
    }) {

    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) =>
                !item.items || item.items.length === 0 ? (
                    <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                        <a href={item.url}>
                        {item.icon && <item.icon className="mr-2" />}
                        <span>{item.title}</span>
                        </a>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ) : (
                    <Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={item.isActive}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                            <SidebarMenuButton tooltip={item.title}>
                                {item.icon && <item.icon className="mr-2" />}
                                <span>{item.title}</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                            <SidebarMenuSub>
                                {item.items.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton asChild>
                                    <a href={subItem.url}>
                                        <span>{subItem.title}</span>
                                    </a>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                                ))}
                            </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                )
                )}
            </SidebarMenu>
        </SidebarGroup>
    )
}