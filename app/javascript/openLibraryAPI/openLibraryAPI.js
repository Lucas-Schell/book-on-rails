window.addEventListener("turbolinks:load", () => {
    let timeout

    // check if the page is edit or create book (i couldn't include the .js in just one view)
    const page = document.getElementById('new-book-page') || document.getElementById('edit-book-page')
    if (page) {
        const titleInput = document.getElementById('book_title')
        titleInput.addEventListener('input', (event) => {
            // if the dropdown is closed when typing, open it
            if (titleInput.getAttribute('aria-expanded') === 'false') {
                titleInput.click()
            }

            clearTimeout(timeout)
            timeout = setTimeout(() => {
                $('<button/>').addClass('dropdown-item').attr('type', 'button').text("Carregando...").appendTo('#result-list');

                let url = `http://openlibrary.org/search.json?q=${event.target.value}&fields=author_name,first_publish_year,title&limit=10`;
                $.getJSON(url, (response) => {
                    const results = response.docs

                    let list = $('#result-list')
                    list.empty()
                    $.each(results, (i) => {
                        const li = $('<li/>').appendTo(list);
                        const text = $('<span/>').text(`${results[i].title}, `)
                        $(`<small class="color-grey">${results[i].author_name}</>`).appendTo(text)
                        $('<button/>').addClass('dropdown-item').attr('type', 'button')
                            .on('click', () => selectBook(results[i])).appendTo(li)
                            .append(text);
                    });
                });
            }, 500);
        });
    }

    function selectBook(book) {
        $('#book_title').val(book.title)
        $('#book_author').val(book.author_name)
        $('#book_publication_year').val(book.first_publish_year)
    }
})
