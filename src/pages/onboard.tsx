import { parse, serialize } from "cookie";
import React from "react";

import OnboardWidget from "../components/Stripe/OnboardWidget";
import { decode, encode } from "../utils/jwt_encode_decode";
import { createAccountOnboardingUrl } from "../utils/stripe_helpers";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function getServerSideProps(context: any) {
  if ("cookie" in context.req.headers) {
    const cookie = parse(context.req.headers.cookie);
    if ("app_auth" in cookie) {
      const session = decode(cookie.app_auth);
      const StripeAccountID = session.accountId;
      const account = await stripe.accounts.retrieve(StripeAccountID);
      // Check if there are requirements due
      if (account.requirements.currently_due.length > 1) {
        // Create the onboarding link and redirect
        const url = await createAccountOnboardingUrl(
          account.id,
          process.env.DEMO_HOST,
        );
        return {
          props: {
            url: url,
          },
        };
      } else {
        // Renew cookie
        session.requiresOnboarding = false;
        const cookie = encode(session);
        context.res.setHeader(
          "Set-Cookie",
          serialize("app_auth", cookie, { path: "/", httpOnly: true }),
        );
        return {
          redirect: {
            destination: "/overview",
          },
        };
      }
    }
  }
  return {
    redirect: {
      destination: "/signin",
    },
  };
}

const Page = (props: any) => {
  return (
    <div>
      <OnboardWidget url={props.url} />
    </div>
  );
};

export default Page;
