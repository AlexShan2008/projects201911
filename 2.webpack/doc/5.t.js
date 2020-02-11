// create a fake namespace object 创建一个命名空间对象
// mode & 1: value is a module id, require it
// mode & 2: merge all properties of value into the ns
// mode & 4: return value when already ns object
// mode & 8|1: behave like require
//value可能是一个模块ID，也可能是一个模块对象

__webpack_require__.t = function (value, mode) {
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if ((mode & 4) && typeof value === 'object' && value && value.__esModule)
        return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    if (mode & 2 && typeof value != 'string') for (var key in value)
        __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
    return ns;
};


let modules = {
    'moduleA': function (module, exports) {
        module.exports = 'moduleA导出内容';
    },
    'moduleB': function (module, exports) {
        module.exports = {
            __esModule: true,
            default: 'moduleB导出内容'
        };
    },
    'moduleC': function (module, exports) {
        module.exports = { name: 'moduleC导出内容' };
    }
}
function t(value, mode) {
    if (mode & 1) {//模块ID需要加载
        value = __webpack_require__(value);
    }
    if (mode & 4) {//如果已经是es6模块了，则直接返回
        if (value.__esModule)
            return value;
    }
    if (mode & 8) return value; //直接返回，不需要包装成es6 modules
    var ns = Object.create(null);
    ns.__esModule = true;
    ns.default = value;//把value放在新创建的命名空间的default属性上
    if (mode & 2) {//如果2为true,就把value的所有属性都拷贝到ns对象上
        for (let key in value) {
            ns[key] = value[key];
        }
    }
    return ns;
}

function t2(value, isModuleId, returnEs6Modules, immediatelyReturn, copyAttributes) {
    if (isModuleId) {//模块ID需要加载
        value = __webpack_require__(value);
    }
    if (returnEs6Modules) {//如果已经是es6模块了，则直接返回
        if (value.__esModule)
            return value;
    }
    if (immediatelyReturn) return value; //直接返回，不需要包装成es6 modules
    var ns = Object.create(null);
    ns.__esModule = true;
    ns.default = value;//把value放在新创建的命名空间的default属性上
    if (copyAttributes) {//如果2为true,就把value的所有属性都拷贝到ns对象上
        for (let key in value) {
            ns[key] = value[key];
        }
    }
    return ns;
}
let moduleA = t('moduleA', 0b1001);
console.log(moduleA);
let moduleB = t('moduleB', 0b0101);
console.log(moduleB.default);
//强行的把moduleC按照es6module返回
let moduleC = t2('moduleC', true, true, false, true);// 0111转成十进制7 1+2+4
console.log(moduleC);
function __webpack_require__(moduleId) {
    //声明了一个新的模块
    var module = {
        i: moduleId,
        l: false,
        exports: {}
    }
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    module.l = true;
    return module.exports;
}