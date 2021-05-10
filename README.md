# Speer Backend Assessment

## About

This quick project was put together rapidly for the Speer back-end developer co-op challenge for fall 2021 positions.

## Hosted App

This app is hosted at:
https://speer-backend.herokuapp.com/api/

## Available Methods

#### POST https://speer-backend.herokuapp.com/api/user/register

Request body must include a JSON object of the format:
`{ "username": "username_here", "password": "password_here" }`

\_

#### POST https://speer-backend.herokuapp.com/api/user/login

Request body must include a JSON object of the format:
`{ "username": "username_here", "password": "password_here" }`

Response is a JWT Token on Success (5 minute token life)

\_

#### GET https://speer-backend.herokuapp.com/api/data

Request header must include the JWT token with the key 'auth-token'

## Completed Sections

#### Section 1

- User registration using unique username and a password ()

- User login (Including session maintenance using any means you're comfortable with)
