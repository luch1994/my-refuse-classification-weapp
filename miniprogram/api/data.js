const regeneratorRuntime = require('../utils/runtime.js');
const db = wx.cloud.database();

const getStorage = (key) => {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key,
      success: function(res) {
        resolve(res.data);
      },
      fail: function(res) {
        resolve(false);
      }
    });
  });
}

const getSimpleTrashData = async() => {
  let simpleTrashData = await getAllSimpleTrashData();
  return simpleTrashData.slice(0, 4);
}

const getAllSimpleTrashData = async() => {
  let simpleTrashData = await getStorage('simpleTrashData');
  if (!simpleTrashData || !simpleTrashData.length) {
    simpleTrashData = await getDbSimpleTrashData();
  }
  return simpleTrashData;
}

const getDbSimpleTrashData = async() => {
  let res = await db.collection('trashes').field({
    _id: true,
    color: true,
    desc: true,
    enName: true,
    name: true
  }).get();
  let data = res.data;
  data = data.map(item => {
    item.data = [];
    return item;
  });
  wx.setStorage({
    key: 'simpleTrashData',
    data: data
  });
  return data;
}

const getTrashListData = async(id) => {
  let trashListData = await getStorage(id);
  if (!trashListData || !trashListData.length) {
    trashListData = await getDbTrashListData(id);
  }
  return trashListData;
}

const getDbTrashListData = async(id) => {
  let res = await db.collection('trashes').doc(id).field({
    data: true
  }).get();
  let data = res.data.data;
  wx.setStorage({
    key: id,
    data: data,
  })
  return data;
}

const getAllTrashCategory = async() => {
  let allSimpleData = await getAllSimpleTrashData();
  let res = [];
  for (let item of allSimpleData) {
    res.push(item.name);
  }
  return res;
}

const getAllTrashListData = async() => {
  let res = await Promise.all([getTrashListData('trash-0'), getTrashListData('trash-1'), getTrashListData('trash-2'), getTrashListData('trash-3'), getTrashListData('trash-4'), getTrashListData('trash-5'), getTrashListData('trash-6')]);
  let data = [...res[0], ...res[1], ...res[2], ...res[3], ...res[4], ...res[5], ...res[6]];
  return data;
}

module.exports = {
  getSimpleTrashData,
  getTrashListData,
  getAllTrashCategory,
  getAllTrashListData
}