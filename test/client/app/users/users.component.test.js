describe('users component tests', function() {
  var sandbox;  
  var usersComponent;
  var usersService;
  var observable = { subscribe: function() {} };
  var updateDataBindStub = function() {};
  var updateErrorBindStub = function() {};
  var successMessageBindStub = function() {};
  // var sortPipe = { transform: function(data) { return data; } };
  
  beforeEach(function() {
    usersService = {
      get: function() {},
      add: function() {},
      enableDisableUser: function() {},
    };   
    
    usersComponent = new app.UsersComponent(usersService);
  
    sandbox = sinon.sandbox.create();    
    
    sandbox.stub(usersComponent.updateData, 'bind')
           .withArgs(usersComponent)
           .returns(updateDataBindStub);
           
    sandbox.stub(usersComponent.updateError, 'bind')
           .withArgs(usersComponent)
           .returns(updateErrorBindStub);
  
    sandbox.stub(usersComponent.successMessage, 'bind')
           .withArgs(usersComponent)
           .returns(successMessageBindStub);
  
    sandbox.stub(usersService, 'get')
           .withArgs()
           .returns(observable);
 
    sandbox.stub(usersService, 'add')
           .withArgs()
           .returns(observable);
  });
                                     
  afterEach(function() {
    sandbox.restore();
  });          
  
  it('should set the selector attribute', function() {
    var componentAnnotations = 
      Reflect.getMetadata('annotations', app.UsersComponent)[0];
   
    expect(componentAnnotations.selector).to.be.eql('users-list');
  });
  
  it('should set the templateUrl attribute', function() {
    var componentAnnotations = 
      Reflect.getMetadata('annotations', app.UsersComponent)[0];
   
    expect(componentAnnotations.templateUrl).to.be.eql(
      'users.html');
  });
  
  it('UsersService should be injected into the component', function() {
    var injectedServices = 
      Reflect.getMetadata('parameters', app.UsersComponent);

    expect(injectedServices[0]).to.be.eql([app.UsersService]);
  });

  it('should initialize errorMessage to an empty string', function() {
    expect(usersComponent.errorMessage).to.be.eql('');
  });

  it('should initialize formMessage to an empty string', function() {
    expect(usersComponent.formMessages).to.be.eql('');
  });
  
  
  it('should initialize user to an empty array', function() {
    expect(usersComponent.users).to.be.eql([]);
  });

  it('should initialize newUser to an empty json object', function() {
    expect(usersComponent.newUser).to.be.eql({});
  });

  it('successMessage should update message and call getUsers', function(done) {
    usersComponent.getUsers = function() { done(); };
    usersComponent.successMessage('good');
    expect(usersComponent.formMessages).to.be.eql('good');
  });
  
  it('getUsers should register handlers with service', function() {
    var observableMock = 
      sandbox.mock(observable)
             .expects('subscribe')
             .withArgs(updateDataBindStub, updateErrorBindStub);
    
    usersComponent.getUsers();
    
    observableMock.verify();
  });
  
  it('updateData should update users', function() {
    var usersStub = [{first:"Priya", last: "Kumari", active: true}];
    usersComponent.updateData(usersStub);
    expect(usersComponent.users).to.be.eql(usersStub);
  });
  
  it('updateData should update message when nothing is there in the list', function() {
    usersComponent.updateData([]);
    expect(usersComponent.formMessages).to.be.eql('No users found');
  });

  it('checkIfDisabled should update users status when user is inactive', function() {
    var usersStub = [{first:"Priya", last: "Kumari", active: true}];
    usersComponent.updateData(usersStub);
    expect(usersComponent.users).to.be.eql( [{first:"Priya", last: "Kumari", active: true, class: "enable", status: "Active"}]);
  });
  
   it('checkIfDisabled should update users status when the user is active', function() {
    var usersStub = [{first:"Priya", last: "Kumari", active: false}];
    usersComponent.updateData(usersStub);
    expect(usersComponent.users).to.be.eql( [{first:"Priya", last: "Kumari", active: false, class: "disable", status: "Inactive"}]);
  });
  

  it('updateError should update message', function() {
    usersComponent.updateError('Not Found');
    expect(usersComponent.errorMessage).to.be.eql('Not Found');
  });
  
  it('getUsers should be called on init', function() {
    var getUsersMock = sandbox.mock(usersComponent)
                               .expects('getUsers');
                              
    usersComponent.ngOnInit();
    getUsersMock.verify();
  });
  

  it('addUser should register handlers with service', function() {
    var observableMock = 
      sandbox.mock(observable)
             .expects('subscribe')
             .withArgs(successMessageBindStub, updateErrorBindStub);

    var newUser = [{first:"Priya", last: "Kumari"}];
     
    usersComponent.addUser();
    
    observableMock.verify();
  });
  

  it('enableDisableUser  should register handlers with service', function() {
    var observableMock = 
      sandbox.mock(observable)
             .expects('subscribe')
             .withArgs(successMessageBindStub, updateErrorBindStub);
  
    var userStub = { _id : "1",
        active: true
    };
    
    sandbox.stub(usersService, 'enableDisableUser')
           .withArgs()
           .returns(observable);
    
    usersComponent.enableDisableUser(userStub);
    
    observableMock.verify();
  });
  
});