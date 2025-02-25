/**************************************
 * MODULES
 **************************************/
/* How to Get a Variable Out of a File
  1. Add a type="module" attribute to the script tag in the HTML file
  2. Export - choose which variables can be accessed outside of the file
  3. Import - go to the file where you want to use the variable and import it
*/

/* Benefits of Modules
  - Helps avoid naming conflicts (can also use import { variableName as newName } syntax to rename imported variables, further avoiding conflicts)
  - Don't have to worry about the order of script tags in the HTML file
  - Keeps code organized (see line above)
  - Makes code easier to maintain
  - Makes code easier to reuse
*/
export const cart = [];
