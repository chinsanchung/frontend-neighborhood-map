import axios from 'axios';

export const MAP_KEY = 'AIzaSyBxJyYXLJmaN_8UfUHsWgkg_kIZcCB6vqQ';

export const getPlaceDetail = async () => {
    try {
        const result = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%%20Art%&inputtype=textquery&fields=photos,formatted_address,name,rating,,geometry&key=${MAP_KEY}`)
    } catch {
        console.log('Error from Using Places API')
    }
}