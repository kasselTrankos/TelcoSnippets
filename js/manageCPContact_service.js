'use strict';
CNT.ngModule.factory('manageCPContactService', ['T3_HTTPService', '$q',  'manageCPContactModel',    function(T3_HTTPService, $q, manageCPContactModel) {

    var manageCPContactService = {};

	manageCPContactService.initialData = null;

    manageCPContactService.getCPContactInteractionRole = function(GetCPContactInteractionRole_IN) {
        var deferred = $q.defer();
        manageCPContactModel.getCPContactInteractionRole(GetCPContactInteractionRole_IN).success(function(data, status) {
            deferred.resolve(data);
        }).error(function(data, status) {
            var errorObj;
            if (status === 500) {
                if ((data.errorDescription !== undefined) && (data.errorDescription !== null)) {
                    errorObj = {
                        code : 500,
                        mensaje1 : data.errorDescription,
                        mensaje2 : data.errorId,
                        mensaje3 : data.context
                    };
                } else {
                    errorObj = {
                        code : status
                    };
                }
            } else {
                errorObj = {
                    code : status
                };
            }
            deferred.reject(errorObj);
        });
        return deferred.promise;
    };

    manageCPContactService.listContactMediumType = function(ListContactMediumType_IN) {
        var deferred = $q.defer();
        manageCPContactModel.listContactMediumType(ListContactMediumType_IN).success(function(data, status) {
            deferred.resolve(data);
        }).error(function(data, status) {
            var errorObj;
            if (status === 500) {
                if ((data.errorDescription !== undefined) && (data.errorDescription !== null)) {
                    errorObj = {
                        code : 500,
                        mensaje1 : data.errorDescription,
                        mensaje2 : data.errorId,
                        mensaje3 : data.context
                    };
                } else {
                    errorObj = {
                        code : status
                    };
                }
            } else {
                errorObj = {
                    code : status
                };
            }
            deferred.reject(errorObj);
        });
        return deferred.promise;
    };

    manageCPContactService.manageCPContact = function(ManageCPContact_IN) {
        var deferred = $q.defer();
        manageCPContactModel.manageCPContact(ManageCPContact_IN).success(function(data, status) {
            deferred.resolve(data);
        }).error(function(data, status) {

            var errorObj;
            if (status === 500) {
                if ((data.errorDescription !== undefined) && (data.errorDescription !== null)) {
                    errorObj = {
                        code : 500,
                        mensaje1 : data.errorDescription,
                        mensaje2 : data.errorId,
                        mensaje3 : data.context
                    };
                } else {
                    errorObj = {
                        code : status
                    };
                }
            } else {
                errorObj = {
                    code : status
                };
            }
            deferred.reject(errorObj);
        });
        return deferred.promise;
    };

    return manageCPContactService;
}]);








