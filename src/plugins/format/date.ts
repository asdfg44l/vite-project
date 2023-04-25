import type { Dayjs, ManipulateType } from 'dayjs'
import dayjs from 'dayjs'

type DayType = string | number | Date | Dayjs

export function commonTime(date: DayType, seperator = '-') {
  return dayjs(date).format(`YYYY${seperator}MM${seperator}DD`)
}

export function AddTime(date: DayType, number: number, unit: ManipulateType) {
  return commonTime(dayjs(date).add(number, unit))
}
