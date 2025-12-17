'use client'

import useAppAmount from "@/app/context/amount"
import { meses } from "@/app/utils/ts"

function TitleControleGastos() {

    const { monthSelect } = useAppAmount()

    const mes = meses[monthSelect - 1]

    return (
        <div>
            <h1 className='md:text-base text-sm font-bold text-center'>controle de gastos - {mes}</h1>
        </div>
    )
}

export default TitleControleGastos