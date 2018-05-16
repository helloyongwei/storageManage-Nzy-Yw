const errEmptyEmail = {code: 0, msg: '邮箱不能为空'}
const errEmptyPassword = {code: 1, msg: '密码不能为空'}
const errTokenExpired = {code: 2, msg: '登录失效，请重新登录'}
const errLogin = {code: 3, msg: '登录出错'}
const errNoSuchUser = {code: 4, msg: '查无该用户'}
const errInvalidPassword = {code: 5, msg: '账号密码错误'}
const errServer = {code: 6, msg: '服务器错误，请重试'}
const errLowAuthLevel = {code: 7, msg: '你的权限不够'}
const errNotLogin = {code: 8, msg: '请先登录'}
const errToeknNotMatchUserId = {code: 9, msg: '身份不合法'}
const errPostDataInvalid = {code: 9, msg: '提交的数据不合法'}

const errSqlInsertParamLack = {code: 100, msg: '插入数据参数不全'}
const errSqlSystemError = {code: 101, msg: '数据库操作出错，请重试'}
const errSqlInsertUserErrAuthLevel = {code: 102, msg: '没有该权限可选'}
const errSqlInsertUserEmailAlreadyExists = {code: 103, msg: '邮箱已存在'}

module.exports = {
  errEmptyEmail,
  errEmptyPassword,
  errTokenExpired,
  errLogin,
  errNoSuchUser,
  errInvalidPassword,
  errServer,
  errLowAuthLevel,
  errNotLogin,
  errSqlInsertParamLack,
  errSqlSystemError,
  errSqlInsertUserErrAuthLevel,
  errSqlInsertUserEmailAlreadyExists,
  errToeknNotMatchUserId,
  errPostDataInvalid
}
