import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

type FAQItem = {
  question: string
  answer: string
}

type Props = {
  items: FAQItem[]
  title?: string
}

export function FAQ({ items = [], title = 'Perguntas frequentes' }: Props) {
  if (!items.length) return null

  return (
    <div className="my-8">
      {title && <h3 className="text-heading-3 text-brand-navy mb-4">{title}</h3>}
      <Accordion type="single" collapsible className="border border-brand-border rounded-2xl overflow-hidden">
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-brand-border px-2">
            <AccordionTrigger className="text-para-md font-semibold text-brand-navy text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-para-sm text-brand-navy/75 leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
