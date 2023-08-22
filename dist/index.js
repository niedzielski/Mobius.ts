'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var Loop = /** @class */ (function () {
    function Loop(defaultModel, updater, effectHandlers, eventSources, initiator) {
        var _this = this;
        this.listeners = [];
        this.on = function (listener) {
            _this.listeners.push(listener);
        };
        this.off = function (listener) {
            var index = _this.listeners.indexOf(listener);
            if (index > -1)
                _this.listeners.splice(index, 1);
        };
        this.dispatch = function (event) {
            var next = _this.updater(_this.currentModel, event);
            _this.handleNext(next);
            _this.listeners.forEach(function (listener) { return listener(_this.currentModel); });
        };
        this.handleNext = function (next) {
            if (next.model)
                _this.currentModel = next.model;
            next.effects.forEach(function (effect) {
                _this.effectHandlers.forEach(function (handler) { return handler(effect, _this.dispatch); });
            });
        };
        this.currentModel = defaultModel;
        this.updater = updater;
        this.effectHandlers = effectHandlers;
        if (initiator) {
            var next_1 = initiator(this.currentModel);
            this.handleNext(next_1);
        }
        eventSources.forEach(function (eventSource) { return eventSource(_this.dispatch); });
    }
    Loop.simpleLoop = function (defaultModel, updater) {
        return new Loop(defaultModel, updater, [], []);
    };
    return Loop;
}());
function next(model, effects) {
    if (effects === void 0) { effects = []; }
    return { model: model, effects: effects };
}
function dispatchEffects(effects) {
    return { model: null, effects: effects };
}
function noChange() {
    return { model: null, effects: [] };
}
function combineUpdaters(mapping) {
    return function (model, event) {
        var newModel = __assign({}, model);
        var effects = [];
        for (var key in mapping) {
            var updater = mapping[key];
            var subNext = updater(model[key], event);
            if (subNext.model) {
                newModel[key] = subNext.model;
            }
            effects.push.apply(effects, subNext.effects);
        }
        return next(newModel, effects);
    };
}

exports.Loop = Loop;
exports.combineUpdaters = combineUpdaters;
exports.dispatchEffects = dispatchEffects;
exports.next = next;
exports.noChange = noChange;
