const url = "https://images-api.nasa.gov/asset/as11-40-5874";
const marsUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=b2xP0r6PT6mo4AV8iWvfYDwucQx9cEossgwg988Z";
const marsGalley = $("#marsGallery");
let counter = 0;
const moreBtn = $("#idMars");
let timesCounter = 1;
const loader = $(".loader");
const mobile = window.matchMedia("screen and (max-width: 440px)");
loader.hide();

$.ajax({
    url: url,
    method: "GET",
 }).done(function (response) {
        let backgroundPhoto = `url(${response.collection.items[0].href})`;

        $("#welcome").css("background-image", backgroundPhoto);
    }).fail(function () {
    console.log(error);
});


$("#intrigued").on("click", function (event){
   $(this).parent().slideUp( "slow", function() {
       $("#welcome").css("display", "none");
       $("#gallery").css("display", "block");
   });
});

mobile.addListener(function (mobile) {
    if (mobile.matches) {
    } else {
        marsGalley.on("click", "img", function (event) {
            let fullscreenPicBox = $("<div>").addClass("fullScreen");
            let closeBtn = $("<button>Go back</button>").addClass("close");
            let fullPic = $("<img>", {src: this.src});
            fullPic.appendTo(fullscreenPicBox);
            closeBtn.prependTo(fullscreenPicBox);
            fullscreenPicBox.appendTo(marsGalley);
            marsGalley.on("click", ".close", function (event) {
                fullscreenPicBox.remove();
            })
        });
    }
});

$.ajax({
    url: marsUrl,
    method: "GET",
    beforeSend: function() {
        loader.show();
    }
}).done(function (response) {
    loader.hide();
    for (let i=0; i<6; i++){
        let photo = response.photos[i].img_src;
        $("<img>", {src: photo}).appendTo(marsGalley).addClass("marsPic");
        counter++;
        console.log(counter);
    }
    timesCounter++;
}).fail(function () {
    console.log(error);
});

moreBtn.on("click", function (event){
    $.ajax({
        url: marsUrl,
        method: "GET",
        beforeSend: function() {
            loader.show();
        }
    }).done(function (response) {
        loader.hide();
        for (let i = counter ; i < timesCounter*6; i++){
            console.log([i]);
            let photo = response.photos[i].img_src;
            $("<img>", {src: photo}).appendTo(marsGalley).addClass("marsPic");
            counter++;
            console.log(counter);
        }
        timesCounter++
    }).fail(function () {
        console.log(error);
    });
});
