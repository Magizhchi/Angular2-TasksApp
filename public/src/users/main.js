(function (app) {
    document.addEventListener('DOMContentLoaded', function () {
        ng.platform.browser.bootstrap(app.UsersComponent) ;
    });
}) (window.app || (window.app = {}));