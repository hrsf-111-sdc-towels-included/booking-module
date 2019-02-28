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
- Parameters : 
```javascript
{
  "user_id": integer,
  "check_in": date,
  "check_out": date,
  "price_per_night": integer,
  "no_guests": integer
}
```
| Properties | Definition |
| --- | --- |
| user_id | **integer**<br>The ID that the app uses to uniquely identify a user |
| check_in | **date**<br>The date this booking resevation starts |
| check_out | **date**<br>The date this booking reservation ends |
| price_per_night | **integer**<br>A price for the home per night |
| no_guests | **integer**<br>A number that represents how many guests are visiting |

- Response : status 201 (Created)
- Response Data : created home_id (integer)

> Read
- (/api/booking/:home_id) - receives room reservations for a specific home
- Parameters : none
- Response : status 200 (OK)
- Response Data : 
```javascript
[
  {
    "booking_id": integer,
    "home_id": integer,
    "user_id": integer,
    "created_at": timestamp,
    "check_in": date,
    "check_out": date,
    "price_per_night": integer,
    "no_guests": integer
  }, ...
]
```

| Properties | Definition |
| --- | --- |
| booking_id | **integer**<br>The ID that the booking module uses to uniquely identify a booking |
| home_id | **integer**<br>The ID that the app uses to uniquely identify a home |
| user_id | **integer**<br>The ID that the app uses to uniquely identify a user |
| created_at | **timestamp**<br>The exact time that this booking was made |
| check_in | **date**<br>The date this booking resevation starts |
| check_out | **date**<br>The date this booking reservation ends |
| price_per_night | **integer**<br>A price for the home per night |
| no_guests | **integer**<br>A number that represents how many guests are visiting |

> Update
- (/api/booking/:booking_id) - updates a reservation
- Parameters : 
```javascript
{
  user_id: integer,
  check_int: date,
  check_out: date,
  price_per_night: integer,
  no_guests: integer
}
```
| Properties | Definition |
| --- | --- |
| user_id | **integer**<br>The ID that the app uses to uniquely identify a user |
| check_in | **date**<br>The date this booking resevation starts |
| check_out | **date**<br>The date this booking reservation ends |
| price_per_night | **integer**<br>A price for the home per night |
| no_guests | **integer**<br>A number that represents how many guests are visiting |

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
