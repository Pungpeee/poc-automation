import { useMutation } from "react-query"
import { requestWithCredential } from "../apis/client"

const useSignout = () => {

    const { mutate } = useMutation(() => {
        return requestWithCredential.post('/api/account/logout/mobile/')
    }, {
        onSuccess: () => window.location.href = '/',
    })

    return {
        signOut: mutate
    }

}

export default useSignout