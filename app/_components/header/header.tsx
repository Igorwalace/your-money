import { caveat } from '@/app/font/font'
import ProfileHeader from './profile'

function Header() {
  return (
    <div className='flex justify-between gap-10 px-5 py-3 items-center' >
        <div className={`${caveat.className} text-4xl font-extrabold text-[#39BE00]`} >yourmoney</div>
        
        {/* <div>
            <ul className='flex items-center gap-2' >
                <li>Dashboard</li>
                <li>Transações</li>
                <li>Assinatura</li>
            </ul>
        </div> */}

        <div>
            <ProfileHeader />
        </div>
    </div>
  )
}

export default Header