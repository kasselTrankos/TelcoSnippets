describe('Test Controller: manageCPContactController', function(){
	/* Variales globales */
	var httpBackend, q, controller, scope, timeout;
	var service, v_stateParams, v_gettextCatalog, angular,
	v_T3_CabeceraPresentacionService, v_T3_CommunicationService,
	v_T3_TrazaService, v_T3_StateService, v_filter, v_PopupService;

	/* Inicializacion modulo */
	beforeEach(function(){
		module(CNT.name);
	});
	var MOCKgetCPInteractionRole = {
  "potencialCPContactInteractionRole" : {
    "businessInteractionRoles" : [ {
      "@c" : ".PartyInteractionRole_DTO_OUT",
      "id" : null,
      "interactionRoleType" : {
        "id" : 2
      },
      "contactMedium" : {
        "id" : "14942656562965630592899290761301366132",
        "contactMediumType" : {
          "id" : 2,
          "name" : "SMS"
        },
        "customerContactMediumAssocFavourite" : true,
        "geographicSite" : null,
        "value" : "606319174"
      },
      "partyRole" : {
        "id" : "34323924704432517486419962372733685869",
        "party" : {
          "individualNameFormattedName" : "JOSE CARLOS VICENTE DURAN"
        }
      }
    }, {
      "@c" : ".PartyInteractionRole_DTO_OUT",
      "id" : null,
      "interactionRoleType" : {
        "id" : 2
      },
      "contactMedium" : {
        "id" : "27888762628599174164408110398013806696",
        "contactMediumType" : {
          "id" : 4,
          "name" : "Correo Electrónico"
        },
        "customerContactMediumAssocFavourite" : true,
        "geographicSite" : null,
        "value" : "jose.carlos.vicente@telefonica.net"
      },
      "partyRole" : {
        "id" : "34323924704432517486419962372733685869",
        "party" : {
          "individualNameFormattedName" : "JOSE CARLOS VICENTE DURAN"
        }
      }
    }, {
      "@c" : ".PartyInteractionRole_DTO_OUT",
      "id" : null,
      "interactionRoleType" : {
        "id" : 3
      },
      "contactMedium" : {
        "id" : "30637344523436182314263220929068024482",
        "contactMediumType" : {
          "id" : 1,
          "name" : "Teléfono"
        },
        "customerContactMediumAssocFavourite" : true,
        "geographicSite" : null,
        "value" : "637907567"
      },
      "partyRole" : {
        "id" : "34323924704432517486419962372733685869",
        "party" : {
          "individualNameFormattedName" : "JOSE CARLOS VICENTE DURAN"
        }
      }
    }, {
      "@c" : ".PartyInteractionRole_DTO_OUT",
      "id" : null,
      "interactionRoleType" : {
        "id" : 2
      },
      "contactMedium" : {
        "id" : "23674888061792068631576538936690038411",
        "contactMediumType" : {
          "id" : 4,
          "name" : "Correo Electrónico"
        },
        "customerContactMediumAssocFavourite" : null,
        "geographicSite" : null,
        "value" : "rajoy@mariano.com"
      },
      "partyRole" : {
        "id" : "61862206615423203373317720081026976969",
        "party" : {
          "individualNameFormattedName" : "INES BENITEZ PASTOR"
        }
      }
    } ],
    "businessInteractionRolesLength" : 4
  },
  "cpcontactInteractionRole" : {
    "businessInteractionRoles" : [ ],
    "businessInteractionRolesLength" : 0
  }
};

	/* Inicializacion del servicio propio */
	beforeEach(function(){

		/* Creacion del objeto del servicio*/
		service = jasmine.createSpyObj(
			'manageCPContactService', /* Nombre del servicio*/
			['getCPContactInteractionRole','listContactMediumType','manageCPContact']
		);

	});

	/* Inyeccion del controlador */
	beforeEach(inject(function(
		/* Variables comunes inyectadas*/
		$controller, $rootScope, _$httpBackend_, $q, $timeout
		/* Parametros del controlador inyectados */
		){

		/* Variables comunes */
		scope = $rootScope.$new();
		httpBackend = _$httpBackend_;
		q = $q;
		timeout = $timeout;

		/* Mockear llamadas $http pendientes */
		httpBackend.when('GET','').respond();

		/* Parametros del controlador */
		v_stateParams = {};
		v_gettextCatalog = {};
		v_gettextCatalog.getString = function(){};
		v_T3_CabeceraPresentacionService = {};
		v_T3_CabeceraPresentacionService.resolveTranslationsCG = function(){};
		v_T3_CommunicationService = {};
		v_T3_CommunicationService.subscribe = function(){};
		v_T3_TrazaService = {};
		v_T3_TrazaService.setTrazaError = function(){};
		v_T3_StateService = {};
		v_T3_StateService.init = function(){};
		v_filter = function(){return function(){
			return MOCKgetCPInteractionRole.cpcontactInteractionRole.businessInteractionRoles
		}};
		v_PopupService = {};
		v_PopupService.CloseSpinner = function(){};
		v_PopupService.getSpinner = function(){};
		v_PopupService.getPopupGeneric = function(){};

		scope.showPersonContact = {};
		scope.isVisiblePersonContact = {};
		scope.isVisibleNotification = {};
		scope.isOpenSpinner = {};
		scope.spinners = [];
		scope.personContactMediumTypeCategory = {};
		scope.notificationContactMediumTypeCategory = {};
		scope.cgtManageCPContactIn = {};
		scope.cgtManageCPContactIn.businessInteractionRoles = [];
		scope.CGT_ManageCPContact_IN = {};
		scope.CGT_ManageCPContact_IN.action = {};
		scope.CGT_ManageCPContact_IN.customerProblem = {};
		scope.CGT_ManageCPContact_IN.customerProblem.id = 1;
		scope.CGT_ManageCPContact_IN.customerProblemType = {};
		scope.selected = {};
		scope.manageCPContactView = {};
		scope.manageCPContactData = {};
		scope.manageCPContactView.filteredListPartyRoles = {};

		scope.manageCPContactView.listPartyRoles_tipo2 = [];
		scope.manageCPContactView.listPartyRoles_tipo3 = [];
		scope.manageCPContactView.tiposContacto = [];
		scope.manageCPContactData.personaContacto = {};

		scope.manageCPContactData.medioContacto = [];
		scope.manageCPContactData.listaTemporal = [];
		scope.manageCPContactData.listaTemporal[0] = {};
		scope.manageCPContactData.listaTemporal[0].notifyPerson = {};
		scope.manageCPContactData.tipoContacto = [];
		scope.manageCPContactView.mediosContacto = [];
		scope.manageCPContactData.personMediosContacto = [];
		scope.medioSelectedSecond = {};
		scope.medioSelectedSecond.value = "ValueTest";
		scope.personaSelected = {};
		scope.personaSelected.value = "ValueTest";
		scope.action = {};
		scope.manageCPContactFunctionality = {};
		scope.manageCPContactFunctionality.error = {};
		scope.firstLoad = {};
		scope.GetCPContactInteractionRole_OUT = {};
		scope.GetCPContactInteractionRole_OUT.cpcontactInteractionRole = {};
		scope.GetCPContactInteractionRole_OUT.cpcontactInteractionRole.businessInteractionRoles = {};
		scope.GetCPContactInteractionRole_OUT.potencialCPContactInteractionRole = {};
		scope.GetCPContactInteractionRole_OUT.potencialCPContactInteractionRole.businessInteractionRoles = {};
		scope.visible = {};
		scope.showNotificationANDPersonContact = {};
		scope.ManageCPContact_OUT = [];
		scope.ManageCPContact_OUT[0] = {};
		scope.ManageCPContact_OUT[0].interactionRoleType = {};
		scope.ManageCPContact_OUT[0].interactionRoleType.id = 1;
		scope.ManageCPContact_OUT[0].contactMediumTypeCategory = {};
		scope.tlt = function(param){return param;};
		scope.translate = function(param){return param;};
		scope.lastSearch ={};
		angular = {
			copy: function(){
				return {	}
			}
		}
		/* Instancia del controlador */
		controller = $controller('manageCPContactController',{
			'manageCPContactService' : service,
			'$stateParams' : v_stateParams,
			'$scope' : scope,
			'gettextCatalog' : v_gettextCatalog,
			'T3_CabeceraPresentacionService' : v_T3_CabeceraPresentacionService,
			'T3_CommunicationService' : v_T3_CommunicationService,
			'T3_TrazaService' : v_T3_TrazaService,
			'T3_StateService' : v_T3_StateService,
			'$filter' : v_filter,
			'PopupService' : v_PopupService
		});

	}));


	it('Test: $scope.init()', function() {

		spyOn(scope, 'manageCPContact');
		spyOn(scope, 'loadMultilanguageNew');
		spyOn(v_T3_CommunicationService, 'subscribe');
		spyOn(v_T3_StateService, 'init');

		/* Mocks scope utilizados
		scope.showPersonContact = {};
		scope.isVisiblePersonContact = {};
		scope.isVisibleNotification = {};
		scope.isOpenSpinner = {};
		scope.spinners = {};
		scope.personContactMediumTypeCategory = {};
		scope.notificationContactMediumTypeCategory = {};
		scope.cgtManageCPContactIn = {};
		scope.CGT_ManageCPContact_IN = {}; */

		scope.init();

		expect(scope.manageCPContact).toHaveBeenCalled();
		expect(scope.loadMultilanguageNew).toHaveBeenCalled();
		expect(v_T3_CommunicationService.subscribe).toHaveBeenCalled();
		expect(v_T3_StateService.init).toHaveBeenCalled();
	});


	it('Test: $scope.onLoaded()', function() {

		spyOn(scope, 'getCPContactInteractionRole');

		/* Mocks scope utilizados
		scope.selected = {};
		scope.manageCPContactView = {};
		scope.manageCPContactData = {};
		scope.manageCPContactData.listaTemporal = {};
		scope.medioSelectedSecond = {};
		scope.personaSelected = {};
		scope.action = {};
		scope.CGT_ManageCPContact_IN = {};
		scope.CGT_ManageCPContact_IN.action = {};
		scope.CGT_ManageCPContact_IN.customerProblem = {};
		scope.CGT_ManageCPContact_IN.customerProblem.id = 1;
		scope.manageCPContactFunctionality = {};
		scope.manageCPContactFunctionality.error = {};
		scope.firstLoad = {}; */

		scope.onLoaded();

		expect(scope.getCPContactInteractionRole).toHaveBeenCalled();
	});


	it('Test: $scope.closeSpinner()', function() {

		spyOn(v_PopupService, 'CloseSpinner');

		/* Mocks scope utilizados
		scope.spinners = [];
		scope.isOpenSpinner = {}; */

		scope.closeSpinner();

		expect(v_PopupService.CloseSpinner).toHaveBeenCalled();
	});


	it('Test: $scope.openSpinner()', function() {

		spyOn(v_PopupService, 'getSpinner');
		scope.isOpenSpinner=false;
		/* Mocks scope utilizados
		scope.spinners = {};
		scope.isOpenSpinner = {}; */

		scope.openSpinner();

		expect(v_PopupService.getSpinner).toHaveBeenCalled();
	});


	it('Test: $scope.addFila()', function() {

		///spyOn(scope, 'addNewBusinessInteractionRolesData');
		scope.firstLoad=false;
		scope.manageCPContactView.tmp_listPartyRoles_tipo2=[];
		scope.manageCPContactData.notifyPerson=[];
		/* Mocks scope utilizados
		scope.manageCPContactView = {};
		scope.manageCPContactView.filteredListPartyRoles = {};
		scope.manageCPContactView.medioContacto = [];
		scope.manageCPContactView.listPartyRoles_tipo2 = {};
		scope.firstLoad = {};
		scope.manageCPContactData = {};
		scope.manageCPContactData.listaTemporal = [];
		scope.manageCPContactData.tipoContacto = []; */

		scope.addFila();
		scope.contTable= {id:1};
		scope.manageCPContactData.listaTemporal_1= [];
		scope.isVisiblePersonContact =true;
		scope.firstLoad=true;
		scope.addFila();
		expect(scope.firstLoad).toBe(false);
		///expect(scope.addNewBusinessInteractionRolesData).toHaveBeenCalled();
	});

	it('isIn_tmp_listPartyRoles_tipo2', function(){
		scope.manageCPContactView.tmp_listPartyRoles_tipo2 = [1];
		expect(scope.isIn_tmp_listPartyRoles_tipo2(1)).toBe(true);
	});
	it('removeElement_fromLista2 ', function(){
		scope.manageCPContactView.tmp_listPartyRoles_tipo2= [];
		scope.manageCPContactView.listPartyRoles_tipo2= [
		{id:1}, {id:2}]
		scope.removeElement_fromLista2(1);
		expect(scope.manageCPContactView.tmp_listPartyRoles_tipo2[0]).toBe(1);
	});
	it('findPersonContact_fromBussiness', function(){
		scope.cgtManageCPContactIn = {
			findPersonContact_fromBussiness:[],
			businessInteractionRoles:[
				{type: 'PersonContact', id:1},
				{type: 'PersonContact', id:2}
			]
		}
		scope.findPersonContact_fromBussiness();
	});
	it('clearBusinessInteractionRolesData', function(){
		scope.cgtManageCPContactIn={
			businessInteractionRoles:[
				{type:'al'}, {type:'alat'}
			]}
		scope.clearBusinessInteractionRolesData();
	});
	it('Test: $scope.addNewBusinessInteractionRolesData()', function() {

		spyOn(scope, 'generateContactMedium');


		var baseData= [
			{contactMedium:{
				contactMediumType:{
					id:1
					}
				}
			}
		];
		scope.manageCPContactData={
			tipoContacto:[{id:1}],
			medioContacto:[{id:1}]
		}
		scope.addNewBusinessInteractionRolesData(baseData);

		//expect(scope.generateContactMedium).toHaveBeenCalled();
	});


	it('Test: $scope.generateContactMedium()', function() {
		contactMedium={id:1}

		var baseData= [
			{contactMedium:{
				contactMediumType:{
					id:1
					}
				}
			}
		];
		scope.generateContactMedium(baseData, contactMedium);

	});





	it('Test: $scope.averiguarIdioma()', function() {


		scope.averiguarIdioma();

	});


	it('Test: $scope.borrarPersona()', function() {



		scope.cgtManageCPContactIn.personMediumType = {
			person:[],
			personMedioContacto:[]
		}


		scope.borrarPersona();

	});


	it('Test: $scope.cargaMedios()', function() {

		scope.cargaMedios();
		scope.cgtManageCPContactIn = {
			personMediumType:{
				person:[1]
			},
			businessInteractionRoles:[]
		};
		scope.manageCPContactView ={
			personMediosContacto:[],
			tiposContacto:[{
				id:1
			}]
		};

		scope.manageCPContactData ={
			personMediosContacto:[],
			tipoContacto:[1]
		};
		scope.GetCPContactInteractionRole_OUT = {
			cpcontactInteractionRole:{
				businessInteractionRoles:[
					{

						partyRole:{
							id:1
						},
						contactMedium:{
							contactMediumType:{
								name:'SMS'
							},
							value:'pepe',
							id:2
						}
					}
				]
			},
			potencialCPContactInteractionRole:{
				businessInteractionRoles:[
					{
						partyRole:{
							id:1
						},
						contactMedium:{
							contactMediumType:{
								name:'SMS'
							},
							value:'pepe potencial',
							id:1
						}
					}
				]
			}
		};
		var index = 0;
		scope.cargaMedios(index, 'person');
		expect(scope.manageCPContactView.personMediosContacto[index].length).toBe(2);
		expect(scope.manageCPContactView.personMediosContacto[index][0].value).toEqual('pepe')
	});


	it('Test: $scope.cargaTipos()', function() {

		spyOn(scope, 'listContactMediumType');

		scope.cargaTipos();

		expect(scope.listContactMediumType).toHaveBeenCalled();
	});


	it('Test: $scope.desplegar()', function() {


		/* Mocks scope utilizados
		scope.visible = {}; */

		scope.desplegar();

	});


	it('Test: $scope.isUniquePerson()', function() {

		var o = [{id:2}]
		scope.isUniquePerson(o, 2);

	});


	it('Test: $scope.generatePersonData()', function() {
		var obj = {
			'@c':'.Clase',
			interactionRoleType:{
				id:1
			},
			contactMedium:{
				id:2,
				contactMediumType:{
					id:3
				}
			},
			partyRole:{
				id:12,
				individualNameFormattedName:'pepep'
			}


		}

		scope.generatePersonData(obj);

	});


	it('Test: $scope.filterDataByInteractionRoleType()', function() {

		spyOn(scope, 'isUniquePerson');
		spyOn(scope, 'generatePersonData');

		/* Mocks scope utilizados
		scope.manageCPContactView = []; */

		scope.filterDataByInteractionRoleType(2, MOCKgetCPInteractionRole.cpcontactInteractionRole.businessInteractionRoles);

		//expect(scope.isUniquePerson).toHaveBeenCalled();
		//	expect(scope.generatePersonData).toHaveBeenCalled();
	});


	it('Test: $scope.fillPersonsAfterLoad_getCPContactInteractionRole()', function() {

		spyOn(scope, 'filterDataByInteractionRoleType');
		spyOn(scope, 'addFila');

		/* Mocks scope utilizados
		scope.manageCPContactView = {};
		scope.manageCPContactView.listPartyRoles_tipo2 = [];
		scope.manageCPContactView.listPartyRoles_tipo3 = [];
		scope.GetCPContactInteractionRole_OUT = {};
		scope.GetCPContactInteractionRole_OUT.cpcontactInteractionRole = {};
		scope.GetCPContactInteractionRole_OUT.cpcontactInteractionRole.businessInteractionRoles = {};
		scope.GetCPContactInteractionRole_OUT.potencialCPContactInteractionRole = {};
		scope.GetCPContactInteractionRole_OUT.potencialCPContactInteractionRole.businessInteractionRoles = {};
		scope.CGT_ManageCPContact_IN = {};
		scope.CGT_ManageCPContact_IN.action = {};
		scope.showNotificationANDPersonContact = {};
		scope.visible = {}; */

		scope.fillPersonsAfterLoad_getCPContactInteractionRole();

		expect(scope.filterDataByInteractionRoleType).toHaveBeenCalled();
		expect(scope.addFila).toHaveBeenCalled();
	});


	it('Test: $scope.getCPContactInteractionRole()', function() {

		spyOn(scope, 'openSpinner');
		spyOn(scope, 'closeSpinner');
		spyOn(scope, 'fillPersonsAfterLoad_getCPContactInteractionRole');
		spyOn(v_T3_TrazaService, 'setTrazaError');

		/* Mocks scope utilizados
		scope.GetCPContactInteractionRole_OUT = {};
		scope.manageCPContactFunctionality = {};
		scope.manageCPContactFunctionality.error = {}; */

		// Llamada satisfactoria a manageCPContactService.getCPContactInteractionRole
		var DTO_getCPContactInteractionRole_OUT = {};

		var deferred1 = q.defer();
		deferred1.resolve(DTO_getCPContactInteractionRole_OUT);
		service.getCPContactInteractionRole.and.returnValue(deferred1.promise);
		scope.getCPContactInteractionRole({
			partyRole:{id:1}
		});
		scope.$apply();

		// Llamada erronea a code 500 manageCPContactService.getCPContactInteractionRole
		deferred1_wrong = q.defer();
		///error 500, con mensaje 1
		deferred1_wrong.reject({
			code: 500,
			mensaje1: 'hola'
		});
		service.getCPContactInteractionRole.and.returnValue(deferred1_wrong.promise);
		scope.getCPContactInteractionRole({
			partyRole:{id:1}
		});
		scope.$apply();

		// Llamada erronea a code 404 manageCPContactService.getCPContactInteractionRole
		deferred_4041_wrong = q.defer();
		///error 404, con mensaje 1
		deferred_4041_wrong.reject({
			code: 404,
			mensaje1: 'hola'
		});
		service.getCPContactInteractionRole.and.returnValue(deferred_4041_wrong.promise);
		scope.getCPContactInteractionRole({
			partyRole:{id:1}
		});
		scope.$apply();

		expect(scope.openSpinner).toHaveBeenCalled();
		expect(scope.closeSpinner).toHaveBeenCalled();
		expect(scope.fillPersonsAfterLoad_getCPContactInteractionRole).toHaveBeenCalled();
		expect(v_T3_TrazaService.setTrazaError).toHaveBeenCalled();
	});


	it('Test: $scope.getTranslate()', function() {

		spyOn(scope, 'averiguarIdioma');
		var arr = [
			{languageCode:1, value:'pepep'}
		];
		scope.getTranslate(arr);
		v_gettextCatalog.currentLanguage=1

		expect(scope.averiguarIdioma).toHaveBeenCalled();
	});


	it('Test: $scope.loadMultilanguageNew()', function() {

		spyOn(v_T3_CabeceraPresentacionService, 'resolveTranslationsCG');
		var deferred1 = q.defer();
		deferred1.resolve({data:'es'});
		v_T3_CabeceraPresentacionService.resolveTranslationsCG.and.returnValue(deferred1.promise);
		scope.loadMultilanguageNew();
		scope.$apply();
		scope.loadMultilanguageNew();

		//expect(v_T3_CabeceraPresentacionService.resolveTranslationsCG).toHaveBeenCalled();
	});


	it('Test: $scope.listContactMediumType()', function() {

		spyOn(scope, 'openSpinner');
		spyOn(scope, 'closeSpinner');
		spyOn(v_T3_TrazaService, 'setTrazaError');

		/* Mocks scope utilizados
		scope.manageCPContactView = {};
		scope.manageCPContactView.tiposContacto = [];
		scope.manageCPContactFunctionality = {};
		scope.manageCPContactFunctionality.error = {}; */

		// Llamada satisfactoria a manageCPContactService.listContactMediumType
		var DTO_listContactMediumType_OUT = {};

		var deferred1 = q.defer();
		deferred1.resolve(DTO_listContactMediumType_OUT);
		service.listContactMediumType.and.returnValue(deferred1.promise);
		scope.listContactMediumType();
		scope.$apply();

		// Llamada erronea a code 500 manageCPContactService.listContactMediumType
		deferred1_wrong = q.defer();
		///error 500, con mensaje 1
		deferred1_wrong.reject({
			code: 500,
			mensaje1: 'hola'
		});
		service.listContactMediumType.and.returnValue(deferred1_wrong.promise);
		scope.listContactMediumType();
		scope.$apply();

		// Llamada erronea a code 404 manageCPContactService.listContactMediumType
		deferred_4041_wrong = q.defer();
		///error 404, con mensaje 1
		deferred_4041_wrong.reject({
			code: 404,
			mensaje1: 'hola'
		});
		service.listContactMediumType.and.returnValue(deferred_4041_wrong.promise);
		scope.listContactMediumType();
		scope.$apply();

		expect(scope.openSpinner).toHaveBeenCalled();
		expect(scope.closeSpinner).toHaveBeenCalled();
		expect(v_T3_TrazaService.setTrazaError).toHaveBeenCalled();
	});


	it('Test: $scope.applyDataFromManageCPContact()', function() {


		/* Mocks scope utilizados
		scope.ManageCPContact_OUT = [];
		scope.ManageCPContact_OUT[0] = {};
		scope.ManageCPContact_OUT[0].interactionRoleType = {};
		scope.ManageCPContact_OUT[0].interactionRoleType.id = 1;
		scope.ManageCPContact_OUT[0].contactMediumTypeCategory = {};
		scope.isVisibleNotification = {};
		scope.notificationContactMediumTypeCategory = {};
		scope.isVisiblePersonContact = {};
		scope.personContactMediumTypeCategory = {}; */

		scope.applyDataFromManageCPContact();

	});


	it('Test: $scope.manageCPContact()', function() {

		spyOn(scope, 'openSpinner');
		spyOn(scope, 'closeSpinner');
		spyOn(scope, 'applyDataFromManageCPContact');
		spyOn(scope, 'onLoaded');
		spyOn(v_T3_TrazaService, 'setTrazaError');

		/* Mocks scope utilizados
		scope.CGT_ManageCPContact_IN = {};
		scope.CGT_ManageCPContact_IN.customerProblemType = {};
		scope.ManageCPContact_OUT = {};
		scope.manageCPContactFunctionality = {};
		scope.manageCPContactFunctionality.error = {}; */

		// Llamada satisfactoria a manageCPContactService.manageCPContact
		var DTO_manageCPContact_OUT = {};
		DTO_manageCPContact_OUT.cpcontactLists = {};

		var deferred1 = q.defer();
		deferred1.resolve(DTO_manageCPContact_OUT);
		service.manageCPContact.and.returnValue(deferred1.promise);
		scope.manageCPContact();
		scope.$apply();

		// Llamada erronea a code 500 manageCPContactService.manageCPContact
		deferred1_wrong = q.defer();
		///error 500, con mensaje 1
		deferred1_wrong.reject({
			code: 500,
			mensaje1: 'hola'
		});
		service.manageCPContact.and.returnValue(deferred1_wrong.promise);
		scope.manageCPContact();
		scope.$apply();

		// Llamada erronea a code 404 manageCPContactService.manageCPContact
		deferred_4041_wrong = q.defer();
		///error 404, con mensaje 1
		deferred_4041_wrong.reject({
			code: 404,
			mensaje1: 'hola'
		});
		service.manageCPContact.and.returnValue(deferred_4041_wrong.promise);
		scope.manageCPContact();
		scope.$apply();

		expect(scope.openSpinner).toHaveBeenCalled();
		expect(scope.closeSpinner).toHaveBeenCalled();
		expect(scope.applyDataFromManageCPContact).toHaveBeenCalled();
		expect(scope.onLoaded).toHaveBeenCalled();
		expect(v_T3_TrazaService.setTrazaError).toHaveBeenCalled();
	});


	it('Test: $scope.modalError()', function() {

		spyOn(v_gettextCatalog, 'getString');
		spyOn(v_PopupService, 'getPopupGeneric');

		scope.modalError();

		expect(v_gettextCatalog.getString).toHaveBeenCalled();
		expect(v_PopupService.getPopupGeneric).toHaveBeenCalled();
	});


	it('Test: $scope.refreshResults()', function() {


		scope.refreshResults({
			search:true,
			items:[	{
				id:1,
				name:'juan'
			}]
		});

	});


	it('Test: $scope.refreshResultsMedios()', function() {


		scope.refreshResultsMedios({
			search:true,
			items:[	{
				id:1,
				value:'juan'
			}]
		});

	});


	it('Test: $scope.refreshResultsPersona()', function() {


		scope.refreshResultsPersona({
			search:true,
			items:[	{
				id:1,
				value:'juan'
			}]
		});

	});


	it('Test: $scope.removeFila()', function() {


		scope.manageCPContactView.tmp_listPartyRoles_tipo2=[];
		scope.manageCPContactData.notifyPerson=[];
		scope.removeFila();

	});


});

