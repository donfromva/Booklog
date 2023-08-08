import bookRenderer from "./js/book.js"
const openFormBtn = document.querySelector('.add-book-btn')
const closeFormBtn = document.querySelector('.close-form')
const overlay = document.querySelector('.overlay')
const bookForm = document.querySelector('#book-form')
const bookCollection = document.querySelector('.book-collection')

// FORM CONTROLS
openFormBtn.addEventListener('click', () => {
    if (bookForm.classList.value === 'open') {
        bookForm.style.cssText = 'display: none'
        bookForm.classList.remove('open')
        overlay.classList.remove('form-bg')
    } else {
        bookForm.classList.add('open')
        overlay.classList.add('form-bg')
        bookForm.style.cssText = 'display: flex'
        document.body.classList.add('hide')
    }
})

closeFormBtn.addEventListener('click', () => {
    if (bookForm.classList.value === 'open') {
        bookForm.style.cssText = 'display: none'
        bookForm.classList.remove('open')
        overlay.classList.remove('form-bg')
        document.body.removeAttribute('class')
    }
})

let library = []

function Book(title, first_name, last_name, genre, pages, read) {
    this.title = title,
    this.first_name = first_name,
    this.last_name = last_name,
    this.genre = genre,
    this.pages = pages,
    this.read = read,
    this.id = crypto.randomUUID(),
    this.author_full_name = `${this.first_name} ${this.last_name}`
}

Book.prototype = {
    info() {
        const info = `${this.title} by ${`${this.first_name} ${this.last_name}`}, ${this.pages} pages, ${this.read === 'true' ? 'read' : 'not read yet'}`
        return info
    }
}

function addBookToLibrary(book_data_arr) {
    // create a new book from form input
    let book = new Book(
        book_data_arr[0][1], // t
        book_data_arr[1][1], // fn
        book_data_arr[2][1], // ln
        book_data_arr[3][1], // g
        book_data_arr[4][1], // p
        book_data_arr[5][1]) // rs
    
    // render book to the page
    bookCollection.appendChild(bookRenderer(book))
    // append the new book to the library arr and append the entire library to LS
    library = [...library, {...book}]
    localStorage.setItem('books', JSON.stringify(library))
}

// FORM DATA

// when the user submits a new book
bookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(bookForm)
    const formDataArr = [...formData]
    // console.log(formDataArr)
    addBookToLibrary(formDataArr)

    closeFormBtn.click()
    bookForm.reset()
})