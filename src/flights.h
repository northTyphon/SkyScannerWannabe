#pragma once
#include "api.h"
#include <crow.h>
#include <crow/http_response.h>
#include <curl/curl.h>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

crow::response parseFlight(const std::string &rawJson);
