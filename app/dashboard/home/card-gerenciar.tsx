import GerenciarCard from './gerenciar-card'
import GerenciarConta from './gerenciar-conta'

function CardGerenciarCartao() {
  return (
    <main className="gap-5 flex flex-col md:flex-row justify-center">
      <GerenciarCard />
      <GerenciarConta />
    </main>
  )
}

export default CardGerenciarCartao