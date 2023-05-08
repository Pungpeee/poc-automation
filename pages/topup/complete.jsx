import { Container } from "@mui/material"
import { Box } from "@mui/system"
import Link from "next/link"
import React from "react"
import { Text, Button, Card } from "../../components"

const TopupComplete = () => {
  return (
    <Container>
      <Text type="36" fontWeight={700} color="black">
        TOP-UP
      </Text>
      <Card sx={{ padding: { md: "60px", xs: "16px" }, marginTop: "36px" }}>
        <Box display="flex" pb="24px" justifyContent="center">
          <svg width="83" height="83" viewBox="0 0 83 83" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="41.5" cy="41.5" r="41.5" fill="#00B299" />
            <path
              d="M64.8189 27.666L33.8421 57.7041L19.7617 44.0504"
              stroke="white"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>
        <Box display="flex" pb="12px" justifyContent="center">
          <Text textAlign="center" type="20" color="primary" fontWeight={700}>
            Completed!
          </Text>
        </Box>
        <Box display="flex" pb="40px" justifyContent="center">
          <Text textAlign="center" type="16" color="primary">
            We received your payment. Please wating for confirmation within 24 hours
          </Text>
        </Box>

        <Link href="/" passHref>
          <Box width="100%" maxWidth="370px" margin="auto">
            <Button fullWidth variant="contained">
              Back to home
            </Button>
          </Box>
        </Link>
      </Card>
    </Container>
  )
}

export default TopupComplete
