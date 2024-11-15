// Converted from lib/helpers.js

import TypesEnum from './constants/types.ts';

// 'use strict';

/*

  this seems to be not only shorter, but faster than
  string.replace(/\\/g, '\\\\').
            replace(/\u0008/g, '\\b').
            replace(/\t/g, '\\t').
            replace(/\n/g, '\\n').
            replace(/\f/g, '\\f').
            replace(/\r/g, '\\r').
            replace(/'/g, '\\\'').
            replace(/"/g, '\\"');
  or string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
  see http://jsperf.com/string-escape-regexp-vs-json-stringify
  */
export function srcEscape(str: string): string {
  return JSON.stringify({
    [str]: 1,
  }).slice(1, -3);
}

// Disabled cardinal since it doesn't fit well with ESM
//
// let highlightFn;
// let cardinalRecommended = false;
// try {
//   // the purpose of this is to prevent projects using Webpack from displaying a warning during runtime if cardinal is not a dependency
//   const REQUIRE_TERMINATOR = '';
//   highlightFn = require(`cardinal${REQUIRE_TERMINATOR}`).highlight;
// } catch (err) {
//   highlightFn = (text) => {
//     if (!cardinalRecommended) {
//       // eslint-disable-next-line no-console
//       console.log('For nicer debug output consider install cardinal@^2.0.0');
//       cardinalRecommended = true;
//     }
//     return text;
//   };
// }

/**
 * Prints debug message with code frame.
 */
export function printDebugWithCode(msg: string, code: string): void {
  // eslint-disable-next-line no-console
  console.log(`\n\n${msg}:\n`);
  // eslint-disable-next-line no-console
  console.log(`${code}\n`);
}

/**
 * checks whether the `type` is in the `list`
 */
export function typeMatch(type: keyof typeof TypesEnum, list: TypesEnum[], Types: typeof TypesEnum): boolean {
  if (Array.isArray(list)) {
    return list.some((t) => type === Types[t]);
  }

  return !!list;
}

export const privateObjectProps = new Set([
  '__defineGetter__',
  '__defineSetter__',
  '__lookupGetter__',
  '__lookupSetter__',
  '__proto__',
]);

export function fieldEscape(field: string): string {
  if (privateObjectProps.has(field)) {
    throw new Error(
      `The field name (${field}) can't be the same as an object's private property.`,
    );
  }

  return srcEscape(field);
};
