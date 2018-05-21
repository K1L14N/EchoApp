"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var catchError_1 = require("../operators/catchError");
/**
 * Catches errors on the observable to be handled by returning a new observable or throwing an error.
 *
 * <img src="./img/catch.png" width="100%">
 *
 * @example <caption>Continues with a different Observable when there's an error</caption>
 *
 * Observable.of(1, 2, 3, 4, 5)
 *   .map(n => {
 * 	   if (n == 4) {
 * 	     throw 'four!';
 *     }
 *	   return n;
 *   })
 *   .catch(err => Observable.of('I', 'II', 'III', 'IV', 'V'))
 *   .subscribe(x => console.log(x));
 *   // 1, 2, 3, I, II, III, IV, V
 *
 * @example <caption>Retries the caught source Observable again in case of error, similar to retry() operator</caption>
 *
 * Observable.of(1, 2, 3, 4, 5)
 *   .map(n => {
 * 	   if (n === 4) {
 * 	     throw 'four!';
 *     }
 * 	   return n;
 *   })
 *   .catch((err, caught) => caught)
 *   .take(30)
 *   .subscribe(x => console.log(x));
 *   // 1, 2, 3, 1, 2, 3, ...
 *
 * @example <caption>Throws a new error when the source Observable throws an error</caption>
 *
 * Observable.of(1, 2, 3, 4, 5)
 *   .map(n => {
 *     if (n == 4) {
 *       throw 'four!';
 *     }
 *     return n;
 *   })
 *   .catch(err => {
 *     throw 'error in source. Details: ' + err;
 *   })
 *   .subscribe(
 *     x => console.log(x),
 *     err => console.log(err)
 *   );
 *   // 1, 2, 3, error in source. Details: four!
 *
 * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
 *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
 *  is returned by the `selector` will be used to continue the observable chain.
 * @return {Observable} An observable that originates from either the source or the observable returned by the
 *  catch `selector` function.
 * @method catch
 * @name catch
 * @owner Observable
 */
