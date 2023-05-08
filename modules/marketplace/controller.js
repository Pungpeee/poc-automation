import { useQueryNFT } from "../../adapter/query"
import { useMutationGetNFT } from "../../adapter/mutation"
import { requestNFT } from "../../apis/client"
import { nftApi } from "../../apis"
import { useMutation } from "react-query"
import axios from "axios"
import { useState } from "react"
import { getNFT } from "../../apis/nft"
import { get } from "lodash"
import { ConstructionOutlined } from "@mui/icons-material"

export const useNFTMarketplace = () => {
  const [results, setresults] = useState([])
  const [nftData, setNFTData] = useState([])
  const { data: contract } = useQueryNFT({
    options: {
      onSuccess: (s) => {
        s.data.contract_list.forEach((d) => {
          getNFT(d.contract)
        })
      },
    },
  })

  const getNFT = async (data) => {
    const response = await requestNFT.post("/v2/nft/nft_owner_info", {
      contract: data,
    })
    //   .then((a) => {
    //     a.data.nft_list.results.forEach((d) => {
    //       setresults((s) => [...s, d])
    //     })
    //   })
    // return console.log(response.data.nft_list.results)
    return response.data.nft_list.results.forEach((d) => {
      getNFTdata(d)
      // setresults((s) => [...s, d])
    })
  }

  const getNFTdata = async (link) => {
    const res = await axios.get(link)
    return setNFTData((s) => [...s, res.data])
  }

  return { contract, results, nftData }
}