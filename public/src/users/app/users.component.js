(function (app) {
    app.UsersComponent = ng.core
        .Component({
            selector: 'users-list',
            templateUrl: 'users.html',
            pipes: [app.UserSortPipe],
            providers: [ng.http.HTTP_PROVIDERS, app.UsersService]
        })
        .Class({
            constructor: [app.UsersService, function (_service) {
                this.service = _service;
                this.users = [];
                this.newUser = {};
                this.errorMessage = '';
                this.formMessages = '';
            }],
            successMessage : function(data){
                 this.formMessages = data[0].msg;
                 this.getUsers();
            },
            getUsers: function () {
                this.service.get()
                    .subscribe(this.updateData.bind(this), this.updateError.bind(this));
            },
            updateData: function (data) {
                if (Object.keys(data).length === 0) {
                    this.formMessages = "No users found";
                }
                data.forEach(this.checkIfDisabled);
                this.users = data;
            },
            checkIfDisabled: function (user) {
                if (!user.active){
                    user.class = "disable";
                    user.status = "Inactive";
                } else {
                    user.class = "enable";
                    user.status = "Active";
                }
            },
            updateError: function (err) {
                this.errorMessage = err;
            },
            addUser: function () {
                this.newUser.active = true;
                this.service.add(this.newUser)
                    .subscribe(this.successMessage.bind(this), this.updateError.bind(this));
            },
            enableDisableUser: function(user){
                var userData = {
                    _id : user._id,
                    active : !user.active
                };
                this.service.enableDisableUser(userData)
                            .subscribe(this.successMessage.bind(this), this.updateError.bind(this));
            },
            ngOnInit: function () {
                this.getUsers();
            }
        });
}) (window.app || (window.app = {}));