(function (app) {
    document.addEventListener('DOMContentLoaded', function () {
        ng.platform.browser.bootstrap(app.TasksComponent) ;
    });
}) (window.app || (window.app = {}));