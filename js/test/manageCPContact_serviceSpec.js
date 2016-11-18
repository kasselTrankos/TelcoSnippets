describe('test de manageCPContactService', function () {
	var CODE_RESOLVE = 'CODE_RESOLVE',
		$q, code, errorObjMensaje1, errorObjMensaje2, errorObjMensaje3;

	beforeEach(module(CNT.name));

	beforeEach(inject(function (_$q_) {
		$q = _$q_;
		code = errorObjMensaje1 = errorObjMensaje2 = errorObjMensaje3 = undefined;
		spyOn($q, 'defer').and.returnValue({
			resolve: function (data) {
				code = CODE_RESOLVE;
			},
			reject: function (errorObj) {
				code = errorObj.code;
				errorObjMensaje1 = errorObj.mensaje1;
				errorObjMensaje2 = errorObj.mensaje2;
				errorObjMensaje3 = errorObj.mensaje3;
			}
		});
	}));


	it('method manageCPContactService.getCPContactInteractionRole should call manageCPContactModel.getCPContactInteractionRole with params and resolve a promise (error code != 500)', function () {
		inject(function(_manageCPContactService_, _manageCPContactModel_) {
			var GetCPContactInteractionRole_IN = 'data_IN',
				resultadoPeticionData = 'resultadoPeticion data',
				errorObj = {code: 409},
				manageCPContactService, manageCPContactModel;

			manageCPContactService = _manageCPContactService_;
			manageCPContactModel = _manageCPContactModel_;

			spyOn(manageCPContactModel, 'getCPContactInteractionRole').and.returnValue({
				success: function (callback) {
					callback(resultadoPeticionData);
					expect(code).toEqual(CODE_RESOLVE);
					return this;
				},
				error: function (callback) {
					callback(resultadoPeticionData, errorObj.code);
					return this;
				}
			});
			manageCPContactService.getCPContactInteractionRole(GetCPContactInteractionRole_IN);

			expect($q.defer).toHaveBeenCalled();
			expect(manageCPContactModel.getCPContactInteractionRole).toHaveBeenCalledWith(GetCPContactInteractionRole_IN);
		});
	});

	it('method manageCPContactService.getCPContactInteractionRole should call manageCPContactModel.getCPContactInteractionRole with params and resolve a promise (error code 500, data.errorDescription is undefined)', function () {
		inject(function(_manageCPContactService_, _manageCPContactModel_) {
			var GetCPContactInteractionRole_IN = 'data_IN',
					resultadoPeticionData = 'resultadoPeticion data',
					errorObj = {code: 500},
					manageCPContactService, manageCPContactModel;

			manageCPContactService = _manageCPContactService_;
			manageCPContactModel = _manageCPContactModel_;

			spyOn(manageCPContactModel, 'getCPContactInteractionRole').and.returnValue({
				success: function (callback) {
					callback(resultadoPeticionData);
					return this;
				},
				error: function (callback) {
					callback(resultadoPeticionData, errorObj.code);
					return this;
				}
			});
			manageCPContactService.getCPContactInteractionRole(GetCPContactInteractionRole_IN);

			expect(code).toEqual(500);
		});
	});

	it('method manageCPContactService.getCPContactInteractionRole should call manageCPContactModel.getCPContactInteractionRole with params and resolve a promise (error code 500, data.errorDescription is not undefined)', function () {
		inject(function(_manageCPContactService_, _manageCPContactModel_) {
			var GetCPContactInteractionRole_IN = 'data_IN',
					resultadoPeticionData = {
						errorDescription: 'resultadoPeticion data',
						errorId: 'error.id',
						context: 'context'
					},
					errorObj = {code: 500},
					manageCPContactService, manageCPContactModel;

			manageCPContactService = _manageCPContactService_;
			manageCPContactModel = _manageCPContactModel_;

			spyOn(manageCPContactModel, 'getCPContactInteractionRole').and.returnValue({
				success: function (callback) {
					callback(resultadoPeticionData);
					expect(code).toEqual(CODE_RESOLVE);
					return this;
				},
				error: function (callback) {
					callback(resultadoPeticionData, errorObj.code);
					return this;
				}
			});
			manageCPContactService.getCPContactInteractionRole(GetCPContactInteractionRole_IN);

			expect(code).toEqual(500);
			expect(errorObjMensaje1).toEqual(resultadoPeticionData.errorDescription);
			expect(errorObjMensaje2).toEqual(resultadoPeticionData.errorId);
			expect(errorObjMensaje3).toEqual(resultadoPeticionData.context);
		});
	});


	it('method manageCPContactService.listContactMediumType should call manageCPContactModel.listContactMediumType with params and resolve a promise (error code != 500)', function () {
		inject(function(_manageCPContactService_, _manageCPContactModel_) {
			var ListContactMediumType_IN = 'data_IN',
				resultadoPeticionData = 'resultadoPeticion data',
				errorObj = {code: 409},
				manageCPContactService, manageCPContactModel;

			manageCPContactService = _manageCPContactService_;
			manageCPContactModel = _manageCPContactModel_;

			spyOn(manageCPContactModel, 'listContactMediumType').and.returnValue({
				success: function (callback) {
					callback(resultadoPeticionData);
					expect(code).toEqual(CODE_RESOLVE);
					return this;
				},
				error: function (callback) {
					callback(resultadoPeticionData, errorObj.code);
					return this;
				}
			});
			manageCPContactService.listContactMediumType(ListContactMediumType_IN);

			expect($q.defer).toHaveBeenCalled();
			expect(manageCPContactModel.listContactMediumType).toHaveBeenCalledWith(ListContactMediumType_IN);
		});
	});

	it('method manageCPContactService.listContactMediumType should call manageCPContactModel.listContactMediumType with params and resolve a promise (error code 500, data.errorDescription is undefined)', function () {
		inject(function(_manageCPContactService_, _manageCPContactModel_) {
			var ListContactMediumType_IN = 'data_IN',
					resultadoPeticionData = 'resultadoPeticion data',
					errorObj = {code: 500},
					manageCPContactService, manageCPContactModel;

			manageCPContactService = _manageCPContactService_;
			manageCPContactModel = _manageCPContactModel_;

			spyOn(manageCPContactModel, 'listContactMediumType').and.returnValue({
				success: function (callback) {
					callback(resultadoPeticionData);
					return this;
				},
				error: function (callback) {
					callback(resultadoPeticionData, errorObj.code);
					return this;
				}
			});
			manageCPContactService.listContactMediumType(ListContactMediumType_IN);

			expect(code).toEqual(500);
		});
	});

	it('method manageCPContactService.listContactMediumType should call manageCPContactModel.listContactMediumType with params and resolve a promise (error code 500, data.errorDescription is not undefined)', function () {
		inject(function(_manageCPContactService_, _manageCPContactModel_) {
			var ListContactMediumType_IN = 'data_IN',
					resultadoPeticionData = {
						errorDescription: 'resultadoPeticion data',
						errorId: 'error.id',
						context: 'context'
					},
					errorObj = {code: 500},
					manageCPContactService, manageCPContactModel;

			manageCPContactService = _manageCPContactService_;
			manageCPContactModel = _manageCPContactModel_;

			spyOn(manageCPContactModel, 'listContactMediumType').and.returnValue({
				success: function (callback) {
					callback(resultadoPeticionData);
					expect(code).toEqual(CODE_RESOLVE);
					return this;
				},
				error: function (callback) {
					callback(resultadoPeticionData, errorObj.code);
					return this;
				}
			});
			manageCPContactService.listContactMediumType(ListContactMediumType_IN);

			expect(code).toEqual(500);
			expect(errorObjMensaje1).toEqual(resultadoPeticionData.errorDescription);
			expect(errorObjMensaje2).toEqual(resultadoPeticionData.errorId);
			expect(errorObjMensaje3).toEqual(resultadoPeticionData.context);
		});
	});


	it('method manageCPContactService.manageCPContact should call manageCPContactModel.manageCPContact with params and resolve a promise (error code != 500)', function () {
		inject(function(_manageCPContactService_, _manageCPContactModel_) {
			var ManageCPContact_IN = 'data_IN',
				resultadoPeticionData = 'resultadoPeticion data',
				errorObj = {code: 409},
				manageCPContactService, manageCPContactModel;

			manageCPContactService = _manageCPContactService_;
			manageCPContactModel = _manageCPContactModel_;

			spyOn(manageCPContactModel, 'manageCPContact').and.returnValue({
				success: function (callback) {
					callback(resultadoPeticionData);
					expect(code).toEqual(CODE_RESOLVE);
					return this;
				},
				error: function (callback) {
					callback(resultadoPeticionData, errorObj.code);
					return this;
				}
			});
			manageCPContactService.manageCPContact(ManageCPContact_IN);

			expect($q.defer).toHaveBeenCalled();
			expect(manageCPContactModel.manageCPContact).toHaveBeenCalledWith(ManageCPContact_IN);
		});
	});

	it('method manageCPContactService.manageCPContact should call manageCPContactModel.manageCPContact with params and resolve a promise (error code 500, data.errorDescription is undefined)', function () {
		inject(function(_manageCPContactService_, _manageCPContactModel_) {
			var ManageCPContact_IN = 'data_IN',
					resultadoPeticionData = 'resultadoPeticion data',
					errorObj = {code: 500},
					manageCPContactService, manageCPContactModel;

			manageCPContactService = _manageCPContactService_;
			manageCPContactModel = _manageCPContactModel_;

			spyOn(manageCPContactModel, 'manageCPContact').and.returnValue({
				success: function (callback) {
					callback(resultadoPeticionData);
					return this;
				},
				error: function (callback) {
					callback(resultadoPeticionData, errorObj.code);
					return this;
				}
			});
			manageCPContactService.manageCPContact(ManageCPContact_IN);

			expect(code).toEqual(500);
		});
	});

	it('method manageCPContactService.manageCPContact should call manageCPContactModel.manageCPContact with params and resolve a promise (error code 500, data.errorDescription is not undefined)', function () {
		inject(function(_manageCPContactService_, _manageCPContactModel_) {
			var ManageCPContact_IN = 'data_IN',
					resultadoPeticionData = {
						errorDescription: 'resultadoPeticion data',
						errorId: 'error.id',
						context: 'context'
					},
					errorObj = {code: 500},
					manageCPContactService, manageCPContactModel;

			manageCPContactService = _manageCPContactService_;
			manageCPContactModel = _manageCPContactModel_;

			spyOn(manageCPContactModel, 'manageCPContact').and.returnValue({
				success: function (callback) {
					callback(resultadoPeticionData);
					expect(code).toEqual(CODE_RESOLVE);
					return this;
				},
				error: function (callback) {
					callback(resultadoPeticionData, errorObj.code);
					return this;
				}
			});
			manageCPContactService.manageCPContact(ManageCPContact_IN);

			expect(code).toEqual(500);
			expect(errorObjMensaje1).toEqual(resultadoPeticionData.errorDescription);
			expect(errorObjMensaje2).toEqual(resultadoPeticionData.errorId);
			expect(errorObjMensaje3).toEqual(resultadoPeticionData.context);
		});
	});

});
