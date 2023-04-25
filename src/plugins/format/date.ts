import type { Dayjs, ManipulateType } from 'dayjs'
import dayjs from 'dayjs'

type DayType = string | number | Date | Dayjs

export function commonTime(date: DayType, separator = '-') {
  return dayjs(date).format(`YYYY${separator}MM${separator}DD`)
}

export function AddTime(date: DayType, number: number, unit: ManipulateType) {
  return commonTime(dayjs(date).add(number, unit))
}
