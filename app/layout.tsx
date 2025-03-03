"use client";

import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

import { usePathname } from "next/navigation";
import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <div className="flex h-screen w-full">
              {/* Sidebar Component */}
              <AppSidebar />

              {/* Main Content Wrapper */}
              <SidebarInset className="flex flex-col flex-1 w-full">
                {/* Navbar with Breadcrumbs */}
                <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />

                  {/* Breadcrumb Navigation */}
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link href="/">Dashboard</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>

                      {pathSegments.map((segment, index) => {
                        const href =
                          "/" + pathSegments.slice(0, index + 1).join("/");
                        const isLast = index === pathSegments.length - 1;

                        // Skip the "dashboard" segment if it's the first item
                        if (index === 0 && segment === "dashboard") return null;

                        return (
                          <div key={href} className="flex items-center">
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                              {isLast ? (
                                <BreadcrumbPage>
                                  {decodeURIComponent(segment)}
                                </BreadcrumbPage>
                              ) : segment === "locations" ? ( // Disable link for "locations"
                                <span className="text-gray-500 cursor-not-allowed">
                                  {decodeURIComponent(segment)}
                                </span>
                              ) : (
                                <BreadcrumbLink asChild>
                                  <Link href={href}>
                                    {decodeURIComponent(segment)}
                                  </Link>
                                </BreadcrumbLink>
                              )}
                            </BreadcrumbItem>
                          </div>
                        );
                      })}
                    </BreadcrumbList>
                  </Breadcrumb>
                </header>

                {/* Main Content Area */}
                <div className="flex-1 w-full p-4">{children}</div>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
