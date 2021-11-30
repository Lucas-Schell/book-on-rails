window.addEventListener("turbolinks:load", () => {
    let timeout
    // check if it's the new book page (i couldn't include the .js in just one view)
    document.getElementById('new-book-page')?.addEventListener('input', (event) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {

            $('<button/>').addClass('dropdown-item').attr('type', 'button').text("Carregando...").appendTo('#result-list');

            let url = `http://openlibrary.org/search.json?q=${event.target.value}`;
            $.getJSON(url, (response) => {
                const results = response.docs.slice(0, 10).map(doc => {
                    return {author: doc.author_name, publication_year: doc.first_publish_year, title: doc.title}
                })
                console.log(results)
                console.log(url)

                let list = $('#result-list')
                list.empty()
                $.each(results, (i) => {
                    const li = $('<li/>').appendTo(list);
                    const text = $('<span/>').text(results[i].title)
                    $('<button/>').addClass('dropdown-item').attr('type', 'button')
                        .on('click', () => selectBook(results[i])).appendTo(li)
                        .append(text);
                });
            });
        }, 500);
    });

    function selectBook(book) {
        $('#book_title').val(book.title)
        $('#book_author').val(book.author)
        $('#book_publication_year').val(book.publication_year)
    }
})
