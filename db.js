var MongoClient = require('mongodb').MongoClient;

module.exports = {
    connection: null,

    get:function(){
        return this.connection;
    },

    close: function(){
        if(this.connection)
            this.connection.close();
    },

    connect: function(dbname,callback) {
        var self = this;
        var cacheConnection = function (err, db) {
            self.connection = db;
            callback(err);
        }

        try {
            MongoClient.connect(dbname, cacheConnection);
        } catch (ex) {
            callback(ex);
        }
    }
}
