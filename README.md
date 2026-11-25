
# Recipe Explorer

Recipe Explorer is a simple recipe website built using HTML, CSS and JavaScript.

The main purpose of this mini project is to demonstrate the Data Structure concept of **Stack** through Browser Back and Forward navigation.

## Features

- Browse different recipes.
- Filter recipes by category.
- Search recipes by name.
- View ingredients and cooking instructions.
- Navigate between previously visited pages.
- Back and Forward buttons using two stacks.

## DSA Concept Used

This project uses two stacks:

1. Back Stack
2. Forward Stack

### How it works

- When a new page is opened, the current page is pushed into the Back Stack.
- When the Back button is clicked, the current page is pushed into the Forward Stack.
- The previous page is restored using pop().
- When Forward is clicked, the current page is pushed into the Back Stack.
- The next page is restored using pop().
- When a new page is visited after going back, the Forward Stack is cleared.

## Technologies Used

- HTML
- CSS
- JavaScript
- Stack Data Structure

## How to Run

1. Clone or download this repository.
2. Open the project folder.
3. Open index.html in your browser.

No backend or installation is required.
