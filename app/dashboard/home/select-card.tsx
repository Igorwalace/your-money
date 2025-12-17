'use client'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import AddCard from './add-card'
import { useEffect, useState } from 'react'
import { dbId, tableIdCards } from '@/app/utils/ts'
import { db } from '@/app/utils/appwrite'
import { Models, Query } from 'appwrite'
import { UseUser } from '@/app/user/user'
import { SelectItem } from '@radix-ui/react-select'
import useAppUtils from '@/app/context/utills'

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
    errors: boolean
}

function SelectCard({ cardId, setCardId, errors }: SelectCardProps) {

    const { user } = UseUser()
    const [card, setCard] = useState<Card[]>()
    const { openDialogAddCard } = useAppUtils()

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


                    <AddCard />
                </div>
                {errors && (
                    <span className="text-xs text-red-500">obrigatório</span>
                )}


            </div>
        </>
    )
}

export default SelectCard