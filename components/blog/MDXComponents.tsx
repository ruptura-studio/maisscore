import Link from 'next/link'
import Image from 'next/image'
import type { MDXComponents } from 'mdx/types'
import { AlertBox } from '@/components/blog/AlertBox'
import { CTA } from '@/components/blog/CTA'
import { FAQ } from '@/components/blog/FAQ'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Field } from '@/components/ui/field'
import { Item } from '@/components/ui/item'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Spinner } from '@/components/ui/spinner'
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export function getMDXComponents(): MDXComponents {
  return {
    AlertBox,
    CTA,
    FAQ,
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    Alert,
    AlertTitle,
    AlertDescription,
    Badge,
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
    Field,
    Item,
    Label,
    Separator,
    Skeleton,
    Spinner,
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    h1: ({ children }) => (
      <h1 className="text-heading-1 text-brand-navy mt-10 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-heading-2 text-brand-navy mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-heading-3 text-brand-navy mt-8 mb-3">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-para-md text-brand-navy/80 leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-brand-navy/80">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-brand-navy/80">{children}</ol>
    ),
    li: ({ children }) => <li className="text-para-md">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-orange pl-4 italic text-brand-navy/70 my-6">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => {
      const isInternal = href?.startsWith('/')
      if (isInternal) {
        return (
          <Link href={href!} className="text-brand-orange underline hover:opacity-80">
            {children}
          </Link>
        )
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand-orange underline hover:opacity-80">
          {children}
        </a>
      )
    },
    strong: ({ children }) => (
      <strong className="font-semibold text-brand-navy">{children}</strong>
    ),
    hr: () => <hr className="border-brand-border my-8" />,
    table: ({ children }) => (
      <div className="overflow-x-auto mt-6 mb-8">
        <table className="w-full border-collapse text-para-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-brand-border bg-brand-navy/5 px-4 py-2 text-left font-semibold text-brand-navy">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-brand-border px-4 py-2 text-brand-navy/80">{children}</td>
    ),
    img: ({ src, alt }) => (
      <span className="block relative aspect-video w-full my-6 overflow-hidden rounded-xl">
        <Image src={src!} alt={alt ?? ''} fill className="object-cover" />
      </span>
    ),
  }
}
