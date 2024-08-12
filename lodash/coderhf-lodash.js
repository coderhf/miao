// 立即执行函数
let coderhf = (function () {
  function compact(array) {
    let arr = []
    for (let i = 0; i < array.length; i++) {
      if (array[i]) {
        arr.push(array[i])
      }
    }
    return arr
  }

  function chunk() {

  }




  return {
    compact: compact,
    chunk: chunk,

  }
}())
