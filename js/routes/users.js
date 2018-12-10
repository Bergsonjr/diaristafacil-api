var routes = angular.module('app.routes')

routes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('sign-in', {
        url: '/sign-in',
        noAuthenticate: false,
        templateUrl: 'templates/sign-in/sign-in.html'
    });

    $stateProvider.state('forgorPassword', {
        url: '/forgot/password',
        noAuthenticate: false,
        templateUrl: 'templates/sign-in/forgot.html'
    });

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/base/mainView.html'
    });

    $stateProvider.state('app.feed', {
        url: "/feed",
        name: "Feed",
        noAuthenticate: false,
        views: {
            'content': {
                templateUrl: 'templates/feed/feed.html'
            },
        }
    });

    $stateProvider.state('app.password', {
        url: "/novaSenha",
        name: "NovaSenha",
        noAuthenticate: false,
        views: {
            'content': {
                templateUrl: 'templates/base/changePassword.html'
            },
        }
    });

    $urlRouterProvider.otherwise('sign-in');
}]);
