import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React from 'react'

function GerenciarConta() {
    return (
        <Card className='px-5 md:w-2/4' >
            <div>
                <h1 className='md:text-base text-sm font-bold text-center' >minhas contas</h1>
            </div>
            <div className='flex justify-center items-center' >
                <span className='text-sm' >você não tem nenhuma conta ainda</span>
            </div>
            <Button variant='ghost' className='text-[#39BE00] cursor-pointer duration-200 hover:text-[#39BE00]' >
                <Plus size={20} />
                Adicionar conta</Button>
        </Card>
    )
}

export default GerenciarConta