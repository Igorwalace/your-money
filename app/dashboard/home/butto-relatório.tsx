import { FcSurvey } from 'react-icons/fc'

function ButtonRelatorio() {
    return (
        <button className='text-sm flex justify-start items-center gap-2 w-[200px]' >Relatório Mensal
            <FcSurvey size={25} />
        </button>
    )
}

export default ButtonRelatorio