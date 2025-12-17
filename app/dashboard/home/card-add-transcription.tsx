'use client'
import { Card } from '@/components/ui/card'
import { Minus, PiggyBank, Plus } from 'lucide-react'
import FormDialog from './form-dialog'
import useAppUtils from '@/app/context/utills'
import CardControleGastis from './card-controle-gastos'

function CardAdd() {

    const { setOpenForm, setTransacao } = useAppUtils()

    return (
        <>
            <main className="grid md:grid-cols-2 grid-cols-1 gap-3 items-start">
                <FormDialog />
                <Card className='px-5' >
                    <div>
                        <h1 className='md:text-base text-sm font-bold text-center' >acesso rápido - adicionar</h1>
                    </div>
                    <div className='grid md:grid-cols-3 grid-cols-2 gap-3' >
                        <button
                            onClick={() => {
                                setOpenForm(true)
                                setTransacao('despesa')
                            }}
                            className="flex flex-col items-center justify-center gap-2 rounded-xl border bg-white p-2 hover:shadow-md transition"
                        >
                            <div
                                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-500 text-red-500`}
                            >
                                <Minus size={20} />
                            </div>

                            <span className="text-xs font-medium text-gray-500">
                                DESPESA
                            </span>
                        </button>
                        <button
                            onClick={() => {
                                setOpenForm(true)
                                setTransacao('receita')
                            }}
                            className="flex flex-col items-center justify-center gap-2 rounded-xl border bg-white p-5 hover:shadow-md transition"
                        >
                            <div
                                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-green-500 text-green-500`}
                            >
                                <Plus size={20} />
                            </div>

                            <span className="text-xs font-medium text-gray-500">
                                RECEITA
                            </span>
                        </button>
                        <button
                            onClick={() => {
                                setOpenForm(true)
                                setTransacao('investimento')
                            }}
                            className="flex flex-col items-center justify-center gap-2 rounded-xl border bg-white p-5 hover:shadow-md transition"
                        >
                            <div
                                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#FFDE21] text-[#FFDE21]`}
                            >
                                <PiggyBank size='20' />
                            </div>

                            <span className="text-xs font-medium text-gray-500">
                                INVEST
                            </span>
                        </button>
                    </div>

                </Card>
                <CardControleGastis />

            </main>
        </>
    )
}

export default CardAdd