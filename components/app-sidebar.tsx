"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";

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

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  navMain: React.ReactNode;
  navUser: React.ReactNode;
};

export function AppSidebar({ navMain, navUser, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex justify-center items-center">
        <SidebarLogo />
      </SidebarHeader>

      <SidebarContent>{navMain}</SidebarContent>
      <SidebarFooter>{navUser}</SidebarFooter>
    </Sidebar>
  );
}
