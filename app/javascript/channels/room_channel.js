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
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());

        if (element && (!params.page || params.page === '1')) {
            const {book} = data;

            const listItem = $('<li class="list-group-item d-flex justify-content-between bg-off-white">');
            const div1 = $('<div></div>');
            // problem: href not using the book_path
            const a = $(`<a class="text-decoration-none text-black underline-hover" href="books/${book.id}">`);
            const h5 = $(`<h5>${book.title}</h5>`)
            const span1 = $(`<span>${book.author}, </span>`)
            const span2 = $(`<span>${book.publication_year}</span>`)

            listItem.append(div1);
            div1.append(a, span1, span2);
            a.append(h5);
            $("#book-list").prepend(listItem);
            $('#book-list li:last-child').remove();
        }
    }
});
