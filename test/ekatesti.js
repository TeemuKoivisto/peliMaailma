describe("I shall live", function() {

  beforeEach(module('PeliApp'));
  /*
  beforeEach(inject(function($injector) {
	  ShakkiEngine = $injector.get('ShakkiEngine');
  }));*/
	
	describe('testeja', function() {
		it('should just pass', function() {
			expect(true).toBe(true);
		});
		
		it('should just pass', function() {
			expect("hite").toBe("blue");
		});
	})
})