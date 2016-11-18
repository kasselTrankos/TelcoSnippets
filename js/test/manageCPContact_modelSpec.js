describe('test de manageCPContactModel', function () {
	var T3_HTTPService, manageCPContactModel;

	beforeEach(module(CNT.name));

	beforeEach(inject(function(_manageCPContactModel_, _T3_HTTPService_) {
		manageCPContactModel = _manageCPContactModel_;
		T3_HTTPService = _T3_HTTPService_;
	}));
	

	it('method manageCPContactModel.getCPContactInteractionRole should call T3_HTTPService.post with params and return data', function() {
		var URL_GETCPCONTACTINTERACTIONROLE = "services/CPQuery/getCPContactInteractionRole",
		GetCPContactInteractionRole_IN = 'data_IN',
			opts = {
				headers : {
					'Content-Type' : 'application/json'
				}
			},
			resultadoPeticionData = 'resultadoPeticion data',
			resultadoPeticion;
		spyOn(T3_HTTPService, 'post').and.returnValue(resultadoPeticionData);
		resultadoPeticion = manageCPContactModel.getCPContactInteractionRole(GetCPContactInteractionRole_IN);
		expect(T3_HTTPService.post).toHaveBeenCalledWith(URL_GETCPCONTACTINTERACTIONROLE, GetCPContactInteractionRole_IN, opts);
		expect(resultadoPeticion).toEqual(resultadoPeticionData);
	});


	it('method manageCPContactModel.listContactMediumType should call T3_HTTPService.post with params and return data', function() {
		var URL_LISTCONTACTMEDIUMTYPE = "services/ExtCPSupportOperation/listContactMediumType",
		ListContactMediumType_IN = 'data_IN',
			opts = {
				headers : {
					'Content-Type' : 'application/json'
				}
			},
			resultadoPeticionData = 'resultadoPeticion data',
			resultadoPeticion;
		spyOn(T3_HTTPService, 'post').and.returnValue(resultadoPeticionData);
		resultadoPeticion = manageCPContactModel.listContactMediumType(ListContactMediumType_IN);
		expect(T3_HTTPService.post).toHaveBeenCalledWith(URL_LISTCONTACTMEDIUMTYPE, ListContactMediumType_IN, opts);
		expect(resultadoPeticion).toEqual(resultadoPeticionData);
	});


	it('method manageCPContactModel.manageCPContact should call T3_HTTPService.post with params and return data', function() {
		var URL_MANAGECPCONTACT = "services/CPBusinessRules/manageCPContact",
		ManageCPContact_IN = 'data_IN',
			opts = {
				headers : {
					'Content-Type' : 'application/json'
				}
			},
			resultadoPeticionData = 'resultadoPeticion data',
			resultadoPeticion;
		spyOn(T3_HTTPService, 'post').and.returnValue(resultadoPeticionData);
		resultadoPeticion = manageCPContactModel.manageCPContact(ManageCPContact_IN);
		expect(T3_HTTPService.post).toHaveBeenCalledWith(URL_MANAGECPCONTACT, ManageCPContact_IN, opts);
		expect(resultadoPeticion).toEqual(resultadoPeticionData);
	});

});