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
	
	var id = getUrlVars()["profile_id"];
	//var pendingRequest = document.getElementById('request_id').value;
	//var pair_controls = document.getElementById('pair_controls');
	//console.log("LOAD request: "+pendingRequest+" "+id+" "+request_id);
	profileCheck();
	
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
		var request_id = getUrlVars()["request_id"];
		var pendingRequest = document.getElementById('request_id').value;
		var pair_controls = document.getElementById('pair_controls');
		console.log("request: "+pendingRequest);
		if (pendingRequest == request_id) {
			console.log("visibility: "+pair_controls.style.visibility);
			pair_controls.style.visibility = "visible"
			console.log("new_visibility: "+pair_controls.style.visibility);
		} else {
			console.log("visibility: "+pair_controls.style.visibility);
			pair_controls.style.visibility = "hidden"
			console.log("new_visibility: "+pair_controls.style.visibility);
		}
  	}

	//dogjs.on('add:node', function(newnode) {
	    //console.log("NODE "+newnode.innerHTML);
	//});
	//profileCheck(new_node));
	
}, this, true);


