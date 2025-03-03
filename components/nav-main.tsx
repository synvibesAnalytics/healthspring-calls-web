"use client";


import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";


import { useRouter } from "next/navigation";
import Link from "next/link";

// Define types for menu items
interface SubMenuItem {
  title: string;
  url: string;
  phoneNumber: string;
}

interface MenuItem {
  title: string;
  icon?: React.ComponentType;
  isActive?: boolean;
  items?: SubMenuItem[];
}

interface NavMainProps {
  items: MenuItem[];
}





export function NavMain({ items }: NavMainProps) {

  const router = useRouter();
  
  const handleLocationClick = (subItem: SubMenuItem) => {
    router.push(`${subItem.url}?phone=${subItem.phoneNumber}`);
    console.log("hello")
  };
  
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
            {/* Directly render submenus without collapsible behavior */}
            {item.items && (
              <SidebarMenuSub>
                {item.items.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton asChild>
                      <Link href={subItem.url} onClick={() => handleLocationClick(subItem)}>
                        {subItem.title}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
