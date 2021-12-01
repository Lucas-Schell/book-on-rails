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

                let url = `http://openlibrary.org/search.json?q=${event.target.value}&fields=author_name,first_publish_year,title,cover_edition_key&limit=10`;
                $.getJSON(url, (response) => {
                    const results = response.docs

                    let list = $('#result-list')
                    list.empty()
                    $.each(results, (i) => {
                        const li = $('<li/>').appendTo(list);
                        const text = $('<p class="mb-0"/>').text(`${results[i].title}`)
                        const div = $('<div/>').append(text)
                        $(`<p class="color-grey mb-0">${results[i].author_name}</>`).appendTo(div)
                        const button = $('<button class="d-flex gap-2"/>')
                        button.addClass('dropdown-item').attr('type', 'button')
                            .on('click', () => selectBook(results[i])).appendTo(li)
                            .append(div);
                        button.prepend($('<img>', {
                            id: 'theImg',
                            src: `https://covers.openlibrary.org/b/olid/${results[i].cover_edition_key}-M.jpg`,
                            class: 'img-thumbnail w-3 min-h-4'
                        }))
                    });
                });
            }, 500);
        });
    }

    function selectBook(book) {
        $('#book_title').val(book.title)
        $('#book_author').val(book.author_name)
        $('#book_publication_year').val(book.first_publish_year)
        $('#book_image').val(`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`)
    }
})
