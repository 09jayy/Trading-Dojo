class OrderBook {
    static _instance = null;

    constructor() {
        if (OrderBook._instance) {
            return OrderBook._instance;
        }
        OrderBook._instance = this;
    }

    static getInstance() {
        return OrderBook._instance;
    }
}