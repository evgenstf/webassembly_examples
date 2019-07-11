#include "image_cropper/image_cropper.h"

#include <cstdint>

extern "C" {

uint32_t crop_image(uint8_t* source, uint32_t source_length, uint8_t* sink) {
  ImageCropper cropper("png");
  return cropper.crop(source, source_length, sink);
}

}
