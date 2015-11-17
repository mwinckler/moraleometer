var moraleometer = angular.module('moraleometer', ['ui.router']);

moraleometer.controller('LandingPageController', LandingPageController);
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
                views: {
                    'main': {
                        templateUrl: '/logout',
                        controller: LoginController
                    }
                }
            });

        $httpProvider.interceptors.push('AuthHttpResponseInterceptor');
    }]);