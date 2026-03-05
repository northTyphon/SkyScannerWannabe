# BLAZE

A Skyscanner-like flight search application built with C++ and React.

## Stack

- **Backend:** C++ with CrowCPP, libcurl, nlohmann/json
- **Frontend:** React, Vite, Tailwind CSS
- **API:** Booking.com via RapidAPI

## Setup

### Backend

1. Install vcpkg and run `vcpkg install`
2. Set your API key:

```bash
export BOOKING_API_KEY="your_key_here"
```

3. Build and run:

```bash
cmake -B build -S . -DCMAKE_TOOLCHAIN_FILE=$VCKPG_ROOT/scripts/buildsystems/vcpkg.cmake
cmake --build build
./build/main
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Features

- Search flights by origin, destination, passengers and stops
- Results show airline, departure/arrival times and price
