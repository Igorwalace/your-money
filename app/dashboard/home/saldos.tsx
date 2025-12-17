'use client'

// action
import { formatBRL } from '@/app/actions/format-brl'

// context
import useAppAmount from '@/app/context/amount'

// lucide
import { BriefcaseBusiness, PiggyBank, TrendingDown, TrendingUp } from 'lucide-react'

function Saldos() {

    const { saldoGeral, despesaTotalMonth, receitaTotalMonth, investTotalMonth } = useAppAmount()

    return (
        <div className="grid grid-cols-2 gap-4 md:flex items-center justify-between" >
            <div>
                <div>
                    <span className="flex items-center gap-2" >
                        <BriefcaseBusiness size='18' />
                        Saldo geral
                    </span>
                </div>
                <div>
                    <h1 className="text-2xl" >{formatBRL(saldoGeral!)}</h1>
                </div>
            </div>

            <div>
                <div>
                    <span className="flex items-center text-[#39BE00] gap-2" >
                        <TrendingUp color="#39BE00" size='18' />
                        Entrou
                    </span>
                </div>
                <div>
                    <h1 className="text-2xl" >{formatBRL(receitaTotalMonth)}</h1>
                </div>
            </div>
            <div>
                <div>
                    <span className="flex items-center text-[#E53935] gap-2" >
                        <TrendingDown color="#E53935" size='18' />
                        Saiu
                    </span>
                </div>
                <div>
                    <h1 className="text-2xl" >{formatBRL(despesaTotalMonth!)}</h1>
                </div>
            </div>
            <div>
                <div>
                    <span className="flex items-center gap-2 text-[#E0BC00]" >
                        <PiggyBank size='18' />
                        Total investido
                    </span>
                </div>
                <div>
                    <h1 className="text-2xl" >{formatBRL(investTotalMonth)}</h1>
                </div>
            </div>
        </div>
    )
}

export default Saldos