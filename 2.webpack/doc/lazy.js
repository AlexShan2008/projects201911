(function (modules) { // webpackBootstrap

  var installedModules = {};
  function webpackJsonpCallback(data) {
    let chunkIds = data[0];// ['title']
    let moreModules = data[1];
    var chunkId;
    let resolves = []
    for (let i = 0; i < chunkIds.length; i++) {
      chunkId = chunkIds[i];
      resolves.push(installedChunks[chunkId][0]);
      installedChunks[chunkId] = 0;
    }
    for (let moduleId in moreModules)
      modules[moduleId] = moreModules[moduleId];
    //resolves.forEach(resolve => resolve());
    while (resolves.length) {
      resolves.shift()();
    }
  }
  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };

    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded
    module.l = true;

    // Return the exports of the module
    return module.exports;
  }


  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };

  // define __esModule on exports
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };

  // create a fake namespace object
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  __webpack_require__.t = function (value, mode) {
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
    return ns;
  };

  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter = module && module.__esModule ?
      function getDefault() { return module['default']; } :
      function getModuleExports() { return module; };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };
  //undefined未加载  null 准备加载 promise加载中  0加载完成
  var installedChunks = {
    main: 0 //默认情况我们这个文件只包含入口代码块main 0
  }
  __webpack_require__.e = function (chunkId) {
    //let promises = [];
    var installChunkData = installedChunks[chunkId];//先从缓存里取得当前代码块的加载状态 
    var promise;
    if (installChunkData != 0) {//表示未加载，需要立刻加载
      promise = new Promise(function (resolve, reject) {
        installChunkData = installedChunks[chunkId] = [resolve, reject];
      });
      //installChunkData[2] = promise;
      promises.push(promise);
      let script = document.createElement('script');
      script.src = chunkId + '.bundle.js';
      document.head.appendChild(script);
    }
    return promise;
    //return Promise.all(promises);
  }
  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

  // __webpack_public_path__
  __webpack_require__.p = "";
  var jsonArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
  jsonArray.push = webpackJsonpCallback;
  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
  /************************************************************************/
  ({

    "./src/index.js":
      (function (module, exports, __webpack_require__) {
        var button = document.createElement('button');
        button.innerHTML = '异步加载额外的模块';
        button.onclick = function () {
          //绑定一个事件  
          __webpack_require__.e("title").then(__webpack_require__.t.bind(null, /*! ./title */ "./src/title.js", 7)).then(function (result) {
            console.log(result);
          });
        };
        document.body.appendChild(button);
      })
  });