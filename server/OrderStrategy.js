class IOrderStrategy {
    execute() {
        throw new Error('This method must be overwritten!');
    }

    buy() {
        throw new Error('This method must be overwritten!');
    }

    sell() {
        throw new Error('This method must be overwritten!');
    }

    getTradeType() {
        throw new Error('This method must be overwritten!');
    }
}

module.exports = IOrderStrategy;