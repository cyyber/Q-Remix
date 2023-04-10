'use strict'
import { init } from '../init'
const web3Override: Record<string, Record<string, unknown>> = {}
web3Override.eth = {}
web3Override.debug = {}
let data = init.readFile(require('path').resolve(__dirname, 'testWeb3.json'), null)
data = JSON.parse(data)

let traceWithABIEncoder = init.readFile(require('path').resolve(__dirname, 'traceWithABIEncoder.json'), null)
traceWithABIEncoder = 

data.testTraces['0x20ef65b8b186ca942fcccd634f37074dde49b541c27994fc7596740ef44cfd53'] = JSON.parse(traceWithABIEncoder)
web3Override.zond.getCode = function (address, callback) {
  if (callback) {
    callback(null, data.testCodes[address])
  } else {
    return data.testCodes[address]
  }
}

web3Override.debug.traceTransaction = function (txHash, options, callback) {
  callback(null, data.testTraces[txHash])
}

web3Override.debug.storageRangeAt = function (blockNumber, txIndex, address, start, maxSize, callback) {
  callback(null, { storage: {}, complete: true })
}

web3Override.zond.getTransaction = function (txHash, callback) {
  if (callback) {
    callback(null, data.testTxs[txHash])
  } else {
    return data.testTxs[txHash]
  }
}

web3Override.zond.getTransactionFromBlock = function (blockNumber, txIndex, callback) {
  if (callback) {
    callback(null, data.testTxsByBlock[blockNumber + '-' + txIndex])
  } else {
    return data.testTxsByBlock[blockNumber + '-' + txIndex]
  }
}

web3Override.zond.getBlockNumber = function (callback) { callback('web3 modified testing purposes :)') }

web3Override.zond.setProvider = function (provider) {}

web3Override.zond.providers = { 'HttpProvider': function (url) {} }

web3Override.zond.currentProvider = {'host': 'test provider'}

if (typeof (module) !== 'undefined' && typeof (module.exports) !== 'undefined') {
  module.exports = web3Override
}
