describe('ngJsTree', function() {

    var scope,element;

    /*
    beforeEach(inject(function($rootScope,$compile,$q,$httpBackend,$templateCache,$timeout) {
        scope = $rootScope.$new();
        compile = $compile;
        q = $q;
        httpBackend = $httpBackend;
        timeout = $timeout;
    }));
    */

    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();

        element = '<svg-circle size="{{size}}" stroke="black" fill="blue"></svg-circle>';

        scope.size = 100;

        element = $compile(element)(scope);
        scope.$digest();
    }));

    it('should use minDuration correctly.', function() {
        expect(3).toBe(3);
    });

    /*
    it('assigning stuff to this', function() {
        Given(function() { this.number = 24; });
        Given(function() { this.number++; });
        When(function() { this.number *= 2; });
        Then(function() { return this.number === 50; });
        // or
        Then(function() { expect(this.number).toBe(50) });
    });
    */
} );