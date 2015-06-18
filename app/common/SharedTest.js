/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function(){

	var hoge = {
		hoe: 'this is test',
		test: function(){
			console.log('shared test');
		}
	};
	
	if (module && module.exports) {
		module.exports = hoge;
	} else {
		
		window.hoge = hoge;
	}
})();
