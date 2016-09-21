(function (app) {
    app.TasksService = ng.core
        .Class({
            constructor: [ng.http.Http, function (_http) {
                this.http = _http;
            }],

            get: function () {
                return this.http.get('/task')
                            .map(this.extractData)
                            .catch(this.returnError);
            },
            getUsers: function () {
                return this.http.get('/users/getActiveUsers')
                    .map(this.extractData)
                    .catch(this.returnError);
            },
            add: function(data) {
                var options = {headers: new ng.http.Headers({'Content-Type': 'application/json'})};
                return this.http.post('/task', JSON.stringify(data), options)
                    .map(this.extractData)
                    .catch(this.returnError);
            },
            update: function(data) {
                var options = {headers: new ng.http.Headers({'Content-Type': 'application/json'})};
                return this.http.post('/task/update', JSON.stringify(data), options)
                      .map(this.extractData)
                      .catch(this.returnError);
            },
            extractData: function (response) {
              if(response.status !== 200)
                throw new Error('Request failed with status: ' + response.status);
                                         
                try {
                  return response.json();           
                } catch(ex) {
                  return response.text();
                }
            },
            returnError: function(error) { 
              return Rx.Observable.throw(error.message); 
            }, 
        });
}) (window.app || (window.app = {}));