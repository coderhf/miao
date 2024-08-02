// 书本第六章作业
// 6.14.1 向量类型
class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  plus(v) {
    let x = this.x + v.x
    let y = this.y + v.y
    return new Vector(x, y)
  }
  minus(v) {
    let x = this.x - v.x
    let y = this.y - v.y
    return new Vector(x, y)
  }
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
}
// function Vector(x, y) {
//   this.x = x
//   this.y = y
// }

// Vector.prototype.plus = function (v) {
//   let x = this.x + v.x
//   let y = this.y + v.y
//   return new Vector(x, y)
// }

// Vector.prototype.minus = function (v) {
//   let x = this.x - v.x
//   let y = this.y - v.y
//   return new Vector(x, y)
// }

// Object.defineProperty(Vector.prototype, 'length', {
//   get: function () {
//     return Math.sqrt(this.x * this.x + this.y * this.y)
//   },
// })

// 表示一个复数
class Complex {
  constructor(real, imag) {
    this.real = real
    this.imag = imag
  }
  plus(c) {
    let real = this.real + c.real
    let imag = this.imag + c.imag
    return new Complex(real, imag)
  }
  minus(c) {
    let real = this.real - c.real
    let imag = this.imag - c.imag
    return new Complex(real, imag)
  }
  multiple(c) {
    let real = this.real * c.real - this.imag * c.imag
    let imag = this.real * c.imag + this.imag * c.real
    return new Complex(real, imag)
  }
  div(c) {
    let real =
      (this.real * c.real + this.imag * c.imag) /
      (c.real * c.real + c.imag * c.imag)
    let imag =
      (this.imag * c.real - this.real * c.imag) /
      (c.real * c.real + c.imag * c.imag)
    return new Complex(real, imag)
  }
  toString() {
    let str = this.imag < 0 ? '' : '+'
    return this.real + str + this.imag + 'i'
  }
}
// function Complex(real, imag) {
//   this.real = real
//   this.imag = imag
// }

// // 加法
// Complex.prototype.plus = function (c) {
//   let real = this.real + c.real
//   let imag = this.imag + c.imag
//   return new Complex(real, imag)
// }

// // 减法
// Complex.prototype.minus = function (c) {
//   let real = this.real - c.real
//   let imag = this.imag - c.imag
//   return new Complex(real, imag)
// }

// // 乘法
// Complex.prototype.multiple = function (c) {
//   let real = this.real * c.real - this.imag * c.imag
//   let imag = this.real * c.imag + this.imag * c.real
//   return new Complex(real, imag)
// }

// Complex.prototype.div = function (c) {
//   let real =
//     (this.real * c.real + this.imag * c.imag) /
//     (c.real * c.real + c.imag * c.imag)
//   let imag =
//     (this.imag * c.real - this.real * c.imag) /
//     (c.real * c.real + c.imag * c.imag)
//   return new Complex(real, imag)
// }

// Complex.prototype.toString = function () {
//   let str = this.imag < 0 ? '' : '+'
//   return this.real + str + this.imag + 'i'
// }

