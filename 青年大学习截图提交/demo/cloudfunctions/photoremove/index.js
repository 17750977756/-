const cloud = require('tcb-admin-node');
cloud.init();
const db = cloud.database();
const _ = db.command;
exports.main = async (event, context) => {
  //获得函数调用者信息
  const auth = cloud.auth().getUserInfo();
  let result = {};
  result.data = await db.collection('user').where({
    _openid:auth.customUserId,//选取取openid为调用者的数据
  }).update({
    photo: _.pull({//根据fileID删除掉元素
      fileID: event.url
    })
  })
  result.file = await cloud.deleteFile({
        fileList: [event.url]
    })
  return result;
}