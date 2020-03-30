import axios from 'axios';

export const MAP_KEY = 'AIzaSyBxJyYXLJmaN_8UfUHsWgkg_kIZcCB6vqQ';
export const PHOTO_LINK = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=90&maxheight=100&photoreference'

export const getPlaceDetail = async () => {
    try {
        const result = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%%20Art%&inputtype=textquery&fields=photos,formatted_address,name,rating,,geometry&key=${MAP_KEY}`)
    } catch {
        console.log('Error from Using Places API')
    }
}

// ex
// `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.570148,126.976816&radius=1000&type=restaurant&key=${MAP_KEY}`
// `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${MAP_KEY}`
// `https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=${photo_reference}&key=${MAP_KEY}`