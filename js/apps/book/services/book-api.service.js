import { utilService } from './util-service.js'

function search(searchStr, param = 5) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${searchStr}&maxResults=${param}&key=AIzaSyATHxzSxsFZHgFcbYpKgCYjakKDW3kjaqg`
    return utilService.makeAxiosRequest(url).then(response => {
        console.log(response)

        const books = response.items.map(book => parseApiBook(book))
        console.log("🚀 ~ file: book-api.service.js ~ line 8 ~ returnutilService.makeAxiosRequest ~ books", books)
        return books
    });
}

function parseApiBook(book) {
    const {
        volumeInfo: {
            title,
            subtitle,
            authors,
            publishedDate,
            description,
            pageCount,
            categories,
            imageLinks: { thumbnail } = { thumbnail: null },
            language
        }
    } = book;

    const bookTemplate = {
        "id": utilService.makeId(),
        title,
        subtitle,
        authors,
        publishedDate,
        description,
        pageCount,
        categories,
        thumbnail,
        language,
        listPrice: {
            amount: 0,
            currencyCode: "USD",
            isOnSale: false
        }
    }
    console.log({ book, bookTemplate })
    return bookTemplate
}

export const bookApiService = { search }