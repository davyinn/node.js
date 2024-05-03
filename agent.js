import { response } from "express";

let url = window.location.search;
let id = new URLSearchParams(url).get("id");

fetch(`http://localhost:3000/agentis/${id}`)
  .then((response) => response.json())
  .then((data) => {
    let agent = document.querySelector("#agent");
    agent.innerHTML = `
    <small>${data.id}</small>
    <h1>${data.name}</h1>
    <a href="index.html">Back</a>`;
  });
