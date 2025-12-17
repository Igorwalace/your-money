// shadcn
import ButtonRelatorio from './butto-relatório'
import { Card } from "@/components/ui/card";
import DAY from "./day";
import CardAdd from "./card-add-transcription";
import Month from './month';
import Saldos from './saldos';

function Dashboard() {


    return (
        <main className="px-5 py-3 space-y-5" >
            <Card className="px-5 mt-3" >
                <div className='md:flex items-center justify-between' >
                    <DAY />
                    <div className='flex md:justify-end justify-between mt-5 md:mt-0 items-center gap-7' >
                        <ButtonRelatorio />
                        <Month />
                    </div>
                </div>
                <Saldos />
            </Card>

            <CardAdd />
        </main>
    )
}

export default Dashboard