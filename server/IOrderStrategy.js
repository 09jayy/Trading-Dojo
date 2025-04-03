class IOrderStrategy {
    async execute() {
        throw new Error('This method must be overwritten!');
    }

    async buy(sharePrice) {
        throw new Error('This method must be overwritten!');
    }

    async sell(sharePrice) {
        throw new Error('This method must be overwritten!');
    }

    getTradeType() {
        throw new Error('This method must be overwritten!');
    }
}

module.exports = IOrderStrategy;