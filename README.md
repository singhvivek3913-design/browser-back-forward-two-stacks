# Browser Back and Forward Navigation Using Two Stacks

## Project Overview
This is a simple mini project that demonstrates how browser back and forward navigation works using the Stack data structure.

The project uses two stacks:
- **Back Stack:** Stores previously visited pages.
- **Forward Stack:** Stores pages visited after going back.

## Features
- Browse different recipe pages.
- Navigate between recipes.
- Go back to previously visited pages.
- Go forward to recently visited pages.
- Search recipes.
- Filter recipes by category.

## Data Structure Used
**Stack (LIFO – Last In, First Out)**

Two stacks are used to manage browser-like navigation:
1. `backStack`
2. `forwardStack`

## Technologies Used
- HTML
- CSS
- JavaScript

## How It Works
1. When a user visits a new page, the current page is pushed into the back stack.
2. When the user clicks Back, the current page is pushed into the forward stack.
3. When the user clicks Forward, the current page is pushed into the back stack.
4. When a new page is visited, the forward stack is cleared.

## How to Run
1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in any web browser.

## Project Type
DSA Mini Project – Stack Implementation