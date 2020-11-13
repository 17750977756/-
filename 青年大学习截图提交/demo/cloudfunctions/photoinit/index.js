const cloud = require('tcb-admin-node');
cloud.init();
const db = cloud.database();

exports.main = async (event, context) => {
  const auth = cloud.auth().getUserInfo();
  //获得函数调用者信息
  return (await db.collection('user').where({
      _openid:auth.customUserId//获取openid为调用者的数据
    }).field({
      _openid:false
    }).get()).data;
}