#include <cstdint>

extern "C" {

uint8_t* process_bytes(uint8_t* bytes, uint32_t length) {
  for (uint32_t i = 0; i < length; ++i) {
    bytes[i] = 'a';
  }
  return bytes;
}

}
