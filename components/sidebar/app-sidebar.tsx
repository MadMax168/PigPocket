"use client";

import * as React from "react";
import { SideItems, SideUser } from "@/components/sidebar/sidebar-items";
import { LayoutDashboard, FileText, Home, Mail } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/client";

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

      if (!error) {
        console.error(error);
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
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: FileText,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Feedback",
    //   url: "#",
    //   icon: Mail,
    // },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <SideItems item={sideItems} />
      </SidebarContent>
      <SidebarFooter>
        <SideUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
