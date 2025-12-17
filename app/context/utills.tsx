'use client'

//prisma

//next-react
import { createContext, useContext, useState } from "react"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppContext = createContext<any>(undefined);

export function AppUtils({ children }: {
    children: React.ReactNode;
}) {

    const [openForm, setOpenForm] = useState(false)
    const [transacao, setTransacao] = useState()
    const [loading, setLoading] = useState(false)
    const [openDialogAddCard, setOpenDialogAddCard] = useState(false)
    const [stateAddTransacao, setStateAddTransacao] = useState(false)

    return (
        <AppContext.Provider value={{
            openForm, setOpenForm, transacao, setTransacao, loading, setLoading, openDialogAddCard, setOpenDialogAddCard, stateAddTransacao, setStateAddTransacao
            }}>
            {children}
        </AppContext.Provider>
    )
}

export default function useAppUtils() {
    return useContext(AppContext)
}