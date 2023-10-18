import { Dispatch, SetStateAction, useState } from "react";
import { setData } from "../MockData/mockedJson";

export function REPLLoad(
  setValidParsedData: Dispatch<SetStateAction<boolean>>,
  setParsedData: Dispatch<SetStateAction<string[][]>>,
  filepath: string,
  headers: boolean //not currently used, but here for the next project for ease :)
) {
  if (!filepath) {
    //if filepath is empty, don't even try it buddy boy
    setValidParsedData(false);
    return false;
  } else {
    //if valid should automatically set the parsed data
    if (setData(setParsedData, filepath)) {
      setValidParsedData(true);
      return true;
    } else {
      //if invalid, then turn wellformedness state to false
      setValidParsedData(false);
      return false;
    }
  }
}
