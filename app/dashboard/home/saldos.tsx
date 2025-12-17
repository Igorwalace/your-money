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
                    <span className="flex items-center gap-2 md:text-base text-sm text-[#4052D6]" >
                        <BriefcaseBusiness size='18' />
                        Saldo geral
                    </span>
                </div>
                <div>
                    <h1 className="md:text-2xl text-xl" >{formatBRL(saldoGeral!)}</h1>
                </div>
            </div>

            <div className='md:block flex flex-col items-end justify-center' >
                <div>
                    <span className="flex items-center text-left text-[#39BE00] gap-2 md:text-base text-sm" >
                        <TrendingUp color="#39BE00" size='18' />
                        Entrou
                    </span>
                </div>
                <div>
                    <h1 className="md:text-2xl text-xl" >{formatBRL(receitaTotalMonth)}</h1>
                </div>
            </div>
            <div>
                <div>
                    <span className="flex items-center text-[#E53935] gap-2 md:text-base text-sm" >
                        <TrendingDown color="#E53935" size='18' />
                        Saiu
                    </span>
                </div>
                <div>
                    <h1 className="md:text-2xl text-xl" >{formatBRL(despesaTotalMonth!)}</h1>
                </div>
            </div>
            <div className='md:block flex flex-col items-end' >
                <div>
                    <span className="flex items-center gap-2 md:text-base text-sm text-[#E0BC00]" >
                        <PiggyBank size='18' />
                        Total investido
                    </span>
                </div>
                <div>
                    <h1 className="md:text-2xl text-xl" >{formatBRL(investTotalMonth)}</h1>
                </div>
            </div>
        </div>
    )
}

export default Saldos