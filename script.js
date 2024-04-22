// let form = document.querySelector("form");
// let resultDiv = document.querySelector(".result");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   getWordInfo(form.elements[0].value);
// });

// const getWordInfo = async (word) => {
//   try{
//   let response = await fetch(
//     `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
//   );
//   let data = await response.json();
//   let definitions = data[0].meanings[0].definitions[0];


//   resultDiv.innerHTML = `<h3><strong>word: </strong> ${data[0].word}</h3>
// <p>${data[0].meanings[0].partOfSpeech}</p>

// <p><strong>Meaning:</strong>${definitions.definition === undefined ? " Not found" : definitions.definition}</p>

// <p><strong>Example:</strong>${definitions.example || "Not Found"}</p>

// <span><strong>Antonyms: </strong></span>
// `;

//   if(!definitions.antonyms || definitions.antonyms.length == 0){
//     resultDiv.innerHTML +=`<span>Not found</span>`;
//   }else{
//         resultDiv +=`<ul>`    

//       for(let i=0; i<definitions.antonyms.length; i++){

//         resultDiv.innerHTML +=`<li>${definitions.antonyms[i]}</li>`
      
//       }
//       resultDiv +=`</ul>`
      
//   }
//   //Adding read more button 
//   resultDiv.innerHTML += `<;><a href="${data[0].sourceUrls} target"_blank">Read more..</a></div>`;
// }
//   catch (error) {
//     console.error('Sorry , word could not found...:', error);
//     resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
//   }

//   const clearResultDiv = () => {
//     resultDiv.innerHTML = '';
//   }
// };

let form = document.querySelector("form");
let resultDiv = document.querySelector(".result");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word) => {
  try {
    let response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    let data = await response.json();
    
    if (!response.ok || data.length === 0) {
      throw new Error('Word not found');
    }
    
    let definitions = data[0].meanings[0].definitions[0];

    resultDiv.innerHTML = `<h3><strong>Word:</strong> ${data[0].word}</h3>
<p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
<p><strong>Meaning:</strong> ${definitions.definition || "Not found"}</p>
<p><strong>Example:</strong> ${definitions.example || "Not found"}</p>
<span><strong>Antonyms: </strong></span>
`;

    if (!definitions.antonyms || definitions.antonyms.length === 0) {
      resultDiv.innerHTML += `<span>Not found</span>`;
    } else {
      resultDiv.innerHTML += `<ul>`;
      for (let i = 0; i < definitions.antonyms.length; i++) {
        resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`;
      }
      resultDiv.innerHTML += `</ul>`;
    }

    resultDiv.innerHTML += `<p><span><strong>Synonyms: </strong></span></p>`;
    if (!definitions.synonyms || definitions.synonyms.length === 0) {
      resultDiv.innerHTML += `<span>Not found</span>`;
    } else {
      resultDiv.innerHTML += `<ul>`;
      for (let i = 0; i < definitions.synonyms.length; i++) {
        resultDiv.innerHTML += `<li>${definitions.synonyms[i]}</li>`;
      }
      resultDiv.innerHTML += `</ul>`;
    }
    
    // Adding read more button 
    let wikipediaLink = `https://en.wikipedia.org/wiki/${word}`;
    resultDiv.innerHTML += `<div><button><a href="${wikipediaLink}" target="_blank">Read more..</a></button></div>`;

  } catch (error) {
    console.error('Sorry, word could not be found:', error);
    resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  }
};

// Function to clear resultDiv when user inputs a new word
const clearResultDiv = () => {
  resultDiv.innerHTML = '';
};