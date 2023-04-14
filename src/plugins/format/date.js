// allow string or Date
function isValidDate(date) {
  return Object.prototype.toString.call(date) === '[object Date]'
}
export function commonTime(date) {
  // type check
  if ((typeof date === 'string') | (typeof date === 'number'))
    date = new Date(date)
  if (!isValidDate(date))
    throw new Error(
      'commonTime: args must be legal time string, number or Date object'
    )

  return date.toLocaleString('zh-tw', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}
