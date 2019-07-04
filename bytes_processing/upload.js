const url = 'process.php'
const form = document.querySelector('form')

var saveByteArray = (function () {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  return function (data, name) {
    var blob = new Blob(data, {type: "octet/stream"}),
      url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
  };
}());



function useFileInput(files) {
  if (files.length == 0)
    return;
  var file = files[0];

  var fr = new FileReader();
  fr.onload = function () {
    var data = new Uint8Array(fr.result);

    console.log("array: ", data)

    // Module['FS_createDataFile']('/', 'file.txt', data, true, true, true);

    copyArray = Module.cwrap('process_bytes', null, ['number', 'number']);

    // Takes an Int32Array, copies it to the heap and returns a pointer
    function arrayToPtr(array) {
      var ptr = Module._malloc(array.length)
      Module.HEAP8.set(array, ptr)
      return ptr
    }

    // Takes a pointer and  array length, and returns a Int32Array from the heap
    function ptrToArray(ptr, length) {
      var array = new Int8Array(length)
      var pos = ptr
      array.set(Module.HEAP8.subarray(pos, pos + length))
      return array
    }

    return ptrToArray(copyArray(arrayToPtr(data), data.length), data.length)
    //Module.ccall('process_bytes', null, [], null);

    // fileInput.value = '';
  };
  var result_data = fr.readAsArrayBuffer(file);
  console.log("result_data: ", result_data)
}


form.addEventListener(
  'submit',
  e => {
    e.preventDefault()

    const files = document.querySelector('[type=file]').files
    const formData = new FormData()

    useFileInput(files)

    for (let i = 0; i < files.length; i++) {
      let file = files[i]

      formData.append('files[]', file)
      console.log("uplaod file: ", file)
    }

    fetch(
      url,
      {
        method: 'POST',
        body: formData,
      }
      ).then(
        response => {
          console.log(response)
        }
        )
  }
  )
