'use client'

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
//prisma

//next-react
import { createContext, useContext } from "react"

// firebse
import { auth } from "../utils/firebase";
import { db } from "../utils/appwrite";
import { dbId, tableIdUser } from "../utils/ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppContext = createContext<any>(undefined);

export function AppAuth({ children }: {
    children: React.ReactNode;
}) {

    const provider = new GoogleAuthProvider();

    const handleGoogleLogin = async () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {

                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const user = result.user;

                if (!user || !token || !credential) throw new Error('Erro ao fazer login.')

                const idToken = await user.getIdToken();
                document.cookie = `authToken=${idToken}; path=/; secure; samesite=strict; max-age=864000`;

                try {

                    await db.createRow({
                        databaseId: dbId!,
                        tableId: tableIdUser!,
                        rowId: user.uid,
                        data: {
                            planActive: false,
                            username: user.displayName,
                            tokenUser: token,
                            email: user.email
                        },
                    });


                } catch (erro) {
                    console.log(erro)
                }
                window.location.href = '/dashboard/home';

            }).catch(() => {
                console.log('Erro ao efetuar login.')
            })
    }

    return (
        <AppContext.Provider value={{
            handleGoogleLogin
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default function useAppAuth() {
    return useContext(AppContext)
}