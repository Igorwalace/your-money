'use client'
import { UseUser } from '@/app/user/user'
import React, { useEffect } from 'react'

// shadcn
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from 'firebase/auth'
import { auth } from '@/app/utils/firebase'
import useAppUtils from '@/app/context/utills'

function ProfileHeader() {

    const { user } = UseUser()
    const { loading } = useAppUtils()

    return (
        <div>
            {
                loading &&
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-1000">
                    <span className="loader"></span>
                </div>
            }
            {
                user ?
                    <>

                        <DropdownMenu>
                            <DropdownMenuTrigger className='flex justify-center items-center gap-3' >
                                <Avatar className='border-white border' >
                                    <AvatarImage src={user?.photoURL!} />
                                    <AvatarFallback>{user.displayName!.charAt(0) + user?.displayName!.charAt(1).toLocaleUpperCase()}</AvatarFallback>
                                </Avatar>
                                <span className='font-medium text-[#39BE00] text-sm' >{user.displayName}</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-[300px] min-h-[200px] mr-5 mt-5 p-5 bg-[#ffff] border-2 border-[#dfdfdf]'>
                                <DropdownMenuLabel className='flex justify-center' >
                                    <Avatar className='border border-white w-30 h-30' >
                                        <AvatarImage src={user?.photoURL || undefined} />
                                        {
                                            user.displayName != undefined
                                            &&
                                            <AvatarFallback className='text-3xl flex justify-center items-center' >{user.displayName!.charAt(0) + user.displayName!.charAt(1).toLocaleUpperCase()}</AvatarFallback>
                                        }
                                    </Avatar>
                                </DropdownMenuLabel>
                                <DropdownMenuLabel className='text-center' >{user.displayName}</DropdownMenuLabel>
                                <DropdownMenuLabel className='text-center text-xs m-0 pt-0 pb-5' >{user.email}</DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Team</DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={async () => {
                                        await signOut(auth);

                                        // Apaga o cookie
                                        document.cookie =
                                            'authToken=; path=/; max-age=0; samesite=strict;';

                                        // Redireciona
                                        window.location.href = '/';
                                    }}
                                >
                                    SAIR
                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                    :
                    'Login'
            }
        </div>
    )
}

export default ProfileHeader