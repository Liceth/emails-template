import React, { Component } from "react";
import { render } from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
import Example from "../../src";
import firstTemplate from "./secondTemplate.json";

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  }

  #demo {
    height: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`;

const Bar = styled.div`
  flex: 1;
  background-color: #4169e1;
  color: #fff;
  padding: 10px;
  display: flex;
  max-height: 40px;

  h1 {
    flex: 1;
    font-size: 16px;
    text-align: left;
  }

  button {
    flex: 1;
    padding: 10px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    background-color: #000;
    color: #fff;
    border: 0px;
    max-width: 150px;
    cursor: pointer;
  }
`;
function downloadJSON(data, filename, type = "text/plain") {
  // Create an invisible A element
  const a = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);

  // Set the HREF to a Blob representation of the data to be downloaded
  a.href = window.URL.createObjectURL(new Blob([data], { type }));

  // Use download attribute to set set desired file name
  a.setAttribute("download", fileName);

  // Trigger the download by simulating click
  a.click();

  // Cleanup
  window.URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
}
class Demo extends Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />

        <Container>
          <Bar>
            <h1>Template Email Editor (Demo)</h1>

            <button onClick={this.saveDesign}>Save Design</button>
            <button onClick={this.exportHtml}>Export HTML</button>
            <button>Download JSON</button>
          </Bar>

          <Example
            ref={editor => (this.editor = editor)}
            onLoad={this.onLoad}
            onDesignLoad={this.onDesignLoad}
          />
        </Container>
      </React.Fragment>
    );
  }

  onLoad = () => {
    // this.editor.addEventListener('onDesignLoad', this.onDesignLoad)
    this.editor.loadDesign(firstTemplate);
  };
  // downloadJSON = (data, filename, type = "text/plain") => {
  //   // Create an invisible A element
  //   const a = document.createElement("a");
  //   a.style.display = "none";
  //   document.body.appendChild(a);

  //   // Set the HREF to a Blob representation of the data to be downloaded
  //   a.href = window.URL.createObjectURL(new Blob([data], { type }));

  //   // Use download attribute to set set desired file name
  //   a.setAttribute("download", fileName);

  //   // Trigger the download by simulating click
  //   a.click();

  //   // Cleanup
  //   window.URL.revokeObjectURL(a.href);
  //   document.body.removeChild(a);
  // };

  saveDesign = () => {
    this.editor.saveDesign(design => {
      //console.log("saveDesign", design);
      //alert("Design JSON has been logged in your developer console.");
      console.log(JSON.stringify(design.body));
      var body = JSON.stringify(design.body);
      var filename = "template.json";
      downloadJSON(body, "template.json", "text/plain");
    });
  };

  exportHtml = () => {
    this.editor.exportHtml(data => {
      const { design, html } = data;
      console.log("exportHtml", html);
      alert("Output HTML has been logged in your developer console.");
    });
  };
  // downloadJSON = () =>{
  //   this.editor.saveDesign(design => {

  //   });
  // }

  onDesignLoad = data => {
    console.log("onDesignLoad", data);
  };
}

render(<Demo />, document.querySelector("#demo"));
