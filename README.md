# FoodBytes Reviews

> Project description
-SDC project for scaling backend portion of a food place reservation 
-Component for seeing reviews associated with certain food place

## Related Projects

  - https://github.com/tablebytes

  
## Table of Contents

1. [Usage](#Usage)
1. [API Routes

## Usage

> Some usage instructions
-start with npm run start
-seed mongo database with npm run seed
-build webpack with npm run build

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development


#API Routes
Create
  -Create new restauturant
    -/api/restaurants/?name=name
  -create new user
    -/api/user/?user=name
  -create new review
    -/api/restaurants/:restaurant_id/reviews/?review=review

   Read (Done)
   -all reviews from 1 restaurant
    -/api/restaurants/:restaurant_id/reviews
  -all reviews from 1 user
    -/api/user/:user_id
  -one review 
    -/api/restaurants/:restaurant_id/reviews/:id

  Update
  -1 review
    -/api/restaurants/:restaurant_id/reviews/:id/?review=review
  -User name
    -/api/user/:user_id/?username=name
  -Restaurant name
    -/api/restaurants/:restaurant_id/?restaurant_name=restaurant_name
  
  Delete
  -1 review 
    -/api/restaurants/:restaurant_id/reviews/:id/
  -Restaurant
    -/api/restaurants/:restaurant_id
  -User
    -/api/user/:user_id