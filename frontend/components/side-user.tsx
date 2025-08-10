"use client"

import { LogOut, LogIn, UserPlus } from "lucide-react"
import { 
    SidebarMenu, 
    SidebarMenuItem, 
    SidebarMenuButton, 
    SidebarGroup
} from "./ui/sidebar"

export function SideUser(
    {
    user,
    }: {
        user: {
            name: string
            email: string
        } | null
    }) {

  return (    
    <SidebarGroup>
      <SidebarMenu className="border rounded-md p-1">
        {user ? (
          <>
            {/* แสดง username / email */}
            <SidebarMenuItem className="flex flex-col items-start px-3 py-2 border rounded-md">
              <div className="font-semibold text-md">{user?.name}</div>
              <div className="text-muted-foreground text-sm">{user?.email}</div>
            </SidebarMenuItem>

            {/* ปุ่ม Logout */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button className="w-full flex items-center gap-2 justify-start text-md border rounded-md">
                  <LogOut size={16} />
                  Log out
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </>
        ) : (
          <>
            {/* ปุ่ม Login */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/login" className="w-full flex items-center gap-2 justify-start text-md border rounded-md">
                  <LogIn size={16} />
                  Log in
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* ปุ่ม Sign up */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/register" className="w-full flex items-center gap-2 justify-start text-md border rounded-md">
                  <UserPlus size={16} />
                  Sign up
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </>
        )}
      </SidebarMenu>
    </SidebarGroup> 
  )
}