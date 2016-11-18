xdescribe('test de manageCPContactDirective', function() {
	var $compile;
	var $scope,
		element, html, directiveTemplate;

	(function() {
		var req = new XMLHttpRequest();
		req.onload = function() {
			if (this.status === 404) {

				var reqMvn = new XMLHttpRequest();
				reqMvn.onload = function() {
					directiveTemplate = this.responseText;
				};
				reqMvn.open("get", "../manageCPContact_view.html", false);
				reqMvn.send();

			} else {
				directiveTemplate = this.responseText;
			}
		};
		req.open("get", "src/manageCPContact_view.html", false);
		req.send();
	})();

	beforeEach(module(CNT.name));

	beforeEach(inject(function(_$compile_, _$rootScope_, $templateCache, _$httpBackend_){
		$compile = _$compile_;
		$scope = _$rootScope_.$new();
		_$httpBackend_.whenGET(T3_COMUN_APP.REST_TIMEOUT.ORIGIN + '/services/TimeoutResource/getTimeout').respond(200,'2000');
		_$httpBackend_.whenGET(/^cgt\/manageCPContact\/lang\/manageCPContact_\.*/).respond(200,{});
		$templateCache.put("cgt/manageCPContact/manageCPContact_view.html", directiveTemplate);

		element = $compile("<div managecpcontact></div>")($scope);
		$scope.$digest();
		html = element.html();
	}));

	it('should have a controller in it', function() {
		expect(html.search('data-ng-controller="manageCPContactController"') >= 0).toBe(true);
	});

	it('should have a call to init method', function() {
		expect(html.search('data-ng-init="init()') >= 0).toBe(true);
	});
});