CNT.ngModule.directive('managecpcontact', function () {
    return {
        restrict: 'A',
        templateUrl: 'cgt/manageCPContact/manageCPContact_view.html',
        scope: {
            cgtManageCPContactIn: '='
        }
    };
});