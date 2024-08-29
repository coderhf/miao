this.addEventListener('message', e => {
  let reg = e.data.reg
  let string = e.data.string
  let matches = []
  let match
  while (match = reg.exec(string)) {
    matches.push(match)
    match.lastIndex = reg.lastIndex
    if (reg.global === false) {
      break
    }
  }
  // 把数据传过去
  this.postMessage(matches)
})
