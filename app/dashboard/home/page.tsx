import Header from '@/app/_components/header/header'
import Dashboard from './dashboard'
import { Separator } from '@/components/ui/separator'

function page() {
  return (
    <main>
      <Header />
      <Separator />
      <Dashboard />
    </main>
  )
}

export default page