function _catch(selector) {
    return catchError_1.catchError(selector)(this);
}
exports._catch = _catch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHNEQUFvRTtBQUVwRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBERztBQUNILGdCQUFrRCxRQUFpRTtJQUNqSCxNQUFNLENBQUMsdUJBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQyxDQUFDO0FBRkQsd0JBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmFibGVJbnB1dCB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciBhcyBoaWdoZXJPcmRlciB9IGZyb20gJy4uL29wZXJhdG9ycy9jYXRjaEVycm9yJztcblxuLyoqXG4gKiBDYXRjaGVzIGVycm9ycyBvbiB0aGUgb2JzZXJ2YWJsZSB0byBiZSBoYW5kbGVkIGJ5IHJldHVybmluZyBhIG5ldyBvYnNlcnZhYmxlIG9yIHRocm93aW5nIGFuIGVycm9yLlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvY2F0Y2gucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+Q29udGludWVzIHdpdGggYSBkaWZmZXJlbnQgT2JzZXJ2YWJsZSB3aGVuIHRoZXJlJ3MgYW4gZXJyb3I8L2NhcHRpb24+XG4gKlxuICogT2JzZXJ2YWJsZS5vZigxLCAyLCAzLCA0LCA1KVxuICogICAubWFwKG4gPT4ge1xuICogXHQgICBpZiAobiA9PSA0KSB7XG4gKiBcdCAgICAgdGhyb3cgJ2ZvdXIhJztcbiAqICAgICB9XG4gKlx0ICAgcmV0dXJuIG47XG4gKiAgIH0pXG4gKiAgIC5jYXRjaChlcnIgPT4gT2JzZXJ2YWJsZS5vZignSScsICdJSScsICdJSUknLCAnSVYnLCAnVicpKVxuICogICAuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICogICAvLyAxLCAyLCAzLCBJLCBJSSwgSUlJLCBJViwgVlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlJldHJpZXMgdGhlIGNhdWdodCBzb3VyY2UgT2JzZXJ2YWJsZSBhZ2FpbiBpbiBjYXNlIG9mIGVycm9yLCBzaW1pbGFyIHRvIHJldHJ5KCkgb3BlcmF0b3I8L2NhcHRpb24+XG4gKlxuICogT2JzZXJ2YWJsZS5vZigxLCAyLCAzLCA0LCA1KVxuICogICAubWFwKG4gPT4ge1xuICogXHQgICBpZiAobiA9PT0gNCkge1xuICogXHQgICAgIHRocm93ICdmb3VyISc7XG4gKiAgICAgfVxuICogXHQgICByZXR1cm4gbjtcbiAqICAgfSlcbiAqICAgLmNhdGNoKChlcnIsIGNhdWdodCkgPT4gY2F1Z2h0KVxuICogICAudGFrZSgzMClcbiAqICAgLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqICAgLy8gMSwgMiwgMywgMSwgMiwgMywgLi4uXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+VGhyb3dzIGEgbmV3IGVycm9yIHdoZW4gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHRocm93cyBhbiBlcnJvcjwvY2FwdGlvbj5cbiAqXG4gKiBPYnNlcnZhYmxlLm9mKDEsIDIsIDMsIDQsIDUpXG4gKiAgIC5tYXAobiA9PiB7XG4gKiAgICAgaWYgKG4gPT0gNCkge1xuICogICAgICAgdGhyb3cgJ2ZvdXIhJztcbiAqICAgICB9XG4gKiAgICAgcmV0dXJuIG47XG4gKiAgIH0pXG4gKiAgIC5jYXRjaChlcnIgPT4ge1xuICogICAgIHRocm93ICdlcnJvciBpbiBzb3VyY2UuIERldGFpbHM6ICcgKyBlcnI7XG4gKiAgIH0pXG4gKiAgIC5zdWJzY3JpYmUoXG4gKiAgICAgeCA9PiBjb25zb2xlLmxvZyh4KSxcbiAqICAgICBlcnIgPT4gY29uc29sZS5sb2coZXJyKVxuICogICApO1xuICogICAvLyAxLCAyLCAzLCBlcnJvciBpbiBzb3VyY2UuIERldGFpbHM6IGZvdXIhXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gc2VsZWN0b3IgYSBmdW5jdGlvbiB0aGF0IHRha2VzIGFzIGFyZ3VtZW50cyBgZXJyYCwgd2hpY2ggaXMgdGhlIGVycm9yLCBhbmQgYGNhdWdodGAsIHdoaWNoXG4gKiAgaXMgdGhlIHNvdXJjZSBvYnNlcnZhYmxlLCBpbiBjYXNlIHlvdSdkIGxpa2UgdG8gXCJyZXRyeVwiIHRoYXQgb2JzZXJ2YWJsZSBieSByZXR1cm5pbmcgaXQgYWdhaW4uIFdoYXRldmVyIG9ic2VydmFibGVcbiAqICBpcyByZXR1cm5lZCBieSB0aGUgYHNlbGVjdG9yYCB3aWxsIGJlIHVzZWQgdG8gY29udGludWUgdGhlIG9ic2VydmFibGUgY2hhaW4uXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBvYnNlcnZhYmxlIHRoYXQgb3JpZ2luYXRlcyBmcm9tIGVpdGhlciB0aGUgc291cmNlIG9yIHRoZSBvYnNlcnZhYmxlIHJldHVybmVkIGJ5IHRoZVxuICogIGNhdGNoIGBzZWxlY3RvcmAgZnVuY3Rpb24uXG4gKiBAbWV0aG9kIGNhdGNoXG4gKiBAbmFtZSBjYXRjaFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jYXRjaDxULCBSPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBzZWxlY3RvcjogKGVycjogYW55LCBjYXVnaHQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGVJbnB1dDxSPik6IE9ic2VydmFibGU8VCB8IFI+IHtcbiAgcmV0dXJuIGhpZ2hlck9yZGVyKHNlbGVjdG9yKSh0aGlzKTtcbn1cbiJdfQ==