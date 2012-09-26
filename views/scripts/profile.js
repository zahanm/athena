dogjs.configure({
  templates: '/templates-profile.html'
});

dogjs.on('pageload', function () {

	function getUrlVars() {
	    var vars = {};
	    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	        vars[key] = value;
	    });
	    return vars;
	}
	
	var id = getUrlVars()["id"];
	
}, this, true);
