/*

    Copyright (C) 2012-2013 by Clearcode <http://clearcode.cc>
    and associates (see AUTHORS).

    This file is part of cc-htmlesc.service.

    cc-htmlesc.service is free software: you can redistribute it and/or modify
    it under the terms of the Lesser GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    cc-htmlesc.service is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with cc-htmlesc.service.  If not, see <http://www.gnu.org/licenses/>.

*/
'use strict';

angular.module('cc.htmlesc.service').factory('htmlEsc', function () {
    function htmlDecode(string) {
        return angular.element('<div/>').html(string).text();
    }

    function htmlDecodeObject(data) {
        var i;

        if(angular.isString(data)) {
            return htmlDecode(data);
        }
        if(angular.isObject(data)) {
            for(i in data) {
                if(data.hasOwnProperty(i)) {
                    data[i] = htmlDecodeObject(data[i]);
                }
            }
            return data;
        }
        if(angular.isArray(data)) {
            for(i = 0; i < data.length; i += 1) {
                data[i] = htmlDecodeObject(i);
            }
            return data;
        }
        return data;
    }

    return {
        htmlDecode: htmlDecode,
        htmlDecodeObject: htmlDecodeObject
    };
});
