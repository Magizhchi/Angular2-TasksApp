(function (app) {
    app.TasksComponent = ng.core
        .Component({
            selector: 'tasks-list',
            templateUrl: 'src/tasks/tasks.html',
            providers: [ng.http.HTTP_PROVIDERS, app.TasksService]
        })
        .Class({
            constructor: [app.TasksService, function (_service) {
                this.service = _service;
                this.tasks = [];
                this.newTask = {};
                this.errorMessage = '';
                this.usersList = [];
                this.formMessages = '';
            }],
            succAddDel: function (data) {
                this.formMessages = data[0].msg;
                this.getTasks();
            },
            getTasks: function () {
                this.service.get()
                    .subscribe(this.updateData.bind(this), this.updateError.bind(this));
            },
            getUsers: function () {
                this.service.getUsers()
                    .subscribe(this.updateUsers.bind(this), this.updateError.bind(this));
            },
            updateUsers: function (data) {
                data.forEach(this.setUserFullName);
                this.usersList = data;
            },
            setUserFullName: function (user) {
                user.fullName = user.first+' '+user.last;
            },
            updateData: function (data) {
                if (Object.keys(data).length === 0) {
                    this.formMessages = "No tasks found";
                }
                data.forEach(this.updateStatusDetailForUI);
                this.tasks = data;
            },
            updateError: function (err) {
                this.errorMessage = err;
            },
            addTask: function () {
                this.newTask.completed = 'Assigned';
                this.service.add(this.newTask)
                    .subscribe(this.succAddDel.bind(this), this.updateError.bind(this));
            },
            updateTask: function (task) {
                var updatedTask = {
                    _id: task._id,
                    completed: task.completed
                };
                this.service.update(updatedTask)
                    .subscribe(this.succAddDel.bind(this), this.updateError.bind(this));
            },
            updateStatusDetailForUI: function (task) {
                switch (task.completed) {
                    case "Completed" :
                        task.isCompleted = true;
                        task.isInProgress = true;
                        task.isAssigned = true;
                        task.class = "disable";
                        task.display = "none";
                        break;
                    case "In Progress" :
                        task.isCompleted = false;
                        task.isInProgress = true;
                        task.isAssigned = true;
                        task.class = "enable";
                        task.display = "inherit";
                        break;
                    case "Assigned" :
                        task.isCompleted = false;
                        task.isInProgress = false;
                        task.isAssigned = true;
                        task.class = "enable";
                        task.display = "inherit";
                        break;
                }
            },
            ngOnInit: function () {
                this.getTasks();
                this.getUsers();
            }
        });
})(window.app || (window.app = {}));