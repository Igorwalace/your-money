'use client'
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useAppUtils from '@/app/context/utills';

// appwrite
import { db, ID, storage } from "@/app/utils/appwrite";
import { useEffect, useState } from "react";
import { UseUser } from "@/app/user/user";
import { meses } from "@/app/utils/ts";
import { toast } from "sonner";
import SelectCard from "./select-card";

function FormDialog() {

    const { setOpenForm, openForm, transacao, setLoading, loading, stateAddTransacao, setStateAddTransacao } = useAppUtils()
    const { user } = UseUser()

    const [des, setDes] = useState('')
    const [saldo, setSaldo] = useState<number>()
    const [metodo, setMetodo] = useState<string>("")
    const [file, setFile] = useState<File | null>(null)
    const [cardId, setCardId] = useState<string>('')

    const hoje = new Date().toISOString().split("T")[0]
    const [date, setDate] = useState<string>(hoje)

    const [errors, setErrors] = useState({
        descricao: false,
        valor: false,
        card: false,
        metodo: false
    })

    function formatToBRL(value: number) {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const onlyNumbers = e.target.value.replace(/\D/g, '');
        const numberValue = Number(onlyNumbers) / 100;

        setSaldo(numberValue);
    }

    useEffect(() => {
        setErrors((prev) => ({
            descricao: des.trim() === '' ? prev.descricao : false,
            valor: !saldo || saldo <= 0 ? prev.valor : false,
            metodo: metodo === '' ? prev.metodo : false,
            card: cardId === '' ? prev.card : false,
        }))
    }, [des, saldo, metodo, cardId])

    const handleAddTransacao = async () => {
        const tableId = process.env.NEXT_PUBLIC_APPWRITE_DB_FINANCIAS_TABLE_TRANSACAO
        const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DB_FINANCIAS
        const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ANEXOS

        if (!tableId || !databaseId || !bucketId) {
            console.log('Erro. tente novamente ou entre em contato com o suporte.')
            return
        }
        const nomeMes = meses[new Date(date).getMonth()]

        let fileUrl: string | null = null

        const newErrors = {
            descricao: !des.trim(),
            valor: !saldo || saldo <= 0,
            card: !cardId,
            metodo: !metodo
        }

        setErrors(newErrors)

        if (Object.values(newErrors).some(Boolean)) {
            return
        }

        try {
            setLoading(true)

            if (file) {
                const uploaded = await storage.createFile({
                    bucketId,
                    fileId: ID.unique(),
                    file,
                })
                const fileId = uploaded.$id
                fileUrl = storage.getFileView({
                    bucketId, fileId
                })
            }

            if (!saldo) return

            const saldoEmCentavos = Math.round(saldo * 100);

            await db.createRow({
                databaseId,
                tableId,
                rowId: ID.unique(),
                data: {
                    Description: des,
                    Date: date,
                    Method: metodo,
                    Saldo: saldoEmCentavos,
                    Type: transacao,
                    UserId: user?.uid,
                    Month: nomeMes,
                    Anexo: fileUrl,
                    Card: cardId
                }
            });
            setStateAddTransacao((prev: boolean) => !prev)

            setOpenForm(false)

            setDes('')
            setSaldo(0)
            setMetodo('')
            setFile(null)
            setDate(hoje)

            toast.info('Transação adicionada com sucesso.')

        } catch (error: any) {
            console.log(error)
            if (
                error?.message?.includes("timed out") ||
                error?.code === "ERR_TIMED_OUT"
            ) {
                toast.error("Tempo de resposta excedido. Verifique sua conexão e tente novamente.")
            } else {
                toast.error("Verifique sua conexão e tente novamente ou entre em contato com o suporte.")
            }
        } finally {
            setLoading(false)
        }
    }
    const handleCancelForm = () => {
        setOpenForm(false)

        setDes('')
        setSaldo(0)
        setMetodo('')
        setFile(null)
        setDate(hoje)
    }

    return (
        <>
            <Dialog open={openForm} onOpenChange={setOpenForm} >
                <DialogContent className='max-h-[95vh] overflow-auto p-0 m-0' >
                    <DialogTitle className='hidden' />
                    <Card className="">
                        <CardHeader>
                            <CardTitle className="text-xl">Adicionar {transacao}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Insira as informações abaixo
                            </p>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {/* Título */}
                            <div className="space-y-1">
                                <Label>descrição</Label>
                                <Input
                                    onChange={(e) => setDes(e.target.value)}
                                    value={des}
                                    placeholder="Salário" />
                                {errors.descricao && (
                                    <span className="text-xs text-red-500">obrigatório</span>
                                )}
                            </div>

                            {/* Valor */}
                            <div className="space-y-1">
                                <Label>Valor</Label>
                                <Input
                                    value={saldo ? formatToBRL(saldo) : ''}
                                    onChange={handleChange}
                                    placeholder="R$ 2.500,00"
                                    inputMode="numeric"
                                />
                                {errors.valor && (
                                    <span className="text-xs text-red-500">obrigatório</span>
                                )}
                            </div>


                            {/* Método */}
                            <div className="space-y-1">
                                <Label>método de pagamento</Label>
                                <Select value={metodo} onValueChange={setMetodo}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="pix">Pix</SelectItem>
                                        <SelectItem value="debito">Cartão Débito</SelectItem>
                                        <SelectItem value="credito">Cartão Crédito</SelectItem>
                                        <SelectItem value="dinheiro">Dinheiro</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.metodo && (
                                    <span className="text-xs text-red-500">obrigatório</span>
                                )}
                            </div>

                            {/* Cartão */}
                            <SelectCard cardId={cardId} setCardId={setCardId} errors={errors.card} />

                            {/* Data */}
                            <div className="space-y-1">
                                <Label>Data</Label>

                                <div className="relative">
                                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

                                    <Input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Anexo */}
                            <div className="space-y-1">
                                <Label>anexo</Label>
                                <Input
                                    type="file"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                />
                                {file && (
                                    <p className="text-xs text-muted-foreground">
                                        Arquivo: {file.name}
                                    </p>
                                )}
                            </div>

                            {/* Ações */}
                            <div className="flex gap-3 pt-4">
                                <Button variant="secondary" className="flex-1 cursor-pointer hover:scale-[1.02]"
                                    onClick={handleCancelForm}
                                >
                                    Cancelar
                                </Button>
                                <Button disabled={loading} onClick={handleAddTransacao} className="flex-1 bg-green-600 hover:bg-green-700 cursor-pointer duration-200 hover:scale-[1.02]">
                                    {
                                        loading
                                            ?
                                            'Carregando'
                                            :
                                            'Adicionar'
                                    }
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </DialogContent >
            </Dialog >
        </>
    )
}

export default FormDialog