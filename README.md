#### Popspots Challenge

[https://popspots-challenge.herokuapp.com/](https://popspots-challenge.herokuapp.com/)

Summary:

A small web application I created in response to a code challenge. It is intended to help users
find advertising locations in an area and meets the following requirements:

The application must:
1. query an external API to retrieve location information
    1. cache response to reduce server load
    1. cache expiration is set to 4 hours
1. have an API layer to process searches
1. present the user with a map of all advertising locations
1. present the user with a list of all advertising locations
    1. make use of a CSS animations to display a mouseover effect
1. allow a user to search for an advertising location (e.g. state, city, etc...)
    1. the location list will be sorted by proximity to the search location
    1. the map will center on the search location
1. allow a user to click on a map marker to reveal the address of the selected location
1. be hosted online and can be viewed in Google Chrome

* Frontend: React, Material-UI, Mapbox, and Google Maps API for address search
* Backend: Node.js, Express
* DB: no database, data was small enough to store in memory and the application served as a caching layer
