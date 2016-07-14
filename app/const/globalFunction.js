/**
 * Created by Administrator on 2015/6/18.
 */
var GC = require('./globalConsts');

var globalFunction = module.exports;

if (GC.OPEN_A_DEBUGLOG) {
    globalFunction.DEBUG_A_LOG = console.log;

} else {
    globalFunction.DEBUG_A_LOG = function () {
    };
}

if (GC.OPEN_B_DEBUGLOG) {
    globalFunction.DEBUG_B_LOG = console.warn;
} else {
    globalFunction.DEBUG_B_LOG = function () {
    };
}

if (GC.OPEN_C_DEBUGLOG) {
    globalFunction.DEBUG_C_LOG = console.error;
} else {
    globalFunction.DEBUG_C_LOG = function () {
    };
}

//改变数组里面的内容的首字母，产生一个新字母返回
globalFunction.changeFirstChar = function (arrays, c1, c2) {

    for (var i = 0; i < arrays.length; i++) {
        arrays[i] = arrays[i].replace(c1, c2);
    }
    return arrays;
};

globalFunction.setApp = function (app) {
    globalFunction.app = app;
};

//设置全局限制掉落
globalFunction.setLimitDroupOut = function (limitDroupOutData) {
    globalFunction.limitDroupOutData = limitDroupOutData;
};

//在AR模式下，数据是否保存  防止在AR模式下，还没有退出AR模式，就和服务器断了连接的情况下要保存数据
globalFunction.setIsSave = function (isSave) {
    globalFunction.isSave = isSave;
};

//根据环境来选择不同的目录来加载JSON文件
globalFunction.lodConfig = function (fName) {
    var folderName = 'development';
    if (process.env.NODE_ENV === 'production') {
        folderName = 'production';
    }
    var cDir = process.cwd();
    var pathName = cDir+'/config/'+ folderName +'/'+ fName;
    return require(pathName);

};