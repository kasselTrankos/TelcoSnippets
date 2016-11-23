var solApp = angular.module( 'solApp', [ 'ngAnimate', 'ngTouch' ] );
solApp.directive( 'lessResize', function( $window ) {
    return function( scope, element, attr ) {
        var w = angular.element( $window );
        w.on( 'resize', function() {
            if ( typeofless != 'undefined' ) {
                less.refresh();
            }
        } );
    };
} );
solApp.directive( 'onlyNum', function() {
    return function( scope, element, attrs ) {
        var keyCode = [ 8, 9, 37, 39, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110 ];
        element.bind( "keydown", function( event ) {
            if ( $.inArray( event.which, keyCode ) == -1 ) {
                scope.$apply( function() {
                    scope.$eval( attrs.onlyNum );
                    event.preventDefault();
                } );
                event.preventDefault();
            }
        } );
    };
} );
solApp.directive( 'jumpNext', function() {
    return {
        require: 'ngModel',
        scope: {
            nextField: '=next'
        },
        link: function( $scope, element, attrs ) {
            element.bind( "keyup", function( event ) {
                if ( element.val().length > 1 ) {
                    $( '#' + attrs.next ).focus();
                }
            } );
        }
    };
} );
solApp.directive( 'nifnie', [ function( $http ) {
    return {
        require: 'ngModel',
        link: function(
            $scope,
            elm,
            attrs,
            ctrl ) {
            $scope.$watch( attrs.ngModel, function( value ) {
                if ( typeofvalue == 'undefined' ) {
                    return true;
                }
                $DNI = value.toUpperCase();
                $letra = $DNI.charAt( $DNI.length - 1 );
                $n = $DNI.substring( 0, $DNI.length - 1 );
                $_return = true;
                if ( !/^\w+$/.test( $letra ) ) {
                    $_return = false;
                }
                $isNIE = $DNI.substring( 0, 1 );
                if ( !/^\d+$/.test( $isNIE ) ) {
                    $nie = [ "X", "Y", "L", "K", "M", "Z" ];
                    if ( $.inArray( $isNIE, $nie ) != -1 ) {
                        $n = $n.substring( 1, $DNI.length - 1 );
                        if ( $DNI.charAt( 0 ) == "Y" ) {
                            $n = '1' + $n;
                        }
                        if ( $DNI.charAt( 0 ) == "Z" ) {
                            $n = '2' + $n;
                        }
                    } else {
                        $_return = false;
                    }
                }
                if ( !/^\d+$/.test( $n ) ) {
                    $_return = false;
                }
                $t = $n * 1000 / 1000;
                $lts = "TRWAGMYFPDXBNJZSQVHLCKE";
                $l = $lts.charAt( $t % 23 );
                if ( $l != $letra ) {
                    $_return = false;
                }
                ctrl.$error.nifnie = !$_return;
                ctrl.$setValidity( 'nifnie', $_return );
            } );
        }
    };
} ] );
solApp.directive( 'atsBornvalid', [ '$http', function( $http ) {
    return {
        require: 'ngModel',
        link: function(
            $scope,
            elm,
            attrs,
            ctrl ) {
            $scope.$watch( attrs.ngModel, function( value ) {
                if ( typeofvalue == 'undefined' ) {
                    return true;
                }
                $edad = false;
                var _day = $scope.day;
                var _month = $scope.month;
                var _year = $scope.year;
                if ( typeof_day != 'undefined' && typeof_month != 'undefined' && typeof_year != 'undefined' ) {
                    if ( _day.length == 0 || _month.length == 0 || _year.length == 0 ) {
                        $scope.altaall[ 'altaall[born][day]' ].$setValidity( 'atsBornvalid', $edad );
                        $scope.altaall[ 'altaall[born][month]' ].$setValidity( 'atsBornvalid', $edad );
                        $scope.altaall[ 'altaall[born][year]' ].$setValidity( 'atsBornvalid', $edad );
                    }
                }
                if ( /^\d+$/.test( _day ) && /^\d+$/.test( _month ) && /^\d\d\d\d$/.test( _year ) ) {
                    var edad = moment().diff( moment( _month - 1 + '-' + _day + '-' + _year, 'MM-DD-YYYY' ), 'years', true );
                    $edad = edad >= 18;
                    $scope.altaall[ 'altaall[born][day]' ].$setValidity( 'atsBornvalid', $edad );
                    $scope.altaall[ 'altaall[born][month]' ].$setValidity( 'atsBornvalid', $edad );
                    $scope.altaall[ 'altaall[born][year]' ].$setValidity( 'atsBornvalid', $edad );
                }
            } );
        }
    };
} ] );
solApp.directive( 'atsValidedad', [ '$http', function( $http ) {
    return {
        require: 'ngModel',
        link: function(
            $scope,
            elm,
            attrs,
            ctrl ) {
            $scope.$watch( attrs.ngModel, function( value ) {
                $edad = false;
                var _day = $scope.day;
                var _month = $scope.month;
                var _year = $scope.year;
                if ( parseInt( _day ) > 31 || parseInt( _day ) < 1 ) {
                    $scope.badday = true;
                } else {
                    $scope.badday = false;
                }
                if ( parseInt( _month ) > 12 || parseInt( _month ) < 1 ) {
                    $scope.badmonth = true;
                } else {
                    $scope.badmonth = false;
                }
                if ( typeofvalue == 'undefined' ) {
                    return true;
                }
                if ( typeof_day != 'undefined' && typeof_month != 'undefined' && typeof_year != 'undefined' ) {
                    if ( _day.length == 0 || _month.length == 0 || _year.length == 0 ) {
                        $scope.edad[ 'edad[edad][day]' ].$setValidity( 'atsBornvalid', $edad );
                        $scope.edad[ 'edad[edad][month]' ].$setValidity( 'atsBornvalid', $edad );
                        $scope.edad[ 'edad[edad][year]' ].$setValidity( 'atsBornvalid', $edad );
                    }
                }
                if ( /^\d+$/.test( _day ) && /^\d+$/.test( _month ) && /^\d\d\d\d$/.test( _year ) ) {
                    var edad = moment().diff( moment( _month - 1 + '-' + _day + '-' + _year, 'MM-DD-YYYY' ), 'years', true );
                    $edad = edad >= 18;
                    $scope.edad[ 'edad[edad][day]' ].$setValidity( 'atsValidedad', $edad );
                    $scope.edad[ 'edad[edad][month]' ].$setValidity( 'atsValidedad', $edad );
                    $scope.edad[ 'edad[edad][year]' ].$setValidity( 'atsValidedad', $edad );
                }
            } );
        }
    };
} ] );
solApp.directive( 'atsCpprovicia', [ '$http', function( $http ) {
    return {
        require: 'ngModel',
        link: function(
            $scope,
            elm,
            attrs,
            ctrl ) {
            $scope.$watch( attrs.ngModel, function( value ) {
                if ( typeofvalue == 'undefined' || typeof$scope.cp == 'undefined' || typeof$scope.provincia == 'undefined' ) {
                    return true;
                }
                var _cp = $scope.cp.substr( 0, 2 );
                var samecprpovincia = cps[ _cp ] == $scope.provincia;
                $scope.altaall[ 'altaall[cp]' ].$setValidity( 'atsCpprovicia', samecprpovincia );
                $scope.altaall[ 'altaall[provincia]' ].$setValidity( 'atsCpprovicia', samecprpovincia );
            } );
        }
    };
} ] );
solApp.directive( 'atsSamepwd', [ '$http', function( $http ) {
    return {
        require: 'ngModel',
        link: function(
            $scope,
            elm,
            attrs,
            ctrl ) {
            $scope.$watch( attrs.ngModel, function( value ) {
                if ( typeof$scope.altaall[ 'altaall[pwd]' ].$modelValue == 'undefined' || typeof$scope.altaall[ 'altaall[repwd]' ].$modelValue == 'undefined' ) {
                    return true;
                }
                $scope.issamepwd = $scope.altaall[ 'altaall[pwd]' ].$modelValue == $scope.altaall[ 'altaall[repwd]' ].$modelValue;
                $scope.altaall[ 'altaall[pwd]' ].$setValidity( 'atsSamepwd', $scope.issamepwd );
                $scope.altaall[ 'altaall[repwd]' ].$setValidity( 'atsSamepwd', $scope.issamepwd );
            } );
        }
    };
} ] );