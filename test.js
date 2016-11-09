'use strict';
CNT.ngModule.controller('obtConfigInformationTechCPCOLController', ['$scope', '$log',
	'PopupService', 'gettextCatalog',
	'obtConfigInformationTechCPCOLService',
	'T3_CommunicationService', 'T3_CabeceraPresentacionService', '$state',
	'T3_TrazaService', '$stateParams', 'T3_StateService', function($scope, $log, PopupService, gettextCatalog, obtConfigInformationTechCPCOLService, T3_CommunicationService, T3_CabeceraPresentacionService, $state, T3_TrazaService, $stateParams, T3_StateService){
	$scope.init = function(){
		/*Objeto que guarda los datos utilizados por el usuario*/
		$scope.obtConfigInformationTechCPCOLView = {};
		/*objeto que contiene los datos necesarios para el correcto funcionalmiento del cgt*/
		$scope.obtConfigInformationTechCPCOLFunctionality = {};
		/*objeto en el que guardamos los datos traidos del back*/
		$scope.obtConfigInformationTechCPCOLData = {};

		$scope.loadMultilanguage();
		/* Subscribe a la función de Multiidioma*/
		T3_CommunicationService.subscribe($scope, "AlertLanguageChanged", $scope.loadMultilanguage);

		T3_StateService.init($scope, obtConfigInformationTechCPCOLService, {
			CGT_ObtConfigInformationTechCPCOL_IN : $scope.cgtObtConfigInformationTechCPCOLIn || $stateParams.cgtObtConfigInformationTechCPCOLIn
		});

		$scope.obtConfigInformationTechCPCOLFunctionality.datosPrevios = obtConfigInformationTechCPCOLService.initialData.CGT_ObtConfigInformationTechCPCOL_IN;
		/* defino vble. 'idPermiso' para indicar el id, por defecto '0' */
		$scope.obtConfigInformationTechCPCOLFunctionality.idPermiso = "0";
		/*objeto para mostrar los datos del Wizard*/
		$scope.objectWizard = [{"name":"PASO 1","desc":"Selección del producto y motivo","id":"0"},
		{"name":"PASO 2","desc":"Apertura y gestión del problema","id":"1"}];
		/* defino vble. para indicar en que paso del Wizard nos encontramos */
		$scope.obtConfigInformationTechCPCOLFunctionality.paso2 = false;
		$scope.showPartyRoleHeaderIn = {
			/*Tipos posibles para poder testear el funcionamiento correcto del juego de la maqueta: 'customerData_conDeuda'//prospectData';//'customerData_sinDeuda';*/
			typeRole: 'customerData_sinDeuda',
			conRepresentative: 'representativeData'
		};
		/* Realizo la subscripciones a popUps */
		$scope.getSubscription();
		/* Defino obj. 'cgtSelectProductsIn' con tres parámetros para mostrar los botones desde la directiva */
		$scope.cgtSelectProductsIn = {
			"showRestrictions": true,
			"showPrices": true,
			"showRelations": true,
			"idProduct":true
		};
		/* función para cargar datos y mostrarlos en el SELECT */
		$scope.findProductIdentificationData();
		/* defino la vble. habilitarCombo a false para que no quede habilitado el SELECT 'Motivo'*/
		$scope.obtConfigInformationTechCPCOLFunctionality.habilitarCombo = false;
	};
	/*función que carga el multidioma*/
	$scope.loadMultilanguage = function(){
		T3_CabeceraPresentacionService.resolveTranslationsCG('obtConfigInformationTechCPCOL',gettextCatalog.currentLanguage);
	};
	$scope.getSubscription = function(){
		/* función que recoge los datos de selectProduct */
		T3_CommunicationService.subscribe($scope,"EGT_SelectProductsPublish",function(event,data) {
			/* Compruebo si existe el parametro 'data', si existe y el parametro catalogProduct es true, habilito el SELECT, y sino no */
			if(data[0] && data[0].catalogProduct){
				$scope.obtConfigInformationTechCPCOLFunctionality.habilitarCombo = true;
			} else {
				$scope.obtConfigInformationTechCPCOLFunctionality.habilitarCombo = false;
			}
		});
	};
	/* función para cargar datos y mostrarlos en el SELECT */
	$scope.findProductIdentificationData = function() {
		var FindProductIdentificationData_IN = {};
		obtConfigInformationTechCPCOLService.findProductIdentificationData(FindProductIdentificationData_IN).then(
			function(data) {
				$scope.obtConfigInformationTechCPCOLData.findProductIdentificationData = data;
				/*Almaceno el ARRAY para construir el SELECT cPMotive*/
				$scope.obtConfigInformationTechCPCOLData.motivoDatos = data.product.cPMotive;
				/*Almaceno el id de cPMotive*/
				$scope.obtConfigInformationTechCPCOLData.motivoId = data.product.cPMotive[0].id;
				/*¿Existe TT.id?*/
				if($scope.obtConfigInformationTechCPCOLData.findProductIdentificationData.affectation.troubleTicket.id){
					$scope.modalInfo('PRCL_M_000702');
				}else if($scope.obtConfigInformationTechCPCOLData.motivoDatos){
					/*¿Existe PRCL_W_000702?*/
					if($scope.obtConfigInformationTechCPCOLData.findProductIdentificationData.warnings.name === "PRCL_W_000702"){
						$scope.modalInfo('PRCL_M_000701');
					}
				}
			}, function() {
				$scope.modalError('PRCL_M_000700');
			});
	};
	/* función para cargar problemas de cliente duplicados */
	$scope.manageDuplicateCustomerProblem = function() {
		var ManageDuplicateCustomerProblem_IN = {};
		obtConfigInformationTechCPCOLService.manageDuplicateCustomerProblem(ManageDuplicateCustomerProblem_IN).then(
			function(data) {
				/* Realizo un publish para envíar el obj. 'data', el evento es 'EGT_ObtConfigInformationTechCPCOLOK' */
				T3_CommunicationService.publish('EGT_ObtConfigInformationTechCPCOLOK', data);
				$scope.obtConfigInformationTechCPCOLData.manageDuplicateCustomerProblem = data.actionTask;
				/* si existe 'customerProblemTaskType.id'*/
				if($scope.obtConfigInformationTechCPCOLData.manageDuplicateCustomerProblem.customerProblemTaskType.id){
					/* almaceno*/
					$scope.CPTType = $scope.obtConfigInformationTechCPCOLData.manageDuplicateCustomerProblem.customerProblemTaskType.id;
					switch($scope.obtConfigInformationTechCPCOLData.manageDuplicateCustomerProblem.customerProblemTaskType.id){
						case 1:
							/* Evento Final */
						break;
						case 5:
							/* Modificación del problema */
							$scope.modalInfoBtnCancel('PRCL_M_00702');
						break;
						case 32:
							/* Validación del problema */
							$scope.modalInfoBtnCancel('PRCL_M_00703');
						break;
						case 97:
							/* Solicitud de recogida del dispositivo */
							$scope.modalInfoBtnCancel('PRCL_M_000742');
						break;
					}
				/* si 'customerProblemTaskType.id' es null*/
				}else if($scope.obtConfigInformationTechCPCOLData.manageDuplicateCustomerProblem.customerProblemTaskType.id === "null"){
					/* si existe la vble. 'customerProblem.id'*/
					if($scope.obtConfigInformationTechCPCOLData.manageDuplicateCustomerProblem.customerProblem.id){
						/* si 'customerProblem.id' es 7*/
						if($scope.obtConfigInformationTechCPCOLData.manageDuplicateCustomerProblem.customerProblem.id === "7"){
							/*según sea la vble. 'warningCode', mostramos un mensaje u otro*/
							switch(warningCode){
								case "PRCL_W_000718":
									$scope.modalInfo('PRCL_M_000743');
								break;
								case "PRCL_W_000719":
									$scope.modalInfo('PRCL_M_000744');
								break;
								case "PRCL_W_000700":
									$scope.modalInfo('PRCL_M_000704');
								break;
							}
							/* si 'customerProblem.id' es 8*/
						}else if($scope.obtConfigInformationTechCPCOLData.manageDuplicateCustomerProblem.customerProblem.id === "8"){
							$scope.modalError('PRCL_M_000703');
						}
					}
				}
			}, function(errorCode) {
				/* Realizo un publish para envíar el obj. 'errorCode', el evento es 'EGT_PrclReturnEmptyKO' */
				T3_CommunicationService.publish('EGT_PrclReturnEmptyKO', errorCode);
				/* Mostramos diferentes mensajes: 'PRCL_M_000100','PRCL_M_00060' y/o 'PRCL_M_000739' */
				if(errorCode === "PRCL-E-00011"){
					$scope.modalError('PRCL_M_00060');
				} else if(errorCode === "PRCL-E-000248"){
					$scope.modalError('PRCL_M_000739');
				} else {
					$scope.modalError('PRCL_M_000100');
				}
			});
	};
	/* función para realizar la acción 'siguiente' en el Wizard */
	$scope.siguiente = function() {
		$scope.manageDuplicateCustomerProblem();
	};
	/* función para regresar a la pantalla anterior */
	$scope.cancelar = function() {
		$state.go($scope.CGT_ObtConfigInformationTechCPCOL_IN.prevState.name);
	};
	/*Modal para mostrar errores*/
	$scope.modalError = function(messageError) {
		var options = {
			textoPregunta: "",
			textoBtnCancelar: "",
			accionBtnCancelar: "",
			textoPrincipal : "",
			textoSecundario: gettextCatalog.getString('obtConfigInformationTechCPCOL-registro_error_' + messageError),
			size: "sm",
			tipoModal: "error",
			tituloModal: gettextCatalog.getString('obtConfigInformationTechCPCOL-titulo_registro_error'),
			textoBtnAceptar: gettextCatalog.getString('obtConfigInformationTechCPCOL-aceptar'),
			accionBtnAceptar: "closePopup()"
		};
		var controller = 'modalObtConfigInformationTechCPCOLController';
		PopupService.getPopupGeneric($scope, controller, options);
	};
	/*Modal para mostrar info*/
	$scope.modalInfo = function(messageInfo) {
		var options = {
			textoPregunta: "",
			textoBtnCancelar: "",
			accionBtnCancelar: "",
			textoPrincipal : "",
			textoSecundario: gettextCatalog.getString('obtConfigInformationTechCPCOL-registro_info_' + messageInfo),
			size: "sm",
			tipoModal: "info",
			tituloModal: gettextCatalog.getString('obtConfigInformationTechCPCOL-titulo_registro_info'),
			textoBtnAceptar: gettextCatalog.getString('obtConfigInformationTechCPCOL-aceptar'),
			accionBtnAceptar: "closePopup()"
		};
		var controller = 'modalObtConfigInformationTechCPCOLController';
		PopupService.getPopupGeneric($scope, controller, options);
	};
	/*Modal para mostrar info con dos botones*/
	$scope.modalInfoBtnCancel = function(messageInfo) {
		var options = {
			textoPregunta: "",
			textoBtnCancelar: gettextCatalog.getString('obtConfigInformationTechCPCOL-cancelar'),
			accionBtnCancelar: "closePopup()",
			textoPrincipal : "",
			textoSecundario: gettextCatalog.getString('obtConfigInformationTechCPCOL-registro_info_' + messageInfo),
			size: "sm",
			tipoModal: "info",
			tituloModal: gettextCatalog.getString('obtConfigInformationTechCPCOL-titulo_registro_info'),
			textoBtnAceptar: gettextCatalog.getString('obtConfigInformationTechCPCOL-aceptar'),
			accionBtnAceptar: "aceptarPopup()"
		};
		var controller = 'modalObtConfigInformationTechCPCOLController';
		PopupService.getPopupGeneric($scope, controller, options);
	};
}]);

