let trash1 = require('./1.js'); //湿垃圾
let trash2 = require('./2.js'); //干垃圾
let trash3 = require('./3.js'); //可回收垃圾
let trash4 = require('./4.js'); //有害垃圾
let trash5 = require('./5.js'); //不属于日常生活垃圾
let trash6 = require('./6.js'); //装修垃圾，请咨询物业
let trash7 = require('./7.js'); //大件垃圾，请咨询物业

let trashCategories = ['湿垃圾', '干垃圾', '可回收物', '有害垃圾', '不属于日常生活垃圾', '装修垃圾，请咨询物业', '大件垃圾，请咨询物业'];

let alltrashes = [...trash1, ...trash2, ...trash3, ...trash4, ...trash5, ...trash6, trash7];

let data = {
  trashCategories,
  alltrashes,
  trashData: [{
    name: '湿垃圾',
    color: '#664035',
    enName: 'wet',
    data: trash1,
    desc: `湿垃圾又称为厨余垃圾，即易腐垃圾，指食材废料、剩菜剩饭、过期食品、瓜皮果核、花卉绿植、中药药渣等易腐的生物质生活废弃物。`
  }, {
    name: '干垃圾',
    color: '#2C2B27',
    enName: 'dry',
    data: trash2,
    desc: `干垃圾即其它垃圾，指除可回收物、有害垃圾、厨余垃圾（湿垃圾）以外的其它生活废弃物。`
  }, {
    name: '可回收物',
    color: '#104883',
    enName: 'recyclable',
    data: trash3,
    desc: `可回收垃圾就是可以再生循环的垃圾。本身或材质可再利用的纸类、硬纸板、玻璃、塑料、金属、塑料包装，与这些材质有关的如：报纸、杂志、广告单及其它干净的纸类等皆可回收。
`
  }, {
    name: '有害垃圾',
    color: '#E53122',
    enName: 'hazardous',
    data: trash4,
    desc: `有害垃圾指废电池、废灯管、废药品、废油漆及其容器等对人体健康或者自然环境造成直接或者潜在危害的生活废弃物。`
  }]
};

module.exports = data;