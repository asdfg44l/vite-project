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

export function numberOnly(
  number: number | string,
  decimal = 5,
  roundModeString?: RoundMode
) {
  const fmt = {
    decimalSeparator: '.',
    groupSeparator: '',
  }

  if (roundModeString) {
    const roundMode = BigNumber[roundModeString]
    return new BigNumber(number).toFormat(decimal, roundMode, fmt)
  }
  return new BigNumber(number).toFormat(decimal, fmt)
}
