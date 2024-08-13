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
    // 最后一次不满size个,也就是最后chunk还有值
    if (chunk.length > 0) ans.push(chunk)
    return ans
  }

  function difference(array, ...values) {
    let ans = []
    let set = new Set()
    for (let i = 0; i < values.length; i++) {
      let value = values[i]
      for (let val of value) {
        set.add(val)
      }
    }
    for (let i = 0; i < array.length; i++) {
      if (!set.has(array[i])) {
        ans.push(array[i])
      }
    }
    return ans
  }

  function differenceBy(array, ...values) {
    if (typeof values.at(-1) === 'string') {
      iterater = this.property(values.pop())
    } else if (typeof values.at(-1) === 'function') {
      iterater = values.pop()
    } else {
      iterater = it => it
    }
    let ans = []
    let set = new Set()
    for (let i = 0; i < values.length; i++) {
      let value = values[i]
      for (let val of value) {
        set.add(val)
      }
    }
    for (let i = 0; i < array.length; i++) {
      let flag = true
      for (let item of set) {
        if (iterater(array[i]) === iterater(item)) {
          flag = false
          break
        }
      }
      if (flag) ans.push(array[i])
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
        predicate = this.matchesProperty(predicate)
      } else {
        predicate = this.matches(predicate)
      }
    } else if (typeof predicate === 'function') {
      predicate = predicate
    } else {
      predicate = this.property(predicate)
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
        predicate = this.matchesProperty(predicate)
      } else {
        predicate = this.matches(predicate)
      }
    } else if (typeof predicate === 'function') {
      predicate = predicate
    } else {
      predicate = this.property(predicate)
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
    function fn(array, depth, cnt = 0) {
      cnt++
      let newArr = []
      for (let i = 0; i < array.length; i++) {
        let item = array[i]
        if (Array.isArray(item) && cnt <= depth) {
          for (let it of fn(item, depth, cnt)) {
            newArr.push(it)
          }
        } else {
          newArr.push(item)
        }
      }
      return newArr
    }
    return fn(array, depth)
  }

  function fromPairs(pairs) {
    let obj = {}
    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i]
      obj[pair[0]] = pair[1]
    }
    return obj
  }

  function toPairs(obj) {
    let arr = []
    if (obj instanceof Map) {
      arr.push(...obj)
    } else if (obj instanceof Set) {
      arr.push(...obj.entries())
    } else if (obj instanceof Object) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          arr.push([key, obj[key]])
        }
      }
    }
    return arr
  }

  function head(array) {
    return array[0]
  }

  function indexOf(array, value, fromIndex = 0) {
    if (fromIndex < 0) fromIndex = fromIndex + array.length
    for (let i = fromIndex < 0 ? 0 : fromIndex; i < array.length; i++) {
      if (array[i] === value) {
        return i
      }
    }
    return -1
  }

  function lastIndexOf(array, value, fromIndex = array.length - 1) {
    if (fromIndex < 0) fromIndex = fromIndex + array.length
    for (let i = fromIndex < 0 ? 0 : fromIndex; i >= 0; i--) {
      if (array[i] === value) return i
    }
    return -1
  }

  function initial(array) {
    let arr = []
    for (let i = 0; i < array.length - 1; i++) {
      arr.push(array[i])
    }
    return arr
  }

  function join(array, separator = ',') {
    let res = ''
    if (typeof separator !== 'string') separator = separator.toString()
    for (let i = 0; i < array.length; i++) {
      if (i == 0) {
        res += array[i]
      } else {
        res += separator + array[i]
      }
    }
    return res
  }

  function last(array) {
    return array.at(-1)
  }

  function pull(array, ...values) {
    let dummy = []
    for (let i = 0; i < array.length; i++) {
      let val = array[i]
      if (values.indexOf(val) === -1) {
        dummy.push(val)
      }
    }
    array = dummy
    return array
  }

  function reverse(array) {
    let n = array.length
    let midIdx = Math.floor(n / 2) // 拿到中间的索引
    for (let i = 0; i < midIdx; i++) {
      // 交换位置
      let temp = array[i]
      array[i] = array[n - 1 - i]
      array[n - 1 - i] = temp
    }
    return array
  }

  function every(array, predicate = it => it) {
    if (typeof predicate === 'object' && predicate !== null) {
      if (Array.isArray(predicate)) {
        predicate = this.matchesProperty(predicate)
      } else {
        predicate = this.matches(predicate)
      }
    } else if (typeof predicate === 'number' || typeof predicate === 'string') {
      predicate = this.property(predicate)
    } else if (predicate === null) {
      predicate = it => it
    }
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      if (!predicate(item)) return false
    }
    return true
  }

  function some(array, predicate = it => it) {
    if (typeof predicate === 'object' && predicate !== null) {
      if (Array.isArray(predicate)) {
        predicate = this.matchesProperty(predicate)
      } else {
        predicate = this.matches(predicate)
      }
    } else if (typeof predicate === 'number' || typeof predicate === 'string') {
      predicate = this.property(predicate)
    } else if (predicate === null) {
      predicate = it => it
    }
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      if (predicate(item)) return true
    }
    return false
  }

  function countBy(collection, iterater = it => it) {
    if (typeof iterater === 'object' && iterater !== null) {
      if (Array.isArray(iterater)) {
        iterater = this.matchesProperty(iterater)
      } else {
        iterater = this.matches(iterater)
      }
    } else if (typeof iterater === 'number' || typeof iterater === 'string') {
      iterater = this.property(iterater)
    } else if (iterater === null) {
      iterater = it => it
    }
    let ans = {}
    if (typeof collection === 'object' && collection !== null) {
      // 数组
      if (Array.isArray(collection)) {
        for (let val of collection) {
          let key = iterater(val)
          ans[key] = (ans[key] || 0) + 1
        }
      } else {
        // 对象
        for (let key in collection) {
          if (collection.hasOwnProperty(key)) {
            key = iterater(collection[key]) // 转换后的Key
            ans[key] = (ans[key] || 0) + 1
          }
        }
      }
    }
    return ans
  }

  function groupBy(collection, iterater = it => it) {
    if (typeof iterater === 'object' && iterater !== null) {
      if (Array.isArray(iterater)) {
        iterater = this.matchesProperty(iterater)
      } else {
        iterater = this.matches(iterater)
      }
    } else if (typeof iterater === 'number' || typeof iterater === 'string') {
      iterater = this.property(iterater)
    } else if (iterater === null) {
      iterater = it => it
    }
    let ans = {}
    if (typeof collection === 'object' && collection !== null) {
      if (Array.isArray(collection)) {
        for (let val of collection) {
          let key = iterater(val)
          if (ans[key]) {
            ans[key].push(val)
          } else {
            ans[key] = [val]
          }
        }
      } else {
        for (let key in collection) {
          if (collection.hasOwnProperty(key)) {
            let val = collection[key]
            key = iterater(collection[key])
            if (ans[key]) {
              ans[key].push(val)
            } else {
              ans[key] = [val]
            }
          }
        }
      }
    }
    return ans
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
    fromPairs: fromPairs,
    toPairs: toPairs,
    head: head,
    indexOf: indexOf,
    lastIndexOf: lastIndexOf,
    initial: initial,
    join: join,
    last: last,
    pull: pull,
    reverse: reverse,
    every: every,
    some: some,
    countBy: countBy,
    groupBy: groupBy,
  }
})()
