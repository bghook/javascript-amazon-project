/**************************************
 * BACKEND
 **************************************/
// The backend manages the data of an app or website
// Backend is responsible for storing/retrieving data and performing operations on the data
// Backend manages the business logic of an app or website

// So how does the frontend (our computer) send information to the backend?
// When 2 computers are connected to the Internet, they can send messages to each other via HTTP (Hypertext Transfer Protocol)
// We can attach information to the HTTP message, such as our Amazon order
// When Amazon's backend receives this HTTP message, Amazon will know what we ordered

// To send an HTTP message, we'll use a built-in JavaScript class called XMLHttpRequest
// Types of messages (requests) we can send to the backend, which will then send a message back to us (response):
//  - GET: used to retrieve data from the backend
//  - POST: used to send data to the backend
//  - PUT: used to update data on the backend
//  - DELETE: used to delete data on the backend
// When we type a URL into the browser, it actually sends a GET request to that URL
// When the browser receives the response, it displays the website
const xhr = new XMLHttpRequest(); // Creates a new HTTP message (request) to send to the backend

// After sending the HTTP message, we need to wait for the backend to respond
// We can listen for the 'load' event to know when the backend has responded
// The 'load' event is triggered when the HTTP message has been sent and the backend has responded
// We refer to the xhr.send() method as an ASYNCHRONOUS operation because it doesn't block the rest of our code from running while we wait for the backend to respond
xhr.addEventListener("load", () => {
  // Because this function runs AFTER the response loads, we can access the response data here
  xhr.response; // The response data is stored in the 'response' property of the xhr object
  console.log(xhr.response);
});

xhr.open("GET", "https://supersimplebackend.dev"); // The open method takes 2 parameters: type of HTTP message, where to send the HTTP message (URL)
xhr.send(); // Sends the HTTP message to the backend

// We can send different messages (requests) to the backend using URL Paths
// The URL Path is the part of the URL that comes after the domain name
// Example 1: In the URL https://supersimplebackend.dev/hello, the URL Path is '/hello'
// Example 2: In the URL https://supersimplebackend.dev/products/first, the URL Path is '/products/first'
// Example 3: In the URL https://supersimplebackend.dev, the URL Path is just '/'
// Each URL path will give us a different response!
// However, a backend only supports a certain set of URL paths!
// If we send a request to a URL path that is not supported, the backend will respond with an error
// The error will contain a STATUS CODE such as 404 (Not Found) or 500 (Internal Server Error)
// If the status code starts with a 4 or 5, it means the response failed
//  - Status code starts with 4: The error is on the client side (our computer)
//  - Status code starts with 5: The error is on the server side (backend's computer)
// We can access the status code in the 'status' property of the xhr object
// A status code starting with 2 means the response was successful
// Some backends provide documentation that lists all the URL paths we can use

/**************************************
 * BACKEND API
 **************************************/
// The list of all the backend supported URL paths is called an API (Application Programming Interface)
// An API is like a menu at a restaurant - it lists all the ways we can interact with the backend
// The API will list the URL paths we can use and what data we can send/receive
// The backend can respond with different types of data, such as text, JSON, HTML, or images
// The type of data the backend responds with is called the CONTENT TYPE
// JSON (JavaScript Object Notation) is a common format for sending/receiving data
