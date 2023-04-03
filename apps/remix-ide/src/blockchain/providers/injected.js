const Web3 = require('@theqrl/web3')
import { hashPersonalMessage } from '@ethereumjs/util'

class InjectedProvider {
  constructor (executionContext) {
    this.executionContext = executionContext
  }

  getAccounts (cb) {
    return this.executionContext.web3().zond.getAccounts(cb)
  }

  newAccount (passwordPromptCb, cb) {
    passwordPromptCb((passphrase) => {
      this.executionContext.web3().zond.personal.newAccount(passphrase, cb)
    })
  }

  resetEnvironment () {
     /* Do nothing. */ 
  }

  getBalanceInEther (address, cb) {
    this.executionContext.web3().zond.getBalance(address, (err, res) => {
      if (err) {
        return cb(err)
      }
      cb(null, Web3.utils.fromWei(res.toString(10), 'ether'))
    })
  }

  getGasPrice (cb) {
    this.executionContext.web3().zond.getGasPrice(cb)
  }

  signMessage (message, account, _passphrase, cb) {
    const messageHash = hashPersonalMessage(Buffer.from(message))
    try {
      this.executionContext.web3().zond.personal.sign(message, account, (error, signedData) => {
        cb(error, '0x' + messageHash.toString('hex'), signedData)
      })
    } catch (e) {
      cb(e.message)
    }
  }

  getProvider () {
    return 'injected'
  }
}

module.exports = InjectedProvider
