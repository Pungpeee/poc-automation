import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation,useQuery} from "react-query"
import { useQueryprofile, useQueryTxDetail,getQueryDetail  } from "../../../adapter/query"
import { requestWithCredential } from "../../../apis/client"

export const Dialogcontroller =()=>{
    const [openTopup,setTopup] = useState(false)
    const [have_another_tx,setHavetx] = useState(false)
    const [Id,setId] = useState(0)

    const handleOpenTopupConfirm =(id)=>{
        setId(id)
        setTopup(true)
    }

    const { data: profileData } = useQueryprofile({})
    const { data: txdata} = getQueryDetail({
        payload: {
            id: profileData?.id,
          },
          options: {
            onSuccess:(success)=>{
                handleOpenTopupConfirm(success.results.filter(a => a.status == 1)[0].id)
                // console.log(success.results.filter(a => a.status == 1)[0].id)
                // setId(success.results.filter(a => a.status == 1)[0].id)
                // setTopup(true)
                // console.log(success.results[2])
                // console.log(tx_current)
            },
            // enabled:isError
            enabled:have_another_tx,
          },
    })

    const handleCloseTopupConfirm =()=>{
        setTopup(false)
    }

    return{
        handleCloseTopupConfirm,
        handleOpenTopupConfirm,
        setHavetx,
        have_another_tx,
        txdata,
        Id,
        openTopup,
        profileData
    }
}