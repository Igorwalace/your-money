'use client';

import useAppAmount from '@/app/context/amount';

// gráfico
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export function DonutStatus() {

    const { despesaTotalMonth, receitaTotalMonth, investTotalMonth } = useAppAmount()

    const hasData =
        receitaTotalMonth !== 0 ||
        despesaTotalMonth !== 0 ||
        investTotalMonth !== 0 

    const data = hasData
        ? [
            { name: 'Positivo', value: receitaTotalMonth, color: '#39BE00' },
            { name: 'Negativo', value: despesaTotalMonth, color: '#E53935' },
            { name: 'Neutro', value: investTotalMonth, color: '#E0BC00' },
        ].filter(item => item.value !== 0) // 🔥 remove fatia zerada
        : [{ name: 'Vazio', value: 1, color: '#F0F0F0' }];


    return (
        <div className='w-72 h-72' >
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        innerRadius={65}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                        // Esta função extrai a porcentagem (percent) do cálculo interno do Recharts
                        label={({ percent }) => `${(percent! * 100).toFixed(0)}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>

    );
}
