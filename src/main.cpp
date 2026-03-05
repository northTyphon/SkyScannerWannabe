#include "api.h"
#include "flights.h"
#include <crow.h>
#include <crow/middlewares/cors.h>

int main() {
  crow::App<crow::CORSHandler> app;

  CROW_ROUTE(app, "/flights")([](const crow::request &req) -> crow::response {
    const char *from_param = req.url_params.get("from");
    const char *to_param = req.url_params.get("to");
    const char *date_param = req.url_params.get("departDate");
    const char *adults_param = req.url_params.get("adults");
    const char *children_param = req.url_params.get("children");
    const char *stops_param = req.url_params.get("stops");

    if (!from_param || !to_param || !date_param || !adults_param) {
      return crow::response(
          400, "All required fields must be filled: From, To, Date, Adults");
    }

    std::string from = std::string(from_param);
    std::string to = std::string(to_param);
    std::string date = std::string(date_param);
    std::string adults = std::string(adults_param);
    std::string children = (children_param && strlen(children_param) > 0)
                               ? std::string(children_param)
                               : "0";
    std::string stops = stops_param ? std::string(stops_param) : "none";

    std::string url =
        "https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights?"
        "fromId=" +
        from + "&toId=" + to + "&departDate=" + date + "&stops=" + stops +
        "&pageNo=1&adults=" + adults + "&children=" + children +
        "&sort=BEST&cabinClass=ECONOMY&currency_code=USD";
    std::string result = makeGetRequest(url);
    return parseFlight(result);
  });

  auto &cors = app.get_middleware<crow::CORSHandler>();
  cors.global().origin("http://localhost:5173");
  app.port(18080).multithreaded().run();
}
