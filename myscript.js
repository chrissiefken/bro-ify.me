//js
$("p,strong,h1,h2,h3").each(function(){
	if($(this).text){
	var pre_bro_string = $(this).text();
	var bro_random = Math.floor((Math.random()*3)+1);
	if(bro_random == 1){
		var bro_string = 'Bro, ' + pre_bro_string;
	} else if(bro_random == 2) {
		var bro_string = pre_bro_string + ', bro';
	} else {
		var bro_string = pre_bro_string;
	}
	//test
	$(this).text(bro_string);
	}
});

$("img").each(function(){
    var img_src = $(this).attr("src");
    var img_width = $(this).width();
    var img_height = $(this).height();
    var img_top = $(this).offset().top;
    var img_left = $(this).offset().left;
    var img_bottom = img_top + img_height;
    var img_right = img_left + img_width;
    var img_center_x = img_left + (img_width / 2);
    var img_center_y = img_top + (img_height / 2);
    if(img_src.toLowerCase().indexOf("person") >= 0){
        var params = {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes": "emotion"
        };
        $.ajax({
            url: "https://westus.api.cognitive.microsoft.com/face/v1.0/detect",
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","YOUR_SUBSCRIPTION_KEY");
            },
            type: "POST",
            data: '{"url": "' + img_src + '"}',
            processData: false
        })
        .done(function(data) {
            if(data.length > 0){
                var face_rect = data[0].faceRectangle;
                var face_emotion = getDominantEmotion(data[0].faceAttributes.emotion);
                var bro_speech_bubble = $("<div class='bro-speech-bubble'>" + face_emotion + " Bro!</div>");
                bro_speech_bubble.css({
                    "position": "absolute",
                    "top": img_top + face_rect.top - 50,
                    "left": img_left + face_rect.left - 25,
                    "background-color": "white",
                    "border": "2px solid black",
                    "padding": "10px",
                    "font-size": "24px",
                    "font-weight": "bold",
                    "border-radius": "10px"
                });
                $("body").append(bro_speech_bubble);
            }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " " + errorThrown);
        });
    }
});

function getDominantEmotion(emotion){
    var max_value = 0;
    var max_emotion = "";
    for(var e in emotion){
        if(emotion[e] > max_value){
            max_value = emotion[e];
            max_emotion = e;
        }
    }
    return max_emotion.charAt(0).toUpperCase() + max_emotion.slice(1);
}