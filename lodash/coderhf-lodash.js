// 立即执行函数
const coderhf = (function () {
  function compact(array) {
    let arr = []
    for (let i = 0; i < array.length; i++) {
      if (array[i]) {
        arr.push(array[i])
      }
    }
    return arr
  }





  return {
    compact: compact,
  }
}())
