CNT.ngModule.controller( 'manageCPContactController', [ 'manageCPContactService', '$timeout', '$stateParams', '$scope', 'gettextCatalog', 'T3_CabeceraPresentacionService', 'T3_CommunicationService', 'T3_TrazaService', 'T3_StateService', '$filter', 'PopupService', 'T3_StorageService', '$parse', function(
  manageCPContactService,
  $timeout,
  $stateParams,
  $scope,
  gettextCatalog,
  T3_CabeceraPresentacionService,
  T3_CommunicationService,
  T3_TrazaService,
  T3_StateService,
  $filter,
  PopupService,
  T3_StorageService,
  $parse ) {
  $scope.init = function() {
    $scope.showPersonContact = false;
    $scope.contTable = 0;
    $scope.visibleNotification = false;
    $scope.visiblePerson = false;
    $scope.isVisiblePersonContact = false;
    $scope.isVisibleNotification = false;
    $scope.isOpenSpinner = false;
    $scope.spinners = [];
    $scope.lastSearch = {};
    $scope.personContactMediumTypeCategory = null;
    $scope.notificationContactMediumTypeCategory = null;
    T3_StateService.init( $scope, manageCPContactService, {
      CGT_ManageCPContact_IN: $scope.cgtManageCPContactIn || $stateParams.cgtManageCPContactIn
    } );
    if ( $scope.CGT_ManageCPContact_IN ) {
      $scope.manageCPContact();
    }
    $scope.loadMultilanguageNew();
    T3_CommunicationService.subscribe( $scope, "AlertLanguageChanged", $scope.loadMultilanguageNew );
  };
  $scope.getNameOfState = function() {
    return 'cnt' + CNT.name.charAt( 0 ).toUpperCase() + CNT.name.slice( 1 ).toLowerCase() + 'State'
  };
  $scope.setSetPreviousState = function() {
    var previousStateData = T3_StorageService.getItem( {
      cgName: $scope.getNameOfState()
    } );
    if ( previousStateData !== void0 && previousStateData !== null && previousStateData ) {
      if ( previousStateData.categorizeDisagreementPolicies ) {
        $scope.lastSearch.categorizeDisagreementPolicies = previousStateData.categorizeDisagreementPolicies;
      }
      if ( previousStateData.listCPByPartyRoleAndCPType ) {
        $scope.lastSearch.listCPByPartyRoleAndCPType = previousStateData.listCPByPartyRoleAndCPType;
      }
      if ( previousStateData.categorizeImproperCustService ) {
        $scope.lastSearch.categorizeImproperCustService = previousStateData.categorizeImproperCustService;
      }
      if ( previousStateData.manageCPContact ) {
        if ( previousStateData.manageCPContact ) {
          $scope.setStateData( previousStateData.manageCPContact );
        }
      }
    }
  };
  $scope.setStateData = function(
    data ) {
    $scope.cgtManageCPContactIn.businessInteractionRoles = data.businessInteractionRoles || [];
    if ( $scope.cgtManageCPContactIn.businessInteractionRoles.length > 0 ) {
      $scope.drawBusinessInteractionRoles();
    }
  };
  $scope.putItem = function() {
    T3_StorageService.putItem( {
      cgName: $scope.getNameOfState(),
      data: {
        categorizeImproperCustService: $scope.lastSearch.categorizeImproperCustService || {},
        categorizeDisagreementPolicies: $scope.lastSearch.categorizeDisagreementPolicies || {},
        listCPByPartyRoleAndCPType: $scope.lastSearch.listCPByPartyRoleAndCPType || {},
        manageCPContact: {
          businessInteractionRoles: $scope.lastSearch.businessInteractionRoles
        }
      }
    } );
  };
  $scope.toString = function(
    value ) {
    return String( value )
  };
  $scope.drawBusinessInteractionRoles = function(
    index ) {
    var i = index || 0;
    $scope.manageCPContactData.notifyPerson.i = $scope.cgtManageCPContactIn.businessInteractionRoles.i.id;
    $scope.listContactMediumType( i );
  };
  $scope.manageCPContact = function() {
    var ManageCPContact_IN = {
      customerProblemType: {
        id: $scope.CGT_ManageCPContact_IN.customerProblemType.id
      }
    };
    $scope.openSpinner();
    manageCPContactService.manageCPContact( ManageCPContact_IN ).then( function(
      data ) {
      $scope.closeSpinner();
      $scope.ManageCPContact_OUT = data.cpcontactLists;
      $scope.applyDataFromManageCPContact();
      $scope.onLoaded();
    }, function(
      error ) {
      $scope.closeSpinner();
      T3_TrazaService.setTrazaError( CNT.name, "Se ha detectado un error " + error.code + " en la llamada al servicio manageCPContact." );
      var auxError = {};
      if ( error.code === 500 && error.mensaje1 !== undefined && error.mensaje1 !== null ) {
        auxError.mensaje1 = error.mensaje1;
        auxError.mensaje2 = error.mensaje2;
        auxError.mensaje3 = error.mensaje3;
      }
      $scope.manageCPContactFunctionality.error = true;
    } );
  };
  $scope.loadMultilanguageNew = function(
    data ) {
    T3_CabeceraPresentacionService.resolveTranslationsCG( 'manageCPContact', gettextCatalog.currentLanguage ).then( function(
      data ) {
      $scope.selectPerson_translation = gettextCatalog.getString( 'manageCPContact-selPersonaContacto' );
      $scope.selectContactMedium_translation = gettextCatalog.getString( 'manageCPContact-selMedioContactoPlain' );
    }, function(
      err ) {} );
  };
  $scope.onLoaded = function() {
    $scope.selected = {
      value: ""
    };
    $scope.manageCPContactView = {
      mediosContacto: [],
      personMediosContacto: [],
      tiposContacto: [],
      listPartyRoles_tipo2: [],
      tmp_listPartyRoles_tipo2: [],
      listPartyRoles_tipo3: []
    };
    $scope.manageCPContactData = {
      listaTemporal_1: [],
      listaTemporal: [],
      medioContacto: [],
      tipoContacto: [],
      notifyPerson: [],
      person: [],
      personMedioContacto: []
    };
    $scope.medioSelectedSecond = {
      value: ""
    };
    $scope.personaSelected = {};
    $scope.cgtManageCPContactIn.personMediumType = {
      "@c": '.ContactInteractionRole_DTO_IN',
      person: [],
      personMedioContacto: []
    };
    $scope.cgtManageCPContactIn.businessInteractionRoles = [];
    $scope.action = $scope.CGT_ManageCPContact_IN.action;
    $scope.manageCPContactFunctionality = {
      error: false
    };
    $scope.firstLoad = true;
    if ( $scope.CGT_ManageCPContact_IN.customerProblem && $scope.CGT_ManageCPContact_IN.customerProblem.id ) {
      $scope.getCPContactInteractionRole( $scope.CGT_ManageCPContact_IN );
    } else $scope.getCPContactInteractionRole( $scope.CGT_ManageCPContact_IN );
  };
  $scope.closeSpinner = function() {
    $scope.spinners.splice( -1, 1 );
    if ( $scope.spinners.length === 0 ) {
      PopupService.CloseSpinner();
      $scope.isOpenSpinner = false;
    }
  };
  $scope.openSpinner = function() {
    $scope.spinners.push( 1 );
    if ( ! ) {
      $scope.isOpenSpinner = true;
      PopupService.getSpinner( $scope );
    }
  };
  $scope.addFila = function(
    index,
    addedByState ) {
    addedByState = addedByState || false;;
    $scope.manageCPContactView.filteredListPartyRoles = [];
    if ( ! ) {
      var _index = index + 1;
      $scope.removeElement_fromLista2( $scope.manageCPContactData.notifyPerson.index );
      $scope.manageCPContactData.tipoContacto._index = '';
      $scope.manageCPContactData.medioContacto._index = '';
      $scope.manageCPContactData.notifyPerson._index = '';
      $scope.manageCPContactData.listaTemporal.push( $scope.contTable );
      if ( ! ) {
        $scope.addNewBusinessInteractionRolesData( $scope.manageCPContactData.notifyPerson, $scope.manageCPContactData.tipoContacto, $scope.manageCPContactData.medioContacto, index );
      }
    } else $scope.manageCPContactData.listaTemporal.push( $scope.contTable );
    if ( $scope.isVisiblePersonContact ) {
      $scope.manageCPContactData.listaTemporal_1.push( $scope.contTable );
    }
    $scope.firstLoad = false;
  };
  $scope.isIn_tmp_listPartyRoles_tipo2 = function(
    id ) {
    return $scope.manageCPContactView.tmp_listPartyRoles_tipo2.indexOf( id ) >= 0
  };
  $scope.getFiltered = function(
    arr,
    isLast ) {
    if ( ! ) {
      return arr
    }
    var _generate = [];
    var i = 0;
    var l = arr.length;
    return _generate
  };
  $scope.removeElement_fromLista2 = function(
    id ) {
    var i = 0;
    var _index = null;
    var l = $scope.manageCPContactView.listPartyRoles_tipo2.length;
    var _tmp = [];
  };
  $scope.findPersonContact_fromBussiness = function() {
    if ( ! ) {
      $scope.cgtManageCPContactInbusinessInteractionRoles = [];
    }
    var i = 0;
    var l = $scope.cgtManageCPContactIn.businessInteractionRoles.length;
    return false
  };
  $scope.clearBusinessInteractionRolesData = function() {
    if ( $scope.cgtManageCPContactIn.businessInteractionRoles && $scope.cgtManageCPContactIn.businessInteractionRoles.length ) {
      var i = 0;
      var _type = null;
      var l = $scope.cgtManageCPContactIn.businessInteractionRoles.length;
      $scope.cgtManageCPContactIn.businessInteractionRoles.length = 0;
      if ( _type !== null ) {
        $scope.cgtManageCPContactIn.businessInteractionRoles.push( _type );
      }
    }
  };
  $scope.addNewBusinessInteractionRolesData = function(
    contact,
    contactMediumType,
    contactMedium,
    index ) {
    $scope.clearBusinessInteractionRolesData();
    var _generate = [];
    var i = 0;
    $scope.lastSearch.businessInteractionRoles = angular.copy( $scope.cgtManageCPContactIn.businessInteractionRoles );
    $scope.putItem();
  };
  $scope.generateContactMedium = function(
    contactMedium,
    contactMediumType ) {
    var obj = {
      contactMediumType: {
        id: contactMediumType
      }
    };
    if ( contactMedium.id !== -1 ) {
      obj.id = contactMedium.id;
    } else
      obj.value = contactMedium.value;
    return obj
  };
  $scope.averiguarIdioma = function(
    currentLanguage ) {
    var arrIdiomas = [ {
      text: 'es_ES',
      id: 1
    }, {
      text: 'ca_CA',
      id: 2
    }, {
      text: 'gl_GL',
      id: 3
    }, {
      text: 'eu_EU',
      id: 4
    }, {
      text: 'va_VA',
      id: 5
    }, {
      text: 'en_EN',
      id: 6
    }, {
      text: 'fr_FR',
      id: 7
    }, {
      text: 'de_DE',
      id: 8
    }, {
      text: 'it_IT',
      id: 9
    } ];
    var languageId = 0;
    return languageId
  };
  $scope.borrarPersona = function() {
    $scope.cgtManageCPContactIn.personMediumType.person[ 0 ] = null;
    $scope.cgtManageCPContactIn.personMediumType.personMedioContacto[ 0 ] = null;
  };
  $scope.cargaMedios = function(
    index,
    type ) {
    var i = 0;
    var arr = $scope.GetCPContactInteractionRole_OUT.cpcontactInteractionRole.businessInteractionRoles;
    var l = arr.length;
    var _person = $scope.manageCPContactData.notifyPerson;
    var _medios = $scope.manageCPContactView.mediosContacto;
    var isPerson = type !== void0 && type === 'person';
    var _tContact = $filter( 'filter' )( $scope.manageCPContactView.tiposContacto.index, {
      id: $scope.manageCPContactData.tipoContacto.index
    } )[ 0 ];
    if ( isPerson ) {
      _person = $scope.cgtManageCPContactIn.personMediumType.person;
      _medios = $scope.manageCPContactView.personMediosContacto;
    }
    _medios.index = [];
    arr = $scope.GetCPContactInteractionRole_OUT.potencialCPContactInteractionRole.businessInteractionRoles;
    l = arr.length;
    i = 0;
    if ( $scope.cgtManageCPContactIn && $scope.cgtManageCPContactIn.businessInteractionRoles.index && $scope.cgtManageCPContactIn.businessInteractionRoles.index.contactMedium && $scope.cgtManageCPContactIn.businessInteractionRoles.index.contactMedium.id ) {
      var value = $filter( 'filter' )( $scope.manageCPContactView.mediosContacto.index, {
        id: $scope.cgtManageCPContactIn.businessInteractionRoles.index.contactMedium.id
      } )[ 0 ];
      $scope.manageCPContactData.medioContacto.index = value;
      $scope.addFila( index, true );
      if ( $scope.cgtManageCPContactIn.businessInteractionRolesindex + 1 ) {
        $scope.drawBusinessInteractionRoles( index + 1 );
      }
    }
  };
  $scope.cargaTipos = function(
    index ) {
    $scope.listContactMediumType( index );
  };
  $scope.desplegar = function() {
    $scope.visible = !;
  };
  $scope.desplegarNotification = function() {
    $scope.visibleNotification = !;
  };
  $scope.isUniquePerson = function(
    o,
    id ) {
    if ( $scope.CGT_ManageCPContact_IN.action === 'C' ) {
      return false
    }
    var i = 0;
    var l = o.length;
    return false
  };
  $scope.generatePersonData = function(
    obj ) {
    var _return = {
      "@c": obj[ "@c" ],
      interactionRoleType: {
        id: obj.interactionRoleType.id
      },
      contactMedium: {
        id: obj.contactMedium.id,
        contactMediumType: {
          id: obj.contactMedium.contactMediumType.id
        }
      },
      partyRole: {
        id: obj.partyRole.id
      },
      contactMediumType: obj.contactMedium.contactMediumType,
      id: obj.partyRole.id,
      name:
    };
    if ( $scope.CGT_ManageCPContact_IN.action === 'C' ) {
      _return.contactMedium.value = obj.contactMedium.value;
    }
    return _return
  };
  $scope.filterDataByInteractionRoleType = function(
    type,
    obj ) {
    var tmp = $filter( 'filter' )( obj, {
      interactionRoleType: {
        id: type
      }
    } );
    var i = 0;
    var l = tmp.length;
  };
  $scope.fillPersonsAfterLoad_getCPContactInteractionRole = function() {
    $scope.manageCPContactView.listPartyRoles_tipo2.length = 0;
    $scope.manageCPContactView.listPartyRoles_tipo3.length = 0;
    if ( $scope.GetCPContactInteractionRole_OUT.cpcontactInteractionRole && $scope.GetCPContactInteractionRole_OUT.cpcontactInteractionRole.businessInteractionRoles ) {
      $scope.filterDataByInteractionRoleType( 2, $scope.GetCPContactInteractionRole_OUT.cpcontactInteractionRole.businessInteractionRoles );
      $scope.filterDataByInteractionRoleType( 3, $scope.GetCPContactInteractionRole_OUT.cpcontactInteractionRole.businessInteractionRoles );
    }
    if ( $scope.GetCPContactInteractionRole_OUT.potencialCPContactInteractionRole && $scope.GetCPContactInteractionRole_OUT.potencialCPContactInteractionRole.businessInteractionRoles && $scope.CGT_ManageCPContact_IN.action !== 'C' ) {
      $scope.filterDataByInteractionRoleType( 2, $scope.GetCPContactInteractionRole_OUT.potencialCPContactInteractionRole.businessInteractionRoles );
      $scope.filterDataByInteractionRoleType( 3, $scope.GetCPContactInteractionRole_OUT.potencialCPContactInteractionRole.businessInteractionRoles );
    }
    $scope.showNotificationANDPersonContact = true;
    $scope.visible = true;
    $scope.addFila( 0 );
  };
  $scope.getCPContactInteractionRole = function(
    DataIn ) {
    $scope.openSpinner();
    var GetCPContactInteractionRole_IN = {};
    if ( DataIn.partyRole ) {
      GetCPContactInteractionRole_IN.partyRole = DataIn.partyRole;
    }
    if ( DataIn.customerProblem ) {
      GetCPContactInteractionRole_IN.customerProblem = DataIn.customerProblem;
    }
    manageCPContactService.getCPContactInteractionRole( GetCPContactInteractionRole_IN ).then( function(
      data ) {
      $scope.closeSpinner();
      $scope.GetCPContactInteractionRole_OUT = data;
      $scope.fillPersonsAfterLoad_getCPContactInteractionRole();
      $scope.setSetPreviousState();
    }, function(
      error ) {
      $scope.closeSpinner();
      T3_TrazaService.setTrazaError( CNT.name, "Se ha detectado un error " + error.code + " en la llamada al servicio getCPContactInteractionRole." );
      var auxError = {};
      if ( error.code === 500 && error.mensaje1 !== undefined && error.mensaje1 !== null ) {
        auxError.mensaje1 = error.mensaje1;
        auxError.mensaje2 = error.mensaje2;
        auxError.mensaje3 = error.mensaje3;
      }
      $scope.manageCPContactFunctionality.error = true;
    } );
  };
  $scope.getTranslate = function(
    arr ) {
    if ( arr === void0 ) {
      return ''
    }
    var i = 0;
    var l = arr.length;
    return ''
  };
  $scope.listContactMediumType = function(
    index ) {
    var ListContactMediumType_IN = {
      showAllLanguages: false,
      showActive: true,
      contactMediumTypeCategory: {
        id: $scope.notificationContactMediumTypeCategory
      }
    };
    $scope.openSpinner();
    manageCPContactService.listContactMediumType( ListContactMediumType_IN ).then( function(
      data ) {
      $scope.closeSpinner();
      $scope.manageCPContactView.tiposContactoindex || 0 = data.contactMediumTypes;
      if ( $scope.cgtManageCPContactIn.businessInteractionRolesindex || 0 && $scope.cgtManageCPContactIn.businessInteractionRolesindex || 0. contactMedium && $scope.cgtManageCPContactIn.businessInteractionRolesindex || 0. contactMedium.contactMediumType && $scope.cgtManageCPContactIn.businessInteractionRolesindex || 0. contactMedium.contactMediumType.id ) {
        $scope.manageCPContactData.tipoContactoindex || 0 = Number( $scope.cgtManageCPContactIn.businessInteractionRolesindex || 0. contactMedium.contactMediumType.id );
        $scope.cargaMedios( index || 0 );
      }
    }, function(
      error ) {
      $scope.closeSpinner();
      T3_TrazaService.setTrazaError( CNT.name, "Se ha detectado un error " + error.code + " en la llamada al servicio listContactMediumType." );
      var auxError = {};
      if ( error.code === 500 && error.mensaje1 !== undefined && error.mensaje1 !== null ) {
        auxError.mensaje1 = error.mensaje1;
        auxError.mensaje2 = error.mensaje2;
        auxError.mensaje3 = error.mensaje3;
      }
      $scope.manageCPContactFunctionality.error = true;
    } );
  };
  $scope.applyDataFromManageCPContact = function() {
    var i = 0;
    var l = $scope.ManageCPContact_OUT.length;
  };
  $scope.modalError = function() {
    var options = {
      size: "sm",
      tipoModal: "error",
      tituloModal: "",
      textoPrincipal: gettextCatalog.getString( 'manageCPContact-principal-error' ),
      textoSecundario: gettextCatalog.getString( 'manageCPContact-secundario-error' ),
      textoPregunta: "",
      textoBtnAceptar: gettextCatalog.getString( 'manageCPContact-btnAceptar' ),
      accionBtnAceptar: "cerrarPopup()",
      textoBtnCancelar: "",
      accionBtnCancelar: ""
    };
    PopupService.getPopupGeneric( $scope, 'manageCPContactPopupController', options );
  };
  $scope.refreshResults = function(
    $select ) {
    var search = $select.searchlist = angular.copy( $select.items ) FLAG = -1;
    list = list.filter( function(
      item ) {
      return item.id !== FLAG
    } );
    if ( ! ) {
      $select.items = list;
    } else var userInputItem = {
      id: FLAG,
      name: search
    };
    $select.items = [
      userInputItem
    ].concat( list );
    $select.selected = userInputItem;
  };
  $scope.refreshResultsMedios = function(
    $select ) {
    var search = $select.searchlist = angular.copy( $select.items ) FLAG = -1;
    list = list.filter( function(
      item ) {
      return item.id !== FLAG
    } );
    if ( ! ) {
      $select.items = list;
    } else var userInputItem = {
      id: FLAG,
      value: search
    };
    $select.items = [
      userInputItem
    ].concat( list );
    $select.selected = userInputItem;
  };
  $scope.refreshResultsPersona = function(
    $select ) {
    var search = $select.searchlist = angular.copy( $select.items ) FLAG = -1;
    list = list.filter( function(
      item ) {
      return item.id !== FLAG
    } );
    if ( ! ) {
      $select.items = list;
    } else var userInputItem = {
      id: FLAG,
      name: search
    };
    $select.items = [
      userInputItem
    ].concat( list );
    $select.selected = userInputItem;
  };
  $scope.removeFila = function(
    row,
    isLast ) {
    if ( isLast ) {
      $scope.manageCPContactData.medioContacto$scope.manageCPContactData.medioContacto.length - 1 = '';
      $scope.manageCPContactData.tipoContacto$scope.manageCPContactData.tipoContacto.length - 1 = '';
      $scope.manageCPContactData.notifyPerson.$scope.manageCPContactData.notifyPerson.length = '';
      return false
    }
    var index = $scope.manageCPContactData.listaTemporal.indexOf( row );
    var _indexOf = $scope.manageCPContactView.tmp_listPartyRoles_tipo2.indexOf( $scope.manageCPContactData.notifyPerson.index );
    if ( _indexOf >= 0 ) {
      $scope.manageCPContactView.tmp_listPartyRoles_tipo2.splice( _indexOf, 1 );
    }
    if ( index === 0 && $scope.manageCPContactData.listaTemporal.length === 1 ) {
      $scope.manageCPContactData.medioContacto.length = 0;
      $scope.manageCPContactData.tipoContacto.length = 0;
      $scope.manageCPContactData.notifyPerson.length = 0;
      $scope.cgtManageCPContactIn.businessInteractionRoles.length = 0;
    } else var estaEnLista = false;
    if ( $scope.cgtManageCPContactIn.businessInteractionRoles.index ) {
      $scope.cgtManageCPContactIn.businessInteractionRoles.splice( index, 1 );
      $scope.lastSearch.businessInteractionRoles = angular.copy( $scope.cgtManageCPContactIn.businessInteractionRoles );
      $scope.putItem();
    }
    $scope.manageCPContactData.medioContacto.splice( index, 1 );
    $scope.manageCPContactData.tipoContacto.splice( index, 1 );
    $scope.manageCPContactData.notifyPerson.splice( index, 1 );
    $scope.manageCPContactData.listaTemporal.splice( index, 1 );
  };
  $scope.isPersonSelected = function(
    value,
    item ) {
    return value && value.id && item && item.id && item.id === value.id
  };
  $scope.regenerateArrayData = function(
    arr,
    type ) {
    var i = 0;
    var l = arr.length;
    var _generate = [];
    var _obj = {};
    return _generate
  };
} ] ).controller( 'manageCPContactPopupController', [ '$scope', '$modalInstance', function(
  $scope,
  $modalInstance ) {
  $scope.cerrarPopup = function() {
    $modalInstance.close();
  };
} ] );