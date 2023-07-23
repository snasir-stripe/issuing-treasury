const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: any, res: any) {
  const accountId = req.body.accountId;
  const cardId = req.body.cardId;
  const nonce = req.body.nonce;

  const ephemeralKey = await stripe.ephemeralKeys.create(
    {
      nonce: nonce,
      issuing_card: cardId,
    },
    {
      stripeAccount: accountId,
      apiVersion: "2022-08-01",
    },
  );

  // Check if we have a result
  if (ephemeralKey) {
    res.status(200).send(ephemeralKey);
  } else {
    res.status(500).json({ statusCode: 500, message: "Error" });
  }
}
