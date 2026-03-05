#include "flights.h"
#include <iostream>

crow::response parseFlight(const std::string &rawJson) {
  std::cout << rawJson << '\n';
  json parsed = json::parse(rawJson);

  if (!parsed.contains("data") || parsed["data"].is_null() ||
      !parsed["data"].contains("flightOffers")) {
    auto res = crow::response(500, "No flight data returned");
    res.set_header("Access-Control-Allow-Origin", "*");
    return res;
  }

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
  res.set_header("Access-Control-Allow-Origin", "*");
  return res;
}
