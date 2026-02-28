#pragma once
#include <string>

std::string makeGetRequest(const std::string &url);
size_t writeCallback(char *ptr, size_t size, size_t nmemb, std::string *data);
