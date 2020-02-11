class HookCodeFactory {
    setup(instance, options) {
        this.options = options;
        //hook._x 等于所有的监听函数的数组
        instance._x = options.taps.map(tap => tap.fn);
    }
    args() {
        return this.options.args.join(',');
    }
    header() {
        return (
            `
            var _context;
            var _x = this._x;
            `
        )
    }
    content() {
        let code = '';
        for (let i = 0; i < this.options.taps.length; i++) {
            code += (
                `
                var _fn${i} = _x[${i}];
                _fn${i}(${this.args()});
                `
            )
        }
        return code;
    }
    create(options) {
        return new Function(this.args(), this.header() + this.content());
    }
}
module.exports = HookCodeFactory;
/**
 * (function anonymous(name, age
) {
"use strict";
var _context;
var _x = this._x;

var _fn0 = _x[0];
_fn0(name, age);

var _fn1 = _x[1];
_fn1(name, age);

})
 */