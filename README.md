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
- User can change parks, cafes, restaurants list and show all by clicking filter button.
- Each marker shows InfoWindow about place and displays name, address, picture and Foursquare page's link.
- Service Worker helps to run web pages offline.

## What I did
- Build App, Map, SideBar component and connected each other.
- Fetch Google Maps and get data from Foursquare's Places API at React library.
- Make filter button that show other places list by changing state's filter.
- Design page's CSS to have responsive and set sideButton with CSS animation
- Setting Service Worker to help running page offline.
- Give tabindex attribute for tab key's setting. Give image tag to alt attribute for explaination.
- Make it possible to control with keyboard.
  - Show infoWindow from list with Enter key and close infowindow with Esc key.
  - Change filter button with Enter key.

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
- [파이어폭스가 Async/Await 를 지원합니다.](http://hacks.mozilla.or.kr/2016/12/asyncawait-arrive-in-firefox/)
- [Progressive Web Apps with React.js: Part 3 — Offline support and network resilience](https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-3-offline-support-and-network-resilience-c84db889162c)
- [Refs and the DOM(reactjs.org)](https://reactjs.org/docs/refs-and-the-dom.html)
- [Have just one InfoWindow open in Google Maps API v3](https://code.i-harness.com/en/q/1c9e8c)
