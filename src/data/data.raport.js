import axios from "axios";

export const getNilai = (callback) => {
    axios.get('https://script.google.com/macros/s/AKfycbxKYBnwqoleRzbE1KDu35DxOi5upYbBL8RzZYkSmLeX8oAEx6OpTXHNVil3fXARNJHXWw/exec')
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
}