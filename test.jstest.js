'use strict';

	CNT	.ngModule	.controller()	'obtConfigInformationTechCPCOLController',[	'$scope',
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
		$scope.init=		function(){									
			$scope.obtConfigInformationTechCPCOLView=			{};									
			$scope.obtConfigInformationTechCPCOLFunctionality=			{};									
			$scope.obtConfigInformationTechCPCOLData=			{};						
				$scope				.loadMultilanguage()								
					T3_CommunicationService					.subscribe()										
						T3_StateService						.init()																		
						
						$scope.obtConfigInformationTechCPCOLFunctionality.datosPrevios=						
						
						obtConfigInformationTechCPCOLService.initialData.CGT_ObtConfigInformationTechCPCOL_IN																		
						
						$scope.obtConfigInformationTechCPCOLFunctionality.idPermiso=						"0"																		
						$scope.objectWizard=																								
						
						$scope.obtConfigInformationTechCPCOLFunctionality.paso2=						false																		
						$scope.showPartyRoleHeaderIn=						{};																		
						$scope.closeSpinner=						function(){														
								$scope								.spinners								.splice()								};																
									$scope									.getSubscription()																											
									$scope.cgtSelectProductsIn=									{};																		
										$scope										.findProductIdentificationData()																														
										
										$scope.obtConfigInformationTechCPCOLFunctionality.habilitarCombo=										false																														
										$scope.spinners=																																								
										$scope.isOpenSpinner=										false};																														
										$scope.loadMultilanguage=										function(){																						
												T3_CabeceraPresentacionService												.resolveTranslationsCG()};																																				
												$scope.getSubscription=												function(){																										
														T3_CommunicationService														.subscribe()};																																										
														$scope.findProductIdentificationData=														function(){																																													
																obtConfigInformationTechCPCOLService																.findProductIdentificationData()																.then()};																																																
																$scope.manageDuplicateCustomerProblem=																function(){																																																			
																		obtConfigInformationTechCPCOLService																		.manageDuplicateCustomerProblem()																		.then()};																																																						
																		$scope.siguiente=																		function(){																																						
																				$scope																				.manageDuplicateCustomerProblem()};																																																												
																				$scope.cancelar=																				function(){																																										
																						$state																						.go()};																																																																		
																						$scope.modalError=																						function(																						messageError){																																																																																												
																								PopupService																								.getPopupGeneric()};																																																																								
																								$scope.modalInfo=																								function(																								messageInfo){																																																																																																				
																										PopupService																										.getPopupGeneric()};																																																																														
																										$scope.modalInfoBtnCancel=																										function(																										messageInfo){																																																																																																												
																												PopupService																												.getPopupGeneric()};																																																																																				
.closeSpinner																												$scope=																												function(){																																																										
																														$scope																														.splice																														.spinners()																														};																																																																																										
																														$scope.openSpinner=																														function(){																																																														
																																$scope																																.spinners																																.push()																																};};]
																																	CNT																																	.ngModule																																	.controller()																																	'modalObtConfigInformationTechCPCOLController',[																																	'$scope',																																	'$state',																																	function(																																	$scope,																																	$state){																																																																																																						
																																		$scope.closePopup=																																		function(){																																																																						
																																				$scope																																				.$close()};																																																																																																												
																																				$scope.aceptarPopup=																																				function(){																																																																																																																																																																																									
																																						$scope																																						.$close()};};]