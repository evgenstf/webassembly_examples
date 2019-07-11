#include <cstdint>

extern "C" {

uint32_t crop_image(uint8_t* source, uint32_t source_length, uint8_t* sink) {
  for (uint32_t i = 0; i < source_length; ++i) {
    sink[i] = source[i];
  }
  return source_length;
}

}