// 表示一个单向链表
class LinkedList {
  constructor() {
    this._head = null
    this._length = 0
  }
  at(idx) {
    let cur = this._head
    while (cur && idx > 0) {
      cur = cur.next
      idx--
    }
    return cur ? cur.val : undefined
  }
  set(idx, val) {
    let cur = this._head
    while (cur && idx > 0) {
      cur = cur.next
    }
    if (cur) {
      cur.val = val
    }
  }
  append(val) {
    // 哨兵结点
    let dummy = {
      val: 0,
      next: this._head,
    }
    let node = {
      val: val,
      next: null,
    }
    this._length++
    let cur = dummy
    while (cur.next) {
      cur = cur.next
    }
    cur.next = node
    this._head = dummy.next
    return this
  }
  pop() {
    // 没有结点
    if (this._head == null) {
      return undefined
    }
    this._length--
    // 只有一个结点
    if (this._head.next == null) {
      let result = this._head.val
      this._head = null
      return result
    }
    let cur = this._head
    let pre = null // 记录之前的结点
    while (cur.next) {
      pre = cur
      cur = cur.next
    }
    let result = cur.val
    pre.next = null
    return result
  }
  prepend(val) {
    let node = {
      val: val,
      next: this._head,
    }
    this._length++
    this._head = node
    return this
  }
  shift() {
    if (this._head == null) {
      return undefined
    }
    this._length--
    let result = this._head.val
    this._head = this._head.next
    return result
  }
  toArray() {
    let result = []
    let cur = this._head
    while (cur) {
      result.push(cur.val)
      cur = cur.next
    }
    return result
  }
  toString() {
    return this.toArray().join('->')
  }
  get size() {
    return this._length
  }
}
// function LinkedList() {
//   this._head = null
//   this._length = 0
// }
// // 返回链表第idx个结点的值
// LinkedList.prototype.at = function (idx) {
//   let cur = this._head
//   while (cur && idx > 0) {
//     cur = cur.next
//     idx--
//   }
//   return cur ? cur.val : undefined
// }
// // 设置链表第idx项的值为val
// LinkedList.prototype.set = function (idx, val) {
//   let cur = this._head
//   while (cur && idx > 0) {
//     cur = cur.next
//   }
//   if (cur) {
//     cur.val = val
//   }
// }
// // 在链表末尾新增一个结点，值为val
// LinkedList.prototype.append = function (val) {
//   // 哨兵结点
//   let dummy = {
//     val: 0,
//     next: this._head,
//   }
//   let node = {
//     val: val,
//     next: null,
//   }
//   this._length++
//   let cur = dummy
//   while (cur.next) {
//     cur = cur.next
//   }
//   cur.next = node
//   this._head = dummy.next
//   return this
// }
// // 返回链表末尾结点的值，并删除末尾结点
// LinkedList.prototype.pop = function () {
//   // 没有结点
//   if (this._head == null) {
//     return undefined
//   }
//   this._length--
//   // 只有一个结点
//   if (this._head.next == null) {
//     let result = this._head.val
//     this._head = null
//     return result
//   }
//   let cur = this._head
//   let pre = null // 记录之前的结点
//   while (cur.next) {
//     pre = cur
//     cur = cur.next
//   }
//   let result = cur.val
//   pre.next = null
//   return result
// }
// // 在链表头部新增一个结点，值为val
// LinkedList.prototype.prepend = function (val) {
//   let node = {
//     val: val,
//     next: this._head,
//   }
//   this._length++
//   this._head = node
//   return this
// }
// // 返回链表第一个结点的值，并删除这一个结点
// LinkedList.prototype.shift = function () {
//   if (this._head == null) {
//     return undefined
//   }
//   this._length--
//   let result = this._head.val
//   this._head = this._head.next
//   return result
// }
// LinkedList.prototype.toArray = function () {
//   let result = []
//   let cur = this._head
//   while (cur) {
//     result.push(cur.val)
//     cur = cur.next
//   }
//   return result
// }
// LinkedList.prototype.toString = function () {
//   return this.toArray().join('->')
// }
// Object.defineProperty(LinkedList.prototype, 'size', {
//   get: function () {
//     return this._length
//   },
// })

// 表示一个集合（集合中元素没有序，但不能重复）
// 构造函数可选的可以传入集合中的初始值，但会被去重后存放
class MySet {
  constructor(initalValues = []) {
    this._elements = []
    for (let item of initalValues) {
      this.add(item)
    }
  }
  add(val) {
    if (!this._elements.includes(val)) {
      this._elements.push(val)
    }
    return this
  }
  delete(item) {
    let idx = this._elements.indexOf(item)
    if (idx >= 0) {
      this._elements.splice(idx, 1)
      return true
    }
    return false
  }
  clear() {
    return (this._elements = [])
  }
  has(item) {
    return this._elements.includes(item)
  }
  forEach(func) {
    for (let item of this._elements) {
      func(item)
    }
  }
  get size() {
    return this._elements.length
  }
}
// function MySet(initalValues = []) {
//   this._elements = []
//   for (let item of initalValues) {
//     this.add(item)
//   }
// }
// // 向集合中添加元素
// MySet.prototype.add = function (val) {
//   if (!this._elements.includes(val)) {
//     this._elements.push(val)
//   }
//   return this
// }
// // 从集合中删除item元素
// MySet.prototype.delete = function (item) {
//   let idx = this._elements.indexOf(item)
//   if (idx >= 0) {
//     this._elements.splice(idx, 1)
//     return true
//   }
//   return false
// }

// // 获取集合中的元素用 c.size，它是一个getter
// Object.defineProperty(MySet.prototype, 'size', {
//   get: function () {
//     return this._elements.length
//   },
// })

// // 清空集合中的所有元素
// MySet.prototype.clear = function () {
//   this._elements = []
// }

// // 判断集合中是否存在某元素
// MySet.prototype.has = function (item) {
//   return this._elements.includes(item)
// }
// // 遍历集合中的元素（顺序无所谓）
// MySet.prototype.forEach = function (func) {
//   for (let item of this._elements) {
//     func(item)
//   }
// }

