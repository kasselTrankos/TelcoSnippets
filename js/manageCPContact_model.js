'use strict';
CNT.ngModule.factory('manageCPContactModel',[ 'T3_HTTPService', function(T3_HTTPService) {

	var URL_GETCPCONTACTINTERACTIONROLE = "services/CPQuery/getCPContactInteractionRole";
	var URL_LISTCONTACTMEDIUMTYPE = "services/ExtCPSupportOperation/listContactMediumType";
	var URL_MANAGECPCONTACT = "services/CPBusinessRules/manageCPContact";

	var manageCPContactModel = {};

	manageCPContactModel.getCPContactInteractionRole = function(GetCPContactInteractionRole_IN) {
		var resultadoPeticion = T3_HTTPService.post(URL_GETCPCONTACTINTERACTIONROLE, GetCPContactInteractionRole_IN, {
			headers : {
				'Content-Type' : 'application/json'
			}
		});

		return resultadoPeticion;
	};

	manageCPContactModel.listContactMediumType = function(ListContactMediumType_IN) {
		var resultadoPeticion = T3_HTTPService.post(URL_LISTCONTACTMEDIUMTYPE, ListContactMediumType_IN, {
			headers : {
				'Content-Type' : 'application/json'
			}
		});

		return resultadoPeticion;
	};

	manageCPContactModel.manageCPContact = function(ManageCPContact_IN) {
		var resultadoPeticion = T3_HTTPService.post(URL_MANAGECPCONTACT, ManageCPContact_IN, {
			headers : {
				'Content-Type' : 'application/json'
			}
		});

		return resultadoPeticion;
	};

	return manageCPContactModel;

}]);