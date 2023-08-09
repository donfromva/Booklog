import { updateReadStatus, updateAfterDelete } from "../index.js"

const changeReadStatus = (e) => {
    const id = e.target.parentElement.parentElement.classList[1]
    const t = true
    const f = false

    if (e.target.firstChild.textContent === 'check_circle') {
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
    // remove from the library, UI, and local storage
    

}

export {changeReadStatus, removeBook}