solApp.controller( 'wrapperCtrl', [ '$scope', '$element', function( $scope, $element ) {} ] );
solApp.controller( 'formLoginCtrl', [ '$scope', '$element', function( $scope, $element ) {
    $scope.gotCamera = typeofwindow.orientation !== 'undefined';
    $scope.regEmail = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/;
    $scope.regPwd = /(\w*(\d+[a-zA-Z]|[a-zA-Z]+\d)\w*)+/;
    $( '#login_fileFolder' ).change( function() {
        var fullPath = this.value;
        if ( fullPath ) {
            var startIndex = fullPath.indexOf( '\\' ) >= 0 ? fullPath.lastIndexOf( '\\' ) : fullPath.lastIndexOf( '/' );
            var filename = fullPath.substring( startIndex );
            if ( filename.indexOf( '\\' ) === 0 || filename.indexOf( '/' ) === 0 ) {
                filename = filename.substring( 1 );
            }
            $( '.folder label[for=login_fileFolder]' ).html( filename );
        }
    } );
} ] );
solApp.controller( 'solicitudAltaCtrl', [ '$scope', '$element', function( $scope, $element ) {
    $scope.regDay = /\d\d/;
    $scope.regMonth = /\d\d/;
    $scope.regYear = /\d\d\d\d/;
    $scope.regTlf = /[67]{1}[0-9]{8}/;
    $scope.regTwitter = /@([A-Za-z0-9_]{1,100})/;
    $scope.regCP = /\d\d\d\d\d/;
    $scope.regEmail = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/;
    $scope.regPwd = /(\w*(\d+[a-zA-Z]|[a-zA-Z]+\d)\w*)+/;
    $( $element ).find( 'select#altaall_born_day option:eq(0)' ).text( 'DD' );
    $( $element ).find( 'select#altaall_born_month option:eq(0)' ).text( 'MM' );
    $( $element ).find( 'select#altaall_born_month option:eq(1)' ).text( "Ene" );
    $( $element ).find( 'select#altaall_born_month option:eq(4)' ).text( "Abr" );
    $( $element ).find( 'select#altaall_born_month option:eq(8)' ).text( "Ago" );
    $( $element ).find( 'select#altaall_born_month option:eq(12)' ).text( "Dic" );
    $( $element ).find( 'select#altaall_born_year option:eq(0)' ).text( 'AAAA' );
    $( $element ).find( 'select#altaall_tipoVia option:eq(0)' ).text( '*Tipo de Vía' );
    $( $element ).find( 'select#altaall_provincia option:eq(0)' ).text( '*Provincia' );
    $scope.name = typeof_solicitud_data_name == "undefined" ? "" : _solicitud_data_name;
    $scope.appel = typeof_solicitud_data_appel1 == "undefined" ? "" : _solicitud_data_appel1;
    $scope.sex = typeof_solicitud_data_sex == "undefined" ? "" : _solicitud_data_sex;
    $scope.dni = typeof_solicitud_data_dni == "undefined" ? "" : _solicitud_data_dni;
    var now = moment();
    $scope.day = typeof_solicitud_data_day == "undefined" ? "" : parseInt( _solicitud_data_day );
    $scope.month = typeof_solicitud_data_month == "undefined" ? "" : parseInt( _solicitud_data_month );
    $scope.year = typeof_solicitud_data_year == "undefined" ? "" : _solicitud_data_year;
    $scope.month = $scope.year == '2015' ? '' : $scope.month;
    $scope.day = $scope.year == '2015' ? '' : $scope.day;
    $scope.year = $scope.year == '2015' ? '' : $scope.year;
    $scope.tlf = typeof_solicitud_data_tlf == "undefined" ? "" : _solicitud_data_tlf;
    $scope.twitter = typeof_solicitud_data_twitter == "undefined" ? "" : _solicitud_data_twitter;
    $scope.tipoVia = typeof_solicitud_data_tipoVia == "undefined" ? "" : _solicitud_data_tipoVia;
    $scope.nameVia = typeof_solicitud_data_nameVia == "undefined" ? "" : _solicitud_data_nameVia;
    $scope.numVia = typeof_solicitud_data_numVia == "undefined" ? "" : _solicitud_data_numVia;
    $scope.dir = typeof_solicitud_data_dir == "undefined" ? "" : _solicitud_data_dir;
    $scope.provincia = typeof_solicitud_data_provincia == "undefined" ? "" : _solicitud_data_provincia;
    $scope.localidad = typeof_solicitud_data_localidad == "undefined" ? "" : _solicitud_data_localidad;
    $scope.cp = typeof_solicitud_data_cp == "undefined" ? "" : _solicitud_data_cp;
    $scope.pwd = typeof_solicitud_data_pwd == "undefined" ? "" : _solicitud_data_pwd;
    $scope.email = typeof_solicitud_data_email == "undefined" ? "" : _solicitud_data_email;
    $scope.$watch( 'altaall', function( theForm ) {
        if ( typeof_solicitud_err_name != 'undefined' ) {
            $scope.altaall[ 'altaall[name]' ].$setTouched();
            $scope.altaall[ 'altaall[name]' ].$setDirty();
        }
        if ( typeof_solicitud_err_appel1 != 'undefined' ) {
            $scope.altaall[ 'altaall[appel1]' ].$setTouched();
            $scope.altaall[ 'altaall[appel1]' ].$setDirty();
        }
        if ( typeof_solicitud_err_sex != 'undefined' ) {
            $scope.altaall[ 'altaall[sex]' ].$setTouched();
            $scope.altaall[ 'altaall[sex]' ].$setDirty();
        }
        if ( typeof_solicitud_err_dni != 'undefined' ) {
            $scope.altaall[ 'altaall[dni]' ].$setTouched();
            $scope.altaall[ 'altaall[dni]' ].$setDirty();
        }
        if ( typeof_solicitud_err_born != 'undefined' ) {
            $scope.altaall[ 'altaall[born][day]' ].$setTouched();
            $scope.altaall[ 'altaall[born][month]' ].$setTouched();
            $scope.altaall[ 'altaall[born][year]' ].$setTouched();
            $scope.altaall[ 'altaall[born][day]' ].$setDirty();
            $scope.altaall[ 'altaall[born][month]' ].$setDirty();
            $scope.altaall[ 'altaall[born][year]' ].$setDirty();
        }
        if ( typeof_solicitud_err_tlf != 'undefined' ) {
            $scope.altaall[ 'altaall[tlf]' ].$setTouched();
            $scope.altaall[ 'altaall[tlf]' ].$setDirty();
        }
        if ( typeof_solicitud_err_twitter != 'undefined' ) {
            $scope.altaall[ 'altaall[twitter]' ].$setTouched();
            $scope.altaall[ 'altaall[twitter]' ].$setDirty();
        }
        if ( typeof_solicitud_err_tipoVia != 'undefined' ) {
            $scope.altaall[ 'altaall[tipoVia]' ].$setTouched();
            $scope.altaall[ 'altaall[tipoVia]' ].$setDirty();
        }
        if ( typeof_solicitud_err_nameVia != 'undefined' ) {
            $scope.altaall[ 'altaall[nameVia]' ].$setTouched();
            $scope.altaall[ 'altaall[nameVia]' ].$setDirty();
        }
        if ( typeof_solicitud_err_numVia != 'undefined' ) {
            $scope.altaall[ 'altaall[numVia]' ].$setTouched();
            $scope.altaall[ 'altaall[numVia]' ].$setDirty();
        }
        if ( typeof_solicitud_err_localidad != 'undefined' ) {
            $scope.altaall[ 'altaall[localidad]' ].$setTouched();
            $scope.altaall[ 'altaall[localidad]' ].$setDirty();
        }
        if ( typeof_solicitud_err_accept != 'undefined' ) {
            $scope.altaall[ 'altaall[accept]' ].$setTouched();
            $scope.altaall[ 'altaall[accept]' ].$setDirty();
        }
        if ( typeof_solicitud_err_accept_recibir != 'undefined' ) {
            $scope.altaall[ 'altaall[accept_recibir]' ].$setTouched();
            $scope.altaall[ 'altaall[accept_recibir]' ].$setDirty();
        }
        if ( typeof_solicitud_err_cp != 'undefined' || typeof_solicitud_err_provincia != 'undefined' ) {
            $scope.altaall[ 'altaall[provincia]' ].$setTouched();
            $scope.altaall[ 'altaall[provincia]' ].$setDirty();
            $scope.altaall[ 'altaall[cp]' ].$setTouched();
            $scope.altaall[ 'altaall[cp]' ].$setDirty();
        }
        if ( typeof_solicitud_err_email != 'undefined' ) {
            $scope.altaall[ 'altaall[email]' ].$setTouched();
            $scope.altaall[ 'altaall[email]' ].$setDirty();
        }
        if ( typeof_solicitud_err_pwd != 'undefined' ) {
            $scope.altaall[ 'altaall[pwd]' ].$setTouched();
            $scope.altaall[ 'altaall[pwd]' ].$setDirty();
        }
    } );
    $scope.save = function() {
        alert( 2 );
    };
    $( '#altaall_fileFolder' ).change( function() {
        var fullPath = this.value;
        if ( fullPath ) {
            var startIndex = fullPath.indexOf( '\\' ) >= 0 ? fullPath.lastIndexOf( '\\' ) : fullPath.lastIndexOf( '/' );
            var filename = fullPath.substring( startIndex );
            if ( filename.indexOf( '\\' ) === 0 || filename.indexOf( '/' ) === 0 ) {
                filename = filename.substring( 1 );
            }
            $( '.folder label[for=altaall_fileFolder]' ).html( filename );
        }
    } );
} ] );

