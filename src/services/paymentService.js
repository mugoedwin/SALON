const apiBaseUrl = (
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:4000"
).replace(/\/$/, "");

export const mpesaDepositAmountKes = Number(
  import.meta.env.VITE_MPESA_DEPOSIT_AMOUNT_KES || 1,
);

export async function initiateMpesaStkPush({
  phone,
  amount,
  accountReference,
  transactionDesc,
}) {
  const response = await fetch(`${apiBaseUrl}/api/payments/mpesa/stk-push`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone,
      amount,
      accountReference,
      transactionDesc,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.status !== "success") {
    throw new Error(data.message || "Could not send the M-Pesa prompt.");
  }

  return data.mpesa;
}
