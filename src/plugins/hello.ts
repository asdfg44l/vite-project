export function plusFloat(num1: number, num2: number) {
  const digits = Math.max(
    `${num1}`.split('.')[1].length,
    `${num2}`.split('.')[1].length
  )
  return (num1 * 10 ** digits + num2 * 10 ** digits) / 10 ** digits
}
