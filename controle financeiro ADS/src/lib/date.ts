import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDate(value: string, pattern = "dd/MM/yyyy") {
  return format(parseISO(value), pattern, { locale: ptBR });
}
