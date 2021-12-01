import consumer from "./consumer"

consumer.subscriptions.create("RoomChannel", {
    connected() {
        // Called when the subscription is ready for use on the server
        console.log("Connected to the server!");
    },

    disconnected() {
        // Called when the subscription has been terminated by the server
    },

    received(data) {
        // Called when there's incoming data on the websocket for this channel
        // check if it's the home page
        const element = document.getElementById('home-page')
        const urlSearchParams = new URLSearchParams(window.location.search)
        const params = Object.fromEntries(urlSearchParams.entries())

        if (element && (!params.page || params.page === '1')) {
            const {book} = data;

            const listItem = $('<li class="list-group-item d-flex align-items-center justify-content-between bg-off-white">')
            const listItemContainer = $('<div class="d-flex gap-2"></div>')

            const divBookInfo = $('<div/>')

            const img = $(`<img alt="${book.title}" class="img-thumbnail w-4_5 min-h-6" src="${book.image}"/>`)

            // problem: href not using the book_path
            const aTitle = $(`<a class="text-decoration-none text-black underline-hover" href="books/${book.id}">`)
            const h5Title = $(`<h5>${book.title}</h5>`)
            const span1Author = $(`<span>${book.author}, </span>`)
            const span2Year = $(`<span>${book.publication_year}</span>`)

            listItem.append(listItemContainer);
            divBookInfo.append(aTitle, span1Author, span2Year);
            listItemContainer.append(img, divBookInfo)
            aTitle.append(h5Title);
            const bookList = $("#book-list")
            bookList.prepend(listItem)
            if ($("#book-list li").length === 6) {
                $('#book-list li:last-child').remove();
            }
        }
    }
});
