let observer
export const IntersectionObserver = {
  mounted(el, binding) {
    let {
      onEntry = null,
      onLeave = null,
      view = null,
      viewMargin = '',
      threshold = 0.3,
      times = Infinity, // 是否只執行一次
    } = binding.value
    // viewRange option
    const options = {
      root: view, // 可視範圍
      rootMargin: viewMargin, // 可視範圍邊界
      threshold, // 目標元素可視比例
    }
    observer = new window.IntersectionObserver((entries, observer) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          // 目標進入可視範圍時執行
          if (onEntry) {
            onEntry()
          }
          if (isFinite(times)) {
            times--
          }
          if (times === 0) {
            observer.unobserve(entry.target)
          }
        } else {
          // 目標離開可視範圍時執行
          if (onLeave) {
            onLeave()
          }
        }
      })
    }, options)
    observer.observe(el)
  },
  unmounted() {
    observer.disconnect()
  },
}