function fillData() {
    var random = Math.floor( Math.random() * 9999999 + 1 );
    var random2 = Math.floor( Math.random() * 99999999 + 1 );
    var year = Math.floor( Math.random() * 70 + 1925 );
    $( '#altaall_name' ).val( 'XXX Yeyeyeye  ' + random ).change();
    $( '#altaall_appel1' ).val( 'Kekek ko kalal' + random ).change();
    $( '#altaall_email' ).val( 'emilioguanta' + random + 'ewrewrew@hooooootmail.com' ).change();
    $( '#altaall_pwd' ).val( 'Sksdjk32j3' ).change();
    $( '#altaall_tlf' ).val( '6' + random2 ).change();
    $( '#altaall_cp' ).val( '28021' ).change();
    $( '#altaall_born_day' ).val( '1' ).change();
    $( '#altaall_born_month' ).val( '5' ).change();
    $( '#altaall_born_year' ).val( year ).change();
    $( '#altaall_accept_recibir' ).prop( 'checked', true ).change();
    $( '#altaall_accept' ).prop( 'checked', true ).change();
    $( '#altaall_sex_0' ).prop( 'checked', true ).change();
    angular.element( $( '#login-alta-stuff' )[ 0 ] ).scope().showPack = true;
    angular.element( $( '#login-alta-stuff' )[ 0 ] ).scope().loginORalta = 'alta';
    angular.element( $( '#login-alta-stuff' )[ 0 ] ).scope().$apply();
}