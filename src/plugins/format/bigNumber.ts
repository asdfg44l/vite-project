import BigNumber from 'bignumber.js'

type RoundMode =
  | 'ROUND_UP'
  | 'ROUND_DOWN'
  | 'ROUND_CEIL'
  | 'ROUND_FLOOR'
  | 'ROUND_HALF_UP'
  | 'ROUND_HALF_DOWN'
  | 'ROUND_HALF_EVEN'
  | 'ROUND_HALF_CEIL'
  | 'ROUND_HALF_FLOOR'

/**
 *  使用 BigNumber轉換數字成不包含 groupSeparator的字串，可自由決定小數點精度以及 Rounding_Mode
 *
 * Rounding_Mode
 * ```
 * ROUND_UP：向遠離零的方向取整
 * ROUND_DOWN：向靠近零的方向取整
 * ROUND_CEIL：向正無限大的方向取整
 * ROUND_FLOOR：向負無限大的方向取整
 * ROUND_HALF_UP：取整到最接近的整數，如果距離兩邊相等，向遠離零的方向取整
 * ROUND_HALF_DOWN：取整到最接近的整數，如果距離兩邊相等，向靠近零的方向取整
 * ROUND_HALF_EVEN：取整到最接近的整數，如果距離兩邊相等，向最接近的偶數方向取整
 * ROUND_HALF_CEIL：取整到最接近的整數，如果距離兩邊相等，向正無限大的方向取整
 * ROUND_HALF_FLOOR：取整到最接近的整數，如果距離兩邊相等，向負無限大的方向取整
 * ```
 * */
export function numberOnly(
  number: number | string | BigNumber,
  decimal = 5,
  roundModeString: RoundMode = 'ROUND_HALF_UP'
) {
  const fmt = {
    decimalSeparator: '.',
    groupSeparator: '',
  }

  const roundMode = BigNumber[roundModeString]

  return new BigNumber(number.toString()).toFormat(decimal, roundMode, fmt)
}

export function numberADD(args: (number | string)[], decimal = 5) {
  const result = args.reduce((acc: BigNumber, cur: string | number) => {
    acc = acc.plus(new BigNumber(cur))
    return acc
  }, new BigNumber(0))

  return numberOnly(result, decimal)
}
