describe('task service tests', function() {
  var sandbox;               
  var http;
  var observable;
  var tasksService;
  
  beforeEach(function() {                                
    sandbox = sinon.sandbox.create();
  
    http = {
      get: function() {},
      post: function() {},
    };
    
    tasksService = new app.TasksService(http);
  
    observable = { 
      map: function() {},
      catch: function() {}
    };
  
   
    sandbox.stub(observable, 'map')
           .withArgs(tasksService.extractData)
           .returns(observable);
  
    sandbox.stub(observable, 'catch')
           .withArgs(tasksService.returnError)
           .returns(observable);
  });
  
  afterEach(function() {
    sandbox.restore();
  });

  it('should inject HTTP into the constructor', function() {
    var injectedServices = 
      Reflect.getMetadata('parameters', app.TasksService);
                                              
    expect(injectedServices[0]).to.be.eql([ng.http.Http]);
  });
  
  it('get should make GET request to /task', function() {
  	sandbox.stub(http, 'get')
           .withArgs('/task')
           .returns(observable);
    expect(tasksService.get()).to.be.eql(observable);
    expect(http.get.calledWith('/task')).to.be.true;
    expect(observable.map.calledWith(tasksService.extractData)).to.be.true;
    expect(observable.catch.calledWith(tasksService.returnError)).to.be.true;
  });

   it('getUsers should make GET request to /users/getActiveUsers', function() {
   	sandbox.stub(http, 'get')
           .withArgs('/users/getActiveUsers')
           .returns(observable);

    expect(tasksService.getUsers()).to.be.eql(observable);
    expect(http.get.calledWith('/users/getActiveUsers')).to.be.true;
    expect(observable.map.calledWith(tasksService.extractData)).to.be.true;
    expect(observable.catch.calledWith(tasksService.returnError)).to.be.true;
  });
  
   
  it('add should pass person to /people using POST', function() {
    var taskStub = {task: 'task1', createdBy: 'Priya', completed: "Assigned"};
  
    var options = 
      {headers: new ng.http.Headers({'Content-Type': 'application/json'})};
               
    sandbox.stub(http, 'post')
           .withArgs('/task', JSON.stringify(taskStub), options)
           .returns(observable);
  
    expect(tasksService.add(taskStub)).to.be.eql(observable);
    expect(observable.map.calledWith(tasksService.extractData)).to.be.true;
    expect(observable.catch.calledWith(tasksService.returnError)).to.be.true;
  
  
  });

   it('update should pass person to /people using POST', function() {
    var taskStub = {task: 'task1', createdBy: 'Priya', completed: "Completed"};
  
    var options = 
      {headers: new ng.http.Headers({'Content-Type': 'application/json'})};
               
    sandbox.stub(http, 'post')
           .withArgs('/task/update', JSON.stringify(taskStub), options)
           .returns(observable);
  
    expect(tasksService.update(taskStub)).to.be.eql(observable);
    expect(observable.map.calledWith(tasksService.extractData)).to.be.true;
    expect(observable.catch.calledWith(tasksService.returnError)).to.be.true;
  
  
  });
  
  it('extractData should return text if not json()', function() {
    var fakeBody = 'somebody';
    var response = {status: 200, text: function() { return fakeBody; } };
    
    expect(tasksService.extractData(response)).to.be.eql(fakeBody);
  });

    it('extractData should return result from json()', function() {
    var fakeJSON = {};
    var response = {status: 200, json: function() { return fakeJSON; } };
    
    expect(tasksService.extractData(response)).to.be.eql(fakeJSON);
  });
  
  it('extractData should throw exception for invalid status', function() {
    var response = {status: 404 };
    
    expect(function() { 
      tasksService.extractData(response);
      }).to.throw('Request failed with status: 404');
  });
  
  it('returnError should return an error Observable', function() {
    var error = {message: 'oops'};
    var obervableThrowMock = 
      sandbox.mock(Rx.Observable)
             .expects('throw')
             .withArgs(error.message);
           
      tasksService.returnError(error);
      obervableThrowMock.verify();
  });   
});
