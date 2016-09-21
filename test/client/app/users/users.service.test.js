describe('users service tests', function() {
  var sandbox;               
  var http;
  var observable;
  var usersService;
  
  beforeEach(function() {                                
    sandbox = sinon.sandbox.create();
  
    http = {
      get: function() {},
      post: function() {},
    };
    
    usersService = new app.UsersService(http);
  
    observable = { 
      map: function() {},
      catch: function() {}
    };
  
    sandbox.stub(observable, 'map')
           .withArgs(usersService.extractData)
           .returns(observable);
  
    sandbox.stub(observable, 'catch')
           .withArgs(usersService.returnError)
           .returns(observable);
  });
  
  afterEach(function() {
    sandbox.restore();
  });

  it('should inject HTTP into the constructor', function() {
    var injectedServices = 
      Reflect.getMetadata('parameters', app.UsersService);
                                              
    expect(injectedServices[0]).to.be.eql([ng.http.Http]);
  });
  
  it('get should make GET request to /users', function() {
  	 sandbox.stub(http, 'get')
           .withArgs('/users')
           .returns(observable);

    expect(usersService.get()).to.be.eql(observable);
    expect(http.get.calledWith('/users')).to.be.true;
    expect(observable.map.calledWith(usersService.extractData)).to.be.true;
    expect(observable.catch.calledWith(usersService.returnError)).to.be.true;
  });
     
   
  it('add should pass users to /users using POST', function() {
    var usersStub = {first: 'Priya', last: "Kumari", active: true};
  
    var options = 
      {headers: new ng.http.Headers({'Content-Type': 'application/json'})};
               
      sandbox.stub(http, 'post')
           .withArgs('/users', JSON.stringify(usersStub), options)
           .returns(observable);
  
    expect(usersService.add(usersStub)).to.be.eql(observable);
    expect(observable.map.calledWith(usersService.extractData)).to.be.true;
    expect(observable.catch.calledWith(usersService.returnError)).to.be.true;
  
  
  });

  it('enableDisableUser should pass users to /users/enableDisableUser using POST', function() {
    var usersStub = {_id: '1', active: true};
  
    var options = 
      {headers: new ng.http.Headers({'Content-Type': 'application/json'})};
               
      sandbox.stub(http, 'post')
           .withArgs('/users/enableDisableUser', JSON.stringify(usersStub), options)
           .returns(observable);
  
    expect(usersService.enableDisableUser(usersStub)).to.be.eql(observable);
    expect(observable.map.calledWith(usersService.extractData)).to.be.true;
    expect(observable.catch.calledWith(usersService.returnError)).to.be.true;
  
  
  });

  it('extractData should return result from json()', function() {
    var fakeJSON = {};
    var response = {status: 200, json: function() { return fakeJSON; } };
    
    expect(usersService.extractData(response)).to.be.eql(fakeJSON);
  });
  
  it('extractData should throw exception for invalid status', function() {
    var response = {status: 404 };
    
    expect(function() { 
      usersService.extractData(response);
      }).to.throw('Request failed with status: 404');
  });
  
  it('returnError should return an error Observable', function() {
    var error = {message: 'oops'};
    var obervableThrowMock = 
      sandbox.mock(Rx.Observable)
             .expects('throw')
             .withArgs(error.message);
           
      usersService.returnError(error);
      obervableThrowMock.verify();
  });  
  
  it('extractData should return text if not json()', function() {
    var fakeBody = 'somebody';
    var response = {status: 200, text: function() { return fakeBody; } };
    
    expect(usersService.extractData(response)).to.be.eql(fakeBody);
  });
});
