(function (app) {
    app.UserSortPipe = ng.core
        .Pipe({
            name: 'userSort'
        })
        .Class({
            constructor: function () {},
            transform: function (users) {
                var compareTwoUsers = function(user1, user2) {
                    var firstNameCompare = user1.first.localeCompare(user2.first);

                    if(firstNameCompare === 0)
                        return user1.last.localeCompare(user2.last);
                    else
                        return firstNameCompare;
                };

                return users.slice().sort(compareTwoUsers);
            }
    });
}) (window.app || (window.app = {}));