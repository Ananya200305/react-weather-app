import sunny from "../assets/background/sunny.jpg"
import cloudy from "../assets/background/cloudy.jpg"
import rainy from "../assets/background/rainy.jpg"
import snowy from "../assets/background/snow.jpg"
import thunderstorm from "../assets/background/thunder.jpg"

export const getBackgroundImg = (main) => {
    switch(main.toLowerCase()) {
        case "clear":
            return sunny;
        case "clouds":
            return cloudy;
        case "rain":
            return rainy;
        case "snow":
            return snowy;
        case "thunderstorm":
            return thunderstorm;
        default:
            return sunny;
    }
}