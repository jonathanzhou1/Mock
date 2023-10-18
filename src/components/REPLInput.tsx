import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { REPLLoad } from "./REPLLoad";
import { REPLSearchNoCol, REPLSearchWithCol } from "./REPLSearch";

//input props
interface REPLInputProps {
  //history stores all the previous commands and outputs
  history: [string, string[][]][];
  setHistory: Dispatch<SetStateAction<[string, string[][]][]>>;
  //validParsedData stores whether the parsed data after a load is valid
  validParsedData: boolean;
  setValidParsedData: Dispatch<SetStateAction<boolean>>;
  //parsedData stores the parsed data after a load
  parsedData: string[][];
  setParsedData: Dispatch<SetStateAction<string[][]>>;
  //verbose keeps track of the mode of the history -- verbose or brief
  verbose: boolean;
  setVerbose: Dispatch<SetStateAction<boolean>>;
}

export function REPLInput(props: REPLInputProps) {
  //store the entire inputted command
  const [commandString, setCommandString] = useState<string>("");

  //keep track of number of commands submitted
  const [count, setCount] = useState<number>(0);

  //on button click
  function handleSubmit(commandString: string) {
    let strings = commandString.split(" ");
    //process the command
    let command = strings[0];

    let commandResponse = commandString;

    //switching mode
    if (command === "mode") {
      if (props.verbose === true) {
        props.setVerbose(false);
      } else {
        props.setVerbose(true);
      }
      props.setHistory([
        ...props.history,
        [commandResponse, [["Successfully switched mode"]]],
      ]);
    }
    //loading file
    else if (command === "load_file") {
      //when splitting on spaces, the first token should be the command
      let filepath = commandString.split(" ")[1];
      //if successful load, success is true. otherwise, it's false
      let success = REPLLoad(
        props.setValidParsedData,
        props.setParsedData,
        filepath,
        false // change this to something that depends on the string split
      );
      //return clear message about success or failure
      if (success === true) {
        props.setHistory([
          ...props.history,
          [commandResponse, [["CSV successfully loaded"]]],
        ]);
      } else {
        props.setHistory([
          ...props.history,
          [
            commandResponse,
            [["CSV NOT successfully loaded -- invalid filepath"]],
          ],
        ]);
      }
      //viewing the parsed CSV data
    } else if (command === "view") {
      //if unsuccessful load or no load called, return clear message
      if (props.validParsedData === false) {
        props.setHistory([
          ...props.history,
          [
            commandResponse,
            [["No CSV loaded -- please call load_file first!"]],
          ],
        ]);
      } else {
        //successful -> show it!
        props.setHistory([
          ...props.history,
          [commandResponse, props.parsedData],
        ]);
      }
    }
    //searching the parsed data
    else if (command === "search") {
      //input parameters should be surrounded by {}
      let searchString = commandString.split("{");

      //parse through and retrieve the parameters
      for (let i = 0; i < searchString.length; i++) {
        searchString[i] = searchString[i].replace("}", "");
      }

      //if no successful load for a CSV yet, return error
      if (props.validParsedData === false) {
        props.setHistory([
          ...props.history,
          [
            commandResponse,
            [["No CSV loaded -- please call load_file first!"]],
          ],
        ]);
      }
      //if number of parameters is not correct, return parameter illformed error
      else if (searchString.length !== 2 && searchString.length !== 3) {
        props.setHistory([
          ...props.history,
          [commandResponse, [["Invalid Format of Parameters"]]],
        ]);
      }
      //otherwise, good input and do the search
      else {
        //initialize data
        let value = "";
        let columnIdentifier = "";
        let searchResults = [];

        //check which method to call based on whether a column identifier is given
        if (searchString.length === 2) {
          //no col identifier
          value = searchString[1];
          console.log(value);
          searchResults = REPLSearchNoCol(props.parsedData, value);
        } else {
          //given col identifier
          columnIdentifier = searchString[1];
          value = searchString[2];
          searchResults = REPLSearchWithCol(
            props.parsedData,
            columnIdentifier,
            value
          );
        }

        if (searchResults.length === 0) {
          //if no rows are found, say so
          props.setHistory([
            ...props.history,
            [commandResponse, [["No matching rows found"]]],
          ]);
        } else {
          //print out the found rows
          props.setHistory([
            ...props.history,
            [commandResponse, searchResults],
          ]);
        }
      }
    }

    //increment count and reset command string
    setCount(count + 1);
    setCommandString("");
  }

  return (
    //input box that user types into and submit button that calls handleSubmit function
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={() => handleSubmit(commandString)}>
        Submitted {count} times
      </button>
    </div>
  );
}
