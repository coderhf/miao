// 立即执行函数
var coderhf = (function () {
  // 工具函数：深度判断两个数是否相等
  function isEqual(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
      // 如果数组长度不一样，直接返回false
      if (a.length !== b.length) {
        return false
      }
      // 遍历
      for (var i = 0; i < a.length; i++) {
        // 如果比较有一个是不同的，那么直接返回false
        if (!isEqual(a[i], b[i])) {
          return false
        }
      }
      // 遍历完成，如果都是相同的，那么直接返回true
      return true
    } else if (
      typeof a == 'object' &&
      a !== null &&
      b !== null &&
      typeof b == 'object'
    ) {
      // 对象长度不一样，直接返回false就可以了
      if (Object.keys(a).length !== Object.keys(b).length) {
        return false
      }
      // 遍历for in
      for (var key in a) {
        if (!(key in b) || !isEqual(a[key], b[key])) {
          return false
        }
      }
      return true
    }
    return a === b
  }
  // 工具函数，返回一个函数
  function matches(obj) {
    return function (o) {
      return isEqual(obj, o)
    }
  }
  // 工具函数，匹配一部分即可返回true
  function matchesProperty(arr) {
    return function (obj) {
      for (let i = 0; i < arr.length; i++) {
        if (i % 2 == 0) {
          let key = arr[i]
          let val = arr[i + 1]
          if (
            Object.prototype.hasOwnProperty.call(obj, key) &&
            obj[key] === val
          ) {
            return true
          }
        }
      }
      return false
    }
  }
  // 工具函数
  function property(key) {
    return function (obj) {
      return obj[key]
    }
  }
  function compact(array) {
    let arr = []
    for (let i = 0; i < array.length; i++) {
      if (array[i]) {
        arr.push(array[i])
      }
    }
    return arr
  }

  function chunk(array, size = 1) {
    let ans = []
    let chunk = []
    for (let i = 0; i < array.length; i++) {
      chunk.push(array[i])
      if (i % size === size - 1) {
        ans.push(chunk)
        chunk = []
      }
    }
    // 最后一次不满size个
    ans.push(chunk)
    return ans
  }

  function difference(array, values) {
    let ans = []
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      let flag = true
      for (let j = 0; j < values.length; j++) {
        if (item === values[j]) {
          flag = false
          break
        }
      }
      if (flag) {
        ans.push(item)
      }
    }
    return ans
  }

  function differenceBy(array, values, iterater) {
    let ans = []
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      let flag = true
      for (let j = 0; j < values.length; j++) {
        if (iterater(item) === iterater(values[j])) {
          flag = false
          break
        }
      }
      if (flag) {
        ans.push(item)
      }
    }
    return ans
  }

  function differenceWith(array, values, comparator) {
    let ans = []
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      let flag = true
      for (let j = 0; j < values.length; j++) {
        if (comparator(item, values[j])) {
          flag = false
          break
        }
      }
      if (flag) {
        ans.push(item)
      }
    }
    return ans
  }

  function drop(array, n = 1) {
    let ans = []
    for (let i = 0; i < array.length; i++) {
      if (i >= n) {
        ans.push(array[i])
      }
    }
    return ans
  }

  function dropRight(array, n = 1) {
    let ans = []
    let len = array.length - n
    for (let i = 0; i < array.length; i++) {
      if (i < len) {
        ans.push(array[i])
      }
    }
    return ans
  }

  function fill(array, value, start = 0, end = array.length) {
    for (let i = start; i < end; i++) {
      array[i] = value
    }
    return array
  }

  function findIndex(array, predicate, fromIndex = 0) {
    // 判断predicate的类型
    if (typeof predicate === 'object' && predicate !== null) {
      if (Array.isArray(predicate)) {
        predicate = coderhf.matchesProperty(predicate)
      } else {
        predicate = coderhf.matches(predicate)
      }
    } else if (typeof predicate === 'function') {
      predicate = predicate
    } else {
      predicate = coderhf.property(predicate)
    }
    for (let i = fromIndex; i < array.length; i++) {
      if (predicate(array[i])) {
        return i
      }
    }
    return -1
  }

  function findLastIndex(array, predicate, fromIndex = array.length - 1) {
    // 判断predicate的类型
    if (typeof predicate === 'object' && predicate !== null) {
      if (Array.isArray(predicate)) {
        predicate = coderhf.matchesProperty(predicate)
      } else {
        predicate = coderhf.matches(predicate)
      }
    } else if (typeof predicate === 'function') {
      predicate = predicate
    } else {
      predicate = coderhf.property(predicate)
    }
    for (let i = fromIndex; i >= 0; i--) {
      if (predicate(array[i])) {
        return i
      }
    }
    return -1
  }

  function flatten(array) {
    let newArr = []
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      if (Array.isArray(item)) {
        for (let j = 0; j < item.length; j++) {
          newArr.push(item[j])
        }
      } else {
        newArr.push(item)
      }
    }
    return newArr
  }

  function flattenDeep(array) {
    let newArr = []
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      if (Array.isArray(item)) {
        for (let it of flattenDeep(item)) {
          newArr.push(it)
        }
      } else {
        newArr.push(item)
      }
    }
    return newArr
  }

  function flattenDepth(array, depth = 1) {

  }

  return {
    isEqual: isEqual,
    matches: matches,
    matchesProperty: matchesProperty,
    property: property,
    compact: compact,
    chunk: chunk,
    difference: difference,
    differenceBy: differenceBy,
    differenceWith: differenceWith,
    drop: drop,
    dropRight: dropRight,
    fill: fill,
    findIndex: findIndex,
    findLastIndex: findLastIndex,
    flatten: flatten,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,

  }
})()
