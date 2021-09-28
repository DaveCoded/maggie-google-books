import fetch from 'node-fetch';
import fs from 'fs';

const url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
const isbn = '9780465093069'

const getBook = async () => {
    const response = await fetch(url + isbn);
    const data = await response.json();
    return data;
}

getBook().then(data => {
    data.items.forEach(item => {
        const title = item.volumeInfo.title;
        const subtitle = item.volumeInfo.subtitle && item.volumeInfo.subtitle;
        const author = item.volumeInfo.authors[0];
        const thumbnail = item.volumeInfo.imageLinks.thumbnail;
        const obj = { title, subtitle, author, thumbnail }
    
        fs.writeFileSync('data.json', JSON.stringify(obj));
    });
}).catch(err => console.error(err))