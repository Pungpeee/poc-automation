import { useRouter } from "next/router"
import { useState } from "react"
import { useMutation } from "react-query"
import { requestWithCredential } from "../../apis/client"
import useDelSignout from "../../hooks/useSignoutDel"




const useLoginController = () => {
  const router = useRouter()
  const [Success,setSuccess] = useState(false)
  const {signOutDel} = useDelSignout()
  const [Expired,setExpired] = useState(false)
  const [Error,setError] = useState(false)
  const { token } = router.query

  

  const { mutate, isLoading,data, error } = useMutation(() => {
    return requestWithCredential.delete(`/api/account/delete/confirm/${token}/`)}, {
      onSuccess: (success) => {
        setSuccess(true)
      },onError: (error) => {
        switch(error?.response.status) {
          case 401:
            return window.location.href = "/del_login"
            break
          case 410:
            setExpired(true)
            break
          case 404:
            return signOutDel()
            break
          default:
            setError(true)
            break
        }
      },
    })  



  return {
    deleteAcc:mutate,
    Expired,
    Error,
    isLoading,
    Success
  }
}

export default useLoginController
