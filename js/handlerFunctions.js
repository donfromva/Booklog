import { updateReadStatus, updateAfterEdit, updateAfterDelete, handleSubmission, openFormBtn, closeFormBtn, bookForm, overlay} from "../index.js"
import Book from "./bookConstructor.js"

const t = true
const f = false

const changeReadStatus = (e) => {
    const id = e.target.parentElement.parentElement.classList[1]
    if (e.target.classList.contains('read')) {
        e.target.firstChild.textContent = 'radio_button_unchecked'
        e.target.classList.remove('read')
        updateReadStatus(id, f)
    } else {
        e.target.firstChild.textContent = 'check_circle'
        e.target.classList.add('read')
        updateReadStatus(id, t)
    }
}

const removeBook = (e) => {
    const id = e.target.parentElement.parentElement.classList[1]
    const book = e.target.parentElement.parentElement
    book.remove()
    updateAfterDelete(id)
}

// BOOK FORM INPUT ELEMENTS
const titleInput = document.getElementById('title')
const firstNameInput = document.getElementById('first-name')
const lastNameInput = document.getElementById('last-name')
const genreInput = document.getElementById('genre')
const pagesInput = document.getElementById('pages')
const trueInput = document.getElementById('true')
const falseInput = document.getElementById('false')

const submitBtn = document.querySelector('.book-submit-btn')
const saveBtn = document.querySelector('.edit-save-btn')

let bookId;

const editBook  = (e) => {
    bookId = e.target.parentElement.parentElement.classList[1]
    const book = e.target.parentElement.parentElement

    openFormBtn.click()
    if (screen.width <= 460) {
        overlay.classList.add('pt')
    }
    submitBtn.style.display = 'none'
    saveBtn.style.display = 'block'

    const bookChildren = book.children
    let readStatus = bookChildren[0].firstChild.classList.contains('read')
    const titleSpan = bookChildren[1]
    const authorSpanTextArr = bookChildren[2].childNodes[1].textContent.split(' ')
    const genreSpanText = bookChildren[3].childNodes[1]
    const pagesSpanText = bookChildren[4].childNodes[1]

    titleInput.value = titleSpan.textContent
    firstNameInput.value = authorSpanTextArr[0]
    lastNameInput.value = authorSpanTextArr[1]
    genreInput.value = genreSpanText.textContent
    pagesInput.value = pagesSpanText.textContent
    if (readStatus) {
        trueInput.checked = true
    } else {
        falseInput.checked = true
    }
}

let books 

const handleSave = (e) => {
    e.preventDefault()

    books = document.querySelectorAll('#book')

    const formData =  new FormData(bookForm)
    const formDataArr = [...formData]

    const title = formDataArr[0][1]
    const first_name = formDataArr[1][1]
    const last_name = formDataArr[2][1]
    const genre = formDataArr[3][1]
    const pages = formDataArr[4][1]
    const read_status = formDataArr[5][1]

    books.forEach(book => {
        if (book.classList[1] === bookId) {
            const bookChildren = book.children
            const titleSpan = bookChildren[1]
            const authorSpanText = bookChildren[2].childNodes[1]
            const authorSpanTextArr = bookChildren[2].childNodes[1].textContent.split(' ')
            const genreSpanText = bookChildren[3].childNodes[1]
            const pagesSpanText = bookChildren[4].childNodes[1]

            if (title === titleSpan &&
                first_name === authorSpanTextArr[0] &&
                last_name === authorSpanTextArr[1] &&
                genre === genreSpanText &&
                pages === pagesSpanText &&
                read_status === `${book.firstChild.firstChild.classList.contains('read')}`) {
                    closeFormBtn.click()
                }
            
            titleSpan.textContent = title
            authorSpanText.textContent = `${first_name} ${last_name}`
            genreSpanText.textContent = genre
            pagesSpanText.textContent = pages
            if (read_status === 'false') {
                book.firstChild.firstChild.firstChild.textContent = 'radio_button_unchecked'
                book.firstChild.firstChild.classList.remove('read')
            } else {
                book.firstChild.firstChild.firstChild.textContent = 'check_circle'
                book.firstChild.firstChild.classList.add('read')
            }

            const editedBook = new Book(title, first_name, last_name, genre, pages, read_status, bookId)
            updateAfterEdit({...editedBook}, bookId)

            return
        }
    })

    closeFormBtn.click()
    bookForm.reset()
    bookForm.removeEventListener('submit', handleSave)
}

saveBtn.addEventListener('click', () => {
    bookForm.removeEventListener('submit', handleSubmission)
    bookForm.addEventListener('submit', handleSave)
})

export {changeReadStatus, editBook, removeBook, submitBtn, saveBtn}