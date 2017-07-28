var 
    camo = require('camo'),
    Document = camo.Document;

class analyst extends Document {
    constructor() {
        super();

        this.firstName = String,
        this.lastName = String,
        this.email = String
    }
}
 
module.exports = analyst;