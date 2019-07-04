#include <fstream>
#include <iostream>
#include <cstdint>

extern "C" {

void rewrite_file() {
  {
    std::ifstream stream("file.txt");
    std::string str;
    stream >> str;
    std::cout << "old file: " << str << '\n';
  }
  {
    std::ofstream stream("file.txt");
    stream << "123";
    std::cout << "file rewritten\n";
  }
  {
    std::ifstream stream("file.txt");
    std::string str;
    stream >> str;
    std::cout << "new file: " << str << '\n';
  }
}

uint8_t* process_bytes(uint8_t* bytes, size_t length) {
  for (size_t i = 0; i < length; ++i) {
    bytes[i] = 'a';
  }
  return bytes;
}

}
