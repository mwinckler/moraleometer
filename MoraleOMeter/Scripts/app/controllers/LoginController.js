var LoginController = function ($scope, $stateParams, $location, LoginFactory) {
    console.debug('the login controller');
    $scope.loginForm = {
        emailAddress: '',
        password: '',
        rememberMe: false,
        returnUrl: $stateParams.returnUrl,
        loginFailure: false
    };

    $scope.login = function () {
        console.debug('logging in!');
        var result = LoginFactory($scope.loginForm.emailAddress, $scope.loginForm.password, $scope.loginForm.rememberMe);
        result.then(function (result) {
            console.debug('result.then!', result);

            if (result.success) {
                console.debug('success! return url: ', $scope.loginForm.returnUrl);
                if ($scope.loginForm.returnUrl !== undefined) {
                    $location.path(decodeURIComponent($scope.loginForm.returnUrl));
                } else {
                    $location.path('/dashboard');
                }
            } else {
                $scope.loginForm.loginFailure = true;
            }
        });
    };
};

LoginController.$inject = ['$scope', '$stateParams', '$location', 'LoginFactory'];