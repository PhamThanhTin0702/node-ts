import express from "express";

class App {
    private app: express.Application

    constructor() {
        this.app = express();
    }

    public create() : express.Application {
        return this.app;
    }
}

export default App