describe('Test Controller: manageCPContactPopupController', function(){
	/* Variales globales */
	var httpBackend, q, controller, scope, timeout;
	var service, v_modalInstance;

	/* Inicializacion modulo */
	beforeEach(function(){
		module(CNT.name);
	});

	/* Inyeccion del controlador */
	beforeEach(inject(function(
		/* Variables comunes inyectadas*/
		$controller, $rootScope, _$httpBackend_, $q, $timeout
		/* Parametros del controlador inyectados */
		){

		/* Variables comunes */
		scope = $rootScope.$new();
		httpBackend = _$httpBackend_;
		q = $q;
		timeout = $timeout;

		/* Mockear llamadas $http pendientes */
		httpBackend.when('GET','').respond();

		/* Parametros del controlador */
		v_modalInstance = {};
		v_modalInstance.close = function(){};

		scope.tlt = function(param){return param;};
		scope.translate = function(param){return param;};


		/* Instancia del controlador */
		controller = $controller('manageCPContactPopupController',{
			'$scope' : scope,
			'$modalInstance' : v_modalInstance
		});

	}));


	it('Test: $scope.cerrarPopup()', function() {

		spyOn(v_modalInstance, 'close');

		scope.cerrarPopup();

		expect(v_modalInstance.close).toHaveBeenCalled();
	});


});

