$(document).ready(function() {
	var hrefs = [
		'../css/sits.css',
		'../css/sv.css',
		'../plugins/css/ui/sits-ui.css',
		'../UOL/css/uol.css'
	];
	var disabledStyleSheets = hrefs.map(link => 'link[href="' + link + '"]').join(',');
	$(disabledStyleSheets).prop('disabled', true);
});