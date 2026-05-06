"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { normalizeBrazilPhone } from "@/lib/phone";
import {
  CheckCircle,
  AlertCircle,
  Circle,
  Check,
  TriangleAlert,
  FileText,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

type LeadData = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  cpf: string | null;
  leadType: string | null;
  acquisition: string | null;
  paymentConfirmedAt: string | null;
  convertedAt: string | null;
  birthDate: string | null;
  addressStreet: string | null;
  addressNumber: string | null;
  addressComplement: string | null;
  addressNeighborhood: string | null;
  addressCity: string | null;
  addressState: string | null;
  addressZip: string | null;
  identityDocument: string | null;
  civilStatus: string | null;
  profession: string | null;
  valorDivida: string | null;
  objetivo: string | null;
  responsibleName: string | null;
  responsibleCpf: string | null;
  isLocked: boolean;
  processSlug: string | null;
  onboardingCompletedAt: string | null;
};

type FormState = {
  birthDate: string;
  email: string;
  phone: string;
  cpf: string;
  addressZip: string;
  addressStreet: string;
  addressNumber: string;
  addressComplement: string;
  addressNeighborhood: string;
  addressCity: string;
  addressState: string;
  identityDocument: string;
  civilStatus: string;
  profession: string;
  valorDivida: string;
  objetivo: string;
  responsibleName: string;
  responsibleCpf: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

// ── Formatters ─────────────────────────────────────────────────────────────

function formatCep(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length > 5) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  return digits;
}

function formatCpf(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length > 9)
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
  if (digits.length > 6)
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  if (digits.length > 3) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  return digits;
}

function formatPhone(value: string) {
  const d = normalizeBrazilPhone(value)?.slice(0, 11) ?? "";
  if (d.length <= 10)
    return d.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "");
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "");
}

