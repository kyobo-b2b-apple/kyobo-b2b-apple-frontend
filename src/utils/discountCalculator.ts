interface CalculatorProps {
  price: number;
  dcratio: number;
}

export function discountCalc({ price, dcratio }: CalculatorProps): number {
  const calcedPrice = price * ((100 - dcratio) / 100);
  return calcedPrice;
}
