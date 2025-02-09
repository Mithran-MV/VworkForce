import { Client, resources } from "coinbase-commerce-node";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { agentName, agentPrice } = req.body;
  const Charge = resources.Charge;

  Client.init(process.env.COINBASE_COMMERCE_API_KEY);

  try {
    const charge = await Charge.create({
      name: agentName,
      description: `Purchase ${agentName}`,
      local_price: { amount: agentPrice, currency: "ETH" },
      pricing_type: "fixed_price",
      redirect_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/marketplace`,
    });

    console.log("Charge response:", charge); // Debugging log

    if (!charge || !charge.hosted_url) {
      throw new Error("Charge response does not contain hosted_url");
    }

    return res.status(200).json({ checkoutUrl: charge.hosted_url });
  } catch (error) {
    console.error("Error creating checkout:", error.message);
    return res.status(500).json({ error: "Payment failed" });
  }
}
