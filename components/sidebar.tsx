"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, Folder, Image, Menu } from 'lucide-react'

const sidebarItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Channel', href: '/channel', icon: Folder },
  { name: 'Program', href: '/program', icon: Image },
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <Link href="/">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            T-Movie
          </h2>
          </Link>
        
          <div className="space-y-1 gap-4 flex flex-col mt-12">
            {sidebarItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}

export function DashboardSidebar() {
  return (
    <>
      <aside className="hidden md:flex md:w-[240px] md:flex-col md:fixed md:inset-y-0">
        <ScrollArea className="flex-grow">
          <Sidebar />
        </ScrollArea>
      </aside>
      <div className="md:hidden">
        <MobileSidebar />
      </div>
    </>
  )
}

