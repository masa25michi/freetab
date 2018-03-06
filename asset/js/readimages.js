var image;
var imgData;
var elephant = document.getElementById("own_images");
// var elephant = document.getElementById("body");

// Take action when the image has loaded
$("#own_images").on('load', function() {

    var imgCanvas = document.createElement("canvas"),
        imgContext = imgCanvas.getContext("2d");

    // Make sure canvas is as big as the picture
    // imgCanvas.width = window.innerWidth;
    // imgCanvas.height = window.innerHeight;
    imgCanvas.width = 1280;
    imgCanvas.height = 800;
    // console.log(elephant.width);
    // console.log(elephant.height);

    // Draw image into canvas element
    imgContext.drawImage(elephant, 0, 0, elephant.width, elephant.height);

    // Get canvas contents as a data URL
    var imgAsDataURL = imgCanvas.toDataURL("image/png");

    // Save image into localStorage
    try {
        localStorage.setItem("elephant", imgAsDataURL);
        changebackground(imgAsDataURL);
    }
    catch (e) {
        console.log("Storage failed: " + e);
    }
}
);

function inputimage(e){

  var preview = document.getElementById('own_images');
  var preview_dummy = document.getElementById('own_images_dummy');
  var file    = document.querySelector('input[type=file]').files[0];

  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
    preview_dummy.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
  $('#own_images_dummy').height(120);
  $('#own_images_dummy').width(120);

  // image = document.getElementById('own_images');
  // imgData = getBase64Image(image);
  // localStorage.setItem("imgData", imgData);

  // toggled2 for give feedback to users whether uploaded successfully or not
  setTimeout(function(){
    $("#wrapper").toggleClass("toggled2");
    $(".sidebar-menu").toggleClass("toggled2");
  },1000);
  $("#wrapper").toggleClass("toggled2");
  $(".sidebar-menu").toggleClass("toggled2");

}
