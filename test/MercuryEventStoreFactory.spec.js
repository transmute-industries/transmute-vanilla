
var Web3 = require('web3')
var MercuryEventStoreFactory = artifacts.require('./MercuryEventStoreFactory.sol')
var MercuryEventStore = artifacts.require('./MercuryEventStore.sol')


// Once https://github.com/transmute-industries/transmute-framework/issues/27 is resolved
// Use var TransmuteFramework = require('transmute-framework')
// don't use helpers...

var {
    transactionToEventCollection,
} = require('./helpers')

var _ = require('lodash')


contract('MercuryEventStoreFactory', (accounts) => {
    let factory, eventStoreContractAddress
    let factoryCreatorAddress = accounts[0]
    let mercuryStoreName = 'apollo'
    it('is deployed contract', async () => {
        factory = await MercuryEventStoreFactory.deployed()
        return factory
    })

    describe('.createEventStore', () => {
        it('returns an address', async () => {
            let newESAddress = await factory.createMercuryEventStore.call({
                from: factoryCreatorAddress
            })
            let isNewESAddressValid = web3.isAddress(newESAddress)
            assert(isNewESAddressValid === true)
        })

        it('creates an event store contract', async () => {
            let tx = await factory.createMercuryEventStore({
                from: factoryCreatorAddress,
                gas: 2000000,
            })
            let events = transactionToEventCollection(tx)

            let createdEvent =  _.find(events, (evt) =>{
                return evt.Type === 'FACTORY_EVENT_STORE_CREATED'
            })
            eventStoreContractAddress = createdEvent.ContractAddress
            assert(createdEvent.Type === 'FACTORY_EVENT_STORE_CREATED')
        })
    })

    describe('.getMercuryEventStores', () => {
        it('returns an array of mercury event store contract addresses', async () => {
            let mercuryEventStoreContractAddresses = await factory.getMercuryEventStores({
                from: factoryCreatorAddress
            })
            mercuryEventStoreContractAddresses.forEach((address) =>{
                assert(web3.isAddress(address) === true)
            })
        })
    })
})
