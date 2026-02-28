#include "api.h"
#include "flights.h"
#include <curl/curl.h>

size_t writeCallback(char *ptr, size_t size, size_t nmemb, std::string *data) {
  data->append(ptr, size * nmemb);
  return size * nmemb;
}

std::string makeGetRequest(const std::string &url) {
  CURL *curl = curl_easy_init();
  std::string response;

  const char *apiKey = std::getenv("BOOKING_API_KEY");
  struct curl_slist *headers = NULL;

  headers = curl_slist_append(
      headers, ("X-RapidAPI-Key: " + std::string(apiKey)).c_str());
  headers = curl_slist_append(headers,
                              "X-RapidAPI-Host: booking-com15.p.rapidapi.com");

  curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "GET");
  curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
  curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
  curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, writeCallback);
  curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response);

  curl_easy_perform(curl);

  curl_slist_free_all(headers);
  curl_easy_cleanup(curl);

  return response;
}
