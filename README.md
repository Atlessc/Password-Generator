# Personalized Password Generator

This project is a React Vite application that allows users to generate strong, memorable passwords based on personal inputs. The app provides 30 unique options for users to select from, where they can input memorable information that is not commonly used in security questions. The generated passwords are designed to be secure while still easy for the user to remember.

## Purpose

The purpose of this project is to help users create passwords that are both strong and easy to remember by leveraging personal, yet obscure, information. Traditional passwords often rely on easily guessable information, such as favorite things or obvious dates, which can make them vulnerable to attacks. By allowing users to choose from a variety of unique and less common options, this password generator ensures that the passwords are difficult to guess while still being meaningful and memorable to the user.

## Features

- **Selection of 30 Unique Options:** Users can select from a list of 30 different input types. These inputs are designed to be unique and memorable to the user but difficult for others to guess.
  
- **Password Length Control:**
  - An input field allows the user to specify the exact length of the password (between 8 and 50 characters).
  - A slider is also available for easy adjustment of the password length.

- **Password Generation:**
  - A `Generate` button creates the password based on the selected inputs.
  - A `Regenerate` button replaces the `Generate` button after the first use, allowing the user to generate a new password based on the same inputs.
  - A `Clear` button resets all inputs and selections.
  - A `Copy` button allows the user to easily copy the generated password to the clipboard.

- **Password Explanation:** After generating the password, the app provides an explanation of the different parts of the password based on the user's inputs.

## Available Options for Password Generation

1. Use the first letter of each word from a random phrase you created.
2. Select a sequence of numbers from the page number of a random book.
3. Combine random syllables from three different words.
4. The day of the month you first learned something significant.
5. The number of windows in your house or apartment.
6. The number of letters in a word you find interesting but obscure.
7. The first three letters from three different street names you’ve lived on.
8. A sequence of letters from a made-up word or phrase only you would know.
9. The number of steps it takes to walk from your bed to your front door.
10. A mix of random letters from two different languages you are familiar with.
11. A string of digits from a specific but obscure mathematical constant or ratio you find interesting.
12. A pattern from a repeated keystroke on your keyboard (e.g., a specific sequence of letters from one row).
13. The number of photos in your last photo album multiplied by 2.
14. An anagram of a word or phrase you invented that holds meaning to you.
15. A string of numbers derived from counting objects in a specific room (e.g., books on a shelf, chairs in your kitchen).
16. The name of a made-up character from a story you wrote, combined with a random number.
17. The number of hours in a specific day you consider productive or memorable.
18. A code created by replacing letters in a word you like with numbers based on their position in the alphabet.
19. The date of an event you participated in but in reverse order.
20. The number of unread emails in your inbox right now.
21. The first letters of a song lyric you enjoy but not a favorite one.
22. The number of pages in a book that has impacted you but isn’t widely known.
23. A combination of numbers from a stopwatch time you’ve recently recorded.
24. An acronym from an inside joke or a phrase known only to you and a few others.
25. The first three letters from a non-English word you find beautiful.
26. A code based on a specific time you often notice on the clock (e.g., 11:11).
27. A random sequence from a keyboard pattern you create (e.g., ZXC+ random numbers).
28. The number of keys on a specific keyboard (e.g., piano, computer).
29. A sequence of initials from the names of people in a random photograph you have.
30. The first letters from three or more different street names you've passed by recently.

## Example Passwords

Example passwords that could be generated include:

- `ClctT9@347EleUmb`
- `1111ZXCwIndW137`

Each part of the password is generated based on the user’s inputs, making it easier to remember. For example:

- `ClctT` could be based on the phrase "Cats love climbing tall trees."
- `347` could come from the page number in a random book.
- `EleUmb` might be derived from combining random syllables from three different words.

## Usage

Once the project is running, users can:

1. **Select from the 30 different options** to input memorable information.
2. **Adjust the password length** using the input field or slider.
3. **Generate** a strong password by clicking the `Generate` button.
4. **Regenerate** the password as needed.
5. **Clear** the inputs if they wish to start over.
6. **Copy** the generated password to the clipboard for use.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and create a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
