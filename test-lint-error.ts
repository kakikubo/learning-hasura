// This file intentionally contains linting errors for CI testing

const unusedVariable = "This should trigger a linting error";

function testFunction() {
    debugger; // This should also trigger an error
    console.log("test");
}

export default testFunction;
