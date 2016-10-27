// 获取屏幕宽度
exports.getWindowWidth = function () {
  return window.innerWidth
}
// 获取屏幕DPR
exports.getDPR = function () {
  return window.lib.flexible.dpr
}
// 获取点
exports.getAnchors = function (p1x, p1y, p2x, p2y, p3x, p3y) {
  var l1 = (p2x - p1x) / 2
  var l2 = (p3x - p2x) / 2
  var a = Math.atan((p2x - p1x) / Math.abs(p2y - p1y))
  var b = Math.atan((p3x - p2x) / Math.abs(p2y - p3y))
  a = p1y < p2y ? Math.PI - a : a
  b = p3y < p2y ? Math.PI - b : b
  var alpha = Math.PI / 2 - ((a + b) % (Math.PI * 2)) / 2
  var dx1 = l1 * Math.sin(alpha + a)
  var dy1 = l1 * Math.cos(alpha + a)
  var dx2 = l2 * Math.sin(alpha + b)
  var dy2 = l2 * Math.cos(alpha + b)
  return {
    x1: p2x - dx1,
    y1: p2y + dy1,
    x2: p2x + dx2,
    y2: p2y + dy2
  }
}

exports.getLocalStorage = function (key) {
  var val = window.localStorage.getItem(key)
  if (val) {
    return JSON.parse(val)
  }
  return []
}
exports.setLocalStorage = function (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

var ObjProto = Object.prototype
var ArrayProto = Array.prototype
var FuncProto = Function.prototype
var nativeBind = FuncProto.bind
var nativeForEach = ArrayProto.forEach
var nativeKeys = Object.keys
var slice = ArrayProto.slice
var toString = ObjProto.toString
var Ctor = function () {}
var breaker = {}
exports.jsExt = {
  initialize: function () {
    this.is()
  },
  is: function () {
    var that = this
    this.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function (name) {
      that['is' + name] = function (obj) {
        return toString.call(obj) === '[object ' + name + ']'
      }
    })
  },
  has: function (obj, key) {
    return ObjProto.hasOwnProperty.call(obj, key)
  },
  isObject: function (obj) {
    return obj === Object(obj)
  },
  keys: function (obj) {
    if (!this.isObject(obj)) {
      return []
    }
    if (nativeKeys) {
      return nativeKeys(obj)
    }
    var keys = []
    for (var key in obj) {
      if (this.has(obj, key)) {
        keys.push(key)
      }
    }
    return keys
  },
  each: function (obj, iterator, context) {
    if (obj === null) {
      return obj
    }
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context)
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) {
          return
        }
      }
    } else {
      var keys = this.keys(obj)
      for (var j = 0, len = keys.length; j < len; j++) {
        if (iterator.call(context, obj[keys[j]], keys[j], obj) === breaker) {
          return
        }
      }
    }
    return obj
  },
  bind: function (func, context) {
    var args, bound
    if (nativeBind && func.bind === nativeBind) {
      return nativeBind.apply(func, slice.call(arguments, 1))
    }
    if (!this.isFunction(func)) {
      throw new TypeError()
    }
    args = slice.call(arguments, 2)
    bound = function () {
      if (!(this instanceof bound)) {
        return func.apply(context, args.concat(slice.call(arguments)))
      }
      Ctor.prototype = func.prototype
      var self = new Ctor()
      Ctor.prototype = null
      var result = func.apply(self, args.concat(slice.call(arguments)))
      if (Object(result) === result) {
        return result
      }
      return self
    }
    return bound
  },
  extend: function (obj) {
    this.each(slice.call(arguments, 1), function (source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop]
        }
      }
    })
    return obj
  }
}
