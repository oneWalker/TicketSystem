var aaa = '{"status":200,"info":[{"playerId":"806","playerName":"测试2","time":"2015-12-27 17:24:16"}]}';

//var bbb = {a:123,b:"bsdf"};
//console.log(bbb.a)
var aa = JSON.parse(aaa);
var cc = aa.info
console.log("C+",cc[0]);
var ee = cc[0];
console.log("E+",ee.playerId);

var dd = JSON.stringify(cc[0]);
console.log("D+",aa.info.length);
