# Calculator by Samuel Jacobs

![deployed-website](./assets/screenshot.png)

## Project Overview
The purpose of this project was to develop JavaScript skills, particularly pertaining to interaction with the DOM and the use of functions.

## Design Approach

The design of the calculator integrated skills including UI Design, HTML, CSS, SCSS, and, mainly, JavaScript.

### HTML and SCSS/CSS
The Block Element Modifier (B.E.M.) classing approach for elements was utilised. The CSS/SCSS used display: grid to organise the calculator elements. The buttons were organised using flexbox.

A mobile-first approach was taken to designing the calculator, ensuring reponsiveness, hence a consistency of experience regardless of the platform through which the calculator is accessed.

Throughout the project, GitHub was used for version control.

### JavaScript

Query selectors were used to obtain the necessary assets required from the HTML.

A series of functions were divised to control the calculator function.
A function called "checkButtonType" was used to determine what kind of button was clicked and what should happen as a result of the click event.

For each type of button, different functions were employed.

Edge cases were assessed and accounted for. For example, if the prefacing operator to the top line of the display was removed using the delete key and followed with by clicking on any number, the user receives visual feedback in the form of changing button colours to demonstrate the next button pressed should be an operator.


## Links to project
### Deployed Site
https://samueljacobs98.github.io/calculator-project/

### GitHub Repo
https://github.com/samueljacobs98/calculator-project