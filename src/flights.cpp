#include "flights.h"

crow::response parseFlight(const std::string &rawJson) {

  json parsed = json::parse(rawJson);
  json flights = json::array();

  for (auto &offer : parsed["data"]["flightOffers"]) {
    json flight;

    flight["airline"] =
        offer["segments"][0]["legs"][0]["carriersData"][0]["name"];
    flight["departure"] = offer["segments"][0]["departureTime"];
    flight["arrival"] = offer["segments"][0]["arrivalTime"];
    flight["price"] = offer["priceBreakdown"]["total"]["units"];
    flights.push_back(flight);
  }

  auto res = crow::response(flights.dump());
  res.set_header("Content-Type", "application/json");
  return res;
}
