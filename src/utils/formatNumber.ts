//function to make the coins truncated
export function formatCoinAmount(amount: number): string {
  if (amount >= 1_000_000) {
    return (amount / 1_000_000).toFixed(1) + "M";
  }
  if (amount >= 1_000) {
    return (amount / 1_000).toFixed(1) + "k";
  }
  return amount.toString();
}