// 表示一个映射
// 这个映射中，可以把任何值映射到任何值，映射的key不限于字符串
class MyMap {
  constructor(initPairs = []) {
    // 用一个数组来表示，偶数项表示key，奇数项表示value.[key, val,key,val]
    this._pairs = []
    for (let pair of initPairs) {
      let key = pair[0]
      let val = pair[1]
      this.set(key, val)
    }
  }
  set(key, val) {
    for (let i = 0; i < this._pairs.length; i += 2) {
      if (this._pairs[i] === key) {
        this._pairs[i + 1] = val
        return this
      }
    }
    this._pairs.push(key, val)
    return this
  }
  get(key) {
    for (let i = 0; i < this._pairs.length; i += 2) {
      if (this._pairs[i] === key) {
        return this._pairs[i + 1]
      }
    }
    return undefined
  }
  has(key) {
    for (let i = 0; i < this._pairs.length; i += 2) {
      if (this._pairs[i] === key) {
        return true
      }
    }
    return false
  }
  delete(key) {
    for (let i = 0; i < this._pairs.length; i++) {
      if (this._pairs[i] === key) {
        this._pairs.splice(i, 2)
        return true
      }
    }
    return false
  }
  clear() {
    this._pairs = []
    return this
  }
  get size() {
    return this._pairs.length / 2
  }
  forEach(iterator) {
    for (let i = 0; i < this._pairs.length; i++) {
      iterator(this._pairs[i], this._pairs[i + 1])
    }
  }
}
// function MyMap(initPairs = []) {
//   // 用一个数组来表示，偶数项表示key，奇数项表示value.[key, val,key,val]
//   this._pairs = []
//   for (let pair of initPairs) {
//     let key = pair[0]
//     let val = pair[1]
//     this.set(key, val)
//   }
// }
// MyMap.prototype = {
//   constructor: MyMap,
//   // 设置映射中的key所对应的值为val
//   set: function (key, val) {
//     for (let i = 0; i < this._pairs.length; i += 2) {
//       if (this._pairs[i] === key) {
//         this._pairs[i + 1] = val
//         return this
//       }
//     }
//     this._pairs.push(key, val)
//     return this
//   },
//   // 获取这个映射中key所对应的val
//   get: function (key) {
//     for (let i = 0; i < this._pairs.length; i += 2) {
//       if (this._pairs[i] === key) {
//         return this._pairs[i + 1]
//       }
//     }
//     return undefined
//   },
//   // 判断这个映射中是否存在这个key的映射
//   has: function (key) {
//     for (let i = 0; i < this._pairs.length; i += 2) {
//       if (this._pairs[i] === key) {
//         return true
//       }
//     }
//     return false
//   },
//   // 删除这个映射中key及其映射的值的这一对儿
//   delete: function (key) {
//     for (let i = 0; i < this._pairs.length; i++) {
//       if (this._pairs[i] === key) {
//         this._pairs.splice(i, 2)
//         return true
//       }
//     }
//     return false
//   },
//   // 清空这个映射中所有的映射对儿
//   clear: function () {
//     this._pairs = []
//     return this
//   },
//   // 获取这个映射中映射对儿的数量
//   get size() {
//     return this._pairs.length / 2
//   },
//   // 遍历这个映射中所有的映射对儿
//   forEach(iterator) {
//     for (let i = 0; i < this._pairs.length; i++) {
//       iterator(this._pairs[i], this._pairs[i + 1])
//     }
//   },
// }

// 表示一个栈：即后进先出，先进后出
class Stack {
  constructor() {
    this._elements = []
  }
  push(val) {
    this._elements.push(val)
  }
  pop() {
    return this._elements.pop()
  }
  peek() {
    return this._elements[this._elements.length - 1]
  }
  get size() {
    return this._elements.length
  }
}
// function Stack() {
//   this._elements = []
// }
// // 向栈中增加元素
// Stack.prototype.push = function (val) {
//   this._elements.push(val)
// }
// // 从栈中取出元素并删除栈顶元素
// Stack.prototype.pop = function () {
//   return this._elements.pop()
// }
// // 查看但不删除栈顶元素
// Stack.prototype.peek = function () {
//   return this._elements[this._elements.length - 1]
// }

// // stack.size 获取栈中元素的数量
// Object.defineProperty(Stack.prototype, 'size', {
//   get: function () {
//     return this._elements.length
//   },
// })

// 表示一个队列：即先进先出，后进后出
class Queue {
  constructor() {
    this._head = null
    this._tail = null
    this._length = 0
  }
  add(val) {
    let node = {
      val: val,
      next: null,
    }
    this._length++
    if (this._head == null) {
      this._head = this._tail = node
      return this
    }
    this._tail.next = node
    this._tail = node
    return this
  }
  pop() {
    if (this._head == null) {
      return undefined
    }
    this._length--
    if (this._head === this._tail) {
      let result = this._head.val
      this._head = this._tail = null
      return result
    }
    let result = this._head.val
    this._head = this._head.next
    return result
  }
  peek() {
    return this._head.val
  }
  get size() {
    return this._length
  }
}
// function Queue() {
//   this._head = null
//   this._tail = null
//   this._length = 0
// }

// // 向队列中增加元素
// Queue.prototype.add = function (val) {
//   let node = {
//     val: val,
//     next: null,
//   }
//   this._length++
//   if (this._head == null) {
//     this._head = this._tail = node
//     return this
//   }
//   this._tail.next = node
//   this._tail = node
//   return this
// }
// // 从队头取出元素并删除队头元素
// Queue.prototype.pop = function () {
//   if (this._head == null) {
//     return undefined
//   }
//   this._length--
//   if (this._head === this._tail) {
//     let result = this._head.val
//     this._head = this._tail = null
//     return result
//   }
//   let result = this._head.val
//   this._head = this._head.next
//   return result
// }
// // 查看队头元素（没有查看队尾元素的功能）
// Queue.prototype.peek = function () {
//   return this._head.val
// }
// // 以及queue.size获取队列的长度
// Object.defineProperty(Queue.prototype, 'size', {
//   get: function () {
//     return this._length
//   },
// })
