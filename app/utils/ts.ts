import { Models } from "appwrite";

export const dbId = process.env.NEXT_PUBLIC_APPWRITE_DB_FINANCIAS
export const tableIdUser = process.env.NEXT_PUBLIC_APPWRITE_DB_FINANCIAS_TABLE_USER
export const tableIdCards = process.env.NEXT_PUBLIC_APPWRITE_DB_FINANCIAS_TABLE_CARDS
export const tableIdTransacao = process.env.NEXT_PUBLIC_APPWRITE_DB_FINANCIAS_TABLE_TRANSACAO

export const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const banks = [
  {
    id: "santander",
    name: "Santander",
    icon: "/svgs-banks/logo-santander.svg",
  },
  // {
  //   id: "nubank",
  //   name: "Nubank",
  //   icon: "/svgs-banks/logo-nubank.svg",
  // },
  {
    id: "bradesco",
    name: "bradesci",
    icon: "/svgs-banks/logo-bradesco.svg",
  },
  {
    id: "itau",
    name: "Itaú",
    icon: "/svgs-banks/logo-itau.svg",
  },
]


export interface Transacao extends Models.Row {
  UserId: string
  Description: string
  Date: string
  Method: string
  Type: string
  Month: string
  Saldo: number // em centavos
  Card: string
  Anexo?: string
}
