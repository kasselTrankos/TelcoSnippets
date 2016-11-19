'use strict';

CNT.ngModule.controller('obtConfigInformationTechCPCOLController'['$scope','$log','PopupService','gettextCatalog','obtConfigInformationTechCPCOLService','T3_CommunicationService','T3_CabeceraPresentacionService','$state','T3_TrazaService','$stateParams','T3_StateService',function(
	$scope	$log	PopupService	gettextCatalog	obtConfigInformationTechCPCOLService	T3_CommunicationService	T3_CabeceraPresentacionService	$state	T3_TrazaService	$stateParams	T3_StateService){				
				$scope.init=function(){						
						$scope.obtConfigInformationTechCPCOLView={};						
						$scope.obtConfigInformationTechCPCOLFunctionality={};						
						$scope.obtConfigInformationTechCPCOLData={};						
						$scope.loadMultilanguage()						
						T3_CommunicationService.subscribe(			$scope			"AlertLanguageChanged"						$scope.loadMultilanguage)						
						T3_StateService.init(			$scope			obtConfigInformationTechCPCOLService			{})						
									$scope.obtConfigInformationTechCPCOLFunctionality.datosPrevios=						obtConfigInformationTechCPCOLService.initialData.CGT_ObtConfigInformationTechCPCOL_IN;						
									$scope.obtConfigInformationTechCPCOLFunctionality.idPermiso="0";						
						$scope.objectWizard=[			{},			{},];						
									$scope.obtConfigInformationTechCPCOLFunctionality.paso2=false;						
						$scope.showPartyRoleHeaderIn={};						
						$scope.getSubscription()						
						$scope.cgtSelectProductsIn={};						
						$scope.findProductIdentificationData()						
									$scope.obtConfigInformationTechCPCOLFunctionality.habilitarCombo=false;						
						$scope.spinners=[];						
						$scope.isOpenSpinner=false;};						
						$scope.loadMultilanguage=function(){								
								T3_CabeceraPresentacionService.resolveTranslationsCG(				'obtConfigInformationTechCPCOL'								gettextCatalog.currentLanguage)};								
								$scope.getSubscription=function(){										
										T3_CommunicationService.subscribe(					$scope					"EGT_SelectProductsPublish"					function(					event					data){						})};												
												$scope.findProductIdentificationData=function(){																					
														
														obtConfigInformationTechCPCOLService.findProductIdentificationData(							FindProductIdentificationData_IN).then(							function(							data){																
																								$scope.obtConfigInformationTechCPCOLData.findProductIdentificationData=data;																
																								$scope.obtConfigInformationTechCPCOLData.motivoDatos=																data.product.cPMotive;																
																								$scope.obtConfigInformationTechCPCOLData.motivoId=																																data.product.cPMotive0;.id;								}								function(){																		
																		$scope.modalError(									'PRCL_M_000700')})};																		
																		$scope.manageDuplicateCustomerProblem=function(){																														
																				
																				obtConfigInformationTechCPCOLService.manageDuplicateCustomerProblem(										ManageDuplicateCustomerProblem_IN).then(										function(										data){																						
																						T3_CommunicationService.publish(											'EGT_ObtConfigInformationTechCPCOLOK'											data)																						
																																	$scope.obtConfigInformationTechCPCOLData.manageDuplicateCustomerProblem=											data.actionTask;											}											function(											errorCode){																								
																								T3_CommunicationService.publish(												'EGT_PrclReturnEmptyKO'												errorCode)												})};																								
																								$scope.siguiente=function(){																										
																										$scope.manageDuplicateCustomerProblem()};																										
																										$scope.cancelar=function(){																												
																												$state.go(																																																								$scope.CGT_ObtConfigInformationTechCPCOL_IN.prevState.name)};																												
																												$scope.modalError=function(														messageError){																																																												
																														PopupService.getPopupGeneric(															$scope															controller															options)};																														
																														$scope.modalInfo=function(															messageInfo){																																																																
																																PopupService.getPopupGeneric(																$scope																controller																options)};																																
																																$scope.modalInfoBtnCancel=function(																messageInfo){																																																																				
																																		PopupService.getPopupGeneric(																	$scope																	controller																	options)};																																		
																																		$scope.closeSpinner=function(){																																				
																																																						$scope.spinners.splice(																		-1																		1)																		};																																				
																																				$scope.openSpinner=function(){																																						
																																																									$scope.spinners.push(																			1)																			};},])																			'obtConfigInformationTechCPCOLController'																			[																			'$scope',																			'$log',																			'PopupService',																			'gettextCatalog',																			'obtConfigInformationTechCPCOLService',																			'T3_CommunicationService',																			'T3_CabeceraPresentacionService',																			'$state',																			'T3_TrazaService',																			'$stateParams',																			'T3_StateService',																			function(
																				$scope																				$log																				PopupService																				gettextCatalog																				obtConfigInformationTechCPCOLService																				T3_CommunicationService																				T3_CabeceraPresentacionService																				$state																				T3_TrazaService																				$stateParams																				T3_StateService){																																										
																																										$scope.init=function(){																																												
																																												$scope.obtConfigInformationTechCPCOLView={};																																												
																																												$scope.obtConfigInformationTechCPCOLFunctionality={};																																												
																																												$scope.obtConfigInformationTechCPCOLData={};																																												
																																												$scope.loadMultilanguage()																																												
																																												T3_CommunicationService.subscribe(																						$scope																						"AlertLanguageChanged"																																												$scope.loadMultilanguage)																																												
																																												T3_StateService.init(																						$scope																						obtConfigInformationTechCPCOLService																						{})																																												
																																																																		$scope.obtConfigInformationTechCPCOLFunctionality.datosPrevios=																																												obtConfigInformationTechCPCOLService.initialData.CGT_ObtConfigInformationTechCPCOL_IN;																																												
																																																																		$scope.obtConfigInformationTechCPCOLFunctionality.idPermiso="0";																																												
																																												$scope.objectWizard=[																						{},																						{},];																																												
																																																																		$scope.obtConfigInformationTechCPCOLFunctionality.paso2=false;																																												
																																												$scope.showPartyRoleHeaderIn={};																																												
																																												$scope.getSubscription()																																												
																																												$scope.cgtSelectProductsIn={};																																												
																																												$scope.findProductIdentificationData()																																												
																																																																		$scope.obtConfigInformationTechCPCOLFunctionality.habilitarCombo=false;																																												
																																												$scope.spinners=[];																																												
																																												$scope.isOpenSpinner=false;};																																												
																																												$scope.loadMultilanguage=function(){																																														
																																														T3_CabeceraPresentacionService.resolveTranslationsCG(																							'obtConfigInformationTechCPCOL'																																														gettextCatalog.currentLanguage)};																																														
																																														$scope.getSubscription=function(){																																																
																																																T3_CommunicationService.subscribe(																								$scope																								"EGT_SelectProductsPublish"																								function(																								event																								data){																									})};																																																		
																																																		$scope.findProductIdentificationData=function(){																																																																														
																																																				
																																																				obtConfigInformationTechCPCOLService.findProductIdentificationData(																										FindProductIdentificationData_IN).then(																										function(																										data){																																																						
																																																																																	$scope.obtConfigInformationTechCPCOLData.findProductIdentificationData=data;																																																						
																																																																																	$scope.obtConfigInformationTechCPCOLData.motivoDatos=																																																						data.product.cPMotive;																																																						
																																																																																	$scope.obtConfigInformationTechCPCOLData.motivoId=																																																																																																												data.product.cPMotive0;.id;																											}																											function(){																																																								
																																																								$scope.modalError(																												'PRCL_M_000700')})};																																																								
																																																								$scope.manageDuplicateCustomerProblem=function(){																																																																																							
																																																										
																																																										obtConfigInformationTechCPCOLService.manageDuplicateCustomerProblem(																													ManageDuplicateCustomerProblem_IN).then(																													function(																													data){																																																												
																																																												T3_CommunicationService.publish(																														'EGT_ObtConfigInformationTechCPCOLOK'																														data)																																																												
																																																																																										$scope.obtConfigInformationTechCPCOLData.manageDuplicateCustomerProblem=																														data.actionTask;																														}																														function(																														errorCode){																																																														
																																																														T3_CommunicationService.publish(																															'EGT_PrclReturnEmptyKO'																															errorCode)																															})};																																																														
																																																														$scope.siguiente=function(){																																																																
																																																																$scope.manageDuplicateCustomerProblem()};																																																																
																																																																$scope.cancelar=function(){																																																																		
																																																																		$state.go(																																																																																																																																				$scope.CGT_ObtConfigInformationTechCPCOL_IN.prevState.name)};																																																																		
																																																																		$scope.modalError=function(																																	messageError){																																																																																																																																								
																																																																				PopupService.getPopupGeneric(																																		$scope																																		controller																																		options)};																																																																				
																																																																				$scope.modalInfo=function(																																		messageInfo){																																																																																																																																												
																																																																						PopupService.getPopupGeneric(																																			$scope																																			controller																																			options)};																																																																						
																																																																						$scope.modalInfoBtnCancel=function(																																			messageInfo){																																																																																																																																																
																																																																								PopupService.getPopupGeneric(																																				$scope																																				controller																																				options)};																																																																								
																																																																								$scope.closeSpinner=function(){																																																																										
																																																																																																															$scope.spinners.splice(																																					-1																																					1)																																					};																																																																										
																																																																										$scope.openSpinner=function(){																																																																												
																																																																																																																		$scope.spinners.push(																																						1)																																						};},]
																																																																																																																		CNT.ngModule.controller(																																						'modalObtConfigInformationTechCPCOLController'																																						[																																						'$scope',																																						'$state',																																						function(																																						$scope																																						$state){																																																																														
																																																																														$scope.closePopup=function(){																																																																																
																																																																																$scope.$close()};																																																																																
																																																																																$scope.aceptarPopup=function(){																																																																																																																																																																																																													
																																																																																		$scope.$close()};},])																																									'modalObtConfigInformationTechCPCOLController'																																									[																																									'$scope',																																									'$state',																																									function(																																									$scope																																									$state){																																																																																				
																																																																																				$scope.closePopup=function(){																																																																																						
																																																																																						$scope.$close()};																																																																																						
																																																																																						$scope.aceptarPopup=function(){																																																																																																																																																																																																																												
																																																																																								$scope.$close()};},]