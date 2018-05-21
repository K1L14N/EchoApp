"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
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
 * @name catchError
 */
function catchError(selector) {
    return function catchErrorOperatorFunction(source) {
        var operator = new CatchOperator(selector);
        var caught = source.lift(operator);
        return (operator.caught = caught);
    };
}
exports.catchError = catchError;
var CatchOperator = /** @class */ (function () {
    function CatchOperator(selector) {
        this.selector = selector;
    }
    CatchOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
    };
    return CatchOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var CatchSubscriber = /** @class */ (function (_super) {
    __extends(CatchSubscriber, _super);
    function CatchSubscriber(destination, selector, caught) {
        var _this = _super.call(this, destination) || this;
        _this.selector = selector;
        _this.caught = caught;
        return _this;
    }
    // NOTE: overriding `error` instead of `_error` because we don't want
    // to have this flag this subscriber as `isStopped`. We can mimic the
    // behavior of the RetrySubscriber (from the `retry` operator), where
    // we unsubscribe from our source chain, reset our Subscriber flags,
    // then subscribe to the selector result.
    CatchSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var result = void 0;
            try {
                result = this.selector(err, this.caught);
            }
            catch (err2) {
                _super.prototype.error.call(this, err2);
                return;
            }
            this._unsubscribeAndRecycle();
            this.add(subscribeToResult_1.subscribeToResult(this, result));
        }
    };
    return CatchSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0Y2hFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhdGNoRXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxzREFBcUQ7QUFDckQsK0RBQThEO0FBRzlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdERztBQUNILG9CQUFpQyxRQUFpRTtJQUNoRyxNQUFNLENBQUMsb0NBQW9DLE1BQXFCO1FBQzlELElBQU0sUUFBUSxHQUFHLElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUF1QixDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQU5ELGdDQU1DO0FBRUQ7SUFHRSx1QkFBb0IsUUFBcUU7UUFBckUsYUFBUSxHQUFSLFFBQVEsQ0FBNkQ7SUFDekYsQ0FBQztJQUVELDRCQUFJLEdBQUosVUFBSyxVQUF5QixFQUFFLE1BQVc7UUFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxlQUFlLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7QUFFRDs7OztHQUlHO0FBQ0g7SUFBb0MsbUNBQXlCO0lBQzNELHlCQUFZLFdBQTRCLEVBQ3BCLFFBQXFFLEVBQ3JFLE1BQXFCO1FBRnpDLFlBR0Usa0JBQU0sV0FBVyxDQUFDLFNBQ25CO1FBSG1CLGNBQVEsR0FBUixRQUFRLENBQTZEO1FBQ3JFLFlBQU0sR0FBTixNQUFNLENBQWU7O0lBRXpDLENBQUM7SUFFRCxxRUFBcUU7SUFDckUscUVBQXFFO0lBQ3JFLHFFQUFxRTtJQUNyRSxvRUFBb0U7SUFDcEUseUNBQXlDO0lBQ3pDLCtCQUFLLEdBQUwsVUFBTSxHQUFRO1FBQ1osRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLE1BQU0sU0FBSyxDQUFDO1lBQ2hCLElBQUksQ0FBQztnQkFDSCxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNDLENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNkLGlCQUFNLEtBQUssWUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsTUFBTSxDQUFDO1lBQ1QsQ0FBQztZQUNELElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMscUNBQWlCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDNUMsQ0FBQztJQUNILENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUF6QkQsQ0FBb0MsaUNBQWUsR0F5QmxEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZhYmxlSW5wdXQgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgT3V0ZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vT3V0ZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IHN1YnNjcmliZVRvUmVzdWx0IH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG5pbXBvcnQgeyBPcGVyYXRvckZ1bmN0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5cbi8qKlxuICogQ2F0Y2hlcyBlcnJvcnMgb24gdGhlIG9ic2VydmFibGUgdG8gYmUgaGFuZGxlZCBieSByZXR1cm5pbmcgYSBuZXcgb2JzZXJ2YWJsZSBvciB0aHJvd2luZyBhbiBlcnJvci5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2NhdGNoLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNvbnRpbnVlcyB3aXRoIGEgZGlmZmVyZW50IE9ic2VydmFibGUgd2hlbiB0aGVyZSdzIGFuIGVycm9yPC9jYXB0aW9uPlxuICpcbiAqIE9ic2VydmFibGUub2YoMSwgMiwgMywgNCwgNSlcbiAqICAgLm1hcChuID0+IHtcbiAqIFx0ICAgaWYgKG4gPT0gNCkge1xuICogXHQgICAgIHRocm93ICdmb3VyISc7XG4gKiAgICAgfVxuICpcdCAgIHJldHVybiBuO1xuICogICB9KVxuICogICAuY2F0Y2goZXJyID0+IE9ic2VydmFibGUub2YoJ0knLCAnSUknLCAnSUlJJywgJ0lWJywgJ1YnKSlcbiAqICAgLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqICAgLy8gMSwgMiwgMywgSSwgSUksIElJSSwgSVYsIFZcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5SZXRyaWVzIHRoZSBjYXVnaHQgc291cmNlIE9ic2VydmFibGUgYWdhaW4gaW4gY2FzZSBvZiBlcnJvciwgc2ltaWxhciB0byByZXRyeSgpIG9wZXJhdG9yPC9jYXB0aW9uPlxuICpcbiAqIE9ic2VydmFibGUub2YoMSwgMiwgMywgNCwgNSlcbiAqICAgLm1hcChuID0+IHtcbiAqIFx0ICAgaWYgKG4gPT09IDQpIHtcbiAqIFx0ICAgICB0aHJvdyAnZm91ciEnO1xuICogICAgIH1cbiAqIFx0ICAgcmV0dXJuIG47XG4gKiAgIH0pXG4gKiAgIC5jYXRjaCgoZXJyLCBjYXVnaHQpID0+IGNhdWdodClcbiAqICAgLnRha2UoMzApXG4gKiAgIC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKiAgIC8vIDEsIDIsIDMsIDEsIDIsIDMsIC4uLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlRocm93cyBhIG5ldyBlcnJvciB3aGVuIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB0aHJvd3MgYW4gZXJyb3I8L2NhcHRpb24+XG4gKlxuICogT2JzZXJ2YWJsZS5vZigxLCAyLCAzLCA0LCA1KVxuICogICAubWFwKG4gPT4ge1xuICogICAgIGlmIChuID09IDQpIHtcbiAqICAgICAgIHRocm93ICdmb3VyISc7XG4gKiAgICAgfVxuICogICAgIHJldHVybiBuO1xuICogICB9KVxuICogICAuY2F0Y2goZXJyID0+IHtcbiAqICAgICB0aHJvdyAnZXJyb3IgaW4gc291cmNlLiBEZXRhaWxzOiAnICsgZXJyO1xuICogICB9KVxuICogICAuc3Vic2NyaWJlKFxuICogICAgIHggPT4gY29uc29sZS5sb2coeCksXG4gKiAgICAgZXJyID0+IGNvbnNvbGUubG9nKGVycilcbiAqICAgKTtcbiAqICAgLy8gMSwgMiwgMywgZXJyb3IgaW4gc291cmNlLiBEZXRhaWxzOiBmb3VyIVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHNlbGVjdG9yIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhcyBhcmd1bWVudHMgYGVycmAsIHdoaWNoIGlzIHRoZSBlcnJvciwgYW5kIGBjYXVnaHRgLCB3aGljaFxuICogIGlzIHRoZSBzb3VyY2Ugb2JzZXJ2YWJsZSwgaW4gY2FzZSB5b3UnZCBsaWtlIHRvIFwicmV0cnlcIiB0aGF0IG9ic2VydmFibGUgYnkgcmV0dXJuaW5nIGl0IGFnYWluLiBXaGF0ZXZlciBvYnNlcnZhYmxlXG4gKiAgaXMgcmV0dXJuZWQgYnkgdGhlIGBzZWxlY3RvcmAgd2lsbCBiZSB1c2VkIHRvIGNvbnRpbnVlIHRoZSBvYnNlcnZhYmxlIGNoYWluLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gb2JzZXJ2YWJsZSB0aGF0IG9yaWdpbmF0ZXMgZnJvbSBlaXRoZXIgdGhlIHNvdXJjZSBvciB0aGUgb2JzZXJ2YWJsZSByZXR1cm5lZCBieSB0aGVcbiAqICBjYXRjaCBgc2VsZWN0b3JgIGZ1bmN0aW9uLlxuICogQG5hbWUgY2F0Y2hFcnJvclxuICovXG5leHBvcnQgZnVuY3Rpb24gY2F0Y2hFcnJvcjxULCBSPihzZWxlY3RvcjogKGVycjogYW55LCBjYXVnaHQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGVJbnB1dDxSPik6IE9wZXJhdG9yRnVuY3Rpb248VCwgVCB8IFI+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGNhdGNoRXJyb3JPcGVyYXRvckZ1bmN0aW9uKHNvdXJjZTogT2JzZXJ2YWJsZTxUPik6IE9ic2VydmFibGU8VCB8IFI+IHtcbiAgICBjb25zdCBvcGVyYXRvciA9IG5ldyBDYXRjaE9wZXJhdG9yKHNlbGVjdG9yKTtcbiAgICBjb25zdCBjYXVnaHQgPSBzb3VyY2UubGlmdChvcGVyYXRvcik7XG4gICAgcmV0dXJuIChvcGVyYXRvci5jYXVnaHQgPSBjYXVnaHQgYXMgT2JzZXJ2YWJsZTxUPik7XG4gIH07XG59XG5cbmNsYXNzIENhdGNoT3BlcmF0b3I8VCwgUj4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUIHwgUj4ge1xuICBjYXVnaHQ6IE9ic2VydmFibGU8VD47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZWxlY3RvcjogKGVycjogYW55LCBjYXVnaHQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGVJbnB1dDxUIHwgUj4pIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxSPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBDYXRjaFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5zZWxlY3RvciwgdGhpcy5jYXVnaHQpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgQ2F0Y2hTdWJzY3JpYmVyPFQsIFI+IGV4dGVuZHMgT3V0ZXJTdWJzY3JpYmVyPFQsIFQgfCBSPiB7XG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPGFueT4sXG4gICAgICAgICAgICAgIHByaXZhdGUgc2VsZWN0b3I6IChlcnI6IGFueSwgY2F1Z2h0OiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlSW5wdXQ8VCB8IFI+LFxuICAgICAgICAgICAgICBwcml2YXRlIGNhdWdodDogT2JzZXJ2YWJsZTxUPikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIC8vIE5PVEU6IG92ZXJyaWRpbmcgYGVycm9yYCBpbnN0ZWFkIG9mIGBfZXJyb3JgIGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudFxuICAvLyB0byBoYXZlIHRoaXMgZmxhZyB0aGlzIHN1YnNjcmliZXIgYXMgYGlzU3RvcHBlZGAuIFdlIGNhbiBtaW1pYyB0aGVcbiAgLy8gYmVoYXZpb3Igb2YgdGhlIFJldHJ5U3Vic2NyaWJlciAoZnJvbSB0aGUgYHJldHJ5YCBvcGVyYXRvciksIHdoZXJlXG4gIC8vIHdlIHVuc3Vic2NyaWJlIGZyb20gb3VyIHNvdXJjZSBjaGFpbiwgcmVzZXQgb3VyIFN1YnNjcmliZXIgZmxhZ3MsXG4gIC8vIHRoZW4gc3Vic2NyaWJlIHRvIHRoZSBzZWxlY3RvciByZXN1bHQuXG4gIGVycm9yKGVycjogYW55KSB7XG4gICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgbGV0IHJlc3VsdDogYW55O1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5zZWxlY3RvcihlcnIsIHRoaXMuY2F1Z2h0KTtcbiAgICAgIH0gY2F0Y2ggKGVycjIpIHtcbiAgICAgICAgc3VwZXIuZXJyb3IoZXJyMik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQW5kUmVjeWNsZSgpO1xuICAgICAgdGhpcy5hZGQoc3Vic2NyaWJlVG9SZXN1bHQodGhpcywgcmVzdWx0KSk7XG4gICAgfVxuICB9XG59XG4iXX0=