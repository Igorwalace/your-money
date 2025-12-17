'use client'

//prisma

//next-react
import { createContext, useContext, useEffect, useState } from "react"

// ts
import { dbId, tableIdTransacao, Transacao } from "../utils/ts";

// appwrite
import { db } from "../utils/appwrite";
import { Query } from "appwrite";

// pages
import useAppUtils from "./utills";
import { UseUser } from "../user/user";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppContext = createContext<any>(undefined);

export function AppAmount({ children }: {
    children: React.ReactNode;
}) {

    const { user } = UseUser()

    const [monthSelect, setMonthSelect] = useState<string>('')

    const [transacao, setTransacao] = useState<Transacao[]>([])

    const [saldoGeral, setSaldoGeral] = useState(0)
    const [receitaTotalMonth, setReceitaTotalMonth] = useState(0)
    const [despesaTotalMonth, setDespesaTotalMonth] = useState(0)
    const [investTotalMonth, setInvestTotalMonth] = useState(0)

    const { stateAddTransacao } = useAppUtils()

    useEffect(() => {
        if (!user?.uid) return

        const fetchCards = async () => {
            const response = await db.listRows<Transacao>({
                databaseId: dbId!,
                tableId: tableIdTransacao!,
                queries: [
                    Query.equal('UserId', user.uid)
                ]
            })

            setTransacao(response.rows)
        }

        fetchCards()
    }, [user?.uid, stateAddTransacao])

    useEffect(() => {

        const saldo = transacao.reduce((acc, t) => {
            if (t.Type === 'receita') {
                return acc + t.Saldo
            }

            if (t.Type === 'despesa') {
                return acc - t.Saldo
            }

            return acc
        }, 0)

        const despesa = transacao.reduce((acc, t) => {
            const mesTransacao = new Date(t.Date).getMonth() + 1

            if (t.Type === 'despesa' && Number(mesTransacao) === Number(monthSelect)) {
                return acc + t.Saldo
            }

            return acc
        }, 0)
        const receita = transacao.reduce((acc, t) => {
            const mesTransacao = new Date(t.Date).getMonth() + 1

            if (t.Type === 'receita' && Number(mesTransacao) === Number(monthSelect)) {
                return acc + t.Saldo
            }

            return acc
        }, 0)
        const investimento = transacao.reduce((acc, t) => {
            const mesTransacao = new Date(t.Date).getMonth() + 1

            if (t.Type === 'investimento' && Number(mesTransacao) === Number(monthSelect)) {
                return acc + t.Saldo
            }

            return acc
        }, 0)

        setDespesaTotalMonth(despesa)
        setReceitaTotalMonth(receita)
        setInvestTotalMonth(investimento)
        setSaldoGeral(saldo)

    }, [transacao, monthSelect])



    return (
        <AppContext.Provider value={{
            saldoGeral, setMonthSelect, monthSelect, despesaTotalMonth, receitaTotalMonth, investTotalMonth
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default function useAppAmount() {
    return useContext(AppContext)
}