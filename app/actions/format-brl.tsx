export function formatBRL(value: number) {
    return (value / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })
}