const { promises: fs} = require('fs');

class Messages {
    constructor(){
        /*
        Array with this type of objects:
            {
                mail: String,
                timestamp: Date,
                message: String
            }
        */
        this.path = '../contenedores/messages.json';
        try{
            fs.readFile(this.path, 'utf8').then(data => {
                this.messages = JSON.parse(data);
            })
        }catch(error) {
            console.error(error);
            this.messages = [];
        }
    }
    async addMessage(msg){
        try{
            this.messages.push(msg);
            fs.writeFile(this.path, JSON.stringify(this.messages, null, 2), "utf-8");
        }catch (error){
            console.error(error);
        }
    }

    getAll(){
        return this.messages;
    }
}

module.exports=Messages;