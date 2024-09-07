addEventListener('message', e => {
  let reg = e.data.reg
  let string = e.data.string
  let matches = []
  let match
  let startTime = performance.now()
  while (match = reg.exec(string)) {
    matches.push(match)
    match.lastIndex = reg.lastIndex
    // 处理零宽断言会导致死循环，因为匹配的都是“”，index永远为index.不会变
    if (match[0].length === 0) {
    	reg.lastIndex++
    }
    // 不是全局匹配
    if (reg.global === false) {
      break
    }
  }
  let time = (performance.now() - startTime).toFixed(2)
  // 把数据传过去
  this.postMessage([matches, time])
})
