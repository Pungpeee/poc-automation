import { useRouter } from "next/router"
import React from "react"
import { ConfirmEmail } from "../components"

const ForgotConfirmPage = () => {
    const router = useRouter()
    return (
        <ConfirmEmail
            title1="Email has sent"
            title2="Please check your mailbox"
            meta1="WE HAVE sent a reset password link to you."
            meta2="Please click on the link in the email"
            onSubmit={() => router.push("/login")}
        />
    )
}

export default ForgotConfirmPage
