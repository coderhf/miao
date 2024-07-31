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
        next: this._head
      }
      let node = {
        val : val,
        next: null
      }
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
        next: this._head
      }
      this._head = node
      return this
    }
    // 返回链表第一个结点的值，并删除这一个结点
    LinkedList.prototype.shift = function () {
      if (this._head == null) {
        return undefined
      }
      let result = this._head.val
      this._head = this._head.next
      return result
    }
    LinkedList.prototype.toArray = function () {
      let result = []
      let cur = this._head
      while (cur) {
        result.push(cur.val)
      }
      return result
    }
