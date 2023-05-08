import React from "react"
import { Box } from "@mui/material"
import Image from "next/image"
import Text from "./Text"

const Tag = ({ passed, label }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "18px",
        marginBottom: "18px",
      }}
    >
      {passed ? (
        <Image src="/condition_passed.svg" alt=" " width={21} height={21} />
      ) : (
        <Image src="/condition_empty.svg" alt=" " width={21} height={21} />
      )}
      <Text type="14" fontWeight={14} color="meta">
        {label}
      </Text>
    </Box>
  )
}

export default Tag
