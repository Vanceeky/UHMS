import React from 'react';

import { AppSidebar } from "@/components/app-sidebar"

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const HotelStaffLayout = ({ children }: { children: React.ReactNode }) => {
    return <>
        <SidebarProvider>
            <AppSidebar />
            
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                    />
                
                </div>
                </header>
                <div className='p-4 pt-0'>
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    

    </>;
};

export default HotelStaffLayout;