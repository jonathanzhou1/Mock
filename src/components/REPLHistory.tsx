import "../styles/main.css";
import React from "react";

interface REPLHistoryProps {
  //history stores previous commands and outputs
  history: [string, string[][]][];
  //verbose tells us whether to show the command or not
  verbose: boolean;
}

//REPLHistory will go through and print out the history as a table format
//Command only printed if verbose is true
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.history.map((tuple, index) => (
        <div className={"output" + index}>
          {props.verbose && <p>Inputted Command: {tuple[0]}</p>}
          <table>
            <tbody>
              {tuple[1].map((row, rowIndex) => (
                <tr>
                  {row.map((cellData, cellIndex) => (
                    <td className={"cell" + cellIndex}>{cellData}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
