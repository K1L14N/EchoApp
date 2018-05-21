"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("../Observable");
var subscribeToResult_1 = require("../util/subscribeToResult");
var OuterSubscriber_1 = require("../OuterSubscriber");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var IfObservable = /** @class */ (function (_super) {
    __extends(IfObservable, _super);
    function IfObservable(condition, thenSource, elseSource) {
        var _this = _super.call(this) || this;
        _this.condition = condition;
        _this.thenSource = thenSource;
        _this.elseSource = elseSource;
        return _this;
    }
    IfObservable.create = function (condition, thenSource, elseSource) {
        return new IfObservable(condition, thenSource, elseSource);
    };
    /** @deprecated internal use only */ IfObservable.prototype._subscribe = function (subscriber) {
        var _a = this, condition = _a.condition, thenSource = _a.thenSource, elseSource = _a.elseSource;
        return new IfSubscriber(subscriber, condition, thenSource, elseSource);
    };
    return IfObservable;
}(Observable_1.Observable));
exports.IfObservable = IfObservable;
var IfSubscriber = /** @class */ (function (_super) {
    __extends(IfSubscriber, _super);
    function IfSubscriber(destination, condition, thenSource, elseSource) {
        var _this = _super.call(this, destination) || this;
        _this.condition = condition;
        _this.thenSource = thenSource;
        _this.elseSource = elseSource;
        _this.tryIf();
        return _this;
    }
    IfSubscriber.prototype.tryIf = function () {
        var _a = this, condition = _a.condition, thenSource = _a.thenSource, elseSource = _a.elseSource;
        var result;
        try {
            result = condition();
            var source = result ? thenSource : elseSource;
            if (source) {
                this.add(subscribeToResult_1.subscribeToResult(this, source));
            }
            else {
                this._complete();
            }
        }
        catch (err) {
            this._error(err);
        }
    };
    return IfSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSWZPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiSWZPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQWtFO0FBSWxFLCtEQUE4RDtBQUM5RCxzREFBcUQ7QUFDckQ7Ozs7R0FJRztBQUNIO0lBQXdDLGdDQUFhO0lBUW5ELHNCQUFvQixTQUErQixFQUMvQixVQUE0QyxFQUM1QyxVQUE0QztRQUZoRSxZQUdFLGlCQUFPLFNBQ1I7UUFKbUIsZUFBUyxHQUFULFNBQVMsQ0FBc0I7UUFDL0IsZ0JBQVUsR0FBVixVQUFVLENBQWtDO1FBQzVDLGdCQUFVLEdBQVYsVUFBVSxDQUFrQzs7SUFFaEUsQ0FBQztJQVZNLG1CQUFNLEdBQWIsVUFBb0IsU0FBK0IsRUFDL0IsVUFBNEMsRUFDNUMsVUFBNEM7UUFDOUQsTUFBTSxDQUFDLElBQUksWUFBWSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQVFELG9DQUFvQyxDQUFDLGlDQUFVLEdBQVYsVUFBVyxVQUEyQjtRQUNuRSxJQUFBLFNBQTRDLEVBQTFDLHdCQUFTLEVBQUUsMEJBQVUsRUFBRSwwQkFBVSxDQUFVO1FBRW5ELE1BQU0sQ0FBQyxJQUFJLFlBQVksQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBbkJELENBQXdDLHVCQUFVLEdBbUJqRDtBQW5CWSxvQ0FBWTtBQXFCekI7SUFBaUMsZ0NBQXFCO0lBQ3BELHNCQUFZLFdBQTBCLEVBQ2xCLFNBQStCLEVBQy9CLFVBQTRDLEVBQzVDLFVBQTRDO1FBSGhFLFlBSUUsa0JBQU0sV0FBVyxDQUFDLFNBRW5CO1FBTG1CLGVBQVMsR0FBVCxTQUFTLENBQXNCO1FBQy9CLGdCQUFVLEdBQVYsVUFBVSxDQUFrQztRQUM1QyxnQkFBVSxHQUFWLFVBQVUsQ0FBa0M7UUFFOUQsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDOztJQUNmLENBQUM7SUFFTyw0QkFBSyxHQUFiO1FBQ1EsSUFBQSxTQUE0QyxFQUExQyx3QkFBUyxFQUFFLDBCQUFVLEVBQUUsMEJBQVUsQ0FBVTtRQUVuRCxJQUFJLE1BQWUsQ0FBQztRQUNwQixJQUFJLENBQUM7WUFDSCxNQUFNLEdBQVksU0FBUyxFQUFFLENBQUM7WUFDOUIsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztZQUVoRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNYLElBQUksQ0FBQyxHQUFHLENBQUMscUNBQWlCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDNUMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNuQixDQUFDO1FBQ0gsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUM7SUFDSCxDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBMUJELENBQWlDLGlDQUFlLEdBMEIvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmliYWJsZU9yUHJvbWlzZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgVGVhcmRvd25Mb2dpYyB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5cbmltcG9ydCB7IHN1YnNjcmliZVRvUmVzdWx0IH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG5pbXBvcnQgeyBPdXRlclN1YnNjcmliZXIgfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKiBAaGlkZSB0cnVlXG4gKi9cbmV4cG9ydCBjbGFzcyBJZk9ic2VydmFibGU8VCwgUj4gZXh0ZW5kcyBPYnNlcnZhYmxlPFQ+IHtcblxuICBzdGF0aWMgY3JlYXRlPFQsIFI+KGNvbmRpdGlvbjogKCkgPT4gYm9vbGVhbiB8IHZvaWQsXG4gICAgICAgICAgICAgICAgICAgICAgdGhlblNvdXJjZT86IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxUPiB8IHZvaWQsXG4gICAgICAgICAgICAgICAgICAgICAgZWxzZVNvdXJjZT86IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxSPiB8IHZvaWQpOiBPYnNlcnZhYmxlPFR8Uj4ge1xuICAgIHJldHVybiBuZXcgSWZPYnNlcnZhYmxlKGNvbmRpdGlvbiwgdGhlblNvdXJjZSwgZWxzZVNvdXJjZSk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmRpdGlvbjogKCkgPT4gYm9vbGVhbiB8IHZvaWQsXG4gICAgICAgICAgICAgIHByaXZhdGUgdGhlblNvdXJjZT86IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxUPiB8IHZvaWQsXG4gICAgICAgICAgICAgIHByaXZhdGUgZWxzZVNvdXJjZT86IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxSPiB8IHZvaWQpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgLyoqIEBkZXByZWNhdGVkIGludGVybmFsIHVzZSBvbmx5ICovIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUfFI+KTogVGVhcmRvd25Mb2dpYyB7XG4gICAgY29uc3QgeyBjb25kaXRpb24sIHRoZW5Tb3VyY2UsIGVsc2VTb3VyY2UgfSA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IElmU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBjb25kaXRpb24sIHRoZW5Tb3VyY2UsIGVsc2VTb3VyY2UpO1xuICB9XG59XG5cbmNsYXNzIElmU3Vic2NyaWJlcjxULCBSPiBleHRlbmRzIE91dGVyU3Vic2NyaWJlcjxULCBUPiB7XG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGNvbmRpdGlvbjogKCkgPT4gYm9vbGVhbiB8IHZvaWQsXG4gICAgICAgICAgICAgIHByaXZhdGUgdGhlblNvdXJjZT86IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxUPiB8IHZvaWQsXG4gICAgICAgICAgICAgIHByaXZhdGUgZWxzZVNvdXJjZT86IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxSPiB8IHZvaWQpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gICAgdGhpcy50cnlJZigpO1xuICB9XG5cbiAgcHJpdmF0ZSB0cnlJZigpOiB2b2lkIHtcbiAgICBjb25zdCB7IGNvbmRpdGlvbiwgdGhlblNvdXJjZSwgZWxzZVNvdXJjZSB9ID0gdGhpcztcblxuICAgIGxldCByZXN1bHQ6IGJvb2xlYW47XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IDxib29sZWFuPmNvbmRpdGlvbigpO1xuICAgICAgY29uc3Qgc291cmNlID0gcmVzdWx0ID8gdGhlblNvdXJjZSA6IGVsc2VTb3VyY2U7XG5cbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgdGhpcy5hZGQoc3Vic2NyaWJlVG9SZXN1bHQodGhpcywgc291cmNlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9jb21wbGV0ZSgpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5fZXJyb3IoZXJyKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==