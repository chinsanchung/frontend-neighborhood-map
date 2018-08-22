# Neighborhood-map (Frontend Nanodegree)
## Tools
- OS : Windows 10 Home
- language: HTML, CSS, JavaScript
- tools : Atom text editor, Github Desktop, React(create-react-app), Service Worker

## Preparations
- Install NPM at the project folder. `npm install`
- Replace google maps API key from ID to user's key
- Replace Foursquare Places API's ID and SECRET

## Function
- It shows parks, restaurants, and cafe lists of Vancouver.
- At main page, there are markers that show location of places(default: parks)
- User can change parks, cafes, restaurants list by clicking filter button.
- Each marker shows InfoWindow about place and displays name, address, picture and Foursquare page's link.
- Service Worker helps to run web pages offline.

## What I did
- Fetch Google Maps and get data from Foursquare's Places API at React library.
- Make filter button that show other places list by changing state's filter.
- Design page's CSS to have responsive and set sideButton with CSS animation
- Setting Service Worker to help running page offline.
- Give tabindex attribute for tab key's setting. Give image tag to alt attribute for explaination.

## Reference
- [For Loops in React Render() — No You Didn’t!](https://blog.cloudboost.io/for-loops-in-react-render-no-you-didnt-6c9f4aa73778)
- [Using Google Maps in React without custom libraries](http://cuneyt.aliustaoglu.biz/en/using-google-maps-in-react-without-custom-libraries/)
- [latlong.net: Get Latitude and Longitude](https://www.latlong.net/)
- [Passive event listeners](https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md)
- [Google developers: Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial)
- [Udacity forum](https://discussions.udacity.com/)
- [LOLCOLORS : list of popular color palettes](https://www.webdesignrankings.com/resources/lolcolors/)
- [icon8](https://icons8.com/)
- [async, await makes Asynchronous javascript(translate)](https://blueshw.github.io/2018/02/27/async-await/)
