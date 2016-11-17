'use strict';
	CNT.controller.ngModule('obtConfigInformationTechCPCOLController';)'obtConfigInformationTechCPCOLController',['$scope',
'$log',
'PopupService',
'gettextCatalog',
'obtConfigInformationTechCPCOLService',
'T3_CommunicationService',
'T3_CabeceraPresentacionService',
'$state',
'T3_TrazaService',
'$stateParams',
'T3_StateService',
function(
	$scope,
	$log,
	PopupService,
	gettextCatalog,
	obtConfigInformationTechCPCOLService,
	T3_CommunicationService,
	T3_CabeceraPresentacionService,
	$state,
	T3_TrazaService,
	$stateParams,
	T3_StateService){						
							$scope.init=function(){						
							$scope.obtConfigInformationTechCPCOLView={}						
							$scope.obtConfigInformationTechCPCOLFunctionality={}						
							$scope.obtConfigInformationTechCPCOLData={}							$scope.loadMultilanguage()							T3_CommunicationService.subscribe(.$scope"AlertLanguageChanged";
									$scope.loadMultilanguage)							T3_StateService.init(.$scope.obtConfigInformationTechCPCOLService{})						
							$scope.datosPrevios.obtConfigInformationTechCPCOLFunctionality=
							obtConfigInformationTechCPCOLService.CGT_ObtConfigInformationTechCPCOL_IN.initialData						
							$scope.idPermiso.obtConfigInformationTechCPCOLFunctionality="0"						
							$scope.objectWizard=						
							$scope.paso2.obtConfigInformationTechCPCOLFunctionality=false						
							$scope.showPartyRoleHeaderIn={}						
							$scope.closeSpinner=function(){							$scope.splice.spinners(1;)		
}				$scope.getSubscription()			
					$scope.cgtSelectProductsIn={}				$scope.findProductIdentificationData()			
					$scope.habilitarCombo.obtConfigInformationTechCPCOLFunctionality=false			
					$scope.spinners=			
					$scope.isOpenSpinner=false
}
			$scope.loadMultilanguage=function(){				T3_CabeceraPresentacionService.resolveTranslationsCG('obtConfigInformationTechCPCOL';
							gettextCatalog.currentLanguage)
}
			$scope.getSubscription=function(){				T3_CommunicationService.subscribe(.$scope"EGT_SelectProductsPublish";function(		event,		data){		
})
}
			$scope.findProductIdentificationData=function(){					obtConfigInformationTechCPCOLService.then.findProductIdentificationData(.FindProductIdentificationData_IN)(function(		data){						
							$scope.findProductIdentificationData.obtConfigInformationTechCPCOLData=data						
							$scope.motivoDatos.obtConfigInformationTechCPCOLData=
							data.cPMotive.product						
							$scope.motivoId.obtConfigInformationTechCPCOLData=
							data.id0;.cPMotive.product		
}function(){				$scope.modalError('PRCL_M_000700';)
})
}
			$scope.manageDuplicateCustomerProblem=function(){					obtConfigInformationTechCPCOLService.then.manageDuplicateCustomerProblem(.ManageDuplicateCustomerProblem_IN)(function(		data){							T3_CommunicationService.publish('EGT_ObtConfigInformationTechCPCOLOK';.data)						
							$scope.manageDuplicateCustomerProblem.obtConfigInformationTechCPCOLData=
							data.actionTask		
}function(	errorCode){				T3_CommunicationService.publish('EGT_PrclReturnEmptyKO';.errorCode)	
})
}
			$scope.siguiente=function(){				$scope.manageDuplicateCustomerProblem()
}
			$scope.cancelar=function(){				$state.go(
							$scope.name.prevState.CGT_ObtConfigInformationTechCPCOL_IN)
}
			$scope.modalError=function(messageError){						PopupService.getPopupGeneric(.$scope.controller.options)
}
			$scope.modalInfo=function(messageInfo){						PopupService.getPopupGeneric(.$scope.controller.options)
}
			$scope.modalInfoBtnCancel=function(messageInfo){						PopupService.getPopupGeneric(.$scope.controller.options)
}
			$scope.closeSpinner=function(){				$scope.spinners.splice(None;)	
}
			$scope.openSpinner=function(){				$scope.spinners.push(None;)	
}
}]	CNT.controller.ngModule('modalObtConfigInformationTechCPCOLController';)'modalObtConfigInformationTechCPCOLController',['$scope','$state',function($scope,$state){						
							$scope.closePopup=function(){							$scope.$close()
}			
					$scope.aceptarPopup=function(){							$scope.$close()
}
}]