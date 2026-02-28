#include "api.h"
#include "flights.h"
#include <crow.h>
#include <curl/curl.h>
#include <curl/easy.h>
#include <curl/multi.h>
#include <nlohmann/json.hpp>
#include <string>

using json = nlohmann::json;

int main() {
  crow::SimpleApp app;

  CROW_ROUTE(app, "/flights")([](const crow::request &req) -> crow::response {
    const char *from_param = req.url_params.get("from");
    const char *to_param = req.url_params.get("to");
    const char *date_param = req.url_params.get("date");
    const char *adults_param = req.url_params.get("adults");
    const char *children_param = req.url_params.get("children");
    const char *stops_param = req.url_params.get("stops");
    const char *sort_param = req.url_params.get("sort");
    const char *class_param = req.url_params.get("cabinClass");

    if (!from_param || !to_param || !date_param || !adults_param) {
      return crow::response(
          400, "All required fields must be filled: From, To, Date, Adults");
    }

    std::string from = std::string(from_param);
    std::string to = std::string(to_param);
    std::string date = std::string(date_param);
    std::string adults = std::string(adults_param);
    std::string children = children_param ? std::string(children_param) : "0";
    std::string stops = stops_param ? std::string(stops_param) : "none";
    std::string sort = sort_param ? std::string(sort_param) : "BEST";
    std::string classParam = class_param ? std::string(class_param) : "ECONOMY";

    std::string url =
        "https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights?"
        "fromId=" +
        from + "&toId=" + to + "&departDate=" + date + "&stops=" + stops +
        "&pageNo=1&adults=" + adults + "&children=" + children +
        "&sort=" + sort + "&cabinClass=" + classParam + "&currency_code=USD";
    std::string result = makeGetRequest(url);
    return parseFlight(result);
  });

  app.port(18080).multithreaded().run();
}
