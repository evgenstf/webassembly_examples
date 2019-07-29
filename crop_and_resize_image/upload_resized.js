const url = 'process.php'
const form = document.querySelector('form')

function uploadResizedFile(file) {
  var fr = new FileReader();
  fr.onload = function () {
    console.time("image resize time");
    var rawImage = new Uint8Array(fr.result);

    console.log("rawImage: ", rawImage)

    resizeImageFunction = Module.cwrap('resizeJpeg', 'number', ['number', 'number', 'number', 'number', 'number', 'number']);

    function arrayToPtr(array) {
      console.log("allocate bytes:", array.length);
      var ptr = Module._malloc(array.length)
      Module.HEAP8.set(array, ptr)
      return ptr
    }

    function ptrToArray(ptr, length) {
      var array = new Int8Array(length)
      var pos = ptr
      array.set(Module.HEAP8.subarray(pos, pos + length))
      return array
    }

    var resizedImagePtr = Module._malloc(rawImage.length)
    var resizedImageLength = resizeImageFunction(
      arrayToPtr(rawImage),
      rawImage.length,
      resizedImagePtr,
      /*width =*/ 1024,
      /*height =*/ 1024,
      /*quality =*/ 1
    )

    var resizedImage = ptrToArray(resizedImagePtr, resizedImageLength)
    console.log("resizedImage", resizedImage)
    console.timeEnd("image resize time");


    console.log("image filename: ", file.name)
    $.ajax({
      type: "POST",
      url: 'process.php',
      data : {
        data: resizedImage,
        filename: "resized_" + file.name
      },
      success: function(data) {
        console.log("file uploaded: ", file.name);
      }
    });
  };
  fr.readAsArrayBuffer(file);
}


document.getElementById("submit_resized").addEventListener(
  'submit',
  e => {
    e.preventDefault();

    const files = document.getElementById("submit_resized").querySelector('[type=file]').files;
    const formData = new FormData();


    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      uploadResizedFile(file);

      console.log("uplaod file: ", file);
    }
  }
)
