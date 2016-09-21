describe('tasks component tests', function() {
  var sandbox;  
  var tasksComponent;
  var tasksService;
  var observable = { subscribe: function() {} };
  var updateTasksBindStub = function() {};
  var updateErrorBindStub = function() {};
  var updateMessageBindStub = function() {};
  var updateUsersBindStub = function() {};
  var succAddDelBindStub = function() {};
  
  beforeEach(function() {
    tasksService = {
      get: function() {},
      add: function(newtask) {},
      getUsers: function(){},
      update: function(){}
    };   
    
    tasksComponent = new app.TasksComponent(tasksService);
  
    sandbox = sinon.sandbox.create();    
    
    sandbox.stub(tasksComponent.updateData, 'bind')
           .withArgs(tasksComponent)
           .returns(updateTasksBindStub);
           
    sandbox.stub(tasksComponent.updateError, 'bind')
           .withArgs(tasksComponent)
           .returns(updateErrorBindStub);

    sandbox.stub(tasksComponent.updateUsers, 'bind')
           .withArgs(tasksComponent)
           .returns(updateUsersBindStub);

    sandbox.stub(tasksComponent.succAddDel, 'bind')
           .withArgs(tasksComponent)
           .returns(succAddDelBindStub);

    sandbox.stub(tasksService, 'get')
           .withArgs()
           .returns(observable);

    sandbox.stub(tasksService, 'getUsers')
           .withArgs()
           .returns(observable);
    
    sandbox.stub(tasksService, 'add')
           .withArgs()
           .returns(observable);

   });
                                     
  afterEach(function() {
    sandbox.restore();
  });          
  
  it('should set the selector attribute', function() {
    var componentAnnotations = 
      Reflect.getMetadata('annotations', app.TasksComponent)[0];
   
    expect(componentAnnotations.selector).to.be.eql('tasks-list');
  });
  
  it('should set the templateUrl attribute', function() {
    var componentAnnotations = 
      Reflect.getMetadata('annotations', app.TasksComponent)[0];
   
    expect(componentAnnotations.templateUrl).to.be.eql(
      'src/tasks/tasks.html');
  });
  
  it('should initialize error message to an empty string', function() {
    expect(tasksComponent.errorMessage).to.be.eql('');
  });

  it('should initialize form message to an empty string', function() {
    expect(tasksComponent.formMessages).to.be.eql('');
  });
  
  it('should initialize tasks to an empty array', function() {
    expect(tasksComponent.tasks).to.be.eql([]);
  });

  it('should initialize user list to an empty array', function() {
    expect(tasksComponent.usersList).to.be.eql([]);
  });

  it('should initialize new task to an empty json', function() {
    expect(tasksComponent.newTask).to.be.eql({});
  });

  it('getTasks should register handlers with service', function() {
    var observableMock = 
      sandbox.mock(observable)
             .expects('subscribe')
             .withArgs(updateTasksBindStub, updateErrorBindStub);
    
    tasksComponent.getTasks();
    
    observableMock.verify();
  });
  
  it('getUsers should register handlers with service', function() {
    var observableMock = 
      sandbox.mock(observable)
             .expects('subscribe')
             .withArgs(updateUsersBindStub, updateErrorBindStub);
    
    tasksComponent.getUsers();
    
    observableMock.verify();
  });

  it('updateUsers should update user list', function() {
    var userStub = [{sample: 1}];
    tasksComponent.updateUsers(userStub);
    expect(tasksComponent.usersList).to.be.eql(userStub);
  });

  it('updateData should update message when nothing is there in the list', function() {
    tasksComponent.updateData([]);
    expect(tasksComponent.formMessages).to.be.eql('No tasks found');
  });

  
  it('updateData should update map correctly the object with status completed', function() {
    tasksComponent.updateData([{ _id: 1,
                     task: "Task1",
                     createdBy: "Priya Kumari",
                     completed: "Completed" }]);
    expect(tasksComponent.tasks).to.be.eql([{ _id: 1,
                     task: "Task1",
                     createdBy: "Priya Kumari",
                     completed: "Completed",
                     isAssigned: true,
                     isInProgress: true,
                     isCompleted: true,
                     class : "disable",
                     display: "none"}]);
  });

  it('updateData should update map correctly the object with status assigned', function() {
    tasksComponent.updateData([{ _id: 1,
                     task: "Task1",
                     createdBy: "Priya Kumari",
                     completed: "Assigned" }]);
    expect(tasksComponent.tasks).to.be.eql([{ _id: 1,
                     task: "Task1",
                     createdBy: "Priya Kumari",
                     completed: "Assigned",
                     isAssigned: true,
                     isInProgress: false,
                     isCompleted: false,
                     class : "enable",
                     display: "inherit"}]);
  });

  it('updateData should update map correctly the object with status In Progress', function() {
    tasksComponent.updateData([{ _id: 1,
                     task: "Task1",
                     createdBy: "Priya Kumari",
                     completed: "In Progress" }]);
    expect(tasksComponent.tasks).to.be.eql([{ _id: 1,
                     task: "Task1",
                     createdBy: "Priya Kumari",
                     completed: "In Progress",
                     isAssigned: true,
                     isInProgress: true,
                     isCompleted: false,
                     class : "enable",
                     display: "inherit"}]);
  });

  it('updateError should update message', function() {
    tasksComponent.updateError('Not Found');
    expect(tasksComponent.errorMessage).to.be.eql('Not Found');
  });
  
  it('getTasks should be called on init', function() {
    var getTasksMock = sandbox.mock(tasksComponent)
                               .expects('getTasks');
                              
    tasksComponent.ngOnInit();
    getTasksMock.verify();
  });

  it('getUsers should be called on init', function() {
    var getUsersMock = sandbox.mock(tasksComponent)
                               .expects('getUsers');
                              
    tasksComponent.ngOnInit();
    getUsersMock.verify();
  });
  

  it('TasksService should be injected into the component', function() {
    var injectedServices = 
      Reflect.getMetadata('parameters', app.TasksComponent);

    expect(injectedServices[0]).to.be.eql([app.TasksService]); 
  });
  
  it('addTask should register handlers with service', function() {
    var observableMock = 
      sandbox.mock(observable)
             .expects('subscribe')
             .withArgs(succAddDelBindStub, updateErrorBindStub);
  
    
    tasksComponent.addTask();
    
    observableMock.verify();
  });

  it('updatetask  should register handlers with service', function() {
    var observableMock = 
      sandbox.mock(observable)
             .expects('subscribe')
             .withArgs(succAddDelBindStub, updateErrorBindStub);
  
    var taskStub = { _id : "1",
        completed: "Completed"
    };
    
    sandbox.stub(tasksService, 'update')
           .withArgs()
           .returns(observable);
    
    tasksComponent.updateTask(taskStub);
    
    observableMock.verify();
  });
  
  
  it('succAddDel should update message and call getTasks', function(done) {
    tasksComponent.getTasks = function() { done(); };
    tasksComponent.succAddDel([{msg:'good'}]);
    expect(tasksComponent.formMessages).to.be.eql('good');
  });
});