CNT.ngModule.controller('modalObtConfigInformationTechCPCOLController', ['$scope', '$state', function($scope, $state) {
	/* función para cerrar el PopUp */
	$scope.closePopup = function(){
		$scope.$close();
	};
	/* función para aceptar el PopUp */
	$scope.aceptarPopup = function(){
		var CPTType = $scope.$parent.$parent.CPTType;
		var motivoID = $scope.$parent.$parent.obtConfigInformationTechCPCOLData.motivoId;
		/* Voy a un estado u otro dependiendo de los paramétros de entrada */
		switch(CPTType){
			case 5:
				var params = {
                    prevState: $state.current,
                    data: null
                };
				$state.go('modifyTechnicalCPCOL', {cgtModifyTechnicalCPCOLIn: params});
				break;
			case 7:
				if(motivoID !== 700){
					var params = {
	                    prevState: $state.current,
	                    data: null
	                };
					$state.go('createTechnicalCPCOL', {cgtCreateTechnicalCPCOLIn: params});
				} else if(motivoID === 700){
					var params = {
	                    prevState: $state.current,
	                    data: null
	                };
					$state.go('createRepairmentDeviceCPCOL', {cgtCreateRepairmentDeviceCPCOLIn: params});
				}
				break;
			case 32:
				var params = {
                    prevState: $state.current,
                    data: null
                };
				$state.go('validateCustomerProblemResolutionCOL', {cgtValidateCustomerProblemResolutionCOLIn: params});
				break;
			case 97:
				var params = {
                    prevState: $state.current,
                    data: null
                };
				$state.go('terminateTechDeviceRepairCP', {cgtTerminateTechDeviceRepairCPIn: params});
				break;
			case null:
				var params = {
                    prevState: $state.current,
                    data: null
                };
				$state.go('showDetailOfCPReport', {cgtShowDetailOfCPReportIn: params});
				break;
		}
		$scope.$close();
	};
}]);