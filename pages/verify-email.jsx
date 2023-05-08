import { useRouter } from "next/router"
import React from "react"
import { ConfirmEmail } from "../components"

const VerifyEmailPage = () => {
  const router = useRouter()
  const handlesubmit = ()=>{
    window.location.href = '/'
    // location.reload()
  }
  return (
    <ConfirmEmail
      title1="Confirmation email has sent"
      title2="Please check your mailbox"
      meta1="WE HAVE sent a confirmation email to you."
      meta2="Please click on the link in the email"
      // onSubmit={() => router.push("/login")}
      onSubmit={() => handlesubmit()}
    />
  )
}

export default VerifyEmailPage
