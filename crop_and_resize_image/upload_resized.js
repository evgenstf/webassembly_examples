const url = 'process.php'
const form = document.querySelector('form')

function uploadResizedFile(file) {
  var fr = new FileReader();
  fr.onload = function () {
    var rawImage = new Uint8Array(fr.result);

    console.log("rawImage length: ", rawImage.length)

    resizeImageFunction = Module.cwrap('resize_image', 'number', ['number', 'number', 'number']);

    function arrayToPtr(array) {
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
    var resizedImageLength = resizeImageFunction(arrayToPtr(rawImage), rawImage.length, resizedImagePtr)

    var resizedImage = ptrToArray(resizedImagePtr, resizedImageLength)
    console.log("resizedImage", resizedImage)


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
    console.log("asdfasdf")
    e.preventDefault()

    const files = document.getElementById("submit_resized").querySelector('[type=file]').files
    const formData = new FormData()


    for (let i = 0; i < files.length; i++) {
      let file = files[i]
      uploadResizedFile(file)

      console.log("uplaod file: ", file)
    }
  }
)
