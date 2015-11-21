var moraleometer = angular.module('moraleometer', ['ui.router']);

moraleometer.controller('LoginController', LoginController);
moraleometer.factory('AuthHttpResponseInterceptor', AuthHttpResponseInterceptor);
moraleometer.factory('LoginFactory', LoginFactory);
moraleometer.factory('RegistrationFactory', RegistrationFactory);

moraleometer.config(['$stateProvider', '$httpProvider', '$locationProvider',
    function ($stateProvider, $httpProvider, $locationProvider) {
        $locationProvider.hashPrefix('!').html5Mode(true);

        $stateProvider
            .state('about', {
                url: '/about',
                views: {
                    'main': { templateUrl: '/about' }
                }
            })
            .state('dashboard', {
                url: '/dashboard',
                views: {
                    'main': { templateUrl: '/dashboard' }
                }
            })
            .state('login', {
                url: '/login?returnUrl',
                views: {
                    'main': {
                        templateUrl: '/login',
                        controller: LoginController
                    },
                    'secondary': {
                        templateUrl: '/signup',
                        controller: RegisterController
                    }
                }
            })
            .state('logout', {
                url: '/logout',
                controller: function($scope, $route) {
                    $route.reload();
                }
            });

        $httpProvider.interceptors.push('AuthHttpResponseInterceptor');
        // This makes IsAjaxRequest method work. http://encosia.com/making-angulars-http-work-with-request-isajaxrequest/
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }]);

moraleometer.run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        // TODO: This is a naive implementation; will stop loading even if multiple requests are ongoing.
        $rootScope.isLoading = false;
    });


}]);