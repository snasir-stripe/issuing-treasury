import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { format, fromUnixTime } from "date-fns";
import Stripe from "stripe";

import { SeverityPill } from "../../components/severity-pill";
import { formatUSD } from "../../utils/format";

import TransactionFlowDetails from "./transaction-flow-details";

const statusMap: Record<string, "warning" | "success" | "error" | "info"> = {
  open: "warning",
  posted: "success",
  void: "error",
};

export const OverviewLatestTransactions = (props: {
  faTransactions: Stripe.Treasury.Transaction[];
  sx?: object;
}) => {
  const { faTransactions = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Transactions" />
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sortDirection="desc">Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {faTransactions.map((transaction) => {
              const createdAt = format(
                fromUnixTime(transaction.created),
                "dd/MM/yyyy",
              );

              return (
                <TableRow hover key={transaction.id}>
                  <TableCell>{createdAt}</TableCell>
                  <TableCell>
                    {`${formatUSD(transaction.amount / 100)} USD`}
                  </TableCell>
                  <TableCell sx={{ textTransform: "uppercase" }}>
                    <TransactionFlowDetails transaction={transaction} />
                  </TableCell>
                  <TableCell>
                    <SeverityPill color={statusMap[transaction.status]}>
                      {transaction.status}
                    </SeverityPill>
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};
