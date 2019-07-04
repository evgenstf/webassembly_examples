const url = 'process.php'
const form = document.querySelector('form')

function uploadFile(file) {
  var fr = new FileReader();
  fr.onload = function () {
    var data = new Uint8Array(fr.result);

    console.log("data: ", data)

    copyArray = Module.cwrap('process_bytes', null, ['number', 'number']);

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

    var processedArray = ptrToArray(copyArray(arrayToPtr(data), data.length), data.length)
    console.log("processedArray", processedArray)


    console.log("filename: ", file.name)
    $.ajax({
      type: "POST",
      url: 'process.php',
      data : {
        data: processedArray,
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
