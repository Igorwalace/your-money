import { Card } from '@/components/ui/card'
import { DonutStatus } from './donuts'
import { BriefcaseBusiness, PiggyBank, TrendingDown, TrendingUp } from 'lucide-react'
import TitleControleGastos from './title-controle-gastos'

function CardControleGastis() {
    return (
        <Card className='px-5 flex flex-col justify-center items-center' >

            <TitleControleGastos />

            <div className='flex justify-around w-full items-center gap-2' >
                <DonutStatus />
                <div className='flex flex-col gap-5' >
                    <div className='flex justify-start items-center gap-3' >
                        <BriefcaseBusiness color="#4052D6" size='18' />
                        <h1>Saldo geral</h1>
                    </div>
                    <div className='flex justify-start items-center gap-3' >
                        <TrendingUp color="#39BE00" size='18' />
                        <h1>Entrou</h1>
                    </div>
                    <div className='flex justify-start items-center gap-3' >
                        <TrendingDown color="#E53935" size='18' />
                        <h1>Despesas</h1>
                    </div>
                    <div className='flex justify-start items-center gap-3 ' >
                        <PiggyBank color='#E0BC00' size='18' />
                        <h1>Investimentos</h1>
                    </div>
                </div>
            </div>
        </Card>
    )
}


export default CardControleGastis