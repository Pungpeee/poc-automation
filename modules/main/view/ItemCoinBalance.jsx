import { Avatar, styled } from "@mui/material"
import { Box } from "@mui/system"
import Image from "next/image"
import { Text } from "../../../components"
import Card from "../../../components/Card"

const ItemCoinBalance = (props) => {
  const { coinName, balance, balanceThb, pendingNoti = {}, icon } = props
  const isPending = pendingNoti[coinName ?? ""] == -1 || pendingNoti[coinName ?? ""] == 1

  return (
    <>
      <Card sx={{ padding: "16px 30px 16px 24px", borderRadius: "10px" }}>
        <ItemWrapper>
          <Avatar src={icon} />

          <Content>
            <ContentItem>
              <Text color="primary" type="20" fontWeight={700}>
                {coinName}
              </Text>
              <Text color="black" type="28" fontWeight={700}>
                {balance}
              </Text>
            </ContentItem>
            <BalanceItem>
              <Text color="gray400" type="18">
                BALANCE
              </Text>
              <Text color="gray400" type="14">
                ({balanceThb}฿)
              </Text>
            </BalanceItem>

            <Box display="flex" justifyContent="flex-end">
              {isPending && (
                <Box display="flex" position="relative" top={{ xs: "60px", md: "unset" }} alignItems="center" gap="4px">
                  <Text color="red100" type="10">
                    PENDING TRANSACTION
                  </Text>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5 9.16667C7.30119 9.16667 9.16667 7.30119 9.16667 5C9.16667 2.69881 7.30119 0.833333 5 0.833333C2.69881 0.833333 0.833333 2.69881 0.833333 5C0.833333 7.30119 2.69881 9.16667 5 9.16667ZM5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10Z"
                      fill="#F85565"
                    />
                    <path
                      d="M4.18487 2H5.83193V6H4.18487V2ZM4.9916 8.61344C4.71148 8.61344 4.47619 8.51821 4.28571 8.32773C4.09524 8.13725 4 7.90196 4 7.62185C4 7.34174 4.09524 7.10644 4.28571 6.91597C4.47619 6.72549 4.71148 6.63025 4.9916 6.63025C5.27171 6.63025 5.507 6.72549 5.69748 6.91597C5.89916 7.10644 6 7.34174 6 7.62185C6 7.90196 5.89916 8.13725 5.69748 8.32773C5.507 8.51821 5.27171 8.61344 4.9916 8.61344Z"
                      fill="#F85565"
                    />
                  </svg>
                </Box>
              )}
            </Box>
          </Content>
        </ItemWrapper>
      </Card>
    </>
  )
}

export default ItemCoinBalance

const ItemWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 24,
  minHeight: 136,
  [theme.breakpoints.down("md")]: {
    alignItems: "flex-start",
  },
}))

const Content = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: 2,
  alignContent: "flex-end",
})

const ContentItem = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",

  [theme.breakpoints.down("md")]: {
    "& span:last-child": {
      position: "relative",
      top: "60px",
    },
  },
}))

const BalanceItem = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  "& span:first-child": {
    marginTop: "-20px",
  },
  "& span:last-child": {
    marginTop: "-12px",
  },
  [theme.breakpoints.down("md")]: {
    "& span:last-child": {
      top: "60px",
      position: "relative",
    },
  },
}))
