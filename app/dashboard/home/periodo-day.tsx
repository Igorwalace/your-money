export function getPeriodoDoDia() {
    const hora = new Date().getHours()

    if (hora >= 5 && hora < 12) return 'manhâ'
    if (hora >= 12 && hora < 18) return 'tarde'
    return 'noite'
}