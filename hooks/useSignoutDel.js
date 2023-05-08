import { useMutation } from "react-query"
import { requestWithCredential } from "../apis/client"

const useDelSignout = () => {

    const { mutate } = useMutation(() => {
        return requestWithCredential.post('/api/account/logout/mobile/')
    }, {
        onSuccess: () => window.location.href = '/del_login',
        onError:(error)=>{
            console.log(error.response)
        }
    })
 
    return {
        signOutDel: mutate
    }

}

export default useDelSignout