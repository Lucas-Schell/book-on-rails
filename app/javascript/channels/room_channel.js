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
        const element = document.getElementById('home')
        if (element) {
            const {book} = data;

            const listItem = $('<li class=\"list-group-item d-flex justify-content-between\">');
            const div1 = $('<div></div>');
            const a = $(`<a class="text-decoration-none text-black" href="books/${book.id}">`);
            const h5 = $(`<h5>${book.title}</h5>`)
            const span1 = $(`<span>${book.author}, </span>`)
            const span2 = $(`<span>${book.publication_year}</span>`)

            listItem.append(div1);
            div1.append(a, span1, span2);
            a.append(h5);
            $("#book-list").prepend(listItem);
        }
    }
});
