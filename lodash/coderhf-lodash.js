// 立即执行函数
var coderhf = (function () {
  // 工具函数，根据数据类型，返回相应的函数
  function iterater(iterater) {
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
    return iterater
  }
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
    let _this = this // 保存谁调用的对象
    // 判断o中是否包含obj
    return function (o) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key) && o.hasOwnProperty(key)) {
          // 如果key值不相等，则返回false
          if (!_this.isEqual(obj[key], o[key])) {
            return false
          }
        }
      }
      return true
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
    let keys = key.split('.')
    return function (obj) {
      for (let key of keys) {
        obj = obj[key]
      }
      return obj
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

  function pullAll(array, values) {
    for (let i = array.length - 1; i >= 0; i--) {
      if (values.includes(array[i])) {
        array.splice(i, 1)
      }
    }
    return array
  }

  function pullAllBy(array, values, iteratee = it => it) {
    iteratee = this.iterater(iteratee)
    values = values.map(it => iteratee(it))
    for (let i = array.length - 1; i >= 0; i--) {
      if (values.includes(iteratee(array[i]))) {
        array.splice(i, 1)
      }
    }
  }

  function pullAllWith(array, values, comparator) {
    if (typeof comparator != 'function') return array
    for (let i = array.length - 1; i >= 0; i--) {
      let isDel = values.some(it => comparator(array[i], it))
      if (isDel) array.splice(i, 1)
    }
    return array
  }

  function pullAt(array, indexes) {
    if (!indexes) return array
    let ans = []
    for (let idx of indexes) {
      ans.push(array[idx])
    }
    this.pullAll(array, ans)
    return ans
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

  function keyBy(collection, iterater = it => it) {
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
        for (let item of collection) {
          let key = iterater(item)
          ans[key] = item
        }
      } else {
        for (let key in collection) {
          if (collection.hasOwnProperty(key)) {
            let val = collection[key]
            ans[iterater(val)] = val
          }
        }
      }
    }
    return ans
  }

  function forEach(collection, iteratee) {
    iteratee = this.iterater(iteratee)
    if (typeof collection === 'object' && collection !== null) {
      if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
          let bol = iteratee(collection[i], i, collection)
          if (bol === false) return collection
        }
      } else {
        for (let key in collection) {
          if (collection.hasOwnProperty(key)) {
            let bol = iteratee(collection[key], key, collection)
            if (bol === false) return collection
          }
        }
      }
    }
    return collection
  }

  function forEachRight(collection, iteratee) {
    iteratee = this.iterater(iteratee)
    if (typeof collection === 'object' && collection !== null) {
      if (Array.isArray(collection)) {
        for (let i = collection.length - 1; i >= 0; i--) {
          let bol = iteratee(collection[i], i, collection)
          if (bol === false) return collection
        }
      } else {
        let keys = Object.keys(collection)
        for (let i = keys.length - 1; i >= 0; i--) {
          let key = keys[i]
          let bol = iteratee(collection[key], key, collection)
          if (bol === false) return collection
        }
      }
    }
    return collection
  }

  function map(collection, iterater) {
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
    let ans = []
    if (typeof collection === 'object' && collection !== null) {
      if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
          ans.push(iterater(collection[i], i, collection))
        }
      } else {
        for (let key in collection) {
          if (collection.hasOwnProperty(key)) {
            ans.push(iterater(collection[key], key, collection))
          }
        }
      }
    }
    return ans
  }

  function filter(collection, iterater) {
    iterater = this.iterater(iterater)
    let ans = []
    if (typeof collection === 'object' && collection !== null) {
      if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
          let item = collection[i]
          if (iterater(item)) {
            ans.push(item)
          }
        }
      } else {
        for (let key in collection) {
          if (collection.hasOwnProperty(key)) {
            if (iterater(collection[key])) {
              ans.push(collection[key])
            }
          }
        }
      }
    }
    return ans
  }

  function reduce(collection, iterater, accumulator = 0) {
    iterater = this.iterater(iterater)
    let result = accumulator
    if (typeof collection === 'object') {
      if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
          let value = collection[i]
          result = iterater(result, value, i, collection)
        }
      } else {
        for (let key in collection) {
          if (collection.hasOwnProperty(key)) {
            let value = collection[key]
            result = iterater(result, value, key, collection)
          }
        }
      }
    }
    return result
  }

  function reduceRight(collection, iterater, accumulator = 0) {
    iterater = this.iterater(iterater)
    let result = accumulator
    if (typeof collection === 'object') {
      if (Array.isArray(collection)) {
        for (let i = collection.length - 1; i >= 0; i--) {
          let value = collection[i]
          result = iterater(result, value, i, collection)
        }
      } else {
        for (let key in collection) {
          if (collection.hasOwnProperty(key)) {
            let value = collection[key]
            result = iterater(result, value, key, collection)
          }
        }
      }
    }
    return result
  }

  function size(collection) {
    if (typeof collection === 'string' || Array.isArray(collection)) {
      return collection.length
    }
    if (typeof collection === 'object' && collection !== null) {
      let cnt = 0
      for (let key in collection) {
        if (collection.hasOwnProperty(key)) {
          cnt++
        }
      }
      return cnt
    }
  }

  function sortBy(collection, iteratees) {
    let res = collection.slice()
    for (let i = iteratees.length - 1; i >= 0; i--) {
      let iterater = this.iterater(iteratees[i])
      res = mergeSort(res, iterater)
    }
    return res

    function mergeSort(array, iterater = it => it) {
      // 结束条件
      if (array.length < 2) {
        return array
      }
      let midIdx = array.length >>> 1 // 拿到这个数组中间的索引
      let leftArray = array.slice(0, midIdx)
      let rightArray = array.slice(midIdx)

      mergeSort(leftArray, iterater)
      mergeSort(rightArray, iterater)

      // 排好序后进行左右比较，放入数组中
      let i = (j = k = 0)
      while (i < leftArray.length && j < rightArray.length) {
        if (iterater(leftArray[i]) <= iterater(rightArray[j])) {
          array[k++] = leftArray[i++]
        } else {
          array[k++] = rightArray[j++]
        }
      }
      // 两个数组中额外的内容还需要继续放入array中
      while (i < leftArray.length) {
        array[k++] = leftArray[i++]
      }

      while (j < rightArray.length) {
        array[k++] = rightArray[j++]
      }
      return array
    }
  }

  function sample(collection) {
    if (Array.isArray(collection)) {
      return collection[Math.floor(Math.random() * collection.length)]
    } else if (typeof collection === 'object' && collection !== null) {
      let res = []
      for (let key of collection) {
        if (collection.hasOwnProperty(key)) {
          res.push(key)
        }
      }
      let key = res[Math.floor(Math.random() * res.length)]
      return collection[key]
    }
  }

  function isUndefined(value) {
    return value === undefined
  }

  function isNull(value) {
    return value === null
  }

  function isNil(value) {
    return this.isUndefined(value) || this.isNull(value)
  }

  function max(array) {
    if (array.length == 0 || !Array.isArray(array)) return undefined
    let max = array[0]
    for (let i = 1; i < array.length; i++) {
      let val = array[i]
      if (max < val) {
        max = val
      }
    }
    return max
  }

  function min(array) {
    if (array.length == 0 || !Array.isArray(array)) return undefined
    let min = array[0]
    for (let i = 1; i < array.length; i++) {
      let val = array[i]
      if (min > val) {
        min = val
      }
    }
    return min
  }

  function maxBy(array, iterater) {
    if (array.length == 0 || !Array.isArray(array)) return undefined
    iterater = this.iterater(iterater)
    let max = array[0]
    for (let i = 1; i < array.length; i++) {
      if (iterater(max) < iterater(array[i])) {
        max = array[i]
      }
    }
    return max
  }

  function minBy(array, iterater) {
    if (array.length == 0 || !Array.isArray(array)) return undefined
    iterater = this.iterater(iterater)
    let min = array[0]
    for (let i = 1; i < array.length; i++) {
      if (iterater(min) > iterater(array[i])) {
        min = array[i]
      }
    }
    return min
  }

  function round(number, precision = 0) {
    let res = Math.pow(10, precision)
    return Math.round(number * res) / res
  }

  function sumBy(array, iterater) {
    iterater = this.iterater(iterater)
    let result = 0
    if (Array.isArray(array)) {
      for (let item of array) {
        let val = iterater(item)
        result += val
      }
    } else if (typeof array === 'string') {
      result = array
    } else {
      result = 0
    }
    return result
  }

  function flatMap(collection, iterater) {
    let result = []
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        let arr = iterater(collection[i], i, collection)
        if (Array.isArray(arr)) {
          result.push(...arr)
        } else {
          result.push(arr)
        }
      }
    } else if (typeof collection === 'object' && collection !== 'null') {
      for (let key of collection) {
        if (collection.hasOwnProperty(key)) {
          let arr = iterater(collection(key))
          if (Array.isArray(arr)) {
            result.push(...arr)
          } else {
            result.push(arr)
          }
        }
      }
    }
    return result
  }

  function flatMapDepth(collection, iterater, depth = 1) {
    let result = []
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        let arr = iterater(collection[i], i, collection)
        if (Array.isArray(arr)) {
          result.push(this.flattenDepth(arr, depth))
        } else {
          result.push(arr)
        }
      }
    } else if (typeof collection === 'object' && collection !== 'null') {
      for (let key of collection) {
        if (collection.hasOwnProperty(key)) {
          let arr = iterater(collection(key))
          if (Array.isArray(arr)) {
            result.push(this.flattenDepth(arr, depth))
          } else {
            result.push(arr)
          }
        }
      }
    }
    return result
  }

  function flatMapDeep(collection, iterater) {
    let result = []
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        let arr = iterater(collection[i], i, collection)
        if (Array.isArray(arr)) {
          result.push(...this.flattenDeep(arr))
        } else {
          result.push(arr)
        }
      }
    } else if (typeof collection === 'object' && collection !== 'null') {
      for (let key of collection) {
        if (collection.hasOwnProperty(key)) {
          let arr = iterater(collection(key))
          if (Array.isArray(arr)) {
            result.push(...this.flattenDeep(arr))
          } else {
            result.push(arr)
          }
        }
      }
    }
    return result
  }

  function get(object, path, defaultValue) {
    if (Array.isArray(path)) {
      for (let key of path) {
        object = object[key]
        if (object === undefined) return defaultValue
      }
    } else if (typeof path === 'string') {
      let keys = path.split('.')
      let reg = /\[(\d+)\]/g
      for (let key of keys) {
        let endKeys = key.split(reg)
        for (let k of endKeys) {
          if (k !== '') {
            object = object[k]
            if (object === undefined) return defaultValue
          }
        }
      }
    } else {
      return defaultValue
    }
    return object
  }

  function has(object, path) {
    if (typeof object === 'object' && object !== null) {
      let keys
      if (typeof path === 'string') {
        keys = path.split('.')
      } else if (Array.isArray(path)) {
        keys = path
      } else {
        return false
      }
      for (let key of keys) {
        if (object.hasOwnProperty(key)) {
          object = object[key]
        } else {
          return false
        }
      }
      return true
    } else {
      return false
    }
  }

  function mapKeys(object, iterater) {
    iterater = this.iterater(iterater)
    let obj = {}
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        let val = object[key]
        let newKey = iterater(val, key, object)
        obj[newKey] = val
      }
    }
    return obj
  }

  function mapValues(object, iterater) {
    iterater = this.iterater(iterater)
    let obj = {}
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        let val = object[key]
        let newVal = iterater(val, key, object)
        obj[key] = newVal
      }
    }
    return obj
  }

  function range(start = 0, end, step = 1) {
    let ans = []
    let count
    if (arguments.length == 1) {
      end = start
      step = start >= 0 ? 1 : -1
      start = 0
    }
    if (step === 0) {
      count = end - start
    } else {
      count = (end - start) / step
    }
    for (let i = 0; i < count; i++) {
      ans.push(start)
      start += step
      if (Math.abs(start) > Math.abs(end)) break
    }
    return ans
  }

  function concat(array, ...values) {
    let ans = [...array]
    ans.push(...this.flatten(values))
    return ans
  }

  function repeat(string = '', n = 1) {
    let ans = ''
    for (let i = 0; i < n; i++) {
      ans += string
    }
    return ans
  }

  function padStart(string = '', length = 0, chars = ' ') {
    let needLen = length - string.length // 需要补其的长度
    let str = ''
    while (str.length <= needLen) {
      str += chars
    }
    // 多了需要裁剪
    if (str.length > needLen) {
      let len = needLen - str.length // 负数
      str = str.slice(0, len)
    }
    return str + string
  }

  function padEnd(string = '', length = 0, chars = ' ') {
    let needLen = length - string.length // 需要补其的长度
    let str = ''
    while (str.length <= needLen) {
      str += chars
    }
    // 多了需要裁剪
    if (str.length > needLen) {
      let len = needLen - str.length // 负数
      str = str.slice(0, len)
    }
    return string + str
  }

  function pad(string = '', length = 0, chars = ' ') {
    let leftStr = ''
    let rightStr = ''
    let needLen = length - string.length
    let leftLen = needLen >> 1 //Math.floor(needLen / 2)
    let rightLen = needLen - leftLen
    for (let i = 0; i < leftLen; i++) {
      leftStr += chars
      if (leftStr.length >= leftLen) {
        break
      }
    }
    for (let i = 0; i < rightLen; i++) {
      rightStr += chars
      if (rightStr.length >= rightLen) {
        break
      }
    }
    if (leftStr.length > leftLen) {
      leftStr = leftStr.slice(0, leftLen - leftStr.length)
    }
    if (rightStr.length > rightLen) {
      rightStr = rightStr.slice(0, rightLen - rightStr.length)
    }
    return leftStr + string + rightStr
  }

  function keys(object) {
    let arr = []
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        arr.push(key)
      }
    }
    return arr
  }

  function values(object) {
    let arr = []
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        arr.push(object[key])
      }
    }
    return arr
  }

  function random(lower = 0, upper = 1, floating) {
    let random
    if (arguments.length === 1) {
      if (typeof arguments[0] === 'boolean') {
        floating = arguments[0]
        lower = 0
      } else {
        if (!Number.isInteger(arguments[0])) {
          floating = true
          upper = lower
          lower = 0
        }
      }
    } else if (arguments.length == 2) {
      if (typeof arguments[1] == 'boolean') {
        if (!Number.isInteger(lower)) {
          floating = true
          upper = lower
          lower = 0
        } else {
          floating = arguments[1]
          upper = lower
          lower = 0
        }
      } else {
        if (
          !Number.isInteger(arguments[0]) ||
          !Number.isInteger(arguments[1])
        ) {
          floating = true
        }
      }
    } else {
      if (!Number.isInteger(lower) || !Number.isInteger(upper)) {
        floating = true
      }
    }
    if (!floating) {
      random = Math.floor(Math.random() * (upper - lower + 1) + lower)
    } else {
      random = Math.random() * (upper - lower) + lower
    }
    return random
  }

  function ceil(number, precision = 0) {
    let res = Math.pow(10, precision)
    return Math.ceil(number * res) / res
  }

  function floor(number, precision = 0) {
    let res = Math.pow(10, precision)
    return Math.floor(number * res) / res
  }

  function cloneDeep(value) {
    if (Array.isArray(value)) {
      let arr = []
      for (let i = 0; i < value.length; i++) {
        arr.push(cloneDeep(value[i]))
      }
      return arr
    } else if (
      typeof value === 'object' &&
      value !== null &&
      !(value instanceof RegExp)
    ) {
      let obj = {}
      for (let key in value) {
        if (value.hasOwnProperty(key)) {
          obj[key] = cloneDeep(value[key])
        }
      }
      return obj
    } else {
      return value
    }
  }

  function trimStart(
    string = '',
    chars = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000'
  ) {
    // Js中空白符有很多种
    chars = chars.split('')
    if (string === '') return string
    let i
    // 从左往右找
    for (i = 0; i < string.length; i++) {
      let s = string[i]
      if (chars.indexOf(s) === -1) {
        break
      }
    }
    return string.slice(i)
  }

  function trimEnd(
    string = '',
    chars = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000'
  ) {
    if (string === '') return string
    let i
    for (i = string.length - 1; i >= 0; i--) {
      let s = string[i]
      if (chars.indexOf(s) === -1) break
    }
    return string.slice(0, i + 1)
  }

  function trim(
    string = '',
    chars = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000'
  ) {
    if (string === '') return string
    if (typeof chars !== 'string') chars = ' '
    let i, j
    for (i = 0; i < string.length; i++) {
      let s = string[i]
      if (chars.indexOf(s) === -1) break
    }
    for (j = string.length - 1; j >= 0; j--) {
      let s = string[j]
      if (chars.indexOf(s) === -1) break
    }
    return string.slice(i, j + 1)
  }

  function assign(object, ...source) {
    for (let i = 0; i < source.length; i++) {
      let obj = source[i]
      if (typeof obj === 'object') {
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            object[key] = obj[key]
          }
        }
      }
    }
    return object
  }

  function merge(object, ...source) {
    for (let i = 0; i < source.length; i++) {
      let obj = source[i]
      if (typeof obj === 'object') {
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (object.hasOwnProperty(key)) {
              // 判断key的值是否都为对象或数组（数组里面也必须是对象）
              if (
                Object.prototype.toString.call(obj[key]) ===
                  '[object Object]' &&
                Object.prototype.toString.call(object[key]) ===
                  '[object Object]'
              ) {
                object[key] = this.assign(object[key], obj[key])
              } else if (
                Array.isArray(object[key]) &&
                Array.isArray(obj[key])
              ) {
                let i
                for (i = 0; i < object[key].length; i++) {
                  if (
                    object[key][i].toString() === '[object Object]' &&
                    obj[key][i].toString() === '[object Object]'
                  ) {
                    object[key][i] = this.assign(object[key][i], obj[key][i])
                  } else {
                    object[key][i] = obj[key][i]
                  }
                }
                while (obj[key].length > i) {
                  object[key][i] = obj[key][i]
                  i++
                }
              } else if (
                Array.isArray(object[key]) &&
                Object.prototype.toString.call(obj[key]) === '[object Object]'
              ) {
                object[key] = this.assign(object[key], obj[key])
              } else {
                object[key] = obj[key]
              }
            } else {
              object[key] = obj[key]
            }
          }
        }
      }
    }
    return object
  }

  function dropRightWhile(array, predicate) {
    let iterater = this.iterater(predicate)
    for (let i = array.length - 1; i >= 0; i--) {
      if (iterater(array[i])) {
        array.pop()
      } else {
        break
      }
    }
    return array
  }

  function dropWhile(array, predicate = it => it) {
    let iterater = this.iterater(predicate)
    let ans = []
    let isF = false
    for (let item of array) {
      if (!iterater(item) || isF) {
        isF = true
        ans.push(item)
      }
    }
    return ans
  }

  function intersection(...array) {
    let firstArr = array[0]
    for (let i = 1; i < array.length; i++) {
      let arr = array[i]
      if (firstArr.length > 0) {
        for (let j = firstArr.length - 1; j >= 0; j--) {
          if (!arr.includes(firstArr[j])) {
            firstArr.splice(j, 1)
          }
        }
      } else {
        return firstArr
      }
    }
    return firstArr
  }

  function intersectionBy() {
    let iteratee = this.iterater(arguments[arguments.length - 1])
    let firstArr = arguments[0]
    for (let i = 1; i < arguments.length - 1; i++) {
      let arr = arguments[i].map(it => iteratee(it))
      if (firstArr.length > 0) {
        for (let j = firstArr.length - 1; j >= 0; j--) {
          if (!arr.includes(iteratee(firstArr[j]))) {
            firstArr.splice(j, 1)
          }
        }
      } else {
        return firstArr
      }
    }
    return firstArr
  }

  function intersectionWith() {
    let comparator = arguments[arguments.length - 1]
    let firstArr = arguments[0]
    for (let i = 1; i < arguments.length - 1; i++) {
      let arr = arguments[i]
      if (firstArr.length > 0) {
        for (let j = firstArr.length - 1; j >= 0; j--) {
          let isDel = arr.every(it => {
            return !comparator(it, firstArr[j])
          })
          if (isDel) firstArr.splice(j, 1)
        }
      } else {
        return firstArr
      }
    }
    return firstArr
  }

  function nth(array, n = 0) {
    if (n < 0) {
      n = array.length + n
    }
    return array[n]
  }

  function sortedIndex(array, value) {}

  function tail(array) {
    return array.slice(1)
  }

  function take(array, n = 1) {
    return array.slice(0, n)
  }

  function takeRight(array, n = 1) {
    if (n == 0) {
      return []
    }
    return array.slice(-n)
  }

  function takeRightWhile(array, predicate = it => it) {
    predicate = this.iterater(predicate)
    for (let i = array.length - 1; i >= 0; i--) {
      if (!predicate(array[i])) {
        return array.slice(i + 1)
      }
    }
  }

  function takeWhile(array, predicate = it => it) {
    predicate = this.iterater(predicate)
    for (let i = 0; i < array.length; i++) {
      if (!predicate(array[i])) {
        if (i == 0) {
          return []
        }
        return array.slice(0, i)
      }
    }
  }

  function union(...arrays) {
    let newArray = this.flattenDeep(arrays)
    let ans = []
    for (let val of newArray) {
      if (!ans.includes(val)) {
        ans.push(val)
      }
    }
    return ans
  }

  function unionBy(...args) {
    let iteratee
    let ans = []
    let helper = []
    if (Array.isArray(args[args.length - 1])) {
      iteratee = it => it
    } else {
      iteratee = this.iterater(args[args.length - 1])
      args.pop() // 删除
    }
    let newArray = this.flattenDeep(args)
    for (let val of newArray) {
      if (!helper.includes(iteratee(val))) {
        helper.push(iteratee(val))
        ans.push(val)
      }
    }
    return ans
  }

  function unionWith(...args) {
    let comparator
    let ans = []
    if (Array.isArray(args[args.length - 1])) {
      comparator = it => it
    } else {
      comparator = this.iterater(args[args.length - 1])
      args.pop() // 删除
    }
    let newArray = this.flattenDeep(args)
    for (let item of newArray) {
      let isTrue = ans.some(it => comparator(it, item))
      if (!isTrue) ans.push(item)
    }
    return ans
  }

  function uniq(array) {
    let ans = []
    for (let val of array) {
      if (!ans.includes(val)) {
        ans.push(val)
      }
    }
    return ans
  }

  function uniqBy(array, iteratee = it => it) {
    iteratee = this.iterater(iteratee)
    let helper = []
    let ans = []
    for (let val of array) {
      if (!helper.includes(iteratee(val))) {
        helper.push(iteratee(val))
        ans.push(val)
      }
    }
    return ans
  }

  function uniqWith(array, comparator = it => it) {
    let ans = []
    comparator = this.iterater(comparator)
    for (let item of array) {
      let isTrue = ans.some(it => comparator(it, item))
      if (!isTrue) ans.push(item)
    }
    return ans
  }

  /**
   * 接收的是已经排好序的数组
   *
   * @param {Array} array - 输入的数组，可以是任意类型的数组，但通常情况下应该是包含可比较元素的数组
   * @returns {Array} 返回去除了重复元素的新数组
   */
  function sortedUniq(array) {
    // 函数体，实现排序及去重逻辑
    let newArr = []
    for (let i = 0; i < array.length; i++) {
      if (i === 0 || array[i] !== array[i - 1]) {
        newArr.push(array[i])
      }
    }
    return newArr
  }

  /**
   * 对排序数组去除重复元素
   * @param {Array} array - 输入的排好序的数组
   * @param {Function} iteratee - 用于获取元素比较值的函数
   * @returns {Array} - 去重后的新数组
   */
  function sortedUniqBy(array, iteratee) {
    // 对iteratee进行适配，确保其可以用于后续的操作
    iteratee = this.iterater(iteratee)
    // 函数体，实现去重逻辑
    let newArr = []
    // 遍历输入数组
    for (let i = 0; i < array.length; i++) {
      // 判断当前元素与前一个元素是否不同，如果不同则将其加入新数组
      if (i === 0 || iteratee(array[i]) !== iteratee(array[i - 1])) {
        newArr.push(array[i])
      }
    }
    return newArr
  }

  /**
   * 实现数组的zip函数，将多个数组按照位置对应元素组合成一个新的二维数组
   * @param {...Array} arrays - 一个或多个数组，这些数组的长度可以不同
   * @returns {Array} - 一个新的二维数组，内部每个子数组包含原始数组在同一位置的元素
   */
  function zip(...arrays) {
    // 初始化一个新的二维数组
    let newArr = []
    // 获取最长的数组的长度，用于后续遍历
    let maxCol = Math.max(...arrays.map(array => array.length))
    // 遍历列
    for (let j = 0; j < maxCol; j++) {
      // 初始化一个临时数组，用于存储当前索引位置的元素集合
      let arr = []
      // 遍历行（每个元素）
      for (let i = 0; i < arrays.length; i++) {
        // 将每个数组当前索引位置的元素添加到临时数组中
        arr.push(arrays[i][j])
      }
      // 将临时数组添加到新的二维数组中
      newArr.push(arr)
    }
    // 返回最终的二维数组
    return newArr
  }

  function zipObject(props = [], values = []) {
    let obj = {}
    for (let i = 0; i < props.length; i++) {
      obj[props[i]] = values[i]
    }
    return obj
  }

  function zipObjectDeep(props = [], values = []) {}

  function zipWith() {
    let ans = []
    let iteratee = arguments[arguments.length - 1]
    let arrays = Array.from(arguments).slice(0, arguments.length - 1)
    iteratee = this.iterater(iteratee)
    let maxCount = Math.max(...arrays.map(arr => arr.length))
    for (let i = 0; i < maxCount; i++) {
      let args = []
      arrays.forEach(arr => args.push(arr[i]))
      ans.push(iteratee(...args))
    }
    return ans
  }

  function unzip(array) {
    let ans = []
    for (let i = 0; i < array[0].length; i++) {
      let arr = []
      array.forEach(item => arr.push(item[i]))
      ans.push(arr)
    }
    return ans
  }

  function unzipWith(array, iteratee) {
    iteratee = this.iterater(iteratee)
    let ans = []
    for (let i = 0; i < array[0].length; i++) {
      let temp = []
      array.forEach(item => temp.push(item[i]))
      ans.push(iteratee(...temp))
    }
    return ans
  }

  /**
   * 两数相加
   * @param {Number} augend
   * @param {Number} addend
   */
  function add(augend, addend) {
    return augend + addend
  }

  function find(collection, predicate, fromIndex = 0) {
    predicate = this.iterater(predicate)
    for (let i = fromIndex; i < collection.length; i++) {
      let col = collection[i]
      if (predicate(col)) {
        return col
      }
    }
  }

  function findLast(collection, predicate, fromIndex = collection.length - 1) {
    predicate = this.iterater(predicate)
    for (let i = fromIndex; i >= 0; i--) {
      let col = collection[i]
      if (predicate(col)) {
        return col
      }
    }
  }

  /**
   * 从数组中移除指定的值。
   *
   * 该函数的作用是从给定的数组中移除一个或多个指定的值，
   * 并返回一个新的数组，该数组中不包含被移除的值。这个函数
   * 适用于那些想要过滤掉特定元素，但又不想修改原数组的场景。
   *
   * @param {Array} array - 原始数组，可以包含任何类型的元素。
   * @param {...any} values - 一个或多个想要从数组中移除的值。
   * @return {Array} 一个新的数组，其中不包含被移除的值。
   */
  function without(array, ...values) {
    return array.filter(it => !values.includes(it))
  }

  /**
   * 实现多个数组的异或操作
   * @param {Array[]} arrays - 多个数组参数组成的数组
   * @returns {Array} - 返回异或操作后的结果数组
   */
  function xor(...arrays) {
    // 函数实现
    let ans = []
    for (let i = 0; i < arrays.length; i++) {
      let arr = arrays[i]
      for (let j = 0; j < arrays.length; j++) {
        if (i !== j) {
          arr = difference(arr, arrays[j])
        }
      }
      ans.push(...arr)
    }
    return ans
  }

  function xorBy(...args) {
    let ans = []
    let iteratee = this.iterater(args.at(-1))
    args.pop()
    for (let i = 0; i < args.length; i++) {
      let arr = args[i]
      for (let j = 0; j < args.length; j++) {
        if (i !== j) {
          arr = differenceBy(arr, args[j], iteratee)
        }
      }
      ans.push(...arr)
    }
    return ans
  }

  function xorWith(...args) {
    let ans = []
    let comparator = this.iterater(args.at(-1))
    args.pop()
    for (let i = 0; i < args.length; i++) {
      let arr = args[i]
      for (let j = 0; j < args.length; j++) {
        if (i !== j) {
          arr = differenceWith(arr, args[j], comparator)
        }
      }
      ans.push(...arr)
    }
    return ans
  }

  function includes(collection, value, fromIndex = 0) {
    let bol = false
    if (typeof collection === 'object' && collection !== null) {
      if (Array.isArray(collection)) {
        bol = collection.includes(value, fromIndex)
      } else {
        let values = Object.values(collection)
        bol = values.includes(value, fromIndex)
      }
    } else if (typeof collection === 'string') {
      bol = collection.includes(value, fromIndex)
    }
    return bol
  }

  function invokeMap(collection, path, ...args) {
    if (typeof collection === 'object' && collection !== null) {
      if (!Array.isArray(collection)) {
        collection = Object.values(collection)
      }
    }
    return collection.map(item => (typeof path === 'function' ? path : collection[path]).apply(item, args))
  }

  // 递归下降法实现json的解析
  // 即对于递归结构的文本的解析，通过为每种语法实现一个解析函数
  // 解析函数开始时全局指针指向这个值在文本中开始的位置
  // 解析函数根据说法将其解析出来，并移动指针到这个值结束位置的后面
  // 由于结构可能是递归嵌套的，所以函数之间的调用也能映射出这种嵌套关系
  function parseJSON(string) {
    let i = 0
    return parseValue()

    function parseObj() {
      let result = {}
      i++ // 跳过{
      // 如果是一个空{}，则直接返回
      if (string[i] === '}') {
        i++ // skip }
        return result
      }
      while (i < string.length) {
        let key = parseStr()
        // 如果没有遇到':'抛出异常
        if (string[i] !== ':') {
          throw new SyntaxError('Expected `:` but got ' + string[i])
        }
        i++ // 跳过：->value
        let value = parseValue() // 值不知道是什么类型的值，所以调用解析值的方法
        result[key] = value
        if (string[i] === ',') {
          i++ // 跳过,
        } else if (string[i] === '}') {
          i++ // 跳过 }
          break
        }
      }
      return result
    }

    function parseArray() {
      let result = []
      i++ // 跳过[
      if (string[i] === ']') {
        i++ // skip ]
        return result
      }
      while (i < string.length) {
        let value = parseValue() // 解析这个值
        result.push(value)
        if (string[i] === ',') {
          i++ // skip ,
        } else if (string[i] === ']') {
          i++ // skip ]
          break
        } else {
          // 两个都没有遇到，抛出异常
          throw new SyntaxError('Expected `, or ]` but got ' + string[i])
        }
      }
      return result
    }

    // 暂时只考虑整数
    // 实际上json支持浮点数，科学计数法，负数等
    function parseNumber() {
      let startIdx = i // 数字开始的索引
      while (string[i] >= '0' && string[i] <= '9') {
        i++
      }
      return Number(string.slice(startIdx, i))
    }

    function parseStr() {
      i++ // skip "
      let startIdx = i
      while (string[i] !== '"') {
        i++
      }
      let res = string.slice(startIdx, i)
      i++ // skip "
      return res
    }

    function parseValue() {
      if (string[i] === '{') {
        return parseObj()
      } else if (string[i] === '[') {
        return parseArray()
      } else if (string[i] === '"') {
        return parseStr()
      } else if (string[i] === 'f') {
        if (string.slice(i, i + 5) === 'false') {
          i += 5
          return false
        } else {
          // 抛出错误
          throw new SyntaxError('unexpected token at position' + i)
        }
      } else if (string[i] === 't') {
        if (string.slice(i, i + 4) === 'true') {
          i += 4
          return true
        } else {
          throw new SyntaxError('unexpected token at position' + i)
        }
      } else if (string[i] === 'n') {
        if (string.slice(i, i + 4) === 'null') {
          i += 4
          return null
        } else {
          throw new SyntaxError('unexpected token at position' + i)
        }
      } else {
        return parseNumber()
      }
    }
  }

  function stringifyJSON(obj) {
    if (Array.isArray(obj)) {
      let str = ''
      for (let i = 0; i < obj.length; i++) {
        str += ',' + stringifyJSON(obj[i])
      }
      str = str.slice(1)
      return '[' + str + ']'
    } else if (
      typeof obj === 'object' &&
      obj !== null &&
      !(obj instanceof RegExp)
    ) {
      let str = ''
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          str += ',"' + key + '"' + ':' + stringifyJSON(obj[key])
        }
      }
      str = str.slice(1)
      return '{' + str + '}'
    } else if (typeof obj === 'string') {
      return '"' + obj + '"'
    } else {
      return obj + ''
    }
  }
  return {
    iterater: iterater,
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
    dropRightWhile: dropRightWhile,
    dropWhile: dropWhile,
    fill: fill,
    findIndex: findIndex,
    findLastIndex: findLastIndex,
    flatten: flatten,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,
    flatMapDeep: flatMapDeep,
    fromPairs: fromPairs,
    toPairs: toPairs,
    head: head,
    indexOf: indexOf,
    lastIndexOf: lastIndexOf,
    initial: initial,
    join: join,
    last: last,
    pull: pull,
    pullAll: pullAll,
    pullAllBy: pullAllBy,
    pullAllWith: pullAllWith,
    pullAt: pullAt,
    reverse: reverse,
    every: every,
    some: some,
    countBy: countBy,
    groupBy: groupBy,
    keyBy: keyBy,
    forEach: forEach,
    forEachRight,
    map: map,
    filter: filter,
    reduce: reduce,
    reduceRight: reduceRight,
    size: size,
    sortBy: sortBy,
    sample: sample,
    isUndefined: isUndefined,
    isNull: isNull,
    isNil: isNil,
    max: max,
    min: min,
    maxBy: maxBy,
    minBy: minBy,
    round: round,
    sumBy: sumBy,
    flatMap: flatMap,
    flatMapDepth: flatMapDepth,
    get: get,
    has: has,
    mapKeys: mapKeys,
    mapValues: mapValues,
    range: range,
    concat: concat,
    repeat: repeat,
    padStart: padStart,
    padEnd: padEnd,
    pad: pad,
    keys: keys,
    values: values,
    random: random,
    ceil: ceil,
    floor: floor,
    cloneDeep: cloneDeep,
    trimStart: trimStart,
    trimEnd: trimEnd,
    trim: trim,
    assign: assign,
    merge: merge,
    intersection: intersection,
    intersectionBy: intersectionBy,
    intersectionWith: intersectionWith,
    nth: nth,
    sortedIndex: sortedIndex,
    tail: tail,
    take: take,
    takeRight: takeRight,
    takeRightWhile: takeRightWhile,
    takeWhile: takeWhile,
    union: union,
    unionBy: unionBy,
    unionWith: unionWith,
    uniq: uniq,
    uniqBy: uniqBy,
    uniqWith: uniqWith,
    sortedUniq: sortedUniq,
    sortedUniqBy: sortedUniqBy,
    zip: zip,
    zipObject: zipObject,
    zipObjectDeep: zipObjectDeep,
    zipWith: zipWith,
    unzip: unzip,
    unzipWith: unzipWith,
    add: add,
    find: find,
    findLast: findLast,
    without,
    xor,
    xorBy,
    xorWith,
    includes,
    invokeMap,
    parseJSON: parseJSON,
    stringifyJSON: stringifyJSON,
  }
})()
