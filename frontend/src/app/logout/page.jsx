"use client"
import { useRouter } from "next/navigation"


export default function Logout(){
    const router= useRouter();
    localStorage.removeItem("token");
    router.push("/login");
    return(
        <div>
            Loggout
        </div>
    )
}