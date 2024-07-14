document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("searchButton");
  const searchQuery = document.getElementById("searchQuery");
  const sortSelect = document.getElementById("sortSelect");
  const catalog = document.getElementsByClassName("catalog")[0];

  const books = [
    {
      id: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
    },
    { id: 2, title: "1984", author: "George Orwell", genre: "Dystopian" },
    {
      id: 3,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
    },
    {
      id: 4,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
    },
    {
      id: 5,
      title: "Moby-Dick",
      author: "Herman Melville",
      genre: "Adventure",
    },
    {
      id: 6,
      title: "War and Peace",
      author: "Leo Tolstoy",
      genre: "Historical",
    },
    {
      id: 7,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genre: "Fiction",
    },
    { id: 8, title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy" },
    { id: 9, title: "Ulysses", author: "James Joyce", genre: "Modernist" },
    { id: 10, title: "The Odyssey", author: "Homer", genre: "Epic" },
  ];

  const displayBooks = (books) => {
    catalog.innerHTML = ""; // Clear previous content

    if (books.length === 0) {
      noResultsMessage.style.display = "block"; // Show the no results message
    } else {
      noResultsMessage.style.display = "none"; // Hide the message
      books.forEach((book) => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("book-item");
        bookItem.innerHTML = `
        <div class="book-img"></div>
          <div class="book-item__title">${highlightMatch(
            book.title,
            searchQuery.value
          )}</div>
          <div class="book-item__author">${highlightMatch(
            book.author,
            searchQuery.value
          )}</div>
          <div class="book-item__genre">${highlightMatch(
            book.genre,
            searchQuery.value
          )}</div>
        `;
        catalog.appendChild(bookItem);
      });
    }
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, '<span class="highlight">$1</span>');
  };

  const sortBooks = (books, searchCriteria) => {
    return books.sort((a, b) => {
      if (a[searchCriteria].toLowerCase() < b[searchCriteria].toLowerCase()) {
        return -1;
      }
      if (a[searchCriteria].toLowerCase() > b[searchCriteria].toLowerCase()) {
        return 1;
      }
      return 0;
    });
  };

  searchButton.addEventListener("click", () => {
    const query = searchQuery.value.toLowerCase();
    const filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.genre.toLowerCase().includes(query)
    );
    displayBooks(filteredBooks);
  });

  sortSelect.addEventListener("change", () => {
    const criteria = sortSelect.value;
    const sortedBooks = sortBooks(books, criteria);
    displayBooks(sortedBooks);
  });

  const sortedByAuthor = sortBooks(books, "author");
  displayBooks(sortedByAuthor);
});
