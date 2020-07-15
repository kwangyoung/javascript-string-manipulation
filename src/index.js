// Create a tagged template lf`...` that formats text using LF line endings.
var lf = (strings, ...values) => {
  let resultString = '';

  for (let i = 0; i < strings.length || i < values.length; i++) {
    if (i < strings.length) {
      resultString += transformLineEnding(strings[i], LineEndings.LF);
    }
    if (i < values.length && values[i]) {

      resultString += values[i][disableConverter] ?
        values[i].toString() :
        transformLineEnding(values[i].toString(), LineEndings.LF);
    }
  }
  return resultString;
};

// Create a tagged template cr`...` that formats text using CR line endings.
var cr = (strings, ...values) => {
  let resultString = '';

  for (let i = 0; i < strings.length || i < values.length; i++) {
    if (i < strings.length) {
      resultString += transformLineEnding(strings[i], LineEndings.CR);
    }
    if (i < values.length && values[i]) {

      resultString += values[i][disableConverter] ?
        values[i].toString() :
        transformLineEnding(values[i].toString(), LineEndings.CR);
    }
  }
  return resultString;
};

// Create a tagged template crlf`...` that formats text using CRLF line endings.
var crlf = (strings, ...values) => {
  let resultString = '';

  for (let i = 0; i < strings.length || i < values.length; i++) {
    if (i < strings.length) {
      resultString += transformLineEnding(strings[i], LineEndings.CRLF);
    }
    if (i < values.length && values[i]) {

      resultString += values[i][disableConverter] ?
        values[i].toString() :
        transformLineEnding(values[i].toString(), LineEndings.CRLF);
    }
  }
  return resultString;
};

const transformLineEnding = (string, lineEnding) => {
  const { replaceCR, replaceLF, replaceCRLF } = LineEndingReplacements;
  string = (string != null ? string.toString() : "");

  if (lineEnding === LineEndings.CR) {
    string = replaceCRLF(string, "\r");
    string = replaceLF(string, "\r");
  } else if (lineEnding === LineEndings.LF) {
    string = replaceCRLF(string, "\n");
    string = replaceCR(string, "\n");
  } else if (lineEnding === LineEndings.CRLF) {
    string = replaceCR(string, "\r\n");
    string = replaceLF(string, "\r\n");
  }
  return string;
};

const CR = Symbol.for("CR");
const LF = Symbol.for("LF");
const CRLF = Symbol.for("CRLF");

const LineEndings = {
  CR: CR,
  LF: LF,
  CRLF: CRLF
};

const disableConverter = Symbol.for("crlf-converter-disable");

const LineEndingReplacements = {
  replaceCR: (string, newEnding) =>
    string.replace(/(\r+)([^\n]|$)/g, (_match, p1, p2) => {
      return `${newEnding.repeat(p1.length)}${p2}`;
    }),

  replaceLF: (string, newEnding) =>
    string.replace(/([^\r]|^)(\n+)/g, (_match, p1, p2) => {
      return `${p1}${newEnding.repeat(p2.length)}`;
    }),

  replaceCRLF: (string, newEnding) => string.replace(/\r\n/g, `${newEnding}`)
};

module.exports = {
  lf,
  cr,
  crlf,
  LineEndings,
  transformLineEnding,
  disableConverter
};
