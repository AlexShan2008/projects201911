class Hook {
    constructor(args) {
        if (!Array.isArray(args))
            args = [];
        this._args = args;//存放参数列表['name','age']
        this.taps = [];//存放监听函数 options
        this._x = undefined;//这里存放的才是真的监听函数
    }
    tap(options, fn) {
        if (typeof options === 'string')
            options = { name: options }
        options.fn = fn;
        this._insert(options);
    }
    _insert(options) {
        this.taps.push(options);
    }
    call(...args) {
        let callMethod = this._createCall();
        return callMethod.apply(this, args);
    }
    _createCall() {
        return this.compile({
            taps: this.taps,
            args: this._args
        });
    }
}
module.exports = Hook;