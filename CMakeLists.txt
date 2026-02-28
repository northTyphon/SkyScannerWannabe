cmake_minimum_required(VERSION 3.20)
project(myproject)
set(CMAKE_CXX_STANDARD 17)

find_package(Crow CONFIG REQUIRED)
find_package(nlohmann_json CONFIG REQUIRED)
find_package(CURL REQUIRED)

add_executable(main src/main.cpp src/api.cpp src/flights.cpp)
target_link_libraries(main PRIVATE Crow::Crow nlohmann_json::nlohmann_json CURL::libcurl)
