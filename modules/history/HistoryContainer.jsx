import { styled } from "@mui/lab/node_modules/@mui/system"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Card, Text } from "../../components"
import { DateTimeColumn, DetailColumn, StatusColumn, TypeColumn } from "./view"
import { COLORS } from "../../theme"
import dayjs from "dayjs"
import { Box } from "@mui/system"
import { useHistoryContainer } from "./controller"
import InfiniteScroll from "react-infinite-scroll-component"

const HistoryContainer = ({ filterCoin }) => {
  const { filterHistory, hasNextPage, fetchNextPage } = useHistoryContainer({ filterCoin })

  return (
    <InfiniteScroll next={fetchNextPage} hasMore={hasNextPage} dataLength={filterHistory.length}>
      <Box display={{ xs: "none", md: "block" }}>
        <TableContainer component={TableWrapper}>
          <Table>
            <TableHead>
              <TableRow
                sx={{ ["& th:first-child"]: { borderLeft: "unset" }, ["& th:last-child"]: { borderRight: "unset" } }}
              >
                <TableHeadCellStyled sx={{ width: 300 }}>
                  <Text type="12" color={"gray400"}>
                    DATE/TIME
                  </Text>
                </TableHeadCellStyled>
                <TableHeadCellStyled align="center">
                  <Text type="12" color={"gray400"}>
                    TYPE
                  </Text>
                </TableHeadCellStyled>
                <TableHeadCellStyled align="center">
                  <Text type="12" color={"gray400"}>
                    AMOUNT
                  </Text>
                </TableHeadCellStyled>
                <TableHeadCellStyled align="left" sx={{ paddingLeft: "20px", width: 300 }}>
                  <Text type="12" color={"gray400"}>
                    STATUS
                  </Text>
                </TableHeadCellStyled>
              </TableRow>
            </TableHead>
            <TableBody sx={{ ["& tr:last-child"]: { ["& td"]: { borderBottom: "unset" } } }}>
              {filterHistory.map((row) => (
                <TableRow
                  sx={{ ["& td:first-child"]: { borderLeft: "unset" }, ["& td:last-child"]: { borderRight: "unset" } }}
                  key={row.id}
                >
                  <TableCellStyled>
                    <DateTimeColumn
                      dateText={dayjs(row.datetime_create).format("DD MMM YYYY")}
                      timeText={dayjs(row.datetime_create).format("HH:mm:ss")}
                      status={row.status}
                    />
                  </TableCellStyled>
                  <TableCellStyled align="center">
                    <TypeColumn method={row.method} status={row.status} />
                  </TableCellStyled>
                  <TableCellStyled align="center">
                    <DetailColumn amount={row.values} thbValue={row.thb_values} status={row.status} symbol={row.coin} />
                  </TableCellStyled>
                  <TableCellStyled align="left" sx={{ paddingLeft: "20px" }}>
                    <StatusColumn id={row.id} status={row.status} />
                  </TableCellStyled>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box display={{ xs: "block", md: "none" }}>
        <Card sx={{ padding: "12px 8px" }}>
          <Box display="flex" flexDirection="column" gap="12px">
            {filterHistory.map((data, index) => {
              const isLast = index === filterHistory.length - 1
              return (
                <Box key={data.id} display="flex" flexDirection="column" gap="15px">
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <DetailColumn
                        amount={data.values}
                        thbValue={data.thb_values}
                        status={data.status}
                        symbol={data.coin}
                      />
                      <DateTimeColumn
                        dateText={dayjs(data.datetime_create).format("DD MMM YYYY")}
                        timeText={dayjs(data.datetime_create).format("hh:mm:ss")}
                        status={data.status}
                      />
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="flex-end">
                      <TypeColumn method={data.method} status={data.status} />
                      <StatusColumn id={data.id} status={data.status} />
                    </Box>
                  </Box>
                  {!isLast && <Divider />}
                </Box>
              )
            })}
          </Box>
        </Card>
      </Box>
    </InfiniteScroll>
  )
}

const TableWrapper = (props) => {
  return <WrapperStyled {...props} />
}

const WrapperStyled = styled("div")({
  background: "#fff",
  borderRadius: "10px",
  padding: "16px",
})

const TableCellStyled = styled(TableCell)({
  border: `1px solid ${COLORS.GRAY200}`,
  padding: "10px 0px",
  height: "50px",
})

const TableHeadCellStyled = styled(TableCell)({
  border: `1px solid ${COLORS.GRAY200}`,
  borderTop: "unset",
  padding: 0,
  height: "26px",
})

const Divider = styled("div")({
  width: "100%",
  height: "1px",
  background: COLORS.GRAY200,
})

export default HistoryContainer