function formatIdentityDocument(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8)
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}-${digits.slice(8)}`;
}

function formatDate(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length > 4)
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

function parseDateToISO(value: string): string {
  const [day, month, year] = value.split("/");
  if (!day || !month || !year || year.length < 4) return "";
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

function formatAcquisitionLabel(
  value: string | null | undefined,
  leadType: string | null | undefined,
) {
  const normalized = value?.trim().toUpperCase();
  if (normalized === "CPF" || normalized === "LIMPA-NOME-CPF") {
    return "Serviço jurídico de remoção de restrições em CPF.";
  }
  if (normalized === "CNPJ" || normalized === "LIMPA-NOME-CNPJ") {
    return "Serviço jurídico de remoção de restrições em CNPJ.";
  }
  if (leadType?.toLowerCase() === "cpf")
    return "Serviço jurídico de remoção de restrições em CPF.";
  if (leadType?.toLowerCase() === "cnpj")
    return "Serviço jurídico de remoção de restrições em CNPJ.";
  if (!value) return "Serviço não informado";
  return value.replace(/[-_]/g, " ");
}

const financeGoalOptions = [
  { value: "regularizar_meu_nome", label: "Regularizar meu nome" },
  { value: "financiamento_imobiliario", label: "Financiamento imobiliário" },
  { value: "financiamento_veiculo", label: "Financiamento de veículo" },
  { value: "emprestimo_financeiro", label: "Empréstimo financeiro" },
  { value: "cartao_de_credito", label: "Cartão de crédito" },
  { value: "alugar_um_imovel", label: "Alugar um imóvel" },
  { value: "abrir_minha_empresa", label: "Abrir minha empresa" },
] as const;

// ── Scroll helper ───────────────────────────────────────────────────────────

function scrollFieldIntoView(el: HTMLElement) {
  // Wait one frame so the virtual keyboard has time to resize the viewport
  requestAnimationFrame(() => {
    const vv = window.visualViewport;
    const viewportHeight = vv ? vv.height : window.innerHeight;
    const rect = el.getBoundingClientRect();
    const offsetFromTop = vv ? vv.offsetTop : 0;
    const elementBottom = rect.bottom + offsetFromTop;
    const margin = 24; // gap between field and keyboard

    if (elementBottom > viewportHeight - margin) {
      const scrollBy = elementBottom - (viewportHeight - margin);
      window.scrollBy({ top: scrollBy, behavior: "smooth" });
    }
  });
}

// ── Input component ─────────────────────────────────────────────────────────

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-label text-brand-navy">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </label>
      {children}
      {error && <p className="text-txt-xs text-destructive">{error}</p>}
    </div>
  );
}

function CheckIcon() {
  return (
    <span className="absolute left-3 z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success pointer-events-none">
      <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
    </span>
  );
}

function PrefilledWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex items-center">
      <CheckIcon />
      {children}
    </div>
  );
}

function PendingWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex items-center">
      <Circle className="absolute left-3 h-4 w-4 shrink-0 text-brand-orange/70 pointer-events-none z-10" />
      {children}
    </div>
  );
}

function AnsweredWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex items-center">
      <CheckIcon />
      {children}
    </div>
  );
}

function Input({
  error,
  prefilled,
  answered,
  pending,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  prefilled?: boolean;
  answered?: boolean;
  pending?: boolean;
}) {
  const base = `h-11 w-full rounded-md border text-sm outline-none transition-colors`;
  const stateClass = prefilled
    ? "pl-9 pr-3 border-success bg-neutral-50 text-brand-navy/60 cursor-default"
    : answered
      ? "pl-9 pr-3 border-success bg-white text-brand-navy focus:border-success"
      : pending
        ? "pl-9 pr-3 border-dashed border-brand-orange/50 text-brand-navy placeholder:text-neutral-400 focus:border-brand-orange bg-white"
        : error
          ? "pl-9 pr-3 border-destructive text-brand-navy placeholder:text-neutral-400 focus:border-brand-navy"
          : "px-3 border-brand-border text-brand-navy placeholder:text-neutral-400 focus:border-brand-navy";

  return (
    <input
      {...props}
      disabled={prefilled || props.disabled}
      className={`${base} ${stateClass}`}
      onFocus={(e) => {
        scrollFieldIntoView(e.currentTarget);
        props.onFocus?.(e);
      }}
    />
  );
}

function SelectTriggerState({
  prefilled,
  answered,
  error,
  className,
  children,
}: {
  prefilled?: boolean;
  answered?: boolean;
  error?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const stateClass = prefilled
    ? "border-success bg-neutral-50 text-brand-navy/60 pl-9 cursor-default"
    : answered
      ? "border-success bg-white text-brand-navy pl-9 focus:border-success"
      : error
        ? "border-destructive pl-9"
        : "border-dashed border-brand-orange/50 pl-9";

  return (
    <SelectTrigger
      className={`${className ?? ""} ${stateClass}`.trim()}
      onFocus={(e) => scrollFieldIntoView(e.currentTarget)}
    >
      {children}
    </SelectTrigger>
  );
}

function TextareaState({
  prefilled,
  answered,
  error,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  prefilled?: boolean;
  answered?: boolean;
  error?: boolean;
}) {
  const stateClass = prefilled
    ? "border-success bg-neutral-50 text-brand-navy/60 cursor-default"
    : answered
      ? "border-success bg-white text-brand-navy focus:border-success"
      : error
        ? "border-destructive focus:border-brand-navy"
        : "border-dashed border-brand-orange/50 focus:border-brand-orange";

  return (
    <textarea
      {...props}
      className={`${props.className ?? ""} ${stateClass}`.trim()}
      onFocus={(e) => {
        scrollFieldIntoView(e.currentTarget);
        props.onFocus?.(e);
      }}
    />
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export default function OnboardingClient({ token }: { token: string }) {

  const [lead, setLead] = useState<LeadData | null>(null);
  const [pageState, setPageState] = useState<
    "loading" | "form" | "confirm" | "completed" | "invalid"
  >("loading");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [partialSaveAlert, setPartialSaveAlert] = useState(false);

  const [form, setForm] = useState<FormState>({
    birthDate: "",
    email: "",
    phone: "",
    cpf: "",
    addressZip: "",
    addressStreet: "",
    addressNumber: "",
    addressComplement: "",
    addressNeighborhood: "",
    addressCity: "",
    addressState: "",
    identityDocument: "",
    civilStatus: "",
    profession: "",
    valorDivida: "",
    objetivo: "",
    responsibleName: "",
    responsibleCpf: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [zipLoading, setZipLoading] = useState(false);
  const [prefilled, setPrefilled] = useState<Set<keyof FormState>>(new Set());
  const [answeredFields, setAnsweredFields] = useState<Set<keyof FormState>>(
    new Set(),
  );
  const [typingField, setTypingField] = useState<keyof FormState | null>(null);

  const hasValue = (value: string | null | undefined) =>
    Boolean(value && value.trim().length > 0);

  function updateAnsweredField(field: keyof FormState, value: string) {
    setAnsweredFields((prev) => {
      const next = new Set(prev);
      if (value.trim()) next.add(field);
      else next.delete(field);
      return next;
    });
  }

  function markFieldEditing(field: keyof FormState) {
    setTypingField(field);
  }

  function commitAnsweredField(field: keyof FormState, value: string) {
    setTypingField((current) => (current === field ? null : current));
    updateAnsweredField(field, value);
  }

  function handleFieldChange(field: keyof FormState, value: string) {
    set(field, value);
    markFieldEditing(field);
  }

  function handleFieldBlur(field: keyof FormState, value: string) {
    commitAnsweredField(field, value);
  }

  function isPrefilled(field: keyof FormState) {
    return isLocked || prefilled.has(field);
  }

  function isAnsweredField(field: keyof FormState) {
    return isPrefilled(field) || answeredFields.has(field);
  }

  function isTypingField(field: keyof FormState) {
    return typingField === field;
  }

  useEffect(() => {
    fetch(`/api/onboarding/${token}`)
      .then((r) => r.json())
      .then((res) => {
        if (!res.success) return setPageState("invalid");
        const d: LeadData = res.data;
        setLead(d);

        const filled = new Set<keyof FormState>();
        const check = <K extends keyof FormState>(key: K, value: unknown) => {
          if (value) filled.add(key);
        };
        check("birthDate", d.birthDate);
        check("email", d.email);
        check("phone", d.phone);
        check("cpf", d.cpf);
        check("addressZip", d.addressZip);
        check("addressStreet", d.addressStreet);
        check("addressNumber", d.addressNumber);
        check("addressComplement", d.addressComplement);
        check("addressNeighborhood", d.addressNeighborhood);
        check("addressCity", d.addressCity);
        check("addressState", d.addressState);
        check("identityDocument", d.identityDocument);
        check("civilStatus", d.civilStatus);
        check("profession", d.profession);
        check("valorDivida", d.valorDivida);
        check("objetivo", d.objetivo);
        check("responsibleName", d.responsibleName);
        check("responsibleCpf", d.responsibleCpf);
        setPrefilled(filled);

        setForm((prev) => ({
          ...prev,
          birthDate: d.birthDate
            ? new Date(d.birthDate).toLocaleDateString("pt-BR")
            : "",
          email: d.email ?? "",
          phone: d.phone ? formatPhone(d.phone) : "",
          cpf: d.cpf ? formatCpf(d.cpf) : "",
          addressZip: d.addressZip ? formatCep(d.addressZip) : "",
          addressStreet: d.addressStreet ?? "",
          addressNumber: d.addressNumber ?? "",
          addressComplement: d.addressComplement ?? "",
          addressNeighborhood: d.addressNeighborhood ?? "",
          addressCity: d.addressCity ?? "",
          addressState: d.addressState ?? "",
          identityDocument: d.identityDocument
            ? formatIdentityDocument(d.identityDocument)
            : "",
          civilStatus: d.civilStatus ?? "",
          profession: d.profession ?? "",
          valorDivida: d.valorDivida ?? "",
          objetivo: d.objetivo ?? "",
          responsibleName: d.responsibleName ?? "",
          responsibleCpf: d.responsibleCpf ? formatCpf(d.responsibleCpf) : "",
        }));
        setAnsweredFields(new Set(filled));
        setTypingField(null);
        setPageState("form");
        // registra que o cliente abriu a página
        fetch('/api/onboarding/ping', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        }).catch(() => {})
      })
      .catch(() => setPageState("invalid"));
  }, [token]);

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function fetchCep(cep: string) {
    const digits = cep.replace(/\D/g, "");
    if (digits.length !== 8) return;
    setZipLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setForm((prev) => ({
          ...prev,
          addressStreet: data.logradouro || prev.addressStreet,
          addressNeighborhood: data.bairro || prev.addressNeighborhood,
          addressCity: data.localidade || prev.addressCity,
          addressState: data.uf || prev.addressState,
        }));
        updateAnsweredField("addressStreet", data.logradouro || "");
        updateAnsweredField("addressNeighborhood", data.bairro || "");
        updateAnsweredField("addressCity", data.localidade || "");
        updateAnsweredField("addressState", data.uf || "");
      }
    } catch {
      // silently ignore
    } finally {
      setZipLoading(false);
    }
  }

  function validate(): boolean {
    const errs: FieldErrors = {};
    if (!form.birthDate) errs.birthDate = "Obrigatório";
    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    )
      errs.email = "E-mail inválido";
    const phoneDigits = normalizeBrazilPhone(form.phone)?.length ?? 0;
    if (form.phone.trim() && ![10, 11].includes(phoneDigits))
      errs.phone = "Telefone inválido";
    if (form.cpf.trim() && form.cpf.replace(/\D/g, "").length !== 11)
      errs.cpf = "CPF inválido";
    if (!form.addressZip || form.addressZip.replace(/\D/g, "").length !== 8)
      errs.addressZip = "CEP inválido";
    if (!form.addressStreet) errs.addressStreet = "Obrigatório";
    if (!form.addressNumber) errs.addressNumber = "Obrigatório";
    if (!form.addressNeighborhood) errs.addressNeighborhood = "Obrigatório";
    if (!form.addressCity) errs.addressCity = "Obrigatório";
    if (!form.addressState) errs.addressState = "Obrigatório";
    if (!form.identityDocument) errs.identityDocument = "Obrigatório";
    if (!form.civilStatus) errs.civilStatus = "Obrigatório";
    if (!form.profession) errs.profession = "Obrigatório";
    if (!form.valorDivida) errs.valorDivida = "Obrigatório";
    if (!form.objetivo) errs.objetivo = "Obrigatório";
    if (lead?.leadType === "cnpj") {
      if (!form.responsibleName) errs.responsibleName = "Obrigatório";
      if (
        !form.responsibleCpf ||
        form.responsibleCpf.replace(/\D/g, "").length !== 11
      )
        errs.responsibleCpf = "CPF inválido";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function savePartial() {
    try {
      await fetch("/api/onboarding/save-partial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          birthDate: parseDateToISO(form.birthDate) || undefined,
          email: form.email || undefined,
          phone:
            normalizeBrazilPhone(form.phone) ??
            (form.phone.replace(/\D/g, "") || undefined),
          cpf: form.cpf.replace(/\D/g, "") || undefined,
          addressZip: form.addressZip.replace(/\D/g, "") || undefined,
          addressStreet: form.addressStreet || undefined,
          addressNumber: form.addressNumber || undefined,
          addressComplement: form.addressComplement || undefined,
          addressNeighborhood: form.addressNeighborhood || undefined,
          addressCity: form.addressCity || undefined,
          addressState: form.addressState || undefined,
          identityDocument: form.identityDocument || undefined,
          civilStatus: form.civilStatus || undefined,
          profession: form.profession || undefined,
          valorDivida: form.valorDivida || undefined,
          objetivo: form.objetivo || undefined,
          responsibleName: form.responsibleName || undefined,
          responsibleCpf: form.responsibleCpf.replace(/\D/g, "") || undefined,
        }),
      });
    } catch {
      // silently ignore — partial save is best-effort
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      savePartial();
      setPartialSaveAlert(true);
      return;
    }
    setPartialSaveAlert(false);
    setPageState("confirm");
  }

  async function handleConfirmedSubmit() {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          birthDate: parseDateToISO(form.birthDate),
          email: form.email || undefined,
          phone:
            normalizeBrazilPhone(form.phone) ?? form.phone.replace(/\D/g, ""),
          cpf: form.cpf.replace(/\D/g, "") || undefined,
          addressZip: form.addressZip.replace(/\D/g, ""),
          addressStreet: form.addressStreet,
          addressNumber: form.addressNumber,
          addressComplement: form.addressComplement || undefined,
          addressNeighborhood: form.addressNeighborhood,
          addressCity: form.addressCity,
          addressState: form.addressState,
          identityDocument: form.identityDocument,
          civilStatus: form.civilStatus,
          profession: form.profession,
          valorDivida: form.valorDivida || undefined,
          objetivo: form.objetivo,
          responsibleName: form.responsibleName || undefined,
          responsibleCpf: form.responsibleCpf.replace(/\D/g, "") || undefined,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setSubmitError(data.error ?? "Erro ao enviar. Tente novamente.");
        return;
      }
      setPageState("completed");
      const slug = data.processSlug;
      setTimeout(() => {
        window.location.href = slug ? `/api/processo/${slug}` : "/meuprocesso";
      }, 5000);
    } catch {
      setSubmitError("Erro de conexão. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Render states ────────────────────────────────────────────────────────

  if (pageState === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-neutral-100">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-navy border-t-transparent" />
      </div>
    );
  }

  if (pageState === "invalid") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-neutral-100 px-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h1 className="font-dm text-h2 text-brand-navy text-center">
          Link inválido ou expirado
        </h1>
        <p className="text-sm text-foreground-alt text-center max-w-sm">
          Este link não é mais válido. Entre em contato com nossa equipe pelo
          WhatsApp para obter um novo link.
        </p>
        <a
          href="https://wa.me/5515992377755"
          target="_blank"
          rel="noreferrer"
          className="btn-secondary h-11 rounded-md px-6 text-sm font-semibold inline-flex items-center"
        >
          Falar com a equipe
        </a>
      </div>
    );
  }

  if (pageState === "confirm") {
    return (
      <div className="min-h-screen bg-neutral-100 py-12">
        <div className="mx-auto w-full max-w-[480px] px-4">
          <div className="flex flex-col items-center gap-6 rounded-xl bg-white p-8 shadow-sm text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/10">
              <TriangleAlert className="h-8 w-8 text-brand-orange" />
            </div>
            <div>
              <h1 className="font-dm text-h2 text-brand-navy">Confirmar envio</h1>
              <p className="mt-2 text-sm text-foreground-alt">
                Ao prosseguir, seus dados não poderão ser editados novamente, pois vamos enviá-los para a execução do processo.
              </p>
            </div>
            {submitError && (
              <p className="w-full rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive text-center">
                {submitError}
              </p>
            )}
            <div className="flex w-full flex-col gap-3">
              <button
                type="button"
                onClick={() => setPageState("form")}
                className="btn-secondary w-full !rounded-md text-sm font-semibold"
              >
                Voltar e verificar dados
              </button>
              <button
                type="button"
                onClick={handleConfirmedSubmit}
                disabled={submitting}
                className="btn-primary w-full !rounded-md text-sm font-semibold disabled:opacity-50"
              >
                {submitting ? "Enviando..." : "Dados confirmados, enviar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (pageState === "completed") {
    return (
      <div className="min-h-screen bg-neutral-100 py-12">
        <div className="mx-auto w-full max-w-[480px] px-4">
          <div className="flex flex-col items-center gap-6 rounded-xl bg-white p-8 shadow-sm text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-green-600">
                <path
                  d="M4 12l5 5L20 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h1 className="font-dm text-h2 text-brand-navy">Dados recebidos!</h1>
              <p className="mt-2 text-sm text-foreground-alt">
                Seus dados foram enviados com sucesso para iniciar a análise do caso. Em instantes você será direcionado para a página de acompanhamento do processo.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-foreground-alt">
              <div className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-brand-border border-t-brand-orange" />
              Aguarde...
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isCnpj = lead?.leadType === "cnpj";
  const firstName = lead?.name ?? "você";
  const isLocked = lead?.isLocked ?? false;

  const hasVal = (v: string) => v.trim().length > 0;

  const sectionComplete = {
    contato: hasVal(form.email) && hasVal(form.phone) && hasVal(form.cpf),
    dados:
      hasVal(form.birthDate) &&
      hasVal(form.identityDocument) &&
      hasVal(form.civilStatus) &&
      hasVal(form.profession),
    endereco:
      hasVal(form.addressZip) &&
      hasVal(form.addressStreet) &&
      hasVal(form.addressNumber) &&
      hasVal(form.addressNeighborhood) &&
      hasVal(form.addressCity) &&
      hasVal(form.addressState),
    financeiro: hasVal(form.valorDivida) && hasVal(form.objetivo),
  };

  function SectionHeader({
    title,
    complete,
  }: {
    title: string;
    complete: boolean;
  }) {
    return (
      <AccordionTrigger className="flex w-full items-center justify-between py-5 hover:no-underline [&>svg]:text-brand-navy/40 [&[data-state=open]>svg]:rotate-180">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${complete ? "bg-[#4B9857]" : "bg-brand-orange"}`}
          >
            {complete ? (
              <Check className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
            ) : (
              <TriangleAlert
                className="h-3.5 w-3.5 text-white"
                strokeWidth={2.5}
              />
            )}
          </span>
          <div className="flex flex-col items-start">
            <span
              className={`text-xs font-semibold uppercase tracking-wide ${complete ? "text-[#4B9857]" : "text-brand-orange"}`}
            >
              {title}
            </span>
            <span className="text-label mt-0.5 text-brand-navy/55">
              {complete ? "Dados completos" : "Dados incompletos"}
            </span>
          </div>
        </div>
      </AccordionTrigger>
    );
  }
  const acquisitionLabel = formatAcquisitionLabel(
    lead?.acquisition,
    lead?.leadType,
  );
  const acquisitionTimestamp = lead?.paymentConfirmedAt ?? lead?.convertedAt;
  const acquisitionDate = acquisitionTimestamp
    ? new Date(acquisitionTimestamp).toLocaleDateString("pt-BR")
    : "Não informado";

  return (
    <div className="min-h-screen bg-neutral-100 py-8 md:py-12">
      <div className="mx-auto w-full max-w-[560px] px-4">
        {/* Saudação */}
        <div className="mb-6">
          <h1 className="font-dm text-h2 text-brand-navy">Olá, {firstName}!</h1>
          <p className="mt-6 text-sm leading-[18px] text-foreground-alt">
            É importante que todos os dados estejam preenchidos e corretos, pois
            usaremos estes dados para montar o processo jurídico e enviar para o
            tribunal.
          </p>
        </div>

        <div className="mb-6 rounded-lg bg-white p-5 shadow-sm">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-navy/60">
            Seu serviço contratado
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs text-foreground-alt">Serviço adquirido</p>
              <p className="mt-1 text-sm font-medium text-brand-navy">
                {acquisitionLabel}
              </p>
            </div>
            <div>
              <p className="text-xs text-foreground-alt">Data da aquisição</p>
              <p className="mt-1 text-sm font-medium text-brand-navy">
                {acquisitionDate}
              </p>
            </div>
          </div>
          {lead?.processSlug && lead?.onboardingCompletedAt && (
            <div className="mt-4">
              <a
                href={`/api/processo/${lead.processSlug}`}
                className="flex items-center gap-2 rounded-md border border-brand-navy/20 bg-brand-navy/5 px-3 py-2 text-xs text-brand-navy transition-colors hover:bg-brand-navy/10"
              >
                <FileText className="h-3.5 w-3.5 shrink-0 text-brand-navy" />
                <span className="flex-1 font-medium">Acompanhar meu processo</span>
              </a>
            </div>
          )}
        </div>

        {isLocked ? (
          <div className="mb-6 rounded-lg border border-brand-border bg-white px-5 py-4">
            <p className="text-sm font-semibold text-brand-navy">Dados em análise</p>
            <p className="mt-1 text-sm text-foreground-alt">
              Seu processo já está em execução. Os dados não podem mais ser alterados.
            </p>
          </div>
        ) : (
          <p className="mb-6 text-sm leading-[18px] text-foreground-alt">
            Os campos em{" "}
            <span className="font-medium text-brand-orange">laranja</span> são
            informações que ainda precisamos.
            <br />
            Os <span className="font-medium text-green-600">verdes</span> já estão
            preenchidos, mas verifique antes de enviar.
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4"
        >
          <Accordion
            type="multiple"
            defaultValue={["contato", "dados", "endereco", "financeiro"]}
            className="flex flex-col gap-4"
          >
            <AccordionItem
              value="contato"
              className="rounded-lg bg-white shadow-sm border-none"
            >
              <div className="px-6">
                <SectionHeader
                  title="Contato e processo"
                  complete={sectionComplete.contato}
                />
              </div>
              <AccordionContent className="px-6 pb-6 pt-0 flex flex-col gap-4">
                <Field label="E-mail" error={errors.email}>
                  {isPrefilled("email") ? (
                    <PrefilledWrapper>
                      <Input type="email" value={form.email} prefilled />
                    </PrefilledWrapper>
                  ) : isTypingField("email") ? (
                    <PendingWrapper>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        value={form.email}
                        onChange={(e) =>
                          handleFieldChange("email", e.target.value)
                        }
                        onBlur={(e) =>
                          handleFieldBlur("email", e.currentTarget.value)
                        }
                        error={errors.email}
                        answered={false}
                        pending={!errors.email}
                      />
                    </PendingWrapper>
                  ) : isAnsweredField("email") ? (
                    <AnsweredWrapper>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        value={form.email}
                        onChange={(e) =>
                          handleFieldChange("email", e.target.value)
                        }
                        onBlur={(e) =>
                          handleFieldBlur("email", e.currentTarget.value)
                        }
                        error={errors.email}
                        answered
                      />
                    </AnsweredWrapper>
                  ) : (
                    <PendingWrapper>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        value={form.email}
                        onChange={(e) =>
                          handleFieldChange("email", e.target.value)
                        }
                        onBlur={(e) =>
                          handleFieldBlur("email", e.currentTarget.value)
                        }
                        error={errors.email}
                        pending={!errors.email}
                      />
                    </PendingWrapper>
                  )}
                </Field>

                <Field label="Telefone" error={errors.phone}>
                  {isPrefilled("phone") ? (
                    <PrefilledWrapper>
                      <Input type="tel" value={form.phone} prefilled />
                    </PrefilledWrapper>
                  ) : isTypingField("phone") ? (
                    <PendingWrapper>
                      <Input
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={form.phone}
                        onChange={(e) =>
                          handleFieldChange(
                            "phone",
                            formatPhone(e.target.value),
                          )
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "phone",
                            formatPhone(e.currentTarget.value),
                          )
                        }
                        error={errors.phone}
                        inputMode="tel"
                        pending={!errors.phone}
                      />
                    </PendingWrapper>
                  ) : isAnsweredField("phone") ? (
                    <AnsweredWrapper>
                      <Input
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={form.phone}
                        onChange={(e) =>
                          handleFieldChange(
                            "phone",
                            formatPhone(e.target.value),
                          )
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "phone",
                            formatPhone(e.currentTarget.value),
                          )
                        }
                        error={errors.phone}
                        inputMode="tel"
                        answered
                      />
                    </AnsweredWrapper>
                  ) : (
                    <PendingWrapper>
                      <Input
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={form.phone}
                        onChange={(e) =>
                          handleFieldChange(
                            "phone",
                            formatPhone(e.target.value),
                          )
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "phone",
                            formatPhone(e.currentTarget.value),
                          )
                        }
                        error={errors.phone}
                        inputMode="tel"
                        pending={!errors.phone}
                      />
                    </PendingWrapper>
                  )}
                </Field>

                <Field label="CPF do processo" error={errors.cpf}>
                  {isPrefilled("cpf") ? (
                    <PrefilledWrapper>
                      <Input type="text" value={form.cpf} prefilled />
                    </PrefilledWrapper>
                  ) : isTypingField("cpf") ? (
                    <PendingWrapper>
                      <Input
                        type="text"
                        placeholder="000.000.000-00"
                        value={form.cpf}
                        onChange={(e) =>
                          handleFieldChange("cpf", formatCpf(e.target.value))
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "cpf",
                            formatCpf(e.currentTarget.value),
                          )
                        }
                        error={errors.cpf}
                        inputMode="numeric"
                        pending={!errors.cpf}
                      />
                    </PendingWrapper>
                  ) : isAnsweredField("cpf") ? (
                    <AnsweredWrapper>
                      <Input
                        type="text"
                        placeholder="000.000.000-00"
                        value={form.cpf}
                        onChange={(e) =>
                          handleFieldChange("cpf", formatCpf(e.target.value))
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "cpf",
                            formatCpf(e.currentTarget.value),
                          )
                        }
                        error={errors.cpf}
                        inputMode="numeric"
                        answered
                      />
                    </AnsweredWrapper>
                  ) : (
                    <PendingWrapper>
                      <Input
                        type="text"
                        placeholder="000.000.000-00"
                        value={form.cpf}
                        onChange={(e) =>
                          handleFieldChange("cpf", formatCpf(e.target.value))
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "cpf",
                            formatCpf(e.currentTarget.value),
                          )
                        }
                        error={errors.cpf}
                        inputMode="numeric"
                        pending={!errors.cpf}
                      />
                    </PendingWrapper>
                  )}
                </Field>
              </AccordionContent>
            </AccordionItem>

            {/* Dados pessoais */}
            <AccordionItem
              value="dados"
              className="rounded-lg bg-white shadow-sm border-none"
            >
              <div className="px-6">
                <SectionHeader
                  title="Dados pessoais"
                  complete={sectionComplete.dados}
                />
              </div>
              <AccordionContent className="px-6 pb-6 pt-0 flex flex-col gap-4">
                <Field
                  label="Data de nascimento"
                  error={errors.birthDate}
                  required
                >
                  {isPrefilled("birthDate") ? (
                    <PrefilledWrapper>
                      <Input type="text" value={form.birthDate} prefilled />
                    </PrefilledWrapper>
                  ) : isTypingField("birthDate") ? (
                    <PendingWrapper>
                      <Input
                        type="text"
                        placeholder="DD/MM/AAAA"
                        value={form.birthDate}
                        onChange={(e) =>
                          handleFieldChange(
                            "birthDate",
                            formatDate(e.target.value),
                          )
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "birthDate",
                            formatDate(e.currentTarget.value),
                          )
                        }
                        error={errors.birthDate}
                        inputMode="numeric"
                        pending={!errors.birthDate}
                      />
                    </PendingWrapper>
                  ) : isAnsweredField("birthDate") ? (
                    <AnsweredWrapper>
                      <Input
                        type="text"
                        placeholder="DD/MM/AAAA"
                        value={form.birthDate}
                        onChange={(e) =>
                          handleFieldChange(
                            "birthDate",
                            formatDate(e.target.value),
                          )
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "birthDate",
                            formatDate(e.currentTarget.value),
                          )
                        }
                        error={errors.birthDate}
                        inputMode="numeric"
                        answered
                      />
                    </AnsweredWrapper>
                  ) : (
                    <PendingWrapper>
                      <Input
                        type="text"
                        placeholder="DD/MM/AAAA"
                        value={form.birthDate}
                        onChange={(e) =>
                          handleFieldChange(
                            "birthDate",
                            formatDate(e.target.value),
                          )
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "birthDate",
                            formatDate(e.currentTarget.value),
                          )
                        }
                        error={errors.birthDate}
                        inputMode="numeric"
                        pending={!errors.birthDate}
                      />
                    </PendingWrapper>
                  )}
                </Field>

                <Field
                  label="RG ou CNH (número)"
                  error={errors.identityDocument}
                  required
                >
                  {isPrefilled("identityDocument") ? (
                    <PrefilledWrapper>
                      <Input
                        type="text"
                        value={form.identityDocument}
                        prefilled
                      />
                    </PrefilledWrapper>
                  ) : isTypingField("identityDocument") ? (
                    <PendingWrapper>
                      <Input
                        type="text"
                        placeholder="Ex: 12.345.678-9"
                        value={form.identityDocument}
                        onChange={(e) =>
                          handleFieldChange(
                            "identityDocument",
                            formatIdentityDocument(e.target.value),
                          )
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "identityDocument",
                            formatIdentityDocument(e.currentTarget.value),
                          )
                        }
                        error={errors.identityDocument}
                        pending={!errors.identityDocument}
                      />
                    </PendingWrapper>
                  ) : isAnsweredField("identityDocument") ? (
                    <AnsweredWrapper>
                      <Input
                        type="text"
                        placeholder="Ex: 12.345.678-9"
                        value={form.identityDocument}
                        onChange={(e) =>
                          handleFieldChange(
                            "identityDocument",
                            formatIdentityDocument(e.target.value),
                          )
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "identityDocument",
                            formatIdentityDocument(e.currentTarget.value),
                          )
                        }
                        error={errors.identityDocument}
                        answered
                      />
                    </AnsweredWrapper>
                  ) : (
                    <PendingWrapper>
                      <Input
                        type="text"
                        placeholder="Ex: 12.345.678-9"
                        value={form.identityDocument}
                        onChange={(e) =>
                          handleFieldChange(
                            "identityDocument",
                            formatIdentityDocument(e.target.value),
                          )
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "identityDocument",
                            formatIdentityDocument(e.currentTarget.value),
                          )
                        }
                        error={errors.identityDocument}
                        pending={!errors.identityDocument}
                      />
                    </PendingWrapper>
                  )}
                </Field>

                <Field label="Estado civil" error={errors.civilStatus} required>
                  {isPrefilled("civilStatus") ? (
                    <PrefilledWrapper>
                      <Select value={form.civilStatus} disabled>
                        <SelectTrigger
                          className="h-11 border-success bg-neutral-50 text-brand-navy/60 pl-9 cursor-default"
                          data-radix-select-trigger
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                          <SelectItem value="casado">Casado(a)</SelectItem>
                          <SelectItem value="divorciado">
                            Divorciado(a)
                          </SelectItem>
                          <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                          <SelectItem value="uniao_estavel">
                            União estável
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </PrefilledWrapper>
                  ) : hasValue(form.civilStatus) ? (
                    <AnsweredWrapper>
                      <Select
                        value={form.civilStatus}
                        onValueChange={(v) => set("civilStatus", v)}
                      >
                        <SelectTriggerState
                          answered
                          error={!!errors.civilStatus}
                        >
                          <SelectValue placeholder="Selecione" />
                        </SelectTriggerState>
                        <SelectContent>
                          <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                          <SelectItem value="casado">Casado(a)</SelectItem>
                          <SelectItem value="divorciado">
                            Divorciado(a)
                          </SelectItem>
                          <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                          <SelectItem value="uniao_estavel">
                            União estável
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </AnsweredWrapper>
                  ) : (
                    <PendingWrapper>
                      <Select
                        value={form.civilStatus}
                        onValueChange={(v) => set("civilStatus", v)}
                      >
                        <SelectTrigger
                          className={`h-11 pl-9 ${errors.civilStatus ? "border-destructive" : "border-dashed border-brand-orange/50"}`}
                        >
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                          <SelectItem value="casado">Casado(a)</SelectItem>
                          <SelectItem value="divorciado">
                            Divorciado(a)
                          </SelectItem>
                          <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                          <SelectItem value="uniao_estavel">
                            União estável
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </PendingWrapper>
                  )}
                  {errors.civilStatus && (
                    <p className="text-txt-xs text-destructive">
                      {errors.civilStatus}
                    </p>
                  )}
                </Field>

                <Field label="Profissão" error={errors.profession} required>
                  {isPrefilled("profession") ? (
                    <PrefilledWrapper>
                      <Input type="text" value={form.profession} prefilled />
                    </PrefilledWrapper>
                  ) : isTypingField("profession") ? (
                    <PendingWrapper>
                      <Input
                        type="text"
                        placeholder="Ex: Autônomo"
                        value={form.profession}
                        onChange={(e) =>
                          handleFieldChange("profession", e.target.value)
                        }
                        onBlur={(e) =>
                          handleFieldBlur("profession", e.currentTarget.value)
                        }
                        error={errors.profession}
                        pending={!errors.profession}
                      />
                    </PendingWrapper>
                  ) : isAnsweredField("profession") ? (
                    <AnsweredWrapper>
                      <Input
                        type="text"
                        placeholder="Ex: Autônomo"
                        value={form.profession}
                        onChange={(e) =>
                          handleFieldChange("profession", e.target.value)
                        }
                        onBlur={(e) =>
                          handleFieldBlur("profession", e.currentTarget.value)
                        }
                        error={errors.profession}
                        answered
                      />
                    </AnsweredWrapper>
                  ) : (
                    <PendingWrapper>
                      <Input
                        type="text"
                        placeholder="Ex: Autônomo"
                        value={form.profession}
                        onChange={(e) =>
                          handleFieldChange("profession", e.target.value)
                        }
                        onBlur={(e) =>
                          handleFieldBlur("profession", e.currentTarget.value)
                        }
                        error={errors.profession}
                        pending={!errors.profession}
                      />
                    </PendingWrapper>
                  )}
                </Field>
              </AccordionContent>
            </AccordionItem>

            {/* Endereço */}
            <AccordionItem
              value="endereco"
              className="rounded-lg bg-white shadow-sm border-none"
            >
              <div className="px-6">
                <SectionHeader
                  title="Endereço"
                  complete={sectionComplete.endereco}
                />
              </div>
              <AccordionContent className="px-6 pb-6 pt-0 flex flex-col gap-4">
                <Field label="CEP" error={errors.addressZip} required>
                  {isPrefilled("addressZip") ? (
                    <PrefilledWrapper>
                      <Input type="text" value={form.addressZip} prefilled />
                    </PrefilledWrapper>
                  ) : isTypingField("addressZip") ? (
                    <PendingWrapper>
                      <Input
                        type="text"
                        placeholder="00000-000"
                        value={form.addressZip}
                        onChange={(e) => {
                          const v = formatCep(e.target.value);
                          handleFieldChange("addressZip", v);
                          if (v.replace(/\D/g, "").length === 8) fetchCep(v);
                        }}
                        onBlur={(e) =>
                          handleFieldBlur(
                            "addressZip",
                            formatCep(e.currentTarget.value),
                          )
                        }
                        error={errors.addressZip}
                        inputMode="numeric"
                        pending={!errors.addressZip}
                      />
                    </PendingWrapper>
                  ) : isAnsweredField("addressZip") ? (
                    <AnsweredWrapper>
                      <Input
                        type="text"
                        placeholder="00000-000"
                        value={form.addressZip}
                        onChange={(e) => {
                          const v = formatCep(e.target.value);
                          handleFieldChange("addressZip", v);
                          if (v.replace(/\D/g, "").length === 8) fetchCep(v);
                        }}
                        onBlur={(e) =>
                          handleFieldBlur(
                            "addressZip",
                            formatCep(e.currentTarget.value),
                          )
                        }
                        error={errors.addressZip}
                        inputMode="numeric"
                        answered
                      />
                    </AnsweredWrapper>
                  ) : (
                    <PendingWrapper>
                      <Input
                        type="text"
                        placeholder="00000-000"
                        value={form.addressZip}
                        onChange={(e) => {
                          const v = formatCep(e.target.value);
                          handleFieldChange("addressZip", v);
                          if (v.replace(/\D/g, "").length === 8) fetchCep(v);
                        }}
                        onBlur={(e) =>
                          handleFieldBlur(
                            "addressZip",
                            formatCep(e.currentTarget.value),
                          )
                        }
                        error={errors.addressZip}
                        inputMode="numeric"
                        pending={!errors.addressZip}
                      />
                    </PendingWrapper>
                  )}
                </Field>

                <Field label="Logradouro" error={errors.addressStreet} required>
                  {isPrefilled("addressStreet") ? (
                    <PrefilledWrapper>
                      <Input type="text" value={form.addressStreet} prefilled />
                    </PrefilledWrapper>
                  ) : isTypingField("addressStreet") ? (
                    <PendingWrapper>
                      <Input
                        type="text"
                        placeholder={
                          zipLoading ? "Buscando..." : "Rua, Av., etc."
                        }
                        value={form.addressStreet}
                        onChange={(e) =>
                          handleFieldChange("addressStreet", e.target.value)
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "addressStreet",
                            e.currentTarget.value,
                          )
                        }
                        error={errors.addressStreet}
                        disabled={zipLoading}
                        pending={!errors.addressStreet && !zipLoading}
                      />
                    </PendingWrapper>
                  ) : isAnsweredField("addressStreet") ? (
                    <AnsweredWrapper>
                      <Input
                        type="text"
                        placeholder={
                          zipLoading ? "Buscando..." : "Rua, Av., etc."
                        }
                        value={form.addressStreet}
                        onChange={(e) =>
                          handleFieldChange("addressStreet", e.target.value)
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "addressStreet",
                            e.currentTarget.value,
                          )
                        }
                        error={errors.addressStreet}
                        disabled={zipLoading}
                        answered
                      />
                    </AnsweredWrapper>
                  ) : (
                    <PendingWrapper>
                      <Input
                        type="text"
                        placeholder={
                          zipLoading ? "Buscando..." : "Rua, Av., etc."
                        }
                        value={form.addressStreet}
                        onChange={(e) =>
                          handleFieldChange("addressStreet", e.target.value)
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "addressStreet",
                            e.currentTarget.value,
                          )
                        }
                        error={errors.addressStreet}
                        disabled={zipLoading}
                        pending={!errors.addressStreet && !zipLoading}
                      />
                    </PendingWrapper>
                  )}
                </Field>

                <Field label="Número" error={errors.addressNumber} required>
                  {isPrefilled("addressNumber") ? (
                    <PrefilledWrapper>
                      <Input type="text" value={form.addressNumber} prefilled />
                    </PrefilledWrapper>
                  ) : isTypingField("addressNumber") ? (
                    <PendingWrapper>
                      <Input
                        type="text"
                        placeholder="Ex: 123"
                        value={form.addressNumber}
                        onChange={(e) =>
                          handleFieldChange("addressNumber", e.target.value)
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "addressNumber",
                            e.currentTarget.value,
                          )
                        }
                        error={errors.addressNumber}
                        pending={!errors.addressNumber}
                      />
                    </PendingWrapper>
                  ) : isAnsweredField("addressNumber") ? (
                    <AnsweredWrapper>
                      <Input
                        type="text"
                        placeholder="Ex: 123"
                        value={form.addressNumber}
                        onChange={(e) =>
                          handleFieldChange("addressNumber", e.target.value)
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "addressNumber",
                            e.currentTarget.value,
                          )
                        }
                        error={errors.addressNumber}
                        answered
                      />
                    </AnsweredWrapper>
                  ) : (
                    <PendingWrapper>
                      <Input
                        type="text"
                        placeholder="Ex: 123"
                        value={form.addressNumber}
                        onChange={(e) =>
                          handleFieldChange("addressNumber", e.target.value)
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "addressNumber",
                            e.currentTarget.value,
                          )
                        }
                        error={errors.addressNumber}
                        pending={!errors.addressNumber}
                      />
                    </PendingWrapper>
                  )}
                </Field>

                <Field
                  label="Bairro"
                  error={errors.addressNeighborhood}
                  required
                >
                  {isPrefilled("addressNeighborhood") ? (
                    <PrefilledWrapper>
                      <Input
                        type="text"
                        value={form.addressNeighborhood}
                        prefilled
                      />
                    </PrefilledWrapper>
                  ) : isTypingField("addressNeighborhood") ? (
                    <PendingWrapper>
                      <Input
                        type="text"
                        placeholder="Bairro"
                        value={form.addressNeighborhood}
                        onChange={(e) =>
                          handleFieldChange(
                            "addressNeighborhood",
                            e.target.value,
                          )
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "addressNeighborhood",
                            e.currentTarget.value,
                          )
                        }
                        error={errors.addressNeighborhood}
                        disabled={zipLoading}
                        pending={!errors.addressNeighborhood && !zipLoading}
                      />
                    </PendingWrapper>
                  ) : isAnsweredField("addressNeighborhood") ? (
                    <AnsweredWrapper>
                      <Input
                        type="text"
                        placeholder="Bairro"
                        value={form.addressNeighborhood}
                        onChange={(e) =>
                          handleFieldChange(
                            "addressNeighborhood",
                            e.target.value,
                          )
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "addressNeighborhood",
                            e.currentTarget.value,
                          )
                        }
                        error={errors.addressNeighborhood}
                        disabled={zipLoading}
                        answered
                      />
                    </AnsweredWrapper>
                  ) : (
                    <PendingWrapper>
                      <Input
                        type="text"
                        placeholder="Bairro"
                        value={form.addressNeighborhood}
                        onChange={(e) =>
                          handleFieldChange(
                            "addressNeighborhood",
                            e.target.value,
                          )
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "addressNeighborhood",
                            e.currentTarget.value,
                          )
                        }
                        error={errors.addressNeighborhood}
                        disabled={zipLoading}
                        pending={!errors.addressNeighborhood && !zipLoading}
                      />
                    </PendingWrapper>
                  )}
                </Field>

                <Field label="Complemento">
                  {isPrefilled("addressComplement") ? (
                    <PrefilledWrapper>
                      <Input
                        type="text"
                        value={form.addressComplement}
                        prefilled
                      />
                    </PrefilledWrapper>
                  ) : isTypingField("addressComplement") ? (
                    <PendingWrapper>
                      <Input
                        type="text"
                        placeholder="Apto, bloco..."
                        value={form.addressComplement}
                        onChange={(e) =>
                          handleFieldChange("addressComplement", e.target.value)
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "addressComplement",
                            e.currentTarget.value,
                          )
                        }
                        pending
                      />
                    </PendingWrapper>
                  ) : isAnsweredField("addressComplement") ? (
                    <AnsweredWrapper>
                      <Input
                        type="text"
                        placeholder="Apto, bloco..."
                        value={form.addressComplement}
                        onChange={(e) =>
                          handleFieldChange("addressComplement", e.target.value)
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "addressComplement",
                            e.currentTarget.value,
                          )
                        }
                        answered
                      />
                    </AnsweredWrapper>
                  ) : (
                    <PendingWrapper>
                      <Input
                        type="text"
                        placeholder="Apto, bloco..."
                        value={form.addressComplement}
                        onChange={(e) =>
                          handleFieldChange("addressComplement", e.target.value)
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "addressComplement",
                            e.currentTarget.value,
                          )
                        }
                        pending
                      />
                    </PendingWrapper>
                  )}
                </Field>

                <Field label="Cidade" error={errors.addressCity} required>
                  {isPrefilled("addressCity") ? (
                    <PrefilledWrapper>
                      <Input type="text" value={form.addressCity} prefilled />
                    </PrefilledWrapper>
                  ) : isTypingField("addressCity") ? (
                    <PendingWrapper>
                      <Input
                        type="text"
                        placeholder="Cidade"
                        value={form.addressCity}
                        onChange={(e) =>
                          handleFieldChange("addressCity", e.target.value)
                        }
                        onBlur={(e) =>
                          handleFieldBlur("addressCity", e.currentTarget.value)
                        }
                        error={errors.addressCity}
                        disabled={zipLoading}
                        pending={!errors.addressCity && !zipLoading}
                      />
                    </PendingWrapper>
                  ) : isAnsweredField("addressCity") ? (
                    <AnsweredWrapper>
                      <Input
                        type="text"
                        placeholder="Cidade"
                        value={form.addressCity}
                        onChange={(e) =>
                          handleFieldChange("addressCity", e.target.value)
                        }
                        onBlur={(e) =>
                          handleFieldBlur("addressCity", e.currentTarget.value)
                        }
                        error={errors.addressCity}
                        disabled={zipLoading}
                        answered
                      />
                    </AnsweredWrapper>
                  ) : (
                    <PendingWrapper>
                      <Input
                        type="text"
                        placeholder="Cidade"
                        value={form.addressCity}
                        onChange={(e) =>
                          handleFieldChange("addressCity", e.target.value)
                        }
                        onBlur={(e) =>
                          handleFieldBlur("addressCity", e.currentTarget.value)
                        }
                        error={errors.addressCity}
                        disabled={zipLoading}
                        pending={!errors.addressCity && !zipLoading}
                      />
                    </PendingWrapper>
                  )}
                </Field>

                <Field label="Estado" error={errors.addressState} required>
                  {isPrefilled("addressState") ? (
                    <PrefilledWrapper>
                      <Input type="text" value={form.addressState} prefilled />
                    </PrefilledWrapper>
                  ) : isTypingField("addressState") ? (
                    <PendingWrapper>
                      <Input
                        type="text"
                        placeholder="UF"
                        value={form.addressState}
                        onChange={(e) =>
                          handleFieldChange(
                            "addressState",
                            e.target.value.toUpperCase().slice(0, 2),
                          )
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "addressState",
                            e.currentTarget.value.toUpperCase().slice(0, 2),
                          )
                        }
                        error={errors.addressState}
                        disabled={zipLoading}
                        maxLength={2}
                        pending={!errors.addressState && !zipLoading}
                      />
                    </PendingWrapper>
                  ) : isAnsweredField("addressState") ? (
                    <AnsweredWrapper>
                      <Input
                        type="text"
                        placeholder="UF"
                        value={form.addressState}
                        onChange={(e) =>
                          handleFieldChange(
                            "addressState",
                            e.target.value.toUpperCase().slice(0, 2),
                          )
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "addressState",
                            e.currentTarget.value.toUpperCase().slice(0, 2),
                          )
                        }
                        error={errors.addressState}
                        disabled={zipLoading}
                        maxLength={2}
                        answered
                      />
                    </AnsweredWrapper>
                  ) : (
                    <PendingWrapper>
                      <Input
                        type="text"
                        placeholder="UF"
                        value={form.addressState}
                        onChange={(e) =>
                          handleFieldChange(
                            "addressState",
                            e.target.value.toUpperCase().slice(0, 2),
                          )
                        }
                        onBlur={(e) =>
                          handleFieldBlur(
                            "addressState",
                            e.currentTarget.value.toUpperCase().slice(0, 2),
                          )
                        }
                        error={errors.addressState}
                        disabled={zipLoading}
                        maxLength={2}
                        pending={!errors.addressState && !zipLoading}
                      />
                    </PendingWrapper>
                  )}
                </Field>
              </AccordionContent>
            </AccordionItem>

            {/* Responsável legal (CNPJ) */}
            {isCnpj && (
              <div className="rounded-lg bg-white shadow-sm">
                <div className="px-6 pt-5 pb-4 flex items-center gap-3">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${hasVal(form.responsibleName) && hasVal(form.responsibleCpf) ? "bg-[#4B9857]" : "bg-brand-orange"}`}
                  >
                    {hasVal(form.responsibleName) &&
                    hasVal(form.responsibleCpf) ? (
                      <Check
                        className="h-3.5 w-3.5 text-white"
                        strokeWidth={2.5}
                      />
                    ) : (
                      <TriangleAlert
                        className="h-3.5 w-3.5 text-white"
                        strokeWidth={2.5}
                      />
                    )}
                  </span>
                  <h2
                    className={`text-xs font-semibold uppercase tracking-wide ${hasVal(form.responsibleName) && hasVal(form.responsibleCpf) ? "text-[#4B9857]" : "text-brand-orange"}`}
                  >
                    Responsável legal
                  </h2>
                </div>
                <div className="px-6 pb-6 flex flex-col gap-4">
                  <Field
                    label="Nome completo"
                    error={errors.responsibleName}
                    required
                  >
                    {isPrefilled("responsibleName") ? (
                      <PrefilledWrapper>
                        <Input
                          type="text"
                          value={form.responsibleName}
                          prefilled
                        />
                      </PrefilledWrapper>
                    ) : isTypingField("responsibleName") ? (
                      <PendingWrapper>
                        <Input
                          type="text"
                          placeholder="Nome do responsável"
                          value={form.responsibleName}
                          onChange={(e) =>
                            handleFieldChange("responsibleName", e.target.value)
                          }
                          onBlur={(e) =>
                            handleFieldBlur(
                              "responsibleName",
                              e.currentTarget.value,
                            )
                          }
                          error={errors.responsibleName}
                          pending={!errors.responsibleName}
                        />
                      </PendingWrapper>
                    ) : isAnsweredField("responsibleName") ? (
                      <AnsweredWrapper>
                        <Input
                          type="text"
                          placeholder="Nome do responsável"
                          value={form.responsibleName}
                          onChange={(e) =>
                            handleFieldChange("responsibleName", e.target.value)
                          }
                          onBlur={(e) =>
                            handleFieldBlur(
                              "responsibleName",
                              e.currentTarget.value,
                            )
                          }
                          error={errors.responsibleName}
                          answered
                        />
                      </AnsweredWrapper>
                    ) : (
                      <PendingWrapper>
                        <Input
                          type="text"
                          placeholder="Nome do responsável"
                          value={form.responsibleName}
                          onChange={(e) =>
                            handleFieldChange("responsibleName", e.target.value)
                          }
                          onBlur={(e) =>
                            handleFieldBlur(
                              "responsibleName",
                              e.currentTarget.value,
                            )
                          }
                          error={errors.responsibleName}
                          pending={!errors.responsibleName}
                        />
                      </PendingWrapper>
                    )}
                  </Field>

                  <Field
                    label="CPF do responsável"
                    error={errors.responsibleCpf}
                    required
                  >
                    {isPrefilled("responsibleCpf") ? (
                      <PrefilledWrapper>
                        <Input
                          type="text"
                          value={form.responsibleCpf}
                          prefilled
                        />
                      </PrefilledWrapper>
                    ) : isTypingField("responsibleCpf") ? (
                      <PendingWrapper>
                        <Input
                          type="text"
                          placeholder="000.000.000-00"
                          value={form.responsibleCpf}
                          onChange={(e) =>
                            handleFieldChange(
                              "responsibleCpf",
                              formatCpf(e.target.value),
                            )
                          }
                          onBlur={(e) =>
                            handleFieldBlur(
                              "responsibleCpf",
                              formatCpf(e.currentTarget.value),
                            )
                          }
                          error={errors.responsibleCpf}
                          inputMode="numeric"
                          pending={!errors.responsibleCpf}
                        />
                      </PendingWrapper>
                    ) : isAnsweredField("responsibleCpf") ? (
                      <AnsweredWrapper>
                        <Input
                          type="text"
                          placeholder="000.000.000-00"
                          value={form.responsibleCpf}
                          onChange={(e) =>
                            handleFieldChange(
                              "responsibleCpf",
                              formatCpf(e.target.value),
                            )
                          }
                          onBlur={(e) =>
                            handleFieldBlur(
                              "responsibleCpf",
                              formatCpf(e.currentTarget.value),
                            )
                          }
                          error={errors.responsibleCpf}
                          inputMode="numeric"
                          answered
                        />
                      </AnsweredWrapper>
                    ) : (
                      <PendingWrapper>
                        <Input
                          type="text"
                          placeholder="000.000.000-00"
                          value={form.responsibleCpf}
                          onChange={(e) =>
                            handleFieldChange(
                              "responsibleCpf",
                              formatCpf(e.target.value),
                            )
                          }
                          onBlur={(e) =>
                            handleFieldBlur(
                              "responsibleCpf",
                              formatCpf(e.currentTarget.value),
                            )
                          }
                          error={errors.responsibleCpf}
                          inputMode="numeric"
                          pending={!errors.responsibleCpf}
                        />
                      </PendingWrapper>
                    )}
                  </Field>
                </div>
              </div>
            )}

            {/* Situação financeira */}
            <AccordionItem
              value="financeiro"
              className="rounded-lg bg-white shadow-sm border-none"
            >
              <div className="px-6">
                <SectionHeader
                  title="Situação financeira"
                  complete={sectionComplete.financeiro}
                />
              </div>
              <AccordionContent className="px-6 pb-6 pt-0 flex flex-col gap-4">
                <Field
                  label="Valor aproximado das dívidas"
                  error={errors.valorDivida}
                  required
                >
                  {isPrefilled("valorDivida") ? (
                    <PrefilledWrapper>
                      <Select value={form.valorDivida} disabled>
                        <SelectTrigger
                          className="h-11 border-success bg-neutral-50 text-brand-navy/60 pl-9 cursor-default"
                          data-radix-select-trigger
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ate_1000">Até R$ 1.000</SelectItem>
                          <SelectItem value="1000_5000">
                            R$ 1.000 – R$ 5.000
                          </SelectItem>
                          <SelectItem value="5000_20000">
                            R$ 5.000 – R$ 20.000
                          </SelectItem>
                          <SelectItem value="20000_50000">
                            R$ 20.000 – R$ 50.000
                          </SelectItem>
                          <SelectItem value="acima_50000">
                            Acima de R$ 50.000
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </PrefilledWrapper>
                  ) : hasValue(form.valorDivida) ? (
                    <AnsweredWrapper>
                      <Select
                        value={form.valorDivida}
                        onValueChange={(v) => set("valorDivida", v)}
                      >
                        <SelectTriggerState
                          answered
                          error={!!errors.valorDivida}
                        >
                          <SelectValue placeholder="Selecione" />
                        </SelectTriggerState>
                        <SelectContent>
                          <SelectItem value="ate_1000">Até R$ 1.000</SelectItem>
                          <SelectItem value="1000_5000">
                            R$ 1.000 – R$ 5.000
                          </SelectItem>
                          <SelectItem value="5000_20000">
                            R$ 5.000 – R$ 20.000
                          </SelectItem>
                          <SelectItem value="20000_50000">
                            R$ 20.000 – R$ 50.000
                          </SelectItem>
                          <SelectItem value="acima_50000">
                            Acima de R$ 50.000
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </AnsweredWrapper>
                  ) : (
                    <PendingWrapper>
                      <Select
                        value={form.valorDivida}
                        onValueChange={(v) => set("valorDivida", v)}
                      >
                        <SelectTrigger
                          className={`h-11 pl-9 ${errors.valorDivida ? "border-destructive" : "border-dashed border-brand-orange/50"}`}
                        >
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ate_1000">Até R$ 1.000</SelectItem>
                          <SelectItem value="1000_5000">
                            R$ 1.000 – R$ 5.000
                          </SelectItem>
                          <SelectItem value="5000_20000">
                            R$ 5.000 – R$ 20.000
                          </SelectItem>
                          <SelectItem value="20000_50000">
                            R$ 20.000 – R$ 50.000
                          </SelectItem>
                          <SelectItem value="acima_50000">
                            Acima de R$ 50.000
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </PendingWrapper>
                  )}
                </Field>

                <Field
                  label="O que você quer alcançar com a regularização?"
                  error={errors.objetivo}
                  required
                >
                  {isPrefilled("objetivo") ? (
                    <PrefilledWrapper>
                      <Select value={form.objetivo} disabled>
                        <SelectTrigger
                          className="h-11 border-success bg-neutral-50 text-brand-navy/60 pl-9 cursor-default"
                          data-radix-select-trigger
                        >
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {financeGoalOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </PrefilledWrapper>
                  ) : hasValue(form.objetivo) ? (
                    <AnsweredWrapper>
                      <Select
                        value={form.objetivo}
                        onValueChange={(v) => set("objetivo", v)}
                      >
                        <SelectTriggerState answered error={!!errors.objetivo}>
                          <SelectValue placeholder="Selecione" />
                        </SelectTriggerState>
                        <SelectContent>
                          {financeGoalOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </AnsweredWrapper>
                  ) : (
                    <PendingWrapper>
                      <Select
                        value={form.objetivo}
                        onValueChange={(v) => set("objetivo", v)}
                      >
                        <SelectTrigger
                          className={`h-11 pl-9 ${errors.objetivo ? "border-destructive" : "border-dashed border-brand-orange/50"}`}
                        >
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {financeGoalOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </PendingWrapper>
                  )}
                </Field>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Dialog open={partialSaveAlert} onOpenChange={setPartialSaveAlert}>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10">
                  <TriangleAlert className="h-6 w-6 text-brand-orange" />
                </div>
                <DialogTitle className="text-center font-dm text-brand-navy">
                  Dados salvos parcialmente
                </DialogTitle>
                <DialogDescription className="text-center text-sm leading-[18px] text-foreground-alt">
                  Seus dados ainda não serão enviados, apenas salvamos os que já
                  estão preenchidos para sua segurança.
                  <br />
                  <br />
                  Seu processo será iniciado apenas após o envio de todos os
                  dados que precisamos.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-2">
                <button
                  type="button"
                  onClick={() => setPartialSaveAlert(false)}
                  className="btn-secondary h-11 w-full rounded-md text-sm font-semibold"
                >
                  Entendi, vou completar os dados
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {!isLocked && (
            <>
              {submitError && (
                <p className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive text-center">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                className="btn-primary h-11 w-full rounded-md text-sm font-semibold"
              >
                Salvar e enviar dados
              </button>

              <p className="text-center text-txt-xs text-foreground-alt pb-4">
                Seus dados são protegidos pela LGPD e utilizados exclusivamente para
                o seu processo.
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
