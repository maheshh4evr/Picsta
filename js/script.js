var apiUrl = "https://api.instagram.com/v1/media/popular?client_id=your_client_id&callback=?";
var jsonData = null;
var numberofimages = 18;
var totalitemscount = numberofimages + 1;
var loadeditemscount = 0;

$(document).ready(function(){	
	$.jsonp({
		url : apiUrl,
		timeout : 20000,
		success : function(data){
			handleResponse(data);
		},
		error: function(){
            handleError();
        }
	});
});

function handleResponse(data){
	jsonData = data.data;
	loadeditemscount++;
	$("#loadedpercent").text(Math.ceil((100/totalitemscount) * loadeditemscount) + "%");
	$.each(jsonData, function(i, image){
		if (i == numberofimages) {
			return false;
		};		
		$("<img/>").attr({
			src : image.images.thumbnail.url,
			id : "img" + i,
			class : "ga-thumbnail"
			}).appendTo("#imgspan");

		$("#img"+i).load(function(){			
			loadeditemscount++;
			$("#loadedpercent").text(Math.ceil((100/totalitemscount) * loadeditemscount) + "%");
			if (loadeditemscount >= totalitemscount-2) {				
				$("#progresscontainer").remove();			
				$("#imgspan").css("display","block");
				$(".footer").css("display","block");
			};
		});
		$("#img"+i).error(function(){			
			loadeditemscount++;
			$("#loadedpercent").text(Math.ceil((100/totalitemscount) * loadeditemscount) + "%");
			if (loadeditemscount >= totalitemscount-2) {				
				$("#progresscontainer").remove();			
				$("#imgspan").css("display","block");
				$(".footer").css("display","block");
			};
		});

		$("#img"+i).click(function(e){			
			changeModalImage(i);
			try{
				//sending event for analytics		
				trackButtonClick(e, 'thumbnailclick');
			}catch(ex){
				console.log('Error while sending event for GA:' + ex.message);
			}
		});
	});
}

function changeModalImage(i){	
	var modalHeight = jsonData[i].images.standard_resolution.height;
	$(".modal-body").css({
		"background-image" : "url("+jsonData[i].images.standard_resolution.url+")",	
		"min-height" : modalHeight,
		padding : 0
	});

	$('#imgModal').attr("imgIndex", i);
	$("#imgModal").css("width", jsonData[i].images.standard_resolution.width);
	$("#uploader").text(jsonData[i].user.full_name);
	$("#likes").text(jsonData[i].likes.count);
	$("#comments").text(jsonData[i].comments.count);

	$('#imgModal').modal({
		keyboard: true,
		show: true
	});
}

function scale(original, scaleby){
	return (original * scaleby);
}

function handleError(){
	console.log('Error while contacting instagram');	
	$(".alert").css("display","block");
	$(".alert").alert();
}

$('#btn-alert-refresh').click(function(e) {
	try{
		//sending event for analytics		
		trackButtonClick(e, 'errorReload');
	}catch(ex){
		console.log('Error while sending event for GA:' + ex.message);
	}
    location.reload();
});

$('#btn-refresh').click(function(e) {
	try{
		//sending event for analytics		
		trackButtonClick(e, 'normalReload');
	}catch(ex){
		console.log('Error while sending event for GA:' + ex.message);
	}
    location.reload();
});

$(document).ready(function () {
	if ($("[rel=tooltip]").length) {
		$("[rel=tooltip]").tooltip();
	}
});

/*
** Function to handle right and left arrow keys to switch images
** keycode: 37 - left arrow and 39 - right arrow
*/
$(document).keyup(function(e){
	if($("#imgModal").css("display") != 'none'){		
		if(e.which == 37 || e.which == 39) {
			try{
				//sending event for analytics		
				trackButtonClick(e, 'arrow-key-nav');
			}catch(ex){
				console.log('Error while sending event for GA:' + ex.message);
			}
			var index = Number($("#imgModal").attr("imgIndex"));
			var indexChanged = false;
			if(e.which == 37 && ((index - 1) >= 0)){
				index--;
				indexChanged = true;			
			} else if(e.which == 39 && ((index + 1) < numberofimages)) {
				index++;
				indexChanged = true;			
			}
			if(indexChanged) {			
				changeModalImage(index);				
			}
		}
		e.preventDefault();
	}	
});

/*
** Function to handle and left arrow click
*/
$("#leftarrow").click(function(e){
	try{
		//sending event for analytics		
		trackButtonClick(e, 'left-arrow-nav');
	}catch(ex){
		console.log('Error while sending event for GA:' + ex.message);
	}	
	var index = Number($("#imgModal").attr("imgIndex"));		
	var indexChanged = false;
	if(index > 0){
		changeModalImage(--index);
	}else if (index <= 0) {
		changeModalImage(0);
	};
});

/*
** Function to handle and right arrow click
*/
$("#rightarrow").click(function(e){
	try{
		//sending event for analytics		
		trackButtonClick(e, 'right-arrow-nav');
	}catch(ex){
		console.log('Error while sending event for GA:' + ex.message);
	}
	var index = Number($("#imgModal").attr("imgIndex"));		
	var indexChanged = false;
	if(index < (numberofimages - 1)){
		changeModalImage(++index);
	}else if (index >= (numberofimages - 1)) {
		changeModalImage(numberofimages - 1);
	};
});