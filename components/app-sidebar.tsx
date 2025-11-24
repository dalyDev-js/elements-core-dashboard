"use client";

import * as React from "react";
import { BookOpen, Bot, Home, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuSkeleton,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";

const data = {
  user: {},
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
    },
    {
      title: "Projects",
      url: "#",
      icon: SquareTerminal,

      items: [
        {
          title: "New Project",
          url: "/projects/new",
        },
        {
          title: "All Projects",
          url: "/projects/  ",
        },
      ],
    },
    {
      title: "Clients",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "New Client",
          url: "/clients/new",
        },
        {
          title: "All Clients",
          url: "/clients",
        },
      ],
    },
    {
      title: "Users",
      url: "/users",
      icon: BookOpen,
      items: [
        {
          title: "New User",
          url: "/users/new",
        },
        {
          title: "All Users",
          url: "/users",
        },
      ],
    },
  ],
};
function SidebarLogo() {
  const { state } = useSidebar();

  return (
    <Image
      src={
        state === "collapsed"
          ? "/images/logo-shape.png"
          : "/images/logo-full.png"
      }
      alt="Logo"
      width={state === "collapsed" ? 40 : 150}
      height={state === "collapsed" ? 40 : 100}
    />
  );
}
function NavMainSkeleton() {
  return (
    <div className="space-y-2 p-2">
      {[...Array(4)].map((_, i) => (
        <SidebarMenuSkeleton key={i} showIcon />
      ))}
    </div>
  );
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex justify-center items-center">
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
