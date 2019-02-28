# Towels Included - Bookings Module

> This is a bookings module for towels included project. This is one of the four modules.

## Related Projects

  - [Photos module] https://github.com/hrsf-111-sdc-towels-included/photos-module
  - [Booking module]*(you are here) https://github.com/hrsf-111-sdc-towels-included/booking-module
  - [Amenities module] https://github.com/hrsf-111-sdc-towels-included/amenities-module-master
  - [Reviews module] https://github.com/hrsf-111-sdc-towels-included/reviews-module

## Table of Contents

1. [CRUD operations](#CRUD)
2. [Requirements](#requirements)
3. [Development](#development)

## CRUD

> Create
- (/api/booking/:home_id) - reserves a home
- Parameters : user_id (integer), check_in (date), check_out (date), price_per_night (integer), no_guests (integer)
- Response : status 201 (Created)
- Response Data : created home_id (integer)

> Read
- (/api/booking/:home_id) - receives room reservations for a specific home
- Parameters : none
- Response : status 200 (OK)
- Response Data : array of all bookings related to the home

> Update
- (/api/booking/:booking_id) - updates a reservation
- Parameters : user_id (integer), check_in (date), check_out (date), price_per_night (integer), no_guests (integer)
- Response : status 200 (OK)
- Response Data : n/a

> Delete
- (/api/booking/:booking_id) - removes a reservation
- Parameters : none
- Response : status 200 (OK)
- Response Data : n/a

## Requirements

- Node

## Development

```sh
npm run seed
npm run dev:react
npm run dev:server
```

### Installing Dependencies

From within the root directory:

```sh
npm install
```
