const { SyncHook } = require("./tapable");
//const { SyncHook } = require('tapable');
debugger;
let syncHook = new SyncHook(["name", "age"]);
syncHook.tap("1", (name, age) => {
    console.log(1, name, age);
});
syncHook.tap("在这给你的插件钩子起一个名字", (name, age) => {
    console.log(2, name, age);
});
debugger;
syncHook.call("zhufeng", 10);//name,age