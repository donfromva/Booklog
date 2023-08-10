import { changeReadStatus, editBook, removeBook } from "./handlerFunctions.js"

const bookRenderer = (book) => {
    const bookDiv = document.createElement('div')
    bookDiv.setAttribute('class', 'book')
    bookDiv.setAttribute('id', 'book')

    const bookOptionsDiv = document.createElement('div')
    bookOptionsDiv.setAttribute('class', 'book-options')

    const readUnreadBtn = document.createElement('button')
    readUnreadBtn.setAttribute('type', 'button')
    readUnreadBtn.setAttribute('class', 'book-option')
    readUnreadBtn.classList.add('read-unread')
    const readUnreadSpan = document.createElement('span')
    readUnreadSpan.setAttribute('class', 'material-symbols-outlined')
    readUnreadSpan.textContent = 'radio_button_unchecked'
    readUnreadBtn.appendChild(readUnreadSpan)
    readUnreadBtn.addEventListener('click', changeReadStatus)

    const editBtn = document.createElement('button')
    editBtn.setAttribute('type', 'button')
    editBtn.setAttribute('title', 'edit')
    editBtn.setAttribute('class', 'book-option')
    editBtn.classList.add('edit')
    const editSpan = document.createElement('span')
    editSpan.setAttribute('class', 'material-symbols-outlined')
    editSpan.textContent = 'edit_note'
    editBtn.appendChild(editSpan)
    editBtn.addEventListener('click', editBook)

    const deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('type', 'button')
    deleteBtn.setAttribute('title', 'delete')
    deleteBtn.setAttribute('class', 'book-option')
    deleteBtn.classList.add('delete')
    const deleteSpan = document.createElement('span')
    deleteSpan.setAttribute('class', 'material-symbols-outlined')
    deleteSpan.textContent = 'delete'
    deleteBtn.appendChild(deleteSpan)
    deleteBtn.addEventListener('click', removeBook)

    // BOOK DETAILS
    const titleSpan = document.createElement('span')
    titleSpan.setAttribute('class', 'book-details')
    titleSpan.classList.add('bd-title')

    const authorSpan = document.createElement('span')
    authorSpan.classList.add('book-details')
    const authorTextSpan = document.createElement('span')
    authorTextSpan.classList.add('bd-detail')
    authorTextSpan.classList.add('bd-author')
    authorTextSpan.textContent = 'Author: '
    authorSpan.append(authorTextSpan)

    const genreSpan = document.createElement('span')
    genreSpan.setAttribute('class', 'book-details')
    const genreTextSpan = document.createElement('span')
    genreTextSpan.setAttribute('class', 'bd-detail')
    genreTextSpan.classList.add('bd-genre')
    genreTextSpan.textContent = 'Genre: '
    genreSpan.append(genreTextSpan)

    const pagesSpan = document.createElement('span')
    pagesSpan.setAttribute('class', 'book-details')
    const pagesTextSpan = document.createElement('span')
    pagesTextSpan.setAttribute('class', 'bd-detail')
    pagesTextSpan.classList.add('bd-pages')
    pagesTextSpan.textContent = 'Pages: '
    pagesSpan.append(pagesTextSpan)

    bookDiv.appendChild(bookOptionsDiv)
    bookOptionsDiv.append(readUnreadBtn, editBtn, deleteBtn)
    bookDiv.appendChild(titleSpan)
    bookDiv.appendChild(authorSpan)
    bookDiv.appendChild(genreSpan)
    bookDiv.appendChild(pagesSpan)

//////////////////////////////////////////////////////////////////////////////////////////////////////////
  
    if (book.read === 'true') {
        readUnreadSpan.textContent = 'check_circle'
        readUnreadBtn.setAttribute('title', 'read')
        readUnreadBtn.classList.add('read')
    } else {
        readUnreadSpan.textContent = 'radio_button_unchecked'
    }
    bookDiv.classList.add(book.id)
    titleSpan.textContent = book.title
    authorTextSpan.after(book.author_full_name)
    genreTextSpan.after(book.genre)
    pagesTextSpan.after(book.pages)

    return bookDiv
}

export default bookRenderer