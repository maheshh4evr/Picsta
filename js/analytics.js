var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-xxxxxxxx-x']);
	_gaq.push(['_trackPageview']);

(function() {	
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];  
  s.parentNode.insertBefore(ga, s);
})();

/*
** Google Analytics functions start here
*/
// function to send right/left navigation button clicks
function trackButtonClick(e, actionCategory) {
  console.log('sending event ' + e.target.id + "-" + actionCategory);
  _gaq.push(['_trackEvent', e.target.id, actionCategory]);
};