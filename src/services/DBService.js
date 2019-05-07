import { lorem } from 'faker';

let _dbService;

const MIN_RESPONSE_TIME = 10000;
const MAX_RESPONSE_TIME = 20000;

class DBService {
    generateData() {
        return new Promise(resolve =>
            setTimeout(
                () => resolve({ result: lorem.paragraph() }),
                Math.floor(
                    Math.random() * (MAX_RESPONSE_TIME - MIN_RESPONSE_TIME + 1)
                ) + MIN_RESPONSE_TIME
            )
        );
    }
}

_dbService = new DBService();
export default _dbService;
