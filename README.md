# Mock
## GitHub Repo Link: https://github.com/cs0320-f23/mock-iyi3-jdzhou/tree/main
### Team Members
### Jonathan Zhou, CS Login: jdzhou
### Isaac Yi, CS Login: iyi3

> [!WARNING]
> **Estimated Total Completion Time: 40 hours total**

<hr>

## Design Choices: 
We used the Gear up code as a starting template for the front-end user interaction interface, and then modified from there. We decided to do the initial input command parsing in 
REPLCommand, and would then for each command, we created a separate class to do the functionality for that. Because we don't have a backend yet, we created mock data for the
loading of the CSV (parsing) and the searching of the CSV. We also decided to make all the printing of the output and commands (depending on mode) in REPLHistory. For the user's
clarity, we decided to format the result output in a table because that pairs very well with the CSV output. A lot of the functionality required shared state, so we used react's 
getters and setters to share state throughout the different components, such as the parsedData, booleans checking the wellformedness of data, and the history of outputs and commands.

## Errors/Bugs:
None remaining that we know of

## Tests:
We had tests for all the different commands: mode, search, load, and view. We made sure to test general functionality as well as edge cases, failures, and error handling in separate
files for clarity and ease of understandability.
We also made sure to create integration tests to check that the shared states are being properly updated throughout the different command calls. For instance, testing things like
Load, view, load, view; load, search, search; and many other combinations.

## Instructions on using the program:
*General Functionality:*
Run *npm start* to start the live server, then type into the input box and press the button to submit a command.
Possible commands:
"mode" - changes between verbose and brief modes
"load_file (filepath)" - loads the CSV file
"view" - prints out the loaded CSV
"search (column {optional}) (targetString) - searches for the target string within the loaded CSV, with a column identifier if inputted, but is optional

*Tests:*
Run the playwright tests with the command *npx playwright test*
