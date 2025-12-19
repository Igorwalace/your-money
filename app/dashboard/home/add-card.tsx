'use client'

import useAppUtils from '@/app/context/utills'
import { UseUser } from '@/app/user/user'
import { db, ID } from '@/app/utils/appwrite'
import { banks, dbId, tableIdCards } from '@/app/utils/ts'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import Image from 'next/image'
import { useState } from 'react'
import { CiCircleCheck } from "react-icons/ci"
import { toast } from 'sonner'

function AddCard() {
    const { user } = UseUser()
    const { loading, setLoading, openDialogAddCard, setOpenDialogAddCard, setStateAddTransacao, cardsTotal } = useAppUtils()

    const [icon, setIcon] = useState<string>("")
    const [name, setName] = useState("")
    const [closingDay, setClosingDay] = useState<number | ''>('')
    const [limit, setLimit] = useState<number>(0)

    const [errors, setErrors] = useState({
        icon: false,
        name: false,
        closingDay: false,
        limit: false,
    })

    function formatToBRL(value: number) {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        })
    }

    function handleLimitChange(e: React.ChangeEvent<HTMLInputElement>) {
        const onlyNumbers = e.target.value.replace(/\D/g, '')
        setLimit(Number(onlyNumbers) / 100)
    }

    const handleAddCardUser = async () => {
        if (!dbId || !tableIdCards) return

        const newErrors = {
            icon: !icon,
            name: !name,
            closingDay: !closingDay,
            limit: !limit,
        }

        setErrors(newErrors)
        if (Object.values(newErrors).some(Boolean)) return

        const limitEmCentavos = Math.round(limit * 100);

        try {
            setLoading(true)
            await db.createRow({
                databaseId: dbId,
                tableId: tableIdCards,
                rowId: ID.unique(),
                data: {
                    userId: user?.uid,
                    name,
                    closing_day: closingDay,
                    limit: limitEmCentavos,
                    icon,
                },
            })
            toast.info('Seu cartão foi adicionado com sucesso.')
            setStateAddTransacao((prev: boolean) => !prev)
            setOpenDialogAddCard(false)
        } catch (error) {
            console.log(error)
            toast.error('Ocorreu algum erro inesperado, tente novamente ou entre em contato com o suporte.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Dialog open={openDialogAddCard} onOpenChange={setOpenDialogAddCard}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Adicionar Cartão</DialogTitle>

                        <div className="space-y-4 mt-4">

                            {/* ÍCONE */}
                            <div>
                                <Label>Ícone do cartão</Label>
                                <Select
                                    onValueChange={(value) => {
                                        setIcon(value)
                                        setErrors((prev) => ({ ...prev, icon: false }))
                                    }}
                                >
                                    <SelectTrigger className="h-20 flex items-center justify-between">
                                        <SelectValue placeholder="Selecione o banco" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <div className="grid grid-cols-2 gap-3 p-2">
                                            {banks.map((bank) => (
                                                <SelectItem
                                                    key={bank.id}
                                                    value={bank.icon}
                                                    textValue={bank.name}
                                                    className="flex justify-center items-center p-3
                                   hover:bg-accent rounded-md
                                   data-[state=checked]:ring-2
                                   data-[state=checked]:ring-primary"
                                                >
                                                    <Image
                                                        src={bank.icon}
                                                        alt={bank.name}
                                                        width={28}
                                                        height={28}
                                                    />
                                                </SelectItem>
                                            ))}
                                        </div>
                                    </SelectContent>
                                </Select>

                                {errors.icon && (
                                    <span className="text-xs text-red-500">obrigatório</span>
                                )}
                            </div>

                            {/* NOME */}
                            <div>
                                <Label>Nome</Label>
                                <Input
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value)
                                        setErrors((prev) => ({ ...prev, name: false }))
                                    }}
                                    placeholder="cartão santander"
                                />
                                {errors.name && (
                                    <span className="text-xs text-red-500">obrigatório</span>
                                )}
                            </div>

                            {/* FECHAMENTO */}
                            <div>
                                <Label>Dia de fechamento</Label>
                                <Input
                                    type="number"
                                    min={1}
                                    max={30}
                                    value={closingDay}
                                    placeholder="20"
                                    onChange={(e) => {
                                        const value = e.target.value

                                        if (value === '') {
                                            setClosingDay('')
                                            return
                                        }

                                        const v = Number(value)

                                        if (v >= 1 && v <= 30) {
                                            setClosingDay(v)
                                            setErrors((prev) => ({ ...prev, closingDay: false }))
                                        }
                                    }}
                                />
                                {errors.closingDay && (
                                    <span className="text-xs text-red-500">obrigatório</span>
                                )}
                            </div>

                            {/* LIMITE */}
                            <div>
                                <Label>Limite do cartão</Label>
                                <Input
                                    value={limit ? formatToBRL(limit) : ''}
                                    onChange={(e) => {
                                        handleLimitChange(e)
                                        setErrors((prev) => ({ ...prev, limit: false }))
                                    }}
                                    placeholder="R$ 2.500,00"
                                    inputMode="numeric"
                                />
                                {errors.limit && (
                                    <span className="text-xs text-red-500">obrigatório</span>
                                )}
                            </div>

                            {/* BOTÃO */}
                            <div className="w-full h-[70px] flex items-center justify-center">
                                <button
                                    disabled={loading}
                                    onClick={handleAddCardUser}
                                    className="text-[#39BE00] hover:scale-105 transition"
                                >
                                    {
                                        loading
                                            ?
                                            <span className="loader2"></span>
                                            :
                                            <CiCircleCheck size={70} />
                                    }
                                </button>
                            </div>

                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddCard
