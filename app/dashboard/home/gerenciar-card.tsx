'use client'
import useAppAmount from '@/app/context/amount'
import useAppUtils from '@/app/context/utills'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'

function GerenciarCard() {

    const { setOpenDialogAddCard } = useAppUtils()
    const { cardsTotal } = useAppAmount()

    return (
        <Card className='px-5 md:w-2/4' >
            <div>
                <h1 className='md:text-base text-sm font-bold text-center' >meus cartões</h1>
            </div>
            <div className='flex justify-center items-center' >
                <span className='text-sm' >você não tem nenhum cartão ainda {cardsTotal} </span>
            </div>
            <Button
                onClick={() => {
                    if (cardsTotal > 2) {
                        toast.info('Você atingiu o número máximo de cartãoes adicionados. (3)')
                        return
                    }
                    setOpenDialogAddCard(true)
                }}
                variant='ghost'
                className='text-[#39BE00] cursor-pointer duration-200 hover:text-[#39BE00]' >
                <Plus size={20} />
                Adicionar cartão
            </Button>
        </Card>
    )
}

export default GerenciarCard