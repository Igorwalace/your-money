'use client'

// context
import useAppAmount from "@/app/context/amount";

// ts
import { meses } from "@/app/utils/ts";

// shadcn
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { useEffect } from "react";

function Month() {

    const { setMonthSelect, monthSelect } = useAppAmount()
    
    const mesAtual = new Date().getMonth() + 1;

    useEffect(() => {
        if (!monthSelect) {
            setMonthSelect(mesAtual)
        }
    }, [])


    return (
        <NativeSelect
            value={monthSelect}
            onChange={(e) => setMonthSelect(Number(e.target.value))}
            className="text-sm w-[150px]"
        >
            {meses.map((mes, index) => (
                <NativeSelectOption key={mes} value={index + 1}>
                    {mes}
                </NativeSelectOption>
            ))}
        </NativeSelect>
    )
}

export default Month