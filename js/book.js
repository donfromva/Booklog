// will be using form data
const bookRenderer = (book) => {
    // BOOK
    const bookDiv = document.createElement('div')
    bookDiv.setAttribute('class', 'book')

    // BUTTONS CONTAINER
    const bookOptionsDiv = document.createElement('div')
    bookOptionsDiv.setAttribute('class', 'book-options')

    // READ STATUS BTN
    const readUnreadBtn = document.createElement('button')
    readUnreadBtn.setAttribute('type', 'button')
    readUnreadBtn.setAttribute('class', 'book-option')
    readUnreadBtn.classList.add('read-unread')
    const readUnreadSpan = document.createElement('span')
    readUnreadSpan.setAttribute('class', 'material-symbols-outlined')
    readUnreadSpan.textContent = 'radio_button_unchecked'
    readUnreadBtn.appendChild(readUnreadSpan)

    // EDIT BTN
    const editBtn = document.createElement('button')
    editBtn.setAttribute('type', 'button')
    editBtn.setAttribute('class', 'book-option')
    editBtn.classList.add('edit')
    const editSpan = document.createElement('span')
    editSpan.setAttribute('class', 'material-symbols-outlined')
    editSpan.textContent = 'edit_note'
    editBtn.appendChild(editSpan)

    // DELETE BTN
    const deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('type', 'button')
    deleteBtn.setAttribute('class', 'book-option')
    deleteBtn.classList.add('delete')
    const deleteSpan = document.createElement('span')
    deleteSpan.setAttribute('class', 'material-symbols-outlined')
    deleteSpan.textContent = 'delete'
    deleteBtn.appendChild(deleteSpan)

    // BOOK DETAILS

    // title
    const titleSpan = document.createElement('span')
    titleSpan.setAttribute('class', 'book-details')
    titleSpan.classList.add('bd-title')

    // author
    const authorSpan = document.createElement('span')
    authorSpan.classList.add('book-details')
    const authorTextSpan = document.createElement('span')
    authorTextSpan.classList.add('bd-detail')
    authorTextSpan.classList.add('bd-author')
    authorTextSpan.textContent = 'Author: '
    authorSpan.append(authorTextSpan)

    // genre
    const genreSpan = document.createElement('span')
    genreSpan.setAttribute('class', 'book-details')
    const genreTextSpan = document.createElement('span')
    genreTextSpan.setAttribute('class', 'bd-detail')
    genreTextSpan.classList.add('bd-genre')
    genreTextSpan.textContent = 'Genre: '
    genreSpan.append(genreTextSpan)

    // pages
    const pagesSpan = document.createElement('span')
    pagesSpan.setAttribute('class', 'book-details')
    const pagesTextSpan = document.createElement('span')
    pagesTextSpan.setAttribute('class', 'bd-detail')
    pagesTextSpan.classList.add('bd-pages')
    pagesTextSpan.textContent = 'Pages: '
    pagesSpan.append(pagesTextSpan)

    // appendages
    bookDiv.appendChild(bookOptionsDiv)
    bookOptionsDiv.append(readUnreadBtn, editBtn, deleteBtn)
    bookDiv.appendChild(titleSpan)
    bookDiv.appendChild(authorSpan)
    bookDiv.appendChild(genreSpan)
    bookDiv.appendChild(pagesSpan)

//////////////////////////////////////////////////////////////////////////////////////////////////////////
    // fill in read status, title, author, genre, and pages
    if (book.read === 'true') {
        readUnreadSpan.textContent = 'check_circle'
    } else {
        readUnreadSpan.textContent = 'radio_button_unchecked'
    }
    titleSpan.textContent = book.title
    authorTextSpan.after(book.author_full_name)
    genreTextSpan.after(book.genre)
    pagesTextSpan.after(book.pages)

    return bookDiv
}

export default bookRenderer