"use client";

import * as React from "react";
import { LayoutDashboard, Home } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { SideItems, SideUser } from "@/components/sidebar/sidebar-items";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";


type User = {
  id: string;
  name?: string;
  email?: string;
  avatar_url?: string | null;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   const [userData, setUserData] = React.useState<User | null>(null);
  
    React.useEffect(() => {
      const fetchData = async () => {
        const supabase = createClient();
  
        const { data: authUser, error: authError } = await supabase.auth.getUser();
        if (authError || !authUser.user) return;
  
        const { data: user, error } = await supabase
          .from("profiles")
          .select("display_name")
          .eq("id", authUser.user.id)
          .single();
  
        if (error) {
          console.log(error);
          return;
        }
  
        setUserData({
          id: authUser.user.id,
          name: authUser.user.user_metadata?.display_name,
          email: authUser.user.email || "",
          avatar_url: undefined,
        });
      };
  
      fetchData();
    }, []);

  const sideItems = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Transaction",
          url: `/dashboard/transaction/${userData?.name || "guest"}`,
        },
        {
          title: "Summary",
          url: `/dashboard/summary/${userData?.name || "guest"}`,
        },
      ],
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <SideItems item={sideItems} />
      </SidebarContent>
      <SidebarFooter>
        <SideUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}