import bookRenderer from "./js/bookCreator.js"
import Book from "./js/bookConstructor.js"

const openFormBtn = document.querySelector('.add-book-btn')
const closeFormBtn = document.querySelector('.close-form')
const overlay = document.querySelector('.overlay')
const bookForm = document.querySelector('#book-form')
const bookCollection = document.querySelector('.book-collection')
const showOnEmpty = document.querySelector('.bc-empty')

// ON LOAD
// array of book objects
let library = JSON.parse(localStorage.getItem('books'))

// render books in user LS to page
if (library) {
    renderLibrary(library)

}

displayTextOnEmpty(library)

// FORM CONTROLS
// open form
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

// close form
closeFormBtn.addEventListener('click', () => {
    if (bookForm.classList.value === 'open') {
        bookForm.style.cssText = 'display: none'
        bookForm.classList.remove('open')
        overlay.classList.remove('form-bg')
        document.body.removeAttribute('class')
    }
})


// FORM DATA
bookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const formData = new FormData(bookForm)
    const formDataArr = [...formData]
    addBookToLibrary(formDataArr)
    closeFormBtn.click()
    bookForm.reset()
})


// FUNCTIONS
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
    
    // add new book to the library array
    library = library === null ? [book] : [...library, book]
    displayTextOnEmpty(library)
    // add the modified library to user LS
    localStorage.setItem('books', JSON.stringify(library))
}

function renderLibrary(library) {
    library.forEach(book => {
        bookCollection.appendChild(bookRenderer(book))
    })
} 

function displayTextOnEmpty(library) {
    library !== null && library.length > 0 ? showOnEmpty.style.display = 'none' : showOnEmpty.style.display = 'block'
}

// BOOK OPTION BUTTONS
function updateReadStatus(id, bool) {
    const bookIndex = library.findIndex(obj => obj.id === id)
    library[bookIndex].read = `${bool}`
    localStorage.setItem('books', JSON.stringify(library))
}

function updateAfterDelete(id) {
    const bookIndex = library.findIndex(obj => obj.id === id)
    library = [...library.slice(0, bookIndex), ...library.slice(bookIndex + 1)]
    localStorage.setItem('books', JSON.stringify(library))
    displayTextOnEmpty(library)
}

export {updateReadStatus, updateAfterDelete}