import { Dispatch, SetStateAction, useState } from "react";
import {
  numberCSV,
  mixedCSV,
  headerCSV,
  incomeDataCSV,
  doubleCSV,
} from "../MockData/mockedJson";
import {
  search1,
  incomeDataOutput,
  headerCSVOutput,
  doubleOutput,
  noValue,
  numberOutput,
  isaacYiOutput,
} from "../MockData/mockedSearches";
import { ImportsNotUsedAsValues } from "typescript";

//return the results as string[][] -- empty array if no rows
//function called if search called with no column identifier
export function REPLSearchNoCol(parsedData: string[][], value: string) {
  if (parsedData === mixedCSV && value === "string") {
    return search1;
  }
  if (parsedData === incomeDataCSV && value === "providence") {
    return incomeDataOutput;
  }
  if (parsedData === headerCSV && value === "18") {
    return headerCSVOutput;
  }
  if (parsedData === headerCSV && value === "isaac yi") {
    return isaacYiOutput;
  }
  if (parsedData === doubleCSV && value === "hi") {
    return doubleOutput;
  }
  if (parsedData === mixedCSV && value === "i") {
    return noValue;
  }

  return [];
}

//If a column identifier is given (mocked)
export function REPLSearchWithCol(
  parsedData: string[][],
  column: string,
  value: string
) {
  if (parsedData === headerCSV && value === "isaac yi" && column === "2") {
    return noValue;
  }
  if (parsedData === headerCSV && value === "isaac yi" && column === "0") {
    return isaacYiOutput;
  }
  if (parsedData === headerCSV && value === "isaac yi" && column === "name") {
    return isaacYiOutput;
  }
  if (parsedData === headerCSV && value === "isaac yi" && column === "age") {
    return noValue;
  }
  if (parsedData === doubleCSV && value === "hi" && column == "0") {
    return doubleOutput;
  }
  if (parsedData === numberCSV && value === "1" && column == "1") {
    return numberOutput;
  }
  return [];
}
