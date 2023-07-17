import express from "express";
import db from "./db.js";
const app = express();
console.log(db);
const homepage = `
<html>
    <H1>hello world</H1>
    <a href="/">Go To home</a>
    <a href="/projects">projects (doesnt exist yet)</a> 
    <a href="/contact">contact (doesnt exist yet)</a> 
    <a href="/resume">resume (doesnt exist yet)</a> 
    <a href="/about">about</a>
    <div id="list"></div>
    <script>
      fetch("/search?name=pasta")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const list = document.getElementById("list");
          data.forEach((restaurant) => {
            const div = document.createElement("div");
            div.innerHTML = restaurant.name  + " (" + restaurant.ethnicity + ") "
            list.appendChild(div);
          });
        });
    </script>
</html>
`;

// we can make some routes
// i.e "/", "/about", "/settings", "/json"

// route 1: returns some html
app.get("/", (req, res) => res.send(homepage));

// route 2: returns some text
app.get("/about", (req, res) => res.send("Welcom to my About Section"));

// route 3: returns JSON
app.get("/user-data", (req, res) => res.send({ userName: "Faisal Rehman" }));

// route 4: takes a search and return info about that search

//https:www.google.com/search?q=cats
// app.get("/search", (req, res) => res.send("you send a request to /search"));

// route 4 takes a search and return info about that search
// https://www.google.com/search?q=cats
// QUERY STRING containing QUERY PARAMETERS
// ?diet=vegan&location=berlin&style=sudanese
// app.get("/search", (req, res) => {
//   console.log("the received query parameters are ", req.query);
//   res.send("sorry there are not restaurants matching thats criteria");
// });
app.get("/search", (req, res) => {
  console.log("the received query parameters are ", req.query);
  const matchingRestaurants = db.filter((restaurant) => {
    const namePartiallyMatches = restaurant.name
      .toLowerCase()
      .includes(req.query.name.toLowerCase());
    return namePartiallyMatches;
  });
  res.send(
    matchingRestaurants.length > 0
      ? matchingRestaurants
      : "sorry there are no restaurants matching your criteria"
  );
});

app.listen(9000, () => console.log("Server is running on port: 9000"));
