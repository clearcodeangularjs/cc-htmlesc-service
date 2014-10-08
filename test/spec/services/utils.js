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

describe('Service: utilities', function () {

    beforeEach(module('cc.html.service'));

    describe('htmlDecode method', function() {
        it('should leave text without special characters', inject(function(URIEncDec) {
            expect(URIEncDec.htmlDecode('generic text: no special characters')).toBe(
                'generic text: no special characters');
        }));

        it('should decode special characters in text', inject(function(URIEncDec) {
            expect(URIEncDec.htmlDecode('text with special characters: &quot;&amp;&lt;&gt;&#64;&#230;')).toBe(
                'text with special characters: "&<>@æ');
        }));

        it('should remove html markup form text', inject(function(URIEncDec) {
            expect(URIEncDec.htmlDecode('text with markup: <b>bold</b> <p>paragraph</p>')).toBe(
                'text with markup: bold paragraph');
        }));
    });


    describe('htmlDecodeObject method', function() {
        it('should decode String', inject(function(URIEncDec) {
            expect(URIEncDec.htmlDecodeObject('text with special characters: &quot;&amp;&lt;&gt;&#64;&#230;')).toBe(
                'text with special characters: "&<>@æ');
        }));

        it('should decode Strings in Object', inject(function(URIEncDec) {
            function fun() {};
            expect(URIEncDec.htmlDecodeObject({
                'generic': 'generic text: no special characters',
                'special': 'text with special characters: &quot;&amp;&lt;&gt;&#64;&#230;',
                'markup': 'text with markup: <b>bold</b> <p>paragraph</p>',
                'number': 4.2,
                'null': null,
                'undefined': undefined,
                'function': fun
            })).toEqual({
                'generic': 'generic text: no special characters',
                'special': 'text with special characters: "&<>@æ',
                'markup': 'text with markup: bold paragraph',
                'number': 4.2,
                'null': null,
                'undefined': undefined,
                'function': fun
            });
        }));

        it('should decode Strings in Object in Array', inject(function(URIEncDec) {
            function fun1() {};
            function fun2() {};
            expect(URIEncDec.htmlDecodeObject([
                {
                    'generic': 'generic text: no special characters',
                    'special': 'text with special characters: &quot;&amp;&lt;&gt;&#64;&#230;',
                    'markup': 'text with markup: <b>bold</b> <p>paragraph</p>',
                    'number': 4.2,
                    'null': null,
                    'undefined': undefined,
                    'function': fun1
                }, {
                    'generic': 'special text: another &gt; text',
                    'number': 5,
                    'function': fun2
                }])).toEqual([
                    {
                        'generic': 'generic text: no special characters',
                        'special': 'text with special characters: "&<>@æ',
                        'markup': 'text with markup: bold paragraph',
                        'number': 4.2,
                        'null': null,
                        'undefined': undefined,
                        'function': fun1
                    }, {
                        'generic': 'special text: another > text',
                        'number': 5,
                        'function': fun2
                    }]);
        }));
    });
});
