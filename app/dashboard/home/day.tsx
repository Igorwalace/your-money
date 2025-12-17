'use client'

import { UseUser } from "@/app/user/user"
import { getPeriodoDoDia } from "./periodo-day"

// react-icons
import { FcHome } from "react-icons/fc";

function DAY() {

    const { user } = UseUser()

    const periodo = getPeriodoDoDia()

    return (
        <h1 className='text-base flex w-full gap-2 items-center' >
            boa {periodo === 'manhâ' ? 'manhã' : periodo}, {user?.displayName}!
            <FcHome size={25} />
        </h1>
    )
}

export default DAY