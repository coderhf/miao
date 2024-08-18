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

  function forEach(collection, iterater) {
    if (typeof iterater !== 'function') {
      iterater = (val, idx, collection) => {
        console.log(val, idx, collection)
      }
    }
    if (typeof collection === 'object' && collection !== null) {
      if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
          let bol = iterater(collection[i], i, collection)
          if (bol === false) return collection
        }
      } else {
        for (let key in collection) {
          if (collection.hasOwnProperty(key)) {
            let bol = iterater(collection[key], key, collection)
            if (bol === false) return collection
          }
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

  function sortBy(collection, iterater) {
    let isFn = false
    // 归并排序是稳定排序
    if (typeof iterater[0] === 'function') {
      isFn = true
      iterater = iterater[0]
    }
    let ans = []
    if (
      typeof collection === 'object' &&
      collection !== null &&
      Array.isArray(collection)
    ) {
    } else {
    }
    function mergeSort(array, iterater = it => it) {
      // 结束条件
      if (array.length < 2) {
        return array
      }
      let midIdx = array.length >>> 1 // 拿到这个数组中间的索引
      let leftArray = array.slice(0, midIdx)
      let rightArray = array.slice(midIdx)

      mergeSort(leftArray)
      mergeSort(rightArray)

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

  function round(number, precision) {}

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
        if (!Number.isInteger(arguments[0]) || !Number.isInteger(arguments[1])) {
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
    keyBy: keyBy,
    forEach: forEach,
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
  }
})()
