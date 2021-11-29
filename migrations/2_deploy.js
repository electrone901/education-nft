const MyCommunity = artifacts.require('Community')
const MyRandom = artifacts.require('Random')

module.exports = function (deployer) {
  deployer.deploy(MyCommunity)
  deployer.deploy(MyRandom)
}
