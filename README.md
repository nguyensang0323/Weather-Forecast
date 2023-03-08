# Weather-Forecast

This web application allows users to search for the current day's weather conditions along with the next five days' weather conditions for the city that is inputed into the search field.

## Project Description

To create this application, an HTML file and JavaScript file were made. A CSS file was not necessary but Bootstrap was employed to form the styling and structure of the application. A search field is available on the top left for users to choose which city they would like to investigate. Once the city is selected, the application will retrieve data to display the current day's weather and the next five days' conditions as well. A few functions were necessary for the API calls to work properly:

- A fetch call was made to the Open Weather Maps' api to gather the weather data.
  - The api call was made to the Open Weather's geocoding api which retrieves the latitude and longigtude of the city selected.
  - When the latitude and longitude are located, these coordinates are used in another fetch call to retrieve the current day's weather conditions along with the next five days.
- DayJS was used to better format the dates.

## Demo of Deployed Site

## Project URLs
