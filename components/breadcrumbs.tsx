import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbLink {
  href: string
  label: string
}

interface BreadcrumbsProps {
  links: BreadcrumbLink[]
  className?: string
}

export default function Breadcrumbs({ links, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="breadcrumbs" className={cn("flex items-center text-sm text-muted-foreground", className)}>
      <Link href="/" className="hover:underline">
        Inicio
      </Link>
      {links.map((link, index) => (
        <div key={link.href} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1" />
          {index === links.length - 1 ? (
            <span className="font-medium text-foreground">{link.label}</span>
          ) : (
            <Link href={link.href} className="hover:underline">
              {link.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
