'use client'
import { Label } from '@/components/ui/label'
import AddCard from './add-card'
import { useEffect, useState } from 'react'
import { dbId, tableIdCards } from '@/app/utils/ts'
import { db } from '@/app/utils/appwrite'
import { Models, Query } from 'appwrite'
import { UseUser } from '@/app/user/user'
import useAppUtils from '@/app/context/utills'
import { toast } from 'sonner'
import useAppAmount from '@/app/context/amount'

export interface Card extends Models.Row {
    userId: string
    name: string
    limit: number
    icon: string
    closing_day: number
}

interface SelectCardProps {
    cardId: string
    setCardId: React.Dispatch<React.SetStateAction<string>>
}

function SelectCard({ cardId, setCardId }: SelectCardProps) {

    const { user } = UseUser()
    const [card, setCard] = useState<Card[]>()
    const { openDialogAddCard, setOpenDialogAddCard } = useAppUtils()
    const { cardsTotal } = useAppAmount()

    useEffect(() => {
        if (!user?.uid) return

        const fetchCards = async () => {
            const response = await db.listRows<Card>({
                databaseId: dbId!,
                tableId: tableIdCards!,
                queries: [
                    Query.equal('userId', user.uid)
                ]
            })

            setCard(response.rows)
            console.log(card)
        }

        fetchCards()
    }, [user?.uid, openDialogAddCard])

    return (
        <>
            <div>
                <div className="space-y-1 flex items-center gap-2">
                    <div>
                        <Label>cartão</Label>

                        <select
                            value={cardId}
                            onChange={(e) => {
                                console.log('card selecionado:', e.target.value)
                                setCardId(e.target.value)
                            }}
                            className="h-10 capitalize w-[200px] rounded-md border border-input bg-background px-3 text-sm"
                        >
                            <option value='' >Escolha um cartão</option>

                            {card?.map((card) => (
                                <option className='capitalize rounded-2xl' key={card.$id} value={card.$id}>
                                    {card.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div
                        onClick={() => {
                            if (cardsTotal > 2) {
                                toast.info('Você atingiu o número máximo de cartãoes adicionados. (3)')
                                return
                            }
                            setOpenDialogAddCard(true)
                        }}
                        className="mt-3 text-sm cursor-pointer hover:bg-accent p-2 rounded-lg">
                        Adicionar cartão
                    </div>
                    <AddCard />
                </div>
            </div>
        </>
    )
}

export default SelectCard