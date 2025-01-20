"use client"

import React, { use } from "react";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { TransactionForms } from "@/components/transaction/transaction-form";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function recordPage({
    params,
  }: {
    params: Promise<{ username: string }>;
  }) {
    const { username } = use(params);

    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <h1>{username}</h1>
            </div>
          </header>
          <div className="h-full px-4 py-2">
            <TransactionForms />
          </div>
      </SidebarInset>
    </SidebarProvider>
    );
  }