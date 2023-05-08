import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "react-query"

import { termApi } from "../../apis"
import { formValidate } from "../../utils/formValidate"

const useDeleteController = () => {
    const router = useRouter()
    const [Test,settest] = useState()
    const {token} = router.query
    
    const test =()=>{
        console.log(`Test from Controller ${token}`)
    }
    

    return{
        test,
    }
}

export default useDeleteController
