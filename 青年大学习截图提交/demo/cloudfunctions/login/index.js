const cloud = require('tcb-admin-node');

cloud.init({
  env: cloud.getCurrentEnv(),
  credentials: require('tcb_custom_login.json')
});
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  let body = {};
  try{
    if(event.queryStringParameters.number!=null){
      const ids = (await db.collection('admin').where({
        _id:event.queryStringParameters.number
      }).get()).data;
      if(ids.length!=0){
        body.ticket = cloud.auth().createTicket(ids[0]._openid, {
          refresh: 10 * 60 * 1000
        });
        body.code = 0;
      }
    }
  }catch(e){
    body.code = -1;
    body.err = e;
    console.log(e);
  }
  return {
    statusCode: 200,
    headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'*',
        'Access-Control-Max-Age':'3600',
        'Access-Control-Allow-Headers':'Content-Type'
    },
    body: body
};
}