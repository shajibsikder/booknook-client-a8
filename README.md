# BookNook - Online Library

Live Website: https://booknook-client-a8.vercel.app

BookNook is a web application where users can discover books, borrow them for reading, and return them when finished. Users can also share their own books with the community.

## Features

- Book Catalog: Browse books with category filters and search by title or author.
- Book Management: Logged in users can add new books, edit book details, and delete books with a confirmation modal.
- Borrowing System: Users can borrow available books for up to 14 days. The system automatically reduces the available copies by one.
- Return System: Users can view their borrowed books in the My Borrows page and return them anytime, which increases the available stock back.
- Double Borrow Prevention: The system prevents a user from borrowing the same book twice at the same time.
- Authentication: Secure user registration and login with email and password or Google sign-in.
- Dark and Light Theme: Toggle between light and dark mode with full responsive layout for mobile and desktop.

## Technologies Used

- Frontend: Next.js 14, React, Tailwind CSS, Lucide Icons, Swiper.js
- Backend: Node.js, Express.js, MongoDB
- Authentication: BetterAuth, MongoDB Adapter, JWT
