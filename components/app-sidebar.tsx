"use client";

import * as React from "react";
import {
  ChevronsUpDown,
  LocateIcon,
  LogOut,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";

const data = {
  navMain: [
    {
      title: "Locations",
      url: "/locations",
      icon: LocateIcon,
      items: [
        {
          title: "Andheri West",
          url: "/locations/andheri-west",
          phoneNumber: "917316967187",
        },
        {
          title: "Goregaon",
          url: "/locations/goregaon",
          phoneNumber: "919653484071",
        },
        {
          title: "Parel",
          url: "/locations/parel",
          phoneNumber: "9123456791",
        },
        {
          title: "Powai",
          url: "/locations/powai",
          phoneNumber: "9123456792",
        },
        {
          title: "Cuffe Parade",
          url: "/locations/cuffe-parade",
          phoneNumber: "9123456793",
        },
        {
          title: "Kharghar",
          url: "/locations/kharghar",
          phoneNumber: "9123456794",
        },
        {
          title: "Lodha Palava",
          url: "/locations/lodha-palava",
          phoneNumber: "9123456795",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg p-1 border-2 border-green-900 text-sidebar-primary-foreground">
                    <Image
                      src="/logos/healthspring-icon.png"
                      alt="Healthspring Logo"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Healthspring</span>
                    <span className="truncate text-xs">Calls Analytics</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">HA</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  Healthspring Admin
                </span>
                <span className="truncate text-xs">admin@healthspring.in</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            // side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Healthspring Admin
                  </span>
                  <span className="truncate text-xs">
                    admin@healthspring.in
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuSeparator />

            <DropdownMenuItem className="cursor-pointer">
              <Button className="flex w-full"> <LogOut />Logout</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
