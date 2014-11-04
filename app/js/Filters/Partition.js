"use strict";

angular.module('RidePlan.Filters')
    .filter('Partition', function () {
        var cache = {};
        return function (arr, size) {
            var newArr = [];
            if(!arr) {
                return false;
            }

            for (var i = 0; i < arr.length; i += size) {
                newArr.push(arr.slice(i, i + size));
            }

            var arrString = JSON.stringify(arr);
            var fromCache = cache[arrString + size];

            if (JSON.stringify(fromCache) === JSON.stringify(newArr)) {
                return fromCache;
            }

            return cache[arrString + size] = newArr;
        };
    });