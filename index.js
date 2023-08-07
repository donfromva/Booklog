const openFormBtn = document.querySelector('.add-book-btn')
const closeFormBtn = document.querySelector('.close-form')
const bookForm = document.querySelector('#book-form')
const overlay = document.querySelector('.overlay')

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

function Book(title, author, pages, read = false) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read
}

Book.prototype = {
    info() {
        const info = `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`
        return info
    }
}

function addBookToLibrary() {
    // create a new book from form input
    // append the new book to the library
}

/* const atomicHabits = new Book('Atomic Habits', 'James Clear', 320) 

console.log(atomicHabits.info())
console.log(Object.getPrototypeOf(atomicHabits) == Book.prototype) */