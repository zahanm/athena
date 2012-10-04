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
	
	// reroute if account exists
	function profileCheck() {	
		var profileIsCurrent = document.getElementById('auth-profile');
		var auth = profileIsCurrent.value;
		if (auth == 'false') {
	  		var els = document.querySelectorAll('.edit-icon');
      		for(i=0;i<els.length;i++){
		   		els[i].style.display = 'none';
		   	}
	 	} else {
			var els = document.querySelectorAll('.person-label');
      		for(i=0;i<els.length;i++){
		   		$(els[i]).text('My');
		   	}
		}
		// check for request
		var pendingRequest = document.getElementById('request_id').value;
		if (pendingRequest != "false") {
			var pair_controls = document.getElementById('pair_controls');
			pair_controls.style.visibility = "visible"
		}
  	}

	dogjs.on('add:node', profileCheck);
	
}, this, true);


