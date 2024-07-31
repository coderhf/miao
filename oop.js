// 书本第六章作业
// 6.14.1 向量类型
function Vector(x, y) {
  this.x = x
  this.y = y
}

Vector.prototype.plus = function (v) {
  let x = this.x + v.x
  let y = this.y + v.y
  return new Vector(x, y)
}

Vector.prototype.minus = function (v) {
  let x = this.x - v.x
  let y = this.y - v.y
  return new Vector(x, y)
}

Object.defineProperty(Vector.prototype, 'length', {
  get: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  },
})
// let v1 = new Vector(1, 2)
// let v2 = new Vector(3, -4)

// let v3 = v1.plus(v2)
// let v4 = v2.minus(v1)

// let l = v4.length()

// 表示一个复数
function Complex(real, imag) {
  this.real = real
  this.imag = imag
}

// 加法
Complex.prototype.plus = function (c) {
  let real = this.real + c.real
  let imag = this.imag + c.imag
  return new Complex(real, imag)
}

// 减法
Complex.prototype.minus = function (c) {
  let real = this.real - c.real
  let imag = this.imag - c.imag
  return new Complex(real, imag)
}

// 乘法
Complex.prototype.multiple = function (c) {
  let real = this.real * c.real - this.imag * c.imag
  let imag = this.real * c.imag + this.imag * c.real
  return new Complex(real, imag)
}

Complex.prototype.div = function (c) {
  let real =
    (this.real * c.real + this.imag * c.imag) /
    (c.real * c.real + c.imag * c.imag)
  let imag =
    (this.imag * c.real - this.real * c.imag) /
    (c.real * c.real + c.imag * c.imag)
  return new Complex(real, imag)
}

Complex.prototype.toString = function () {
  let str = this.imag < 0 ? '' : '+'
  return this.real + str + this.imag + 'i'
}

// let c1 = new Complex(4, 5)
// let c2 = new Complex(1, -2)

// let c3 = c1.plus(c2)
// let c4 = c1.minus(c2)
// let c5 = c1.multiple(c2)
// let c6 = c1.div(c2)

// console.log(c6.toString()) // 2+3i
// console.log(c2.toString()) // 2+3i

// 表示一个单向链表
function LinkedList() {
  this._head = null
  this._length = 0
}
// 返回链表第idx个结点的值
LinkedList.prototype.at = function (idx) {
  let cur = this._head
  while (cur && idx > 0) {
    cur = cur.next
    idx--
  }
  return cur ? cur.val : undefined
}
// 设置链表第idx项的值为val
LinkedList.prototype.set = function (idx, val) {
  let cur = this._head
  while (cur && idx > 0) {
    cur = cur.next
  }
  if (cur) {
    cur.val = val
  }
}
// 在链表末尾新增一个结点，值为val
LinkedList.prototype.append = function (val) {
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
// 返回链表末尾结点的值，并删除末尾结点
LinkedList.prototype.pop = function () {
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
// 在链表头部新增一个结点，值为val
LinkedList.prototype.prepend = function (val) {
  let node = {
    val: val,
    next: this._head,
  }
  this._length++
  this._head = node
  return this
}
// 返回链表第一个结点的值，并删除这一个结点
LinkedList.prototype.shift = function () {
  if (this._head == null) {
    return undefined
  }
  this._length--
  let result = this._head.val
  this._head = this._head.next
  return result
}
LinkedList.prototype.toArray = function () {
  let result = []
  let cur = this._head
  while (cur) {
    result.push(cur.val)
    cur = cur.next
  }
  return result
}
LinkedList.prototype.toString = function () {
  return this.toArray().join('->')
}
Object.defineProperty(LinkedList.prototype, 'length', {
  get: function () {
    return this._length
  },
})

// 表示一个集合（集合中元素没有序，但不能重复）
// 构造函数可选的可以传入集合中的初始值，但会被去重后存放
function MySet(initalValues = []) {
  this._elements = []
  for (let item of initalValues) {
    this.add(item)
  }
}
// 向集合中添加元素
MySet.prototype.add = function (val) {
  if (!this._elements.includes(val)) {
    this._elements.push(val)
  }
  return this
}
// 从集合中删除item元素
MySet.prototype.delete = function (item) {
  let idx = this._elements.indexOf(item)
  if (idx >= 0) {
    this._elements.splice(idx, 1)
    return true
  }
  return false
}

// 获取集合中的元素用 c.size，它是一个getter
Object.defineProperty(MySet.prototype, 'size', {
  get: function () {
    return this._elements.length
  },
})

// 清空集合中的所有元素
MySet.prototype.clear = function () {
  this._elements = []
}

// 判断集合中是否存在某元素
MySet.prototype.has = function (item) {
  return this._elements.includes(item)
}
// 遍历集合中的元素（顺序无所谓）
MySet.prototype.forEach = function (func) {
  for (let item of this._elements) {
    func(item)
  }
}
