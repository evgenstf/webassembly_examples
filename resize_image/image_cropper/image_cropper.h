#include <string>

class ImageCropper {
public:
  ImageCropper(std::string extension):
    extension_(std::move(extension)) {}

  uint32_t crop(uint8_t* source, uint32_t source_length, uint8_t* sink);

private:
  const std::string extension_;
};
