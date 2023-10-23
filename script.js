// import {OpenAI} from "openai";
const $inputFile = window.document.querySelector("#input-file");
const $outputFile = window.document.querySelector("#output-file");


console.log("hello");

const selected_Files = window.document.querySelector("#files");

console.log({ selected_Files });
let fileType = '';
selected_Files.addEventListener("change", (e) => {
  e.preventDefault();
  const { files } = e.target;
    fileType =
    e.target.files[0].name.split(".")[files[0].name.split(".").length - 1];
  console.log({ fileType });
  console.log({ files: e.target.files });


fr.readAsText(e.target.files[0])
  

  // const files = new Array();

  // for(let i = 0; i < e.target.files.length; i++){
  //     fr.readAsText(e.target.files[i]);
  // }
});

const fr = new FileReader();

fr.addEventListener("loadend", (file) => {
    $inputFile.textContent = file.target.result;
    checkDefect(file.target.result, fileType);
});

console.log("open ai");

function checkDefect(data, file_type) {
    console.log({data, file_type});
  try {
    fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "content-type": "application/json",
        Authorization:
          "Bearer API_KEY",
      },
      method: "POST",
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a computer program that finds defects in a code provided in "+file_type+" language. State the defect and re-write the corrected code. Note some of the codes provided may be part of a whole project.  ",
          },
          {
            role: "user",
            content: `  
                            ${data}
        
                        `,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res })
        $outputFile.textContent = res.choices[0].message.content;
      })
      .catch();
  } catch (e) {
    console.log("Failed to start request due to ", e);
  }
}
