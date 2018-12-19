module.exports = (config) => {
  return {
    dbMethods: require('./dbMethods')(config),    
  }
}