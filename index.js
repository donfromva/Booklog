import bookRenderer from "./js/bookCreator.js"
import Book from "./js/bookConstructor.js"
import { submitBtn, saveBtn } from "./js/handlerFunctions.js"

const openFormBtn = document.querySelector('.add-book-btn')
const mobileOpenFormBtn = document.querySelector('#add-book-main')
const closeFormBtn = document.querySelector('.close-form')
const overlay = document.querySelector('.overlay')
const bookForm = document.querySelector('#book-form')
const bookCollection = document.querySelector('.book-collection')
const showOnEmpty = document.querySelector('.bc-empty')

let library = JSON.parse(localStorage.getItem('books'))

if (library) {
    renderLibrary(library)
}

displayTextOnEmpty(library)

// FORM CONTROLS
const openFormHandler = () => {
    bookForm.classList.add('open')
    overlay.classList.add('form-bg')
    bookForm.style.cssText = 'display: flex'
    document.body.classList.add('hide')
    submitBtn.style.display = 'block'
    saveBtn.style.display = 'none'
}

openFormBtn.addEventListener('click', openFormHandler)
mobileOpenFormBtn.addEventListener('click', openFormHandler)

const addPaddingHandler = () => {
    overlay.classList.add('pt')
}

mobileOpenFormBtn.addEventListener('click', addPaddingHandler)

closeFormBtn.addEventListener('click', () => {
        bookForm.style.cssText = 'display: none'
        bookForm.classList.remove('open')
        overlay.classList.remove('form-bg')
        document.body.removeAttribute('class')
        bookForm.reset()
        if (overlay.classList.contains('pt')) {
            overlay.classList.remove('pt')
        }
})


// FORM DATA
const handleSubmission = (e) => {
    e.preventDefault()
    const formData = new FormData(bookForm)
    const formDataArr = [...formData]
    addBookToLibrary(formDataArr)
    closeFormBtn.click()
    bookForm.reset()
    bookForm.removeEventListener('submit', handleSubmission)
}

submitBtn.addEventListener('click', () => {
    bookForm.addEventListener('submit', handleSubmission)
})

// FUNCTIONS
function addBookToLibrary(book_data_arr) {
    let book = new Book(
        book_data_arr[0][1],
        book_data_arr[1][1],
        book_data_arr[2][1],
        book_data_arr[3][1],
        book_data_arr[4][1],
        book_data_arr[5][1])
    
    bookCollection.appendChild(bookRenderer(book))
    
    library = library === null ? [book] : [...library, book]
    displayTextOnEmpty(library)
    setLocalStorage(library)
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
    setLocalStorage(library)
}

function updateAfterDelete(id) {
    const bookIndex = library.findIndex(obj => obj.id === id)
    library = [...library.slice(0, bookIndex), ...library.slice(bookIndex + 1)]
    setLocalStorage(library)
    displayTextOnEmpty(library)
}

function updateAfterEdit(edited_book, id) {
    const bookIndex = library.findIndex(obj => obj.id === id)
    library[bookIndex] = edited_book
    setLocalStorage(library)
}

function setLocalStorage(library) {
    localStorage.setItem('books', JSON.stringify(library))
}

export {updateReadStatus, updateAfterEdit, updateAfterDelete, handleSubmission, openFormBtn, closeFormBtn, bookForm}