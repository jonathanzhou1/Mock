import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

export default function REPL() {
  //Add some kind of shared state that holds all the outputs submitted.
  const [history, setHistory] = useState<[string, string[][]][]>([]);
  //shared state that holds the parsed CSV data
  const [parsedData, setParsedData] = useState<string[][]>([]);
  //shared state that lets us know whether the parsed CSV data is wellformed or not
  const [validParsedData, setValidParsedData] = useState<boolean>(false);
  //shared state that lets us know whether the parsed CSV data is wellformed or not
  const [verbose, setVerbose] = useState<boolean>(false);
  return (
    //descriptions of input given in other files
    <div className="repl">
      <REPLHistory history={history} verbose={verbose} />
      <hr></hr>
      <REPLInput
        history={history}
        setHistory={setHistory}
        validParsedData={validParsedData}
        setValidParsedData={setValidParsedData}
        parsedData={parsedData}
        setParsedData={setParsedData}
        verbose={verbose}
        setVerbose={setVerbose}
      />
    </div>
  );
}
