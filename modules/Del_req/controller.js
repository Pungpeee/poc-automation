import { useMutation } from "react-query"
import { requestWithCredential } from "../../apis/client"
import useSignout from "../../hooks/useSignout"

const useReqController = () => {
  const { signOut } = useSignout()
  const { mutate } = useMutation(() => {
    return requestWithCredential.post("/api/account/delete/request/")
  }, {
    onSuccess: (success) => { 
      return window.location.href = "/"
      // signOut()
    },
  })  

  return {
    DeleteReq : mutate
  }
}

export default useReqController
