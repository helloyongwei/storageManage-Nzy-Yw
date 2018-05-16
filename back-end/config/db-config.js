const databaseName = 'storagemanage'
const databaseType = 'mysql'
const host = 'localhost'
const user = 'root'
const password = 'Nzy19970502'
const poolConfig = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
}

module.exports = {
  databaseName,
  databaseType,
  host,
  user,
  password,
  poolConfig
}
