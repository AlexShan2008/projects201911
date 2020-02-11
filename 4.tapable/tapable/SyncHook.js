const Hook = require('./Hook');
const HookCodeFactory = require('./HookCodeFactory');
const factory = new HookCodeFactory();
class SyncHook extends Hook {
    //  call调用的方法并不是写死，面是动态的编译出来
    compile(options) {//{args,taps}
        factory.setup(this, options);
        return factory.create(options);
    }
}
module.exports = SyncHook;

