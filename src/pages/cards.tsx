import { parse } from "cookie";
import React, { ReactNode } from "react";

import CardsWidget from "../components/Stripe/CardsWidget";
import DashboardLayout from "../layouts/dashboard/layout";
import { decode } from "../utils/jwt_encode_decode";
import { getCards } from "../utils/stripe_helpers";

export async function getServerSideProps(context: any) {
  if ("cookie" in context.req.headers) {
    const cookie = parse(context.req.headers.cookie);
    if ("app_auth" in cookie) {
      const session = decode(cookie.app_auth);
      // @ts-expect-error Remove after deployment succeeds
      if (session.requiresOnboarding === true) {
        return {
          redirect: {
            destination: "/onboard",
          },
        };
      }
      // There is no accountId here? It's customerId, tho
      // @ts-expect-error Remove after deployment succeed
      const StripeAccountID = session.accountId;
      const responseCards = await getCards(StripeAccountID);
      return {
        props: {
          cards: responseCards.cards.data,
          account: StripeAccountID,
        }, // will be passed to the page component as props
      };
    }
  }
  return {
    redirect: {
      destination: "/auth/login",
    },
  };
}

const Page = (props: any) => {
  return (
    <>
      <CardsWidget cards={props.cards} />
    </>
  );
};

Page.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
