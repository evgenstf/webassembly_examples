#include "image_cropper.h"


uint32_t ImageCropper::crop(uint8_t* source, uint32_t source_length, uint8_t* sink) {
  for (uint32_t i = 0; i < source_length; ++i) {
    sink[i] = source[i];
  }
  return source_length;
}
