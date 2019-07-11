const url = 'process.php'
const form = document.querySelector('form')

function uploadFile(file) {
  var fr = new FileReader();
  fr.onload = function () {
    var rawImage = new Uint8Array(fr.result);

    console.log("rawImage length: ", rawImage.length)

    cropImageFunction = Module.cwrap('crop_image', 'number', ['number', 'number', 'number']);

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

    var croppedImagePtr = Module._malloc(rawImage.length)
    var croppedImageLength = cropImageFunction(arrayToPtr(rawImage), rawImage.length, croppedImagePtr)

    var croppedImage = ptrToArray(croppedImagePtr, croppedImageLength)
    console.log("croppedImage", croppedImage)


    console.log("image filename: ", file.name)
    $.ajax({
      type: "POST",
      url: 'process.php',
      data : {
        data: croppedImage,
        filename: file.name
      },
      success: function(data) {
        console.log("file uploaded: ", file.name);
      }
    });
  };
  fr.readAsArrayBuffer(file);
}


form.addEventListener(
  'submit',
  e => {
    e.preventDefault()

    const files = document.querySelector('[type=file]').files
    const formData = new FormData()


    for (let i = 0; i < files.length; i++) {
      let file = files[i]
      uploadFile(file)

      console.log("uplaod file: ", file)
    }
  }
)
