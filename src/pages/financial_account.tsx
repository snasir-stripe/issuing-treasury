import {
  Card,
  CardContent,
  Stack,
  Typography,
  Chip,
  CardHeader,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { JwtPayload } from "jsonwebtoken";
import { GetServerSidePropsContext } from "next";
import React, { ReactNode } from "react";
import Stripe from "stripe";

import DashboardLayout from "src/layouts/dashboard/layout";
import { withAuthRequiringOnboarded } from "src/middleware/auth-middleware";
import { OverviewFinancialAccountBalance } from "src/sections/overview/overview-fa-balance";
import { OverviewFinancialAccountOutboundPending } from "src/sections/overview/overview-fa-outbound-pending";
import { OverviewLatestTransactions } from "src/sections/overview/overview-latest-transactions";
import {
  getFinancialAccountDetailsExp,
  getFinancialAccountTransactionsExpanded,
} from "src/utils/stripe_helpers";

export const getServerSideProps = withAuthRequiringOnboarded(
  async (context: GetServerSidePropsContext, session: JwtPayload) => {
    const StripeAccountID = session.accountId;

    const responseFaDetails = await getFinancialAccountDetailsExp(
      StripeAccountID,
    );
    const financialAccount = responseFaDetails.financialaccount;

    const responseFaTransations = await getFinancialAccountTransactionsExpanded(
      StripeAccountID,
    );
    const faTransactions = responseFaTransations.fa_transactions;

    return {
      props: { financialAccount, faTransactions },
    };
  },
);

const Page = ({
  financialAccount,
  faTransactions,
}: {
  financialAccount: Stripe.Treasury.FinancialAccount;
  faTransactions: Stripe.Treasury.Transaction[];
}) => {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <OverviewFinancialAccountBalance
                sx={{ height: "100%" }}
                value={financialAccount.balance.cash.usd}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <OverviewFinancialAccountOutboundPending
                sx={{ height: "100%" }}
                value={financialAccount.balance.outbound_pending.usd}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Card sx={{ height: "100%" }}>
                <CardHeader title="Account Information" />
                <List sx={{ p: 0 }}>
                  <ListItem divider={true} sx={{ px: 3, py: 1.5 }}>
                    <ListItemText
                      sx={{ m: 0 }}
                      primary={
                        <Typography variant="subtitle2">
                          Account Holder Name
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ mt: 0.5 }}>
                          <Typography variant="body2" color="text.secondary">
                            {
                              financialAccount.financial_addresses[0].aba
                                ?.account_holder_name
                            }
                          </Typography>
                        </Box>
                      }
                      disableTypography={true}
                    ></ListItemText>
                  </ListItem>
                  <ListItem sx={{ px: 3, py: 1.5 }}>
                    <ListItemText
                      sx={{ m: 0 }}
                      primary={
                        <Typography variant="subtitle2">
                          Routing Number
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ mt: 0.5 }}>
                          <Typography variant="body2" color="text.secondary">
                            {
                              financialAccount.financial_addresses[0].aba
                                ?.routing_number
                            }
                          </Typography>
                        </Box>
                      }
                      disableTypography={true}
                    ></ListItemText>
                  </ListItem>
                </List>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Stack spacing={1} textAlign="center">
                    <Typography color="text.secondary" variant="overline">
                      Supported Networks
                    </Typography>
                    {financialAccount.financial_addresses[0].supported_networks?.map(
                      (network, i) => (
                        <Chip
                          key={i}
                          sx={{ ml: 1 }}
                          label={network.toUpperCase().replace(/_/g, " ")}
                          color="primary"
                          variant="outlined"
                        />
                      ),
                    )}
                    <Button variant="contained">Send Money</Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <OverviewLatestTransactions faTransactions={faTransactions} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
