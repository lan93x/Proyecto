/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

 /*
 * # Semantic UI - 2.2.13
 * https://github.com/Semantic-Org/Semantic-UI
 * http://www.semantic-ui.com/
 *
 * Copyright 2014 Contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */
!function(e,t,n,i){e.site=e.fn.site=function(i){var o,a,r=(new Date).getTime(),s=[],l=arguments[0],c="string"==typeof l,u=[].slice.call(arguments,1),d=e.isPlainObject(i)?e.extend(!0,{},e.site.settings,i):e.extend({},e.site.settings),f=d.namespace,m=d.error,g="module-"+f,v=e(n),p=this,h=v.data(g);return o={initialize:function(){o.instantiate()},instantiate:function(){o.verbose("Storing instance of site",o),h=o,v.data(g,o)},normalize:function(){o.fix.console(),o.fix.requestAnimationFrame()},fix:{console:function(){o.debug("Normalizing window.console"),void 0!==console&&void 0!==console.log||(o.verbose("Console not available, normalizing events"),o.disable.console()),void 0!==console.group&&void 0!==console.groupEnd&&void 0!==console.groupCollapsed||(o.verbose("Console group not available, normalizing events"),t.console.group=function(){},t.console.groupEnd=function(){},t.console.groupCollapsed=function(){}),void 0===console.markTimeline&&(o.verbose("Mark timeline not available, normalizing events"),t.console.markTimeline=function(){})},consoleClear:function(){o.debug("Disabling programmatic console clearing"),t.console.clear=function(){}},requestAnimationFrame:function(){o.debug("Normalizing requestAnimationFrame"),void 0===t.requestAnimationFrame&&(o.debug("RequestAnimationFrame not available, normalizing event"),t.requestAnimationFrame=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)})}},moduleExists:function(t){return void 0!==e.fn[t]&&void 0!==e.fn[t].settings},enabled:{modules:function(t){var n=[];return t=t||d.modules,e.each(t,function(e,t){o.moduleExists(t)&&n.push(t)}),n}},disabled:{modules:function(t){var n=[];return t=t||d.modules,e.each(t,function(e,t){o.moduleExists(t)||n.push(t)}),n}},change:{setting:function(t,n,i,a){i="string"==typeof i?"all"===i?d.modules:[i]:i||d.modules,a=void 0===a||a,e.each(i,function(i,r){var s,l=!o.moduleExists(r)||(e.fn[r].settings.namespace||!1);o.moduleExists(r)&&(o.verbose("Changing default setting",t,n,r),e.fn[r].settings[t]=n,a&&l&&(s=e(":data(module-"+l+")")).length>0&&(o.verbose("Modifying existing settings",s),s[r]("setting",t,n)))})},settings:function(t,n,i){n="string"==typeof n?[n]:n||d.modules,i=void 0===i||i,e.each(n,function(n,a){var r;o.moduleExists(a)&&(o.verbose("Changing default setting",t,a),e.extend(!0,e.fn[a].settings,t),i&&f&&(r=e(":data(module-"+f+")")).length>0&&(o.verbose("Modifying existing settings",r),r[a]("setting",t)))})}},enable:{console:function(){o.console(!0)},debug:function(e,t){e=e||d.modules,o.debug("Enabling debug for modules",e),o.change.setting("debug",!0,e,t)},verbose:function(e,t){e=e||d.modules,o.debug("Enabling verbose debug for modules",e),o.change.setting("verbose",!0,e,t)}},disable:{console:function(){o.console(!1)},debug:function(e,t){e=e||d.modules,o.debug("Disabling debug for modules",e),o.change.setting("debug",!1,e,t)},verbose:function(e,t){e=e||d.modules,o.debug("Disabling verbose debug for modules",e),o.change.setting("verbose",!1,e,t)}},console:function(e){if(e){if(void 0===h.cache.console)return void o.error(m.console);o.debug("Restoring console function"),t.console=h.cache.console}else o.debug("Disabling console function"),h.cache.console=t.console,t.console={clear:function(){},error:function(){},group:function(){},groupCollapsed:function(){},groupEnd:function(){},info:function(){},log:function(){},markTimeline:function(){},warn:function(){}}},destroy:function(){o.verbose("Destroying previous site for",v),v.removeData(g)},cache:{},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,d,t);else{if(void 0===n)return d[t];d[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,o,t);else{if(void 0===n)return o[t];o[t]=n}},debug:function(){d.debug&&(d.performance?o.performance.log(arguments):(o.debug=Function.prototype.bind.call(console.info,console,d.name+":"),o.debug.apply(console,arguments)))},verbose:function(){d.verbose&&d.debug&&(d.performance?o.performance.log(arguments):(o.verbose=Function.prototype.bind.call(console.info,console,d.name+":"),o.verbose.apply(console,arguments)))},error:function(){o.error=Function.prototype.bind.call(console.error,console,d.name+":"),o.error.apply(console,arguments)},performance:{log:function(e){var t,n;d.performance&&(n=(t=(new Date).getTime())-(r||t),r=t,s.push({Element:p,Name:e[0],Arguments:[].slice.call(e,1)||"","Execution Time":n})),clearTimeout(o.performance.timer),o.performance.timer=setTimeout(o.performance.display,500)},display:function(){var t=d.name+":",n=0;r=!1,clearTimeout(o.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",(void 0!==console.group||void 0!==console.table)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,n,i){var r,s,l,c=h;return n=n||u,i=p||i,"string"==typeof t&&void 0!==c&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,i){var a=n!=r?i+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(c[a])&&n!=r)c=c[a];else{if(void 0!==c[a])return s=c[a],!1;if(!e.isPlainObject(c[i])||n==r)return void 0!==c[i]?(s=c[i],!1):(o.error(m.method,t),!1);c=c[i]}})),e.isFunction(s)?l=s.apply(i,n):void 0!==s&&(l=s),e.isArray(a)?a.push(l):void 0!==a?a=[a,l]:void 0!==l&&(a=l),s}},c?(void 0===h&&o.initialize(),o.invoke(l)):(void 0!==h&&o.destroy(),o.initialize()),void 0!==a?a:this},e.site.settings={name:"Site",namespace:"site",error:{console:"Console cannot be restored, most likely it was overwritten outside of module",method:"The method you called is not defined."},debug:!1,verbose:!1,performance:!0,modules:["accordion","api","checkbox","dimmer","dropdown","embed","form","modal","nag","popup","rating","shape","sidebar","state","sticky","tab","transition","visit","visibility"],siteNamespace:"site",namespaceStub:{cache:{},config:{},sections:{},section:{},utilities:{}}},e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(n){return!!e.data(n,t)}}):function(t,n,i){return!!e.data(t,i[3])}})}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.form=function(t){var i,o=e(this),a=o.selector||"",r=(new Date).getTime(),s=[],l=arguments[0],c=arguments[1],u="string"==typeof l,d=[].slice.call(arguments,1);return o.each(function(){var f,m,g,v,p,h,b,y,x,C,w,k,S,T,A,R,P,E,F,O=e(this),D=this,q=[],j=!1;(F={initialize:function(){F.get.settings(),u?(void 0===E&&F.instantiate(),F.invoke(l)):(void 0!==E&&E.invoke("destroy"),F.verbose("Initializing form validation",O,y),F.bindEvents(),F.set.defaults(),F.instantiate())},instantiate:function(){F.verbose("Storing instance of module",F),E=F,O.data(R,F)},destroy:function(){F.verbose("Destroying previous module",E),F.removeEvents(),O.removeData(R)},refresh:function(){F.verbose("Refreshing selector cache"),f=O.find(w.field),m=O.find(w.group),g=O.find(w.message),v=O.find(w.prompt),p=O.find(w.submit),h=O.find(w.clear),b=O.find(w.reset)},submit:function(){F.verbose("Submitting form",O),O.submit()},attachEvents:function(t,n){n=n||"submit",e(t).on("click"+P,function(e){F[n](),e.preventDefault()})},bindEvents:function(){F.verbose("Attaching form events"),O.on("submit"+P,F.validate.form).on("blur"+P,w.field,F.event.field.blur).on("click"+P,w.submit,F.submit).on("click"+P,w.reset,F.reset).on("click"+P,w.clear,F.clear),y.keyboardShortcuts&&O.on("keydown"+P,w.field,F.event.field.keydown),f.each(function(){var t=e(this),n=t.prop("type"),i=F.get.changeEvent(n,t);e(this).on(i+P,F.event.field.change)})},clear:function(){f.each(function(){var t=e(this),n=t.parent(),i=t.closest(m),o=i.find(w.prompt),a=t.data(C.defaultValue)||"",r=n.is(w.uiCheckbox),s=n.is(w.uiDropdown);i.hasClass(k.error)&&(F.verbose("Resetting error on field",i),i.removeClass(k.error),o.remove()),s?(F.verbose("Resetting dropdown value",n,a),n.dropdown("clear")):r?t.prop("checked",!1):(F.verbose("Resetting field value",t,a),t.val(""))})},reset:function(){f.each(function(){var t=e(this),n=t.parent(),i=t.closest(m),o=i.find(w.prompt),a=t.data(C.defaultValue),r=n.is(w.uiCheckbox),s=n.is(w.uiDropdown),l=i.hasClass(k.error);void 0!==a&&(l&&(F.verbose("Resetting error on field",i),i.removeClass(k.error),o.remove()),s?(F.verbose("Resetting dropdown value",n,a),n.dropdown("restore defaults")):r?(F.verbose("Resetting checkbox value",n,a),t.prop("checked",a)):(F.verbose("Resetting field value",t,a),t.val(a)))})},determine:{isValid:function(){var t=!0;return e.each(x,function(e,n){F.validate.field(n,e,!0)||(t=!1)}),t}},is:{bracketedRule:function(e){return e.type&&e.type.match(y.regExp.bracket)},shorthandFields:function(e){var t=e[Object.keys(e)[0]];return F.is.shorthandRules(t)},shorthandRules:function(t){return"string"==typeof t||e.isArray(t)},empty:function(e){return!e||0===e.length||(e.is('input[type="checkbox"]')?!e.is(":checked"):F.is.blank(e))},blank:function(t){return""===e.trim(t.val())},valid:function(t){var n=!0;return t?(F.verbose("Checking if field is valid",t),F.validate.field(x[t],t,!1)):(F.verbose("Checking if form is valid"),e.each(x,function(e,t){F.is.valid(e)||(n=!1)}),n)}},removeEvents:function(){O.off(P),f.off(P),p.off(P),f.off(P)},event:{field:{keydown:function(t){var n=e(this),i=t.which,o=n.is(w.input),a=n.is(w.checkbox),r=n.closest(w.uiDropdown).length>0,s=13;i==27&&(F.verbose("Escape key pressed blurring field"),n.blur()),t.ctrlKey||i!=s||!o||r||a||(j||(n.one("keyup"+P,F.event.field.keyup),F.submit(),F.debug("Enter pressed on input submitting form")),j=!0)},keyup:function(){j=!1},blur:function(t){var n=e(this),i=n.closest(m),o=F.get.validation(n);i.hasClass(k.error)?(F.debug("Revalidating field",n,o),o&&F.validate.field(o)):"blur"!=y.on&&"change"!=y.on||o&&F.validate.field(o)},change:function(t){var n=e(this),i=n.closest(m),o=F.get.validation(n);o&&("change"==y.on||i.hasClass(k.error)&&y.revalidate)&&(clearTimeout(F.timer),F.timer=setTimeout(function(){F.debug("Revalidating field",n,F.get.validation(n)),F.validate.field(o)},y.delay))}}},get:{ancillaryValue:function(e){return!(!e.type||!e.value&&!F.is.bracketedRule(e))&&(void 0!==e.value?e.value:e.type.match(y.regExp.bracket)[1]+"")},ruleName:function(e){return F.is.bracketedRule(e)?e.type.replace(e.type.match(y.regExp.bracket)[0],""):e.type},changeEvent:function(e,t){return"checkbox"==e||"radio"==e||"hidden"==e||t.is("select")?"change":F.get.inputEvent()},inputEvent:function(){return void 0!==n.createElement("input").oninput?"input":void 0!==n.createElement("input").onpropertychange?"propertychange":"keyup"},fieldsFromShorthand:function(t){var n={};return e.each(t,function(t,i){"string"==typeof i&&(i=[i]),n[t]={rules:[]},e.each(i,function(e,i){n[t].rules.push({type:i})})}),n},prompt:function(e,t){var n,i,o,a=F.get.ruleName(e),r=F.get.ancillaryValue(e),s=e.prompt||y.prompt[a]||y.text.unspecifiedRule,l=-1!==s.search("{value}"),c=-1!==s.search("{name}");return(c||l)&&(i=F.get.field(t.identifier)),l&&(s=s.replace("{value}",i.val())),c&&(o=1==(n=i.closest(w.group).find("label").eq(0)).length?n.text():i.prop("placeholder")||y.text.unspecifiedField,s=s.replace("{name}",o)),s=s.replace("{identifier}",t.identifier),s=s.replace("{ruleValue}",r),e.prompt||F.verbose("Using default validation prompt for type",s,a),s},settings:function(){if(e.isPlainObject(t)){var n=Object.keys(t);n.length>0&&(void 0!==t[n[0]].identifier&&void 0!==t[n[0]].rules)?(y=e.extend(!0,{},e.fn.form.settings,c),x=e.extend({},e.fn.form.settings.defaults,t),F.error(y.error.oldSyntax,D),F.verbose("Extending settings from legacy parameters",x,y)):(t.fields&&F.is.shorthandFields(t.fields)&&(t.fields=F.get.fieldsFromShorthand(t.fields)),y=e.extend(!0,{},e.fn.form.settings,t),x=e.extend({},e.fn.form.settings.defaults,y.fields),F.verbose("Extending settings",x,y))}else y=e.fn.form.settings,x=e.fn.form.settings.defaults,F.verbose("Using default form validation",x,y);A=y.namespace,C=y.metadata,w=y.selector,k=y.className,S=y.regExp,T=y.error,R="module-"+A,P="."+A,E=O.data(R),F.refresh()},field:function(t){return F.verbose("Finding field with identifier",t),t=F.escape.string(t),f.filter("#"+t).length>0?f.filter("#"+t):f.filter('[name="'+t+'"]').length>0?f.filter('[name="'+t+'"]'):f.filter('[name="'+t+'[]"]').length>0?f.filter('[name="'+t+'[]"]'):f.filter("[data-"+C.validate+'="'+t+'"]').length>0?f.filter("[data-"+C.validate+'="'+t+'"]'):e("<input/>")},fields:function(t){var n=e();return e.each(t,function(e,t){n=n.add(F.get.field(t))}),n},validation:function(t){var n,i;return!!x&&(e.each(x,function(e,o){i=o.identifier||e,F.get.field(i)[0]==t[0]&&(o.identifier=i,n=o)}),n||!1)},value:function(e){var t=[];return t.push(e),F.get.values.call(D,t)[e]},values:function(t){var n={};return(e.isArray(t)?F.get.fields(t):f).each(function(t,i){var o=e(i),a=(o.prop("type"),o.prop("name")),r=o.val(),s=o.is(w.checkbox),l=o.is(w.radio),c=-1!==a.indexOf("[]"),u=!!s&&o.is(":checked");a&&(c?(a=a.replace("[]",""),n[a]||(n[a]=[]),s?u?n[a].push(r||!0):n[a].push(!1):n[a].push(r)):l?void 0===n[a]&&(n[a]=!!u):n[a]=s?!!u&&(r||!0):r)}),n}},has:{field:function(e){return F.verbose("Checking for existence of a field with identifier",e),"string"!=typeof(e=F.escape.string(e))&&F.error(T.identifier,e),f.filter("#"+e).length>0||(f.filter('[name="'+e+'"]').length>0||f.filter("[data-"+C.validate+'="'+e+'"]').length>0)}},escape:{string:function(e){return(e=String(e)).replace(S.escape,"\\$&")}},add:{rule:function(e,t){F.add.field(e,t)},field:function(t,n){var i={};F.is.shorthandRules(n)?(n=e.isArray(n)?n:[n],i[t]={rules:[]},e.each(n,function(e,n){i[t].rules.push({type:n})})):i[t]=n,x=e.extend({},x,i),F.debug("Adding rules",i,x)},fields:function(t){var n;n=t&&F.is.shorthandFields(t)?F.get.fieldsFromShorthand(t):t,x=e.extend({},x,n)},prompt:function(t,n){var i=F.get.field(t).closest(m),o=i.children(w.prompt),a=0!==o.length;n="string"==typeof n?[n]:n,F.verbose("Adding field error state",t),i.addClass(k.error),y.inline&&(a||(o=y.templates.prompt(n)).appendTo(i),o.html(n[0]),a?F.verbose("Inline errors are disabled, no inline error added",t):y.transition&&void 0!==e.fn.transition&&O.transition("is supported")?(F.verbose("Displaying error with css transition",y.transition),o.transition(y.transition+" in",y.duration)):(F.verbose("Displaying error with fallback javascript animation"),o.fadeIn(y.duration)))},errors:function(e){F.debug("Adding form error messages",e),F.set.error(),g.html(y.templates.error(e))}},remove:{rule:function(t,n){var i=e.isArray(n)?n:[n];if(void 0==n)return F.debug("Removed all rules"),void(x[t].rules=[]);void 0!=x[t]&&e.isArray(x[t].rules)&&e.each(x[t].rules,function(e,n){-1!==i.indexOf(n.type)&&(F.debug("Removed rule",n.type),x[t].rules.splice(e,1))})},field:function(t){var n=e.isArray(t)?t:[t];e.each(n,function(e,t){F.remove.rule(t)})},rules:function(t,n){e.isArray(t)?e.each(fields,function(e,t){F.remove.rule(t,n)}):F.remove.rule(t,n)},fields:function(e){F.remove.field(e)},prompt:function(t){var n=F.get.field(t).closest(m),i=n.children(w.prompt);n.removeClass(k.error),y.inline&&i.is(":visible")&&(F.verbose("Removing prompt for field",t),y.transition&&void 0!==e.fn.transition&&O.transition("is supported")?i.transition(y.transition+" out",y.duration,function(){i.remove()}):i.fadeOut(y.duration,function(){i.remove()}))}},set:{success:function(){O.removeClass(k.error).addClass(k.success)},defaults:function(){f.each(function(){var t=e(this),n=t.filter(w.checkbox).length>0?t.is(":checked"):t.val();t.data(C.defaultValue,n)})},error:function(){O.removeClass(k.success).addClass(k.error)},value:function(e,t){var n={};return n[e]=t,F.set.values.call(D,n)},values:function(t){e.isEmptyObject(t)||e.each(t,function(t,n){var i,o=F.get.field(t),a=o.parent(),r=e.isArray(n),s=a.is(w.uiCheckbox),l=a.is(w.uiDropdown),c=o.is(w.radio)&&s;o.length>0&&(r&&s?(F.verbose("Selecting multiple",n,o),a.checkbox("uncheck"),e.each(n,function(e,t){i=o.filter('[value="'+t+'"]'),a=i.parent(),i.length>0&&a.checkbox("check")})):c?(F.verbose("Selecting radio value",n,o),o.filter('[value="'+n+'"]').parent(w.uiCheckbox).checkbox("check")):s?(F.verbose("Setting checkbox value",n,a),!0===n?a.checkbox("check"):a.checkbox("uncheck")):l?(F.verbose("Setting dropdown value",n,a),a.dropdown("set selected",n)):(F.verbose("Setting field value",n,o),o.val(n)))})}},validate:{form:function(e,t){var n=F.get.values();if(j)return!1;if(q=[],F.determine.isValid()){if(F.debug("Form has no validation errors, submitting"),F.set.success(),!0!==t)return y.onSuccess.call(D,e,n)}else if(F.debug("Form has errors"),F.set.error(),y.inline||F.add.errors(q),void 0!==O.data("moduleApi")&&e.stopImmediatePropagation(),!0!==t)return y.onFailure.call(D,q,n)},field:function(t,n,i){i=void 0===i||i,"string"==typeof t&&(F.verbose("Validating field",t),n=t,t=x[t]);var o=t.identifier||n,a=F.get.field(o),r=!!t.depends&&F.get.field(t.depends),s=!0,l=[];return t.identifier||(F.debug("Using field name as identifier",o),t.identifier=o),a.prop("disabled")?(F.debug("Field is disabled. Skipping",o),s=!0):t.optional&&F.is.blank(a)?(F.debug("Field is optional and blank. Skipping",o),s=!0):t.depends&&F.is.empty(r)?(F.debug("Field depends on another value that is not present or empty. Skipping",r),s=!0):void 0!==t.rules&&e.each(t.rules,function(e,n){F.has.field(o)&&!F.validate.rule(t,n)&&(F.debug("Field is invalid",o,n.type),l.push(F.get.prompt(n,t)),s=!1)}),s?(i&&(F.remove.prompt(o,l),y.onValid.call(a)),!0):(i&&(q=q.concat(l),F.add.prompt(o,l),y.onInvalid.call(a,l)),!1)},rule:function(t,n){var i=F.get.field(t.identifier),o=(n.type,i.val()),a=F.get.ancillaryValue(n),r=F.get.ruleName(n),s=y.rules[r];{if(e.isFunction(s))return o=void 0===o||""===o||null===o?"":e.trim(o+""),s.call(i,o,a);F.error(T.noRule,r)}}},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,y,t);else{if(void 0===n)return y[t];y[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,F,t);else{if(void 0===n)return F[t];F[t]=n}},debug:function(){!y.silent&&y.debug&&(y.performance?F.performance.log(arguments):(F.debug=Function.prototype.bind.call(console.info,console,y.name+":"),F.debug.apply(console,arguments)))},verbose:function(){!y.silent&&y.verbose&&y.debug&&(y.performance?F.performance.log(arguments):(F.verbose=Function.prototype.bind.call(console.info,console,y.name+":"),F.verbose.apply(console,arguments)))},error:function(){y.silent||(F.error=Function.prototype.bind.call(console.error,console,y.name+":"),F.error.apply(console,arguments))},performance:{log:function(e){var t,n;y.performance&&(n=(t=(new Date).getTime())-(r||t),r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:D,"Execution Time":n})),clearTimeout(F.performance.timer),F.performance.timer=setTimeout(F.performance.display,500)},display:function(){var t=y.name+":",n=0;r=!1,clearTimeout(F.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",a&&(t+=" '"+a+"'"),o.length>1&&(t+=" ("+o.length+")"),(void 0!==console.group||void 0!==console.table)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,n,o){var a,r,s,l=E;return n=n||d,o=D||o,"string"==typeof t&&void 0!==l&&(t=t.split(/[\. ]/),a=t.length-1,e.each(t,function(n,i){var o=n!=a?i+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[o])&&n!=a)l=l[o];else{if(void 0!==l[o])return r=l[o],!1;if(!e.isPlainObject(l[i])||n==a)return void 0!==l[i]&&(r=l[i],!1);l=l[i]}})),e.isFunction(r)?s=r.apply(o,n):void 0!==r&&(s=r),e.isArray(i)?i.push(s):void 0!==i?i=[i,s]:void 0!==s&&(i=s),r}}).initialize()}),void 0!==i?i:this},e.fn.form.settings={name:"Form",namespace:"form",debug:!1,verbose:!1,performance:!0,fields:!1,keyboardShortcuts:!0,on:"submit",inline:!1,delay:200,revalidate:!0,transition:"scale",duration:200,onValid:function(){},onInvalid:function(){},onSuccess:function(){return!0},onFailure:function(){return!1},metadata:{defaultValue:"default",validate:"validate"},regExp:{htmlID:/^[a-zA-Z][\w:.-]*$/g,bracket:/\[(.*)\]/i,decimal:/^\d+\.?\d*$/,email:/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,escape:/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,flags:/^\/(.*)\/(.*)?/,integer:/^\-?\d+$/,number:/^\-?\d*(\.\d+)?$/,url:/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/i},text:{unspecifiedRule:"Please enter a valid value",unspecifiedField:"This field"},prompt:{empty:"{name} must have a value",checked:"{name} must be checked",email:"{name} must be a valid e-mail",url:"{name} must be a valid url",regExp:"{name} is not formatted correctly",integer:"{name} must be an integer",decimal:"{name} must be a decimal number",number:"{name} must be set to a number",is:'{name} must be "{ruleValue}"',isExactly:'{name} must be exactly "{ruleValue}"',not:'{name} cannot be set to "{ruleValue}"',notExactly:'{name} cannot be set to exactly "{ruleValue}"',contain:'{name} cannot contain "{ruleValue}"',containExactly:'{name} cannot contain exactly "{ruleValue}"',doesntContain:'{name} must contain  "{ruleValue}"',doesntContainExactly:'{name} must contain exactly "{ruleValue}"',minLength:"{name} must be at least {ruleValue} characters",length:"{name} must be at least {ruleValue} characters",exactLength:"{name} must be exactly {ruleValue} characters",maxLength:"{name} cannot be longer than {ruleValue} characters",match:"{name} must match {ruleValue} field",different:"{name} must have a different value than {ruleValue} field",creditCard:"{name} must be a valid credit card number",minCount:"{name} must have at least {ruleValue} choices",exactCount:"{name} must have exactly {ruleValue} choices",maxCount:"{name} must have {ruleValue} or less choices"},selector:{checkbox:'input[type="checkbox"], input[type="radio"]',clear:".clear",field:"input, textarea, select",group:".field",input:"input",message:".error.message",prompt:".prompt.label",radio:'input[type="radio"]',reset:'.reset:not([type="reset"])',submit:'.submit:not([type="submit"])',uiCheckbox:".ui.checkbox",uiDropdown:".ui.dropdown"},className:{error:"error",label:"ui prompt label",pressed:"down",success:"success"},error:{identifier:"You must specify a string identifier for each field",method:"The method you called is not defined.",noRule:"There is no rule matching the one you specified",oldSyntax:"Starting in 2.0 forms now only take a single settings object. Validation settings converted to new syntax automatically."},templates:{error:function(t){var n='<ul class="list">';return e.each(t,function(e,t){n+="<li>"+t+"</li>"}),n+="</ul>",e(n)},prompt:function(t){return e("<div/>").addClass("ui basic red pointing prompt label").html(t[0])}},rules:{empty:function(t){return!(void 0===t||""===t||e.isArray(t)&&0===t.length)},checked:function(){return e(this).filter(":checked").length>0},email:function(t){return e.fn.form.settings.regExp.email.test(t)},url:function(t){return e.fn.form.settings.regExp.url.test(t)},regExp:function(t,n){if(n instanceof RegExp)return t.match(n);var i,o=n.match(e.fn.form.settings.regExp.flags);return o&&(n=o.length>=2?o[1]:n,i=o.length>=3?o[2]:""),t.match(new RegExp(n,i))},integer:function(t,n){var i,o,a,r=e.fn.form.settings.regExp.integer;return n&&-1===["",".."].indexOf(n)&&(-1==n.indexOf("..")?r.test(n)&&(i=o=n-0):(a=n.split("..",2),r.test(a[0])&&(i=a[0]-0),r.test(a[1])&&(o=a[1]-0))),r.test(t)&&(void 0===i||t>=i)&&(void 0===o||t<=o)},decimal:function(t){return e.fn.form.settings.regExp.decimal.test(t)},number:function(t){return e.fn.form.settings.regExp.number.test(t)},is:function(e,t){return t="string"==typeof t?t.toLowerCase():t,(e="string"==typeof e?e.toLowerCase():e)==t},isExactly:function(e,t){return e==t},not:function(e,t){return e="string"==typeof e?e.toLowerCase():e,t="string"==typeof t?t.toLowerCase():t,e!=t},notExactly:function(e,t){return e!=t},contains:function(t,n){return n=n.replace(e.fn.form.settings.regExp.escape,"\\$&"),-1!==t.search(new RegExp(n,"i"))},containsExactly:function(t,n){return n=n.replace(e.fn.form.settings.regExp.escape,"\\$&"),-1!==t.search(new RegExp(n))},doesntContain:function(t,n){return n=n.replace(e.fn.form.settings.regExp.escape,"\\$&"),-1===t.search(new RegExp(n,"i"))},doesntContainExactly:function(t,n){return n=n.replace(e.fn.form.settings.regExp.escape,"\\$&"),-1===t.search(new RegExp(n))},minLength:function(e,t){return void 0!==e&&e.length>=t},length:function(e,t){return void 0!==e&&e.length>=t},exactLength:function(e,t){return void 0!==e&&e.length==t},maxLength:function(e,t){return void 0!==e&&e.length<=t},match:function(t,n){var i;e(this);return e('[data-validate="'+n+'"]').length>0?i=e('[data-validate="'+n+'"]').val():e("#"+n).length>0?i=e("#"+n).val():e('[name="'+n+'"]').length>0?i=e('[name="'+n+'"]').val():e('[name="'+n+'[]"]').length>0&&(i=e('[name="'+n+'[]"]')),void 0!==i&&t.toString()==i.toString()},different:function(t,n){var i;e(this);return e('[data-validate="'+n+'"]').length>0?i=e('[data-validate="'+n+'"]').val():e("#"+n).length>0?i=e("#"+n).val():e('[name="'+n+'"]').length>0?i=e('[name="'+n+'"]').val():e('[name="'+n+'[]"]').length>0&&(i=e('[name="'+n+'[]"]')),void 0!==i&&t.toString()!==i.toString()},creditCard:function(t,n){var i,o,a={visa:{pattern:/^4/,length:[16]},amex:{pattern:/^3[47]/,length:[15]},mastercard:{pattern:/^5[1-5]/,length:[16]},discover:{pattern:/^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,length:[16]},unionPay:{pattern:/^(62|88)/,length:[16,17,18,19]},jcb:{pattern:/^35(2[89]|[3-8][0-9])/,length:[16]},maestro:{pattern:/^(5018|5020|5038|6304|6759|676[1-3])/,length:[12,13,14,15,16,17,18,19]},dinersClub:{pattern:/^(30[0-5]|^36)/,length:[14]},laser:{pattern:/^(6304|670[69]|6771)/,length:[16,17,18,19]},visaElectron:{pattern:/^(4026|417500|4508|4844|491(3|7))/,length:[16]}},r={},s=!1,l="string"==typeof n&&n.split(",");if("string"==typeof t&&0!==t.length){if(t=t.replace(/[\-]/g,""),l&&(e.each(l,function(n,i){(o=a[i])&&(r={length:-1!==e.inArray(t.length,o.length),pattern:-1!==t.search(o.pattern)}).length&&r.pattern&&(s=!0)}),!s))return!1;if((i={number:-1!==e.inArray(t.length,a.unionPay.length),pattern:-1!==t.search(a.unionPay.pattern)}).number&&i.pattern)return!0;for(var c=t.length,u=0,d=[[0,1,2,3,4,5,6,7,8,9],[0,2,4,6,8,1,3,5,7,9]],f=0;c--;)f+=d[u][parseInt(t.charAt(c),10)],u^=1;return f%10==0&&f>0}},minCount:function(e,t){return 0==t||(1==t?""!==e:e.split(",").length>=t)},exactCount:function(e,t){return 0==t?""===e:1==t?""!==e&&-1===e.search(","):e.split(",").length==t},maxCount:function(e,t){return 0!=t&&(1==t?-1===e.search(","):e.split(",").length<=t)}}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.accordion=function(n){var i,o=e(this),a=(new Date).getTime(),r=[],s=arguments[0],l="string"==typeof s,c=[].slice.call(arguments,1);t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame;return o.each(function(){var u,d,f=e.isPlainObject(n)?e.extend(!0,{},e.fn.accordion.settings,n):e.extend({},e.fn.accordion.settings),m=f.className,g=f.namespace,v=f.selector,p=f.error,h="."+g,b="module-"+g,y=o.selector||"",x=e(this),C=x.find(v.title),w=x.find(v.content),k=this,S=x.data(b);d={initialize:function(){d.debug("Initializing",x),d.bind.events(),f.observeChanges&&d.observeChanges(),d.instantiate()},instantiate:function(){S=d,x.data(b,d)},destroy:function(){d.debug("Destroying previous instance",x),x.off(h).removeData(b)},refresh:function(){C=x.find(v.title),w=x.find(v.content)},observeChanges:function(){"MutationObserver"in t&&((u=new MutationObserver(function(e){d.debug("DOM tree modified, updating selector cache"),d.refresh()})).observe(k,{childList:!0,subtree:!0}),d.debug("Setting up mutation observer",u))},bind:{events:function(){d.debug("Binding delegated events"),x.on(f.on+h,v.trigger,d.event.click)}},event:{click:function(){d.toggle.call(this)}},toggle:function(t){var n=void 0!==t?"number"==typeof t?C.eq(t):e(t).closest(v.title):e(this).closest(v.title),i=n.next(w),o=i.hasClass(m.animating),a=i.hasClass(m.active),r=a&&!o,s=!a&&o;d.debug("Toggling visibility of content",n),r||s?f.collapsible?d.close.call(n):d.debug("Cannot close accordion content collapsing is disabled"):d.open.call(n)},open:function(t){var n=void 0!==t?"number"==typeof t?C.eq(t):e(t).closest(v.title):e(this).closest(v.title),i=n.next(w),o=i.hasClass(m.animating);i.hasClass(m.active)||o?d.debug("Accordion already open, skipping",i):(d.debug("Opening accordion content",n),f.onOpening.call(i),f.exclusive&&d.closeOthers.call(n),n.addClass(m.active),i.stop(!0,!0).addClass(m.animating),f.animateChildren&&(void 0!==e.fn.transition&&x.transition("is supported")?i.children().transition({animation:"fade in",queue:!1,useFailSafe:!0,debug:f.debug,verbose:f.verbose,duration:f.duration}):i.children().stop(!0,!0).animate({opacity:1},f.duration,d.resetOpacity)),i.slideDown(f.duration,f.easing,function(){i.removeClass(m.animating).addClass(m.active),d.reset.display.call(this),f.onOpen.call(this),f.onChange.call(this)}))},close:function(t){var n=void 0!==t?"number"==typeof t?C.eq(t):e(t).closest(v.title):e(this).closest(v.title),i=n.next(w),o=i.hasClass(m.animating),a=i.hasClass(m.active);!a&&!(!a&&o)||a&&o||(d.debug("Closing accordion content",i),f.onClosing.call(i),n.removeClass(m.active),i.stop(!0,!0).addClass(m.animating),f.animateChildren&&(void 0!==e.fn.transition&&x.transition("is supported")?i.children().transition({animation:"fade out",queue:!1,useFailSafe:!0,debug:f.debug,verbose:f.verbose,duration:f.duration}):i.children().stop(!0,!0).animate({opacity:0},f.duration,d.resetOpacity)),i.slideUp(f.duration,f.easing,function(){i.removeClass(m.animating).removeClass(m.active),d.reset.display.call(this),f.onClose.call(this),f.onChange.call(this)}))},closeOthers:function(t){var n,i,o,a=void 0!==t?C.eq(t):e(this).closest(v.title),r=a.parents(v.content).prev(v.title),s=a.closest(v.accordion),l=v.title+"."+m.active+":visible",c=v.content+"."+m.active+":visible";f.closeNested?o=(n=s.find(l).not(r)).next(w):(n=s.find(l).not(r),i=s.find(c).find(l).not(r),o=(n=n.not(i)).next(w)),n.length>0&&(d.debug("Exclusive enabled, closing other content",n),n.removeClass(m.active),o.removeClass(m.animating).stop(!0,!0),f.animateChildren&&(void 0!==e.fn.transition&&x.transition("is supported")?o.children().transition({animation:"fade out",useFailSafe:!0,debug:f.debug,verbose:f.verbose,duration:f.duration}):o.children().stop(!0,!0).animate({opacity:0},f.duration,d.resetOpacity)),o.slideUp(f.duration,f.easing,function(){e(this).removeClass(m.active),d.reset.display.call(this)}))},reset:{display:function(){d.verbose("Removing inline display from element",this),e(this).css("display",""),""===e(this).attr("style")&&e(this).attr("style","").removeAttr("style")},opacity:function(){d.verbose("Removing inline opacity from element",this),e(this).css("opacity",""),""===e(this).attr("style")&&e(this).attr("style","").removeAttr("style")}},setting:function(t,n){if(d.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,f,t);else{if(void 0===n)return f[t];e.isPlainObject(f[t])?e.extend(!0,f[t],n):f[t]=n}},internal:function(t,n){if(d.debug("Changing internal",t,n),void 0===n)return d[t];e.isPlainObject(t)?e.extend(!0,d,t):d[t]=n},debug:function(){!f.silent&&f.debug&&(f.performance?d.performance.log(arguments):(d.debug=Function.prototype.bind.call(console.info,console,f.name+":"),d.debug.apply(console,arguments)))},verbose:function(){!f.silent&&f.verbose&&f.debug&&(f.performance?d.performance.log(arguments):(d.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),d.verbose.apply(console,arguments)))},error:function(){f.silent||(d.error=Function.prototype.bind.call(console.error,console,f.name+":"),d.error.apply(console,arguments))},performance:{log:function(e){var t,n;f.performance&&(n=(t=(new Date).getTime())-(a||t),a=t,r.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:k,"Execution Time":n})),clearTimeout(d.performance.timer),d.performance.timer=setTimeout(d.performance.display,500)},display:function(){var t=f.name+":",n=0;a=!1,clearTimeout(d.performance.timer),e.each(r,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",y&&(t+=" '"+y+"'"),(void 0!==console.group||void 0!==console.table)&&r.length>0&&(console.groupCollapsed(t),console.table?console.table(r):e.each(r,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),r=[]}},invoke:function(t,n,o){var a,r,s,l=S;return n=n||c,o=k||o,"string"==typeof t&&void 0!==l&&(t=t.split(/[\. ]/),a=t.length-1,e.each(t,function(n,i){var o=n!=a?i+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[o])&&n!=a)l=l[o];else{if(void 0!==l[o])return r=l[o],!1;if(!e.isPlainObject(l[i])||n==a)return void 0!==l[i]?(r=l[i],!1):(d.error(p.method,t),!1);l=l[i]}})),e.isFunction(r)?s=r.apply(o,n):void 0!==r&&(s=r),e.isArray(i)?i.push(s):void 0!==i?i=[i,s]:void 0!==s&&(i=s),r}},l?(void 0===S&&d.initialize(),d.invoke(s)):(void 0!==S&&S.invoke("destroy"),d.initialize())}),void 0!==i?i:this},e.fn.accordion.settings={name:"Accordion",namespace:"accordion",silent:!1,debug:!1,verbose:!1,performance:!0,on:"click",observeChanges:!0,exclusive:!0,collapsible:!0,closeNested:!1,animateChildren:!0,duration:350,easing:"easeOutQuad",onOpening:function(){},onOpen:function(){},onClosing:function(){},onClose:function(){},onChange:function(){},error:{method:"The method you called is not defined"},className:{active:"active",animating:"animating"},selector:{accordion:".accordion",title:".title",trigger:".title",content:".content"}},e.extend(e.easing,{easeOutQuad:function(e,t,n,i,o){return-i*(t/=o)*(t-2)+n}})}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.checkbox=function(i){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),l=[],c=arguments[0],u="string"==typeof c,d=[].slice.call(arguments,1);return a.each(function(){var a,f,m=e.extend(!0,{},e.fn.checkbox.settings,i),g=m.className,v=m.namespace,p=m.selector,h=m.error,b="."+v,y="module-"+v,x=e(this),C=e(this).children(p.label),w=e(this).children(p.input),k=w[0],S=!1,T=!1,A=x.data(y),R=this;f={initialize:function(){f.verbose("Initializing checkbox",m),f.create.label(),f.bind.events(),f.set.tabbable(),f.hide.input(),f.observeChanges(),f.instantiate(),f.setup()},instantiate:function(){f.verbose("Storing instance of module",f),A=f,x.data(y,f)},destroy:function(){f.verbose("Destroying module"),f.unbind.events(),f.show.input(),x.removeData(y)},fix:{reference:function(){x.is(p.input)&&(f.debug("Behavior called on <input> adjusting invoked element"),x=x.closest(p.checkbox),f.refresh())}},setup:function(){f.set.initialLoad(),f.is.indeterminate()?(f.debug("Initial value is indeterminate"),f.indeterminate()):f.is.checked()?(f.debug("Initial value is checked"),f.check()):(f.debug("Initial value is unchecked"),f.uncheck()),f.remove.initialLoad()},refresh:function(){C=x.children(p.label),w=x.children(p.input),k=w[0]},hide:{input:function(){f.verbose("Modifying <input> z-index to be unselectable"),w.addClass(g.hidden)}},show:{input:function(){f.verbose("Modifying <input> z-index to be selectable"),w.removeClass(g.hidden)}},observeChanges:function(){"MutationObserver"in t&&((a=new MutationObserver(function(e){f.debug("DOM tree modified, updating selector cache"),f.refresh()})).observe(R,{childList:!0,subtree:!0}),f.debug("Setting up mutation observer",a))},attachEvents:function(t,n){var i=e(t);n=e.isFunction(f[n])?f[n]:f.toggle,i.length>0?(f.debug("Attaching checkbox events to element",t,n),i.on("click"+b,n)):f.error(h.notFound)},event:{click:function(t){var n=e(t.target);n.is(p.input)?f.verbose("Using default check action on initialized checkbox"):n.is(p.link)?f.debug("Clicking link inside checkbox, skipping toggle"):(f.toggle(),w.focus(),t.preventDefault())},keydown:function(e){var t=e.which,n=13,i=32;t==27?(f.verbose("Escape key pressed blurring field"),w.blur(),T=!0):e.ctrlKey||t!=i&&t!=n?T=!1:(f.verbose("Enter/space key pressed, toggling checkbox"),f.toggle(),T=!0)},keyup:function(e){T&&e.preventDefault()}},check:function(){f.should.allowCheck()&&(f.debug("Checking checkbox",w),f.set.checked(),f.should.ignoreCallbacks()||(m.onChecked.call(k),m.onChange.call(k)))},uncheck:function(){f.should.allowUncheck()&&(f.debug("Unchecking checkbox"),f.set.unchecked(),f.should.ignoreCallbacks()||(m.onUnchecked.call(k),m.onChange.call(k)))},indeterminate:function(){f.should.allowIndeterminate()?f.debug("Checkbox is already indeterminate"):(f.debug("Making checkbox indeterminate"),f.set.indeterminate(),f.should.ignoreCallbacks()||(m.onIndeterminate.call(k),m.onChange.call(k)))},determinate:function(){f.should.allowDeterminate()?f.debug("Checkbox is already determinate"):(f.debug("Making checkbox determinate"),f.set.determinate(),f.should.ignoreCallbacks()||(m.onDeterminate.call(k),m.onChange.call(k)))},enable:function(){f.is.enabled()?f.debug("Checkbox is already enabled"):(f.debug("Enabling checkbox"),f.set.enabled(),m.onEnable.call(k),m.onEnabled.call(k))},disable:function(){f.is.disabled()?f.debug("Checkbox is already disabled"):(f.debug("Disabling checkbox"),f.set.disabled(),m.onDisable.call(k),m.onDisabled.call(k))},get:{radios:function(){var t=f.get.name();return e('input[name="'+t+'"]').closest(p.checkbox)},otherRadios:function(){return f.get.radios().not(x)},name:function(){return w.attr("name")}},is:{initialLoad:function(){return S},radio:function(){return w.hasClass(g.radio)||"radio"==w.attr("type")},indeterminate:function(){return void 0!==w.prop("indeterminate")&&w.prop("indeterminate")},checked:function(){return void 0!==w.prop("checked")&&w.prop("checked")},disabled:function(){return void 0!==w.prop("disabled")&&w.prop("disabled")},enabled:function(){return!f.is.disabled()},determinate:function(){return!f.is.indeterminate()},unchecked:function(){return!f.is.checked()}},should:{allowCheck:function(){return f.is.determinate()&&f.is.checked()&&!f.should.forceCallbacks()?(f.debug("Should not allow check, checkbox is already checked"),!1):!1!==m.beforeChecked.apply(k)||(f.debug("Should not allow check, beforeChecked cancelled"),!1)},allowUncheck:function(){return f.is.determinate()&&f.is.unchecked()&&!f.should.forceCallbacks()?(f.debug("Should not allow uncheck, checkbox is already unchecked"),!1):!1!==m.beforeUnchecked.apply(k)||(f.debug("Should not allow uncheck, beforeUnchecked cancelled"),!1)},allowIndeterminate:function(){return f.is.indeterminate()&&!f.should.forceCallbacks()?(f.debug("Should not allow indeterminate, checkbox is already indeterminate"),!1):!1!==m.beforeIndeterminate.apply(k)||(f.debug("Should not allow indeterminate, beforeIndeterminate cancelled"),!1)},allowDeterminate:function(){return f.is.determinate()&&!f.should.forceCallbacks()?(f.debug("Should not allow determinate, checkbox is already determinate"),!1):!1!==m.beforeDeterminate.apply(k)||(f.debug("Should not allow determinate, beforeDeterminate cancelled"),!1)},forceCallbacks:function(){return f.is.initialLoad()&&m.fireOnInit},ignoreCallbacks:function(){return S&&!m.fireOnInit}},can:{change:function(){return!(x.hasClass(g.disabled)||x.hasClass(g.readOnly)||w.prop("disabled")||w.prop("readonly"))},uncheck:function(){return"boolean"==typeof m.uncheckable?m.uncheckable:!f.is.radio()}},set:{initialLoad:function(){S=!0},checked:function(){f.verbose("Setting class to checked"),x.removeClass(g.indeterminate).addClass(g.checked),f.is.radio()&&f.uncheckOthers(),f.is.indeterminate()||!f.is.checked()?(f.verbose("Setting state to checked",k),w.prop("indeterminate",!1).prop("checked",!0),f.trigger.change()):f.debug("Input is already checked, skipping input property change")},unchecked:function(){f.verbose("Removing checked class"),x.removeClass(g.indeterminate).removeClass(g.checked),f.is.indeterminate()||!f.is.unchecked()?(f.debug("Setting state to unchecked"),w.prop("indeterminate",!1).prop("checked",!1),f.trigger.change()):f.debug("Input is already unchecked")},indeterminate:function(){f.verbose("Setting class to indeterminate"),x.addClass(g.indeterminate),f.is.indeterminate()?f.debug("Input is already indeterminate, skipping input property change"):(f.debug("Setting state to indeterminate"),w.prop("indeterminate",!0),f.trigger.change())},determinate:function(){f.verbose("Removing indeterminate class"),x.removeClass(g.indeterminate),f.is.determinate()?f.debug("Input is already determinate, skipping input property change"):(f.debug("Setting state to determinate"),w.prop("indeterminate",!1))},disabled:function(){f.verbose("Setting class to disabled"),x.addClass(g.disabled),f.is.disabled()?f.debug("Input is already disabled, skipping input property change"):(f.debug("Setting state to disabled"),w.prop("disabled","disabled"),f.trigger.change())},enabled:function(){f.verbose("Removing disabled class"),x.removeClass(g.disabled),f.is.enabled()?f.debug("Input is already enabled, skipping input property change"):(f.debug("Setting state to enabled"),w.prop("disabled",!1),f.trigger.change())},tabbable:function(){f.verbose("Adding tabindex to checkbox"),void 0===w.attr("tabindex")&&w.attr("tabindex",0)}},remove:{initialLoad:function(){S=!1}},trigger:{change:function(){var e=n.createEvent("HTMLEvents"),t=w[0];t&&(f.verbose("Triggering native change event"),e.initEvent("change",!0,!1),t.dispatchEvent(e))}},create:{label:function(){w.prevAll(p.label).length>0?(w.prev(p.label).detach().insertAfter(w),f.debug("Moving existing label",C)):f.has.label()||(C=e("<label>").insertAfter(w),f.debug("Creating label",C))}},has:{label:function(){return C.length>0}},bind:{events:function(){f.verbose("Attaching checkbox events"),x.on("click"+b,f.event.click).on("keydown"+b,p.input,f.event.keydown).on("keyup"+b,p.input,f.event.keyup)}},unbind:{events:function(){f.debug("Removing events"),x.off(b)}},uncheckOthers:function(){var e=f.get.otherRadios();f.debug("Unchecking other radios",e),e.removeClass(g.checked)},toggle:function(){f.can.change()?f.is.indeterminate()||f.is.unchecked()?(f.debug("Currently unchecked"),f.check()):f.is.checked()&&f.can.uncheck()&&(f.debug("Currently checked"),f.uncheck()):f.is.radio()||f.debug("Checkbox is read-only or disabled, ignoring toggle")},setting:function(t,n){if(f.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,m,t);else{if(void 0===n)return m[t];e.isPlainObject(m[t])?e.extend(!0,m[t],n):m[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(void 0===n)return f[t];f[t]=n}},debug:function(){!m.silent&&m.debug&&(m.performance?f.performance.log(arguments):(f.debug=Function.prototype.bind.call(console.info,console,m.name+":"),f.debug.apply(console,arguments)))},verbose:function(){!m.silent&&m.verbose&&m.debug&&(m.performance?f.performance.log(arguments):(f.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),f.verbose.apply(console,arguments)))},error:function(){m.silent||(f.error=Function.prototype.bind.call(console.error,console,m.name+":"),f.error.apply(console,arguments))},performance:{log:function(e){var t,n;m.performance&&(n=(t=(new Date).getTime())-(s||t),s=t,l.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:R,"Execution Time":n})),clearTimeout(f.performance.timer),f.performance.timer=setTimeout(f.performance.display,500)},display:function(){var t=m.name+":",n=0;s=!1,clearTimeout(f.performance.timer),e.each(l,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(void 0!==console.group||void 0!==console.table)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,n,i){var a,r,s,l=A;return n=n||d,i=R||i,"string"==typeof t&&void 0!==l&&(t=t.split(/[\. ]/),a=t.length-1,e.each(t,function(n,i){var o=n!=a?i+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[o])&&n!=a)l=l[o];else{if(void 0!==l[o])return r=l[o],!1;if(!e.isPlainObject(l[i])||n==a)return void 0!==l[i]?(r=l[i],!1):(f.error(h.method,t),!1);l=l[i]}})),e.isFunction(r)?s=r.apply(i,n):void 0!==r&&(s=r),e.isArray(o)?o.push(s):void 0!==o?o=[o,s]:void 0!==s&&(o=s),r}},u?(void 0===A&&f.initialize(),f.invoke(c)):(void 0!==A&&A.invoke("destroy"),f.initialize())}),void 0!==o?o:this},e.fn.checkbox.settings={name:"Checkbox",namespace:"checkbox",silent:!1,debug:!1,verbose:!0,performance:!0,uncheckable:"auto",fireOnInit:!1,onChange:function(){},beforeChecked:function(){},beforeUnchecked:function(){},beforeDeterminate:function(){},beforeIndeterminate:function(){},onChecked:function(){},onUnchecked:function(){},onDeterminate:function(){},onIndeterminate:function(){},onEnable:function(){},onDisable:function(){},onEnabled:function(){},onDisabled:function(){},className:{checked:"checked",indeterminate:"indeterminate",disabled:"disabled",hidden:"hidden",radio:"radio",readOnly:"read-only"},error:{method:"The method you called is not defined"},selector:{checkbox:".ui.checkbox",label:"label, .box",input:'input[type="checkbox"], input[type="radio"]',link:"a[href]"}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.dimmer=function(t){var i,o=e(this),a=(new Date).getTime(),r=[],s=arguments[0],l="string"==typeof s,c=[].slice.call(arguments,1);return o.each(function(){var u,d,f,m=e.isPlainObject(t)?e.extend(!0,{},e.fn.dimmer.settings,t):e.extend({},e.fn.dimmer.settings),g=m.selector,v=m.namespace,p=m.className,h=m.error,b="."+v,y="module-"+v,x=o.selector||"",C="ontouchstart"in n.documentElement?"touchstart":"click",w=e(this),k=this,S=w.data(y);(f={preinitialize:function(){f.is.dimmer()?(d=w.parent(),u=w):(d=w,u=f.has.dimmer()?m.dimmerName?d.find(g.dimmer).filter("."+m.dimmerName):d.find(g.dimmer):f.create(),f.set.variation())},initialize:function(){f.debug("Initializing dimmer",m),f.bind.events(),f.set.dimmable(),f.instantiate()},instantiate:function(){f.verbose("Storing instance of module",f),S=f,w.data(y,S)},destroy:function(){f.verbose("Destroying previous module",u),f.unbind.events(),f.remove.variation(),d.off(b)},bind:{events:function(){"hover"==m.on?d.on("mouseenter"+b,f.show).on("mouseleave"+b,f.hide):"click"==m.on&&d.on(C+b,f.toggle),f.is.page()&&(f.debug("Setting as a page dimmer",d),f.set.pageDimmer()),f.is.closable()&&(f.verbose("Adding dimmer close event",u),d.on(C+b,g.dimmer,f.event.click))}},unbind:{events:function(){w.removeData(y),d.off(b)}},event:{click:function(t){f.verbose("Determining if event occured on dimmer",t),(0===u.find(t.target).length||e(t.target).is(g.content))&&(f.hide(),t.stopImmediatePropagation())}},addContent:function(t){var n=e(t);f.debug("Add content to dimmer",n),n.parent()[0]!==u[0]&&n.detach().appendTo(u)},create:function(){var t=e(m.template.dimmer());return m.dimmerName&&(f.debug("Creating named dimmer",m.dimmerName),t.addClass(m.dimmerName)),t.appendTo(d),t},show:function(t){t=e.isFunction(t)?t:function(){},f.debug("Showing dimmer",u,m),f.is.dimmed()&&!f.is.animating()||!f.is.enabled()?f.debug("Dimmer is already shown or disabled"):(f.animate.show(t),m.onShow.call(k),m.onChange.call(k))},hide:function(t){t=e.isFunction(t)?t:function(){},f.is.dimmed()||f.is.animating()?(f.debug("Hiding dimmer",u),f.animate.hide(t),m.onHide.call(k),m.onChange.call(k)):f.debug("Dimmer is not visible")},toggle:function(){f.verbose("Toggling dimmer visibility",u),f.is.dimmed()?f.hide():f.show()},animate:{show:function(t){t=e.isFunction(t)?t:function(){},m.useCSS&&void 0!==e.fn.transition&&u.transition("is supported")?("auto"!==m.opacity&&f.set.opacity(),u.transition({animation:m.transition+" in",queue:!1,duration:f.get.duration(),useFailSafe:!0,onStart:function(){f.set.dimmed()},onComplete:function(){f.set.active(),t()}})):(f.verbose("Showing dimmer animation with javascript"),f.set.dimmed(),"auto"==m.opacity&&(m.opacity=.8),u.stop().css({opacity:0,width:"100%",height:"100%"}).fadeTo(f.get.duration(),m.opacity,function(){u.removeAttr("style"),f.set.active(),t()}))},hide:function(t){t=e.isFunction(t)?t:function(){},m.useCSS&&void 0!==e.fn.transition&&u.transition("is supported")?(f.verbose("Hiding dimmer with css"),u.transition({animation:m.transition+" out",queue:!1,duration:f.get.duration(),useFailSafe:!0,onStart:function(){f.remove.dimmed()},onComplete:function(){f.remove.active(),t()}})):(f.verbose("Hiding dimmer with javascript"),f.remove.dimmed(),u.stop().fadeOut(f.get.duration(),function(){f.remove.active(),u.removeAttr("style"),t()}))}},get:{dimmer:function(){return u},duration:function(){return"object"==typeof m.duration?f.is.active()?m.duration.hide:m.duration.show:m.duration}},has:{dimmer:function(){return m.dimmerName?w.find(g.dimmer).filter("."+m.dimmerName).length>0:w.find(g.dimmer).length>0}},is:{active:function(){return u.hasClass(p.active)},animating:function(){return u.is(":animated")||u.hasClass(p.animating)},closable:function(){return"auto"==m.closable?"hover"!=m.on:m.closable},dimmer:function(){return w.hasClass(p.dimmer)},dimmable:function(){return w.hasClass(p.dimmable)},dimmed:function(){return d.hasClass(p.dimmed)},disabled:function(){return d.hasClass(p.disabled)},enabled:function(){return!f.is.disabled()},page:function(){return d.is("body")},pageDimmer:function(){return u.hasClass(p.pageDimmer)}},can:{show:function(){return!u.hasClass(p.disabled)}},set:{opacity:function(e){var t=u.css("background-color"),n=t.split(","),i=n&&3==n.length,o=n&&4==n.length;e=0===m.opacity?0:m.opacity||e,i||o?(n[3]=e+")",t=n.join(",")):t="rgba(0, 0, 0, "+e+")",f.debug("Setting opacity to",e),u.css("background-color",t)},active:function(){u.addClass(p.active)},dimmable:function(){d.addClass(p.dimmable)},dimmed:function(){d.addClass(p.dimmed)},pageDimmer:function(){u.addClass(p.pageDimmer)},disabled:function(){u.addClass(p.disabled)},variation:function(e){(e=e||m.variation)&&u.addClass(e)}},remove:{active:function(){u.removeClass(p.active)},dimmed:function(){d.removeClass(p.dimmed)},disabled:function(){u.removeClass(p.disabled)},variation:function(e){(e=e||m.variation)&&u.removeClass(e)}},setting:function(t,n){if(f.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,m,t);else{if(void 0===n)return m[t];e.isPlainObject(m[t])?e.extend(!0,m[t],n):m[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(void 0===n)return f[t];f[t]=n}},debug:function(){!m.silent&&m.debug&&(m.performance?f.performance.log(arguments):(f.debug=Function.prototype.bind.call(console.info,console,m.name+":"),f.debug.apply(console,arguments)))},verbose:function(){!m.silent&&m.verbose&&m.debug&&(m.performance?f.performance.log(arguments):(f.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),f.verbose.apply(console,arguments)))},error:function(){m.silent||(f.error=Function.prototype.bind.call(console.error,console,m.name+":"),f.error.apply(console,arguments))},performance:{log:function(e){var t,n;m.performance&&(n=(t=(new Date).getTime())-(a||t),a=t,r.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:k,"Execution Time":n})),clearTimeout(f.performance.timer),f.performance.timer=setTimeout(f.performance.display,500)},display:function(){var t=m.name+":",n=0;a=!1,clearTimeout(f.performance.timer),e.each(r,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",x&&(t+=" '"+x+"'"),o.length>1&&(t+=" ("+o.length+")"),(void 0!==console.group||void 0!==console.table)&&r.length>0&&(console.groupCollapsed(t),console.table?console.table(r):e.each(r,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),r=[]}},invoke:function(t,n,o){var a,r,s,l=S;return n=n||c,o=k||o,"string"==typeof t&&void 0!==l&&(t=t.split(/[\. ]/),a=t.length-1,e.each(t,function(n,i){var o=n!=a?i+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[o])&&n!=a)l=l[o];else{if(void 0!==l[o])return r=l[o],!1;if(!e.isPlainObject(l[i])||n==a)return void 0!==l[i]?(r=l[i],!1):(f.error(h.method,t),!1);l=l[i]}})),e.isFunction(r)?s=r.apply(o,n):void 0!==r&&(s=r),e.isArray(i)?i.push(s):void 0!==i?i=[i,s]:void 0!==s&&(i=s),r}}).preinitialize(),l?(void 0===S&&f.initialize(),f.invoke(s)):(void 0!==S&&S.invoke("destroy"),f.initialize())}),void 0!==i?i:this},e.fn.dimmer.settings={name:"Dimmer",namespace:"dimmer",silent:!1,debug:!1,verbose:!1,performance:!0,dimmerName:!1,variation:!1,closable:"auto",useCSS:!0,transition:"fade",on:!1,opacity:"auto",duration:{show:500,hide:500},onChange:function(){},onShow:function(){},onHide:function(){},error:{method:"The method you called is not defined."},className:{active:"active",animating:"animating",dimmable:"dimmable",dimmed:"dimmed",dimmer:"dimmer",disabled:"disabled",hide:"hide",pageDimmer:"page",show:"show"},selector:{dimmer:"> .ui.dimmer",content:".ui.dimmer > .content, .ui.dimmer > .content > .center"},template:{dimmer:function(){return e("<div />").attr("class","ui dimmer")}}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.dropdown=function(i){var o,a=e(this),r=e(n),s=a.selector||"",l="ontouchstart"in n.documentElement,c=(new Date).getTime(),u=[],d=arguments[0],f="string"==typeof d,m=[].slice.call(arguments,1);return a.each(function(g){var v,p,h,b,y,x,C,w,k=e.isPlainObject(i)?e.extend(!0,{},e.fn.dropdown.settings,i):e.extend({},e.fn.dropdown.settings),S=k.className,T=k.message,A=k.fields,R=k.keys,P=k.metadata,E=k.namespace,F=k.regExp,O=k.selector,D=k.error,q=k.templates,j="."+E,z="module-"+E,I=e(this),M=e(k.context),L=I.find(O.text),V=I.find(O.search),N=I.find(O.sizer),H=I.find(O.input),U=I.find(O.icon),W=I.prev().find(O.text).length>0?I.prev().find(O.text):I.prev(),B=I.children(O.menu),Q=B.find(O.item),X=!1,$=!1,Y=!1,Z=this,K=I.data(z);w={initialize:function(){w.debug("Initializing dropdown",k),w.is.alreadySetup()?w.setup.reference():(w.setup.layout(),k.values&&w.change.values(k.values),w.refreshData(),w.save.defaults(),w.restore.selected(),w.create.id(),w.bind.events(),w.observeChanges(),w.instantiate())},instantiate:function(){w.verbose("Storing instance of dropdown",w),K=w,I.data(z,w)},destroy:function(){w.verbose("Destroying previous dropdown",I),w.remove.tabbable(),I.off(j).removeData(z),B.off(j),r.off(b),w.disconnect.menuObserver(),w.disconnect.selectObserver()},observeChanges:function(){"MutationObserver"in t&&(x=new MutationObserver(w.event.select.mutation),C=new MutationObserver(w.event.menu.mutation),w.debug("Setting up mutation observer",x,C),w.observe.select(),w.observe.menu())},disconnect:{menuObserver:function(){C&&C.disconnect()},selectObserver:function(){x&&x.disconnect()}},observe:{select:function(){w.has.input()&&x.observe(I[0],{childList:!0,subtree:!0})},menu:function(){w.has.menu()&&C.observe(B[0],{childList:!0,subtree:!0})}},create:{id:function(){y=(Math.random().toString(16)+"000000000").substr(2,8),b="."+y,w.verbose("Creating unique id for element",y)},userChoice:function(t){var n,i,o;return!!(t=t||w.get.userValues())&&(t=e.isArray(t)?t:[t],e.each(t,function(t,a){!1===w.get.item(a)&&(o=k.templates.addition(w.add.variables(T.addResult,a)),i=e("<div />").html(o).attr("data-"+P.value,a).attr("data-"+P.text,a).addClass(S.addition).addClass(S.item),k.hideAdditions&&i.addClass(S.hidden),n=void 0===n?i:n.add(i),w.verbose("Creating user choices for value",a,i))}),n)},userLabels:function(t){var n=w.get.userValues();n&&(w.debug("Adding user labels",n),e.each(n,function(e,t){w.verbose("Adding custom user value"),w.add.label(t,t)}))},menu:function(){B=e("<div />").addClass(S.menu).appendTo(I)},sizer:function(){N=e("<span />").addClass(S.sizer).insertAfter(V)}},search:function(e){e=void 0!==e?e:w.get.query(),w.verbose("Searching for query",e),w.has.minCharacters(e)?w.filter(e):w.hide()},select:{firstUnfiltered:function(){w.verbose("Selecting first non-filtered element"),w.remove.selectedItem(),Q.not(O.unselectable).not(O.addition+O.hidden).eq(0).addClass(S.selected)},nextAvailable:function(e){var t=(e=e.eq(0)).nextAll(O.item).not(O.unselectable).eq(0),n=e.prevAll(O.item).not(O.unselectable).eq(0);t.length>0?(w.verbose("Moving selection to",t),t.addClass(S.selected)):(w.verbose("Moving selection to",n),n.addClass(S.selected))}},setup:{api:function(){var e={debug:k.debug,urlData:{value:w.get.value(),query:w.get.query()},on:!1};w.verbose("First request, initializing API"),I.api(e)},layout:function(){I.is("select")&&(w.setup.select(),w.setup.returnedObject()),w.has.menu()||w.create.menu(),w.is.search()&&!w.has.search()&&(w.verbose("Adding search input"),V=e("<input />").addClass(S.search).prop("autocomplete","off").insertBefore(L)),w.is.multiple()&&w.is.searchSelection()&&!w.has.sizer()&&w.create.sizer(),k.allowTab&&w.set.tabbable()},select:function(){var t=w.get.selectValues();w.debug("Dropdown initialized on a select",t),I.is("select")&&(H=I),H.parent(O.dropdown).length>0?(w.debug("UI dropdown already exists. Creating dropdown menu only"),I=H.closest(O.dropdown),w.has.menu()||w.create.menu(),B=I.children(O.menu),w.setup.menu(t)):(w.debug("Creating entire dropdown from select"),I=e("<div />").attr("class",H.attr("class")).addClass(S.selection).addClass(S.dropdown).html(q.dropdown(t)).insertBefore(H),H.hasClass(S.multiple)&&!1===H.prop("multiple")&&(w.error(D.missingMultiple),H.prop("multiple",!0)),H.is("[multiple]")&&w.set.multiple(),H.prop("disabled")&&(w.debug("Disabling dropdown"),I.addClass(S.disabled)),H.removeAttr("class").detach().prependTo(I)),w.refresh()},menu:function(e){B.html(q.menu(e,A)),Q=B.find(O.item)},reference:function(){w.debug("Dropdown behavior was called on select, replacing with closest dropdown"),I=I.parent(O.dropdown),K=I.data(z),Z=I.get(0),w.refresh(),w.setup.returnedObject()},returnedObject:function(){var e=a.slice(0,g),t=a.slice(g+1);a=e.add(I).add(t)}},refresh:function(){w.refreshSelectors(),w.refreshData()},refreshItems:function(){Q=B.find(O.item)},refreshSelectors:function(){w.verbose("Refreshing selector cache"),L=I.find(O.text),V=I.find(O.search),H=I.find(O.input),U=I.find(O.icon),W=I.prev().find(O.text).length>0?I.prev().find(O.text):I.prev(),B=I.children(O.menu),Q=B.find(O.item)},refreshData:function(){w.verbose("Refreshing cached metadata"),Q.removeData(P.text).removeData(P.value)},clearData:function(){w.verbose("Clearing metadata"),Q.removeData(P.text).removeData(P.value),I.removeData(P.defaultText).removeData(P.defaultValue).removeData(P.placeholderText)},toggle:function(){w.verbose("Toggling menu visibility"),w.is.active()?w.hide():w.show()},show:function(t){if(t=e.isFunction(t)?t:function(){},!w.can.show()&&w.is.remote()&&(w.debug("No API results retrieved, searching before show"),w.queryRemote(w.get.query(),w.show)),w.can.show()&&!w.is.active()){if(w.debug("Showing dropdown"),!w.has.message()||w.has.maxSelections()||w.has.allResultsFiltered()||w.remove.message(),w.is.allFiltered())return!0;!1!==k.onShow.call(Z)&&w.animate.show(function(){w.can.click()&&w.bind.intent(),w.has.menuSearch()&&w.focusSearch(),w.set.visible(),t.call(Z)})}},hide:function(t){t=e.isFunction(t)?t:function(){},w.is.active()&&(w.debug("Hiding dropdown"),!1!==k.onHide.call(Z)&&w.animate.hide(function(){w.remove.visible(),t.call(Z)}))},hideOthers:function(){w.verbose("Finding other dropdowns to hide"),a.not(I).has(O.menu+"."+S.visible).dropdown("hide")},hideMenu:function(){w.verbose("Hiding menu  instantaneously"),w.remove.active(),w.remove.visible(),B.transition("hide")},hideSubMenus:function(){var e=B.children(O.item).find(O.menu);w.verbose("Hiding sub menus",e),e.transition("hide")},bind:{events:function(){l&&w.bind.touchEvents(),w.bind.keyboardEvents(),w.bind.inputEvents(),w.bind.mouseEvents()},touchEvents:function(){w.debug("Touch device detected binding additional touch events"),w.is.searchSelection()||w.is.single()&&I.on("touchstart"+j,w.event.test.toggle),B.on("touchstart"+j,O.item,w.event.item.mouseenter)},keyboardEvents:function(){w.verbose("Binding keyboard events"),I.on("keydown"+j,w.event.keydown),w.has.search()&&I.on(w.get.inputEvent()+j,O.search,w.event.input),w.is.multiple()&&r.on("keydown"+b,w.event.document.keydown)},inputEvents:function(){w.verbose("Binding input change events"),I.on("change"+j,O.input,w.event.change)},mouseEvents:function(){w.verbose("Binding mouse events"),w.is.multiple()&&I.on("click"+j,O.label,w.event.label.click).on("click"+j,O.remove,w.event.remove.click),w.is.searchSelection()?(I.on("mousedown"+j,w.event.mousedown).on("mouseup"+j,w.event.mouseup).on("mousedown"+j,O.menu,w.event.menu.mousedown).on("mouseup"+j,O.menu,w.event.menu.mouseup).on("click"+j,O.icon,w.event.icon.click).on("focus"+j,O.search,w.event.search.focus).on("click"+j,O.search,w.event.search.focus).on("blur"+j,O.search,w.event.search.blur).on("click"+j,O.text,w.event.text.focus),w.is.multiple()&&I.on("click"+j,w.event.click)):("click"==k.on?I.on("click"+j,O.icon,w.event.icon.click).on("click"+j,w.event.test.toggle):"hover"==k.on?I.on("mouseenter"+j,w.delay.show).on("mouseleave"+j,w.delay.hide):I.on(k.on+j,w.toggle),I.on("mousedown"+j,w.event.mousedown).on("mouseup"+j,w.event.mouseup).on("focus"+j,w.event.focus),w.has.menuSearch()?I.on("blur"+j,O.search,w.event.search.blur):I.on("blur"+j,w.event.blur)),B.on("mouseenter"+j,O.item,w.event.item.mouseenter).on("mouseleave"+j,O.item,w.event.item.mouseleave).on("click"+j,O.item,w.event.item.click)},intent:function(){w.verbose("Binding hide intent event to document"),l&&r.on("touchstart"+b,w.event.test.touch).on("touchmove"+b,w.event.test.touch),r.on("click"+b,w.event.test.hide)}},unbind:{intent:function(){w.verbose("Removing hide intent event from document"),l&&r.off("touchstart"+b).off("touchmove"+b),r.off("click"+b)}},filter:function(e){var t=void 0!==e?e:w.get.query(),n=function(){w.is.multiple()&&w.filterActive(),(e||!e&&0==w.get.activeItem().length)&&w.select.firstUnfiltered(),w.has.allResultsFiltered()?k.onNoResults.call(Z,t)?k.allowAdditions?k.hideAdditions&&(w.verbose("User addition with no menu, setting empty style"),w.set.empty(),w.hideMenu()):(w.verbose("All items filtered, showing message",t),w.add.message(T.noResults)):(w.verbose("All items filtered, hiding dropdown",t),w.hideMenu()):(w.remove.empty(),w.remove.message()),k.allowAdditions&&w.add.userSuggestion(e),w.is.searchSelection()&&w.can.show()&&w.is.focusedOnSearch()&&w.show()};k.useLabels&&w.has.maxSelections()||(k.apiSettings?w.can.useAPI()?w.queryRemote(t,function(){k.filterRemoteData&&w.filterItems(t),n()}):w.error(D.noAPI):(w.filterItems(t),n()))},queryRemote:function(t,n){var i={errorDuration:!1,cache:"local",throttle:k.throttle,urlData:{query:t},onError:function(){w.add.message(T.serverError),n()},onFailure:function(){w.add.message(T.serverError),n()},onSuccess:function(e){w.remove.message(),w.setup.menu({values:e[A.remoteValues]}),n()}};I.api("get request")||w.setup.api(),i=e.extend(!0,{},i,k.apiSettings),I.api("setting",i).api("query")},filterItems:function(t){var n=void 0!==t?t:w.get.query(),i=null,o=w.escape.string(n),a=new RegExp("^"+o,"igm");w.has.query()&&(i=[],w.verbose("Searching for matching values",n),Q.each(function(){var t,o,r=e(this);if("both"==k.match||"text"==k.match){if(-1!==(t=String(w.get.choiceText(r,!1))).search(a))return i.push(this),!0;if("exact"===k.fullTextSearch&&w.exactSearch(n,t))return i.push(this),!0;if(!0===k.fullTextSearch&&w.fuzzySearch(n,t))return i.push(this),!0}if("both"==k.match||"value"==k.match){if(-1!==(o=String(w.get.choiceValue(r,t))).search(a))return i.push(this),!0;if("exact"===k.fullTextSearch&&w.exactSearch(n,o))return i.push(this),!0;if(!0===k.fullTextSearch&&w.fuzzySearch(n,o))return i.push(this),!0}})),w.debug("Showing only matched items",n),w.remove.filteredItem(),i&&Q.not(i).addClass(S.filtered)},fuzzySearch:function(e,t){var n=t.length,i=e.length;if(e=e.toLowerCase(),t=t.toLowerCase(),i>n)return!1;if(i===n)return e===t;e:for(var o=0,a=0;o<i;o++){for(var r=e.charCodeAt(o);a<n;)if(t.charCodeAt(a++)===r)continue e;return!1}return!0},exactSearch:function(e,t){return e=e.toLowerCase(),(t=t.toLowerCase()).indexOf(e)>-1},filterActive:function(){k.useLabels&&Q.filter("."+S.active).addClass(S.filtered)},focusSearch:function(e){w.has.search()&&!w.is.focusedOnSearch()&&(e?(I.off("focus"+j,O.search),V.focus(),I.on("focus"+j,O.search,w.event.search.focus)):V.focus())},forceSelection:function(){var e=Q.not(S.filtered).filter("."+S.selected).eq(0),t=Q.not(S.filtered).filter("."+S.active).eq(0),n=e.length>0?e:t;if(n.length>0&&!w.is.multiple())return w.debug("Forcing partial selection to selected item",n),void w.event.item.click.call(n,{},!0);k.allowAdditions?(w.set.selected(w.get.query()),w.remove.searchTerm()):w.remove.searchTerm()},change:{values:function(t){k.allowAdditions||w.clear(),w.debug("Creating dropdown with specified values",t),w.setup.menu({values:t}),e.each(t,function(e,t){if(1==t.selected)return w.debug("Setting initial selection to",t.value),w.set.selected(t.value),!0})}},event:{change:function(){Y||(w.debug("Input changed, updating selection"),w.set.selected())},focus:function(){k.showOnFocus&&!X&&w.is.hidden()&&!p&&w.show()},blur:function(e){p=n.activeElement===this,X||p||(w.remove.activeLabel(),w.hide())},mousedown:function(){w.is.searchSelection()?h=!0:X=!0},mouseup:function(){w.is.searchSelection()?h=!1:X=!1},click:function(t){e(t.target).is(I)&&(w.is.focusedOnSearch()?w.show():w.focusSearch())},search:{focus:function(){X=!0,w.is.multiple()&&w.remove.activeLabel(),k.showOnFocus&&w.search()},blur:function(e){p=n.activeElement===this,w.is.searchSelection()&&!h&&($||p||(k.forceSelection&&w.forceSelection(),w.hide())),h=!1}},icon:{click:function(e){w.toggle()}},text:{focus:function(e){X=!0,w.focusSearch()}},input:function(e){(w.is.multiple()||w.is.searchSelection())&&w.set.filtered(),clearTimeout(w.timer),w.timer=setTimeout(w.search,k.delay.search)},label:{click:function(t){var n=e(this),i=I.find(O.label),o=i.filter("."+S.active),a=n.nextAll("."+S.active),r=n.prevAll("."+S.active),s=a.length>0?n.nextUntil(a).add(o).add(n):n.prevUntil(r).add(o).add(n);t.shiftKey?(o.removeClass(S.active),s.addClass(S.active)):t.ctrlKey?n.toggleClass(S.active):(o.removeClass(S.active),n.addClass(S.active)),k.onLabelSelect.apply(this,i.filter("."+S.active))}},remove:{click:function(){var t=e(this).parent();t.hasClass(S.active)?w.remove.activeLabels():w.remove.activeLabels(t)}},test:{toggle:function(e){var t=w.is.multiple()?w.show:w.toggle;w.is.bubbledLabelClick(e)||w.is.bubbledIconClick(e)||w.determine.eventOnElement(e,t)&&e.preventDefault()},touch:function(e){w.determine.eventOnElement(e,function(){"touchstart"==e.type?w.timer=setTimeout(function(){w.hide()},k.delay.touch):"touchmove"==e.type&&clearTimeout(w.timer)}),e.stopPropagation()},hide:function(e){w.determine.eventInModule(e,w.hide)}},select:{mutation:function(t){w.debug("<select> modified, recreating menu");var n=!1;e.each(t,function(t,i){if(e(i.target).is("select")||e(i.addedNodes).is("select"))return n=!0,!0}),n&&(w.disconnect.selectObserver(),w.refresh(),w.setup.select(),w.set.selected(),w.observe.select())}},menu:{mutation:function(t){var n=t[0],i=e(n.addedNodes?n.addedNodes[0]:!1),o=e(n.removedNodes?n.removedNodes[0]:!1),a=i.add(o),r=a.is(O.addition)||a.closest(O.addition).length>0,s=a.is(O.message)||a.closest(O.message).length>0;r||s?(w.debug("Updating item selector cache"),w.refreshItems()):(w.debug("Menu modified, updating selector cache"),w.refresh())},mousedown:function(){$=!0},mouseup:function(){$=!1}},item:{mouseenter:function(t){var n=e(t.target),i=e(this),o=i.children(O.menu),a=i.siblings(O.item).children(O.menu),r=o.length>0;!(o.find(n).length>0)&&r&&(clearTimeout(w.itemTimer),w.itemTimer=setTimeout(function(){w.verbose("Showing sub-menu",o),e.each(a,function(){w.animate.hide(!1,e(this))}),w.animate.show(!1,o)},k.delay.show),t.preventDefault())},mouseleave:function(t){var n=e(this).children(O.menu);n.length>0&&(clearTimeout(w.itemTimer),w.itemTimer=setTimeout(function(){w.verbose("Hiding sub-menu",n),w.animate.hide(!1,n)},k.delay.hide))},click:function(t,i){var o=e(this),a=e(t?t.target:""),r=o.find(O.menu),s=w.get.choiceText(o),l=w.get.choiceValue(o,s),c=r.length>0,u=r.find(a).length>0;w.has.menuSearch()&&e(n.activeElement).blur(),u||c&&!k.allowCategorySelection||(w.is.searchSelection()&&(k.allowAdditions&&w.remove.userAddition(),w.remove.searchTerm(),w.is.focusedOnSearch()||1==i||w.focusSearch(!0)),k.useLabels||(w.remove.filteredItem(),w.set.scrollPosition(o)),w.determine.selectAction.call(this,s,l))}},document:{keydown:function(e){var t=e.which;if(w.is.inObject(t,R)){var n=I.find(O.label),i=n.filter("."+S.active),o=(i.data(P.value),n.index(i)),a=n.length,r=i.length>0,s=i.length>1,l=0===o,c=o+1==a,u=w.is.searchSelection(),d=w.is.focusedOnSearch(),f=w.is.focused(),m=d&&0===w.get.caretPosition();if(u&&!r&&!d)return;t==R.leftArrow?!f&&!m||r?r&&(e.shiftKey?w.verbose("Adding previous label to selection"):(w.verbose("Selecting previous label"),n.removeClass(S.active)),l&&!s?i.addClass(S.active):i.prev(O.siblingLabel).addClass(S.active).end(),e.preventDefault()):(w.verbose("Selecting previous label"),n.last().addClass(S.active)):t==R.rightArrow?(f&&!r&&n.first().addClass(S.active),r&&(e.shiftKey?w.verbose("Adding next label to selection"):(w.verbose("Selecting next label"),n.removeClass(S.active)),c?u?d?n.removeClass(S.active):w.focusSearch():s?i.next(O.siblingLabel).addClass(S.active):i.addClass(S.active):i.next(O.siblingLabel).addClass(S.active),e.preventDefault())):t==R.deleteKey||t==R.backspace?r?(w.verbose("Removing active labels"),c&&u&&!d&&w.focusSearch(),i.last().next(O.siblingLabel).addClass(S.active),w.remove.activeLabels(i),e.preventDefault()):m&&!r&&t==R.backspace&&(w.verbose("Removing last label on input backspace"),i=n.last().addClass(S.active),w.remove.activeLabels(i)):i.removeClass(S.active)}}},keydown:function(e){var t=e.which;if(w.is.inObject(t,R)){var n,i=Q.not(O.unselectable).filter("."+S.selected).eq(0),o=B.children("."+S.active).eq(0),a=i.length>0?i:o,r=a.length>0?a.siblings(":not(."+S.filtered+")").addBack():B.children(":not(."+S.filtered+")"),s=a.children(O.menu),l=a.closest(O.menu),c=l.hasClass(S.visible)||l.hasClass(S.animating)||l.parent(O.menu).length>0,u=s.length>0,d=a.length>0,f=a.not(O.unselectable).length>0,m=t==R.delimiter&&k.allowAdditions&&w.is.multiple();if(k.allowAdditions&&k.hideAdditions&&(t==R.enter||m)&&f&&(w.verbose("Selecting item from keyboard shortcut",a),w.event.item.click.call(a,e),w.is.searchSelection()&&w.remove.searchTerm()),w.is.visible()){if((t==R.enter||m)&&(t==R.enter&&d&&u&&!k.allowCategorySelection?(w.verbose("Pressed enter on unselectable category, opening sub menu"),t=R.rightArrow):f&&(w.verbose("Selecting item from keyboard shortcut",a),w.event.item.click.call(a,e),w.is.searchSelection()&&w.remove.searchTerm()),e.preventDefault()),d&&(t==R.leftArrow&&l[0]!==B[0]&&(w.verbose("Left key pressed, closing sub-menu"),w.animate.hide(!1,l),a.removeClass(S.selected),l.closest(O.item).addClass(S.selected),e.preventDefault()),t==R.rightArrow&&u&&(w.verbose("Right key pressed, opening sub-menu"),w.animate.show(!1,s),a.removeClass(S.selected),s.find(O.item).eq(0).addClass(S.selected),e.preventDefault())),t==R.upArrow){if(n=d&&c?a.prevAll(O.item+":not("+O.unselectable+")").eq(0):Q.eq(0),r.index(n)<0)return w.verbose("Up key pressed but reached top of current menu"),void e.preventDefault();w.verbose("Up key pressed, changing active item"),a.removeClass(S.selected),n.addClass(S.selected),w.set.scrollPosition(n),k.selectOnKeydown&&w.is.single()&&w.set.selectedItem(n),e.preventDefault()}if(t==R.downArrow){if(0===(n=d&&c?n=a.nextAll(O.item+":not("+O.unselectable+")").eq(0):Q.eq(0)).length)return w.verbose("Down key pressed but reached bottom of current menu"),void e.preventDefault();w.verbose("Down key pressed, changing active item"),Q.removeClass(S.selected),n.addClass(S.selected),w.set.scrollPosition(n),k.selectOnKeydown&&w.is.single()&&w.set.selectedItem(n),e.preventDefault()}t==R.pageUp&&(w.scrollPage("up"),e.preventDefault()),t==R.pageDown&&(w.scrollPage("down"),e.preventDefault()),t==R.escape&&(w.verbose("Escape key pressed, closing dropdown"),w.hide())}else m&&e.preventDefault(),t!=R.downArrow||w.is.visible()||(w.verbose("Down key pressed, showing dropdown"),w.show(),e.preventDefault())}else w.has.search()||w.set.selectedLetter(String.fromCharCode(t))}},trigger:{change:function(){var e=n.createEvent("HTMLEvents"),t=H[0];t&&(w.verbose("Triggering native change event"),e.initEvent("change",!0,!1),t.dispatchEvent(e))}},determine:{selectAction:function(t,n){w.verbose("Determining action",k.action),e.isFunction(w.action[k.action])?(w.verbose("Triggering preset action",k.action,t,n),w.action[k.action].call(Z,t,n,this)):e.isFunction(k.action)?(w.verbose("Triggering user action",k.action,t,n),k.action.call(Z,t,n,this)):w.error(D.action,k.action)},eventInModule:function(t,i){var o=e(t.target),a=o.closest(n.documentElement).length>0,r=o.closest(I).length>0;return i=e.isFunction(i)?i:function(){},a&&!r?(w.verbose("Triggering event",i),i(),!0):(w.verbose("Event occurred in dropdown, canceling callback"),!1)},eventOnElement:function(t,i){var o=e(t.target),a=o.closest(O.siblingLabel),r=n.body.contains(t.target),s=0===I.find(a).length,l=0===o.closest(B).length;return i=e.isFunction(i)?i:function(){},r&&s&&l?(w.verbose("Triggering event",i),i(),!0):(w.verbose("Event occurred in dropdown menu, canceling callback"),!1)}},action:{nothing:function(){},activate:function(t,n,i){if(n=void 0!==n?n:t,w.can.activate(e(i))){if(w.set.selected(n,e(i)),w.is.multiple()&&!w.is.allFiltered())return;w.hideAndClear()}},select:function(t,n,i){if(n=void 0!==n?n:t,w.can.activate(e(i))){if(w.set.value(n,e(i)),w.is.multiple()&&!w.is.allFiltered())return;w.hideAndClear()}},combo:function(t,n,i){n=void 0!==n?n:t,w.set.selected(n,e(i)),w.hideAndClear()},hide:function(e,t,n){w.set.value(t,e),w.hideAndClear()}},get:{id:function(){return y},defaultText:function(){return I.data(P.defaultText)},defaultValue:function(){return I.data(P.defaultValue)},placeholderText:function(){return"auto"!=k.placeholder&&"string"==typeof k.placeholder?k.placeholder:I.data(P.placeholderText)||""},text:function(){return L.text()},query:function(){return e.trim(V.val())},searchWidth:function(e){return e=void 0!==e?e:V.val(),N.text(e),Math.ceil(N.width()+1)},selectionCount:function(){var t=w.get.values();return w.is.multiple()?e.isArray(t)?t.length:0:""!==w.get.value()?1:0},transition:function(e){return"auto"==k.transition?w.is.upward(e)?"slide up":"slide down":k.transition},userValues:function(){var t=w.get.values();return!!t&&(t=e.isArray(t)?t:[t],e.grep(t,function(e){return!1===w.get.item(e)}))},uniqueArray:function(t){return e.grep(t,function(n,i){return e.inArray(n,t)===i})},caretPosition:function(){var e,t,i=V.get(0);return"selectionStart"in i?i.selectionStart:n.selection?(i.focus(),e=n.selection.createRange(),t=e.text.length,e.moveStart("character",-i.value.length),e.text.length-t):void 0},value:function(){var t=H.length>0?H.val():I.data(P.value),n=e.isArray(t)&&1===t.length&&""===t[0];return void 0===t||n?"":t},values:function(){var e=w.get.value();return""===e?"":!w.has.selectInput()&&w.is.multiple()?"string"==typeof e?e.split(k.delimiter):"":e},remoteValues:function(){var t=w.get.values(),n=!1;return t&&("string"==typeof t&&(t=[t]),e.each(t,function(e,t){var i=w.read.remoteData(t);w.verbose("Restoring value from session data",i,t),i&&(n||(n={}),n[t]=i)})),n},choiceText:function(t,n){if(n=void 0!==n?n:k.preserveHTML,t)return t.find(O.menu).length>0&&(w.verbose("Retrieving text of element with sub-menu"),(t=t.clone()).find(O.menu).remove(),t.find(O.menuIcon).remove()),void 0!==t.data(P.text)?t.data(P.text):n?e.trim(t.html()):e.trim(t.text())},choiceValue:function(t,n){return n=n||w.get.choiceText(t),!!t&&(void 0!==t.data(P.value)?String(t.data(P.value)):"string"==typeof n?e.trim(n.toLowerCase()):String(n))},inputEvent:function(){var e=V[0];return!!e&&(void 0!==e.oninput?"input":void 0!==e.onpropertychange?"propertychange":"keyup")},selectValues:function(){var t={};return t.values=[],I.find("option").each(function(){var n=e(this),i=n.html(),o=n.attr("disabled"),a=void 0!==n.attr("value")?n.attr("value"):i;"auto"===k.placeholder&&""===a?t.placeholder=i:t.values.push({name:i,value:a,disabled:o})}),k.placeholder&&"auto"!==k.placeholder&&(w.debug("Setting placeholder value to",k.placeholder),t.placeholder=k.placeholder),k.sortSelect?(t.values.sort(function(e,t){return e.name>t.name?1:-1}),w.debug("Retrieved and sorted values from select",t)):w.debug("Retrieved values from select",t),t},activeItem:function(){return Q.filter("."+S.active)},selectedItem:function(){var e=Q.not(O.unselectable).filter("."+S.selected);return e.length>0?e:Q.eq(0)},itemWithAdditions:function(e){var t=w.get.item(e),n=w.create.userChoice(e);return n&&n.length>0&&(t=t.length>0?t.add(n):n),t},item:function(t,n){var i,o,a=!1;return t=void 0!==t?t:void 0!==w.get.values()?w.get.values():w.get.text(),i=o?t.length>0:void 0!==t&&null!==t,o=w.is.multiple()&&e.isArray(t),n=""===t||0===t||(n||!1),i&&Q.each(function(){var i=e(this),r=w.get.choiceText(i),s=w.get.choiceValue(i,r);if(null!==s&&void 0!==s)if(o)-1===e.inArray(String(s),t)&&-1===e.inArray(r,t)||(a=a?a.add(i):i);else if(n){if(w.verbose("Ambiguous dropdown value using strict type check",i,t),s===t||r===t)return a=i,!0}else if(String(s)==String(t)||r==t)return w.verbose("Found select item by value",s,t),a=i,!0}),a}},check:{maxSelections:function(e){return!k.maxSelections||((e=void 0!==e?e:w.get.selectionCount())>=k.maxSelections?(w.debug("Maximum selection count reached"),k.useLabels&&(Q.addClass(S.filtered),w.add.message(T.maxSelections)),!0):(w.verbose("No longer at maximum selection count"),w.remove.message(),w.remove.filteredItem(),w.is.searchSelection()&&w.filterItems(),!1))}},restore:{defaults:function(){w.clear(),w.restore.defaultText(),w.restore.defaultValue()},defaultText:function(){var e=w.get.defaultText();e===w.get.placeholderText?(w.debug("Restoring default placeholder text",e),w.set.placeholderText(e)):(w.debug("Restoring default text",e),w.set.text(e))},placeholderText:function(){w.set.placeholderText()},defaultValue:function(){var e=w.get.defaultValue();void 0!==e&&(w.debug("Restoring default value",e),""!==e?(w.set.value(e),w.set.selected()):(w.remove.activeItem(),w.remove.selectedItem()))},labels:function(){k.allowAdditions&&(k.useLabels||(w.error(D.labels),k.useLabels=!0),w.debug("Restoring selected values"),w.create.userLabels()),w.check.maxSelections()},selected:function(){w.restore.values(),w.is.multiple()?(w.debug("Restoring previously selected values and labels"),w.restore.labels()):w.debug("Restoring previously selected values")},values:function(){w.set.initialLoad(),k.apiSettings&&k.saveRemoteData&&w.get.remoteValues()?w.restore.remoteValues():w.set.selected(),w.remove.initialLoad()},remoteValues:function(){var t=w.get.remoteValues();w.debug("Recreating selected from session data",t),t&&(w.is.single()?e.each(t,function(e,t){w.set.text(t)}):e.each(t,function(e,t){w.add.label(e,t)}))}},read:{remoteData:function(e){var n;{if(void 0!==t.Storage)return void 0!==(n=sessionStorage.getItem(e))&&n;w.error(D.noStorage)}}},save:{defaults:function(){w.save.defaultText(),w.save.placeholderText(),w.save.defaultValue()},defaultValue:function(){var e=w.get.value();w.verbose("Saving default value as",e),I.data(P.defaultValue,e)},defaultText:function(){var e=w.get.text();w.verbose("Saving default text as",e),I.data(P.defaultText,e)},placeholderText:function(){var e;!1!==k.placeholder&&L.hasClass(S.placeholder)&&(e=w.get.text(),w.verbose("Saving placeholder text as",e),I.data(P.placeholderText,e))},remoteData:function(e,n){void 0!==t.Storage?(w.verbose("Saving remote data to session storage",n,e),sessionStorage.setItem(n,e)):w.error(D.noStorage)}},clear:function(){w.is.multiple()&&k.useLabels?w.remove.labels():(w.remove.activeItem(),w.remove.selectedItem()),w.set.placeholderText(),w.clearValue()},clearValue:function(){w.set.value("")},scrollPage:function(e,t){var n,i,o=t||w.get.selectedItem(),a=o.closest(O.menu),r=a.outerHeight(),s=a.scrollTop(),l=Q.eq(0).outerHeight(),c=Math.floor(r/l),u=(a.prop("scrollHeight"),"up"==e?s-l*c:s+l*c),d=Q.not(O.unselectable);i="up"==e?d.index(o)-c:d.index(o)+c,(n=("up"==e?i>=0:i<d.length)?d.eq(i):"up"==e?d.first():d.last()).length>0&&(w.debug("Scrolling page",e,n),o.removeClass(S.selected),n.addClass(S.selected),k.selectOnKeydown&&w.is.single()&&w.set.selectedItem(n),a.scrollTop(u))},set:{filtered:function(){var e=w.is.multiple(),t=w.is.searchSelection(),n=e&&t,i=t?w.get.query():"",o="string"==typeof i&&i.length>0,a=w.get.searchWidth(),r=""!==i;e&&o&&(w.verbose("Adjusting input width",a,k.glyphWidth),V.css("width",a)),o||n&&r?(w.verbose("Hiding placeholder text"),L.addClass(S.filtered)):(!e||n&&!r)&&(w.verbose("Showing placeholder text"),L.removeClass(S.filtered))},empty:function(){I.addClass(S.empty)},loading:function(){I.addClass(S.loading)},placeholderText:function(e){e=e||w.get.placeholderText(),w.debug("Setting placeholder text",e),w.set.text(e),L.addClass(S.placeholder)},tabbable:function(){w.is.searchSelection()?(w.debug("Added tabindex to searchable dropdown"),V.val("").attr("tabindex",0),B.attr("tabindex",-1)):(w.debug("Added tabindex to dropdown"),void 0===I.attr("tabindex")&&(I.attr("tabindex",0),B.attr("tabindex",-1)))},initialLoad:function(){w.verbose("Setting initial load"),v=!0},activeItem:function(e){k.allowAdditions&&e.filter(O.addition).length>0?e.addClass(S.filtered):e.addClass(S.active)},partialSearch:function(e){var t=w.get.query().length;V.val(e.substr(0,t))},scrollPosition:function(e,t){var n,i,o,a,r,s;n=(e=e||w.get.selectedItem()).closest(O.menu),i=e&&e.length>0,t=void 0!==t&&t,e&&n.length>0&&i&&(e.position().top,n.addClass(S.loading),o=(a=n.scrollTop())-n.offset().top+e.offset().top,t||(s=a+n.height()<o+5,r=o-5<a),w.debug("Scrolling to active item",o),(t||r||s)&&n.scrollTop(o),n.removeClass(S.loading))},text:function(e){"select"!==k.action&&("combo"==k.action?(w.debug("Changing combo button text",e,W),k.preserveHTML?W.html(e):W.text(e)):(e!==w.get.placeholderText()&&L.removeClass(S.placeholder),w.debug("Changing text",e,L),L.removeClass(S.filtered),k.preserveHTML?L.html(e):L.text(e)))},selectedItem:function(e){var t=w.get.choiceValue(e),n=w.get.choiceText(e,!1),i=w.get.choiceText(e,!0);w.debug("Setting user selection to item",e),w.remove.activeItem(),w.set.partialSearch(n),w.set.activeItem(e),w.set.selected(t,e),w.set.text(i)},selectedLetter:function(t){var n,i=Q.filter("."+S.selected),o=!1;i.length>0&&w.has.firstLetter(i,t)&&(n=i.nextAll(Q).eq(0),w.has.firstLetter(n,t)&&(o=n)),o||Q.each(function(){if(w.has.firstLetter(e(this),t))return o=e(this),!1}),o&&(w.verbose("Scrolling to next value with letter",t),w.set.scrollPosition(o),i.removeClass(S.selected),o.addClass(S.selected),k.selectOnKeydown&&w.is.single()&&w.set.selectedItem(o))},direction:function(e){"auto"==k.direction?(w.remove.upward(),w.can.openDownward(e)?w.remove.upward(e):w.set.upward(e),w.is.leftward(e)||w.can.openRightward(e)||w.set.leftward(e)):"upward"==k.direction&&w.set.upward(e)},upward:function(e){(e||I).addClass(S.upward)},leftward:function(e){(e||B).addClass(S.leftward)},value:function(e,t,n){var i=w.escape.value(e),o=H.length>0,a=(w.has.value(e),w.get.values()),r=void 0!==e?String(e):e;if(o){if(!k.allowReselection&&r==a&&(w.verbose("Skipping value update already same value",e,a),!w.is.initialLoad()))return;w.is.single()&&w.has.selectInput()&&w.can.extendSelect()&&(w.debug("Adding user option",e),w.add.optionValue(e)),w.debug("Updating input value",i,a),Y=!0,H.val(i),!1===k.fireOnInit&&w.is.initialLoad()?w.debug("Input native change event ignored on initial load"):w.trigger.change(),Y=!1}else w.verbose("Storing value in metadata",i,H),i!==a&&I.data(P.value,r);!1===k.fireOnInit&&w.is.initialLoad()?w.verbose("No callback on initial load",k.onChange):k.onChange.call(Z,e,t,n)},active:function(){I.addClass(S.active)},multiple:function(){I.addClass(S.multiple)},visible:function(){I.addClass(S.visible)},exactly:function(e,t){w.debug("Setting selected to exact values"),w.clear(),w.set.selected(e,t)},selected:function(t,n){var i=w.is.multiple();(n=k.allowAdditions?n||w.get.itemWithAdditions(t):n||w.get.item(t))&&(w.debug("Setting selected menu item to",n),w.is.multiple()&&w.remove.searchWidth(),w.is.single()?(w.remove.activeItem(),w.remove.selectedItem()):k.useLabels&&w.remove.selectedItem(),n.each(function(){var t=e(this),o=w.get.choiceText(t),a=w.get.choiceValue(t,o),r=t.hasClass(S.filtered),s=t.hasClass(S.active),l=t.hasClass(S.addition),c=i&&1==n.length;i?!s||l?(k.apiSettings&&k.saveRemoteData&&w.save.remoteData(o,a),k.useLabels?(w.add.value(a,o,t),w.add.label(a,o,c),w.set.activeItem(t),w.filterActive(),w.select.nextAvailable(n)):(w.add.value(a,o,t),w.set.text(w.add.variables(T.count)),w.set.activeItem(t))):r||(w.debug("Selected active value, removing label"),w.remove.selected(a)):(k.apiSettings&&k.saveRemoteData&&w.save.remoteData(o,a),w.set.text(o),w.set.value(a,o,t),t.addClass(S.active).addClass(S.selected))}))}},add:{label:function(t,n,i){var o,a=w.is.searchSelection()?V:L,r=w.escape.value(t);o=e("<a />").addClass(S.label).attr("data-"+P.value,r).html(q.label(r,n)),o=k.onLabelCreate.call(o,r,n),w.has.label(t)?w.debug("Label already exists, skipping",r):(k.label.variation&&o.addClass(k.label.variation),!0===i?(w.debug("Animating in label",o),o.addClass(S.hidden).insertBefore(a).transition(k.label.transition,k.label.duration)):(w.debug("Adding selection label",o),o.insertBefore(a)))},message:function(t){var n=B.children(O.message),i=k.templates.message(w.add.variables(t));n.length>0?n.html(i):n=e("<div/>").html(i).addClass(S.message).appendTo(B)},optionValue:function(t){var n=w.escape.value(t);H.find('option[value="'+w.escape.string(n)+'"]').length>0||(w.disconnect.selectObserver(),w.is.single()&&(w.verbose("Removing previous user addition"),H.find("option."+S.addition).remove()),e("<option/>").prop("value",n).addClass(S.addition).html(t).appendTo(H),w.verbose("Adding user addition as an <option>",t),w.observe.select())},userSuggestion:function(e){var t,n=B.children(O.addition),i=w.get.item(e),o=i&&i.not(O.addition).length,a=n.length>0;k.useLabels&&w.has.maxSelections()||(""===e||o?n.remove():(a?(n.data(P.value,e).data(P.text,e).attr("data-"+P.value,e).attr("data-"+P.text,e).removeClass(S.filtered),k.hideAdditions||(t=k.templates.addition(w.add.variables(T.addResult,e)),n.html(t)),w.verbose("Replacing user suggestion with new value",n)):((n=w.create.userChoice(e)).prependTo(B),w.verbose("Adding item choice to menu corresponding with user choice addition",n)),k.hideAdditions&&!w.is.allFiltered()||n.addClass(S.selected).siblings().removeClass(S.selected),w.refreshItems()))},variables:function(e,t){var n,i,o=-1!==e.search("{count}"),a=-1!==e.search("{maxCount}"),r=-1!==e.search("{term}");return w.verbose("Adding templated variables to message",e),o&&(n=w.get.selectionCount(),e=e.replace("{count}",n)),a&&(n=w.get.selectionCount(),e=e.replace("{maxCount}",k.maxSelections)),r&&(i=t||w.get.query(),e=e.replace("{term}",i)),e},value:function(t,n,i){var o,a=w.get.values();""!==t?(e.isArray(a)?(o=a.concat([t]),o=w.get.uniqueArray(o)):o=[t],w.has.selectInput()?w.can.extendSelect()&&(w.debug("Adding value to select",t,o,H),w.add.optionValue(t)):(o=o.join(k.delimiter),w.debug("Setting hidden input to delimited value",o,H)),!1===k.fireOnInit&&w.is.initialLoad()?w.verbose("Skipping onadd callback on initial load",k.onAdd):k.onAdd.call(Z,t,n,i),w.set.value(o,t,n,i),w.check.maxSelections()):w.debug("Cannot select blank values from multiselect")}},remove:{active:function(){I.removeClass(S.active)},activeLabel:function(){I.find(O.label).removeClass(S.active)},empty:function(){I.removeClass(S.empty)},loading:function(){I.removeClass(S.loading)},initialLoad:function(){v=!1},upward:function(e){(e||I).removeClass(S.upward)},leftward:function(e){(e||B).removeClass(S.leftward)},visible:function(){I.removeClass(S.visible)},activeItem:function(){Q.removeClass(S.active)},filteredItem:function(){k.useLabels&&w.has.maxSelections()||(k.useLabels&&w.is.multiple()?Q.not("."+S.active).removeClass(S.filtered):Q.removeClass(S.filtered),w.remove.empty())},optionValue:function(e){var t=w.escape.value(e),n=H.find('option[value="'+w.escape.string(t)+'"]');n.length>0&&n.hasClass(S.addition)&&(x&&(x.disconnect(),w.verbose("Temporarily disconnecting mutation observer")),n.remove(),w.verbose("Removing user addition as an <option>",t),x&&x.observe(H[0],{childList:!0,subtree:!0}))},message:function(){B.children(O.message).remove()},searchWidth:function(){V.css("width","")},searchTerm:function(){w.verbose("Cleared search term"),V.val(""),w.set.filtered()},userAddition:function(){Q.filter(O.addition).remove()},selected:function(t,n){if(!(n=k.allowAdditions?n||w.get.itemWithAdditions(t):n||w.get.item(t)))return!1;n.each(function(){var t=e(this),n=w.get.choiceText(t),i=w.get.choiceValue(t,n);w.is.multiple()?k.useLabels?(w.remove.value(i,n,t),w.remove.label(i)):(w.remove.value(i,n,t),0===w.get.selectionCount()?w.set.placeholderText():w.set.text(w.add.variables(T.count))):w.remove.value(i,n,t),t.removeClass(S.filtered).removeClass(S.active),k.useLabels&&t.removeClass(S.selected)})},selectedItem:function(){Q.removeClass(S.selected)},value:function(e,t,n){var i,o=w.get.values();w.has.selectInput()?(w.verbose("Input is <select> removing selected option",e),i=w.remove.arrayValue(e,o),w.remove.optionValue(e)):(w.verbose("Removing from delimited values",e),i=(i=w.remove.arrayValue(e,o)).join(k.delimiter)),!1===k.fireOnInit&&w.is.initialLoad()?w.verbose("No callback on initial load",k.onRemove):k.onRemove.call(Z,e,t,n),w.set.value(i,t,n),w.check.maxSelections()},arrayValue:function(t,n){return e.isArray(n)||(n=[n]),n=e.grep(n,function(e){return t!=e}),w.verbose("Removed value from delimited string",t,n),n},label:function(e,t){var n=I.find(O.label).filter("[data-"+P.value+'="'+w.escape.string(e)+'"]');w.verbose("Removing label",n),n.remove()},activeLabels:function(e){e=e||I.find(O.label).filter("."+S.active),w.verbose("Removing active label selections",e),w.remove.labels(e)},labels:function(t){t=t||I.find(O.label),w.verbose("Removing labels",t),t.each(function(){var t=e(this),n=t.data(P.value),i=void 0!==n?String(n):n,o=w.is.userValue(i);!1!==k.onLabelRemove.call(t,n)?(w.remove.message(),o?(w.remove.value(i),w.remove.label(i)):w.remove.selected(i)):w.debug("Label remove callback cancelled removal")})},tabbable:function(){w.is.searchSelection()?(w.debug("Searchable dropdown initialized"),V.removeAttr("tabindex"),B.removeAttr("tabindex")):(w.debug("Simple selection dropdown initialized"),I.removeAttr("tabindex"),B.removeAttr("tabindex"))}},has:{menuSearch:function(){return w.has.search()&&V.closest(B).length>0},search:function(){return V.length>0},sizer:function(){return N.length>0},selectInput:function(){return H.is("select")},minCharacters:function(e){return!k.minCharacters||(e=void 0!==e?String(e):String(w.get.query())).length>=k.minCharacters},firstLetter:function(e,t){var n,i;return!(!e||0===e.length||"string"!=typeof t)&&(n=w.get.choiceText(e,!1),t=t.toLowerCase(),i=String(n).charAt(0).toLowerCase(),t==i)},input:function(){return H.length>0},items:function(){return Q.length>0},menu:function(){return B.length>0},message:function(){return 0!==B.children(O.message).length},label:function(e){var t=w.escape.value(e);return I.find(O.label).filter("[data-"+P.value+'="'+w.escape.string(t)+'"]').length>0},maxSelections:function(){return k.maxSelections&&w.get.selectionCount()>=k.maxSelections},allResultsFiltered:function(){var e=Q.not(O.addition);return e.filter(O.unselectable).length===e.length},userSuggestion:function(){return B.children(O.addition).length>0},query:function(){return""!==w.get.query()},value:function(t){var n=w.get.values();return!!(e.isArray(n)?n&&-1!==e.inArray(t,n):n==t)}},is:{active:function(){return I.hasClass(S.active)},bubbledLabelClick:function(t){return e(t.target).is("select, input")&&I.closest("label").length>0},bubbledIconClick:function(t){return e(t.target).closest(U).length>0},alreadySetup:function(){return I.is("select")&&void 0!==I.parent(O.dropdown).data(z)&&0===I.prev().length},animating:function(e){return e?e.transition&&e.transition("is animating"):B.transition&&B.transition("is animating")},leftward:function(e){return(e||B).hasClass(S.leftward)},disabled:function(){return I.hasClass(S.disabled)},focused:function(){return n.activeElement===I[0]},focusedOnSearch:function(){return n.activeElement===V[0]},allFiltered:function(){return(w.is.multiple()||w.has.search())&&!(0==k.hideAdditions&&w.has.userSuggestion())&&!w.has.message()&&w.has.allResultsFiltered()},hidden:function(e){return!w.is.visible(e)},initialLoad:function(){return v},inObject:function(t,n){var i=!1;return e.each(n,function(e,n){if(n==t)return i=!0,!0}),i},multiple:function(){return I.hasClass(S.multiple)},remote:function(){return k.apiSettings&&w.can.useAPI()},single:function(){return!w.is.multiple()},selectMutation:function(t){var n=!1;return e.each(t,function(t,i){if(i.target&&e(i.target).is("select"))return n=!0,!0}),n},search:function(){return I.hasClass(S.search)},searchSelection:function(){return w.has.search()&&1===V.parent(O.dropdown).length},selection:function(){return I.hasClass(S.selection)},userValue:function(t){return-1!==e.inArray(t,w.get.userValues())},upward:function(e){return(e||I).hasClass(S.upward)},visible:function(e){return e?e.hasClass(S.visible):B.hasClass(S.visible)},verticallyScrollableContext:function(){var e=M.get(0)!==t&&M.css("overflow-y");return"auto"==e||"scroll"==e},horizontallyScrollableContext:function(){var e=M.get(0)!==t&&M.css("overflow-X");return"auto"==e||"scroll"==e}},can:{activate:function(e){return!!k.useLabels||(!w.has.maxSelections()||!(!w.has.maxSelections()||!e.hasClass(S.active)))},openDownward:function(e){var t,n=e||B,i=!0,o={};return n.addClass(S.loading),t={context:{scrollTop:M.scrollTop(),height:M.outerHeight()},menu:{offset:n.offset(),height:n.outerHeight()}},w.is.verticallyScrollableContext()&&(t.menu.offset.top+=t.context.scrollTop),(o={above:t.context.scrollTop<=t.menu.offset.top-t.menu.height,below:t.context.scrollTop+t.context.height>=t.menu.offset.top+t.menu.height}).below?(w.verbose("Dropdown can fit in context downward",o),i=!0):o.below||o.above?(w.verbose("Dropdown cannot fit below, opening upward",o),i=!1):(w.verbose("Dropdown cannot fit in either direction, favoring downward",o),i=!0),n.removeClass(S.loading),i},openRightward:function(e){var t,n=e||B,i=!0,o=!1;return n.addClass(S.loading),t={context:{scrollLeft:M.scrollLeft(),width:M.outerWidth()},menu:{offset:n.offset(),width:n.outerWidth()}},w.is.horizontallyScrollableContext()&&(t.menu.offset.left+=t.context.scrollLeft),(o=t.menu.offset.left+t.menu.width>=t.context.scrollLeft+t.context.width)&&(w.verbose("Dropdown cannot fit in context rightward",o),i=!1),n.removeClass(S.loading),i},click:function(){return l||"click"==k.on},extendSelect:function(){return k.allowAdditions||k.apiSettings},show:function(){return!w.is.disabled()&&(w.has.items()||w.has.message())},useAPI:function(){return void 0!==e.fn.api}},animate:{show:function(t,n){var i,o=n||B,a=n?function(){}:function(){w.hideSubMenus(),w.hideOthers(),w.set.active()};t=e.isFunction(t)?t:function(){},w.verbose("Doing menu show animation",o),w.set.direction(n),i=w.get.transition(n),w.is.selection()&&w.set.scrollPosition(w.get.selectedItem(),!0),(w.is.hidden(o)||w.is.animating(o))&&("none"==i?(a(),o.transition("show"),t.call(Z)):void 0!==e.fn.transition&&I.transition("is supported")?o.transition({animation:i+" in",debug:k.debug,verbose:k.verbose,duration:k.duration,queue:!0,onStart:a,onComplete:function(){t.call(Z)}}):w.error(D.noTransition,i))},hide:function(t,n){var i=n||B,o=(n?k.duration:k.duration,n?function(){}:function(){w.can.click()&&w.unbind.intent(),w.remove.active()}),a=w.get.transition(n);t=e.isFunction(t)?t:function(){},(w.is.visible(i)||w.is.animating(i))&&(w.verbose("Doing menu hide animation",i),"none"==a?(o(),i.transition("hide"),t.call(Z)):void 0!==e.fn.transition&&I.transition("is supported")?i.transition({animation:a+" out",duration:k.duration,debug:k.debug,verbose:k.verbose,queue:!0,onStart:o,onComplete:function(){t.call(Z)}}):w.error(D.transition))}},hideAndClear:function(){w.remove.searchTerm(),w.has.maxSelections()||(w.has.search()?w.hide(function(){w.remove.filteredItem()}):w.hide())},delay:{show:function(){w.verbose("Delaying show event to ensure user intent"),clearTimeout(w.timer),w.timer=setTimeout(w.show,k.delay.show)},hide:function(){w.verbose("Delaying hide event to ensure user intent"),clearTimeout(w.timer),w.timer=setTimeout(w.hide,k.delay.hide)}},escape:{value:function(t){var n=e.isArray(t),i="string"==typeof t,o=!i&&!n,a=i&&-1!==t.search(F.quote),r=[];return o||!a?t:(w.debug("Encoding quote values for use in select",t),n?(e.each(t,function(e,t){r.push(t.replace(F.quote,"&quot;"))}),r):t.replace(F.quote,"&quot;"))},string:function(e){return(e=String(e)).replace(F.escape,"\\$&")}},setting:function(t,n){if(w.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,k,t);else{if(void 0===n)return k[t];e.isPlainObject(k[t])?e.extend(!0,k[t],n):k[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,w,t);else{if(void 0===n)return w[t];w[t]=n}},debug:function(){!k.silent&&k.debug&&(k.performance?w.performance.log(arguments):(w.debug=Function.prototype.bind.call(console.info,console,k.name+":"),w.debug.apply(console,arguments)))},verbose:function(){!k.silent&&k.verbose&&k.debug&&(k.performance?w.performance.log(arguments):(w.verbose=Function.prototype.bind.call(console.info,console,k.name+":"),w.verbose.apply(console,arguments)))},error:function(){k.silent||(w.error=Function.prototype.bind.call(console.error,console,k.name+":"),w.error.apply(console,arguments))},performance:{log:function(e){var t,n;k.performance&&(n=(t=(new Date).getTime())-(c||t),c=t,u.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:Z,"Execution Time":n})),clearTimeout(w.performance.timer),w.performance.timer=setTimeout(w.performance.display,500)},display:function(){var t=k.name+":",n=0;c=!1,clearTimeout(w.performance.timer),e.each(u,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",s&&(t+=" '"+s+"'"),(void 0!==console.group||void 0!==console.table)&&u.length>0&&(console.groupCollapsed(t),console.table?console.table(u):e.each(u,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),u=[]}},invoke:function(t,n,i){var a,r,s,l=K;return n=n||m,i=Z||i,"string"==typeof t&&void 0!==l&&(t=t.split(/[\. ]/),a=t.length-1,e.each(t,function(n,i){var o=n!=a?i+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[o])&&n!=a)l=l[o];else{if(void 0!==l[o])return r=l[o],!1;if(!e.isPlainObject(l[i])||n==a)return void 0!==l[i]?(r=l[i],!1):(w.error(D.method,t),!1);l=l[i]}})),e.isFunction(r)?s=r.apply(i,n):void 0!==r&&(s=r),e.isArray(o)?o.push(s):void 0!==o?o=[o,s]:void 0!==s&&(o=s),r}},f?(void 0===K&&w.initialize(),w.invoke(d)):(void 0!==K&&K.invoke("destroy"),w.initialize())}),void 0!==o?o:a},e.fn.dropdown.settings={silent:!1,debug:!1,verbose:!1,performance:!0,on:"click",action:"activate",values:!1,apiSettings:!1,selectOnKeydown:!0,minCharacters:0,filterRemoteData:!1,saveRemoteData:!0,throttle:200,context:t,direction:"auto",keepOnScreen:!0,match:"both",fullTextSearch:!1,placeholder:"auto",preserveHTML:!0,sortSelect:!1,forceSelection:!0,allowAdditions:!1,hideAdditions:!0,maxSelections:!1,useLabels:!0,delimiter:",",showOnFocus:!0,allowReselection:!1,allowTab:!0,allowCategorySelection:!1,fireOnInit:!1,transition:"auto",duration:200,glyphWidth:1.037,label:{transition:"scale",duration:200,variation:!1},delay:{hide:300,show:200,search:20,touch:50},onChange:function(e,t,n){},onAdd:function(e,t,n){},onRemove:function(e,t,n){},onLabelSelect:function(e){},onLabelCreate:function(t,n){return e(this)},onLabelRemove:function(e){return!0},onNoResults:function(e){return!0},onShow:function(){},onHide:function(){},name:"Dropdown",namespace:"dropdown",message:{addResult:"Add <b>{term}</b>",count:"{count} selected",maxSelections:"Max {maxCount} selections",noResults:"No results found.",serverError:"There was an error contacting the server"},error:{action:"You called a dropdown action that was not defined",alreadySetup:"Once a select has been initialized behaviors must be called on the created ui dropdown",labels:"Allowing user additions currently requires the use of labels.",missingMultiple:"<select> requires multiple property to be set to correctly preserve multiple values",method:"The method you called is not defined.",noAPI:"The API module is required to load resources remotely",noStorage:"Saving remote data requires session storage",noTransition:"This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>"},regExp:{escape:/[-[\]{}()*+?.,\\^$|#\s]/g,quote:/"/g},metadata:{defaultText:"defaultText",defaultValue:"defaultValue",placeholderText:"placeholder",text:"text",value:"value"},fields:{remoteValues:"results",values:"values",disabled:"disabled",name:"name",value:"value",text:"text"},keys:{backspace:8,delimiter:188,deleteKey:46,enter:13,escape:27,pageUp:33,pageDown:34,leftArrow:37,upArrow:38,rightArrow:39,downArrow:40},selector:{addition:".addition",dropdown:".ui.dropdown",hidden:".hidden",icon:"> .dropdown.icon",input:'> input[type="hidden"], > select',item:".item",label:"> .label",remove:"> .label > .delete.icon",siblingLabel:".label",menu:".menu",message:".message",menuIcon:".dropdown.icon",search:"input.search, .menu > .search > input, .menu input.search",sizer:"> input.sizer",text:"> .text:not(.icon)",unselectable:".disabled, .filtered"},className:{active:"active",addition:"addition",animating:"animating",disabled:"disabled",empty:"empty",dropdown:"ui dropdown",filtered:"filtered",hidden:"hidden transition",item:"item",label:"ui label",loading:"loading",menu:"menu",message:"message",multiple:"multiple",placeholder:"default",sizer:"sizer",search:"search",selected:"selected",selection:"selection",upward:"upward",leftward:"left",visible:"visible"}},e.fn.dropdown.settings.templates={dropdown:function(t){var n=t.placeholder||!1,i=(t.values,"");return i+='<i class="dropdown icon"></i>',t.placeholder?i+='<div class="default text">'+n+"</div>":i+='<div class="text"></div>',i+='<div class="menu">',e.each(t.values,function(e,t){i+=t.disabled?'<div class="disabled item" data-value="'+t.value+'">'+t.name+"</div>":'<div class="item" data-value="'+t.value+'">'+t.name+"</div>"}),i+="</div>"},menu:function(t,n){var i=t[n.values]||{},o="";return e.each(i,function(e,t){var i=t[n.text]?'data-text="'+t[n.text]+'"':"",a=t[n.disabled]?"disabled ":"";o+='<div class="'+a+'item" data-value="'+t[n.value]+'"'+i+">",o+=t[n.name],o+="</div>"}),o},label:function(e,t){return t+'<i class="delete icon"></i>'},message:function(e){return e},addition:function(e){return e}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.embed=function(n){var i,o=e(this),a=o.selector||"",r=(new Date).getTime(),s=[],l=arguments[0],c="string"==typeof l,u=[].slice.call(arguments,1);return o.each(function(){var d,f=e.isPlainObject(n)?e.extend(!0,{},e.fn.embed.settings,n):e.extend({},e.fn.embed.settings),m=f.selector,g=f.className,v=f.sources,p=f.error,h=f.metadata,b=f.namespace,y=f.templates,x="."+b,C="module-"+b,w=(e(t),e(this)),k=w.find(m.placeholder),S=w.find(m.icon),T=w.find(m.embed),A=this,R=w.data(C);d={initialize:function(){d.debug("Initializing embed"),d.determine.autoplay(),d.create(),d.bind.events(),d.instantiate()},instantiate:function(){d.verbose("Storing instance of module",d),R=d,w.data(C,d)},destroy:function(){d.verbose("Destroying previous instance of embed"),d.reset(),w.removeData(C).off(x)},refresh:function(){d.verbose("Refreshing selector cache"),k=w.find(m.placeholder),S=w.find(m.icon),T=w.find(m.embed)},bind:{events:function(){d.has.placeholder()&&(d.debug("Adding placeholder events"),w.on("click"+x,m.placeholder,d.createAndShow).on("click"+x,m.icon,d.createAndShow))}},create:function(){d.get.placeholder()?d.createPlaceholder():d.createAndShow()},createPlaceholder:function(e){var t=d.get.icon(),n=d.get.url();d.generate.embed(n);e=e||d.get.placeholder(),w.html(y.placeholder(e,t)),d.debug("Creating placeholder for embed",e,t)},createEmbed:function(t){d.refresh(),t=t||d.get.url(),T=e("<div/>").addClass(g.embed).html(d.generate.embed(t)).appendTo(w),f.onCreate.call(A,t),d.debug("Creating embed object",T)},changeEmbed:function(e){T.html(d.generate.embed(e))},createAndShow:function(){d.createEmbed(),d.show()},change:function(e,t,n){d.debug("Changing video to ",e,t,n),w.data(h.source,e).data(h.id,t),n?w.data(h.url,n):w.removeData(h.url),d.has.embed()?d.changeEmbed():d.create()},reset:function(){d.debug("Clearing embed and showing placeholder"),d.remove.active(),d.remove.embed(),d.showPlaceholder(),f.onReset.call(A)},show:function(){d.debug("Showing embed"),d.set.active(),f.onDisplay.call(A)},hide:function(){d.debug("Hiding embed"),d.showPlaceholder()},showPlaceholder:function(){d.debug("Showing placeholder image"),d.remove.active(),f.onPlaceholderDisplay.call(A)},get:{id:function(){return f.id||w.data(h.id)},placeholder:function(){return f.placeholder||w.data(h.placeholder)},icon:function(){return f.icon?f.icon:void 0!==w.data(h.icon)?w.data(h.icon):d.determine.icon()},source:function(e){return f.source?f.source:void 0!==w.data(h.source)?w.data(h.source):d.determine.source()},type:function(){var e=d.get.source();return void 0!==v[e]&&v[e].type},url:function(){return f.url?f.url:void 0!==w.data(h.url)?w.data(h.url):d.determine.url()}},determine:{autoplay:function(){d.should.autoplay()&&(f.autoplay=!0)},source:function(t){var n=!1;return(t=t||d.get.url())&&e.each(v,function(e,i){if(-1!==t.search(i.domain))return n=e,!1}),n},icon:function(){var e=d.get.source();return void 0!==v[e]&&v[e].icon},url:function(){var e,t=f.id||w.data(h.id),n=f.source||w.data(h.source);return(e=void 0!==v[n]&&v[n].url.replace("{id}",t))&&w.data(h.url,e),e}},set:{active:function(){w.addClass(g.active)}},remove:{active:function(){w.removeClass(g.active)},embed:function(){T.empty()}},encode:{parameters:function(e){var t,n=[];for(t in e)n.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));return n.join("&amp;")}},generate:{embed:function(e){d.debug("Generating embed html");var t,n,i=d.get.source();return(e=d.get.url(e))?(n=d.generate.parameters(i),t=y.iframe(e,n)):d.error(p.noURL,w),t},parameters:function(t,n){var i=v[t]&&void 0!==v[t].parameters?v[t].parameters(f):{};return(n=n||f.parameters)&&(i=e.extend({},i,n)),i=f.onEmbed(i),d.encode.parameters(i)}},has:{embed:function(){return T.length>0},placeholder:function(){return f.placeholder||w.data(h.placeholder)}},should:{autoplay:function(){return"auto"===f.autoplay?f.placeholder||void 0!==w.data(h.placeholder):f.autoplay}},is:{video:function(){return"video"==d.get.type()}},setting:function(t,n){if(d.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,f,t);else{if(void 0===n)return f[t];e.isPlainObject(f[t])?e.extend(!0,f[t],n):f[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,d,t);else{if(void 0===n)return d[t];d[t]=n}},debug:function(){!f.silent&&f.debug&&(f.performance?d.performance.log(arguments):(d.debug=Function.prototype.bind.call(console.info,console,f.name+":"),d.debug.apply(console,arguments)))},verbose:function(){!f.silent&&f.verbose&&f.debug&&(f.performance?d.performance.log(arguments):(d.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),d.verbose.apply(console,arguments)))},error:function(){f.silent||(d.error=Function.prototype.bind.call(console.error,console,f.name+":"),d.error.apply(console,arguments))},performance:{log:function(e){var t,n;f.performance&&(n=(t=(new Date).getTime())-(r||t),r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:A,"Execution Time":n})),clearTimeout(d.performance.timer),d.performance.timer=setTimeout(d.performance.display,500)},display:function(){var t=f.name+":",n=0;r=!1,clearTimeout(d.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",a&&(t+=" '"+a+"'"),o.length>1&&(t+=" ("+o.length+")"),(void 0!==console.group||void 0!==console.table)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,n,o){var a,r,s,l=R;return n=n||u,o=A||o,"string"==typeof t&&void 0!==l&&(t=t.split(/[\. ]/),a=t.length-1,e.each(t,function(n,i){var o=n!=a?i+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[o])&&n!=a)l=l[o];else{if(void 0!==l[o])return r=l[o],!1;if(!e.isPlainObject(l[i])||n==a)return void 0!==l[i]?(r=l[i],!1):(d.error(p.method,t),!1);l=l[i]}})),e.isFunction(r)?s=r.apply(o,n):void 0!==r&&(s=r),e.isArray(i)?i.push(s):void 0!==i?i=[i,s]:void 0!==s&&(i=s),r}},c?(void 0===R&&d.initialize(),d.invoke(l)):(void 0!==R&&R.invoke("destroy"),d.initialize())}),void 0!==i?i:this},e.fn.embed.settings={name:"Embed",namespace:"embed",silent:!1,debug:!1,verbose:!1,performance:!0,icon:!1,source:!1,url:!1,id:!1,autoplay:"auto",color:"#444444",hd:!0,brandedUI:!1,parameters:!1,onDisplay:function(){},onPlaceholderDisplay:function(){},onReset:function(){},onCreate:function(e){},onEmbed:function(e){return e},metadata:{id:"id",icon:"icon",placeholder:"placeholder",source:"source",url:"url"},error:{noURL:"No URL specified",method:"The method you called is not defined"},className:{active:"active",embed:"embed"},selector:{embed:".embed",placeholder:".placeholder",icon:".icon"},sources:{youtube:{name:"youtube",type:"video",icon:"video play",domain:"youtube.com",url:"//www.youtube.com/embed/{id}",parameters:function(e){return{autohide:!e.brandedUI,autoplay:e.autoplay,color:e.color||void 0,hq:e.hd,jsapi:e.api,modestbranding:!e.brandedUI}}},vimeo:{name:"vimeo",type:"video",icon:"video play",domain:"vimeo.com",url:"//player.vimeo.com/video/{id}",parameters:function(e){return{api:e.api,autoplay:e.autoplay,byline:e.brandedUI,color:e.color||void 0,portrait:e.brandedUI,title:e.brandedUI}}}},templates:{iframe:function(e,t){var n=e;return t&&(n+="?"+t),'<iframe src="'+n+'" width="100%" height="100%" frameborder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'},placeholder:function(e,t){var n="";return t&&(n+='<i class="'+t+' icon"></i>'),e&&(n+='<img class="placeholder" src="'+e+'">'),n}},api:!1,onPause:function(){},onPlay:function(){},onStop:function(){}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.modal=function(i){var o,a=e(this),r=e(t),s=e(n),l=e("body"),c=a.selector||"",u=(new Date).getTime(),d=[],f=arguments[0],m="string"==typeof f,g=[].slice.call(arguments,1),v=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)};return a.each(function(){var a,p,h,b,y,x,C,w,k,S=e.isPlainObject(i)?e.extend(!0,{},e.fn.modal.settings,i):e.extend({},e.fn.modal.settings),T=S.selector,A=S.className,R=S.namespace,P=S.error,E="."+R,F="module-"+R,O=e(this),D=e(S.context),q=O.find(T.close),j=this,z=O.data(F),I=!1;k={initialize:function(){k.verbose("Initializing dimmer",D),k.create.id(),k.create.dimmer(),k.refreshModals(),k.bind.events(),S.observeChanges&&k.observeChanges(),k.instantiate()},instantiate:function(){k.verbose("Storing instance of modal"),z=k,O.data(F,z)},create:{dimmer:function(){var t={debug:S.debug,dimmerName:"modals"},n=e.extend(!0,t,S.dimmerSettings);void 0!==e.fn.dimmer?(k.debug("Creating dimmer"),b=D.dimmer(n),S.detachable?(k.verbose("Modal is detachable, moving content into dimmer"),b.dimmer("add content",O)):k.set.undetached(),y=b.dimmer("get dimmer")):k.error(P.dimmer)},id:function(){C=(Math.random().toString(16)+"000000000").substr(2,8),x="."+C,k.verbose("Creating unique id for element",C)}},destroy:function(){k.verbose("Destroying previous modal"),O.removeData(F).off(E),r.off(x),y.off(x),q.off(E),D.dimmer("destroy")},observeChanges:function(){"MutationObserver"in t&&((w=new MutationObserver(function(e){k.debug("DOM tree modified, refreshing"),k.refresh()})).observe(j,{childList:!0,subtree:!0}),k.debug("Setting up mutation observer",w))},refresh:function(){k.remove.scrolling(),k.cacheSizes(),k.set.screenHeight(),k.set.type(),k.set.position()},refreshModals:function(){p=O.siblings(T.modal),a=p.add(O)},attachEvents:function(t,n){var i=e(t);n=e.isFunction(k[n])?k[n]:k.toggle,i.length>0?(k.debug("Attaching modal events to element",t,n),i.off(E).on("click"+E,n)):k.error(P.notFound,t)},bind:{events:function(){k.verbose("Attaching events"),O.on("click"+E,T.close,k.event.close).on("click"+E,T.approve,k.event.approve).on("click"+E,T.deny,k.event.deny),r.on("resize"+x,k.event.resize)}},get:{id:function(){return(Math.random().toString(16)+"000000000").substr(2,8)}},event:{approve:function(){I||!1===S.onApprove.call(j,e(this))?k.verbose("Approve callback returned false cancelling hide"):(I=!0,k.hide(function(){I=!1}))},deny:function(){I||!1===S.onDeny.call(j,e(this))?k.verbose("Deny callback returned false cancelling hide"):(I=!0,k.hide(function(){I=!1}))},close:function(){k.hide()},click:function(t){var i=e(t.target).closest(T.modal).length>0,o=e.contains(n.documentElement,t.target);!i&&o&&(k.debug("Dimmer clicked, hiding all modals"),k.is.active()&&(k.remove.clickaway(),S.allowMultiple?k.hide():k.hideAll()))},debounce:function(e,t){clearTimeout(k.timer),k.timer=setTimeout(e,t)},keyboard:function(e){27==e.which&&(S.closable?(k.debug("Escape key pressed hiding modal"),k.hide()):k.debug("Escape key pressed, but closable is set to false"),e.preventDefault())},resize:function(){b.dimmer("is active")&&(k.is.animating()||k.is.active())&&v(k.refresh)}},toggle:function(){k.is.active()||k.is.animating()?k.hide():k.show()},show:function(t){t=e.isFunction(t)?t:function(){},k.refreshModals(),k.set.dimmerSettings(),k.showModal(t)},hide:function(t){t=e.isFunction(t)?t:function(){},k.refreshModals(),k.hideModal(t)},showModal:function(t){t=e.isFunction(t)?t:function(){},k.is.animating()||!k.is.active()?(k.showDimmer(),k.cacheSizes(),k.set.position(),k.set.screenHeight(),k.set.type(),k.set.clickaway(),!S.allowMultiple&&k.others.active()?k.hideOthers(k.showModal):(S.allowMultiple&&S.detachable&&O.detach().appendTo(y),S.onShow.call(j),S.transition&&void 0!==e.fn.transition&&O.transition("is supported")?(k.debug("Showing modal with css animations"),O.transition({debug:S.debug,animation:S.transition+" in",queue:S.queue,duration:S.duration,useFailSafe:!0,onComplete:function(){S.onVisible.apply(j),S.keyboardShortcuts&&k.add.keyboardShortcuts(),k.save.focus(),k.set.active(),S.autofocus&&k.set.autofocus(),t()}})):k.error(P.noTransition))):k.debug("Modal is already visible")},hideModal:function(t,n){t=e.isFunction(t)?t:function(){},k.debug("Hiding modal"),!1!==S.onHide.call(j,e(this))?(k.is.animating()||k.is.active())&&(S.transition&&void 0!==e.fn.transition&&O.transition("is supported")?(k.remove.active(),O.transition({debug:S.debug,animation:S.transition+" out",queue:S.queue,duration:S.duration,useFailSafe:!0,onStart:function(){k.others.active()||n||k.hideDimmer(),S.keyboardShortcuts&&k.remove.keyboardShortcuts()},onComplete:function(){S.onHidden.call(j),k.restore.focus(),t()}})):k.error(P.noTransition)):k.verbose("Hide callback returned false cancelling hide")},showDimmer:function(){b.dimmer("is animating")||!b.dimmer("is active")?(k.debug("Showing dimmer"),b.dimmer("show")):k.debug("Dimmer already visible")},hideDimmer:function(){b.dimmer("is animating")||b.dimmer("is active")?b.dimmer("hide",function(){k.remove.clickaway(),k.remove.screenHeight()}):k.debug("Dimmer is not visible cannot hide")},hideAll:function(t){var n=a.filter("."+A.active+", ."+A.animating);t=e.isFunction(t)?t:function(){},n.length>0&&(k.debug("Hiding all visible modals"),k.hideDimmer(),n.modal("hide modal",t))},hideOthers:function(t){var n=p.filter("."+A.active+", ."+A.animating);t=e.isFunction(t)?t:function(){},n.length>0&&(k.debug("Hiding other modals",p),n.modal("hide modal",t,!0))},others:{active:function(){return p.filter("."+A.active).length>0},animating:function(){return p.filter("."+A.animating).length>0}},add:{keyboardShortcuts:function(){k.verbose("Adding keyboard shortcuts"),s.on("keyup"+E,k.event.keyboard)}},save:{focus:function(){h=e(n.activeElement).blur()}},restore:{focus:function(){h&&h.length>0&&h.focus()}},remove:{active:function(){O.removeClass(A.active)},clickaway:function(){S.closable&&y.off("click"+x)},bodyStyle:function(){""===l.attr("style")&&(k.verbose("Removing style attribute"),l.removeAttr("style"))},screenHeight:function(){k.debug("Removing page height"),l.css("height","")},keyboardShortcuts:function(){k.verbose("Removing keyboard shortcuts"),s.off("keyup"+E)},scrolling:function(){b.removeClass(A.scrolling),O.removeClass(A.scrolling)}},cacheSizes:function(){O.addClass(A.loading);var i=O.prop("scrollHeight"),o=O.outerHeight();void 0!==k.cache&&0===o||(k.cache={pageHeight:e(n).outerHeight(),height:o+S.offset,scrollHeight:i+S.offset,contextHeight:"body"==S.context?e(t).height():b.height()},k.cache.topOffset=-k.cache.height/2),O.removeClass(A.loading),k.debug("Caching modal and container sizes",k.cache)},can:{fit:function(){var e=k.cache.contextHeight,t=k.cache.contextHeight/2,n=k.cache.topOffset,i=k.cache.scrollHeight,o=k.cache.height,a=S.padding;return i>o?t+n+i+a<e:o+2*a<e}},is:{active:function(){return O.hasClass(A.active)},animating:function(){return O.transition("is supported")?O.transition("is animating"):O.is(":visible")},scrolling:function(){return b.hasClass(A.scrolling)},modernBrowser:function(){return!(t.ActiveXObject||"ActiveXObject"in t)}},set:{autofocus:function(){var e=O.find("[tabindex], :input").filter(":visible"),t=e.filter("[autofocus]"),n=t.length>0?t.first():e.first();n.length>0&&n.focus()},clickaway:function(){S.closable&&y.on("click"+x,k.event.click)},dimmerSettings:function(){if(void 0!==e.fn.dimmer){var t={debug:S.debug,dimmerName:"modals",variation:!1,closable:"auto",duration:{show:S.duration,hide:S.duration}},n=e.extend(!0,t,S.dimmerSettings);S.inverted?(n.variation=void 0!==n.variation?n.variation+" inverted":"inverted",y.addClass(A.inverted)):y.removeClass(A.inverted),S.blurring?b.addClass(A.blurring):b.removeClass(A.blurring),D.dimmer("setting",n)}else k.error(P.dimmer)},screenHeight:function(){k.can.fit()?l.css("height",""):(k.debug("Modal is taller than page content, resizing page height"),l.css("height",k.cache.height+2*S.padding))},active:function(){O.addClass(A.active)},scrolling:function(){b.addClass(A.scrolling),O.addClass(A.scrolling)},type:function(){k.can.fit()?(k.verbose("Modal fits on screen"),k.others.active()||k.others.animating()||k.remove.scrolling()):(k.verbose("Modal cannot fit on screen setting to scrolling"),k.set.scrolling())},position:function(){k.verbose("Centering modal on page",k.cache),k.can.fit()?O.css({top:"",marginTop:k.cache.topOffset}):O.css({marginTop:"",top:s.scrollTop()})},undetached:function(){b.addClass(A.undetached)}},setting:function(t,n){if(k.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,S,t);else{if(void 0===n)return S[t];e.isPlainObject(S[t])?e.extend(!0,S[t],n):S[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,k,t);else{if(void 0===n)return k[t];k[t]=n}},debug:function(){!S.silent&&S.debug&&(S.performance?k.performance.log(arguments):(k.debug=Function.prototype.bind.call(console.info,console,S.name+":"),k.debug.apply(console,arguments)))},verbose:function(){!S.silent&&S.verbose&&S.debug&&(S.performance?k.performance.log(arguments):(k.verbose=Function.prototype.bind.call(console.info,console,S.name+":"),k.verbose.apply(console,arguments)))},error:function(){S.silent||(k.error=Function.prototype.bind.call(console.error,console,S.name+":"),k.error.apply(console,arguments))},performance:{log:function(e){var t,n;S.performance&&(n=(t=(new Date).getTime())-(u||t),u=t,d.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:j,"Execution Time":n})),clearTimeout(k.performance.timer),k.performance.timer=setTimeout(k.performance.display,500)},display:function(){var t=S.name+":",n=0;u=!1,clearTimeout(k.performance.timer),e.each(d,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",c&&(t+=" '"+c+"'"),(void 0!==console.group||void 0!==console.table)&&d.length>0&&(console.groupCollapsed(t),console.table?console.table(d):e.each(d,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),d=[]}},invoke:function(t,n,i){var a,r,s,l=z;return n=n||g,i=j||i,"string"==typeof t&&void 0!==l&&(t=t.split(/[\. ]/),a=t.length-1,e.each(t,function(n,i){var o=n!=a?i+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[o])&&n!=a)l=l[o];else{if(void 0!==l[o])return r=l[o],!1;if(!e.isPlainObject(l[i])||n==a)return void 0!==l[i]&&(r=l[i],!1);l=l[i]}})),e.isFunction(r)?s=r.apply(i,n):void 0!==r&&(s=r),e.isArray(o)?o.push(s):void 0!==o?o=[o,s]:void 0!==s&&(o=s),r}},m?(void 0===z&&k.initialize(),k.invoke(f)):(void 0!==z&&z.invoke("destroy"),k.initialize())}),void 0!==o?o:this},e.fn.modal.settings={name:"Modal",namespace:"modal",silent:!1,debug:!1,verbose:!1,performance:!0,observeChanges:!1,allowMultiple:!1,detachable:!0,closable:!0,autofocus:!0,inverted:!1,blurring:!1,dimmerSettings:{closable:!1,useCSS:!0},keyboardShortcuts:!0,context:"body",queue:!1,duration:500,offset:0,transition:"scale",padding:50,onShow:function(){},onVisible:function(){},onHide:function(){return!0},onHidden:function(){},onApprove:function(){return!0},onDeny:function(){return!0},selector:{close:"> .close",approve:".actions .positive, .actions .approve, .actions .ok",deny:".actions .negative, .actions .deny, .actions .cancel",modal:".ui.modal"},error:{dimmer:"UI Dimmer, a required component is not included in this page",method:"The method you called is not defined.",notFound:"The element you specified could not be found"},className:{active:"active",animating:"animating",blurring:"blurring",inverted:"inverted",loading:"loading",scrolling:"scrolling",undetached:"undetached"}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.nag=function(n){var i,o=e(this),a=o.selector||"",r=(new Date).getTime(),s=[],l=arguments[0],c="string"==typeof l,u=[].slice.call(arguments,1);return o.each(function(){var o,d=e.isPlainObject(n)?e.extend(!0,{},e.fn.nag.settings,n):e.extend({},e.fn.nag.settings),f=(d.className,d.selector),m=d.error,g=d.namespace,v="."+g,p=g+"-module",h=e(this),b=(h.find(f.close),e(d.context?d.context:"body")),y=this,x=h.data(p);t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame;o={initialize:function(){o.verbose("Initializing element"),h.on("click"+v,f.close,o.dismiss).data(p,o),d.detachable&&h.parent()[0]!==b[0]&&h.detach().prependTo(b),d.displayTime>0&&setTimeout(o.hide,d.displayTime),o.show()},destroy:function(){o.verbose("Destroying instance"),h.removeData(p).off(v)},show:function(){o.should.show()&&!h.is(":visible")&&(o.debug("Showing nag",d.animation.show),"fade"==d.animation.show?h.fadeIn(d.duration,d.easing):h.slideDown(d.duration,d.easing))},hide:function(){o.debug("Showing nag",d.animation.hide),"fade"==d.animation.show?h.fadeIn(d.duration,d.easing):h.slideUp(d.duration,d.easing)},onHide:function(){o.debug("Removing nag",d.animation.hide),h.remove(),d.onHide&&d.onHide()},dismiss:function(e){d.storageMethod&&o.storage.set(d.key,d.value),o.hide(),e.stopImmediatePropagation(),e.preventDefault()},should:{show:function(){return d.persist?(o.debug("Persistent nag is set, can show nag"),!0):o.storage.get(d.key)!=d.value.toString()?(o.debug("Stored value is not set, can show nag",o.storage.get(d.key)),!0):(o.debug("Stored value is set, cannot show nag",o.storage.get(d.key)),!1)}},get:{storageOptions:function(){var e={};return d.expires&&(e.expires=d.expires),d.domain&&(e.domain=d.domain),d.path&&(e.path=d.path),e}},clear:function(){o.storage.remove(d.key)},storage:{set:function(n,i){var a=o.get.storageOptions();if("localstorage"==d.storageMethod&&void 0!==t.localStorage)t.localStorage.setItem(n,i),o.debug("Value stored using local storage",n,i);else if("sessionstorage"==d.storageMethod&&void 0!==t.sessionStorage)t.sessionStorage.setItem(n,i),o.debug("Value stored using session storage",n,i);else{if(void 0===e.cookie)return void o.error(m.noCookieStorage);e.cookie(n,i,a),o.debug("Value stored using cookie",n,i,a)}},get:function(n,i){var a;return"localstorage"==d.storageMethod&&void 0!==t.localStorage?a=t.localStorage.getItem(n):"sessionstorage"==d.storageMethod&&void 0!==t.sessionStorage?a=t.sessionStorage.getItem(n):void 0!==e.cookie?a=e.cookie(n):o.error(m.noCookieStorage),"undefined"!=a&&"null"!=a&&void 0!==a&&null!==a||(a=void 0),a},remove:function(n){var i=o.get.storageOptions();"localstorage"==d.storageMethod&&void 0!==t.localStorage?t.localStorage.removeItem(n):"sessionstorage"==d.storageMethod&&void 0!==t.sessionStorage?t.sessionStorage.removeItem(n):void 0!==e.cookie?e.removeCookie(n,i):o.error(m.noStorage)}},setting:function(t,n){if(o.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,d,t);else{if(void 0===n)return d[t];e.isPlainObject(d[t])?e.extend(!0,d[t],n):d[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,o,t);else{if(void 0===n)return o[t];o[t]=n}},debug:function(){!d.silent&&d.debug&&(d.performance?o.performance.log(arguments):(o.debug=Function.prototype.bind.call(console.info,console,d.name+":"),o.debug.apply(console,arguments)))},verbose:function(){!d.silent&&d.verbose&&d.debug&&(d.performance?o.performance.log(arguments):(o.verbose=Function.prototype.bind.call(console.info,console,d.name+":"),o.verbose.apply(console,arguments)))},error:function(){d.silent||(o.error=Function.prototype.bind.call(console.error,console,d.name+":"),o.error.apply(console,arguments))},performance:{log:function(e){var t,n;d.performance&&(n=(t=(new Date).getTime())-(r||t),r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:y,"Execution Time":n})),clearTimeout(o.performance.timer),o.performance.timer=setTimeout(o.performance.display,500)},display:function(){var t=d.name+":",n=0;r=!1,clearTimeout(o.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",a&&(t+=" '"+a+"'"),(void 0!==console.group||void 0!==console.table)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,n,a){var r,s,l,c=x;return n=n||u,a=y||a,"string"==typeof t&&void 0!==c&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(n,i){var a=n!=r?i+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(c[a])&&n!=r)c=c[a];else{if(void 0!==c[a])return s=c[a],!1;if(!e.isPlainObject(c[i])||n==r)return void 0!==c[i]?(s=c[i],!1):(o.error(m.method,t),!1);c=c[i]}})),e.isFunction(s)?l=s.apply(a,n):void 0!==s&&(l=s),e.isArray(i)?i.push(l):void 0!==i?i=[i,l]:void 0!==l&&(i=l),s}},c?(void 0===x&&o.initialize(),o.invoke(l)):(void 0!==x&&x.invoke("destroy"),o.initialize())}),void 0!==i?i:this},e.fn.nag.settings={name:"Nag",silent:!1,debug:!1,verbose:!1,performance:!0,namespace:"Nag",persist:!1,displayTime:0,animation:{show:"slide",hide:"slide"},context:!1,detachable:!1,expires:30,domain:!1,path:"/",storageMethod:"cookie",key:"nag",value:"dismiss",error:{noCookieStorage:"$.cookie is not included. A storage solution is required.",noStorage:"Neither $.cookie or store is defined. A storage solution is required for storing state",method:"The method you called is not defined."},className:{bottom:"bottom",fixed:"fixed"},selector:{close:".close.icon"},speed:500,easing:"easeOutQuad",onHide:function(){}},e.extend(e.easing,{easeOutQuad:function(e,t,n,i,o){return-i*(t/=o)*(t-2)+n}})}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.popup=function(i){var o,a=e(this),r=e(n),s=e(t),l=e("body"),c=a.selector||"",u=(new Date).getTime(),d=[],f=arguments[0],m="string"==typeof f,g=[].slice.call(arguments,1);return a.each(function(){var a,v,p,h,b,y,x=e.isPlainObject(i)?e.extend(!0,{},e.fn.popup.settings,i):e.extend({},e.fn.popup.settings),C=x.selector,w=x.className,k=x.error,S=x.metadata,T=x.namespace,A="."+x.namespace,R="module-"+T,P=e(this),E=e(x.context),F=e(x.scrollContext),O=e(x.boundary),D=x.target?e(x.target):P,q=0,j=!1,z=!1,I=this,M=P.data(R);y={initialize:function(){y.debug("Initializing",P),y.createID(),y.bind.events(),!y.exists()&&x.preserve&&y.create(),x.observeChanges&&y.observeChanges(),y.instantiate()},instantiate:function(){y.verbose("Storing instance",y),M=y,P.data(R,M)},observeChanges:function(){"MutationObserver"in t&&((p=new MutationObserver(y.event.documentChanged)).observe(n,{childList:!0,subtree:!0}),y.debug("Setting up mutation observer",p))},refresh:function(){x.popup?a=e(x.popup).eq(0):x.inline&&(a=D.nextAll(C.popup).eq(0),x.popup=a),x.popup?(a.addClass(w.loading),v=y.get.offsetParent(),a.removeClass(w.loading),x.movePopup&&y.has.popup()&&y.get.offsetParent(a)[0]!==v[0]&&(y.debug("Moving popup to the same offset parent as target"),a.detach().appendTo(v))):v=x.inline?y.get.offsetParent(D):y.has.popup()?y.get.offsetParent(a):l,v.is("html")&&v[0]!==l[0]&&(y.debug("Setting page as offset parent"),v=l),y.get.variation()&&y.set.variation()},reposition:function(){y.refresh(),y.set.position()},destroy:function(){y.debug("Destroying previous module"),p&&p.disconnect(),a&&!x.preserve&&y.removePopup(),clearTimeout(y.hideTimer),clearTimeout(y.showTimer),y.unbind.close(),y.unbind.events(),P.removeData(R)},event:{start:function(t){var n=e.isPlainObject(x.delay)?x.delay.show:x.delay;clearTimeout(y.hideTimer),z||(y.showTimer=setTimeout(y.show,n))},end:function(){var t=e.isPlainObject(x.delay)?x.delay.hide:x.delay;clearTimeout(y.showTimer),y.hideTimer=setTimeout(y.hide,t)},touchstart:function(e){z=!0,y.show()},resize:function(){y.is.visible()&&y.set.position()},documentChanged:function(t){[].forEach.call(t,function(t){t.removedNodes&&[].forEach.call(t.removedNodes,function(t){(t==I||e(t).find(I).length>0)&&(y.debug("Element removed from DOM, tearing down events"),y.destroy())})})},hideGracefully:function(t){var i=e(t.target),o=e.contains(n.documentElement,t.target),a=i.closest(C.popup).length>0;t&&!a&&o?(y.debug("Click occurred outside popup hiding popup"),y.hide()):y.debug("Click was inside popup, keeping popup open")}},create:function(){var t=y.get.html(),n=y.get.title(),i=y.get.content();t||i||n?(y.debug("Creating pop-up html"),t||(t=x.templates.popup({title:n,content:i})),a=e("<div/>").addClass(w.popup).data(S.activator,P).html(t),x.inline?(y.verbose("Inserting popup element inline",a),a.insertAfter(P)):(y.verbose("Appending popup element to body",a),a.appendTo(E)),y.refresh(),y.set.variation(),x.hoverable&&y.bind.popup(),x.onCreate.call(a,I)):0!==D.next(C.popup).length?(y.verbose("Pre-existing popup found"),x.inline=!0,x.popup=D.next(C.popup).data(S.activator,P),y.refresh(),x.hoverable&&y.bind.popup()):x.popup?(e(x.popup).data(S.activator,P),y.verbose("Used popup specified in settings"),y.refresh(),x.hoverable&&y.bind.popup()):y.debug("No content specified skipping display",I)},createID:function(){b=(Math.random().toString(16)+"000000000").substr(2,8),h="."+b,y.verbose("Creating unique id for element",b)},toggle:function(){y.debug("Toggling pop-up"),y.is.hidden()?(y.debug("Popup is hidden, showing pop-up"),y.unbind.close(),y.show()):(y.debug("Popup is visible, hiding pop-up"),y.hide())},show:function(e){if(e=e||function(){},y.debug("Showing pop-up",x.transition),y.is.hidden()&&(!y.is.active()||!y.is.dropdown())){if(y.exists()||y.create(),!1===x.onShow.call(a,I))return void y.debug("onShow callback returned false, cancelling popup animation");x.preserve||x.popup||y.refresh(),a&&y.set.position()&&(y.save.conditions(),x.exclusive&&y.hideAll(),y.animate.show(e))}},hide:function(e){if(e=e||function(){},y.is.visible()||y.is.animating()){if(!1===x.onHide.call(a,I))return void y.debug("onHide callback returned false, cancelling popup animation");y.remove.visible(),y.unbind.close(),y.restore.conditions(),y.animate.hide(e)}},hideAll:function(){e(C.popup).filter("."+w.popupVisible).each(function(){e(this).data(S.activator).popup("hide")})},exists:function(){return!!a&&(x.inline||x.popup?y.has.popup():a.closest(E).length>=1)},removePopup:function(){y.has.popup()&&!x.popup&&(y.debug("Removing popup",a),a.remove(),a=void 0,x.onRemove.call(a,I))},save:{conditions:function(){y.cache={title:P.attr("title")},y.cache.title&&P.removeAttr("title"),y.verbose("Saving original attributes",y.cache.title)}},restore:{conditions:function(){return y.cache&&y.cache.title&&(P.attr("title",y.cache.title),y.verbose("Restoring original attributes",y.cache.title)),!0}},supports:{svg:function(){return"undefined"==typeof SVGGraphicsElement}},animate:{show:function(t){t=e.isFunction(t)?t:function(){},x.transition&&void 0!==e.fn.transition&&P.transition("is supported")?(y.set.visible(),a.transition({animation:x.transition+" in",queue:!1,debug:x.debug,verbose:x.verbose,duration:x.duration,onComplete:function(){y.bind.close(),t.call(a,I),x.onVisible.call(a,I)}})):y.error(k.noTransition)},hide:function(t){t=e.isFunction(t)?t:function(){},y.debug("Hiding pop-up"),!1!==x.onHide.call(a,I)?x.transition&&void 0!==e.fn.transition&&P.transition("is supported")?a.transition({animation:x.transition+" out",queue:!1,duration:x.duration,debug:x.debug,verbose:x.verbose,onComplete:function(){y.reset(),t.call(a,I),x.onHidden.call(a,I)}}):y.error(k.noTransition):y.debug("onHide callback returned false, cancelling popup animation")}},change:{content:function(e){a.html(e)}},get:{html:function(){return P.removeData(S.html),P.data(S.html)||x.html},title:function(){return P.removeData(S.title),P.data(S.title)||x.title},content:function(){return P.removeData(S.content),P.data(S.content)||P.attr("title")||x.content},variation:function(){return P.removeData(S.variation),P.data(S.variation)||x.variation},popup:function(){return a},popupOffset:function(){return a.offset()},calculations:function(){var e,n=D[0],i=O[0]==t,o=x.inline||x.popup&&x.movePopup?D.position():D.offset(),r=i?{top:0,left:0}:O.offset(),l={},c=i?{top:s.scrollTop(),left:s.scrollLeft()}:{top:0,left:0};return l={target:{element:D[0],width:D.outerWidth(),height:D.outerHeight(),top:o.top,left:o.left,margin:{}},popup:{width:a.outerWidth(),height:a.outerHeight()},parent:{width:v.outerWidth(),height:v.outerHeight()},screen:{top:r.top,left:r.left,scroll:{top:c.top,left:c.left},width:O.width(),height:O.height()}},x.setFluidWidth&&y.is.fluid()&&(l.container={width:a.parent().outerWidth()},l.popup.width=l.container.width),l.target.margin.top=x.inline?parseInt(t.getComputedStyle(n).getPropertyValue("margin-top"),10):0,l.target.margin.left=x.inline?y.is.rtl()?parseInt(t.getComputedStyle(n).getPropertyValue("margin-right"),10):parseInt(t.getComputedStyle(n).getPropertyValue("margin-left"),10):0,e=l.screen,l.boundary={top:e.top+e.scroll.top,bottom:e.top+e.scroll.top+e.height,left:e.left+e.scroll.left,right:e.left+e.scroll.left+e.width},l},id:function(){return b},startEvent:function(){return"hover"==x.on?"mouseenter":"focus"==x.on&&"focus"},scrollEvent:function(){return"scroll"},endEvent:function(){return"hover"==x.on?"mouseleave":"focus"==x.on&&"blur"},distanceFromBoundary:function(e,t){var n,i,o={};return t=t||y.get.calculations(),n=t.popup,i=t.boundary,e&&(o={top:e.top-i.top,left:e.left-i.left,right:i.right-(e.left+n.width),bottom:i.bottom-(e.top+n.height)},y.verbose("Distance from boundaries determined",e,o)),o},offsetParent:function(t){var n=(void 0!==t?t[0]:P[0]).parentNode,i=e(n);if(n)for(var o="none"===i.css("transform"),a="static"===i.css("position"),r=i.is("html");n&&!r&&a&&o;)n=n.parentNode,o="none"===(i=e(n)).css("transform"),a="static"===i.css("position"),r=i.is("html");return i&&i.length>0?i:e()},positions:function(){return{"top left":!1,"top center":!1,"top right":!1,"bottom left":!1,"bottom center":!1,"bottom right":!1,"left center":!1,"right center":!1}},nextPosition:function(e){var t=e.split(" "),n=t[0],i=t[1],o="top"==n||"bottom"==n,a=!1,r=!1,s=!1;return j||(y.verbose("All available positions available"),j=y.get.positions()),y.debug("Recording last position tried",e),j[e]=!0,"opposite"===x.prefer&&(s=(s=[{top:"bottom",bottom:"top",left:"right",right:"left"}[n],i]).join(" "),a=!0===j[s],y.debug("Trying opposite strategy",s)),"adjacent"===x.prefer&&o&&(s=(s=[n,{left:"center",center:"right",right:"left"}[i]]).join(" "),r=!0===j[s],y.debug("Trying adjacent strategy",s)),(r||a)&&(y.debug("Using backup position",s),s={"top left":"top center","top center":"top right","top right":"right center","right center":"bottom right","bottom right":"bottom center","bottom center":"bottom left","bottom left":"left center","left center":"top left"}[e]),s}},set:{position:function(e,t){if(0!==D.length&&0!==a.length){var n,i,o,r,s,l,c,u;if(t=t||y.get.calculations(),e=e||P.data(S.position)||x.position,n=P.data(S.offset)||x.offset,i=x.distanceAway,o=t.target,r=t.popup,s=t.parent,0===o.width&&0===o.height&&!y.is.svg(o.element))return y.debug("Popup target is hidden, no action taken"),!1;switch(x.inline&&(y.debug("Adding margin to calculation",o.margin),"left center"==e||"right center"==e?(n+=o.margin.top,i+=-o.margin.left):"top left"==e||"top center"==e||"top right"==e?(n+=o.margin.left,i-=o.margin.top):(n+=o.margin.left,i+=o.margin.top)),y.debug("Determining popup position from calculations",e,t),y.is.rtl()&&(e=e.replace(/left|right/g,function(e){return"left"==e?"right":"left"}),y.debug("RTL: Popup position updated",e)),q==x.maxSearchDepth&&"string"==typeof x.lastResort&&(e=x.lastResort),e){case"top left":l={top:"auto",bottom:s.height-o.top+i,left:o.left+n,right:"auto"};break;case"top center":l={bottom:s.height-o.top+i,left:o.left+o.width/2-r.width/2+n,top:"auto",right:"auto"};break;case"top right":l={bottom:s.height-o.top+i,right:s.width-o.left-o.width-n,top:"auto",left:"auto"};break;case"left center":l={top:o.top+o.height/2-r.height/2+n,right:s.width-o.left+i,left:"auto",bottom:"auto"};break;case"right center":l={top:o.top+o.height/2-r.height/2+n,left:o.left+o.width+i,bottom:"auto",right:"auto"};break;case"bottom left":l={top:o.top+o.height+i,left:o.left+n,bottom:"auto",right:"auto"};break;case"bottom center":l={top:o.top+o.height+i,left:o.left+o.width/2-r.width/2+n,bottom:"auto",right:"auto"};break;case"bottom right":l={top:o.top+o.height+i,right:s.width-o.left-o.width-n,left:"auto",bottom:"auto"}}if(void 0===l&&y.error(k.invalidPosition,e),y.debug("Calculated popup positioning values",l),a.css(l).removeClass(w.position).addClass(e).addClass(w.loading),c=y.get.popupOffset(),u=y.get.distanceFromBoundary(c,t),y.is.offstage(u,e)){if(y.debug("Position is outside viewport",e),q<x.maxSearchDepth)return q++,e=y.get.nextPosition(e),y.debug("Trying new position",e),!!a&&y.set.position(e,t);if(!x.lastResort)return y.debug("Popup could not find a position to display",a),y.error(k.cannotPlace,I),y.remove.attempts(),y.remove.loading(),y.reset(),x.onUnplaceable.call(a,I),!1;y.debug("No position found, showing with last position")}return y.debug("Position is on stage",e),y.remove.attempts(),y.remove.loading(),x.setFluidWidth&&y.is.fluid()&&y.set.fluidWidth(t),!0}y.error(k.notFound)},fluidWidth:function(e){e=e||y.get.calculations(),y.debug("Automatically setting element width to parent width",e.parent.width),a.css("width",e.container.width)},variation:function(e){(e=e||y.get.variation())&&y.has.popup()&&(y.verbose("Adding variation to popup",e),a.addClass(e))},visible:function(){P.addClass(w.visible)}},remove:{loading:function(){a.removeClass(w.loading)},variation:function(e){(e=e||y.get.variation())&&(y.verbose("Removing variation",e),a.removeClass(e))},visible:function(){P.removeClass(w.visible)},attempts:function(){y.verbose("Resetting all searched positions"),q=0,j=!1}},bind:{events:function(){y.debug("Binding popup events to module"),"click"==x.on&&P.on("click"+A,y.toggle),"hover"==x.on&&P.on("touchstart"+A,y.event.touchstart),y.get.startEvent()&&P.on(y.get.startEvent()+A,y.event.start).on(y.get.endEvent()+A,y.event.end),x.target&&y.debug("Target set to element",D),s.on("resize"+h,y.event.resize)},popup:function(){y.verbose("Allowing hover events on popup to prevent closing"),a&&y.has.popup()&&a.on("mouseenter"+A,y.event.start).on("mouseleave"+A,y.event.end)},close:function(){(!0===x.hideOnScroll||"auto"==x.hideOnScroll&&"click"!=x.on)&&y.bind.closeOnScroll(),"hover"==x.on&&z&&y.bind.touchClose(),"click"==x.on&&x.closable&&y.bind.clickaway()},closeOnScroll:function(){y.verbose("Binding scroll close event to document"),F.one(y.get.scrollEvent()+h,y.event.hideGracefully)},touchClose:function(){y.verbose("Binding popup touchclose event to document"),r.on("touchstart"+h,function(e){y.verbose("Touched away from popup"),y.event.hideGracefully.call(I,e)})},clickaway:function(){y.verbose("Binding popup close event to document"),r.on("click"+h,function(e){y.verbose("Clicked away from popup"),y.event.hideGracefully.call(I,e)})}},unbind:{events:function(){s.off(h),P.off(A)},close:function(){r.off(h),F.off(h)}},has:{popup:function(){return a&&a.length>0}},is:{offstage:function(t,n){var i=[];return e.each(t,function(e,t){t<-x.jitter&&(y.debug("Position exceeds allowable distance from edge",e,t,n),i.push(e))}),i.length>0},svg:function(e){return y.supports.svg()&&e instanceof SVGGraphicsElement},active:function(){return P.hasClass(w.active)},animating:function(){return void 0!==a&&a.hasClass(w.animating)},fluid:function(){return void 0!==a&&a.hasClass(w.fluid)},visible:function(){return void 0!==a&&a.hasClass(w.popupVisible)},dropdown:function(){return P.hasClass(w.dropdown)},hidden:function(){return!y.is.visible()},rtl:function(){return"rtl"==P.css("direction")}},reset:function(){y.remove.visible(),x.preserve?void 0!==e.fn.transition&&a.transition("remove transition"):y.removePopup()},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,x,t);else{if(void 0===n)return x[t];x[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,y,t);else{if(void 0===n)return y[t];y[t]=n}},debug:function(){!x.silent&&x.debug&&(x.performance?y.performance.log(arguments):(y.debug=Function.prototype.bind.call(console.info,console,x.name+":"),y.debug.apply(console,arguments)))},verbose:function(){!x.silent&&x.verbose&&x.debug&&(x.performance?y.performance.log(arguments):(y.verbose=Function.prototype.bind.call(console.info,console,x.name+":"),y.verbose.apply(console,arguments)))},error:function(){x.silent||(y.error=Function.prototype.bind.call(console.error,console,x.name+":"),y.error.apply(console,arguments))},performance:{log:function(e){var t,n;x.performance&&(n=(t=(new Date).getTime())-(u||t),u=t,d.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:I,"Execution Time":n})),clearTimeout(y.performance.timer),y.performance.timer=setTimeout(y.performance.display,500)},display:function(){var t=x.name+":",n=0;u=!1,clearTimeout(y.performance.timer),e.each(d,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",c&&(t+=" '"+c+"'"),(void 0!==console.group||void 0!==console.table)&&d.length>0&&(console.groupCollapsed(t),console.table?console.table(d):e.each(d,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),d=[]}},invoke:function(t,n,i){var a,r,s,l=M;return n=n||g,i=I||i,"string"==typeof t&&void 0!==l&&(t=t.split(/[\. ]/),a=t.length-1,e.each(t,function(n,i){var o=n!=a?i+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[o])&&n!=a)l=l[o];else{if(void 0!==l[o])return r=l[o],!1;if(!e.isPlainObject(l[i])||n==a)return void 0!==l[i]&&(r=l[i],!1);l=l[i]}})),e.isFunction(r)?s=r.apply(i,n):void 0!==r&&(s=r),e.isArray(o)?o.push(s):void 0!==o?o=[o,s]:void 0!==s&&(o=s),r}},m?(void 0===M&&y.initialize(),y.invoke(f)):(void 0!==M&&M.invoke("destroy"),y.initialize())}),void 0!==o?o:this},e.fn.popup.settings={name:"Popup",silent:!1,debug:!1,verbose:!1,performance:!0,namespace:"popup",observeChanges:!0,onCreate:function(){},onRemove:function(){},onShow:function(){},onVisible:function(){},onHide:function(){},onUnplaceable:function(){},onHidden:function(){},on:"hover",boundary:t,addTouchEvents:!0,position:"top left",variation:"",movePopup:!0,target:!1,popup:!1,inline:!1,preserve:!1,hoverable:!1,content:!1,html:!1,title:!1,closable:!0,hideOnScroll:"auto",exclusive:!1,context:"body",scrollContext:t,prefer:"opposite",lastResort:!1,delay:{show:50,hide:70},setFluidWidth:!0,duration:200,transition:"scale",distanceAway:0,jitter:2,offset:0,maxSearchDepth:15,error:{invalidPosition:"The position you specified is not a valid position",cannotPlace:"Popup does not fit within the boundaries of the viewport",method:"The method you called is not defined.",noTransition:"This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>",notFound:"The target or popup you specified does not exist on the page"},metadata:{activator:"activator",content:"content",html:"html",offset:"offset",position:"position",title:"title",variation:"variation"},className:{active:"active",animating:"animating",dropdown:"dropdown",fluid:"fluid",loading:"loading",popup:"ui popup",position:"top left center bottom right",visible:"visible",popupVisible:"visible"},selector:{popup:".ui.popup"},templates:{escape:function(e){var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};return/[&<>"'`]/.test(e)?e.replace(/[&<>"'`]/g,function(e){return t[e]}):e},popup:function(t){var n="",i=e.fn.popup.settings.templates.escape;return void 0!==typeof t&&(void 0!==typeof t.title&&t.title&&(t.title=i(t.title),n+='<div class="header">'+t.title+"</div>"),void 0!==typeof t.content&&t.content&&(t.content=i(t.content),n+='<div class="content">'+t.content+"</div>")),n}}}}(jQuery,window,document),function(e,t,n,i){"use strict";void 0!==(t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")())&&t.Math==Math||("undefined"!=typeof self&&self.Math==Math?self:Function("return this")());e.fn.progress=function(t){var i,o=e(this),a=o.selector||"",r=(new Date).getTime(),s=[],l=arguments[0],c="string"==typeof l,u=[].slice.call(arguments,1);return o.each(function(){var o,d,f=e.isPlainObject(t)?e.extend(!0,{},e.fn.progress.settings,t):e.extend({},e.fn.progress.settings),m=f.className,g=f.metadata,v=f.namespace,p=f.selector,h=f.error,b="."+v,y="module-"+v,x=e(this),C=e(this).find(p.bar),w=e(this).find(p.progress),k=e(this).find(p.label),S=this,T=x.data(y),A=!1;d={initialize:function(){d.debug("Initializing progress bar",f),d.set.duration(),d.set.transitionEvent(),d.read.metadata(),d.read.settings(),d.instantiate()},instantiate:function(){d.verbose("Storing instance of progress",d),T=d,x.data(y,d)},destroy:function(){d.verbose("Destroying previous progress for",x),clearInterval(T.interval),d.remove.state(),x.removeData(y),T=void 0},reset:function(){d.remove.nextValue(),d.update.progress(0)},complete:function(){(void 0===d.percent||d.percent<100)&&(d.remove.progressPoll(),d.set.percent(100))},read:{metadata:function(){var e={percent:x.data(g.percent),total:x.data(g.total),value:x.data(g.value)};e.percent&&(d.debug("Current percent value set from metadata",e.percent),d.set.percent(e.percent)),e.total&&(d.debug("Total value set from metadata",e.total),d.set.total(e.total)),e.value&&(d.debug("Current value set from metadata",e.value),d.set.value(e.value),d.set.progress(e.value))},settings:function(){!1!==f.total&&(d.debug("Current total set in settings",f.total),d.set.total(f.total)),!1!==f.value&&(d.debug("Current value set in settings",f.value),d.set.value(f.value),d.set.progress(d.value)),!1!==f.percent&&(d.debug("Current percent set in settings",f.percent),d.set.percent(f.percent))}},bind:{transitionEnd:function(e){var t=d.get.transitionEnd();C.one(t+b,function(t){clearTimeout(d.failSafeTimer),e.call(this,t)}),d.failSafeTimer=setTimeout(function(){C.triggerHandler(t)},f.duration+f.failSafeDelay),d.verbose("Adding fail safe timer",d.timer)}},increment:function(e){var t,n;d.has.total()?n=(t=d.get.value())+(e=e||1):(n=(t=d.get.percent())+(e=e||d.get.randomValue()),100,d.debug("Incrementing percentage by",t,n)),n=d.get.normalizedValue(n),d.set.progress(n)},decrement:function(e){var t,n;d.get.total()?(n=(t=d.get.value())-(e=e||1),d.debug("Decrementing value by",e,t)):(n=(t=d.get.percent())-(e=e||d.get.randomValue()),d.debug("Decrementing percentage by",e,t)),n=d.get.normalizedValue(n),d.set.progress(n)},has:{progressPoll:function(){return d.progressPoll},total:function(){return!1!==d.get.total()}},get:{text:function(e){var t=d.value||0,n=d.total||0,i=A?d.get.displayPercent():d.percent||0,o=d.total>0?n-t:100-i;return e=e||"",e=e.replace("{value}",t).replace("{total}",n).replace("{left}",o).replace("{percent}",i),d.verbose("Adding variables to progress bar text",e),e},normalizedValue:function(e){if(e<0)return d.debug("Value cannot decrement below 0"),0;if(d.has.total()){if(e>d.total)return d.debug("Value cannot increment above total",d.total),d.total}else if(e>100)return d.debug("Value cannot increment above 100 percent"),100;return e},updateInterval:function(){return"auto"==f.updateInterval?f.duration:f.updateInterval},randomValue:function(){return d.debug("Generating random increment percentage"),Math.floor(Math.random()*f.random.max+f.random.min)},numericValue:function(e){return"string"==typeof e?""!==e.replace(/[^\d.]/g,"")&&+e.replace(/[^\d.]/g,""):e},transitionEnd:function(){var e,t=n.createElement("element"),i={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in i)if(void 0!==t.style[e])return i[e]},displayPercent:function(){var e=C.width(),t=x.width(),n=e>parseInt(C.css("min-width"),10)?e/t*100:d.percent;return f.precision>0?Math.round(n*(10*f.precision))/(10*f.precision):Math.round(n)},percent:function(){return d.percent||0},value:function(){return d.nextValue||d.value||0},total:function(){return d.total||!1}},create:{progressPoll:function(){d.progressPoll=setTimeout(function(){d.update.toNextValue(),d.remove.progressPoll()},d.get.updateInterval())}},is:{complete:function(){return d.is.success()||d.is.warning()||d.is.error()},success:function(){return x.hasClass(m.success)},warning:function(){return x.hasClass(m.warning)},error:function(){return x.hasClass(m.error)},active:function(){return x.hasClass(m.active)},visible:function(){return x.is(":visible")}},remove:{progressPoll:function(){d.verbose("Removing progress poll timer"),d.progressPoll&&(clearTimeout(d.progressPoll),delete d.progressPoll)},nextValue:function(){d.verbose("Removing progress value stored for next update"),delete d.nextValue},state:function(){d.verbose("Removing stored state"),delete d.total,delete d.percent,delete d.value},active:function(){d.verbose("Removing active state"),x.removeClass(m.active)},success:function(){d.verbose("Removing success state"),x.removeClass(m.success)},warning:function(){d.verbose("Removing warning state"),x.removeClass(m.warning)},error:function(){d.verbose("Removing error state"),x.removeClass(m.error)}},set:{barWidth:function(e){e>100?d.error(h.tooHigh,e):e<0?d.error(h.tooLow,e):(C.css("width",e+"%"),x.attr("data-percent",parseInt(e,10)))},duration:function(e){e="number"==typeof(e=e||f.duration)?e+"ms":e,d.verbose("Setting progress bar transition duration",e),C.css({"transition-duration":e})},percent:function(e){e="string"==typeof e?+e.replace("%",""):e,e=f.precision>0?Math.round(e*(10*f.precision))/(10*f.precision):Math.round(e),d.percent=e,d.has.total()||(d.value=f.precision>0?Math.round(e/100*d.total*(10*f.precision))/(10*f.precision):Math.round(e/100*d.total*10)/10,f.limitValues&&(d.value=d.value>100?100:d.value<0?0:d.value)),d.set.barWidth(e),d.set.labelInterval(),d.set.labels(),f.onChange.call(S,e,d.value,d.total)},labelInterval:function(){clearInterval(d.interval),d.bind.transitionEnd(function(){d.verbose("Bar finished animating, removing continuous label updates"),clearInterval(d.interval),A=!1,d.set.labels()}),A=!0,d.interval=setInterval(function(){e.contains(n.documentElement,S)||(clearInterval(d.interval),A=!1),d.set.labels()},f.framerate)},labels:function(){d.verbose("Setting both bar progress and outer label text"),d.set.barLabel(),d.set.state()},label:function(e){(e=e||"")&&(e=d.get.text(e),d.verbose("Setting label to text",e),k.text(e))},state:function(e){100===(e=void 0!==e?e:d.percent)?f.autoSuccess&&!(d.is.warning()||d.is.error()||d.is.success())?(d.set.success(),d.debug("Automatically triggering success at 100%")):(d.verbose("Reached 100% removing active state"),d.remove.active(),d.remove.progressPoll()):e>0?(d.verbose("Adjusting active progress bar label",e),d.set.active()):(d.remove.active(),d.set.label(f.text.active))},barLabel:function(e){void 0!==e?w.text(d.get.text(e)):"ratio"==f.label&&d.total?(d.verbose("Adding ratio to bar label"),w.text(d.get.text(f.text.ratio))):"percent"==f.label&&(d.verbose("Adding percentage to bar label"),w.text(d.get.text(f.text.percent)))},active:function(e){e=e||f.text.active,d.debug("Setting active state"),f.showActivity&&!d.is.active()&&x.addClass(m.active),d.remove.warning(),d.remove.error(),d.remove.success(),(e=f.onLabelUpdate("active",e,d.value,d.total))&&d.set.label(e),d.bind.transitionEnd(function(){f.onActive.call(S,d.value,d.total)})},success:function(e){e=e||f.text.success||f.text.active,d.debug("Setting success state"),x.addClass(m.success),d.remove.active(),d.remove.warning(),d.remove.error(),d.complete(),f.text.success?(e=f.onLabelUpdate("success",e,d.value,d.total),d.set.label(e)):(e=f.onLabelUpdate("active",e,d.value,d.total),d.set.label(e)),d.bind.transitionEnd(function(){f.onSuccess.call(S,d.total)})},warning:function(e){e=e||f.text.warning,d.debug("Setting warning state"),x.addClass(m.warning),d.remove.active(),d.remove.success(),d.remove.error(),d.complete(),(e=f.onLabelUpdate("warning",e,d.value,d.total))&&d.set.label(e),d.bind.transitionEnd(function(){f.onWarning.call(S,d.value,d.total)})},error:function(e){e=e||f.text.error,d.debug("Setting error state"),x.addClass(m.error),d.remove.active(),d.remove.success(),d.remove.warning(),d.complete(),(e=f.onLabelUpdate("error",e,d.value,d.total))&&d.set.label(e),d.bind.transitionEnd(function(){f.onError.call(S,d.value,d.total)})},transitionEvent:function(){o=d.get.transitionEnd()},total:function(e){d.total=e},value:function(e){d.value=e},progress:function(e){d.has.progressPoll()?(d.debug("Updated within interval, setting next update to use new value",e),d.set.nextValue(e)):(d.debug("First update in progress update interval, immediately updating",e),d.update.progress(e),d.create.progressPoll())},nextValue:function(e){d.nextValue=e}},update:{toNextValue:function(){var e=d.nextValue;e&&(d.debug("Update interval complete using last updated value",e),d.update.progress(e),d.remove.nextValue())},progress:function(e){var t;!1===(e=d.get.numericValue(e))&&d.error(h.nonNumeric,e),e=d.get.normalizedValue(e),d.has.total()?(d.set.value(e),t=e/d.total*100,d.debug("Calculating percent complete from total",t),d.set.percent(t)):(t=e,d.debug("Setting value to exact percentage value",t),d.set.percent(t))}},setting:function(t,n){if(d.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,f,t);else{if(void 0===n)return f[t];e.isPlainObject(f[t])?e.extend(!0,f[t],n):f[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,d,t);else{if(void 0===n)return d[t];d[t]=n}},debug:function(){!f.silent&&f.debug&&(f.performance?d.performance.log(arguments):(d.debug=Function.prototype.bind.call(console.info,console,f.name+":"),d.debug.apply(console,arguments)))},verbose:function(){!f.silent&&f.verbose&&f.debug&&(f.performance?d.performance.log(arguments):(d.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),d.verbose.apply(console,arguments)))},error:function(){f.silent||(d.error=Function.prototype.bind.call(console.error,console,f.name+":"),d.error.apply(console,arguments))},performance:{log:function(e){var t,n;f.performance&&(n=(t=(new Date).getTime())-(r||t),r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:S,"Execution Time":n})),clearTimeout(d.performance.timer),d.performance.timer=setTimeout(d.performance.display,500)},display:function(){var t=f.name+":",n=0;r=!1,clearTimeout(d.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",a&&(t+=" '"+a+"'"),(void 0!==console.group||void 0!==console.table)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,n,o){var a,r,s,l=T;return n=n||u,o=S||o,"string"==typeof t&&void 0!==l&&(t=t.split(/[\. ]/),a=t.length-1,e.each(t,function(n,i){var o=n!=a?i+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[o])&&n!=a)l=l[o];else{if(void 0!==l[o])return r=l[o],!1;if(!e.isPlainObject(l[i])||n==a)return void 0!==l[i]?(r=l[i],!1):(d.error(h.method,t),!1);l=l[i]}})),e.isFunction(r)?s=r.apply(o,n):void 0!==r&&(s=r),e.isArray(i)?i.push(s):void 0!==i?i=[i,s]:void 0!==s&&(i=s),r}},c?(void 0===T&&d.initialize(),d.invoke(l)):(void 0!==T&&T.invoke("destroy"),d.initialize())}),void 0!==i?i:this},e.fn.progress.settings={name:"Progress",namespace:"progress",silent:!1,debug:!1,verbose:!1,performance:!0,random:{min:2,max:5},duration:300,updateInterval:"auto",autoSuccess:!0,showActivity:!0,limitValues:!0,label:"percent",precision:0,framerate:1e3/30,percent:!1,total:!1,value:!1,failSafeDelay:100,onLabelUpdate:function(e,t,n,i){return t},onChange:function(e,t,n){},onSuccess:function(e){},onActive:function(e,t){},onError:function(e,t){},onWarning:function(e,t){},error:{method:"The method you called is not defined.",nonNumeric:"Progress value is non numeric",tooHigh:"Value specified is above 100%",tooLow:"Value specified is below 0%"},regExp:{variable:/\{\$*[A-z0-9]+\}/g},metadata:{percent:"percent",total:"total",value:"value"},selector:{bar:"> .bar",label:"> .label",progress:".bar > .progress"},text:{active:!1,error:!1,success:!1,warning:!1,percent:"{percent}%",ratio:"{value} of {total}"},className:{active:"active",error:"error",success:"success",warning:"warning"}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.rating=function(t){var n,i=e(this),o=i.selector||"",a=(new Date).getTime(),r=[],s=arguments[0],l="string"==typeof s,c=[].slice.call(arguments,1);return i.each(function(){var u,d,f=e.isPlainObject(t)?e.extend(!0,{},e.fn.rating.settings,t):e.extend({},e.fn.rating.settings),m=f.namespace,g=f.className,v=f.metadata,p=f.selector,h=(f.error,"."+m),b="module-"+m,y=this,x=e(this).data(b),C=e(this),w=C.find(p.icon);d={initialize:function(){d.verbose("Initializing rating module",f),0===w.length&&d.setup.layout(),f.interactive?d.enable():d.disable(),d.set.initialLoad(),d.set.rating(d.get.initialRating()),d.remove.initialLoad(),d.instantiate()},instantiate:function(){d.verbose("Instantiating module",f),x=d,C.data(b,d)},destroy:function(){d.verbose("Destroying previous instance",x),d.remove.events(),C.removeData(b)},refresh:function(){w=C.find(p.icon)},setup:{layout:function(){var t=d.get.maxRating(),n=e.fn.rating.settings.templates.icon(t);d.debug("Generating icon html dynamically"),C.html(n),d.refresh()}},event:{mouseenter:function(){var t=e(this);t.nextAll().removeClass(g.selected),C.addClass(g.selected),t.addClass(g.selected).prevAll().addClass(g.selected)},mouseleave:function(){C.removeClass(g.selected),w.removeClass(g.selected)},click:function(){var t=e(this),n=d.get.rating(),i=w.index(t)+1;("auto"==f.clearable?1===w.length:f.clearable)&&n==i?d.clearRating():d.set.rating(i)}},clearRating:function(){d.debug("Clearing current rating"),d.set.rating(0)},bind:{events:function(){d.verbose("Binding events"),C.on("mouseenter"+h,p.icon,d.event.mouseenter).on("mouseleave"+h,p.icon,d.event.mouseleave).on("click"+h,p.icon,d.event.click)}},remove:{events:function(){d.verbose("Removing events"),C.off(h)},initialLoad:function(){u=!1}},enable:function(){d.debug("Setting rating to interactive mode"),d.bind.events(),C.removeClass(g.disabled)},disable:function(){d.debug("Setting rating to read-only mode"),d.remove.events(),C.addClass(g.disabled)},is:{initialLoad:function(){return u}},get:{initialRating:function(){return void 0!==C.data(v.rating)?(C.removeData(v.rating),C.data(v.rating)):f.initialRating},maxRating:function(){return void 0!==C.data(v.maxRating)?(C.removeData(v.maxRating),C.data(v.maxRating)):f.maxRating},rating:function(){var e=w.filter("."+g.active).length;return d.verbose("Current rating retrieved",e),e}},set:{rating:function(e){var t=e-1>=0?e-1:0,n=w.eq(t);C.removeClass(g.selected),w.removeClass(g.selected).removeClass(g.active),e>0&&(d.verbose("Setting current rating to",e),n.prevAll().addBack().addClass(g.active)),d.is.initialLoad()||f.onRate.call(y,e)},initialLoad:function(){u=!0}},setting:function(t,n){if(d.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,f,t);else{if(void 0===n)return f[t];e.isPlainObject(f[t])?e.extend(!0,f[t],n):f[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,d,t);else{if(void 0===n)return d[t];d[t]=n}},debug:function(){!f.silent&&f.debug&&(f.performance?d.performance.log(arguments):(d.debug=Function.prototype.bind.call(console.info,console,f.name+":"),d.debug.apply(console,arguments)))},verbose:function(){!f.silent&&f.verbose&&f.debug&&(f.performance?d.performance.log(arguments):(d.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),d.verbose.apply(console,arguments)))},error:function(){f.silent||(d.error=Function.prototype.bind.call(console.error,console,f.name+":"),d.error.apply(console,arguments))},performance:{log:function(e){var t,n;f.performance&&(n=(t=(new Date).getTime())-(a||t),a=t,r.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:y,"Execution Time":n})),clearTimeout(d.performance.timer),d.performance.timer=setTimeout(d.performance.display,500)},display:function(){var t=f.name+":",n=0;a=!1,clearTimeout(d.performance.timer),e.each(r,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",o&&(t+=" '"+o+"'"),i.length>1&&(t+=" ("+i.length+")"),(void 0!==console.group||void 0!==console.table)&&r.length>0&&(console.groupCollapsed(t),console.table?console.table(r):e.each(r,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),r=[]}},invoke:function(t,i,o){var a,r,s,l=x;return i=i||c,o=y||o,"string"==typeof t&&void 0!==l&&(t=t.split(/[\. ]/),a=t.length-1,e.each(t,function(n,i){var o=n!=a?i+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[o])&&n!=a)l=l[o];else{if(void 0!==l[o])return r=l[o],!1;if(!e.isPlainObject(l[i])||n==a)return void 0!==l[i]&&(r=l[i],!1);l=l[i]}})),e.isFunction(r)?s=r.apply(o,i):void 0!==r&&(s=r),e.isArray(n)?n.push(s):void 0!==n?n=[n,s]:void 0!==s&&(n=s),r}},l?(void 0===x&&d.initialize(),d.invoke(s)):(void 0!==x&&x.invoke("destroy"),d.initialize())}),void 0!==n?n:this},e.fn.rating.settings={name:"Rating",namespace:"rating",slent:!1,debug:!1,verbose:!1,performance:!0,initialRating:0,interactive:!0,maxRating:4,clearable:"auto",fireOnInit:!1,onRate:function(e){},error:{method:"The method you called is not defined",noMaximum:"No maximum rating specified. Cannot generate HTML automatically"},metadata:{rating:"rating",maxRating:"maxRating"},className:{active:"active",disabled:"disabled",selected:"selected",loading:"loading"},selector:{icon:".icon"},templates:{icon:function(e){for(var t=1,n="";t<=e;)n+='<i class="icon"></i>',t++;return n}}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.search=function(i){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),l=[],c=arguments[0],u="string"==typeof c,d=[].slice.call(arguments,1);return e(this).each(function(){var f,m=e.isPlainObject(i)?e.extend(!0,{},e.fn.search.settings,i):e.extend({},e.fn.search.settings),g=m.className,v=m.metadata,p=m.regExp,h=m.fields,b=m.selector,y=m.error,x=m.namespace,C="."+x,w=x+"-module",k=e(this),S=k.find(b.prompt),T=k.find(b.searchButton),A=k.find(b.results),R=k.find(b.result),P=k.find(b.category),E=this,F=k.data(w),O=!1,D=!1;f={initialize:function(){f.verbose("Initializing module"),f.determine.searchFields(),f.bind.events(),f.set.type(),f.create.results(),f.instantiate()},instantiate:function(){f.verbose("Storing instance of module",f),F=f,k.data(w,f)},destroy:function(){f.verbose("Destroying instance"),k.off(C).removeData(w)},refresh:function(){f.debug("Refreshing selector cache"),S=k.find(b.prompt),T=k.find(b.searchButton),P=k.find(b.category),A=k.find(b.results),R=k.find(b.result)},refreshResults:function(){A=k.find(b.results),R=k.find(b.result)},bind:{events:function(){f.verbose("Binding events to search"),m.automatic&&(k.on(f.get.inputEvent()+C,b.prompt,f.event.input),S.attr("autocomplete","off")),k.on("focus"+C,b.prompt,f.event.focus).on("blur"+C,b.prompt,f.event.blur).on("keydown"+C,b.prompt,f.handleKeyboard).on("click"+C,b.searchButton,f.query).on("mousedown"+C,b.results,f.event.result.mousedown).on("mouseup"+C,b.results,f.event.result.mouseup).on("click"+C,b.result,f.event.result.click)}},determine:{searchFields:function(){i&&void 0!==i.searchFields&&(m.searchFields=i.searchFields)}},event:{input:function(){m.searchDelay?(clearTimeout(f.timer),f.timer=setTimeout(function(){f.is.focused()&&f.query()},m.searchDelay)):f.query()},focus:function(){f.set.focus(),m.searchOnFocus&&f.has.minimumCharacters()&&f.query(function(){f.can.show()&&f.showResults()})},blur:function(e){var t=function(){f.cancel.query(),f.remove.focus(),f.timer=setTimeout(f.hideResults,m.hideDelay)};n.activeElement===this||(D=!1,f.resultsClicked?(f.debug("Determining if user action caused search to close"),k.one("click.close"+C,b.results,function(e){f.is.inMessage(e)||O?S.focus():(O=!1,f.is.animating()||f.is.hidden()||t())})):(f.debug("Input blurred without user action, closing results"),t()))},result:{mousedown:function(){f.resultsClicked=!0},mouseup:function(){f.resultsClicked=!1},click:function(n){f.debug("Search result selected");var i=e(this),o=i.find(b.title).eq(0),a=i.is("a[href]")?i:i.find("a[href]").eq(0),r=a.attr("href")||!1,s=a.attr("target")||!1,l=(o.html(),o.length>0&&o.text()),c=f.get.results(),u=i.data(v.result)||f.get.result(l,c);if(e.isFunction(m.onSelect)&&!1===m.onSelect.call(E,u,c))return f.debug("Custom onSelect callback cancelled default select action"),void(O=!0);f.hideResults(),l&&f.set.value(l),r&&(f.verbose("Opening search link found in result",a),"_blank"==s||n.ctrlKey?t.open(r):t.location.href=r)}}},handleKeyboard:function(e){var t,n=k.find(b.result),i=k.find(b.category),o=n.filter("."+g.active),a=n.index(o),r=n.length,s=o.length>0,l=e.which,c=13,u=38,d=40;if(l==27&&(f.verbose("Escape key pressed, blurring search field"),f.hideResults(),D=!0),f.is.visible())if(l==c){if(f.verbose("Enter key pressed, selecting active result"),n.filter("."+g.active).length>0)return f.event.result.click.call(n.filter("."+g.active),e),e.preventDefault(),!1}else l==u&&s?(f.verbose("Up key pressed, changing active result"),t=a-1<0?a:a-1,i.removeClass(g.active),n.removeClass(g.active).eq(t).addClass(g.active).closest(i).addClass(g.active),e.preventDefault()):l==d&&(f.verbose("Down key pressed, changing active result"),t=a+1>=r?a:a+1,i.removeClass(g.active),n.removeClass(g.active).eq(t).addClass(g.active).closest(i).addClass(g.active),e.preventDefault());else l==c&&(f.verbose("Enter key pressed, executing query"),f.query(),f.set.buttonPressed(),S.one("keyup",f.remove.buttonFocus))},setup:{api:function(t,n){var i={debug:m.debug,on:!1,cache:!0,action:"search",urlData:{query:t},onSuccess:function(e){f.parse.response.call(E,e,t),n()},onFailure:function(){f.displayMessage(y.serverError),n()},onAbort:function(e){},onError:f.error};e.extend(!0,i,m.apiSettings),f.verbose("Setting up API request",i),k.api(i)}},can:{useAPI:function(){return void 0!==e.fn.api},show:function(){return f.is.focused()&&!f.is.visible()&&!f.is.empty()},transition:function(){return m.transition&&void 0!==e.fn.transition&&k.transition("is supported")}},is:{animating:function(){return A.hasClass(g.animating)},hidden:function(){return A.hasClass(g.hidden)},inMessage:function(t){if(t.target){var i=e(t.target);return e.contains(n.documentElement,t.target)&&i.closest(b.message).length>0}},empty:function(){return""===A.html()},visible:function(){return A.filter(":visible").length>0},focused:function(){return S.filter(":focus").length>0}},get:{inputEvent:function(){var e=S[0];return void 0!==e&&void 0!==e.oninput?"input":void 0!==e&&void 0!==e.onpropertychange?"propertychange":"keyup"},value:function(){return S.val()},results:function(){return k.data(v.results)},result:function(t,n){var i=["title","id"],o=!1;return t=void 0!==t?t:f.get.value(),n=void 0!==n?n:f.get.results(),"category"===m.type?(f.debug("Finding result that matches",t),e.each(n,function(n,a){if(e.isArray(a.results)&&(o=f.search.object(t,a.results,i)[0]))return!1})):(f.debug("Finding result in results object",t),o=f.search.object(t,n,i)[0]),o||!1}},select:{firstResult:function(){f.verbose("Selecting first result"),R.first().addClass(g.active)}},set:{focus:function(){k.addClass(g.focus)},loading:function(){k.addClass(g.loading)},value:function(e){f.verbose("Setting search input value",e),S.val(e)},type:function(e){e=e||m.type,"category"==m.type&&k.addClass(m.type)},buttonPressed:function(){T.addClass(g.pressed)}},remove:{loading:function(){k.removeClass(g.loading)},focus:function(){k.removeClass(g.focus)},buttonPressed:function(){T.removeClass(g.pressed)}},query:function(t){t=e.isFunction(t)?t:function(){};var n=f.get.value(),i=f.read.cache(n);t=t||function(){},f.has.minimumCharacters()?(i?(f.debug("Reading result from cache",n),f.save.results(i.results),f.addResults(i.html),f.inject.id(i.results),t()):(f.debug("Querying for",n),e.isPlainObject(m.source)||e.isArray(m.source)?(f.search.local(n),t()):f.can.useAPI()?f.search.remote(n,t):(f.error(y.source),t())),m.onSearchQuery.call(E,n)):f.hideResults()},search:{local:function(e){var t,n=f.search.object(e,m.content);f.set.loading(),f.save.results(n),f.debug("Returned local search results",n),t=f.generateResults({results:n}),f.remove.loading(),f.addResults(t),f.inject.id(n),f.write.cache(e,{html:t,results:n})},remote:function(t,n){n=e.isFunction(n)?n:function(){},k.api("is loading")&&k.api("abort"),f.setup.api(t,n),k.api("query")},object:function(t,n,i){var o=[],a=[],r=t.toString().replace(p.escape,"\\$&"),s=new RegExp(p.beginsWith+r,"i"),l=function(t,n){var i=-1==e.inArray(n,o),r=-1==e.inArray(n,a);i&&r&&t.push(n)};return n=n||m.source,i=void 0!==i?i:m.searchFields,e.isArray(i)||(i=[i]),void 0===n||!1===n?(f.error(y.source),[]):(e.each(i,function(i,r){e.each(n,function(e,n){"string"==typeof n[r]&&(-1!==n[r].search(s)?l(o,n):m.searchFullText&&f.fuzzySearch(t,n[r])&&l(a,n))})}),e.merge(o,a))}},fuzzySearch:function(e,t){var n=t.length,i=e.length;if("string"!=typeof e)return!1;if(e=e.toLowerCase(),t=t.toLowerCase(),i>n)return!1;if(i===n)return e===t;e:for(var o=0,a=0;o<i;o++){for(var r=e.charCodeAt(o);a<n;)if(t.charCodeAt(a++)===r)continue e;return!1}return!0},parse:{response:function(e,t){var n=f.generateResults(e);f.verbose("Parsing server response",e),void 0!==e&&void 0!==t&&void 0!==e[h.results]&&(f.addResults(n),f.inject.id(e[h.results]),f.write.cache(t,{html:n,results:e[h.results]}),f.save.results(e[h.results]))}},cancel:{query:function(){f.can.useAPI()&&k.api("abort")}},has:{minimumCharacters:function(){return f.get.value().length>=m.minCharacters},results:function(){if(0===A.length)return!1;return""!=A.html()}},clear:{cache:function(e){var t=k.data(v.cache);e?e&&t&&t[e]&&(f.debug("Removing value from cache",e),delete t[e],k.data(v.cache,t)):(f.debug("Clearing cache",e),k.removeData(v.cache))}},read:{cache:function(e){var t=k.data(v.cache);return!!m.cache&&(f.verbose("Checking cache for generated html for query",e),"object"==typeof t&&void 0!==t[e]&&t[e])}},create:{id:function(e,t){var n,i=e+1;return void 0!==t?(n=String.fromCharCode(97+t)+i,f.verbose("Creating category result id",n)):(n=i,f.verbose("Creating result id",n)),n},results:function(){0===A.length&&(A=e("<div />").addClass(g.results).appendTo(k))}},inject:{result:function(e,t,n){f.verbose("Injecting result into results");var i=void 0!==n?A.children().eq(n).children(b.result).eq(t):A.children(b.result).eq(t);f.verbose("Injecting results metadata",i),i.data(v.result,e)},id:function(t){f.debug("Injecting unique ids into results");var n=0,i=0;return"category"===m.type?e.each(t,function(t,o){i=0,e.each(o.results,function(e,t){var a=o.results[e];void 0===a.id&&(a.id=f.create.id(i,n)),f.inject.result(a,i,n),i++}),n++}):e.each(t,function(e,n){var o=t[e];void 0===o.id&&(o.id=f.create.id(i)),f.inject.result(o,i),i++}),t}},save:{results:function(e){f.verbose("Saving current search results to metadata",e),k.data(v.results,e)}},write:{cache:function(e,t){var n=void 0!==k.data(v.cache)?k.data(v.cache):{};m.cache&&(f.verbose("Writing generated html to cache",e,t),n[e]=t,k.data(v.cache,n))}},addResults:function(t){if(e.isFunction(m.onResultsAdd)&&!1===m.onResultsAdd.call(A,t))return f.debug("onResultsAdd callback cancelled default action"),!1;t?(A.html(t),f.refreshResults(),m.selectFirstResult&&f.select.firstResult(),f.showResults()):f.hideResults(function(){A.empty()})},showResults:function(t){t=e.isFunction(t)?t:function(){},D||!f.is.visible()&&f.has.results()&&(f.can.transition()?(f.debug("Showing results with css animations"),A.transition({animation:m.transition+" in",debug:m.debug,verbose:m.verbose,duration:m.duration,onComplete:function(){t()},queue:!0})):(f.debug("Showing results with javascript"),A.stop().fadeIn(m.duration,m.easing)),m.onResultsOpen.call(A))},hideResults:function(t){t=e.isFunction(t)?t:function(){},f.is.visible()&&(f.can.transition()?(f.debug("Hiding results with css animations"),A.transition({animation:m.transition+" out",debug:m.debug,verbose:m.verbose,duration:m.duration,onComplete:function(){t()},queue:!0})):(f.debug("Hiding results with javascript"),A.stop().fadeOut(m.duration,m.easing)),m.onResultsClose.call(A))},generateResults:function(t){f.debug("Generating html from response",t);var n=m.templates[m.type],i=e.isPlainObject(t[h.results])&&!e.isEmptyObject(t[h.results]),o=e.isArray(t[h.results])&&t[h.results].length>0,a="";return i||o?(m.maxResults>0&&(i?"standard"==m.type&&f.error(y.maxResults):t[h.results]=t[h.results].slice(0,m.maxResults)),e.isFunction(n)?a=n(t,h):f.error(y.noTemplate,!1)):m.showNoResults&&(a=f.displayMessage(y.noResults,"empty")),m.onResults.call(E,t),a},displayMessage:function(e,t){return t=t||"standard",f.debug("Displaying message",e,t),f.addResults(m.templates.message(e,t)),m.templates.message(e,t)},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,m,t);else{if(void 0===n)return m[t];m[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,f,t);else{if(void 0===n)return f[t];f[t]=n}},debug:function(){!m.silent&&m.debug&&(m.performance?f.performance.log(arguments):(f.debug=Function.prototype.bind.call(console.info,console,m.name+":"),f.debug.apply(console,arguments)))},verbose:function(){!m.silent&&m.verbose&&m.debug&&(m.performance?f.performance.log(arguments):(f.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),f.verbose.apply(console,arguments)))},error:function(){m.silent||(f.error=Function.prototype.bind.call(console.error,console,m.name+":"),f.error.apply(console,arguments))},performance:{log:function(e){var t,n;m.performance&&(n=(t=(new Date).getTime())-(s||t),s=t,l.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:E,"Execution Time":n})),clearTimeout(f.performance.timer),f.performance.timer=setTimeout(f.performance.display,500)},display:function(){var t=m.name+":",n=0;s=!1,clearTimeout(f.performance.timer),e.each(l,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),a.length>1&&(t+=" ("+a.length+")"),(void 0!==console.group||void 0!==console.table)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,n,i){var a,r,s,l=F;return n=n||d,i=E||i,"string"==typeof t&&void 0!==l&&(t=t.split(/[\. ]/),a=t.length-1,e.each(t,function(n,i){var o=n!=a?i+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[o])&&n!=a)l=l[o];else{if(void 0!==l[o])return r=l[o],!1;if(!e.isPlainObject(l[i])||n==a)return void 0!==l[i]&&(r=l[i],!1);l=l[i]}})),e.isFunction(r)?s=r.apply(i,n):void 0!==r&&(s=r),e.isArray(o)?o.push(s):void 0!==o?o=[o,s]:void 0!==s&&(o=s),r}},u?(void 0===F&&f.initialize(),f.invoke(c)):(void 0!==F&&F.invoke("destroy"),f.initialize())}),void 0!==o?o:this},e.fn.search.settings={name:"Search",namespace:"search",silent:!1,debug:!1,verbose:!1,performance:!0,type:"standard",minCharacters:1,selectFirstResult:!1,apiSettings:!1,source:!1,searchOnFocus:!0,searchFields:["title","description"],displayField:"",searchFullText:!0,automatic:!0,hideDelay:0,searchDelay:200,maxResults:7,cache:!0,showNoResults:!0,transition:"scale",duration:200,easing:"easeOutExpo",onSelect:!1,onResultsAdd:!1,onSearchQuery:function(e){},onResults:function(e){},onResultsOpen:function(){},onResultsClose:function(){},className:{animating:"animating",active:"active",empty:"empty",focus:"focus",hidden:"hidden",loading:"loading",results:"results",pressed:"down"},error:{source:"Cannot search. No source used, and Semantic API module was not included",noResults:"Your search returned no results",logging:"Error in debug logging, exiting.",noEndpoint:"No search endpoint was specified",noTemplate:"A valid template name was not specified.",serverError:"There was an issue querying the server.",maxResults:"Results must be an array to use maxResults setting",method:"The method you called is not defined."},metadata:{cache:"cache",results:"results",result:"result"},regExp:{escape:/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,beginsWith:"(?:s|^)"},fields:{categories:"results",categoryName:"name",categoryResults:"results",description:"description",image:"image",price:"price",results:"results",title:"title",url:"url",action:"action",actionText:"text",actionURL:"url"},selector:{prompt:".prompt",searchButton:".search.button",results:".results",message:".results > .message",category:".category",result:".result",title:".title, .name"},templates:{escape:function(e){var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};return/[&<>"'`]/.test(e)?e.replace(/[&<>"'`]/g,function(e){return t[e]}):e},message:function(e,t){var n="";return void 0!==e&&void 0!==t&&(n+='<div class="message '+t+'">',n+="empty"==t?'<div class="header">No Results</div class="header"><div class="description">'+e+'</div class="description">':' <div class="description">'+e+"</div>",n+="</div>"),n},category:function(t,n){var i="";e.fn.search.settings.templates.escape;return void 0!==t[n.categoryResults]&&(e.each(t[n.categoryResults],function(t,o){void 0!==o[n.results]&&o.results.length>0&&(i+='<div class="category">',void 0!==o[n.categoryName]&&(i+='<div class="name">'+o[n.categoryName]+"</div>"),e.each(o.results,function(e,t){t[n.url]?i+='<a class="result" href="'+t[n.url]+'">':i+='<a class="result">',void 0!==t[n.image]&&(i+='<div class="image"> <img src="'+t[n.image]+'"></div>'),i+='<div class="content">',void 0!==t[n.price]&&(i+='<div class="price">'+t[n.price]+"</div>"),void 0!==t[n.title]&&(i+='<div class="title">'+t[n.title]+"</div>"),void 0!==t[n.description]&&(i+='<div class="description">'+t[n.description]+"</div>"),i+="</div>",i+="</a>"}),i+="</div>")}),t[n.action]&&(i+='<a href="'+t[n.action][n.actionURL]+'" class="action">'+t[n.action][n.actionText]+"</a>"),i)},standard:function(t,n){var i="";return void 0!==t[n.results]&&(e.each(t[n.results],function(e,t){t[n.url]?i+='<a class="result" href="'+t[n.url]+'">':i+='<a class="result">',void 0!==t[n.image]&&(i+='<div class="image"> <img src="'+t[n.image]+'"></div>'),i+='<div class="content">',void 0!==t[n.price]&&(i+='<div class="price">'+t[n.price]+"</div>"),void 0!==t[n.title]&&(i+='<div class="title">'+t[n.title]+"</div>"),void 0!==t[n.description]&&(i+='<div class="description">'+t[n.description]+"</div>"),i+="</div>",i+="</a>"}),t[n.action]&&(i+='<a href="'+t[n.action][n.actionURL]+'" class="action">'+t[n.action][n.actionText]+"</a>"),i)}}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.shape=function(i){var o,a=e(this),r=(e("body"),(new Date).getTime()),s=[],l=arguments[0],c="string"==typeof l,u=[].slice.call(arguments,1),d=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)};return a.each(function(){var t,f,m,g=a.selector||"",v=e.isPlainObject(i)?e.extend(!0,{},e.fn.shape.settings,i):e.extend({},e.fn.shape.settings),p=v.namespace,h=v.selector,b=v.error,y=v.className,x="."+p,C="module-"+p,w=e(this),k=w.find(h.sides),S=w.find(h.side),T=!1,A=this,R=w.data(C);m={initialize:function(){m.verbose("Initializing module for",A),m.set.defaultSide(),m.instantiate()},instantiate:function(){m.verbose("Storing instance of module",m),R=m,w.data(C,R)},destroy:function(){m.verbose("Destroying previous module for",A),w.removeData(C).off(x)},refresh:function(){m.verbose("Refreshing selector cache for",A),w=e(A),k=e(this).find(h.shape),S=e(this).find(h.side)},repaint:function(){m.verbose("Forcing repaint event");(k[0]||n.createElement("div")).offsetWidth},animate:function(e,n){m.verbose("Animating box with properties",e),n=n||function(e){m.verbose("Executing animation callback"),void 0!==e&&e.stopPropagation(),m.reset(),m.set.active()},v.beforeChange.call(f[0]),m.get.transitionEvent()?(m.verbose("Starting CSS animation"),w.addClass(y.animating),k.css(e).one(m.get.transitionEvent(),n),m.set.duration(v.duration),d(function(){w.addClass(y.animating),t.addClass(y.hidden)})):n()},queue:function(e){m.debug("Queueing animation of",e),k.one(m.get.transitionEvent(),function(){m.debug("Executing queued animation"),setTimeout(function(){w.shape(e)},0)})},reset:function(){m.verbose("Animating states reset"),w.removeClass(y.animating).attr("style","").removeAttr("style"),k.attr("style","").removeAttr("style"),S.attr("style","").removeAttr("style").removeClass(y.hidden),f.removeClass(y.animating).attr("style","").removeAttr("style")},is:{complete:function(){return S.filter("."+y.active)[0]==f[0]},animating:function(){return w.hasClass(y.animating)}},set:{defaultSide:function(){t=w.find("."+v.className.active),f=t.next(h.side).length>0?t.next(h.side):w.find(h.side).first(),T=!1,m.verbose("Active side set to",t),m.verbose("Next side set to",f)},duration:function(e){e="number"==typeof(e=e||v.duration)?e+"ms":e,m.verbose("Setting animation duration",e),(v.duration||0===v.duration)&&k.add(S).css({"-webkit-transition-duration":e,"-moz-transition-duration":e,"-ms-transition-duration":e,"-o-transition-duration":e,"transition-duration":e})},currentStageSize:function(){var e=w.find("."+v.className.active),t=e.outerWidth(!0),n=e.outerHeight(!0);w.css({width:t,height:n})},stageSize:function(){var e=w.clone().addClass(y.loading),t=e.find("."+v.className.active),n=T?e.find(h.side).eq(T):t.next(h.side).length>0?t.next(h.side):e.find(h.side).first(),i="next"==v.width?n.outerWidth(!0):"initial"==v.width?w.width():v.width,o="next"==v.height?n.outerHeight(!0):"initial"==v.height?w.height():v.height;t.removeClass(y.active),n.addClass(y.active),e.insertAfter(w),e.remove(),"auto"!=v.width&&(w.css("width",i+v.jitter),m.verbose("Specifying width during animation",i)),"auto"!=v.height&&(w.css("height",o+v.jitter),m.verbose("Specifying height during animation",o))},nextSide:function(e){T=e,f=S.filter(e),T=S.index(f),0===f.length&&(m.set.defaultSide(),m.error(b.side)),m.verbose("Next side manually set to",f)},active:function(){m.verbose("Setting new side to active",f),S.removeClass(y.active),f.addClass(y.active),v.onChange.call(f[0]),m.set.defaultSide()}},flip:{up:function(){if(!m.is.complete()||m.is.animating()||v.allowRepeats)if(m.is.animating())m.queue("flip up");else{m.debug("Flipping up",f);var e=m.get.transform.up();m.set.stageSize(),m.stage.above(),m.animate(e)}else m.debug("Side already visible",f)},down:function(){if(!m.is.complete()||m.is.animating()||v.allowRepeats)if(m.is.animating())m.queue("flip down");else{m.debug("Flipping down",f);var e=m.get.transform.down();m.set.stageSize(),m.stage.below(),m.animate(e)}else m.debug("Side already visible",f)},left:function(){if(!m.is.complete()||m.is.animating()||v.allowRepeats)if(m.is.animating())m.queue("flip left");else{m.debug("Flipping left",f);var e=m.get.transform.left();m.set.stageSize(),m.stage.left(),m.animate(e)}else m.debug("Side already visible",f)},right:function(){if(!m.is.complete()||m.is.animating()||v.allowRepeats)if(m.is.animating())m.queue("flip right");else{m.debug("Flipping right",f);var e=m.get.transform.right();m.set.stageSize(),m.stage.right(),m.animate(e)}else m.debug("Side already visible",f)},over:function(){!m.is.complete()||m.is.animating()||v.allowRepeats?m.is.animating()?m.queue("flip over"):(m.debug("Flipping over",f),m.set.stageSize(),m.stage.behind(),m.animate(m.get.transform.over())):m.debug("Side already visible",f)},back:function(){!m.is.complete()||m.is.animating()||v.allowRepeats?m.is.animating()?m.queue("flip back"):(m.debug("Flipping back",f),m.set.stageSize(),m.stage.behind(),m.animate(m.get.transform.back())):m.debug("Side already visible",f)}},get:{transform:{up:function(){return{transform:"translateY("+-(t.outerHeight(!0)-f.outerHeight(!0))/2+"px) translateZ("+-t.outerHeight(!0)/2+"px) rotateX(-90deg)"}},down:function(){return{transform:"translateY("+-(t.outerHeight(!0)-f.outerHeight(!0))/2+"px) translateZ("+-t.outerHeight(!0)/2+"px) rotateX(90deg)"}},left:function(){return{transform:"translateX("+-(t.outerWidth(!0)-f.outerWidth(!0))/2+"px) translateZ("+-t.outerWidth(!0)/2+"px) rotateY(90deg)"}},right:function(){return{transform:"translateX("+-(t.outerWidth(!0)-f.outerWidth(!0))/2+"px) translateZ("+-t.outerWidth(!0)/2+"px) rotateY(-90deg)"}},over:function(){return{transform:"translateX("+-(t.outerWidth(!0)-f.outerWidth(!0))/2+"px) rotateY(180deg)"}},back:function(){return{transform:"translateX("+-(t.outerWidth(!0)-f.outerWidth(!0))/2+"px) rotateY(-180deg)"}}},transitionEvent:function(){var e,t=n.createElement("element"),i={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in i)if(void 0!==t.style[e])return i[e]},nextSide:function(){return t.next(h.side).length>0?t.next(h.side):w.find(h.side).first()}},stage:{above:function(){var e={origin:(t.outerHeight(!0)-f.outerHeight(!0))/2,depth:{active:f.outerHeight(!0)/2,next:t.outerHeight(!0)/2}};m.verbose("Setting the initial animation position as above",f,e),k.css({transform:"translateZ(-"+e.depth.active+"px)"}),t.css({transform:"rotateY(0deg) translateZ("+e.depth.active+"px)"}),f.addClass(y.animating).css({top:e.origin+"px",transform:"rotateX(90deg) translateZ("+e.depth.next+"px)"})},below:function(){var e={origin:(t.outerHeight(!0)-f.outerHeight(!0))/2,depth:{active:f.outerHeight(!0)/2,next:t.outerHeight(!0)/2}};m.verbose("Setting the initial animation position as below",f,e),k.css({transform:"translateZ(-"+e.depth.active+"px)"}),t.css({transform:"rotateY(0deg) translateZ("+e.depth.active+"px)"}),f.addClass(y.animating).css({top:e.origin+"px",transform:"rotateX(-90deg) translateZ("+e.depth.next+"px)"})},left:function(){var e=t.outerWidth(!0),n=f.outerWidth(!0),i={origin:(e-n)/2,depth:{active:n/2,next:e/2}};m.verbose("Setting the initial animation position as left",f,i),k.css({transform:"translateZ(-"+i.depth.active+"px)"}),t.css({transform:"rotateY(0deg) translateZ("+i.depth.active+"px)"}),f.addClass(y.animating).css({left:i.origin+"px",transform:"rotateY(-90deg) translateZ("+i.depth.next+"px)"})},right:function(){var e=t.outerWidth(!0),n=f.outerWidth(!0),i={origin:(e-n)/2,depth:{active:n/2,next:e/2}};m.verbose("Setting the initial animation position as left",f,i),k.css({transform:"translateZ(-"+i.depth.active+"px)"}),t.css({transform:"rotateY(0deg) translateZ("+i.depth.active+"px)"}),f.addClass(y.animating).css({left:i.origin+"px",transform:"rotateY(90deg) translateZ("+i.depth.next+"px)"})},behind:function(){var e=t.outerWidth(!0),n=f.outerWidth(!0),i={origin:(e-n)/2,depth:{active:n/2,next:e/2}};m.verbose("Setting the initial animation position as behind",f,i),t.css({transform:"rotateY(0deg)"}),f.addClass(y.animating).css({left:i.origin+"px",transform:"rotateY(-180deg)"})}},setting:function(t,n){if(m.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,v,t);else{if(void 0===n)return v[t];e.isPlainObject(v[t])?e.extend(!0,v[t],n):v[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,m,t);else{if(void 0===n)return m[t];m[t]=n}},debug:function(){!v.silent&&v.debug&&(v.performance?m.performance.log(arguments):(m.debug=Function.prototype.bind.call(console.info,console,v.name+":"),m.debug.apply(console,arguments)))},verbose:function(){!v.silent&&v.verbose&&v.debug&&(v.performance?m.performance.log(arguments):(m.verbose=Function.prototype.bind.call(console.info,console,v.name+":"),m.verbose.apply(console,arguments)))},error:function(){v.silent||(m.error=Function.prototype.bind.call(console.error,console,v.name+":"),m.error.apply(console,arguments))},performance:{log:function(e){var t,n;v.performance&&(n=(t=(new Date).getTime())-(r||t),r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:A,"Execution Time":n})),clearTimeout(m.performance.timer),m.performance.timer=setTimeout(m.performance.display,500)},display:function(){var t=v.name+":",n=0;r=!1,clearTimeout(m.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",g&&(t+=" '"+g+"'"),a.length>1&&(t+=" ("+a.length+")"),(void 0!==console.group||void 0!==console.table)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,n,i){var a,r,s,l=R;return n=n||u,i=A||i,"string"==typeof t&&void 0!==l&&(t=t.split(/[\. ]/),a=t.length-1,e.each(t,function(n,i){var o=n!=a?i+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[o])&&n!=a)l=l[o];else{if(void 0!==l[o])return r=l[o],!1;if(!e.isPlainObject(l[i])||n==a)return void 0!==l[i]&&(r=l[i],!1);l=l[i]}})),e.isFunction(r)?s=r.apply(i,n):void 0!==r&&(s=r),e.isArray(o)?o.push(s):void 0!==o?o=[o,s]:void 0!==s&&(o=s),r}},c?(void 0===R&&m.initialize(),m.invoke(l)):(void 0!==R&&R.invoke("destroy"),m.initialize())}),void 0!==o?o:this},e.fn.shape.settings={name:"Shape",silent:!1,debug:!1,verbose:!1,jitter:0,performance:!0,namespace:"shape",width:"initial",height:"initial",beforeChange:function(){},onChange:function(){},allowRepeats:!1,duration:!1,error:{side:"You tried to switch to a side that does not exist.",method:"The method you called is not defined"},className:{animating:"animating",hidden:"hidden",loading:"loading",active:"active"},selector:{sides:".sides",side:".side"}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.sidebar=function(i){var o,a=e(this),r=e(t),s=e(n),l=e("html"),c=e("head"),u=a.selector||"",d=(new Date).getTime(),f=[],m=arguments[0],g="string"==typeof m,v=[].slice.call(arguments,1),p=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)};return a.each(function(){var a,h,b,y,x,C,w=e.isPlainObject(i)?e.extend(!0,{},e.fn.sidebar.settings,i):e.extend({},e.fn.sidebar.settings),k=w.selector,S=w.className,T=w.namespace,A=w.regExp,R=w.error,P="."+T,E="module-"+T,F=e(this),O=e(w.context),D=F.children(k.sidebar),q=O.children(k.fixed),j=O.children(k.pusher),z=this,I=F.data(E);C={initialize:function(){C.debug("Initializing sidebar",i),C.create.id(),x=C.get.transitionEvent(),w.delaySetup?p(C.setup.layout):C.setup.layout(),p(function(){C.setup.cache()}),C.instantiate()},instantiate:function(){C.verbose("Storing instance of module",C),I=C,F.data(E,C)},create:{id:function(){b=(Math.random().toString(16)+"000000000").substr(2,8),h="."+b,C.verbose("Creating unique id for element",b)}},destroy:function(){C.verbose("Destroying previous module for",F),F.off(P).removeData(E),C.is.ios()&&C.remove.ios(),O.off(h),r.off(h),s.off(h)},event:{clickaway:function(e){var t=j.find(e.target).length>0||j.is(e.target),n=O.is(e.target);t&&(C.verbose("User clicked on dimmed page"),C.hide()),n&&(C.verbose("User clicked on dimmable context (scaled out page)"),C.hide())},touch:function(e){},containScroll:function(e){z.scrollTop<=0&&(z.scrollTop=1),z.scrollTop+z.offsetHeight>=z.scrollHeight&&(z.scrollTop=z.scrollHeight-z.offsetHeight-1)},scroll:function(t){0===e(t.target).closest(k.sidebar).length&&t.preventDefault()}},bind:{clickaway:function(){C.verbose("Adding clickaway events to context",O),w.closable&&O.on("click"+h,C.event.clickaway).on("touchend"+h,C.event.clickaway)},scrollLock:function(){w.scrollLock&&(C.debug("Disabling page scroll"),r.on("DOMMouseScroll"+h,C.event.scroll)),C.verbose("Adding events to contain sidebar scroll"),s.on("touchmove"+h,C.event.touch),F.on("scroll"+P,C.event.containScroll)}},unbind:{clickaway:function(){C.verbose("Removing clickaway events from context",O),O.off(h)},scrollLock:function(){C.verbose("Removing scroll lock from page"),s.off(h),r.off(h),F.off("scroll"+P)}},add:{inlineCSS:function(){var t,n=C.cache.width||F.outerWidth(),i=C.cache.height||F.outerHeight(),o=C.is.rtl(),r=C.get.direction(),s={left:n,right:-n,top:i,bottom:-i};o&&(C.verbose("RTL detected, flipping widths"),s.left=-n,s.right=n),t="<style>","left"===r||"right"===r?(C.debug("Adding CSS rules for animation distance",n),t+=" .ui.visible."+r+".sidebar ~ .fixed, .ui.visible."+r+".sidebar ~ .pusher {   -webkit-transform: translate3d("+s[r]+"px, 0, 0);           transform: translate3d("+s[r]+"px, 0, 0); }"):"top"!==r&&"bottom"!=r||(t+=" .ui.visible."+r+".sidebar ~ .fixed, .ui.visible."+r+".sidebar ~ .pusher {   -webkit-transform: translate3d(0, "+s[r]+"px, 0);           transform: translate3d(0, "+s[r]+"px, 0); }"),C.is.ie()&&("left"===r||"right"===r?(C.debug("Adding CSS rules for animation distance",n),t+=" body.pushable > .ui.visible."+r+".sidebar ~ .pusher:after {   -webkit-transform: translate3d("+s[r]+"px, 0, 0);           transform: translate3d("+s[r]+"px, 0, 0); }"):"top"!==r&&"bottom"!=r||(t+=" body.pushable > .ui.visible."+r+".sidebar ~ .pusher:after {   -webkit-transform: translate3d(0, "+s[r]+"px, 0);           transform: translate3d(0, "+s[r]+"px, 0); }"),t+=" body.pushable > .ui.visible.left.sidebar ~ .ui.visible.right.sidebar ~ .pusher:after, body.pushable > .ui.visible.right.sidebar ~ .ui.visible.left.sidebar ~ .pusher:after {   -webkit-transform: translate3d(0px, 0, 0);           transform: translate3d(0px, 0, 0); }"),a=e(t+="</style>").appendTo(c),C.debug("Adding sizing css to head",a)}},refresh:function(){C.verbose("Refreshing selector cache"),O=e(w.context),D=O.children(k.sidebar),j=O.children(k.pusher),q=O.children(k.fixed),C.clear.cache()},refreshSidebars:function(){C.verbose("Refreshing other sidebars"),D=O.children(k.sidebar)},repaint:function(){C.verbose("Forcing repaint event"),z.style.display="none";z.offsetHeight;z.scrollTop=z.scrollTop,z.style.display=""},setup:{cache:function(){C.cache={width:F.outerWidth(),height:F.outerHeight(),rtl:"rtl"==F.css("direction")}},layout:function(){0===O.children(k.pusher).length&&(C.debug("Adding wrapper element for sidebar"),C.error(R.pusher),j=e('<div class="pusher" />'),O.children().not(k.omitted).not(D).wrapAll(j),C.refresh()),0!==F.nextAll(k.pusher).length&&F.nextAll(k.pusher)[0]===j[0]||(C.debug("Moved sidebar to correct parent element"),C.error(R.movedSidebar,z),F.detach().prependTo(O),C.refresh()),C.clear.cache(),C.set.pushable(),C.set.direction()}},attachEvents:function(t,n){var i=e(t);n=e.isFunction(C[n])?C[n]:C.toggle,i.length>0?(C.debug("Attaching sidebar events to element",t,n),i.on("click"+P,n)):C.error(R.notFound,t)},show:function(t){if(t=e.isFunction(t)?t:function(){},C.is.hidden()){if(C.refreshSidebars(),w.overlay&&(C.error(R.overlay),w.transition="overlay"),C.refresh(),C.othersActive())if(C.debug("Other sidebars currently visible"),w.exclusive){if("overlay"!=w.transition)return void C.hideOthers(C.show);C.hideOthers()}else w.transition="overlay";C.pushPage(function(){t.call(z),w.onShow.call(z)}),w.onChange.call(z),w.onVisible.call(z)}else C.debug("Sidebar is already visible")},hide:function(t){t=e.isFunction(t)?t:function(){},(C.is.visible()||C.is.animating())&&(C.debug("Hiding sidebar",t),C.refreshSidebars(),C.pullPage(function(){t.call(z),w.onHidden.call(z)}),w.onChange.call(z),w.onHide.call(z))},othersAnimating:function(){return D.not(F).filter("."+S.animating).length>0},othersVisible:function(){return D.not(F).filter("."+S.visible).length>0},othersActive:function(){return C.othersVisible()||C.othersAnimating()},hideOthers:function(e){var t=D.not(F).filter("."+S.visible),n=t.length,i=0;e=e||function(){},t.sidebar("hide",function(){++i==n&&e()})},toggle:function(){C.verbose("Determining toggled direction"),C.is.hidden()?C.show():C.hide()},pushPage:function(t){var n,i,o,a=C.get.transition(),r="overlay"===a||C.othersActive()?F:j;t=e.isFunction(t)?t:function(){},"scale down"==w.transition&&C.scrollToTop(),C.set.transition(a),C.repaint(),n=function(){C.bind.clickaway(),C.add.inlineCSS(),C.set.animating(),C.set.visible()},i=function(){C.set.dimmed()},o=function(e){e.target==r[0]&&(r.off(x+h,o),C.remove.animating(),C.bind.scrollLock(),t.call(z))},r.off(x+h),r.on(x+h,o),p(n),w.dimPage&&!C.othersVisible()&&p(i)},pullPage:function(t){var n,i,o=C.get.transition(),a="overlay"==o||C.othersActive()?F:j;t=e.isFunction(t)?t:function(){},C.verbose("Removing context push state",C.get.direction()),C.unbind.clickaway(),C.unbind.scrollLock(),n=function(){C.set.transition(o),C.set.animating(),C.remove.visible(),w.dimPage&&!C.othersVisible()&&j.removeClass(S.dimmed)},i=function(e){e.target==a[0]&&(a.off(x+h,i),C.remove.animating(),C.remove.transition(),C.remove.inlineCSS(),("scale down"==o||w.returnScroll&&C.is.mobile())&&C.scrollBack(),t.call(z))},a.off(x+h),a.on(x+h,i),p(n)},scrollToTop:function(){C.verbose("Scrolling to top of page to avoid animation issues"),y=e(t).scrollTop(),F.scrollTop(0),t.scrollTo(0,0)},scrollBack:function(){C.verbose("Scrolling back to original page position"),t.scrollTo(0,y)},clear:{cache:function(){C.verbose("Clearing cached dimensions"),C.cache={}}},set:{ios:function(){l.addClass(S.ios)},pushed:function(){O.addClass(S.pushed)},pushable:function(){O.addClass(S.pushable)},dimmed:function(){j.addClass(S.dimmed)},active:function(){F.addClass(S.active)},animating:function(){F.addClass(S.animating)},transition:function(e){e=e||C.get.transition(),F.addClass(e)},direction:function(e){e=e||C.get.direction(),F.addClass(S[e])},visible:function(){F.addClass(S.visible)},overlay:function(){F.addClass(S.overlay)}},remove:{inlineCSS:function(){C.debug("Removing inline css styles",a),a&&a.length>0&&a.remove()},ios:function(){l.removeClass(S.ios)},pushed:function(){O.removeClass(S.pushed)},pushable:function(){O.removeClass(S.pushable)},active:function(){F.removeClass(S.active)},animating:function(){F.removeClass(S.animating)},transition:function(e){e=e||C.get.transition(),F.removeClass(e)},direction:function(e){e=e||C.get.direction(),F.removeClass(S[e])},visible:function(){F.removeClass(S.visible)},overlay:function(){F.removeClass(S.overlay)}},get:{direction:function(){return F.hasClass(S.top)?S.top:F.hasClass(S.right)?S.right:F.hasClass(S.bottom)?S.bottom:S.left},transition:function(){var e,t=C.get.direction();return e=C.is.mobile()?"auto"==w.mobileTransition?w.defaultTransition.mobile[t]:w.mobileTransition:"auto"==w.transition?w.defaultTransition.computer[t]:w.transition,C.verbose("Determined transition",e),e},transitionEvent:function(){var e,t=n.createElement("element"),i={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in i)if(void 0!==t.style[e])return i[e]}},is:{ie:function(){return!t.ActiveXObject&&"ActiveXObject"in t||"ActiveXObject"in t},ios:function(){var e=navigator.userAgent,t=e.match(A.ios),n=e.match(A.mobileChrome);return!(!t||n)&&(C.verbose("Browser was found to be iOS",e),!0)},mobile:function(){var e=navigator.userAgent;return e.match(A.mobile)?(C.verbose("Browser was found to be mobile",e),!0):(C.verbose("Browser is not mobile, using regular transition",e),!1)},hidden:function(){return!C.is.visible()},visible:function(){return F.hasClass(S.visible)},open:function(){return C.is.visible()},closed:function(){return C.is.hidden()},vertical:function(){return F.hasClass(S.top)},animating:function(){return O.hasClass(S.animating)},rtl:function(){return void 0===C.cache.rtl&&(C.cache.rtl="rtl"==F.css("direction")),C.cache.rtl}},setting:function(t,n){if(C.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,w,t);else{if(void 0===n)return w[t];e.isPlainObject(w[t])?e.extend(!0,w[t],n):w[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,C,t);else{if(void 0===n)return C[t];C[t]=n}},debug:function(){!w.silent&&w.debug&&(w.performance?C.performance.log(arguments):(C.debug=Function.prototype.bind.call(console.info,console,w.name+":"),C.debug.apply(console,arguments)))},verbose:function(){!w.silent&&w.verbose&&w.debug&&(w.performance?C.performance.log(arguments):(C.verbose=Function.prototype.bind.call(console.info,console,w.name+":"),C.verbose.apply(console,arguments)))},error:function(){w.silent||(C.error=Function.prototype.bind.call(console.error,console,w.name+":"),C.error.apply(console,arguments))},performance:{log:function(e){var t,n;w.performance&&(n=(t=(new Date).getTime())-(d||t),d=t,f.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:z,"Execution Time":n})),clearTimeout(C.performance.timer),C.performance.timer=setTimeout(C.performance.display,500)},display:function(){var t=w.name+":",n=0;d=!1,clearTimeout(C.performance.timer),e.each(f,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",u&&(t+=" '"+u+"'"),(void 0!==console.group||void 0!==console.table)&&f.length>0&&(console.groupCollapsed(t),console.table?console.table(f):e.each(f,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),f=[]}},invoke:function(t,n,i){var a,r,s,l=I;return n=n||v,i=z||i,"string"==typeof t&&void 0!==l&&(t=t.split(/[\. ]/),a=t.length-1,e.each(t,function(n,i){var o=n!=a?i+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[o])&&n!=a)l=l[o];else{if(void 0!==l[o])return r=l[o],!1;if(!e.isPlainObject(l[i])||n==a)return void 0!==l[i]?(r=l[i],!1):(C.error(R.method,t),!1);l=l[i]}})),e.isFunction(r)?s=r.apply(i,n):void 0!==r&&(s=r),e.isArray(o)?o.push(s):void 0!==o?o=[o,s]:void 0!==s&&(o=s),r}},g?(void 0===I&&C.initialize(),C.invoke(m)):(void 0!==I&&C.invoke("destroy"),C.initialize())}),void 0!==o?o:this},e.fn.sidebar.settings={name:"Sidebar",namespace:"sidebar",silent:!1,debug:!1,verbose:!1,performance:!0,transition:"auto",mobileTransition:"auto",defaultTransition:{computer:{left:"uncover",right:"uncover",top:"overlay",bottom:"overlay"},mobile:{left:"uncover",right:"uncover",top:"overlay",bottom:"overlay"}},context:"body",exclusive:!1,closable:!0,dimPage:!0,scrollLock:!1,returnScroll:!1,delaySetup:!1,duration:500,onChange:function(){},onShow:function(){},onHide:function(){},onHidden:function(){},onVisible:function(){},className:{active:"active",animating:"animating",dimmed:"dimmed",ios:"ios",pushable:"pushable",pushed:"pushed",right:"right",top:"top",left:"left",bottom:"bottom",visible:"visible"},selector:{fixed:".fixed",omitted:"script, link, style, .ui.modal, .ui.dimmer, .ui.nag, .ui.fixed",pusher:".pusher",sidebar:".ui.sidebar"},regExp:{ios:/(iPad|iPhone|iPod)/g,mobileChrome:/(CriOS)/g,mobile:/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/g},error:{method:"The method you called is not defined.",pusher:"Had to add pusher element. For optimal performance make sure body content is inside a pusher element",movedSidebar:"Had to move sidebar. For optimal performance make sure sidebar and pusher are direct children of your body tag",overlay:"The overlay setting is no longer supported, use animation: overlay",notFound:"There were no elements that matched the specified selector"}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.sticky=function(i){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),l=[],c=arguments[0],u="string"==typeof c,d=[].slice.call(arguments,1);return a.each(function(){var a,f,m,g,v,p=e.isPlainObject(i)?e.extend(!0,{},e.fn.sticky.settings,i):e.extend({},e.fn.sticky.settings),h=p.className,b=p.namespace,y=p.error,x="."+b,C="module-"+b,w=e(this),k=e(t),S=e(p.scrollContext),T=(w.selector,w.data(C)),A=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)},R=this;v={initialize:function(){v.determineContainer(),v.determineContext(),v.verbose("Initializing sticky",p,a),v.save.positions(),v.checkErrors(),v.bind.events(),p.observeChanges&&v.observeChanges(),v.instantiate()},instantiate:function(){v.verbose("Storing instance of module",v),T=v,w.data(C,v)},destroy:function(){v.verbose("Destroying previous instance"),v.reset(),m&&m.disconnect(),g&&g.disconnect(),k.off("load"+x,v.event.load).off("resize"+x,v.event.resize),S.off("scrollchange"+x,v.event.scrollchange),w.removeData(C)},observeChanges:function(){"MutationObserver"in t&&(m=new MutationObserver(v.event.documentChanged),g=new MutationObserver(v.event.changed),m.observe(n,{childList:!0,subtree:!0}),g.observe(R,{childList:!0,subtree:!0}),g.observe(f[0],{childList:!0,subtree:!0}),v.debug("Setting up mutation observer",g))},determineContainer:function(){a=p.container?e(p.container):w.offsetParent()},determineContext:function(){0!==(f=p.context?e(p.context):a).length||v.error(y.invalidContext,p.context,w)},checkErrors:function(){if(v.is.hidden()&&v.error(y.visible,w),v.cache.element.height>v.cache.context.height)return v.reset(),void v.error(y.elementSize,w)},bind:{events:function(){k.on("load"+x,v.event.load).on("resize"+x,v.event.resize),S.off("scroll"+x).on("scroll"+x,v.event.scroll).on("scrollchange"+x,v.event.scrollchange)}},event:{changed:function(e){clearTimeout(v.timer),v.timer=setTimeout(function(){v.verbose("DOM tree modified, updating sticky menu",e),v.refresh()},100)},documentChanged:function(t){[].forEach.call(t,function(t){t.removedNodes&&[].forEach.call(t.removedNodes,function(t){(t==R||e(t).find(R).length>0)&&(v.debug("Element removed from DOM, tearing down events"),v.destroy())})})},load:function(){v.verbose("Page contents finished loading"),A(v.refresh)},resize:function(){v.verbose("Window resized"),A(v.refresh)},scroll:function(){A(function(){S.triggerHandler("scrollchange"+x,S.scrollTop())})},scrollchange:function(e,t){v.stick(t),p.onScroll.call(R)}},refresh:function(e){v.reset(),p.context||v.determineContext(),e&&v.determineContainer(),v.save.positions(),v.stick(),p.onReposition.call(R)},supports:{sticky:function(){var t=e("<div/>");t[0];return t.addClass(h.supported),t.css("position").match("sticky")}},save:{lastScroll:function(e){v.lastScroll=e},elementScroll:function(e){v.elementScroll=e},positions:function(){var e={height:S.height()},t={margin:{top:parseInt(w.css("margin-top"),10),bottom:parseInt(w.css("margin-bottom"),10)},offset:w.offset(),width:w.outerWidth(),height:w.outerHeight()},n={offset:f.offset(),height:f.outerHeight()};a.outerHeight();v.is.standardScroll()||(v.debug("Non-standard scroll. Removing scroll offset from element offset"),e.top=S.scrollTop(),e.left=S.scrollLeft(),t.offset.top+=e.top,n.offset.top+=e.top,t.offset.left+=e.left,n.offset.left+=e.left),v.cache={fits:t.height+p.offset<=e.height,sameHeight:t.height==n.height,scrollContext:{height:e.height},element:{margin:t.margin,top:t.offset.top-t.margin.top,left:t.offset.left,width:t.width,height:t.height,bottom:t.offset.top+t.height},context:{top:n.offset.top,height:n.height,bottom:n.offset.top+n.height}},v.set.containerSize(),v.stick(),v.debug("Caching element positions",v.cache)}},get:{direction:function(e){var t="down";return e=e||S.scrollTop(),void 0!==v.lastScroll&&(v.lastScroll<e?t="down":v.lastScroll>e&&(t="up")),t},scrollChange:function(e){return e=e||S.scrollTop(),v.lastScroll?e-v.lastScroll:0},currentElementScroll:function(){return v.elementScroll?v.elementScroll:v.is.top()?Math.abs(parseInt(w.css("top"),10))||0:Math.abs(parseInt(w.css("bottom"),10))||0},elementScroll:function(e){e=e||S.scrollTop();var t=v.cache.element,n=v.cache.scrollContext,i=v.get.scrollChange(e),o=t.height-n.height+p.offset,a=v.get.currentElementScroll(),r=a+i;return a=v.cache.fits||r<0?0:r>o?o:r}},remove:{lastScroll:function(){delete v.lastScroll},elementScroll:function(e){delete v.elementScroll},minimumSize:function(){a.css("min-height","")},offset:function(){w.css("margin-top","")}},set:{offset:function(){v.verbose("Setting offset on element",p.offset),w.css("margin-top",p.offset)},containerSize:function(){var e=a.get(0).tagName;"HTML"===e||"body"==e?v.determineContainer():Math.abs(a.outerHeight()-v.cache.context.height)>p.jitter&&(v.debug("Context has padding, specifying exact height for container",v.cache.context.height),a.css({height:v.cache.context.height}))},minimumSize:function(){var e=v.cache.element;a.css("min-height",e.height)},scroll:function(e){v.debug("Setting scroll on element",e),v.elementScroll!=e&&(v.is.top()&&w.css("bottom","").css("top",-e),v.is.bottom()&&w.css("top","").css("bottom",e))},size:function(){0!==v.cache.element.height&&0!==v.cache.element.width&&(R.style.setProperty("width",v.cache.element.width+"px","important"),R.style.setProperty("height",v.cache.element.height+"px","important"))}},is:{standardScroll:function(){return S[0]==t},top:function(){return w.hasClass(h.top)},bottom:function(){return w.hasClass(h.bottom)},initialPosition:function(){return!v.is.fixed()&&!v.is.bound()},hidden:function(){return!w.is(":visible")},bound:function(){return w.hasClass(h.bound)},fixed:function(){return w.hasClass(h.fixed)}},stick:function(e){var t=e||S.scrollTop(),n=v.cache,i=n.fits,o=n.sameHeight,a=n.element,r=n.scrollContext,s=n.context,l=v.is.bottom()&&p.pushing?p.bottomOffset:p.offset,e={top:t+l,bottom:t+l+r.height},c=(v.get.direction(e.top),i?0:v.get.elementScroll(e.top)),u=!i;0!==a.height&&!o&&(v.is.initialPosition()?e.top>=s.bottom?(v.debug("Initial element position is bottom of container"),v.bindBottom()):e.top>a.top&&(a.height+e.top-c>=s.bottom?(v.debug("Initial element position is bottom of container"),v.bindBottom()):(v.debug("Initial element position is fixed"),v.fixTop())):v.is.fixed()?v.is.top()?e.top<=a.top?(v.debug("Fixed element reached top of container"),v.setInitialPosition()):a.height+e.top-c>=s.bottom?(v.debug("Fixed element reached bottom of container"),v.bindBottom()):u&&(v.set.scroll(c),v.save.lastScroll(e.top),v.save.elementScroll(c)):v.is.bottom()&&(e.bottom-a.height<=a.top?(v.debug("Bottom fixed rail has reached top of container"),v.setInitialPosition()):e.bottom>=s.bottom?(v.debug("Bottom fixed rail has reached bottom of container"),v.bindBottom()):u&&(v.set.scroll(c),v.save.lastScroll(e.top),v.save.elementScroll(c))):v.is.bottom()&&(e.top<=a.top?(v.debug("Jumped from bottom fixed to top fixed, most likely used home/end button"),v.setInitialPosition()):p.pushing?v.is.bound()&&e.bottom<=s.bottom&&(v.debug("Fixing bottom attached element to bottom of browser."),v.fixBottom()):v.is.bound()&&e.top<=s.bottom-a.height&&(v.debug("Fixing bottom attached element to top of browser."),v.fixTop())))},bindTop:function(){v.debug("Binding element to top of parent container"),v.remove.offset(),w.css({left:"",top:"",marginBottom:""}).removeClass(h.fixed).removeClass(h.bottom).addClass(h.bound).addClass(h.top),p.onTop.call(R),p.onUnstick.call(R)},bindBottom:function(){v.debug("Binding element to bottom of parent container"),v.remove.offset(),w.css({left:"",top:""}).removeClass(h.fixed).removeClass(h.top).addClass(h.bound).addClass(h.bottom),p.onBottom.call(R),p.onUnstick.call(R)},setInitialPosition:function(){v.debug("Returning to initial position"),v.unfix(),v.unbind()},fixTop:function(){v.debug("Fixing element to top of page"),p.setSize&&v.set.size(),v.set.minimumSize(),v.set.offset(),w.css({left:v.cache.element.left,bottom:"",marginBottom:""}).removeClass(h.bound).removeClass(h.bottom).addClass(h.fixed).addClass(h.top),p.onStick.call(R)},fixBottom:function(){v.debug("Sticking element to bottom of page"),p.setSize&&v.set.size(),v.set.minimumSize(),v.set.offset(),w.css({left:v.cache.element.left,bottom:"",marginBottom:""}).removeClass(h.bound).removeClass(h.top).addClass(h.fixed).addClass(h.bottom),p.onStick.call(R)},unbind:function(){v.is.bound()&&(v.debug("Removing container bound position on element"),v.remove.offset(),w.removeClass(h.bound).removeClass(h.top).removeClass(h.bottom))},unfix:function(){v.is.fixed()&&(v.debug("Removing fixed position on element"),v.remove.minimumSize(),v.remove.offset(),w.removeClass(h.fixed).removeClass(h.top).removeClass(h.bottom),p.onUnstick.call(R))},reset:function(){v.debug("Resetting elements position"),v.unbind(),v.unfix(),v.resetCSS(),v.remove.offset(),v.remove.lastScroll()},resetCSS:function(){w.css({width:"",height:""}),a.css({height:""})},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,p,t);else{if(void 0===n)return p[t];p[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,v,t);else{if(void 0===n)return v[t];v[t]=n}},debug:function(){!p.silent&&p.debug&&(p.performance?v.performance.log(arguments):(v.debug=Function.prototype.bind.call(console.info,console,p.name+":"),v.debug.apply(console,arguments)))},verbose:function(){!p.silent&&p.verbose&&p.debug&&(p.performance?v.performance.log(arguments):(v.verbose=Function.prototype.bind.call(console.info,console,p.name+":"),v.verbose.apply(console,arguments)))},error:function(){p.silent||(v.error=Function.prototype.bind.call(console.error,console,p.name+":"),v.error.apply(console,arguments))},performance:{log:function(e){var t,n;p.performance&&(n=(t=(new Date).getTime())-(s||t),s=t,l.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:R,"Execution Time":n})),clearTimeout(v.performance.timer),v.performance.timer=setTimeout(v.performance.display,0)},display:function(){var t=p.name+":",n=0;s=!1,clearTimeout(v.performance.timer),e.each(l,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(void 0!==console.group||void 0!==console.table)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,n,i){var a,r,s,l=T;return n=n||d,i=R||i,"string"==typeof t&&void 0!==l&&(t=t.split(/[\. ]/),a=t.length-1,e.each(t,function(n,i){var o=n!=a?i+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[o])&&n!=a)l=l[o];else{if(void 0!==l[o])return r=l[o],!1;if(!e.isPlainObject(l[i])||n==a)return void 0!==l[i]&&(r=l[i],!1);l=l[i]}})),e.isFunction(r)?s=r.apply(i,n):void 0!==r&&(s=r),e.isArray(o)?o.push(s):void 0!==o?o=[o,s]:void 0!==s&&(o=s),r}},u?(void 0===T&&v.initialize(),v.invoke(c)):(void 0!==T&&T.invoke("destroy"),v.initialize())}),void 0!==o?o:this},e.fn.sticky.settings={name:"Sticky",namespace:"sticky",silent:!1,debug:!1,verbose:!0,performance:!0,pushing:!1,context:!1,container:!1,scrollContext:t,offset:0,bottomOffset:0,jitter:5,setSize:!0,observeChanges:!1,onReposition:function(){},onScroll:function(){},onStick:function(){},onUnstick:function(){},onTop:function(){},onBottom:function(){},error:{container:"Sticky element must be inside a relative container",visible:"Element is hidden, you must call refresh after element becomes visible. Use silent setting to surpress this warning in production.",method:"The method you called is not defined.",invalidContext:"Context specified does not exist",elementSize:"Sticky element is larger than its container, cannot create sticky."},className:{bound:"bound",fixed:"fixed",supported:"native",top:"top",bottom:"bottom"}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.tab=function(i){var o,a=e(e.isFunction(this)?t:this),r=a.selector||"",s=(new Date).getTime(),l=[],c=arguments[0],u="string"==typeof c,d=[].slice.call(arguments,1),f=!1;return a.each(function(){var m,g,v,p,h,b,y=e.isPlainObject(i)?e.extend(!0,{},e.fn.tab.settings,i):e.extend({},e.fn.tab.settings),x=y.className,C=y.metadata,w=y.selector,k=y.error,S="."+y.namespace,T="module-"+y.namespace,A=e(this),R={},P=!0,E=0,F=this,O=A.data(T);h={initialize:function(){h.debug("Initializing tab menu item",A),h.fix.callbacks(),h.determineTabs(),h.debug("Determining tabs",y.context,g),y.auto&&h.set.auto(),h.bind.events(),y.history&&!f&&(h.initializeHistory(),f=!0),h.instantiate()},instantiate:function(){h.verbose("Storing instance of module",h),O=h,A.data(T,h)},destroy:function(){h.debug("Destroying tabs",A),A.removeData(T).off(S)},bind:{events:function(){e.isWindow(F)||(h.debug("Attaching tab activation events to element",A),A.on("click"+S,h.event.click))}},determineTabs:function(){var t;"parent"===y.context?(A.closest(w.ui).length>0?(t=A.closest(w.ui),h.verbose("Using closest UI element as parent",t)):t=A,m=t.parent(),h.verbose("Determined parent element for creating context",m)):y.context?(m=e(y.context),h.verbose("Using selector for tab context",y.context,m)):m=e("body"),y.childrenOnly?(g=m.children(w.tabs),h.debug("Searching tab context children for tabs",m,g)):(g=m.find(w.tabs),h.debug("Searching tab context for tabs",m,g))},fix:{callbacks:function(){e.isPlainObject(i)&&(i.onTabLoad||i.onTabInit)&&(i.onTabLoad&&(i.onLoad=i.onTabLoad,delete i.onTabLoad,h.error(k.legacyLoad,i.onLoad)),i.onTabInit&&(i.onFirstLoad=i.onTabInit,delete i.onTabInit,h.error(k.legacyInit,i.onFirstLoad)),y=e.extend(!0,{},e.fn.tab.settings,i))}},initializeHistory:function(){if(h.debug("Initializing page state"),void 0===e.address)return h.error(k.state),!1;if("state"==y.historyType){if(h.debug("Using HTML5 to manage state"),!1===y.path)return h.error(k.path),!1;e.address.history(!0).state(y.path)}e.address.bind("change",h.event.history.change)},event:{click:function(t){var n=e(this).data(C.tab);void 0!==n?(y.history?(h.verbose("Updating page state",t),e.address.value(n)):(h.verbose("Changing tab",t),h.changeTab(n)),t.preventDefault()):h.debug("No tab specified")},history:{change:function(t){var n=t.pathNames.join("/")||h.get.initialPath(),i=y.templates.determineTitle(n)||!1;h.performance.display(),h.debug("History change event",n,t),b=t,void 0!==n&&h.changeTab(n),i&&e.address.title(i)}}},refresh:function(){v&&(h.debug("Refreshing tab",v),h.changeTab(v))},cache:{read:function(e){return void 0!==e&&R[e]},add:function(e,t){e=e||v,h.debug("Adding cached content for",e),R[e]=t},remove:function(e){e=e||v,h.debug("Removing cached content for",e),delete R[e]}},set:{auto:function(){var t="string"==typeof y.path?y.path.replace(/\/$/,"")+"/{$tab}":"/{$tab}";h.verbose("Setting up automatic tab retrieval from server",t),e.isPlainObject(y.apiSettings)?y.apiSettings.url=t:y.apiSettings={url:t}},loading:function(e){var t=h.get.tabElement(e);t.hasClass(x.loading)||(h.verbose("Setting loading state for",t),t.addClass(x.loading).siblings(g).removeClass(x.active+" "+x.loading),t.length>0&&y.onRequest.call(t[0],e))},state:function(t){e.address.value(t)}},changeTab:function(n){var i=t.history&&t.history.pushState&&y.ignoreFirstLoad&&P,o=y.auto||e.isPlainObject(y.apiSettings),a=o&&!i?h.utilities.pathToArray(n):h.get.defaultPathArray(n);n=h.utilities.arrayToPath(a),e.each(a,function(t,r){var s,l,c,u,d=a.slice(0,t+1),f=h.utilities.arrayToPath(d),g=h.is.tab(f),w=t+1==a.length,S=h.get.tabElement(f);if(h.verbose("Looking for tab",r),g){if(h.verbose("Tab was found",r),v=f,p=h.utilities.filterArray(a,d),w?u=!0:(l=a.slice(0,t+2),c=h.utilities.arrayToPath(l),(u=!h.is.tab(c))&&h.verbose("Tab parameters found",l)),u&&o)return i?(h.debug("Ignoring remote content on first tab load",f),P=!1,h.cache.add(n,S.html()),h.activate.all(f),y.onFirstLoad.call(S[0],f,p,b),y.onLoad.call(S[0],f,p,b)):(h.activate.navigation(f),h.fetch.content(f,n)),!1;h.debug("Opened local tab",f),h.activate.all(f),h.cache.read(f)||(h.cache.add(f,!0),h.debug("First time tab loaded calling tab init"),y.onFirstLoad.call(S[0],f,p,b)),y.onLoad.call(S[0],f,p,b)}else{if(-1!=n.search("/")||""===n)return h.error(k.missingTab,A,m,f),!1;if(s=e("#"+n+', a[name="'+n+'"]'),f=s.closest("[data-tab]").data(C.tab),S=h.get.tabElement(f),s&&s.length>0&&f)return h.debug("Anchor link used, opening parent tab",S,s),S.hasClass(x.active)||setTimeout(function(){h.scrollTo(s)},0),h.activate.all(f),h.cache.read(f)||(h.cache.add(f,!0),h.debug("First time tab loaded calling tab init"),y.onFirstLoad.call(S[0],f,p,b)),y.onLoad.call(S[0],f,p,b),!1}})},scrollTo:function(t){var i=!!(t&&t.length>0)&&t.offset().top;!1!==i&&(h.debug("Forcing scroll to an in-page link in a hidden tab",i,t),e(n).scrollTop(i))},update:{content:function(t,n,i){var o=h.get.tabElement(t),a=o[0];i=void 0!==i?i:y.evaluateScripts,"string"==typeof y.cacheType&&"dom"==y.cacheType.toLowerCase()&&"string"!=typeof n?o.empty().append(e(n).clone(!0)):i?(h.debug("Updating HTML and evaluating inline scripts",t,n),o.html(n)):(h.debug("Updating HTML",t,n),a.innerHTML=n)}},fetch:{content:function(t,n){var i,o,a=h.get.tabElement(t),r={dataType:"html",encodeParameters:!1,on:"now",cache:y.alwaysRefresh,headers:{"X-Remote":!0},onSuccess:function(e){"response"==y.cacheType&&h.cache.add(n,e),h.update.content(t,e),t==v?(h.debug("Content loaded",t),h.activate.tab(t)):h.debug("Content loaded in background",t),y.onFirstLoad.call(a[0],t,p,b),y.onLoad.call(a[0],t,p,b),y.loadOnce?h.cache.add(n,!0):"string"==typeof y.cacheType&&"dom"==y.cacheType.toLowerCase()&&a.children().length>0?setTimeout(function(){var e=a.children().clone(!0);e=e.not("script"),h.cache.add(n,e)},0):h.cache.add(n,a.html())},urlData:{tab:n}},s=a.api("get request")||!1,l=s&&"pending"===s.state();n=n||t,o=h.cache.read(n),y.cache&&o?(h.activate.tab(t),h.debug("Adding cached content",n),y.loadOnce||("once"==y.evaluateScripts?h.update.content(t,o,!1):h.update.content(t,o)),y.onLoad.call(a[0],t,p,b)):l?(h.set.loading(t),h.debug("Content is already loading",n)):void 0!==e.api?(i=e.extend(!0,{},y.apiSettings,r),h.debug("Retrieving remote content",n,i),h.set.loading(t),a.api(i)):h.error(k.api)}},activate:{all:function(e){h.activate.tab(e),h.activate.navigation(e)},tab:function(e){var t=h.get.tabElement(e),n="siblings"==y.deactivate?t.siblings(g):g.not(t),i=t.hasClass(x.active);h.verbose("Showing tab content for",t),i||(t.addClass(x.active),n.removeClass(x.active+" "+x.loading),t.length>0&&y.onVisible.call(t[0],e))},navigation:function(e){var t=h.get.navElement(e),n="siblings"==y.deactivate?t.siblings(a):a.not(t),i=t.hasClass(x.active);h.verbose("Activating tab navigation for",t,e),i||(t.addClass(x.active),n.removeClass(x.active+" "+x.loading))}},deactivate:{all:function(){h.deactivate.navigation(),h.deactivate.tabs()},navigation:function(){a.removeClass(x.active)},tabs:function(){g.removeClass(x.active+" "+x.loading)}},is:{tab:function(e){return void 0!==e&&h.get.tabElement(e).length>0}},get:{initialPath:function(){return a.eq(0).data(C.tab)||g.eq(0).data(C.tab)},path:function(){return e.address.value()},defaultPathArray:function(e){return h.utilities.pathToArray(h.get.defaultPath(e))},defaultPath:function(e){var t=a.filter("[data-"+C.tab+'^="'+e+'/"]').eq(0).data(C.tab)||!1;if(t){if(h.debug("Found default tab",t),E<y.maxDepth)return E++,h.get.defaultPath(t);h.error(k.recursion)}else h.debug("No default tabs found for",e,g);return E=0,e},navElement:function(e){return e=e||v,a.filter("[data-"+C.tab+'="'+e+'"]')},tabElement:function(e){var t,n,i,o;return e=e||v,i=h.utilities.pathToArray(e),o=h.utilities.last(i),t=g.filter("[data-"+C.tab+'="'+e+'"]'),n=g.filter("[data-"+C.tab+'="'+o+'"]'),t.length>0?t:n},tab:function(){return v}},utilities:{filterArray:function(t,n){return e.grep(t,function(t){return-1==e.inArray(t,n)})},last:function(t){return!!e.isArray(t)&&t[t.length-1]},pathToArray:function(e){return void 0===e&&(e=v),"string"==typeof e?e.split("/"):[e]},arrayToPath:function(t){return!!e.isArray(t)&&t.join("/")}},setting:function(t,n){if(h.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,y,t);else{if(void 0===n)return y[t];e.isPlainObject(y[t])?e.extend(!0,y[t],n):y[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,h,t);else{if(void 0===n)return h[t];h[t]=n}},debug:function(){!y.silent&&y.debug&&(y.performance?h.performance.log(arguments):(h.debug=Function.prototype.bind.call(console.info,console,y.name+":"),h.debug.apply(console,arguments)))},verbose:function(){!y.silent&&y.verbose&&y.debug&&(y.performance?h.performance.log(arguments):(h.verbose=Function.prototype.bind.call(console.info,console,y.name+":"),h.verbose.apply(console,arguments)))},error:function(){y.silent||(h.error=Function.prototype.bind.call(console.error,console,y.name+":"),h.error.apply(console,arguments))},performance:{log:function(e){var t,n;y.performance&&(n=(t=(new Date).getTime())-(s||t),s=t,l.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:F,"Execution Time":n})),clearTimeout(h.performance.timer),h.performance.timer=setTimeout(h.performance.display,500)},display:function(){var t=y.name+":",n=0;s=!1,clearTimeout(h.performance.timer),e.each(l,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(void 0!==console.group||void 0!==console.table)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,n,i){var a,r,s,l=O;return n=n||d,i=F||i,"string"==typeof t&&void 0!==l&&(t=t.split(/[\. ]/),a=t.length-1,e.each(t,function(n,i){var o=n!=a?i+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[o])&&n!=a)l=l[o];else{if(void 0!==l[o])return r=l[o],!1;if(!e.isPlainObject(l[i])||n==a)return void 0!==l[i]?(r=l[i],!1):(h.error(k.method,t),!1);l=l[i]}})),e.isFunction(r)?s=r.apply(i,n):void 0!==r&&(s=r),e.isArray(o)?o.push(s):void 0!==o?o=[o,s]:void 0!==s&&(o=s),r}},u?(void 0===O&&h.initialize(),h.invoke(c)):(void 0!==O&&O.invoke("destroy"),h.initialize())}),void 0!==o?o:this},e.tab=function(){e(t).tab.apply(this,arguments)},e.fn.tab.settings={name:"Tab",namespace:"tab",silent:!1,debug:!1,verbose:!1,performance:!0,auto:!1,history:!1,historyType:"hash",path:!1,context:!1,childrenOnly:!1,maxDepth:25,deactivate:"siblings",alwaysRefresh:!1,cache:!0,loadOnce:!1,cacheType:"response",ignoreFirstLoad:!1,apiSettings:!1,evaluateScripts:"once",onFirstLoad:function(e,t,n){},onLoad:function(e,t,n){},onVisible:function(e,t,n){},onRequest:function(e,t,n){},templates:{determineTitle:function(e){}},error:{api:"You attempted to load content without API module",method:"The method you called is not defined",missingTab:"Activated tab cannot be found. Tabs are case-sensitive.",noContent:"The tab you specified is missing a content url.",path:"History enabled, but no path was specified",recursion:"Max recursive depth reached",legacyInit:"onTabInit has been renamed to onFirstLoad in 2.0, please adjust your code.",legacyLoad:"onTabLoad has been renamed to onLoad in 2.0. Please adjust your code",state:"History requires Asual's Address library <https://github.com/asual/jquery-address>"},metadata:{tab:"tab",loaded:"loaded",promise:"promise"},className:{loading:"loading",active:"active"},selector:{tabs:".ui.tab",ui:".ui"}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.transition=function(){var i,o=e(this),a=o.selector||"",r=(new Date).getTime(),s=[],l=arguments,c=l[0],u=[].slice.call(arguments,1),d="string"==typeof c;t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame;return o.each(function(t){var f,m,g,v,p,h,b,y,x,C=e(this),w=this;(x={initialize:function(){f=x.get.settings.apply(w,l),v=f.className,g=f.error,p=f.metadata,y="."+f.namespace,b="module-"+f.namespace,m=C.data(b)||x,h=x.get.animationEndEvent(),d&&(d=x.invoke(c)),!1===d&&(x.verbose("Converted arguments into settings object",f),f.interval?x.delay(f.animate):x.animate(),x.instantiate())},instantiate:function(){x.verbose("Storing instance of module",x),m=x,C.data(b,m)},destroy:function(){x.verbose("Destroying previous module for",w),C.removeData(b)},refresh:function(){x.verbose("Refreshing display type on next animation"),delete x.displayType},forceRepaint:function(){x.verbose("Forcing element repaint");var e=C.parent(),t=C.next();0===t.length?C.detach().appendTo(e):C.detach().insertBefore(t)},repaint:function(){x.verbose("Repainting element");w.offsetWidth},delay:function(e){var n,i=x.get.animationDirection();i||(i=x.can.transition()?x.get.direction():"static"),e=void 0!==e?e:f.interval,n="auto"==f.reverse&&i==v.outward||1==f.reverse?(o.length-t)*f.interval:t*f.interval,x.debug("Delaying animation by",n),setTimeout(x.animate,n)},animate:function(e){if(f=e||f,!x.is.supported())return x.error(g.support),!1;if(x.debug("Preparing animation",f.animation),x.is.animating()){if(f.queue)return!f.allowRepeats&&x.has.direction()&&x.is.occurring()&&!0!==x.queuing?x.debug("Animation is currently occurring, preventing queueing same animation",f.animation):x.queue(f.animation),!1;if(!f.allowRepeats&&x.is.occurring())return x.debug("Animation is already occurring, will not execute repeated animation",f.animation),!1;x.debug("New animation started, completing previous early",f.animation),m.complete()}x.can.animate()?x.set.animating(f.animation):x.error(g.noAnimation,f.animation,w)},reset:function(){x.debug("Resetting animation to beginning conditions"),x.remove.animationCallbacks(),x.restore.conditions(),x.remove.animating()},queue:function(e){x.debug("Queueing animation of",e),x.queuing=!0,C.one(h+".queue"+y,function(){x.queuing=!1,x.repaint(),x.animate.apply(this,f)})},complete:function(e){x.debug("Animation complete",f.animation),x.remove.completeCallback(),x.remove.failSafe(),x.is.looping()||(x.is.outward()?(x.verbose("Animation is outward, hiding element"),x.restore.conditions(),x.hide()):x.is.inward()?(x.verbose("Animation is outward, showing element"),x.restore.conditions(),x.show()):(x.verbose("Static animation completed"),x.restore.conditions(),f.onComplete.call(w)))},force:{visible:function(){var e=C.attr("style"),t=x.get.userStyle(),n=x.get.displayType(),i=t+"display: "+n+" !important;",o=C.css("display"),a=void 0===e||""===e;o!==n?(x.verbose("Overriding default display to show element",n),C.attr("style",i)):a&&C.removeAttr("style")},hidden:function(){var e=C.attr("style"),t=C.css("display"),n=void 0===e||""===e;"none"===t||x.is.hidden()?n&&C.removeAttr("style"):(x.verbose("Overriding default display to hide element"),C.css("display","none"))}},has:{direction:function(t){var n=!1;return"string"==typeof(t=t||f.animation)&&(t=t.split(" "),e.each(t,function(e,t){t!==v.inward&&t!==v.outward||(n=!0)})),n},inlineDisplay:function(){var t=C.attr("style")||"";return e.isArray(t.match(/display.*?;/,""))}},set:{animating:function(e){var t;x.remove.completeCallback(),e=e||f.animation,t=x.get.animationClass(e),x.save.animation(t),x.force.visible(),x.remove.hidden(),x.remove.direction(),x.start.animation(t)},duration:function(e,t){((t="number"==typeof(t=t||f.duration)?t+"ms":t)||0===t)&&(x.verbose("Setting animation duration",t),C.css({"animation-duration":t}))},direction:function(e){(e=e||x.get.direction())==v.inward?x.set.inward():x.set.outward()},looping:function(){x.debug("Transition set to loop"),C.addClass(v.looping)},hidden:function(){C.addClass(v.transition).addClass(v.hidden)},inward:function(){x.debug("Setting direction to inward"),C.removeClass(v.outward).addClass(v.inward)},outward:function(){x.debug("Setting direction to outward"),C.removeClass(v.inward).addClass(v.outward)},visible:function(){C.addClass(v.transition).addClass(v.visible)}},start:{animation:function(e){e=e||x.get.animationClass(),x.debug("Starting tween",e),C.addClass(e).one(h+".complete"+y,x.complete),f.useFailSafe&&x.add.failSafe(),x.set.duration(f.duration),f.onStart.call(w)}},save:{animation:function(e){x.cache||(x.cache={}),x.cache.animation=e},displayType:function(e){"none"!==e&&C.data(p.displayType,e)},transitionExists:function(t,n){e.fn.transition.exists[t]=n,x.verbose("Saving existence of transition",t,n)}},restore:{conditions:function(){var e=x.get.currentAnimation();e&&(C.removeClass(e),x.verbose("Removing animation class",x.cache)),x.remove.duration()}},add:{failSafe:function(){var e=x.get.duration();x.timer=setTimeout(function(){C.triggerHandler(h)},e+f.failSafeDelay),x.verbose("Adding fail safe timer",x.timer)}},remove:{animating:function(){C.removeClass(v.animating)},animationCallbacks:function(){x.remove.queueCallback(),x.remove.completeCallback()},queueCallback:function(){C.off(".queue"+y)},completeCallback:function(){C.off(".complete"+y)},display:function(){C.css("display","")},direction:function(){C.removeClass(v.inward).removeClass(v.outward)},duration:function(){C.css("animation-duration","")},failSafe:function(){x.verbose("Removing fail safe timer",x.timer),x.timer&&clearTimeout(x.timer)},hidden:function(){C.removeClass(v.hidden)},visible:function(){C.removeClass(v.visible)},looping:function(){x.debug("Transitions are no longer looping"),x.is.looping()&&(x.reset(),C.removeClass(v.looping))},transition:function(){C.removeClass(v.visible).removeClass(v.hidden)}},get:{settings:function(t,n,i){return"object"==typeof t?e.extend(!0,{},e.fn.transition.settings,t):"function"==typeof i?e.extend({},e.fn.transition.settings,{animation:t,onComplete:i,duration:n}):"string"==typeof n||"number"==typeof n?e.extend({},e.fn.transition.settings,{animation:t,duration:n}):"object"==typeof n?e.extend({},e.fn.transition.settings,n,{animation:t}):"function"==typeof n?e.extend({},e.fn.transition.settings,{animation:t,onComplete:n}):e.extend({},e.fn.transition.settings,{animation:t})},animationClass:function(e){var t=e||f.animation,n=x.can.transition()&&!x.has.direction()?x.get.direction()+" ":"";return v.animating+" "+v.transition+" "+n+t},currentAnimation:function(){return!(!x.cache||void 0===x.cache.animation)&&x.cache.animation},currentDirection:function(){return x.is.inward()?v.inward:v.outward},direction:function(){return x.is.hidden()||!x.is.visible()?v.inward:v.outward},animationDirection:function(t){var n;return"string"==typeof(t=t||f.animation)&&(t=t.split(" "),e.each(t,function(e,t){t===v.inward?n=v.inward:t===v.outward&&(n=v.outward)})),n||!1},duration:function(e){return!1===(e=e||f.duration)&&(e=C.css("animation-duration")||0),"string"==typeof e?e.indexOf("ms")>-1?parseFloat(e):1e3*parseFloat(e):e},displayType:function(e){return e=void 0===e||e,f.displayType?f.displayType:(e&&void 0===C.data(p.displayType)&&x.can.transition(!0),C.data(p.displayType))},userStyle:function(e){return(e=e||C.attr("style")||"").replace(/display.*?;/,"")},transitionExists:function(t){return e.fn.transition.exists[t]},animationStartEvent:function(){var e,t=n.createElement("div"),i={animation:"animationstart",OAnimation:"oAnimationStart",MozAnimation:"mozAnimationStart",WebkitAnimation:"webkitAnimationStart"};for(e in i)if(void 0!==t.style[e])return i[e];return!1},animationEndEvent:function(){var e,t=n.createElement("div"),i={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"mozAnimationEnd",WebkitAnimation:"webkitAnimationEnd"};for(e in i)if(void 0!==t.style[e])return i[e];return!1}},can:{transition:function(t){var n,i,o,a,r,s,l=f.animation,c=x.get.transitionExists(l),u=x.get.displayType(!1);if(void 0===c||t){if(x.verbose("Determining whether animation exists"),n=C.attr("class"),i=C.prop("tagName"),o=e("<"+i+" />").addClass(n).insertAfter(C),a=o.addClass(l).removeClass(v.inward).removeClass(v.outward).addClass(v.animating).addClass(v.transition).css("animationName"),r=o.addClass(v.inward).css("animationName"),u||(u=o.attr("class",n).removeAttr("style").removeClass(v.hidden).removeClass(v.visible).show().css("display"),x.verbose("Determining final display state",u),x.save.displayType(u)),o.remove(),a!=r)x.debug("Direction exists for animation",l),s=!0;else{if("none"==a||!a)return void x.debug("No animation defined in css",l);x.debug("Static animation found",l,u),s=!1}x.save.transitionExists(l,s)}return void 0!==c?c:s},animate:function(){return void 0!==x.can.transition()}},is:{animating:function(){return C.hasClass(v.animating)},inward:function(){return C.hasClass(v.inward)},outward:function(){return C.hasClass(v.outward)},looping:function(){return C.hasClass(v.looping)},occurring:function(e){return e=e||f.animation,e="."+e.replace(" ","."),C.filter(e).length>0},visible:function(){return C.is(":visible")},hidden:function(){return"hidden"===C.css("visibility")},supported:function(){return!1!==h}},hide:function(){x.verbose("Hiding element"),x.is.animating()&&x.reset(),w.blur(),x.remove.display(),x.remove.visible(),x.set.hidden(),x.force.hidden(),f.onHide.call(w),f.onComplete.call(w)},show:function(e){x.verbose("Showing element",e),x.remove.hidden(),x.set.visible(),x.force.visible(),f.onShow.call(w),f.onComplete.call(w)},toggle:function(){x.is.visible()?x.hide():x.show()},stop:function(){x.debug("Stopping current animation"),C.triggerHandler(h)},stopAll:function(){x.debug("Stopping all animation"),x.remove.queueCallback(),C.triggerHandler(h)},clear:{queue:function(){x.debug("Clearing animation queue"),x.remove.queueCallback()}},enable:function(){x.verbose("Starting animation"),C.removeClass(v.disabled)},disable:function(){x.debug("Stopping animation"),C.addClass(v.disabled)},setting:function(t,n){if(x.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,f,t);else{if(void 0===n)return f[t];e.isPlainObject(f[t])?e.extend(!0,f[t],n):f[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,x,t);else{if(void 0===n)return x[t];x[t]=n}},debug:function(){!f.silent&&f.debug&&(f.performance?x.performance.log(arguments):(x.debug=Function.prototype.bind.call(console.info,console,f.name+":"),x.debug.apply(console,arguments)))},verbose:function(){!f.silent&&f.verbose&&f.debug&&(f.performance?x.performance.log(arguments):(x.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),x.verbose.apply(console,arguments)))},error:function(){f.silent||(x.error=Function.prototype.bind.call(console.error,console,f.name+":"),x.error.apply(console,arguments))},performance:{log:function(e){var t,n;f.performance&&(n=(t=(new Date).getTime())-(r||t),r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:w,"Execution Time":n})),clearTimeout(x.performance.timer),x.performance.timer=setTimeout(x.performance.display,500)},display:function(){var t=f.name+":",n=0;r=!1,clearTimeout(x.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",a&&(t+=" '"+a+"'"),o.length>1&&(t+=" ("+o.length+")"),(void 0!==console.group||void 0!==console.table)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,n,o){var a,r,s,l=m;return n=n||u,o=w||o,"string"==typeof t&&void 0!==l&&(t=t.split(/[\. ]/),a=t.length-1,e.each(t,function(n,i){var o=n!=a?i+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[o])&&n!=a)l=l[o];else{if(void 0!==l[o])return r=l[o],!1;if(!e.isPlainObject(l[i])||n==a)return void 0!==l[i]&&(r=l[i],!1);l=l[i]}})),e.isFunction(r)?s=r.apply(o,n):void 0!==r&&(s=r),e.isArray(i)?i.push(s):void 0!==i?i=[i,s]:void 0!==s&&(i=s),void 0!==r&&r}}).initialize()}),void 0!==i?i:this},e.fn.transition.exists={},e.fn.transition.settings={name:"Transition",silent:!1,debug:!1,verbose:!1,performance:!0,namespace:"transition",interval:0,reverse:"auto",onStart:function(){},onComplete:function(){},onShow:function(){},onHide:function(){},useFailSafe:!0,failSafeDelay:100,allowRepeats:!1,displayType:!1,animation:"fade",duration:!1,queue:!0,metadata:{displayType:"display"},className:{animating:"animating",disabled:"disabled",hidden:"hidden",inward:"in",loading:"loading",looping:"looping",outward:"out",transition:"transition",visible:"visible"},error:{noAnimation:"Element is no longer attached to DOM. Unable to animate.  Use silent setting to surpress this warning in production.",repeated:"That animation is already occurring, cancelling repeated animation",method:"The method you called is not defined",support:"This browser does not support CSS animations"}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();e.api=e.fn.api=function(n){var i,o=e(e.isFunction(this)?t:this),a=o.selector||"",r=(new Date).getTime(),s=[],l=arguments[0],c="string"==typeof l,u=[].slice.call(arguments,1);return o.each(function(){var o,d,f,m,g,v=e.isPlainObject(n)?e.extend(!0,{},e.fn.api.settings,n):e.extend({},e.fn.api.settings),p=v.namespace,h=v.metadata,b=v.selector,y=v.error,x=v.className,C="."+p,w="module-"+p,k=e(this),S=k.closest(b.form),T=v.stateContext?e(v.stateContext):k,A=this,R=T[0],P=k.data(w);g={initialize:function(){c||g.bind.events(),g.instantiate()},instantiate:function(){g.verbose("Storing instance of module",g),P=g,k.data(w,P)},destroy:function(){g.verbose("Destroying previous module for",A),k.removeData(w).off(C)},bind:{events:function(){var e=g.get.event();e?(g.verbose("Attaching API events to element",e),k.on(e+C,g.event.trigger)):"now"==v.on&&(g.debug("Querying API endpoint immediately"),g.query())}},decode:{json:function(e){if(void 0!==e&&"string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}},read:{cachedResponse:function(e){var n;{if(void 0!==t.Storage)return n=sessionStorage.getItem(e),g.debug("Using cached response",e,n),n=g.decode.json(n);g.error(y.noStorage)}}},write:{cachedResponse:function(n,i){i&&""===i?g.debug("Response empty, not caching",i):void 0!==t.Storage?(e.isPlainObject(i)&&(i=JSON.stringify(i)),sessionStorage.setItem(n,i),g.verbose("Storing cached response for url",n,i)):g.error(y.noStorage)}},query:function(){if(g.is.disabled())g.debug("Element is disabled API request aborted");else{if(g.is.loading()){if(!v.interruptRequests)return void g.debug("Cancelling request, previous request is still pending");g.debug("Interrupting previous request"),g.abort()}if(v.defaultData&&e.extend(!0,v.urlData,g.get.defaultData()),v.serializeForm&&(v.data=g.add.formData(v.data)),!1===(d=g.get.settings()))return g.cancelled=!0,void g.error(y.beforeSend);if(g.cancelled=!1,(f=g.get.templatedURL())||g.is.mocked()){if((f=g.add.urlData(f))||g.is.mocked()){if(d.url=v.base+f,o=e.extend(!0,{},v,{type:v.method||v.type,data:void 0,url:v.base+f,beforeSend:v.beforeXHR,success:function(){},failure:function(){},complete:function(){}}),g.debug("Querying URL",o.url),g.verbose("Using AJAX settings",o),"local"===v.cache&&g.read.cachedResponse(f))return g.debug("Response returned from local cache"),g.request=g.create.request(),void g.request.resolveWith(R,[g.read.cachedResponse(f)]);v.throttle?v.throttleFirstRequest||g.timer?(g.debug("Throttling request",v.throttle),clearTimeout(g.timer),g.timer=setTimeout(function(){g.timer&&delete g.timer,g.debug("Sending throttled request",void 0,o.method),g.send.request()},v.throttle)):(g.debug("Sending request",void 0,o.method),g.send.request(),g.timer=setTimeout(function(){},v.throttle)):(g.debug("Sending request",void 0,o.method),g.send.request())}}else g.error(y.missingURL)}},should:{removeError:function(){return!0===v.hideError||"auto"===v.hideError&&!g.is.form()}},is:{disabled:function(){return k.filter(b.disabled).length>0},expectingJSON:function(){return"json"===v.dataType||"jsonp"===v.dataType},form:function(){return k.is("form")||T.is("form")},mocked:function(){return v.mockResponse||v.mockResponseAsync||v.response||v.responseAsync},input:function(){return k.is("input")},loading:function(){return!!g.request&&"pending"==g.request.state()},abortedRequest:function(e){return e&&void 0!==e.readyState&&0===e.readyState?(g.verbose("XHR request determined to be aborted"),!0):(g.verbose("XHR request was not aborted"),!1)},validResponse:function(t){return g.is.expectingJSON()&&e.isFunction(v.successTest)?(g.debug("Checking JSON returned success",v.successTest,t),v.successTest(t)?(g.debug("Response passed success test",t),!0):(g.debug("Response failed success test",t),!1)):(g.verbose("Response is not JSON, skipping validation",v.successTest,t),!0)}},was:{cancelled:function(){return g.cancelled||!1},succesful:function(){return g.request&&"resolved"==g.request.state()},failure:function(){return g.request&&"rejected"==g.request.state()},complete:function(){return g.request&&("resolved"==g.request.state()||"rejected"==g.request.state())}},add:{urlData:function(t,n){var i,o;return t&&(i=t.match(v.regExp.required),o=t.match(v.regExp.optional),n=n||v.urlData,i&&(g.debug("Looking for required URL variables",i),e.each(i,function(i,o){var a=-1!==o.indexOf("$")?o.substr(2,o.length-3):o.substr(1,o.length-2),r=e.isPlainObject(n)&&void 0!==n[a]?n[a]:void 0!==k.data(a)?k.data(a):void 0!==T.data(a)?T.data(a):n[a];if(void 0===r)return g.error(y.requiredParameter,a,t),t=!1,!1;g.verbose("Found required variable",a,r),r=v.encodeParameters?g.get.urlEncodedValue(r):r,t=t.replace(o,r)})),o&&(g.debug("Looking for optional URL variables",i),e.each(o,function(i,o){var a=-1!==o.indexOf("$")?o.substr(3,o.length-4):o.substr(2,o.length-3),r=e.isPlainObject(n)&&void 0!==n[a]?n[a]:void 0!==k.data(a)?k.data(a):void 0!==T.data(a)?T.data(a):n[a];void 0!==r?(g.verbose("Optional variable Found",a,r),t=t.replace(o,r)):(g.verbose("Optional variable not found",a),t=-1!==t.indexOf("/"+o)?t.replace("/"+o,""):t.replace(o,""))}))),t},formData:function(t){var n=void 0!==e.fn.serializeObject,i=n?S.serializeObject():S.serialize();return t=t||v.data,e.isPlainObject(t)?n?(g.debug("Extending existing data with form data",t,i),t=e.extend(!0,{},t,i)):(g.error(y.missingSerialize),g.debug("Cant extend data. Replacing data with form data",t,i),t=i):(g.debug("Adding form data",i),t=i),t}},send:{request:function(){g.set.loading(),g.request=g.create.request(),g.is.mocked()?g.mockedXHR=g.create.mockedXHR():g.xhr=g.create.xhr(),v.onRequest.call(R,g.request,g.xhr)}},event:{trigger:function(e){g.query(),"submit"!=e.type&&"click"!=e.type||e.preventDefault()},xhr:{always:function(){},done:function(t,n,i){var o=this,a=(new Date).getTime()-m,r=v.loadingDuration-a,s=!!e.isFunction(v.onResponse)&&(g.is.expectingJSON()?v.onResponse.call(o,e.extend(!0,{},t)):v.onResponse.call(o,t));r=r>0?r:0,s&&(g.debug("Modified API response in onResponse callback",v.onResponse,s,t),t=s),r>0&&g.debug("Response completed early delaying state change by",r),setTimeout(function(){g.is.validResponse(t)?g.request.resolveWith(o,[t,i]):g.request.rejectWith(o,[i,"invalid"])},r)},fail:function(e,t,n){var i=this,o=(new Date).getTime()-m,a=v.loadingDuration-o;(a=a>0?a:0)>0&&g.debug("Response completed early delaying state change by",a),setTimeout(function(){g.is.abortedRequest(e)?g.request.rejectWith(i,[e,"aborted",n]):g.request.rejectWith(i,[e,"error",t,n])},a)}},request:{done:function(e,t){g.debug("Successful API Response",e),"local"===v.cache&&f&&(g.write.cachedResponse(f,e),g.debug("Saving server response locally",g.cache)),v.onSuccess.call(R,e,k,t)},complete:function(e,t){var n,i;g.was.succesful()?(i=e,n=t):(n=e,i=g.get.responseFromXHR(n)),g.remove.loading(),v.onComplete.call(R,i,k,n)},fail:function(e,t,n){var i=g.get.responseFromXHR(e),a=g.get.errorFromRequest(i,t,n);if("aborted"==t)return g.debug("XHR Aborted (Most likely caused by page navigation or CORS Policy)",t,n),v.onAbort.call(R,t,k,e),!0;"invalid"==t?g.debug("JSON did not pass success test. A server-side error has most likely occurred",i):"error"==t&&void 0!==e&&(g.debug("XHR produced a server error",t,n),200!=e.status&&void 0!==n&&""!==n&&g.error(y.statusMessage+n,o.url),v.onError.call(R,a,k,e)),v.errorDuration&&"aborted"!==t&&(g.debug("Adding error state"),g.set.error(),g.should.removeError()&&setTimeout(g.remove.error,v.errorDuration)),g.debug("API Request failed",a,e),v.onFailure.call(R,i,k,e)}}},create:{request:function(){return e.Deferred().always(g.event.request.complete).done(g.event.request.done).fail(g.event.request.fail)},mockedXHR:function(){var t,n,i,o=v.mockResponse||v.response,a=v.mockResponseAsync||v.responseAsync;return i=e.Deferred().always(g.event.xhr.complete).done(g.event.xhr.done).fail(g.event.xhr.fail),o?(e.isFunction(o)?(g.debug("Using specified synchronous callback",o),n=o.call(R,d)):(g.debug("Using settings specified response",o),n=o),i.resolveWith(R,[n,!1,{responseText:n}])):e.isFunction(a)&&(t=function(e){g.debug("Async callback returned response",e),e?i.resolveWith(R,[e,!1,{responseText:e}]):i.rejectWith(R,[{responseText:e},!1,!1])},g.debug("Using specified async response callback",a),a.call(R,d,t)),i},xhr:function(){var t;return t=e.ajax(o).always(g.event.xhr.always).done(g.event.xhr.done).fail(g.event.xhr.fail),g.verbose("Created server request",t,o),t}},set:{error:function(){g.verbose("Adding error state to element",T),T.addClass(x.error)},loading:function(){g.verbose("Adding loading state to element",T),T.addClass(x.loading),m=(new Date).getTime()}},remove:{error:function(){g.verbose("Removing error state from element",T),T.removeClass(x.error)},loading:function(){g.verbose("Removing loading state from element",T),T.removeClass(x.loading)}},get:{responseFromXHR:function(t){return!!e.isPlainObject(t)&&(g.is.expectingJSON()?g.decode.json(t.responseText):t.responseText)},errorFromRequest:function(t,n,i){return e.isPlainObject(t)&&void 0!==t.error?t.error:void 0!==v.error[n]?v.error[n]:i},request:function(){return g.request||!1},xhr:function(){return g.xhr||!1},settings:function(){var t;return(t=v.beforeSend.call(R,v))&&(void 0!==t.success&&(g.debug("Legacy success callback detected",t),g.error(y.legacyParameters,t.success),t.onSuccess=t.success),void 0!==t.failure&&(g.debug("Legacy failure callback detected",t),g.error(y.legacyParameters,t.failure),t.onFailure=t.failure),void 0!==t.complete&&(g.debug("Legacy complete callback detected",t),g.error(y.legacyParameters,t.complete),t.onComplete=t.complete)),void 0===t&&g.error(y.noReturnedValue),!1===t?t:void 0!==t?e.extend(!0,{},t):e.extend(!0,{},v)},urlEncodedValue:function(e){var n=t.decodeURIComponent(e),i=t.encodeURIComponent(e);return n!==e?(g.debug("URL value is already encoded, avoiding double encoding",e),e):(g.verbose("Encoding value using encodeURIComponent",e,i),i)},defaultData:function(){var t={};return e.isWindow(A)||(g.is.input()?t.value=k.val():g.is.form()||(t.text=k.text())),t},event:function(){return e.isWindow(A)||"now"==v.on?(g.debug("API called without element, no events attached"),!1):"auto"==v.on?k.is("input")?void 0!==A.oninput?"input":void 0!==A.onpropertychange?"propertychange":"keyup":k.is("form")?"submit":"click":v.on},templatedURL:function(e){if(e=e||k.data(h.action)||v.action||!1,f=k.data(h.url)||v.url||!1)return g.debug("Using specified url",f),f;if(e){if(g.debug("Looking up url for action",e,v.api),void 0===v.api[e]&&!g.is.mocked())return void g.error(y.missingAction,v.action,v.api);f=v.api[e]}else g.is.form()&&(f=k.attr("action")||T.attr("action")||!1,g.debug("No url or action specified, defaulting to form action",f));return f}},abort:function(){var e=g.get.xhr();e&&"resolved"!==e.state()&&(g.debug("Cancelling API request"),e.abort())},reset:function(){g.remove.error(),g.remove.loading()},setting:function(t,n){if(g.debug("Changing setting",t,n),e.isPlainObject(t))e.extend(!0,v,t);else{if(void 0===n)return v[t];e.isPlainObject(v[t])?e.extend(!0,v[t],n):v[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(void 0===n)return g[t];g[t]=n}},debug:function(){!v.silent&&v.debug&&(v.performance?g.performance.log(arguments):(g.debug=Function.prototype.bind.call(console.info,console,v.name+":"),g.debug.apply(console,arguments)))},verbose:function(){!v.silent&&v.verbose&&v.debug&&(v.performance?g.performance.log(arguments):(g.verbose=Function.prototype.bind.call(console.info,console,v.name+":"),g.verbose.apply(console,arguments)))},error:function(){v.silent||(g.error=Function.prototype.bind.call(console.error,console,v.name+":"),g.error.apply(console,arguments))},performance:{log:function(e){var t,n;v.performance&&(n=(t=(new Date).getTime())-(r||t),r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"","Execution Time":n})),clearTimeout(g.performance.timer),g.performance.timer=setTimeout(g.performance.display,500)},display:function(){var t=v.name+":",n=0;r=!1,clearTimeout(g.performance.timer),e.each(s,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",a&&(t+=" '"+a+"'"),(void 0!==console.group||void 0!==console.table)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,n,o){var a,r,s,l=P;return n=n||u,o=A||o,"string"==typeof t&&void 0!==l&&(t=t.split(/[\. ]/),a=t.length-1,e.each(t,function(n,i){var o=n!=a?i+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[o])&&n!=a)l=l[o];else{if(void 0!==l[o])return r=l[o],!1;if(!e.isPlainObject(l[i])||n==a)return void 0!==l[i]?(r=l[i],!1):(g.error(y.method,t),!1);l=l[i]}})),e.isFunction(r)?s=r.apply(o,n):void 0!==r&&(s=r),e.isArray(i)?i.push(s):void 0!==i?i=[i,s]:void 0!==s&&(i=s),r}},c?(void 0===P&&g.initialize(),g.invoke(l)):(void 0!==P&&P.invoke("destroy"),g.initialize())}),void 0!==i?i:this},e.api.settings={name:"API",namespace:"api",debug:!1,verbose:!1,performance:!0,api:{},cache:!0,interruptRequests:!0,on:"auto",stateContext:!1,loadingDuration:0,hideError:"auto",errorDuration:2e3,encodeParameters:!0,action:!1,url:!1,base:"",urlData:{},defaultData:!0,serializeForm:!1,throttle:0,throttleFirstRequest:!0,method:"get",data:{},dataType:"json",mockResponse:!1,mockResponseAsync:!1,response:!1,responseAsync:!1,beforeSend:function(e){return e},beforeXHR:function(e){},onRequest:function(e,t){},onResponse:!1,onSuccess:function(e,t){},onComplete:function(e,t){},onFailure:function(e,t){},onError:function(e,t){},onAbort:function(e,t){},successTest:!1,error:{beforeSend:"The before send function has aborted the request",error:"There was an error with your request",exitConditions:"API Request Aborted. Exit conditions met",JSONParse:"JSON could not be parsed during error handling",legacyParameters:"You are using legacy API success callback names",method:"The method you called is not defined",missingAction:"API action used but no url was defined",missingSerialize:"jquery-serialize-object is required to add form data to an existing data object",missingURL:"No URL specified for api event",noReturnedValue:"The beforeSend callback must return a settings object, beforeSend ignored.",noStorage:"Caching responses locally requires session storage",parseError:"There was an error parsing your request",requiredParameter:"Missing a required URL parameter: ",statusMessage:"Server gave an error: ",timeout:"Your request timed out"},regExp:{required:/\{\$*[A-z0-9]+\}/g,optional:/\{\/\$*[A-z0-9]+\}/g},className:{loading:"loading",error:"error"},selector:{disabled:".disabled",form:"form"},metadata:{action:"action",url:"url"}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.state=function(t){var i,o=e(this),a=o.selector||"",r=(n.documentElement,(new Date).getTime()),s=[],l=arguments[0],c="string"==typeof l,u=[].slice.call(arguments,1);return o.each(function(){var n,d=e.isPlainObject(t)?e.extend(!0,{},e.fn.state.settings,t):e.extend({},e.fn.state.settings),f=d.error,m=d.metadata,g=d.className,v=d.namespace,p=d.states,h=d.text,b="."+v,y=v+"-module",x=e(this),C=this,w=x.data(y);n={initialize:function(){n.verbose("Initializing module"),d.automatic&&n.add.defaults(),d.context&&""!==a?e(d.context).on(a,"mouseenter"+b,n.change.text).on(a,"mouseleave"+b,n.reset.text).on(a,"click"+b,n.toggle.state):x.on("mouseenter"+b,n.change.text).on("mouseleave"+b,n.reset.text).on("click"+b,n.toggle.state),n.instantiate()},instantiate:function(){n.verbose("Storing instance of module",n),w=n,x.data(y,n)},destroy:function(){n.verbose("Destroying previous module",w),x.off(b).removeData(y)},refresh:function(){n.verbose("Refreshing selector cache"),x=e(C)},add:{defaults:function(){var i=t&&e.isPlainObject(t.states)?t.states:{};e.each(d.defaults,function(t,o){void 0!==n.is[t]&&n.is[t]()&&(n.verbose("Adding default states",t,C),e.extend(d.states,o,i))})}},is:{active:function(){return x.hasClass(g.active)},loading:function(){return x.hasClass(g.loading)},inactive:function(){return!x.hasClass(g.active)},state:function(e){return void 0!==g[e]&&x.hasClass(g[e])},enabled:function(){return!x.is(d.filter.active)},disabled:function(){return x.is(d.filter.active)},textEnabled:function(){return!x.is(d.filter.text)},button:function(){return x.is(".button:not(a, .submit)")},input:function(){return x.is("input")},progress:function(){return x.is(".ui.progress")}},allow:function(e){n.debug("Now allowing state",e),p[e]=!0},disallow:function(e){n.debug("No longer allowing",e),p[e]=!1},allows:function(e){return p[e]||!1},enable:function(){x.removeClass(g.disabled)},disable:function(){x.addClass(g.disabled)},setState:function(e){n.allows(e)&&x.addClass(g[e])},removeState:function(e){n.allows(e)&&x.removeClass(g[e])},toggle:{state:function(){var t;if(n.allows("active")&&n.is.enabled()){if(n.refresh(),void 0!==e.fn.api)if(t=x.api("get request"),x.api("was cancelled"))n.debug("API Request cancelled by beforesend"),d.activateTest=function(){return!1},d.deactivateTest=function(){return!1};else if(t)return void n.listenTo(t);n.change.state()}}},listenTo:function(t){n.debug("API request detected, waiting for state signal",t),t&&(h.loading&&n.update.text(h.loading),e.when(t).then(function(){"resolved"==t.state()?(n.debug("API request succeeded"),d.activateTest=function(){return!0},d.deactivateTest=function(){return!0}):(n.debug("API request failed"),d.activateTest=function(){return!1},d.deactivateTest=function(){return!1}),n.change.state()}))},change:{state:function(){n.debug("Determining state change direction"),n.is.inactive()?n.activate():n.deactivate(),d.sync&&n.sync(),d.onChange.call(C)},text:function(){n.is.textEnabled()&&(n.is.disabled()?(n.verbose("Changing text to disabled text",h.hover),n.update.text(h.disabled)):n.is.active()?h.hover?(n.verbose("Changing text to hover text",h.hover),n.update.text(h.hover)):h.deactivate&&(n.verbose("Changing text to deactivating text",h.deactivate),n.update.text(h.deactivate)):h.hover?(n.verbose("Changing text to hover text",h.hover),n.update.text(h.hover)):h.activate&&(n.verbose("Changing text to activating text",h.activate),n.update.text(h.activate)))}},activate:function(){d.activateTest.call(C)&&(n.debug("Setting state to active"),x.addClass(g.active),n.update.text(h.active),d.onActivate.call(C))},deactivate:function(){d.deactivateTest.call(C)&&(n.debug("Setting state to inactive"),x.removeClass(g.active),n.update.text(h.inactive),d.onDeactivate.call(C))},sync:function(){n.verbose("Syncing other buttons to current state"),n.is.active()?o.not(x).state("activate"):o.not(x).state("deactivate")},get:{text:function(){return d.selector.text?x.find(d.selector.text).text():x.html()},textFor:function(e){return h[e]||!1}},flash:{text:function(e,t,i){var o=n.get.text();n.debug("Flashing text message",e,t),e=e||d.text.flash,t=t||d.flashDuration,i=i||function(){},n.update.text(e),setTimeout(function(){n.update.text(o),i.call(C)},t)}},reset:{text:function(){var e=h.active||x.data(m.storedText),t=h.inactive||x.data(m.storedText);n.is.textEnabled()&&(n.is.active()&&e?(n.verbose("Resetting active text",e),n.update.text(e)):t&&(n.verbose("Resetting inactive text",e),n.update.text(t)))}},update:{text:function(e){var t=n.get.text();e&&e!==t?(n.debug("Updating text",e),d.selector.text?x.data(m.storedText,e).find(d.selector.text).text(e):x.data(m.storedText,e).html(e)):n.debug("Text is already set, ignoring update",e)}},setting:function(t,i){if(n.debug("Changing setting",t,i),e.isPlainObject(t))e.extend(!0,d,t);else{if(void 0===i)return d[t];e.isPlainObject(d[t])?e.extend(!0,d[t],i):d[t]=i}},internal:function(t,i){if(e.isPlainObject(t))e.extend(!0,n,t);else{if(void 0===i)return n[t];n[t]=i}},debug:function(){!d.silent&&d.debug&&(d.performance?n.performance.log(arguments):(n.debug=Function.prototype.bind.call(console.info,console,d.name+":"),n.debug.apply(console,arguments)))},verbose:function(){!d.silent&&d.verbose&&d.debug&&(d.performance?n.performance.log(arguments):(n.verbose=Function.prototype.bind.call(console.info,console,d.name+":"),n.verbose.apply(console,arguments)))},error:function(){d.silent||(n.error=Function.prototype.bind.call(console.error,console,d.name+":"),n.error.apply(console,arguments))},performance:{log:function(e){var t,i;d.performance&&(i=(t=(new Date).getTime())-(r||t),r=t,s.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:C,"Execution Time":i})),clearTimeout(n.performance.timer),n.performance.timer=setTimeout(n.performance.display,500)},display:function(){var t=d.name+":",i=0;r=!1,clearTimeout(n.performance.timer),e.each(s,function(e,t){i+=t["Execution Time"]}),t+=" "+i+"ms",a&&(t+=" '"+a+"'"),(void 0!==console.group||void 0!==console.table)&&s.length>0&&(console.groupCollapsed(t),console.table?console.table(s):e.each(s,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(t,o,a){var r,s,l,c=w;return o=o||u,a=C||a,"string"==typeof t&&void 0!==c&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(i,o){var a=i!=r?o+t[i+1].charAt(0).toUpperCase()+t[i+1].slice(1):t;if(e.isPlainObject(c[a])&&i!=r)c=c[a];else{if(void 0!==c[a])return s=c[a],!1;if(!e.isPlainObject(c[o])||i==r)return void 0!==c[o]?(s=c[o],!1):(n.error(f.method,t),!1);c=c[o]}})),e.isFunction(s)?l=s.apply(a,o):void 0!==s&&(l=s),e.isArray(i)?i.push(l):void 0!==i?i=[i,l]:void 0!==l&&(i=l),s}},c?(void 0===w&&n.initialize(),n.invoke(l)):(void 0!==w&&w.invoke("destroy"),n.initialize())}),void 0!==i?i:this},e.fn.state.settings={name:"State",debug:!1,verbose:!1,namespace:"state",performance:!0,onActivate:function(){},onDeactivate:function(){},onChange:function(){},activateTest:function(){return!0},deactivateTest:function(){return!0},automatic:!0,sync:!1,flashDuration:1e3,filter:{text:".loading, .disabled",active:".disabled"},context:!1,error:{beforeSend:"The before send function has cancelled state change",method:"The method you called is not defined."},metadata:{promise:"promise",storedText:"stored-text"},className:{active:"active",disabled:"disabled",error:"error",loading:"loading",success:"success",warning:"warning"},selector:{text:!1},defaults:{input:{disabled:!0,loading:!0,active:!0},button:{disabled:!0,loading:!0,active:!0},progress:{active:!0,success:!0,warning:!0,error:!0}},states:{active:!0,disabled:!0,error:!0,loading:!0,success:!0,warning:!0},text:{disabled:!1,flash:!1,hover:!1,active:!1,inactive:!1,activate:!1,deactivate:!1}}}(jQuery,window,document),function(e,t,n,i){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),e.fn.visibility=function(i){var o,a=e(this),r=a.selector||"",s=(new Date).getTime(),l=[],c=arguments[0],u="string"==typeof c,d=[].slice.call(arguments,1),f=a.length,m=0;return a.each(function(){var a,g,v,p,h=e.isPlainObject(i)?e.extend(!0,{},e.fn.visibility.settings,i):e.extend({},e.fn.visibility.settings),b=h.className,y=h.namespace,x=h.error,C=h.metadata,w="."+y,k="module-"+y,S=e(t),T=e(this),A=e(h.context),R=(T.selector,T.data(k)),P=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)},E=this,F=!1;p={initialize:function(){p.debug("Initializing",h),p.setup.cache(),p.should.trackChanges()&&("image"==h.type&&p.setup.image(),"fixed"==h.type&&p.setup.fixed(),h.observeChanges&&p.observeChanges(),p.bind.events()),p.save.position(),p.is.visible()||p.error(x.visible,T),h.initialCheck&&p.checkVisibility(),p.instantiate()},instantiate:function(){p.debug("Storing instance",p),T.data(k,p),R=p},destroy:function(){p.verbose("Destroying previous module"),v&&v.disconnect(),g&&g.disconnect(),S.off("load"+w,p.event.load).off("resize"+w,p.event.resize),A.off("scroll"+w,p.event.scroll).off("scrollchange"+w,p.event.scrollchange),"fixed"==h.type&&(p.resetFixed(),p.remove.placeholder()),T.off(w).removeData(k)},observeChanges:function(){"MutationObserver"in t&&(g=new MutationObserver(p.event.contextChanged),v=new MutationObserver(p.event.changed),g.observe(n,{childList:!0,subtree:!0}),v.observe(E,{childList:!0,subtree:!0}),p.debug("Setting up mutation observer",v))},bind:{events:function(){p.verbose("Binding visibility events to scroll and resize"),h.refreshOnLoad&&S.on("load"+w,p.event.load),S.on("resize"+w,p.event.resize),A.off("scroll"+w).on("scroll"+w,p.event.scroll).on("scrollchange"+w,p.event.scrollchange)}},event:{changed:function(e){p.verbose("DOM tree modified, updating visibility calculations"),p.timer=setTimeout(function(){p.verbose("DOM tree modified, updating sticky menu"),p.refresh()},100)},contextChanged:function(t){[].forEach.call(t,function(t){t.removedNodes&&[].forEach.call(t.removedNodes,function(t){(t==E||e(t).find(E).length>0)&&(p.debug("Element removed from DOM, tearing down events"),p.destroy())})})},resize:function(){p.debug("Window resized"),h.refreshOnResize&&P(p.refresh)},load:function(){p.debug("Page finished loading"),P(p.refresh)},scroll:function(){h.throttle?(clearTimeout(p.timer),p.timer=setTimeout(function(){A.triggerHandler("scrollchange"+w,[A.scrollTop()])},h.throttle)):P(function(){A.triggerHandler("scrollchange"+w,[A.scrollTop()])})},scrollchange:function(e,t){p.checkVisibility(t)}},precache:function(t,i){t instanceof Array||(t=[t]);for(var o=t.length,a=0,r=[],s=n.createElement("img"),l=function(){++a>=t.length&&e.isFunction(i)&&i()};o--;)(s=n.createElement("img")).onload=l,s.onerror=l,s.src=t[o],r.push(s)},enableCallbacks:function(){p.debug("Allowing callbacks to occur"),F=!1},disableCallbacks:function(){p.debug("Disabling all callbacks temporarily"),F=!0},should:{trackChanges:function(){return u?(p.debug("One time query, no need to bind events"),!1):(p.debug("Callbacks being attached"),!0)}},setup:{cache:function(){p.cache={occurred:{},screen:{},element:{}}},image:function(){var e=T.data(C.src);e&&(p.verbose("Lazy loading image",e),h.once=!0,h.observeChanges=!1,h.onOnScreen=function(){p.debug("Image on screen",E),p.precache(e,function(){p.set.image(e,function(){++m==f&&h.onAllLoaded.call(this),h.onLoad.call(this)})})})},fixed:function(){p.debug("Setting up fixed"),h.once=!1,h.observeChanges=!1,h.initialCheck=!0,h.refreshOnLoad=!0,i.transition||(h.transition=!1),p.create.placeholder(),p.debug("Added placeholder",a),h.onTopPassed=function(){p.debug("Element passed, adding fixed position",T),p.show.placeholder(),p.set.fixed(),h.transition&&void 0!==e.fn.transition&&T.transition(h.transition,h.duration)},h.onTopPassedReverse=function(){p.debug("Element returned to position, removing fixed",T),p.hide.placeholder(),p.remove.fixed()}}},create:{placeholder:function(){p.verbose("Creating fixed position placeholder"),a=T.clone(!1).css("display","none").addClass(b.placeholder).insertAfter(T)}},show:{placeholder:function(){p.verbose("Showing placeholder"),a.css("display","block").css("visibility","hidden")}},hide:{placeholder:function(){p.verbose("Hiding placeholder"),a.css("display","none").css("visibility","")}},set:{fixed:function(){p.verbose("Setting element to fixed position"),T.addClass(b.fixed).css({position:"fixed",top:h.offset+"px",left:"auto",zIndex:h.zIndex}),h.onFixed.call(E)},image:function(t,n){if(T.attr("src",t),h.transition)if(void 0!==e.fn.transition){if(T.hasClass(b.visible))return void p.debug("Transition already occurred on this image, skipping animation");T.transition(h.transition,h.duration,n)}else T.fadeIn(h.duration,n);else T.show()}},is:{onScreen:function(){return p.get.elementCalculations().onScreen},offScreen:function(){return p.get.elementCalculations().offScreen},visible:function(){return!(!p.cache||!p.cache.element)&&!(0===p.cache.element.width&&0===p.cache.element.offset.top)},verticallyScrollableContext:function(){var e=A.get(0)!==t&&A.css("overflow-y");return"auto"==e||"scroll"==e},horizontallyScrollableContext:function(){var e=A.get(0)!==t&&A.css("overflow-x");return"auto"==e||"scroll"==e}},refresh:function(){p.debug("Refreshing constants (width/height)"),"fixed"==h.type&&p.resetFixed(),p.reset(),p.save.position(),h.checkOnRefresh&&p.checkVisibility(),h.onRefresh.call(E)},resetFixed:function(){p.remove.fixed(),p.remove.occurred()},reset:function(){p.verbose("Resetting all cached values"),e.isPlainObject(p.cache)&&(p.cache.screen={},p.cache.element={})},checkVisibility:function(e){p.verbose("Checking visibility of element",p.cache.element),!F&&p.is.visible()&&(p.save.scroll(e),p.save.calculations(),p.passed(),p.passingReverse(),p.topVisibleReverse(),p.bottomVisibleReverse(),p.topPassedReverse(),p.bottomPassedReverse(),p.onScreen(),p.offScreen(),p.passing(),p.topVisible(),p.bottomVisible(),p.topPassed(),p.bottomPassed(),h.onUpdate&&h.onUpdate.call(E,p.get.elementCalculations()))},passed:function(t,n){var i=p.get.elementCalculations();if(t&&n)h.onPassed[t]=n;else{if(void 0!==t)return p.get.pixelsPassed(t)>i.pixelsPassed;i.passing&&e.each(h.onPassed,function(e,t){i.bottomVisible||i.pixelsPassed>p.get.pixelsPassed(e)?p.execute(t,e):h.once||p.remove.occurred(t)})}},onScreen:function(e){var t=p.get.elementCalculations(),n=e||h.onOnScreen;if(e&&(p.debug("Adding callback for onScreen",e),h.onOnScreen=e),t.onScreen?p.execute(n,"onScreen"):h.once||p.remove.occurred("onScreen"),void 0!==e)return t.onOnScreen},offScreen:function(e){var t=p.get.elementCalculations(),n=e||h.onOffScreen;if(e&&(p.debug("Adding callback for offScreen",e),h.onOffScreen=e),t.offScreen?p.execute(n,"offScreen"):h.once||p.remove.occurred("offScreen"),void 0!==e)return t.onOffScreen},passing:function(e){var t=p.get.elementCalculations(),n=e||h.onPassing;if(e&&(p.debug("Adding callback for passing",e),h.onPassing=e),t.passing?p.execute(n,"passing"):h.once||p.remove.occurred("passing"),void 0!==e)return t.passing},topVisible:function(e){var t=p.get.elementCalculations(),n=e||h.onTopVisible;if(e&&(p.debug("Adding callback for top visible",e),h.onTopVisible=e),t.topVisible?p.execute(n,"topVisible"):h.once||p.remove.occurred("topVisible"),void 0===e)return t.topVisible},bottomVisible:function(e){var t=p.get.elementCalculations(),n=e||h.onBottomVisible;if(e&&(p.debug("Adding callback for bottom visible",e),h.onBottomVisible=e),t.bottomVisible?p.execute(n,"bottomVisible"):h.once||p.remove.occurred("bottomVisible"),void 0===e)return t.bottomVisible},topPassed:function(e){var t=p.get.elementCalculations(),n=e||h.onTopPassed;if(e&&(p.debug("Adding callback for top passed",e),h.onTopPassed=e),t.topPassed?p.execute(n,"topPassed"):h.once||p.remove.occurred("topPassed"),void 0===e)return t.topPassed},bottomPassed:function(e){var t=p.get.elementCalculations(),n=e||h.onBottomPassed;if(e&&(p.debug("Adding callback for bottom passed",e),h.onBottomPassed=e),t.bottomPassed?p.execute(n,"bottomPassed"):h.once||p.remove.occurred("bottomPassed"),void 0===e)return t.bottomPassed},passingReverse:function(e){var t=p.get.elementCalculations(),n=e||h.onPassingReverse;if(e&&(p.debug("Adding callback for passing reverse",e),h.onPassingReverse=e),t.passing?h.once||p.remove.occurred("passingReverse"):p.get.occurred("passing")&&p.execute(n,"passingReverse"),void 0!==e)return!t.passing},topVisibleReverse:function(e){var t=p.get.elementCalculations(),n=e||h.onTopVisibleReverse;if(e&&(p.debug("Adding callback for top visible reverse",e),h.onTopVisibleReverse=e),t.topVisible?h.once||p.remove.occurred("topVisibleReverse"):p.get.occurred("topVisible")&&p.execute(n,"topVisibleReverse"),void 0===e)return!t.topVisible},bottomVisibleReverse:function(e){var t=p.get.elementCalculations(),n=e||h.onBottomVisibleReverse,i="bottomVisibleReverse";if(e&&(p.debug("Adding callback for bottom visible reverse",e),h.onBottomVisibleReverse=e),t.bottomVisible?h.once||p.remove.occurred(i):p.get.occurred("bottomVisible")&&p.execute(n,i),void 0===e)return!t.bottomVisible},topPassedReverse:function(e){var t=p.get.elementCalculations(),n=e||h.onTopPassedReverse;if(e&&(p.debug("Adding callback for top passed reverse",e),h.onTopPassedReverse=e),t.topPassed?h.once||p.remove.occurred("topPassedReverse"):p.get.occurred("topPassed")&&p.execute(n,"topPassedReverse"),void 0===e)return!t.onTopPassed},bottomPassedReverse:function(e){var t=p.get.elementCalculations(),n=e||h.onBottomPassedReverse,i="bottomPassedReverse";if(e&&(p.debug("Adding callback for bottom passed reverse",e),h.onBottomPassedReverse=e),t.bottomPassed?h.once||p.remove.occurred(i):p.get.occurred("bottomPassed")&&p.execute(n,i),void 0===e)return!t.bottomPassed},execute:function(e,t){var n=p.get.elementCalculations(),i=p.get.screenCalculations();(e=e||!1)&&(h.continuous?(p.debug("Callback being called continuously",t,n),e.call(E,n,i)):p.get.occurred(t)||(p.debug("Conditions met",t,n),e.call(E,n,i))),p.save.occurred(t)},remove:{fixed:function(){p.debug("Removing fixed position"),T.removeClass(b.fixed).css({position:"",top:"",left:"",zIndex:""}),h.onUnfixed.call(E)},placeholder:function(){p.debug("Removing placeholder content"),a&&a.remove()},occurred:function(e){if(e){var t=p.cache.occurred;void 0!==t[e]&&!0===t[e]&&(p.debug("Callback can now be called again",e),p.cache.occurred[e]=!1)}else p.cache.occurred={}}},save:{calculations:function(){p.verbose("Saving all calculations necessary to determine positioning"),p.save.direction(),p.save.screenCalculations(),p.save.elementCalculations()},occurred:function(e){e&&(void 0!==p.cache.occurred[e]&&!0===p.cache.occurred[e]||(p.verbose("Saving callback occurred",e),p.cache.occurred[e]=!0))},scroll:function(e){e=e+h.offset||A.scrollTop()+h.offset,p.cache.scroll=e},direction:function(){var e,t=p.get.scroll(),n=p.get.lastScroll();return e=t>n&&n?"down":t<n&&n?"up":"static",p.cache.direction=e,p.cache.direction},elementPosition:function(){var e=p.cache.element,t=p.get.screenSize();return p.verbose("Saving element position"),e.fits=e.height<t.height,e.offset=T.offset(),e.width=T.outerWidth(),e.height=T.outerHeight(),p.is.verticallyScrollableContext()&&(e.offset.top+=A.scrollTop()-A.offset().top),p.is.horizontallyScrollableContext()&&(e.offset.left+=A.scrollLeft-A.offset().left),p.cache.element=e,e},elementCalculations:function(){var e=p.get.screenCalculations(),t=p.get.elementPosition();return h.includeMargin?(t.margin={},t.margin.top=parseInt(T.css("margin-top"),10),t.margin.bottom=parseInt(T.css("margin-bottom"),10),t.top=t.offset.top-t.margin.top,t.bottom=t.offset.top+t.height+t.margin.bottom):(t.top=t.offset.top,t.bottom=t.offset.top+t.height),t.topPassed=e.top>=t.top,t.bottomPassed=e.top>=t.bottom,t.topVisible=e.bottom>=t.top&&!t.bottomPassed,t.bottomVisible=e.bottom>=t.bottom&&!t.topPassed,t.pixelsPassed=0,t.percentagePassed=0,t.onScreen=t.topVisible&&!t.bottomPassed,t.passing=t.topPassed&&!t.bottomPassed,t.offScreen=!t.onScreen,t.passing&&(t.pixelsPassed=e.top-t.top,t.percentagePassed=(e.top-t.top)/t.height),p.cache.element=t,p.verbose("Updated element calculations",t),t},screenCalculations:function(){var e=p.get.scroll();return p.save.direction(),p.cache.screen.top=e,p.cache.screen.bottom=e+p.cache.screen.height,p.cache.screen},screenSize:function(){p.verbose("Saving window position"),p.cache.screen={height:A.height()}},position:function(){p.save.screenSize(),p.save.elementPosition()}},get:{pixelsPassed:function(e){var t=p.get.elementCalculations();return e.search("%")>-1?t.height*(parseInt(e,10)/100):parseInt(e,10)},occurred:function(e){return void 0!==p.cache.occurred&&(p.cache.occurred[e]||!1)},direction:function(){return void 0===p.cache.direction&&p.save.direction(),p.cache.direction},elementPosition:function(){return void 0===p.cache.element&&p.save.elementPosition(),p.cache.element},elementCalculations:function(){return void 0===p.cache.element&&p.save.elementCalculations(),p.cache.element},screenCalculations:function(){return void 0===p.cache.screen&&p.save.screenCalculations(),p.cache.screen},screenSize:function(){return void 0===p.cache.screen&&p.save.screenSize(),p.cache.screen},scroll:function(){return void 0===p.cache.scroll&&p.save.scroll(),p.cache.scroll},lastScroll:function(){return void 0===p.cache.screen?(p.debug("First scroll event, no last scroll could be found"),!1):p.cache.screen.top}},setting:function(t,n){if(e.isPlainObject(t))e.extend(!0,h,t);else{if(void 0===n)return h[t];h[t]=n}},internal:function(t,n){if(e.isPlainObject(t))e.extend(!0,p,t);else{if(void 0===n)return p[t];p[t]=n}},debug:function(){!h.silent&&h.debug&&(h.performance?p.performance.log(arguments):(p.debug=Function.prototype.bind.call(console.info,console,h.name+":"),p.debug.apply(console,arguments)))},verbose:function(){!h.silent&&h.verbose&&h.debug&&(h.performance?p.performance.log(arguments):(p.verbose=Function.prototype.bind.call(console.info,console,h.name+":"),p.verbose.apply(console,arguments)))},error:function(){h.silent||(p.error=Function.prototype.bind.call(console.error,console,h.name+":"),p.error.apply(console,arguments))},performance:{log:function(e){var t,n;h.performance&&(n=(t=(new Date).getTime())-(s||t),s=t,l.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:E,"Execution Time":n})),clearTimeout(p.performance.timer),p.performance.timer=setTimeout(p.performance.display,500)},display:function(){var t=h.name+":",n=0;s=!1,clearTimeout(p.performance.timer),e.each(l,function(e,t){n+=t["Execution Time"]}),t+=" "+n+"ms",r&&(t+=" '"+r+"'"),(void 0!==console.group||void 0!==console.table)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,n,i){var a,r,s,l=R;return n=n||d,i=E||i,"string"==typeof t&&void 0!==l&&(t=t.split(/[\. ]/),a=t.length-1,e.each(t,function(n,i){var o=n!=a?i+t[n+1].charAt(0).toUpperCase()+t[n+1].slice(1):t;if(e.isPlainObject(l[o])&&n!=a)l=l[o];else{if(void 0!==l[o])return r=l[o],!1;if(!e.isPlainObject(l[i])||n==a)return void 0!==l[i]?(r=l[i],!1):(p.error(x.method,t),!1);l=l[i]}})),e.isFunction(r)?s=r.apply(i,n):void 0!==r&&(s=r),e.isArray(o)?o.push(s):void 0!==o?o=[o,s]:void 0!==s&&(o=s),r}},u?(void 0===R&&p.initialize(),R.save.scroll(),R.save.calculations(),p.invoke(c)):(void 0!==R&&R.invoke("destroy"),p.initialize())}),void 0!==o?o:this},e.fn.visibility.settings={name:"Visibility",namespace:"visibility",debug:!1,verbose:!1,performance:!0,observeChanges:!0,initialCheck:!0,refreshOnLoad:!0,refreshOnResize:!0,checkOnRefresh:!0,once:!0,continuous:!1,offset:0,includeMargin:!1,context:t,throttle:!1,type:!1,zIndex:"10",transition:"fade in",duration:1e3,onPassed:{},onOnScreen:!1,onOffScreen:!1,onPassing:!1,onTopVisible:!1,onBottomVisible:!1,onTopPassed:!1,onBottomPassed:!1,onPassingReverse:!1,onTopVisibleReverse:!1,onBottomVisibleReverse:!1,onTopPassedReverse:!1,onBottomPassedReverse:!1,onLoad:function(){},onAllLoaded:function(){},onFixed:function(){},onUnfixed:function(){},onUpdate:!1,onRefresh:function(){},metadata:{src:"src"},className:{fixed:"fixed",placeholder:"placeholder",visible:"visible"},error:{method:"The method you called is not defined.",visible:"Element is hidden, you must call refresh after element becomes visible"}}}(jQuery,window,document);
/*
 * Toastr
 * Copyright 2012-2015
 * Authors: John Papa, Hans Fjällemark, and Tim Ferrell.
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * ARIA Support: Greta Krafsig
 *
 * Project: https://github.com/CodeSeven/toastr
 */
/* global define */
(function (define) {
    define(['jquery'], function ($) {
        return (function () {
            var $container;
            var listener;
            var toastId = 0;
            var toastType = {
                error: 'error',
                info: 'info',
                success: 'success',
                warning: 'warning'
            };

            var toastr = {
                clear: clear,
                remove: remove,
                error: error,
                getContainer: getContainer,
                info: info,
                options: {},
                subscribe: subscribe,
                success: success,
                version: '2.1.3',
                warning: warning
            };

            var previousToast;

            return toastr;

            ////////////////

            function error(message, title, optionsOverride) {
                return notify({
                    type: toastType.error,
                    iconClass: getOptions().iconClasses.error,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function getContainer(options, create) {
                if (!options) { options = getOptions(); }
                $container = $('#' + options.containerId);
                if ($container.length) {
                    return $container;
                }
                if (create) {
                    $container = createContainer(options);
                }
                return $container;
            }

            function info(message, title, optionsOverride) {
                return notify({
                    type: toastType.info,
                    iconClass: getOptions().iconClasses.info,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function subscribe(callback) {
                listener = callback;
            }

            function success(message, title, optionsOverride) {
                return notify({
                    type: toastType.success,
                    iconClass: getOptions().iconClasses.success,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function warning(message, title, optionsOverride) {
                return notify({
                    type: toastType.warning,
                    iconClass: getOptions().iconClasses.warning,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function clear($toastElement, clearOptions) {
                var options = getOptions();
                if (!$container) { getContainer(options); }
                if (!clearToast($toastElement, options, clearOptions)) {
                    clearContainer(options);
                }
            }

            function remove($toastElement) {
                var options = getOptions();
                if (!$container) { getContainer(options); }
                if ($toastElement && $(':focus', $toastElement).length === 0) {
                    removeToast($toastElement);
                    return;
                }
                if ($container.children().length) {
                    $container.remove();
                }
            }

            // internal functions

            function clearContainer (options) {
                var toastsToClear = $container.children();
                for (var i = toastsToClear.length - 1; i >= 0; i--) {
                    clearToast($(toastsToClear[i]), options);
                }
            }

            function clearToast ($toastElement, options, clearOptions) {
                var force = clearOptions && clearOptions.force ? clearOptions.force : false;
                if ($toastElement && (force || $(':focus', $toastElement).length === 0)) {
                    $toastElement[options.hideMethod]({
                        duration: options.hideDuration,
                        easing: options.hideEasing,
                        complete: function () { removeToast($toastElement); }
                    });
                    return true;
                }
                return false;
            }

            function createContainer(options) {
                $container = $('<div/>')
                    .attr('id', options.containerId)
                    .addClass(options.positionClass);

                $container.appendTo($(options.target));
                return $container;
            }

            function getDefaults() {
                return {
                    tapToDismiss: true,
                    toastClass: 'toast',
                    containerId: 'toast-container',
                    debug: false,

                    showMethod: 'fadeIn', //fadeIn, slideDown, and show are built into jQuery
                    showDuration: 300,
                    showEasing: 'swing', //swing and linear are built into jQuery
                    onShown: undefined,
                    hideMethod: 'fadeOut',
                    hideDuration: 1000,
                    hideEasing: 'swing',
                    onHidden: undefined,
                    closeMethod: false,
                    closeDuration: false,
                    closeEasing: false,
                    closeOnHover: true,

                    extendedTimeOut: 1000,
                    iconClasses: {
                        error: 'toast-error',
                        info: 'toast-info',
                        success: 'toast-success',
                        warning: 'toast-warning'
                    },
                    iconClass: 'toast-info',
                    positionClass: 'toast-top-right',
                    timeOut: 5000, // Set timeOut and extendedTimeOut to 0 to make it sticky
                    titleClass: 'toast-title',
                    messageClass: 'toast-message',
                    escapeHtml: false,
                    target: 'body',
                    closeHtml: '<button type="button">&times;</button>',
                    closeClass: 'toast-close-button',
                    newestOnTop: true,
                    preventDuplicates: false,
                    progressBar: false,
                    progressClass: 'toast-progress',
                    rtl: false
                };
            }

            function publish(args) {
                if (!listener) { return; }
                listener(args);
            }

            function notify(map) {
                var options = getOptions();
                var iconClass = map.iconClass || options.iconClass;

                if (typeof (map.optionsOverride) !== 'undefined') {
                    options = $.extend(options, map.optionsOverride);
                    iconClass = map.optionsOverride.iconClass || iconClass;
                }

                if (shouldExit(options, map)) { return; }

                toastId++;

                $container = getContainer(options, true);

                var intervalId = null;
                var $toastElement = $('<div/>');
                var $titleElement = $('<div/>');
                var $messageElement = $('<div/>');
                var $progressElement = $('<div/>');
                var $closeElement = $(options.closeHtml);
                var progressBar = {
                    intervalId: null,
                    hideEta: null,
                    maxHideTime: null
                };
                var response = {
                    toastId: toastId,
                    state: 'visible',
                    startTime: new Date(),
                    options: options,
                    map: map
                };

                personalizeToast();

                displayToast();

                handleEvents();

                publish(response);

                if (options.debug && console) {
                    console.log(response);
                }

                return $toastElement;

                function escapeHtml(source) {
                    if (source == null) {
                        source = '';
                    }

                    return source
                        .replace(/&/g, '&amp;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#39;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;');
                }

                function personalizeToast() {
                    setIcon();
                    setTitle();
                    setMessage();
                    setCloseButton();
                    setProgressBar();
                    setRTL();
                    setSequence();
                    setAria();
                }

                function setAria() {
                    var ariaValue = '';
                    switch (map.iconClass) {
                        case 'toast-success':
                        case 'toast-info':
                            ariaValue =  'polite';
                            break;
                        default:
                            ariaValue = 'assertive';
                    }
                    $toastElement.attr('aria-live', ariaValue);
                }

                function handleEvents() {
                    if (options.closeOnHover) {
                        $toastElement.hover(stickAround, delayedHideToast);
                    }

                    if (!options.onclick && options.tapToDismiss) {
                        $toastElement.click(hideToast);
                    }

                    if (options.closeButton && $closeElement) {
                        $closeElement.click(function (event) {
                            if (event.stopPropagation) {
                                event.stopPropagation();
                            } else if (event.cancelBubble !== undefined && event.cancelBubble !== true) {
                                event.cancelBubble = true;
                            }

                            if (options.onCloseClick) {
                                options.onCloseClick(event);
                            }

                            hideToast(true);
                        });
                    }

                    if (options.onclick) {
                        $toastElement.click(function (event) {
                            options.onclick(event);
                            hideToast();
                        });
                    }
                }

                function displayToast() {
                    $toastElement.hide();

                    $toastElement[options.showMethod](
                        {duration: options.showDuration, easing: options.showEasing, complete: options.onShown}
                    );

                    if (options.timeOut > 0) {
                        intervalId = setTimeout(hideToast, options.timeOut);
                        progressBar.maxHideTime = parseFloat(options.timeOut);
                        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
                        if (options.progressBar) {
                            progressBar.intervalId = setInterval(updateProgress, 10);
                        }
                    }
                }

                function setIcon() {
                    if (map.iconClass) {
                        $toastElement.addClass(options.toastClass).addClass(iconClass);
                    }
                }

                function setSequence() {
                    if (options.newestOnTop) {
                        $container.prepend($toastElement);
                    } else {
                        $container.append($toastElement);
                    }
                }

                function setTitle() {
                    if (map.title) {
                        var suffix = map.title;
                        if (options.escapeHtml) {
                            suffix = escapeHtml(map.title);
                        }
                        $titleElement.append(suffix).addClass(options.titleClass);
                        $toastElement.append($titleElement);
                    }
                }

                function setMessage() {
                    if (map.message) {
                        var suffix = map.message;
                        if (options.escapeHtml) {
                            suffix = escapeHtml(map.message);
                        }
                        $messageElement.append(suffix).addClass(options.messageClass);
                        $toastElement.append($messageElement);
                    }
                }

                function setCloseButton() {
                    if (options.closeButton) {
                        $closeElement.addClass(options.closeClass).attr('role', 'button');
                        $toastElement.prepend($closeElement);
                    }
                }

                function setProgressBar() {
                    if (options.progressBar) {
                        $progressElement.addClass(options.progressClass);
                        $toastElement.prepend($progressElement);
                    }
                }

                function setRTL() {
                    if (options.rtl) {
                        $toastElement.addClass('rtl');
                    }
                }

                function shouldExit(options, map) {
                    if (options.preventDuplicates) {
                        if (map.message === previousToast) {
                            return true;
                        } else {
                            previousToast = map.message;
                        }
                    }
                    return false;
                }

                function hideToast(override) {
                    var method = override && options.closeMethod !== false ? options.closeMethod : options.hideMethod;
                    var duration = override && options.closeDuration !== false ?
                        options.closeDuration : options.hideDuration;
                    var easing = override && options.closeEasing !== false ? options.closeEasing : options.hideEasing;
                    if ($(':focus', $toastElement).length && !override) {
                        return;
                    }
                    clearTimeout(progressBar.intervalId);
                    return $toastElement[method]({
                        duration: duration,
                        easing: easing,
                        complete: function () {
                            removeToast($toastElement);
                            clearTimeout(intervalId);
                            if (options.onHidden && response.state !== 'hidden') {
                                options.onHidden();
                            }
                            response.state = 'hidden';
                            response.endTime = new Date();
                            publish(response);
                        }
                    });
                }

                function delayedHideToast() {
                    if (options.timeOut > 0 || options.extendedTimeOut > 0) {
                        intervalId = setTimeout(hideToast, options.extendedTimeOut);
                        progressBar.maxHideTime = parseFloat(options.extendedTimeOut);
                        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
                    }
                }

                function stickAround() {
                    clearTimeout(intervalId);
                    progressBar.hideEta = 0;
                    $toastElement.stop(true, true)[options.showMethod](
                        {duration: options.showDuration, easing: options.showEasing}
                    );
                }

                function updateProgress() {
                    var percentage = ((progressBar.hideEta - (new Date().getTime())) / progressBar.maxHideTime) * 100;
                    $progressElement.width(percentage + '%');
                }
            }

            function getOptions() {
                return $.extend({}, getDefaults(), toastr.options);
            }

            function removeToast($toastElement) {
                if (!$container) { $container = getContainer(); }
                if ($toastElement.is(':visible')) {
                    return;
                }
                $toastElement.remove();
                $toastElement = null;
                if ($container.children().length === 0) {
                    $container.remove();
                    previousToast = undefined;
                }
            }

        })();
    });
}(typeof define === 'function' && define.amd ? define : function (deps, factory) {
    if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('jquery'));
    } else {
        window.toastr = factory(window.jQuery);
    }
}));

//! moment.js
//! version : 2.19.2
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

var hookCallback;

function hooks () {
    return hookCallback.apply(null, arguments);
}

// This is done to register the method called with moment()
// without creating circular dependencies.
function setHookCallback (callback) {
    hookCallback = callback;
}

function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}

function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
}

function isObjectEmpty(obj) {
    if (Object.getOwnPropertyNames) {
        return (Object.getOwnPropertyNames(obj).length === 0);
    } else {
        var k;
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    }
}

function isUndefined(input) {
    return input === void 0;
}

function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
}

function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
}

function map(arr, fn) {
    var res = [], i;
    for (i = 0; i < arr.length; ++i) {
        res.push(fn(arr[i], i));
    }
    return res;
}

function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
}

function extend(a, b) {
    for (var i in b) {
        if (hasOwnProp(b, i)) {
            a[i] = b[i];
        }
    }

    if (hasOwnProp(b, 'toString')) {
        a.toString = b.toString;
    }

    if (hasOwnProp(b, 'valueOf')) {
        a.valueOf = b.valueOf;
    }

    return a;
}

function createUTC (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
}

function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
        empty           : false,
        unusedTokens    : [],
        unusedInput     : [],
        overflow        : -2,
        charsLeftOver   : 0,
        nullInput       : false,
        invalidMonth    : null,
        invalidFormat   : false,
        userInvalidated : false,
        iso             : false,
        parsedDateParts : [],
        meridiem        : null,
        rfc2822         : false,
        weekdayMismatch : false
    };
}

function getParsingFlags(m) {
    if (m._pf == null) {
        m._pf = defaultParsingFlags();
    }
    return m._pf;
}

var some;
if (Array.prototype.some) {
    some = Array.prototype.some;
} else {
    some = function (fun) {
        var t = Object(this);
        var len = t.length >>> 0;

        for (var i = 0; i < len; i++) {
            if (i in t && fun.call(this, t[i], i, t)) {
                return true;
            }
        }

        return false;
    };
}

function isValid(m) {
    if (m._isValid == null) {
        var flags = getParsingFlags(m);
        var parsedParts = some.call(flags.parsedDateParts, function (i) {
            return i != null;
        });
        var isNowValid = !isNaN(m._d.getTime()) &&
            flags.overflow < 0 &&
            !flags.empty &&
            !flags.invalidMonth &&
            !flags.invalidWeekday &&
            !flags.weekdayMismatch &&
            !flags.nullInput &&
            !flags.invalidFormat &&
            !flags.userInvalidated &&
            (!flags.meridiem || (flags.meridiem && parsedParts));

        if (m._strict) {
            isNowValid = isNowValid &&
                flags.charsLeftOver === 0 &&
                flags.unusedTokens.length === 0 &&
                flags.bigHour === undefined;
        }

        if (Object.isFrozen == null || !Object.isFrozen(m)) {
            m._isValid = isNowValid;
        }
        else {
            return isNowValid;
        }
    }
    return m._isValid;
}

function createInvalid (flags) {
    var m = createUTC(NaN);
    if (flags != null) {
        extend(getParsingFlags(m), flags);
    }
    else {
        getParsingFlags(m).userInvalidated = true;
    }

    return m;
}

// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
var momentProperties = hooks.momentProperties = [];

function copyConfig(to, from) {
    var i, prop, val;

    if (!isUndefined(from._isAMomentObject)) {
        to._isAMomentObject = from._isAMomentObject;
    }
    if (!isUndefined(from._i)) {
        to._i = from._i;
    }
    if (!isUndefined(from._f)) {
        to._f = from._f;
    }
    if (!isUndefined(from._l)) {
        to._l = from._l;
    }
    if (!isUndefined(from._strict)) {
        to._strict = from._strict;
    }
    if (!isUndefined(from._tzm)) {
        to._tzm = from._tzm;
    }
    if (!isUndefined(from._isUTC)) {
        to._isUTC = from._isUTC;
    }
    if (!isUndefined(from._offset)) {
        to._offset = from._offset;
    }
    if (!isUndefined(from._pf)) {
        to._pf = getParsingFlags(from);
    }
    if (!isUndefined(from._locale)) {
        to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
        for (i = 0; i < momentProperties.length; i++) {
            prop = momentProperties[i];
            val = from[prop];
            if (!isUndefined(val)) {
                to[prop] = val;
            }
        }
    }

    return to;
}

var updateInProgress = false;

// Moment prototype object
function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
    if (!this.isValid()) {
        this._d = new Date(NaN);
    }
    // Prevent infinite loop in case updateOffset creates new moment
    // objects.
    if (updateInProgress === false) {
        updateInProgress = true;
        hooks.updateOffset(this);
        updateInProgress = false;
    }
}

function isMoment (obj) {
    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
}

function absFloor (number) {
    if (number < 0) {
        // -0 -> 0
        return Math.ceil(number) || 0;
    } else {
        return Math.floor(number);
    }
}

function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = absFloor(coercedNumber);
    }

    return value;
}

// compare two arrays, return the number of differences
function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
        lengthDiff = Math.abs(array1.length - array2.length),
        diffs = 0,
        i;
    for (i = 0; i < len; i++) {
        if ((dontConvert && array1[i] !== array2[i]) ||
            (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
            diffs++;
        }
    }
    return diffs + lengthDiff;
}

function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false &&
            (typeof console !==  'undefined') && console.warn) {
        console.warn('Deprecation warning: ' + msg);
    }
}

function deprecate(msg, fn) {
    var firstTime = true;

    return extend(function () {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(null, msg);
        }
        if (firstTime) {
            var args = [];
            var arg;
            for (var i = 0; i < arguments.length; i++) {
                arg = '';
                if (typeof arguments[i] === 'object') {
                    arg += '\n[' + i + '] ';
                    for (var key in arguments[0]) {
                        arg += key + ': ' + arguments[0][key] + ', ';
                    }
                    arg = arg.slice(0, -2); // Remove trailing comma and space
                } else {
                    arg = arguments[i];
                }
                args.push(arg);
            }
            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
            firstTime = false;
        }
        return fn.apply(this, arguments);
    }, fn);
}

var deprecations = {};

function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(name, msg);
    }
    if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
    }
}

hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;

function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
}

function set (config) {
    var prop, i;
    for (i in config) {
        prop = config[i];
        if (isFunction(prop)) {
            this[i] = prop;
        } else {
            this['_' + i] = prop;
        }
    }
    this._config = config;
    // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.
    this._dayOfMonthOrdinalParseLenient = new RegExp(
        (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
            '|' + (/\d{1,2}/).source);
}

function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig), prop;
    for (prop in childConfig) {
        if (hasOwnProp(childConfig, prop)) {
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                res[prop] = {};
                extend(res[prop], parentConfig[prop]);
                extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
            } else {
                delete res[prop];
            }
        }
    }
    for (prop in parentConfig) {
        if (hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])) {
            // make sure changes to properties don't modify parent config
            res[prop] = extend({}, res[prop]);
        }
    }
    return res;
}

function Locale(config) {
    if (config != null) {
        this.set(config);
    }
}

var keys;

if (Object.keys) {
    keys = Object.keys;
} else {
    keys = function (obj) {
        var i, res = [];
        for (i in obj) {
            if (hasOwnProp(obj, i)) {
                res.push(i);
            }
        }
        return res;
    };
}

var defaultCalendar = {
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    nextWeek : 'dddd [at] LT',
    lastDay : '[Yesterday at] LT',
    lastWeek : '[Last] dddd [at] LT',
    sameElse : 'L'
};

function calendar (key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return isFunction(output) ? output.call(mom, now) : output;
}

var defaultLongDateFormat = {
    LTS  : 'h:mm:ss A',
    LT   : 'h:mm A',
    L    : 'MM/DD/YYYY',
    LL   : 'MMMM D, YYYY',
    LLL  : 'MMMM D, YYYY h:mm A',
    LLLL : 'dddd, MMMM D, YYYY h:mm A'
};

function longDateFormat (key) {
    var format = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
        return format;
    }

    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
        return val.slice(1);
    });

    return this._longDateFormat[key];
}

var defaultInvalidDate = 'Invalid date';

function invalidDate () {
    return this._invalidDate;
}

var defaultOrdinal = '%d';
var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

function ordinal (number) {
    return this._ordinal.replace('%d', number);
}

var defaultRelativeTime = {
    future : 'in %s',
    past   : '%s ago',
    s  : 'a few seconds',
    ss : '%d seconds',
    m  : 'a minute',
    mm : '%d minutes',
    h  : 'an hour',
    hh : '%d hours',
    d  : 'a day',
    dd : '%d days',
    M  : 'a month',
    MM : '%d months',
    y  : 'a year',
    yy : '%d years'
};

function relativeTime (number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return (isFunction(output)) ?
        output(number, withoutSuffix, string, isFuture) :
        output.replace(/%d/i, number);
}

function pastFuture (diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
}

var aliases = {};

function addUnitAlias (unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
}

function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}

function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
        normalizedProp,
        prop;

    for (prop in inputObject) {
        if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
            }
        }
    }

    return normalizedInput;
}

var priorities = {};

function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
}

function getPrioritizedUnits(unitsObj) {
    var units = [];
    for (var u in unitsObj) {
        units.push({unit: u, priority: priorities[u]});
    }
    units.sort(function (a, b) {
        return a.priority - b.priority;
    });
    return units;
}

function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
    return (sign ? (forceSign ? '+' : '') : '-') +
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}

var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

var formatFunctions = {};

var formatTokenFunctions = {};

// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
function addFormatToken (token, padded, ordinal, callback) {
    var func = callback;
    if (typeof callback === 'string') {
        func = function () {
            return this[callback]();
        };
    }
    if (token) {
        formatTokenFunctions[token] = func;
    }
    if (padded) {
        formatTokenFunctions[padded[0]] = function () {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        };
    }
    if (ordinal) {
        formatTokenFunctions[ordinal] = function () {
            return this.localeData().ordinal(func.apply(this, arguments), token);
        };
    }
}

function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, '');
    }
    return input.replace(/\\/g, '');
}

function makeFormatFunction(format) {
    var array = format.match(formattingTokens), i, length;

    for (i = 0, length = array.length; i < length; i++) {
        if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
        } else {
            array[i] = removeFormattingTokens(array[i]);
        }
    }

    return function (mom) {
        var output = '', i;
        for (i = 0; i < length; i++) {
            output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
        }
        return output;
    };
}

// format date using native date object
function formatMoment(m, format) {
    if (!m.isValid()) {
        return m.localeData().invalidDate();
    }

    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

    return formatFunctions[format](m);
}

function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
        return locale.longDateFormat(input) || input;
    }

    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        localFormattingTokens.lastIndex = 0;
        i -= 1;
    }

    return format;
}

var match1         = /\d/;            //       0 - 9
var match2         = /\d\d/;          //      00 - 99
var match3         = /\d{3}/;         //     000 - 999
var match4         = /\d{4}/;         //    0000 - 9999
var match6         = /[+-]?\d{6}/;    // -999999 - 999999
var match1to2      = /\d\d?/;         //       0 - 99
var match3to4      = /\d\d\d\d?/;     //     999 - 9999
var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
var match1to3      = /\d{1,3}/;       //       0 - 999
var match1to4      = /\d{1,4}/;       //       0 - 9999
var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

var matchUnsigned  = /\d+/;           //       0 - inf
var matchSigned    = /[+-]?\d+/;      //    -inf - inf

var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

// any word (or two) characters or numbers including two/three word month in arabic.
// includes scottish gaelic two word and hyphenated months
var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


var regexes = {};

function addRegexToken (token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
        return (isStrict && strictRegex) ? strictRegex : regex;
    };
}

function getParseRegexForToken (token, config) {
    if (!hasOwnProp(regexes, token)) {
        return new RegExp(unescapeFormat(token));
    }

    return regexes[token](config._strict, config._locale);
}

// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function unescapeFormat(s) {
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
    }));
}

function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var tokens = {};

function addParseToken (token, callback) {
    var i, func = callback;
    if (typeof token === 'string') {
        token = [token];
    }
    if (isNumber(callback)) {
        func = function (input, array) {
            array[callback] = toInt(input);
        };
    }
    for (i = 0; i < token.length; i++) {
        tokens[token[i]] = func;
    }
}

function addWeekParseToken (token, callback) {
    addParseToken(token, function (input, array, config, token) {
        config._w = config._w || {};
        callback(input, config._w, config, token);
    });
}

function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
        tokens[token](input, config._a, config, token);
    }
}

var YEAR = 0;
var MONTH = 1;
var DATE = 2;
var HOUR = 3;
var MINUTE = 4;
var SECOND = 5;
var MILLISECOND = 6;
var WEEK = 7;
var WEEKDAY = 8;

// FORMATTING

addFormatToken('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? '' + y : '+' + y;
});

addFormatToken(0, ['YY', 2], 0, function () {
    return this.year() % 100;
});

addFormatToken(0, ['YYYY',   4],       0, 'year');
addFormatToken(0, ['YYYYY',  5],       0, 'year');
addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

// ALIASES

addUnitAlias('year', 'y');

// PRIORITIES

addUnitPriority('year', 1);

// PARSING

addRegexToken('Y',      matchSigned);
addRegexToken('YY',     match1to2, match2);
addRegexToken('YYYY',   match1to4, match4);
addRegexToken('YYYYY',  match1to6, match6);
addRegexToken('YYYYYY', match1to6, match6);

addParseToken(['YYYYY', 'YYYYYY'], YEAR);
addParseToken('YYYY', function (input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken('YY', function (input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken('Y', function (input, array) {
    array[YEAR] = parseInt(input, 10);
});

// HELPERS

function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// HOOKS

hooks.parseTwoDigitYear = function (input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
};

// MOMENTS

var getSetYear = makeGetSet('FullYear', true);

function getIsLeapYear () {
    return isLeapYear(this.year());
}

function makeGetSet (unit, keepTime) {
    return function (value) {
        if (value != null) {
            set$1(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
        } else {
            return get(this, unit);
        }
    };
}

function get (mom, unit) {
    return mom.isValid() ?
        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
}

function set$1 (mom, unit, value) {
    if (mom.isValid() && !isNaN(value)) {
        if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
        }
        else {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }
}

// MOMENTS

function stringGet (units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
        return this[units]();
    }
    return this;
}


function stringSet (units, value) {
    if (typeof units === 'object') {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units);
        for (var i = 0; i < prioritized.length; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
        }
    } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units](value);
        }
    }
    return this;
}

function mod(n, x) {
    return ((n % x) + x) % x;
}

var indexOf;

if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
} else {
    indexOf = function (o) {
        // I know
        var i;
        for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
                return i;
            }
        }
        return -1;
    };
}

function daysInMonth(year, month) {
    if (isNaN(year) || isNaN(month)) {
        return NaN;
    }
    var modMonth = mod(month, 12);
    year += (month - modMonth) / 12;
    return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
}

// FORMATTING

addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
});

addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
});

addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
});

// ALIASES

addUnitAlias('month', 'M');

// PRIORITY

addUnitPriority('month', 8);

// PARSING

addRegexToken('M',    match1to2);
addRegexToken('MM',   match1to2, match2);
addRegexToken('MMM',  function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
});
addRegexToken('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
});

addParseToken(['M', 'MM'], function (input, array) {
    array[MONTH] = toInt(input) - 1;
});

addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict);
    // if we didn't find a month name, mark the date as invalid.
    if (month != null) {
        array[MONTH] = month;
    } else {
        getParsingFlags(config).invalidMonth = input;
    }
});

// LOCALES

var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
function localeMonths (m, format) {
    if (!m) {
        return isArray(this._months) ? this._months :
            this._months['standalone'];
    }
    return isArray(this._months) ? this._months[m.month()] :
        this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
}

var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
function localeMonthsShort (m, format) {
    if (!m) {
        return isArray(this._monthsShort) ? this._monthsShort :
            this._monthsShort['standalone'];
    }
    return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
        this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
}

function handleStrictParse(monthName, format, strict) {
    var i, ii, mom, llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
        // this is not used
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
        for (i = 0; i < 12; ++i) {
            mom = createUTC([2000, i]);
            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'MMM') {
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'MMM') {
            ii = indexOf.call(this._shortMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeMonthsParse (monthName, format, strict) {
    var i, mom, regex;

    if (this._monthsParseExact) {
        return handleStrictParse.call(this, monthName, format, strict);
    }

    if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
    }

    // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
        }
        if (!strict && !this._monthsParse[i]) {
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
            return i;
        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
            return i;
        } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
        }
    }
}

// MOMENTS

function setMonth (mom, value) {
    var dayOfMonth;

    if (!mom.isValid()) {
        // No op
        return mom;
    }

    if (typeof value === 'string') {
        if (/^\d+$/.test(value)) {
            value = toInt(value);
        } else {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (!isNumber(value)) {
                return mom;
            }
        }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
    return mom;
}

function getSetMonth (value) {
    if (value != null) {
        setMonth(this, value);
        hooks.updateOffset(this, true);
        return this;
    } else {
        return get(this, 'Month');
    }
}

function getDaysInMonth () {
    return daysInMonth(this.year(), this.month());
}

var defaultMonthsShortRegex = matchWord;
function monthsShortRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsShortStrictRegex;
        } else {
            return this._monthsShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsShortRegex')) {
            this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict ?
            this._monthsShortStrictRegex : this._monthsShortRegex;
    }
}

var defaultMonthsRegex = matchWord;
function monthsRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsStrictRegex;
        } else {
            return this._monthsRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsRegex')) {
            this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict ?
            this._monthsStrictRegex : this._monthsRegex;
    }
}

function computeMonthsParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom;
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        shortPieces.push(this.monthsShort(mom, ''));
        longPieces.push(this.months(mom, ''));
        mixedPieces.push(this.months(mom, ''));
        mixedPieces.push(this.monthsShort(mom, ''));
    }
    // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
    }
    for (i = 0; i < 24; i++) {
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
}

function createDate (y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date = new Date(y, m, d, h, M, s, ms);

    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
        date.setFullYear(y);
    }
    return date;
}

function createUTCDate (y) {
    var date = new Date(Date.UTC.apply(null, arguments));

    // the Date.UTC function remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
    }
    return date;
}

// start-of-first-week - start-of-year
function firstWeekOffset(year, dow, doy) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
        fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

    return -fwdlw + fwd - 1;
}

// https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear, resDayOfYear;

    if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
    } else {
        resYear = year;
        resDayOfYear = dayOfYear;
    }

    return {
        year: resYear,
        dayOfYear: resDayOfYear
    };
}

function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek, resYear;

    if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
    } else {
        resYear = mom.year();
        resWeek = week;
    }

    return {
        week: resWeek,
        year: resYear
    };
}

function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}

// FORMATTING

addFormatToken('w', ['ww', 2], 'wo', 'week');
addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

// ALIASES

addUnitAlias('week', 'w');
addUnitAlias('isoWeek', 'W');

// PRIORITIES

addUnitPriority('week', 5);
addUnitPriority('isoWeek', 5);

// PARSING

addRegexToken('w',  match1to2);
addRegexToken('ww', match1to2, match2);
addRegexToken('W',  match1to2);
addRegexToken('WW', match1to2, match2);

addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
});

// HELPERS

// LOCALES

function localeWeek (mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
}

var defaultLocaleWeek = {
    dow : 0, // Sunday is the first day of the week.
    doy : 6  // The week that contains Jan 1st is the first week of the year.
};

function localeFirstDayOfWeek () {
    return this._week.dow;
}

function localeFirstDayOfYear () {
    return this._week.doy;
}

// MOMENTS

function getSetWeek (input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
}

function getSetISOWeek (input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
}

// FORMATTING

addFormatToken('d', 0, 'do', 'day');

addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
});

addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
});

addFormatToken('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
});

addFormatToken('e', 0, 0, 'weekday');
addFormatToken('E', 0, 0, 'isoWeekday');

// ALIASES

addUnitAlias('day', 'd');
addUnitAlias('weekday', 'e');
addUnitAlias('isoWeekday', 'E');

// PRIORITY
addUnitPriority('day', 11);
addUnitPriority('weekday', 11);
addUnitPriority('isoWeekday', 11);

// PARSING

addRegexToken('d',    match1to2);
addRegexToken('e',    match1to2);
addRegexToken('E',    match1to2);
addRegexToken('dd',   function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
});
addRegexToken('ddd',   function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
});
addRegexToken('dddd',   function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
});

addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
    // if we didn't get a weekday name, mark the date as invalid
    if (weekday != null) {
        week.d = weekday;
    } else {
        getParsingFlags(config).invalidWeekday = input;
    }
});

addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = toInt(input);
});

// HELPERS

function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
        return input;
    }

    if (!isNaN(input)) {
        return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);
    if (typeof input === 'number') {
        return input;
    }

    return null;
}

function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
        return locale.weekdaysParse(input) % 7 || 7;
    }
    return isNaN(input) ? null : input;
}

// LOCALES

var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
function localeWeekdays (m, format) {
    if (!m) {
        return isArray(this._weekdays) ? this._weekdays :
            this._weekdays['standalone'];
    }
    return isArray(this._weekdays) ? this._weekdays[m.day()] :
        this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
}

var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
function localeWeekdaysShort (m) {
    return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}

var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
function localeWeekdaysMin (m) {
    return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}

function handleStrictParse$1(weekdayName, format, strict) {
    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._minWeekdaysParse = [];

        for (i = 0; i < 7; ++i) {
            mom = createUTC([2000, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'dddd') {
            ii = indexOf.call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'dddd') {
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeWeekdaysParse (weekdayName, format, strict) {
    var i, mom, regex;

    if (this._weekdaysParseExact) {
        return handleStrictParse$1.call(this, weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already

        mom = createUTC([2000, 1]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
        }
        if (!this._weekdaysParse[i]) {
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
        }
    }
}

// MOMENTS

function getSetDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, 'd');
    } else {
        return day;
    }
}

function getSetLocaleDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
}

function getSetISODayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }

    // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.

    if (input != null) {
        var weekday = parseIsoWeekday(input, this.localeData());
        return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
        return this.day() || 7;
    }
}

var defaultWeekdaysRegex = matchWord;
function weekdaysRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysStrictRegex;
        } else {
            return this._weekdaysRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            this._weekdaysRegex = defaultWeekdaysRegex;
        }
        return this._weekdaysStrictRegex && isStrict ?
            this._weekdaysStrictRegex : this._weekdaysRegex;
    }
}

var defaultWeekdaysShortRegex = matchWord;
function weekdaysShortRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysShortStrictRegex;
        } else {
            return this._weekdaysShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysShortRegex')) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
        }
        return this._weekdaysShortStrictRegex && isStrict ?
            this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
}

var defaultWeekdaysMinRegex = matchWord;
function weekdaysMinRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysMinStrictRegex;
        } else {
            return this._weekdaysMinRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysMinRegex')) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
        }
        return this._weekdaysMinStrictRegex && isStrict ?
            this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
}


function computeWeekdaysParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom, minp, shortp, longp;
    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, 1]).day(i);
        minp = this.weekdaysMin(mom, '');
        shortp = this.weekdaysShort(mom, '');
        longp = this.weekdays(mom, '');
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
    }
    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 7; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;

    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
}

// FORMATTING

function hFormat() {
    return this.hours() % 12 || 12;
}

function kFormat() {
    return this.hours() || 24;
}

addFormatToken('H', ['HH', 2], 0, 'hour');
addFormatToken('h', ['hh', 2], 0, hFormat);
addFormatToken('k', ['kk', 2], 0, kFormat);

addFormatToken('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});

addFormatToken('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

addFormatToken('Hmm', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2);
});

addFormatToken('Hmmss', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

function meridiem (token, lowercase) {
    addFormatToken(token, 0, 0, function () {
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
}

meridiem('a', true);
meridiem('A', false);

// ALIASES

addUnitAlias('hour', 'h');

// PRIORITY
addUnitPriority('hour', 13);

// PARSING

function matchMeridiem (isStrict, locale) {
    return locale._meridiemParse;
}

addRegexToken('a',  matchMeridiem);
addRegexToken('A',  matchMeridiem);
addRegexToken('H',  match1to2);
addRegexToken('h',  match1to2);
addRegexToken('k',  match1to2);
addRegexToken('HH', match1to2, match2);
addRegexToken('hh', match1to2, match2);
addRegexToken('kk', match1to2, match2);

addRegexToken('hmm', match3to4);
addRegexToken('hmmss', match5to6);
addRegexToken('Hmm', match3to4);
addRegexToken('Hmmss', match5to6);

addParseToken(['H', 'HH'], HOUR);
addParseToken(['k', 'kk'], function (input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
});
addParseToken(['h', 'hh'], function (input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
});
addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
});
addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
});

// LOCALES

function localeIsPM (input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return ((input + '').toLowerCase().charAt(0) === 'p');
}

var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
function localeMeridiem (hours, minutes, isLower) {
    if (hours > 11) {
        return isLower ? 'pm' : 'PM';
    } else {
        return isLower ? 'am' : 'AM';
    }
}


// MOMENTS

// Setting the hour should keep the time, because the user explicitly
// specified which hour he wants. So trying to maintain the same hour (in
// a new timezone) makes sense. Adding/subtracting hours does not follow
// this rule.
var getSetHour = makeGetSet('Hours', true);

// months
// week
// weekdays
// meridiem
var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,

    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,

    week: defaultLocaleWeek,

    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,

    meridiemParse: defaultLocaleMeridiemParse
};

// internal storage for locale config files
var locales = {};
var localeFamilies = {};
var globalLocale;

function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
}

// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
function chooseLocale(names) {
    var i = 0, j, next, locale, split;

    while (i < names.length) {
        split = normalizeLocale(names[i]).split('-');
        j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split('-') : null;
        while (j > 0) {
            locale = loadLocale(split.slice(0, j).join('-'));
            if (locale) {
                return locale;
            }
            if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                //the next array item is better than a shallower substring of this one
                break;
            }
            j--;
        }
        i++;
    }
    return null;
}

function loadLocale(name) {
    var oldLocale = null;
    // TODO: Find a better way to register and load all the locales in Node
    if (!locales[name] && (typeof module !== 'undefined') &&
            module && module.exports) {
        try {
            oldLocale = globalLocale._abbr;
            var aliasedRequire = require;
            aliasedRequire('./locale/' + name);
            getSetGlobalLocale(oldLocale);
        } catch (e) {}
    }
    return locales[name];
}

// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
function getSetGlobalLocale (key, values) {
    var data;
    if (key) {
        if (isUndefined(values)) {
            data = getLocale(key);
        }
        else {
            data = defineLocale(key, values);
        }

        if (data) {
            // moment.duration._locale = moment._locale = data;
            globalLocale = data;
        }
    }

    return globalLocale._abbr;
}

function defineLocale (name, config) {
    if (config !== null) {
        var parentConfig = baseConfig;
        config.abbr = name;
        if (locales[name] != null) {
            deprecateSimple('defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                    'an existing locale. moment.defineLocale(localeName, ' +
                    'config) should only be used for creating a new locale ' +
                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
            parentConfig = locales[name]._config;
        } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
                parentConfig = locales[config.parentLocale]._config;
            } else {
                if (!localeFamilies[config.parentLocale]) {
                    localeFamilies[config.parentLocale] = [];
                }
                localeFamilies[config.parentLocale].push({
                    name: name,
                    config: config
                });
                return null;
            }
        }
        locales[name] = new Locale(mergeConfigs(parentConfig, config));

        if (localeFamilies[name]) {
            localeFamilies[name].forEach(function (x) {
                defineLocale(x.name, x.config);
            });
        }

        // backwards compat for now: also set the locale
        // make sure we set the locale AFTER all child locales have been
        // created, so we won't end up with the child locale set.
        getSetGlobalLocale(name);


        return locales[name];
    } else {
        // useful for testing
        delete locales[name];
        return null;
    }
}

function updateLocale(name, config) {
    if (config != null) {
        var locale, tmpLocale, parentConfig = baseConfig;
        // MERGE
        tmpLocale = loadLocale(name);
        if (tmpLocale != null) {
            parentConfig = tmpLocale._config;
        }
        config = mergeConfigs(parentConfig, config);
        locale = new Locale(config);
        locale.parentLocale = locales[name];
        locales[name] = locale;

        // backwards compat for now: also set the locale
        getSetGlobalLocale(name);
    } else {
        // pass null for config to unupdate, useful for tests
        if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
            } else if (locales[name] != null) {
                delete locales[name];
            }
        }
    }
    return locales[name];
}

// returns locale data
function getLocale (key) {
    var locale;

    if (key && key._locale && key._locale._abbr) {
        key = key._locale._abbr;
    }

    if (!key) {
        return globalLocale;
    }

    if (!isArray(key)) {
        //short-circuit everything else
        locale = loadLocale(key);
        if (locale) {
            return locale;
        }
        key = [key];
    }

    return chooseLocale(key);
}

function listLocales() {
    return keys(locales);
}

function checkOverflow (m) {
    var overflow;
    var a = m._a;

    if (a && getParsingFlags(m).overflow === -2) {
        overflow =
            a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
            a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
            a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
            a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
            a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
            a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
            -1;

        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
        }
        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
            overflow = WEEK;
        }
        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
            overflow = WEEKDAY;
        }

        getParsingFlags(m).overflow = overflow;
    }

    return m;
}

// Pick the first defined of two or three arguments.
function defaults(a, b, c) {
    if (a != null) {
        return a;
    }
    if (b != null) {
        return b;
    }
    return c;
}

function currentDateArray(config) {
    // hooks is actually the exported moment object
    var nowValue = new Date(hooks.now());
    if (config._useUTC) {
        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}

// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
function configFromArray (config) {
    var i, date, input = [], currentDate, yearToUse;

    if (config._d) {
        return;
    }

    currentDate = currentDateArray(config);

    //compute day of the year from weeks and weekdays
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config);
    }

    //if the day of the year is set, figure out what it is
    if (config._dayOfYear != null) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
        }

        date = createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
    }

    // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
    }

    // Zero out whatever was not defaulted, including time
    for (; i < 7; i++) {
        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
    }

    // Check for 24:00:00.000
    if (config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0) {
        config._nextDay = true;
        config._a[HOUR] = 0;
    }

    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.
    if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }

    if (config._nextDay) {
        config._a[HOUR] = 24;
    }

    // check for mismatching day of week
    if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== config._d.getDay()) {
        getParsingFlags(config).weekdayMismatch = true;
    }
}

function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;

        // TODO: We need to take the current isoWeekYear, but that depends on
        // how we interpret now (local, utc, fixed offset). So create
        // a now version of current config (take local/utc/offset flags, and
        // create now).
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
        }
    } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;

        var curWeek = weekOfYear(createLocal(), dow, doy);

        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

        // Default to current week.
        week = defaults(w.w, curWeek.week);

        if (w.d != null) {
            // weekday -- low day numbers are considered next week
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
            }
        } else if (w.e != null) {
            // local weekday -- counting starts from begining of week
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
            }
        } else {
            // default to begining of week
            weekday = dow;
        }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
    } else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
}

// iso 8601 regex
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

var isoDates = [
    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
    ['YYYY-DDD', /\d{4}-\d{3}/],
    ['YYYY-MM', /\d{4}-\d\d/, false],
    ['YYYYYYMMDD', /[+-]\d{10}/],
    ['YYYYMMDD', /\d{8}/],
    // YYYYMM is NOT allowed by the standard
    ['GGGG[W]WWE', /\d{4}W\d{3}/],
    ['GGGG[W]WW', /\d{4}W\d{2}/, false],
    ['YYYYDDD', /\d{7}/]
];

// iso time formats and regexes
var isoTimes = [
    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
    ['HH:mm', /\d\d:\d\d/],
    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
    ['HHmmss', /\d\d\d\d\d\d/],
    ['HHmm', /\d\d\d\d/],
    ['HH', /\d\d/]
];

var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

// date from iso format
function configFromISO(config) {
    var i, l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime, dateFormat, timeFormat, tzFormat;

    if (match) {
        getParsingFlags(config).iso = true;

        for (i = 0, l = isoDates.length; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
            }
        }
        if (dateFormat == null) {
            config._isValid = false;
            return;
        }
        if (match[3]) {
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                    // match[2] should be 'T' or space
                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
                    break;
                }
            }
            if (timeFormat == null) {
                config._isValid = false;
                return;
            }
        }
        if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
        }
        if (match[4]) {
            if (tzRegex.exec(match[4])) {
                tzFormat = 'Z';
            } else {
                config._isValid = false;
                return;
            }
        }
        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
        configFromStringAndFormat(config);
    } else {
        config._isValid = false;
    }
}

// RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    var result = [
        untruncateYear(yearStr),
        defaultLocaleMonthsShort.indexOf(monthStr),
        parseInt(dayStr, 10),
        parseInt(hourStr, 10),
        parseInt(minuteStr, 10)
    ];

    if (secondStr) {
        result.push(parseInt(secondStr, 10));
    }

    return result;
}

function untruncateYear(yearStr) {
    var year = parseInt(yearStr, 10);
    if (year <= 49) {
        return 2000 + year;
    } else if (year <= 999) {
        return 1900 + year;
    }
    return year;
}

function preprocessRFC2822(s) {
    // Remove comments and folding whitespace and replace multiple-spaces with a single space
    return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').trim();
}

function checkWeekday(weekdayStr, parsedInput, config) {
    if (weekdayStr) {
        // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
        var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
            weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
        if (weekdayProvided !== weekdayActual) {
            getParsingFlags(config).weekdayMismatch = true;
            config._isValid = false;
            return false;
        }
    }
    return true;
}

var obsOffsets = {
    UT: 0,
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60
};

function calculateOffset(obsOffset, militaryOffset, numOffset) {
    if (obsOffset) {
        return obsOffsets[obsOffset];
    } else if (militaryOffset) {
        // the only allowed military tz is Z
        return 0;
    } else {
        var hm = parseInt(numOffset, 10);
        var m = hm % 100, h = (hm - m) / 100;
        return h * 60 + m;
    }
}

// date and time from ref 2822 format
function configFromRFC2822(config) {
    var match = rfc2822.exec(preprocessRFC2822(config._i));
    if (match) {
        var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
        if (!checkWeekday(match[1], parsedArray, config)) {
            return;
        }

        config._a = parsedArray;
        config._tzm = calculateOffset(match[8], match[9], match[10]);

        config._d = createUTCDate.apply(null, config._a);
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

        getParsingFlags(config).rfc2822 = true;
    } else {
        config._isValid = false;
    }
}

// date from iso format or fallback
function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);

    if (matched !== null) {
        config._d = new Date(+matched[1]);
        return;
    }

    configFromISO(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    configFromRFC2822(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    // Final attempt, use Input Fallback
    hooks.createFromInputFallback(config);
}

hooks.createFromInputFallback = deprecate(
    'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
    'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
    'discouraged and will be removed in an upcoming major release. Please refer to ' +
    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
    function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    }
);

// constant that refers to the ISO standard
hooks.ISO_8601 = function () {};

// constant that refers to the RFC 2822 form
hooks.RFC_2822 = function () {};

// date from string and format string
function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks.ISO_8601) {
        configFromISO(config);
        return;
    }
    if (config._f === hooks.RFC_2822) {
        configFromRFC2822(config);
        return;
    }
    config._a = [];
    getParsingFlags(config).empty = true;

    // This array is used to make a Date, either with `new Date` or `Date.UTC`
    var string = '' + config._i,
        i, parsedInput, tokens, token, skipped,
        stringLength = string.length,
        totalParsedInputLength = 0;

    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
        // console.log('token', token, 'parsedInput', parsedInput,
        //         'regex', getParseRegexForToken(token, config));
        if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
                getParsingFlags(config).unusedInput.push(skipped);
            }
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
        }
        // don't parse if it's not a known token
        if (formatTokenFunctions[token]) {
            if (parsedInput) {
                getParsingFlags(config).empty = false;
            }
            else {
                getParsingFlags(config).unusedTokens.push(token);
            }
            addTimeToArrayFromToken(token, parsedInput, config);
        }
        else if (config._strict && !parsedInput) {
            getParsingFlags(config).unusedTokens.push(token);
        }
    }

    // add remaining unparsed input length to the string
    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
        getParsingFlags(config).unusedInput.push(string);
    }

    // clear _12h flag if hour is <= 12
    if (config._a[HOUR] <= 12 &&
        getParsingFlags(config).bigHour === true &&
        config._a[HOUR] > 0) {
        getParsingFlags(config).bigHour = undefined;
    }

    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem;
    // handle meridiem
    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

    configFromArray(config);
    checkOverflow(config);
}


function meridiemFixWrap (locale, hour, meridiem) {
    var isPm;

    if (meridiem == null) {
        // nothing to do
        return hour;
    }
    if (locale.meridiemHour != null) {
        return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
        // Fallback
        isPm = locale.isPM(meridiem);
        if (isPm && hour < 12) {
            hour += 12;
        }
        if (!isPm && hour === 12) {
            hour = 0;
        }
        return hour;
    } else {
        // this is not supposed to happen
        return hour;
    }
}

// date from string and array of format strings
function configFromStringAndArray(config) {
    var tempConfig,
        bestMoment,

        scoreToBeat,
        i,
        currentScore;

    if (config._f.length === 0) {
        getParsingFlags(config).invalidFormat = true;
        config._d = new Date(NaN);
        return;
    }

    for (i = 0; i < config._f.length; i++) {
        currentScore = 0;
        tempConfig = copyConfig({}, config);
        if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        configFromStringAndFormat(tempConfig);

        if (!isValid(tempConfig)) {
            continue;
        }

        // if there is any input that was not parsed add a penalty for that format
        currentScore += getParsingFlags(tempConfig).charsLeftOver;

        //or tokens
        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

        getParsingFlags(tempConfig).score = currentScore;

        if (scoreToBeat == null || currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
        }
    }

    extend(config, bestMoment || tempConfig);
}

function configFromObject(config) {
    if (config._d) {
        return;
    }

    var i = normalizeObjectUnits(config._i);
    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
        return obj && parseInt(obj, 10);
    });

    configFromArray(config);
}

function createFromConfig (config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));
    if (res._nextDay) {
        // Adding is smart enough around DST
        res.add(1, 'd');
        res._nextDay = undefined;
    }

    return res;
}

function prepareConfig (config) {
    var input = config._i,
        format = config._f;

    config._locale = config._locale || getLocale(config._l);

    if (input === null || (format === undefined && input === '')) {
        return createInvalid({nullInput: true});
    }

    if (typeof input === 'string') {
        config._i = input = config._locale.preparse(input);
    }

    if (isMoment(input)) {
        return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
        config._d = input;
    } else if (isArray(format)) {
        configFromStringAndArray(config);
    } else if (format) {
        configFromStringAndFormat(config);
    }  else {
        configFromInput(config);
    }

    if (!isValid(config)) {
        config._d = null;
    }

    return config;
}

function configFromInput(config) {
    var input = config._i;
    if (isUndefined(input)) {
        config._d = new Date(hooks.now());
    } else if (isDate(input)) {
        config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
        configFromString(config);
    } else if (isArray(input)) {
        config._a = map(input.slice(0), function (obj) {
            return parseInt(obj, 10);
        });
        configFromArray(config);
    } else if (isObject(input)) {
        configFromObject(config);
    } else if (isNumber(input)) {
        // from milliseconds
        config._d = new Date(input);
    } else {
        hooks.createFromInputFallback(config);
    }
}

function createLocalOrUTC (input, format, locale, strict, isUTC) {
    var c = {};

    if (locale === true || locale === false) {
        strict = locale;
        locale = undefined;
    }

    if ((isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)) {
        input = undefined;
    }
    // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423
    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;

    return createFromConfig(c);
}

function createLocal (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
}

var prototypeMin = deprecate(
    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

var prototypeMax = deprecate(
    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
function pickBy(fn, moments) {
    var res, i;
    if (moments.length === 1 && isArray(moments[0])) {
        moments = moments[0];
    }
    if (!moments.length) {
        return createLocal();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
        }
    }
    return res;
}

// TODO: Use [].sort instead?
function min () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isBefore', args);
}

function max () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isAfter', args);
}

var now = function () {
    return Date.now ? Date.now() : +(new Date());
};

var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

function isDurationValid(m) {
    for (var key in m) {
        if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
        }
    }

    var unitHasDecimal = false;
    for (var i = 0; i < ordering.length; ++i) {
        if (m[ordering[i]]) {
            if (unitHasDecimal) {
                return false; // only allow non-integers for smallest unit
            }
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                unitHasDecimal = true;
            }
        }
    }

    return true;
}

function isValid$1() {
    return this._isValid;
}

function createInvalid$1() {
    return createDuration(NaN);
}

function Duration (duration) {
    var normalizedInput = normalizeObjectUnits(duration),
        years = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months = normalizedInput.month || 0,
        weeks = normalizedInput.week || 0,
        days = normalizedInput.day || 0,
        hours = normalizedInput.hour || 0,
        minutes = normalizedInput.minute || 0,
        seconds = normalizedInput.second || 0,
        milliseconds = normalizedInput.millisecond || 0;

    this._isValid = isDurationValid(normalizedInput);

    // representation for dateAddRemove
    this._milliseconds = +milliseconds +
        seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +days +
        weeks * 7;
    // It is impossible to translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = +months +
        quarters * 3 +
        years * 12;

    this._data = {};

    this._locale = getLocale();

    this._bubble();
}

function isDuration (obj) {
    return obj instanceof Duration;
}

function absRound (number) {
    if (number < 0) {
        return Math.round(-1 * number) * -1;
    } else {
        return Math.round(number);
    }
}

// FORMATTING

function offset (token, separator) {
    addFormatToken(token, 0, 0, function () {
        var offset = this.utcOffset();
        var sign = '+';
        if (offset < 0) {
            offset = -offset;
            sign = '-';
        }
        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
    });
}

offset('Z', ':');
offset('ZZ', '');

// PARSING

addRegexToken('Z',  matchShortOffset);
addRegexToken('ZZ', matchShortOffset);
addParseToken(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
});

// HELPERS

// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
var chunkOffset = /([\+\-]|\d\d)/gi;

function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher);

    if (matches === null) {
        return null;
    }

    var chunk   = matches[matches.length - 1] || [];
    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    var minutes = +(parts[1] * 60) + toInt(parts[2]);

    return minutes === 0 ?
      0 :
      parts[0] === '+' ? minutes : -minutes;
}

// Return a moment from input, that is local/utc/zone equivalent to model.
function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
        res = model.clone();
        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
        // Use low-level api, because this fn is low-level api.
        res._d.setTime(res._d.valueOf() + diff);
        hooks.updateOffset(res, false);
        return res;
    } else {
        return createLocal(input).local();
    }
}

function getDateOffset (m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
}

// HOOKS

// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
hooks.updateOffset = function () {};

// MOMENTS

// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
function getSetOffset (input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
        localAdjust;
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    if (input != null) {
        if (typeof input === 'string') {
            input = offsetFromString(matchShortOffset, input);
            if (input === null) {
                return this;
            }
        } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
            this.add(localAdjust, 'm');
        }
        if (offset !== input) {
            if (!keepLocalTime || this._changeInProgress) {
                addSubtract(this, createDuration(input - offset, 'm'), 1, false);
            } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                hooks.updateOffset(this, true);
                this._changeInProgress = null;
            }
        }
        return this;
    } else {
        return this._isUTC ? offset : getDateOffset(this);
    }
}

function getSetZone (input, keepLocalTime) {
    if (input != null) {
        if (typeof input !== 'string') {
            input = -input;
        }

        this.utcOffset(input, keepLocalTime);

        return this;
    } else {
        return -this.utcOffset();
    }
}

function setOffsetToUTC (keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
}

function setOffsetToLocal (keepLocalTime) {
    if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;

        if (keepLocalTime) {
            this.subtract(getDateOffset(this), 'm');
        }
    }
    return this;
}

function setOffsetToParsedOffset () {
    if (this._tzm != null) {
        this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
        var tZone = offsetFromString(matchOffset, this._i);
        if (tZone != null) {
            this.utcOffset(tZone);
        }
        else {
            this.utcOffset(0, true);
        }
    }
    return this;
}

function hasAlignedHourOffset (input) {
    if (!this.isValid()) {
        return false;
    }
    input = input ? createLocal(input).utcOffset() : 0;

    return (this.utcOffset() - input) % 60 === 0;
}

function isDaylightSavingTime () {
    return (
        this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset()
    );
}

function isDaylightSavingTimeShifted () {
    if (!isUndefined(this._isDSTShifted)) {
        return this._isDSTShifted;
    }

    var c = {};

    copyConfig(c, this);
    c = prepareConfig(c);

    if (c._a) {
        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
        this._isDSTShifted = this.isValid() &&
            compareArrays(c._a, other.toArray()) > 0;
    } else {
        this._isDSTShifted = false;
    }

    return this._isDSTShifted;
}

function isLocal () {
    return this.isValid() ? !this._isUTC : false;
}

function isUtcOffset () {
    return this.isValid() ? this._isUTC : false;
}

function isUtc () {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
}

// ASP.NET json date format regex
var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
// and further modified to allow for strings containing both week and day
var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

function createDuration (input, key) {
    var duration = input,
        // matching against regexp is expensive, do it on demand
        match = null,
        sign,
        ret,
        diffRes;

    if (isDuration(input)) {
        duration = {
            ms : input._milliseconds,
            d  : input._days,
            M  : input._months
        };
    } else if (isNumber(input)) {
        duration = {};
        if (key) {
            duration[key] = input;
        } else {
            duration.milliseconds = input;
        }
    } else if (!!(match = aspNetRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y  : 0,
            d  : toInt(match[DATE])                         * sign,
            h  : toInt(match[HOUR])                         * sign,
            m  : toInt(match[MINUTE])                       * sign,
            s  : toInt(match[SECOND])                       * sign,
            ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
        };
    } else if (!!(match = isoRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : (match[1] === '+') ? 1 : 1;
        duration = {
            y : parseIso(match[2], sign),
            M : parseIso(match[3], sign),
            w : parseIso(match[4], sign),
            d : parseIso(match[5], sign),
            h : parseIso(match[6], sign),
            m : parseIso(match[7], sign),
            s : parseIso(match[8], sign)
        };
    } else if (duration == null) {// checks for null or undefined
        duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

        duration = {};
        duration.ms = diffRes.milliseconds;
        duration.M = diffRes.months;
    }

    ret = new Duration(duration);

    if (isDuration(input) && hasOwnProp(input, '_locale')) {
        ret._locale = input._locale;
    }

    return ret;
}

createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;

function parseIso (inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res = inp && parseFloat(inp.replace(',', '.'));
    // apply sign while we're at it
    return (isNaN(res) ? 0 : res) * sign;
}

function positiveMomentsDifference(base, other) {
    var res = {milliseconds: 0, months: 0};

    res.months = other.month() - base.month() +
        (other.year() - base.year()) * 12;
    if (base.clone().add(res.months, 'M').isAfter(other)) {
        --res.months;
    }

    res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

    return res;
}

function momentsDifference(base, other) {
    var res;
    if (!(base.isValid() && other.isValid())) {
        return {milliseconds: 0, months: 0};
    }

    other = cloneWithOffset(other, base);
    if (base.isBefore(other)) {
        res = positiveMomentsDifference(base, other);
    } else {
        res = positiveMomentsDifference(other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
    }

    return res;
}

// TODO: remove 'name' arg after deprecation is removed
function createAdder(direction, name) {
    return function (val, period) {
        var dur, tmp;
        //invert the arguments, but complain about it
        if (period !== null && !isNaN(+period)) {
            deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
            tmp = val; val = period; period = tmp;
        }

        val = typeof val === 'string' ? +val : val;
        dur = createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
    };
}

function addSubtract (mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months);

    if (!mom.isValid()) {
        // No op
        return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (months) {
        setMonth(mom, get(mom, 'Month') + months * isAdding);
    }
    if (days) {
        set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
    }
    if (milliseconds) {
        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }
    if (updateOffset) {
        hooks.updateOffset(mom, days || months);
    }
}

var add      = createAdder(1, 'add');
var subtract = createAdder(-1, 'subtract');

function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' :
            diff < -1 ? 'lastWeek' :
            diff < 0 ? 'lastDay' :
            diff < 1 ? 'sameDay' :
            diff < 2 ? 'nextDay' :
            diff < 7 ? 'nextWeek' : 'sameElse';
}

function calendar$1 (time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        format = hooks.calendarFormat(this, sod) || 'sameElse';

    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
}

function clone () {
    return new Moment(this);
}

function isAfter (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() > localInput.valueOf();
    } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
}

function isBefore (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() < localInput.valueOf();
    } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
}

function isBetween (from, to, units, inclusivity) {
    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
}

function isSame (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(units || 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() === localInput.valueOf();
    } else {
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
}

function isSameOrAfter (input, units) {
    return this.isSame(input, units) || this.isAfter(input,units);
}

function isSameOrBefore (input, units) {
    return this.isSame(input, units) || this.isBefore(input,units);
}

function diff (input, units, asFloat) {
    var that,
        zoneDelta,
        delta, output;

    if (!this.isValid()) {
        return NaN;
    }

    that = cloneWithOffset(input, this);

    if (!that.isValid()) {
        return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

    units = normalizeUnits(units);

    switch (units) {
        case 'year': output = monthDiff(this, that) / 12; break;
        case 'month': output = monthDiff(this, that); break;
        case 'quarter': output = monthDiff(this, that) / 3; break;
        case 'second': output = (this - that) / 1e3; break; // 1000
        case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
        case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
        case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
        case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
        default: output = this - that;
    }

    return asFloat ? output : absFloor(output);
}

function monthDiff (a, b) {
    // difference in months
    var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
        anchor = a.clone().add(wholeMonthDiff, 'months'),
        anchor2, adjust;

    if (b - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor - anchor2);
    } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor2 - anchor);
    }

    //check for negative zero, return zero if negative zero
    return -(wholeMonthDiff + adjust) || 0;
}

hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

function toString () {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
}

function toISOString() {
    if (!this.isValid()) {
        return null;
    }
    var m = this.clone().utc();
    if (m.year() < 0 || m.year() > 9999) {
        return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    }
    if (isFunction(Date.prototype.toISOString)) {
        // native implementation is ~50x faster, use it when we can
        return this.toDate().toISOString();
    }
    return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
}

/**
 * Return a human readable representation of a moment that can
 * also be evaluated to get a new moment which is the same
 *
 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
 */
function inspect () {
    if (!this.isValid()) {
        return 'moment.invalid(/* ' + this._i + ' */)';
    }
    var func = 'moment';
    var zone = '';
    if (!this.isLocal()) {
        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
        zone = 'Z';
    }
    var prefix = '[' + func + '("]';
    var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
    var suffix = zone + '[")]';

    return this.format(prefix + year + datetime + suffix);
}

function format (inputString) {
    if (!inputString) {
        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }
    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
}

function from (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function fromNow (withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
}

function to (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function toNow (withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
}

// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
function locale (key) {
    var newLocaleData;

    if (key === undefined) {
        return this._locale._abbr;
    } else {
        newLocaleData = getLocale(key);
        if (newLocaleData != null) {
            this._locale = newLocaleData;
        }
        return this;
    }
}

var lang = deprecate(
    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
    function (key) {
        if (key === undefined) {
            return this.localeData();
        } else {
            return this.locale(key);
        }
    }
);

function localeData () {
    return this._locale;
}

function startOf (units) {
    units = normalizeUnits(units);
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
    }

    // weeks are a special case
    if (units === 'week') {
        this.weekday(0);
    }
    if (units === 'isoWeek') {
        this.isoWeekday(1);
    }

    // quarters are also special
    if (units === 'quarter') {
        this.month(Math.floor(this.month() / 3) * 3);
    }

    return this;
}

function endOf (units) {
    units = normalizeUnits(units);
    if (units === undefined || units === 'millisecond') {
        return this;
    }

    // 'date' is an alias for 'day', so it should be considered as such.
    if (units === 'date') {
        units = 'day';
    }

    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
}

function valueOf () {
    return this._d.valueOf() - ((this._offset || 0) * 60000);
}

function unix () {
    return Math.floor(this.valueOf() / 1000);
}

function toDate () {
    return new Date(this.valueOf());
}

function toArray () {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
}

function toObject () {
    var m = this;
    return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds()
    };
}

function toJSON () {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
}

function isValid$2 () {
    return isValid(this);
}

function parsingFlags () {
    return extend({}, getParsingFlags(this));
}

function invalidAt () {
    return getParsingFlags(this).overflow;
}

function creationData() {
    return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict
    };
}

// FORMATTING

addFormatToken(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
});

addFormatToken(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
});

function addWeekYearFormatToken (token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
}

addWeekYearFormatToken('gggg',     'weekYear');
addWeekYearFormatToken('ggggg',    'weekYear');
addWeekYearFormatToken('GGGG',  'isoWeekYear');
addWeekYearFormatToken('GGGGG', 'isoWeekYear');

// ALIASES

addUnitAlias('weekYear', 'gg');
addUnitAlias('isoWeekYear', 'GG');

// PRIORITY

addUnitPriority('weekYear', 1);
addUnitPriority('isoWeekYear', 1);


// PARSING

addRegexToken('G',      matchSigned);
addRegexToken('g',      matchSigned);
addRegexToken('GG',     match1to2, match2);
addRegexToken('gg',     match1to2, match2);
addRegexToken('GGGG',   match1to4, match4);
addRegexToken('gggg',   match1to4, match4);
addRegexToken('GGGGG',  match1to6, match6);
addRegexToken('ggggg',  match1to6, match6);

addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input);
});

addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input);
});

// MOMENTS

function getSetWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy);
}

function getSetISOWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input, this.isoWeek(), this.isoWeekday(), 1, 4);
}

function getISOWeeksInYear () {
    return weeksInYear(this.year(), 1, 4);
}

function getWeeksInYear () {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}

function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
        return weekOfYear(this, dow, doy).year;
    } else {
        weeksTarget = weeksInYear(input, dow, doy);
        if (week > weeksTarget) {
            week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
}

function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
}

// FORMATTING

addFormatToken('Q', 0, 'Qo', 'quarter');

// ALIASES

addUnitAlias('quarter', 'Q');

// PRIORITY

addUnitPriority('quarter', 7);

// PARSING

addRegexToken('Q', match1);
addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
});

// MOMENTS

function getSetQuarter (input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}

// FORMATTING

addFormatToken('D', ['DD', 2], 'Do', 'date');

// ALIASES

addUnitAlias('date', 'D');

// PRIOROITY
addUnitPriority('date', 9);

// PARSING

addRegexToken('D',  match1to2);
addRegexToken('DD', match1to2, match2);
addRegexToken('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ?
      (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
      locale._dayOfMonthOrdinalParseLenient;
});

addParseToken(['D', 'DD'], DATE);
addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0], 10);
});

// MOMENTS

var getSetDayOfMonth = makeGetSet('Date', true);

// FORMATTING

addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

// ALIASES

addUnitAlias('dayOfYear', 'DDD');

// PRIORITY
addUnitPriority('dayOfYear', 4);

// PARSING

addRegexToken('DDD',  match1to3);
addRegexToken('DDDD', match3);
addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
});

// HELPERS

// MOMENTS

function getSetDayOfYear (input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
}

// FORMATTING

addFormatToken('m', ['mm', 2], 0, 'minute');

// ALIASES

addUnitAlias('minute', 'm');

// PRIORITY

addUnitPriority('minute', 14);

// PARSING

addRegexToken('m',  match1to2);
addRegexToken('mm', match1to2, match2);
addParseToken(['m', 'mm'], MINUTE);

// MOMENTS

var getSetMinute = makeGetSet('Minutes', false);

// FORMATTING

addFormatToken('s', ['ss', 2], 0, 'second');

// ALIASES

addUnitAlias('second', 's');

// PRIORITY

addUnitPriority('second', 15);

// PARSING

addRegexToken('s',  match1to2);
addRegexToken('ss', match1to2, match2);
addParseToken(['s', 'ss'], SECOND);

// MOMENTS

var getSetSecond = makeGetSet('Seconds', false);

// FORMATTING

addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
});

addFormatToken(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
});

addFormatToken(0, ['SSS', 3], 0, 'millisecond');
addFormatToken(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
});
addFormatToken(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
});
addFormatToken(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
});
addFormatToken(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
});
addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
});
addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
});


// ALIASES

addUnitAlias('millisecond', 'ms');

// PRIORITY

addUnitPriority('millisecond', 16);

// PARSING

addRegexToken('S',    match1to3, match1);
addRegexToken('SS',   match1to3, match2);
addRegexToken('SSS',  match1to3, match3);

var token;
for (token = 'SSSS'; token.length <= 9; token += 'S') {
    addRegexToken(token, matchUnsigned);
}

function parseMs(input, array) {
    array[MILLISECOND] = toInt(('0.' + input) * 1000);
}

for (token = 'S'; token.length <= 9; token += 'S') {
    addParseToken(token, parseMs);
}
// MOMENTS

var getSetMillisecond = makeGetSet('Milliseconds', false);

// FORMATTING

addFormatToken('z',  0, 0, 'zoneAbbr');
addFormatToken('zz', 0, 0, 'zoneName');

// MOMENTS

function getZoneAbbr () {
    return this._isUTC ? 'UTC' : '';
}

function getZoneName () {
    return this._isUTC ? 'Coordinated Universal Time' : '';
}

var proto = Moment.prototype;

proto.add               = add;
proto.calendar          = calendar$1;
proto.clone             = clone;
proto.diff              = diff;
proto.endOf             = endOf;
proto.format            = format;
proto.from              = from;
proto.fromNow           = fromNow;
proto.to                = to;
proto.toNow             = toNow;
proto.get               = stringGet;
proto.invalidAt         = invalidAt;
proto.isAfter           = isAfter;
proto.isBefore          = isBefore;
proto.isBetween         = isBetween;
proto.isSame            = isSame;
proto.isSameOrAfter     = isSameOrAfter;
proto.isSameOrBefore    = isSameOrBefore;
proto.isValid           = isValid$2;
proto.lang              = lang;
proto.locale            = locale;
proto.localeData        = localeData;
proto.max               = prototypeMax;
proto.min               = prototypeMin;
proto.parsingFlags      = parsingFlags;
proto.set               = stringSet;
proto.startOf           = startOf;
proto.subtract          = subtract;
proto.toArray           = toArray;
proto.toObject          = toObject;
proto.toDate            = toDate;
proto.toISOString       = toISOString;
proto.inspect           = inspect;
proto.toJSON            = toJSON;
proto.toString          = toString;
proto.unix              = unix;
proto.valueOf           = valueOf;
proto.creationData      = creationData;

// Year
proto.year       = getSetYear;
proto.isLeapYear = getIsLeapYear;

// Week Year
proto.weekYear    = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;

// Quarter
proto.quarter = proto.quarters = getSetQuarter;

// Month
proto.month       = getSetMonth;
proto.daysInMonth = getDaysInMonth;

// Week
proto.week           = proto.weeks        = getSetWeek;
proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
proto.weeksInYear    = getWeeksInYear;
proto.isoWeeksInYear = getISOWeeksInYear;

// Day
proto.date       = getSetDayOfMonth;
proto.day        = proto.days             = getSetDayOfWeek;
proto.weekday    = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear  = getSetDayOfYear;

// Hour
proto.hour = proto.hours = getSetHour;

// Minute
proto.minute = proto.minutes = getSetMinute;

// Second
proto.second = proto.seconds = getSetSecond;

// Millisecond
proto.millisecond = proto.milliseconds = getSetMillisecond;

// Offset
proto.utcOffset            = getSetOffset;
proto.utc                  = setOffsetToUTC;
proto.local                = setOffsetToLocal;
proto.parseZone            = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST                = isDaylightSavingTime;
proto.isLocal              = isLocal;
proto.isUtcOffset          = isUtcOffset;
proto.isUtc                = isUtc;
proto.isUTC                = isUtc;

// Timezone
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;

// Deprecations
proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

function createUnix (input) {
    return createLocal(input * 1000);
}

function createInZone () {
    return createLocal.apply(null, arguments).parseZone();
}

function preParsePostFormat (string) {
    return string;
}

var proto$1 = Locale.prototype;

proto$1.calendar        = calendar;
proto$1.longDateFormat  = longDateFormat;
proto$1.invalidDate     = invalidDate;
proto$1.ordinal         = ordinal;
proto$1.preparse        = preParsePostFormat;
proto$1.postformat      = preParsePostFormat;
proto$1.relativeTime    = relativeTime;
proto$1.pastFuture      = pastFuture;
proto$1.set             = set;

// Month
proto$1.months            =        localeMonths;
proto$1.monthsShort       =        localeMonthsShort;
proto$1.monthsParse       =        localeMonthsParse;
proto$1.monthsRegex       = monthsRegex;
proto$1.monthsShortRegex  = monthsShortRegex;

// Week
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;

// Day of Week
proto$1.weekdays       =        localeWeekdays;
proto$1.weekdaysMin    =        localeWeekdaysMin;
proto$1.weekdaysShort  =        localeWeekdaysShort;
proto$1.weekdaysParse  =        localeWeekdaysParse;

proto$1.weekdaysRegex       =        weekdaysRegex;
proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

// Hours
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;

function get$1 (format, index, field, setter) {
    var locale = getLocale();
    var utc = createUTC().set(setter, index);
    return locale[field](utc, format);
}

function listMonthsImpl (format, index, field) {
    if (isNumber(format)) {
        index = format;
        format = undefined;
    }

    format = format || '';

    if (index != null) {
        return get$1(format, index, field, 'month');
    }

    var i;
    var out = [];
    for (i = 0; i < 12; i++) {
        out[i] = get$1(format, i, field, 'month');
    }
    return out;
}

// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
function listWeekdaysImpl (localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    } else {
        format = localeSorted;
        index = format;
        localeSorted = false;

        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    }

    var locale = getLocale(),
        shift = localeSorted ? locale._week.dow : 0;

    if (index != null) {
        return get$1(format, (index + shift) % 7, field, 'day');
    }

    var i;
    var out = [];
    for (i = 0; i < 7; i++) {
        out[i] = get$1(format, (i + shift) % 7, field, 'day');
    }
    return out;
}

function listMonths (format, index) {
    return listMonthsImpl(format, index, 'months');
}

function listMonthsShort (format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
}

function listWeekdays (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
}

function listWeekdaysShort (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
}

function listWeekdaysMin (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
}

getSetGlobalLocale('en', {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (toInt(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    }
});

// Side effect imports
hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

var mathAbs = Math.abs;

function abs () {
    var data           = this._data;

    this._milliseconds = mathAbs(this._milliseconds);
    this._days         = mathAbs(this._days);
    this._months       = mathAbs(this._months);

    data.milliseconds  = mathAbs(data.milliseconds);
    data.seconds       = mathAbs(data.seconds);
    data.minutes       = mathAbs(data.minutes);
    data.hours         = mathAbs(data.hours);
    data.months        = mathAbs(data.months);
    data.years         = mathAbs(data.years);

    return this;
}

function addSubtract$1 (duration, input, value, direction) {
    var other = createDuration(input, value);

    duration._milliseconds += direction * other._milliseconds;
    duration._days         += direction * other._days;
    duration._months       += direction * other._months;

    return duration._bubble();
}

// supports only 2.0-style add(1, 's') or add(duration)
function add$1 (input, value) {
    return addSubtract$1(this, input, value, 1);
}

// supports only 2.0-style subtract(1, 's') or subtract(duration)
function subtract$1 (input, value) {
    return addSubtract$1(this, input, value, -1);
}

function absCeil (number) {
    if (number < 0) {
        return Math.floor(number);
    } else {
        return Math.ceil(number);
    }
}

function bubble () {
    var milliseconds = this._milliseconds;
    var days         = this._days;
    var months       = this._months;
    var data         = this._data;
    var seconds, minutes, hours, years, monthsFromDays;

    // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
            (milliseconds <= 0 && days <= 0 && months <= 0))) {
        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
        days = 0;
        months = 0;
    }

    // The following code bubbles up values, see the tests for
    // examples of what that means.
    data.milliseconds = milliseconds % 1000;

    seconds           = absFloor(milliseconds / 1000);
    data.seconds      = seconds % 60;

    minutes           = absFloor(seconds / 60);
    data.minutes      = minutes % 60;

    hours             = absFloor(minutes / 60);
    data.hours        = hours % 24;

    days += absFloor(hours / 24);

    // convert days to months
    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays));

    // 12 months -> 1 year
    years = absFloor(months / 12);
    months %= 12;

    data.days   = days;
    data.months = months;
    data.years  = years;

    return this;
}

function daysToMonths (days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
}

function monthsToDays (months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
}

function as (units) {
    if (!this.isValid()) {
        return NaN;
    }
    var days;
    var months;
    var milliseconds = this._milliseconds;

    units = normalizeUnits(units);

    if (units === 'month' || units === 'year') {
        days   = this._days   + milliseconds / 864e5;
        months = this._months + daysToMonths(days);
        return units === 'month' ? months : months / 12;
    } else {
        // handle milliseconds separately because of floating point math errors (issue #1867)
        days = this._days + Math.round(monthsToDays(this._months));
        switch (units) {
            case 'week'   : return days / 7     + milliseconds / 6048e5;
            case 'day'    : return days         + milliseconds / 864e5;
            case 'hour'   : return days * 24    + milliseconds / 36e5;
            case 'minute' : return days * 1440  + milliseconds / 6e4;
            case 'second' : return days * 86400 + milliseconds / 1000;
            // Math.floor prevents floating point math errors here
            case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
            default: throw new Error('Unknown unit ' + units);
        }
    }
}

// TODO: Use this.as('ms')?
function valueOf$1 () {
    if (!this.isValid()) {
        return NaN;
    }
    return (
        this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        toInt(this._months / 12) * 31536e6
    );
}

function makeAs (alias) {
    return function () {
        return this.as(alias);
    };
}

var asMilliseconds = makeAs('ms');
var asSeconds      = makeAs('s');
var asMinutes      = makeAs('m');
var asHours        = makeAs('h');
var asDays         = makeAs('d');
var asWeeks        = makeAs('w');
var asMonths       = makeAs('M');
var asYears        = makeAs('y');

function clone$1 () {
    return createDuration(this);
}

function get$2 (units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + 's']() : NaN;
}

function makeGetter(name) {
    return function () {
        return this.isValid() ? this._data[name] : NaN;
    };
}

var milliseconds = makeGetter('milliseconds');
var seconds      = makeGetter('seconds');
var minutes      = makeGetter('minutes');
var hours        = makeGetter('hours');
var days         = makeGetter('days');
var months       = makeGetter('months');
var years        = makeGetter('years');

function weeks () {
    return absFloor(this.days() / 7);
}

var round = Math.round;
var thresholds = {
    ss: 44,         // a few seconds to seconds
    s : 45,         // seconds to minute
    m : 45,         // minutes to hour
    h : 22,         // hours to day
    d : 26,         // days to month
    M : 11          // months to year
};

// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}

function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
    var duration = createDuration(posNegDuration).abs();
    var seconds  = round(duration.as('s'));
    var minutes  = round(duration.as('m'));
    var hours    = round(duration.as('h'));
    var days     = round(duration.as('d'));
    var months   = round(duration.as('M'));
    var years    = round(duration.as('y'));

    var a = seconds <= thresholds.ss && ['s', seconds]  ||
            seconds < thresholds.s   && ['ss', seconds] ||
            minutes <= 1             && ['m']           ||
            minutes < thresholds.m   && ['mm', minutes] ||
            hours   <= 1             && ['h']           ||
            hours   < thresholds.h   && ['hh', hours]   ||
            days    <= 1             && ['d']           ||
            days    < thresholds.d   && ['dd', days]    ||
            months  <= 1             && ['M']           ||
            months  < thresholds.M   && ['MM', months]  ||
            years   <= 1             && ['y']           || ['yy', years];

    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
}

// This function allows you to set the rounding function for relative time strings
function getSetRelativeTimeRounding (roundingFunction) {
    if (roundingFunction === undefined) {
        return round;
    }
    if (typeof(roundingFunction) === 'function') {
        round = roundingFunction;
        return true;
    }
    return false;
}

// This function allows you to set a threshold for relative time strings
function getSetRelativeTimeThreshold (threshold, limit) {
    if (thresholds[threshold] === undefined) {
        return false;
    }
    if (limit === undefined) {
        return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    if (threshold === 's') {
        thresholds.ss = limit - 1;
    }
    return true;
}

function humanize (withSuffix) {
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var locale = this.localeData();
    var output = relativeTime$1(this, !withSuffix, locale);

    if (withSuffix) {
        output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
}

var abs$1 = Math.abs;

function sign(x) {
    return ((x > 0) - (x < 0)) || +x;
}

function toISOString$1() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var seconds = abs$1(this._milliseconds) / 1000;
    var days         = abs$1(this._days);
    var months       = abs$1(this._months);
    var minutes, hours, years;

    // 3600 seconds -> 60 minutes -> 1 hour
    minutes           = absFloor(seconds / 60);
    hours             = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60;

    // 12 months -> 1 year
    years  = absFloor(months / 12);
    months %= 12;


    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
    var total = this.asSeconds();

    if (!total) {
        // this is the same as C#'s (Noda) and python (isodate)...
        // but not other JS (goog.date)
        return 'P0D';
    }

    var totalSign = total < 0 ? '-' : '';
    var ymSign = sign(this._months) !== sign(total) ? '-' : '';
    var daysSign = sign(this._days) !== sign(total) ? '-' : '';
    var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

    return totalSign + 'P' +
        (Y ? ymSign + Y + 'Y' : '') +
        (M ? ymSign + M + 'M' : '') +
        (D ? daysSign + D + 'D' : '') +
        ((h || m || s) ? 'T' : '') +
        (h ? hmsSign + h + 'H' : '') +
        (m ? hmsSign + m + 'M' : '') +
        (s ? hmsSign + s + 'S' : '');
}

var proto$2 = Duration.prototype;

proto$2.isValid        = isValid$1;
proto$2.abs            = abs;
proto$2.add            = add$1;
proto$2.subtract       = subtract$1;
proto$2.as             = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds      = asSeconds;
proto$2.asMinutes      = asMinutes;
proto$2.asHours        = asHours;
proto$2.asDays         = asDays;
proto$2.asWeeks        = asWeeks;
proto$2.asMonths       = asMonths;
proto$2.asYears        = asYears;
proto$2.valueOf        = valueOf$1;
proto$2._bubble        = bubble;
proto$2.clone          = clone$1;
proto$2.get            = get$2;
proto$2.milliseconds   = milliseconds;
proto$2.seconds        = seconds;
proto$2.minutes        = minutes;
proto$2.hours          = hours;
proto$2.days           = days;
proto$2.weeks          = weeks;
proto$2.months         = months;
proto$2.years          = years;
proto$2.humanize       = humanize;
proto$2.toISOString    = toISOString$1;
proto$2.toString       = toISOString$1;
proto$2.toJSON         = toISOString$1;
proto$2.locale         = locale;
proto$2.localeData     = localeData;

// Deprecations
proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
proto$2.lang = lang;

// Side effect imports

// FORMATTING

addFormatToken('X', 0, 0, 'unix');
addFormatToken('x', 0, 0, 'valueOf');

// PARSING

addRegexToken('x', matchSigned);
addRegexToken('X', matchTimestamp);
addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
});
addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
});

// Side effect imports


hooks.version = '2.19.2';

setHookCallback(createLocal);

hooks.fn                    = proto;
hooks.min                   = min;
hooks.max                   = max;
hooks.now                   = now;
hooks.utc                   = createUTC;
hooks.unix                  = createUnix;
hooks.months                = listMonths;
hooks.isDate                = isDate;
hooks.locale                = getSetGlobalLocale;
hooks.invalid               = createInvalid;
hooks.duration              = createDuration;
hooks.isMoment              = isMoment;
hooks.weekdays              = listWeekdays;
hooks.parseZone             = createInZone;
hooks.localeData            = getLocale;
hooks.isDuration            = isDuration;
hooks.monthsShort           = listMonthsShort;
hooks.weekdaysMin           = listWeekdaysMin;
hooks.defineLocale          = defineLocale;
hooks.updateLocale          = updateLocale;
hooks.locales               = listLocales;
hooks.weekdaysShort         = listWeekdaysShort;
hooks.normalizeUnits        = normalizeUnits;
hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat        = getCalendarFormat;
hooks.prototype             = proto;

return hooks;

})));

/*!
 * Fotorama 4.6.4 | http://fotorama.io/license/
 */
fotoramaVersion="4.6.4",function(a,b,c,d,e){"use strict";function f(a){var b="bez_"+d.makeArray(arguments).join("_").replace(".","p");if("function"!=typeof d.easing[b]){var c=function(a,b){var c=[null,null],d=[null,null],e=[null,null],f=function(f,g){return e[g]=3*a[g],d[g]=3*(b[g]-a[g])-e[g],c[g]=1-e[g]-d[g],f*(e[g]+f*(d[g]+f*c[g]))},g=function(a){return e[0]+a*(2*d[0]+3*c[0]*a)},h=function(a){for(var b,c=a,d=0;++d<14&&(b=f(c,0)-a,!(Math.abs(b)<.001));)c-=b/g(c);return c};return function(a){return f(h(a),1)}};d.easing[b]=function(b,d,e,f,g){return f*c([a[0],a[1]],[a[2],a[3]])(d/g)+e}}return b}function g(){}function h(a,b,c){return Math.max(isNaN(b)?-1/0:b,Math.min(isNaN(c)?1/0:c,a))}function i(a){return a.match(/ma/)&&a.match(/-?\d+(?!d)/g)[a.match(/3d/)?12:4]}function j(a){return Ic?+i(a.css("transform")):+a.css("left").replace("px","")}function k(a){var b={};return Ic?b.transform="translate3d("+a+"px,0,0)":b.left=a,b}function l(a){return{"transition-duration":a+"ms"}}function m(a,b){return isNaN(a)?b:a}function n(a,b){return m(+String(a).replace(b||"px",""))}function o(a){return/%$/.test(a)?n(a,"%"):e}function p(a,b){return m(o(a)/100*b,n(a))}function q(a){return(!isNaN(n(a))||!isNaN(n(a,"%")))&&a}function r(a,b,c,d){return(a-(d||0))*(b+(c||0))}function s(a,b,c,d){return-Math.round(a/(b+(c||0))-(d||0))}function t(a){var b=a.data();if(!b.tEnd){var c=a[0],d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",msTransition:"MSTransitionEnd",transition:"transitionend"};T(c,d[uc.prefixed("transition")],function(a){b.tProp&&a.propertyName.match(b.tProp)&&b.onEndFn()}),b.tEnd=!0}}function u(a,b,c,d){var e,f=a.data();f&&(f.onEndFn=function(){e||(e=!0,clearTimeout(f.tT),c())},f.tProp=b,clearTimeout(f.tT),f.tT=setTimeout(function(){f.onEndFn()},1.5*d),t(a))}function v(a,b){if(a.length){var c=a.data();Ic?(a.css(l(0)),c.onEndFn=g,clearTimeout(c.tT)):a.stop();var d=w(b,function(){return j(a)});return a.css(k(d)),d}}function w(){for(var a,b=0,c=arguments.length;c>b&&(a=b?arguments[b]():arguments[b],"number"!=typeof a);b++);return a}function x(a,b){return Math.round(a+(b-a)/1.5)}function y(){return y.p=y.p||("https:"===c.protocol?"https://":"http://"),y.p}function z(a){var c=b.createElement("a");return c.href=a,c}function A(a,b){if("string"!=typeof a)return a;a=z(a);var c,d;if(a.host.match(/youtube\.com/)&&a.search){if(c=a.search.split("v=")[1]){var e=c.indexOf("&");-1!==e&&(c=c.substring(0,e)),d="youtube"}}else a.host.match(/youtube\.com|youtu\.be/)?(c=a.pathname.replace(/^\/(embed\/|v\/)?/,"").replace(/\/.*/,""),d="youtube"):a.host.match(/vimeo\.com/)&&(d="vimeo",c=a.pathname.replace(/^\/(video\/)?/,"").replace(/\/.*/,""));return c&&d||!b||(c=a.href,d="custom"),c?{id:c,type:d,s:a.search.replace(/^\?/,""),p:y()}:!1}function B(a,b,c){var e,f,g=a.video;return"youtube"===g.type?(f=y()+"img.youtube.com/vi/"+g.id+"/default.jpg",e=f.replace(/\/default.jpg$/,"/hqdefault.jpg"),a.thumbsReady=!0):"vimeo"===g.type?d.ajax({url:y()+"vimeo.com/api/v2/video/"+g.id+".json",dataType:"jsonp",success:function(d){a.thumbsReady=!0,C(b,{img:d[0].thumbnail_large,thumb:d[0].thumbnail_small},a.i,c)}}):a.thumbsReady=!0,{img:e,thumb:f}}function C(a,b,c,e){for(var f=0,g=a.length;g>f;f++){var h=a[f];if(h.i===c&&h.thumbsReady){var i={videoReady:!0};i[Xc]=i[Zc]=i[Yc]=!1,e.splice(f,1,d.extend({},h,i,b));break}}}function D(a){function b(a,b,e){var f=a.children("img").eq(0),g=a.attr("href"),h=a.attr("src"),i=f.attr("src"),j=b.video,k=e?A(g,j===!0):!1;k?g=!1:k=j,c(a,f,d.extend(b,{video:k,img:b.img||g||h||i,thumb:b.thumb||i||h||g}))}function c(a,b,c){var e=c.thumb&&c.img!==c.thumb,f=n(c.width||a.attr("width")),g=n(c.height||a.attr("height"));d.extend(c,{width:f,height:g,thumbratio:S(c.thumbratio||n(c.thumbwidth||b&&b.attr("width")||e||f)/n(c.thumbheight||b&&b.attr("height")||e||g))})}var e=[];return a.children().each(function(){var a=d(this),f=R(d.extend(a.data(),{id:a.attr("id")}));if(a.is("a, img"))b(a,f,!0);else{if(a.is(":empty"))return;c(a,null,d.extend(f,{html:this,_html:a.html()}))}e.push(f)}),e}function E(a){return 0===a.offsetWidth&&0===a.offsetHeight}function F(a){return!d.contains(b.documentElement,a)}function G(a,b,c,d){return G.i||(G.i=1,G.ii=[!0]),d=d||G.i,"undefined"==typeof G.ii[d]&&(G.ii[d]=!0),a()?b():G.ii[d]&&setTimeout(function(){G.ii[d]&&G(a,b,c,d)},c||100),G.i++}function H(a){c.replace(c.protocol+"//"+c.host+c.pathname.replace(/^\/?/,"/")+c.search+"#"+a)}function I(a,b,c,d){var e=a.data(),f=e.measures;if(f&&(!e.l||e.l.W!==f.width||e.l.H!==f.height||e.l.r!==f.ratio||e.l.w!==b.w||e.l.h!==b.h||e.l.m!==c||e.l.p!==d)){var g=f.width,i=f.height,j=b.w/b.h,k=f.ratio>=j,l="scaledown"===c,m="contain"===c,n="cover"===c,o=$(d);k&&(l||m)||!k&&n?(g=h(b.w,0,l?g:1/0),i=g/f.ratio):(k&&n||!k&&(l||m))&&(i=h(b.h,0,l?i:1/0),g=i*f.ratio),a.css({width:g,height:i,left:p(o.x,b.w-g),top:p(o.y,b.h-i)}),e.l={W:f.width,H:f.height,r:f.ratio,w:b.w,h:b.h,m:c,p:d}}return!0}function J(a,b){var c=a[0];c.styleSheet?c.styleSheet.cssText=b:a.html(b)}function K(a,b,c){return b===c?!1:b>=a?"left":a>=c?"right":"left right"}function L(a,b,c,d){if(!c)return!1;if(!isNaN(a))return a-(d?0:1);for(var e,f=0,g=b.length;g>f;f++){var h=b[f];if(h.id===a){e=f;break}}return e}function M(a,b,c){c=c||{},a.each(function(){var a,e=d(this),f=e.data();f.clickOn||(f.clickOn=!0,d.extend(cb(e,{onStart:function(b){a=b,(c.onStart||g).call(this,b)},onMove:c.onMove||g,onTouchEnd:c.onTouchEnd||g,onEnd:function(c){c.moved||b.call(this,a)}}),{noMove:!0}))})}function N(a,b){return'<div class="'+a+'">'+(b||"")+"</div>"}function O(a){for(var b=a.length;b;){var c=Math.floor(Math.random()*b--),d=a[b];a[b]=a[c],a[c]=d}return a}function P(a){return"[object Array]"==Object.prototype.toString.call(a)&&d.map(a,function(a){return d.extend({},a)})}function Q(a,b,c){a.scrollLeft(b||0).scrollTop(c||0)}function R(a){if(a){var b={};return d.each(a,function(a,c){b[a.toLowerCase()]=c}),b}}function S(a){if(a){var b=+a;return isNaN(b)?(b=a.split("/"),+b[0]/+b[1]||e):b}}function T(a,b,c,d){b&&(a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent("on"+b,c))}function U(a){return!!a.getAttribute("disabled")}function V(a){return{tabindex:-1*a+"",disabled:a}}function W(a,b){T(a,"keyup",function(c){U(a)||13==c.keyCode&&b.call(a,c)})}function X(a,b){T(a,"focus",a.onfocusin=function(c){b.call(a,c)},!0)}function Y(a,b){a.preventDefault?a.preventDefault():a.returnValue=!1,b&&a.stopPropagation&&a.stopPropagation()}function Z(a){return a?">":"<"}function $(a){return a=(a+"").split(/\s+/),{x:q(a[0])||bd,y:q(a[1])||bd}}function _(a,b){var c=a.data(),e=Math.round(b.pos),f=function(){c.sliding=!1,(b.onEnd||g)()};"undefined"!=typeof b.overPos&&b.overPos!==b.pos&&(e=b.overPos,f=function(){_(a,d.extend({},b,{overPos:b.pos,time:Math.max(Qc,b.time/2)}))});var h=d.extend(k(e),b.width&&{width:b.width});c.sliding=!0,Ic?(a.css(d.extend(l(b.time),h)),b.time>10?u(a,"transform",f,b.time):f()):a.stop().animate(h,b.time,_c,f)}function ab(a,b,c,e,f,h){var i="undefined"!=typeof h;if(i||(f.push(arguments),Array.prototype.push.call(arguments,f.length),!(f.length>1))){a=a||d(a),b=b||d(b);var j=a[0],k=b[0],l="crossfade"===e.method,m=function(){if(!m.done){m.done=!0;var a=(i||f.shift())&&f.shift();a&&ab.apply(this,a),(e.onEnd||g)(!!a)}},n=e.time/(h||1);c.removeClass(Rb+" "+Qb),a.stop().addClass(Rb),b.stop().addClass(Qb),l&&k&&a.fadeTo(0,0),a.fadeTo(l?n:0,1,l&&m),b.fadeTo(n,0,m),j&&l||k||m()}}function bb(a){var b=(a.touches||[])[0]||a;a._x=b.pageX,a._y=b.clientY,a._now=d.now()}function cb(a,c){function e(a){return m=d(a.target),u.checked=p=q=s=!1,k||u.flow||a.touches&&a.touches.length>1||a.which>1||ed&&ed.type!==a.type&&gd||(p=c.select&&m.is(c.select,t))?p:(o="touchstart"===a.type,q=m.is("a, a *",t),n=u.control,r=u.noMove||u.noSwipe||n?16:u.snap?0:4,bb(a),l=ed=a,fd=a.type.replace(/down|start/,"move").replace(/Down/,"Move"),(c.onStart||g).call(t,a,{control:n,$target:m}),k=u.flow=!0,void((!o||u.go)&&Y(a)))}function f(a){if(a.touches&&a.touches.length>1||Nc&&!a.isPrimary||fd!==a.type||!k)return k&&h(),void(c.onTouchEnd||g)();bb(a);var b=Math.abs(a._x-l._x),d=Math.abs(a._y-l._y),e=b-d,f=(u.go||u.x||e>=0)&&!u.noSwipe,i=0>e;o&&!u.checked?(k=f)&&Y(a):(Y(a),(c.onMove||g).call(t,a,{touch:o})),!s&&Math.sqrt(Math.pow(b,2)+Math.pow(d,2))>r&&(s=!0),u.checked=u.checked||f||i}function h(a){(c.onTouchEnd||g)();var b=k;u.control=k=!1,b&&(u.flow=!1),!b||q&&!u.checked||(a&&Y(a),gd=!0,clearTimeout(hd),hd=setTimeout(function(){gd=!1},1e3),(c.onEnd||g).call(t,{moved:s,$target:m,control:n,touch:o,startEvent:l,aborted:!a||"MSPointerCancel"===a.type}))}function i(){u.flow||setTimeout(function(){u.flow=!0},10)}function j(){u.flow&&setTimeout(function(){u.flow=!1},Pc)}var k,l,m,n,o,p,q,r,s,t=a[0],u={};return Nc?(T(t,"MSPointerDown",e),T(b,"MSPointerMove",f),T(b,"MSPointerCancel",h),T(b,"MSPointerUp",h)):(T(t,"touchstart",e),T(t,"touchmove",f),T(t,"touchend",h),T(b,"touchstart",i),T(b,"touchend",j),T(b,"touchcancel",j),Ec.on("scroll",j),a.on("mousedown",e),Fc.on("mousemove",f).on("mouseup",h)),a.on("click","a",function(a){u.checked&&Y(a)}),u}function db(a,b){function c(c,d){A=!0,j=l=c._x,q=c._now,p=[[q,j]],m=n=D.noMove||d?0:v(a,(b.getPos||g)()),(b.onStart||g).call(B,c)}function e(a,b){s=D.min,t=D.max,u=D.snap,w=a.altKey,A=z=!1,y=b.control,y||C.sliding||c(a)}function f(d,e){D.noSwipe||(A||c(d),l=d._x,p.push([d._now,l]),n=m-(j-l),o=K(n,s,t),s>=n?n=x(n,s):n>=t&&(n=x(n,t)),D.noMove||(a.css(k(n)),z||(z=!0,e.touch||Nc||a.addClass(ec)),(b.onMove||g).call(B,d,{pos:n,edge:o})))}function i(e){if(!D.noSwipe||!e.moved){A||c(e.startEvent,!0),e.touch||Nc||a.removeClass(ec),r=d.now();for(var f,i,j,k,o,q,v,x,y,z=r-Pc,C=null,E=Qc,F=b.friction,G=p.length-1;G>=0;G--){if(f=p[G][0],i=Math.abs(f-z),null===C||j>i)C=f,k=p[G][1];else if(C===z||i>j)break;j=i}v=h(n,s,t);var H=k-l,I=H>=0,J=r-C,K=J>Pc,L=!K&&n!==m&&v===n;u&&(v=h(Math[L?I?"floor":"ceil":"round"](n/u)*u,s,t),s=t=v),L&&(u||v===n)&&(y=-(H/J),E*=h(Math.abs(y),b.timeLow,b.timeHigh),o=Math.round(n+y*E/F),u||(v=o),(!I&&o>t||I&&s>o)&&(q=I?s:t,x=o-q,u||(v=q),x=h(v+.03*x,q-50,q+50),E=Math.abs((n-x)/(y/F)))),E*=w?10:1,(b.onEnd||g).call(B,d.extend(e,{moved:e.moved||K&&u,pos:n,newPos:v,overPos:x,time:E}))}}var j,l,m,n,o,p,q,r,s,t,u,w,y,z,A,B=a[0],C=a.data(),D={};return D=d.extend(cb(b.$wrap,d.extend({},b,{onStart:e,onMove:f,onEnd:i})),D)}function eb(a,b){var c,e,f,h=a[0],i={prevent:{}};return T(h,Oc,function(a){var h=a.wheelDeltaY||-1*a.deltaY||0,j=a.wheelDeltaX||-1*a.deltaX||0,k=Math.abs(j)&&!Math.abs(h),l=Z(0>j),m=e===l,n=d.now(),o=Pc>n-f;e=l,f=n,k&&i.ok&&(!i.prevent[l]||c)&&(Y(a,!0),c&&m&&o||(b.shift&&(c=!0,clearTimeout(i.t),i.t=setTimeout(function(){c=!1},Rc)),(b.onEnd||g)(a,b.shift?l:j)))}),i}function fb(){d.each(d.Fotorama.instances,function(a,b){b.index=a})}function gb(a){d.Fotorama.instances.push(a),fb()}function hb(a){d.Fotorama.instances.splice(a.index,1),fb()}var ib="fotorama",jb="fullscreen",kb=ib+"__wrap",lb=kb+"--css2",mb=kb+"--css3",nb=kb+"--video",ob=kb+"--fade",pb=kb+"--slide",qb=kb+"--no-controls",rb=kb+"--no-shadows",sb=kb+"--pan-y",tb=kb+"--rtl",ub=kb+"--only-active",vb=kb+"--no-captions",wb=kb+"--toggle-arrows",xb=ib+"__stage",yb=xb+"__frame",zb=yb+"--video",Ab=xb+"__shaft",Bb=ib+"__grab",Cb=ib+"__pointer",Db=ib+"__arr",Eb=Db+"--disabled",Fb=Db+"--prev",Gb=Db+"--next",Hb=ib+"__nav",Ib=Hb+"-wrap",Jb=Hb+"__shaft",Kb=Hb+"--dots",Lb=Hb+"--thumbs",Mb=Hb+"__frame",Nb=Mb+"--dot",Ob=Mb+"--thumb",Pb=ib+"__fade",Qb=Pb+"-front",Rb=Pb+"-rear",Sb=ib+"__shadow",Tb=Sb+"s",Ub=Tb+"--left",Vb=Tb+"--right",Wb=ib+"__active",Xb=ib+"__select",Yb=ib+"--hidden",Zb=ib+"--fullscreen",$b=ib+"__fullscreen-icon",_b=ib+"__error",ac=ib+"__loading",bc=ib+"__loaded",cc=bc+"--full",dc=bc+"--img",ec=ib+"__grabbing",fc=ib+"__img",gc=fc+"--full",hc=ib+"__dot",ic=ib+"__thumb",jc=ic+"-border",kc=ib+"__html",lc=ib+"__video",mc=lc+"-play",nc=lc+"-close",oc=ib+"__caption",pc=ib+"__caption__wrap",qc=ib+"__spinner",rc='" tabindex="0" role="button',sc=d&&d.fn.jquery.split(".");if(!sc||sc[0]<1||1==sc[0]&&sc[1]<8)throw"Fotorama requires jQuery 1.8 or later and will not run without it.";var tc={},uc=function(a,b,c){function d(a){r.cssText=a}function e(a,b){return typeof a===b}function f(a,b){return!!~(""+a).indexOf(b)}function g(a,b){for(var d in a){var e=a[d];if(!f(e,"-")&&r[e]!==c)return"pfx"==b?e:!0}return!1}function h(a,b,d){for(var f in a){var g=b[a[f]];if(g!==c)return d===!1?a[f]:e(g,"function")?g.bind(d||b):g}return!1}function i(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),f=(a+" "+u.join(d+" ")+d).split(" ");return e(b,"string")||e(b,"undefined")?g(f,b):(f=(a+" "+v.join(d+" ")+d).split(" "),h(f,b,c))}var j,k,l,m="2.6.2",n={},o=b.documentElement,p="modernizr",q=b.createElement(p),r=q.style,s=({}.toString," -webkit- -moz- -o- -ms- ".split(" ")),t="Webkit Moz O ms",u=t.split(" "),v=t.toLowerCase().split(" "),w={},x=[],y=x.slice,z=function(a,c,d,e){var f,g,h,i,j=b.createElement("div"),k=b.body,l=k||b.createElement("body");if(parseInt(d,10))for(;d--;)h=b.createElement("div"),h.id=e?e[d]:p+(d+1),j.appendChild(h);return f=["&#173;",'<style id="s',p,'">',a,"</style>"].join(""),j.id=p,(k?j:l).innerHTML+=f,l.appendChild(j),k||(l.style.background="",l.style.overflow="hidden",i=o.style.overflow,o.style.overflow="hidden",o.appendChild(l)),g=c(j,a),k?j.parentNode.removeChild(j):(l.parentNode.removeChild(l),o.style.overflow=i),!!g},A={}.hasOwnProperty;l=e(A,"undefined")||e(A.call,"undefined")?function(a,b){return b in a&&e(a.constructor.prototype[b],"undefined")}:function(a,b){return A.call(a,b)},Function.prototype.bind||(Function.prototype.bind=function(a){var b=this;if("function"!=typeof b)throw new TypeError;var c=y.call(arguments,1),d=function(){if(this instanceof d){var e=function(){};e.prototype=b.prototype;var f=new e,g=b.apply(f,c.concat(y.call(arguments)));return Object(g)===g?g:f}return b.apply(a,c.concat(y.call(arguments)))};return d}),w.csstransforms3d=function(){var a=!!i("perspective");return a};for(var B in w)l(w,B)&&(k=B.toLowerCase(),n[k]=w[B](),x.push((n[k]?"":"no-")+k));return n.addTest=function(a,b){if("object"==typeof a)for(var d in a)l(a,d)&&n.addTest(d,a[d]);else{if(a=a.toLowerCase(),n[a]!==c)return n;b="function"==typeof b?b():b,"undefined"!=typeof enableClasses&&enableClasses&&(o.className+=" "+(b?"":"no-")+a),n[a]=b}return n},d(""),q=j=null,n._version=m,n._prefixes=s,n._domPrefixes=v,n._cssomPrefixes=u,n.testProp=function(a){return g([a])},n.testAllProps=i,n.testStyles=z,n.prefixed=function(a,b,c){return b?i(a,b,c):i(a,"pfx")},n}(a,b),vc={ok:!1,is:function(){return!1},request:function(){},cancel:function(){},event:"",prefix:""},wc="webkit moz o ms khtml".split(" ");if("undefined"!=typeof b.cancelFullScreen)vc.ok=!0;else for(var xc=0,yc=wc.length;yc>xc;xc++)if(vc.prefix=wc[xc],"undefined"!=typeof b[vc.prefix+"CancelFullScreen"]){vc.ok=!0;break}vc.ok&&(vc.event=vc.prefix+"fullscreenchange",vc.is=function(){switch(this.prefix){case"":return b.fullScreen;case"webkit":return b.webkitIsFullScreen;default:return b[this.prefix+"FullScreen"]}},vc.request=function(a){return""===this.prefix?a.requestFullScreen():a[this.prefix+"RequestFullScreen"]()},vc.cancel=function(){return""===this.prefix?b.cancelFullScreen():b[this.prefix+"CancelFullScreen"]()});var zc,Ac={lines:12,length:5,width:2,radius:7,corners:1,rotate:15,color:"rgba(128, 128, 128, .75)",hwaccel:!0},Bc={top:"auto",left:"auto",className:""};!function(a,b){zc=b()}(this,function(){function a(a,c){var d,e=b.createElement(a||"div");for(d in c)e[d]=c[d];return e}function c(a){for(var b=1,c=arguments.length;c>b;b++)a.appendChild(arguments[b]);return a}function d(a,b,c,d){var e=["opacity",b,~~(100*a),c,d].join("-"),f=.01+c/d*100,g=Math.max(1-(1-a)/b*(100-f),a),h=m.substring(0,m.indexOf("Animation")).toLowerCase(),i=h&&"-"+h+"-"||"";return o[e]||(p.insertRule("@"+i+"keyframes "+e+"{0%{opacity:"+g+"}"+f+"%{opacity:"+a+"}"+(f+.01)+"%{opacity:1}"+(f+b)%100+"%{opacity:"+a+"}100%{opacity:"+g+"}}",p.cssRules.length),o[e]=1),e}function f(a,b){var c,d,f=a.style;for(b=b.charAt(0).toUpperCase()+b.slice(1),d=0;d<n.length;d++)if(c=n[d]+b,f[c]!==e)return c;return f[b]!==e?b:void 0}function g(a,b){for(var c in b)a.style[f(a,c)||c]=b[c];return a}function h(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)a[d]===e&&(a[d]=c[d])}return a}function i(a){for(var b={x:a.offsetLeft,y:a.offsetTop};a=a.offsetParent;)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}function j(a,b){return"string"==typeof a?a:a[b%a.length]}function k(a){return"undefined"==typeof this?new k(a):void(this.opts=h(a||{},k.defaults,q))}function l(){function b(b,c){return a("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',c)}p.addRule(".spin-vml","behavior:url(#default#VML)"),k.prototype.lines=function(a,d){function e(){return g(b("group",{coordsize:k+" "+k,coordorigin:-i+" "+-i}),{width:k,height:k})}function f(a,f,h){c(m,c(g(e(),{rotation:360/d.lines*a+"deg",left:~~f}),c(g(b("roundrect",{arcsize:d.corners}),{width:i,height:d.width,left:d.radius,top:-d.width>>1,filter:h}),b("fill",{color:j(d.color,a),opacity:d.opacity}),b("stroke",{opacity:0}))))}var h,i=d.length+d.width,k=2*i,l=2*-(d.width+d.length)+"px",m=g(e(),{position:"absolute",top:l,left:l});if(d.shadow)for(h=1;h<=d.lines;h++)f(h,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(h=1;h<=d.lines;h++)f(h);return c(a,m)},k.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}var m,n=["webkit","Moz","ms","O"],o={},p=function(){var d=a("style",{type:"text/css"});return c(b.getElementsByTagName("head")[0],d),d.sheet||d.styleSheet}(),q={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto",position:"relative"};k.defaults={},h(k.prototype,{spin:function(b){this.stop();var c,d,e=this,f=e.opts,h=e.el=g(a(0,{className:f.className}),{position:f.position,width:0,zIndex:f.zIndex}),j=f.radius+f.length+f.width;if(b&&(b.insertBefore(h,b.firstChild||null),d=i(b),c=i(h),g(h,{left:("auto"==f.left?d.x-c.x+(b.offsetWidth>>1):parseInt(f.left,10)+j)+"px",top:("auto"==f.top?d.y-c.y+(b.offsetHeight>>1):parseInt(f.top,10)+j)+"px"})),h.setAttribute("role","progressbar"),e.lines(h,e.opts),!m){var k,l=0,n=(f.lines-1)*(1-f.direction)/2,o=f.fps,p=o/f.speed,q=(1-f.opacity)/(p*f.trail/100),r=p/f.lines;!function s(){l++;for(var a=0;a<f.lines;a++)k=Math.max(1-(l+(f.lines-a)*r)%p*q,f.opacity),e.opacity(h,a*f.direction+n,k,f);e.timeout=e.el&&setTimeout(s,~~(1e3/o))}()}return e},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=e),this},lines:function(b,e){function f(b,c){return g(a(),{position:"absolute",width:e.length+e.width+"px",height:e.width+"px",background:b,boxShadow:c,transformOrigin:"left",transform:"rotate("+~~(360/e.lines*i+e.rotate)+"deg) translate("+e.radius+"px,0)",borderRadius:(e.corners*e.width>>1)+"px"})}for(var h,i=0,k=(e.lines-1)*(1-e.direction)/2;i<e.lines;i++)h=g(a(),{position:"absolute",top:1+~(e.width/2)+"px",transform:e.hwaccel?"translate3d(0,0,0)":"",opacity:e.opacity,animation:m&&d(e.opacity,e.trail,k+i*e.direction,e.lines)+" "+1/e.speed+"s linear infinite"}),e.shadow&&c(h,g(f("#000","0 0 4px #000"),{top:"2px"})),c(b,c(h,f(j(e.color,i),"0 0 1px rgba(0,0,0,.1)")));return b},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}});var r=g(a("group"),{behavior:"url(#default#VML)"});return!f(r,"transform")&&r.adj?l():m=f(r,"animation"),k});var Cc,Dc,Ec=d(a),Fc=d(b),Gc="quirks"===c.hash.replace("#",""),Hc=uc.csstransforms3d,Ic=Hc&&!Gc,Jc=Hc||"CSS1Compat"===b.compatMode,Kc=vc.ok,Lc=navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i),Mc=!Ic||Lc,Nc=navigator.msPointerEnabled,Oc="onwheel"in b.createElement("div")?"wheel":b.onmousewheel!==e?"mousewheel":"DOMMouseScroll",Pc=250,Qc=300,Rc=1400,Sc=5e3,Tc=2,Uc=64,Vc=500,Wc=333,Xc="$stageFrame",Yc="$navDotFrame",Zc="$navThumbFrame",$c="auto",_c=f([.1,0,.25,1]),ad=99999,bd="50%",cd={width:null,minwidth:null,maxwidth:"100%",height:null,minheight:null,maxheight:null,ratio:null,margin:Tc,glimpse:0,fit:"contain",position:bd,thumbposition:bd,nav:"dots",navposition:"bottom",navwidth:null,thumbwidth:Uc,thumbheight:Uc,thumbmargin:Tc,thumbborderwidth:Tc,thumbfit:"cover",allowfullscreen:!1,transition:"slide",clicktransition:null,transitionduration:Qc,captions:!0,hash:!1,startindex:0,loop:!1,autoplay:!1,stopautoplayontouch:!0,keyboard:!1,arrows:!0,click:!0,swipe:!0,trackpad:!1,enableifsingleframe:!1,controlsonstart:!0,shuffle:!1,direction:"ltr",shadows:!0,spinner:null},dd={left:!0,right:!0,down:!1,up:!1,space:!1,home:!1,end:!1};G.stop=function(a){G.ii[a]=!1};var ed,fd,gd,hd;jQuery.Fotorama=function(a,e){function f(){d.each(yd,function(a,b){if(!b.i){b.i=me++;var c=A(b.video,!0);if(c){var d={};b.video=c,b.img||b.thumb?b.thumbsReady=!0:d=B(b,yd,ie),C(yd,{img:d.img,thumb:d.thumb},b.i,ie)}}})}function g(a){return Zd[a]||ie.fullScreen}function i(a){var b="keydown."+ib,c=ib+je,d="keydown."+c,f="resize."+c+" orientationchange."+c;a?(Fc.on(d,function(a){var b,c;Cd&&27===a.keyCode?(b=!0,md(Cd,!0,!0)):(ie.fullScreen||e.keyboard&&!ie.index)&&(27===a.keyCode?(b=!0,ie.cancelFullScreen()):a.shiftKey&&32===a.keyCode&&g("space")||37===a.keyCode&&g("left")||38===a.keyCode&&g("up")?c="<":32===a.keyCode&&g("space")||39===a.keyCode&&g("right")||40===a.keyCode&&g("down")?c=">":36===a.keyCode&&g("home")?c="<<":35===a.keyCode&&g("end")&&(c=">>")),(b||c)&&Y(a),c&&ie.show({index:c,slow:a.altKey,user:!0})}),ie.index||Fc.off(b).on(b,"textarea, input, select",function(a){!Dc.hasClass(jb)&&a.stopPropagation()}),Ec.on(f,ie.resize)):(Fc.off(d),Ec.off(f))}function j(b){b!==j.f&&(b?(a.html("").addClass(ib+" "+ke).append(qe).before(oe).before(pe),gb(ie)):(qe.detach(),oe.detach(),pe.detach(),a.html(ne.urtext).removeClass(ke),hb(ie)),i(b),j.f=b)}function m(){yd=ie.data=yd||P(e.data)||D(a),zd=ie.size=yd.length,!xd.ok&&e.shuffle&&O(yd),f(),Je=y(Je),zd&&j(!0)}function o(){var a=2>zd&&!e.enableifsingleframe||Cd;Me.noMove=a||Sd,Me.noSwipe=a||!e.swipe,!Wd&&se.toggleClass(Bb,!e.click&&!Me.noMove&&!Me.noSwipe),Nc&&qe.toggleClass(sb,!Me.noSwipe)}function t(a){a===!0&&(a=""),e.autoplay=Math.max(+a||Sc,1.5*Vd)}function u(){function a(a,c){b[a?"add":"remove"].push(c)}ie.options=e=R(e),Sd="crossfade"===e.transition||"dissolve"===e.transition,Md=e.loop&&(zd>2||Sd&&(!Wd||"slide"!==Wd)),Vd=+e.transitionduration||Qc,Yd="rtl"===e.direction,Zd=d.extend({},e.keyboard&&dd,e.keyboard);var b={add:[],remove:[]};zd>1||e.enableifsingleframe?(Nd=e.nav,Pd="top"===e.navposition,b.remove.push(Xb),we.toggle(!!e.arrows)):(Nd=!1,we.hide()),Rb(),Bd=new zc(d.extend(Ac,e.spinner,Bc,{direction:Yd?-1:1})),Gc(),Hc(),e.autoplay&&t(e.autoplay),Td=n(e.thumbwidth)||Uc,Ud=n(e.thumbheight)||Uc,Ne.ok=Pe.ok=e.trackpad&&!Mc,o(),ed(e,[Le]),Od="thumbs"===Nd,Od?(lc(zd,"navThumb"),Ad=Be,he=Zc,J(oe,d.Fotorama.jst.style({w:Td,h:Ud,b:e.thumbborderwidth,m:e.thumbmargin,s:je,q:!Jc})),ye.addClass(Lb).removeClass(Kb)):"dots"===Nd?(lc(zd,"navDot"),Ad=Ae,he=Yc,ye.addClass(Kb).removeClass(Lb)):(Nd=!1,ye.removeClass(Lb+" "+Kb)),Nd&&(Pd?xe.insertBefore(re):xe.insertAfter(re),wc.nav=!1,wc(Ad,ze,"nav")),Qd=e.allowfullscreen,Qd?(De.prependTo(re),Rd=Kc&&"native"===Qd):(De.detach(),Rd=!1),a(Sd,ob),a(!Sd,pb),a(!e.captions,vb),a(Yd,tb),a("always"!==e.arrows,wb),Xd=e.shadows&&!Mc,a(!Xd,rb),qe.addClass(b.add.join(" ")).removeClass(b.remove.join(" ")),Ke=d.extend({},e)}function x(a){return 0>a?(zd+a%zd)%zd:a>=zd?a%zd:a}function y(a){return h(a,0,zd-1)}function z(a){return Md?x(a):y(a)}function E(a){return a>0||Md?a-1:!1}function U(a){return zd-1>a||Md?a+1:!1}function $(){Me.min=Md?-1/0:-r(zd-1,Le.w,e.margin,Fd),Me.max=Md?1/0:-r(0,Le.w,e.margin,Fd),Me.snap=Le.w+e.margin}function bb(){Oe.min=Math.min(0,Le.nw-ze.width()),Oe.max=0,ze.toggleClass(Bb,!(Oe.noMove=Oe.min===Oe.max))}function cb(a,b,c){if("number"==typeof a){a=new Array(a);var e=!0}return d.each(a,function(a,d){if(e&&(d=a),"number"==typeof d){var f=yd[x(d)];if(f){var g="$"+b+"Frame",h=f[g];c.call(this,a,d,f,h,g,h&&h.data())}}})}function fb(a,b,c,d){(!$d||"*"===$d&&d===Ld)&&(a=q(e.width)||q(a)||Vc,b=q(e.height)||q(b)||Wc,ie.resize({width:a,ratio:e.ratio||c||a/b},0,d!==Ld&&"*"))}function Pb(a,b,c,f,g,h){cb(a,b,function(a,i,j,k,l,m){function n(a){var b=x(i);fd(a,{index:b,src:w,frame:yd[b]})}function o(){t.remove(),d.Fotorama.cache[w]="error",j.html&&"stage"===b||!y||y===w?(!w||j.html||r?"stage"===b&&(k.trigger("f:load").removeClass(ac+" "+_b).addClass(bc),n("load"),fb()):(k.trigger("f:error").removeClass(ac).addClass(_b),n("error")),m.state="error",!(zd>1&&yd[i]===j)||j.html||j.deleted||j.video||r||(j.deleted=!0,ie.splice(i,1))):(j[v]=w=y,Pb([i],b,c,f,g,!0))}function p(){d.Fotorama.measures[w]=u.measures=d.Fotorama.measures[w]||{width:s.width,height:s.height,ratio:s.width/s.height},fb(u.measures.width,u.measures.height,u.measures.ratio,i),t.off("load error").addClass(fc+(r?" "+gc:"")).prependTo(k),I(t,(d.isFunction(c)?c():c)||Le,f||j.fit||e.fit,g||j.position||e.position),d.Fotorama.cache[w]=m.state="loaded",setTimeout(function(){k.trigger("f:load").removeClass(ac+" "+_b).addClass(bc+" "+(r?cc:dc)),"stage"===b?n("load"):(j.thumbratio===$c||!j.thumbratio&&e.thumbratio===$c)&&(j.thumbratio=u.measures.ratio,vd())},0)}function q(){var a=10;G(function(){return!fe||!a--&&!Mc},function(){p()})}if(k){var r=ie.fullScreen&&j.full&&j.full!==j.img&&!m.$full&&"stage"===b;if(!m.$img||h||r){var s=new Image,t=d(s),u=t.data();m[r?"$full":"$img"]=t;var v="stage"===b?r?"full":"img":"thumb",w=j[v],y=r?null:j["stage"===b?"thumb":"img"];if("navThumb"===b&&(k=m.$wrap),!w)return void o();d.Fotorama.cache[w]?!function z(){"error"===d.Fotorama.cache[w]?o():"loaded"===d.Fotorama.cache[w]?setTimeout(q,0):setTimeout(z,100)}():(d.Fotorama.cache[w]="*",t.on("load",q).on("error",o)),m.state="",s.src=w}}})}function Qb(a){Ie.append(Bd.spin().el).appendTo(a)}function Rb(){Ie.detach(),Bd&&Bd.stop()}function Sb(){var a=Dd[Xc];a&&!a.data().state&&(Qb(a),a.on("f:load f:error",function(){a.off("f:load f:error"),Rb()}))}function ec(a){W(a,sd),X(a,function(){setTimeout(function(){Q(ye)},0),Rc({time:Vd,guessIndex:d(this).data().eq,minMax:Oe})})}function lc(a,b){cb(a,b,function(a,c,e,f,g,h){if(!f){f=e[g]=qe[g].clone(),h=f.data(),h.data=e;var i=f[0];"stage"===b?(e.html&&d('<div class="'+kc+'"></div>').append(e._html?d(e.html).removeAttr("id").html(e._html):e.html).appendTo(f),e.caption&&d(N(oc,N(pc,e.caption))).appendTo(f),e.video&&f.addClass(zb).append(Fe.clone()),X(i,function(){setTimeout(function(){Q(re)},0),pd({index:h.eq,user:!0})}),te=te.add(f)):"navDot"===b?(ec(i),Ae=Ae.add(f)):"navThumb"===b&&(ec(i),h.$wrap=f.children(":first"),Be=Be.add(f),e.video&&h.$wrap.append(Fe.clone()))}})}function sc(a,b,c,d){return a&&a.length&&I(a,b,c,d)}function tc(a){cb(a,"stage",function(a,b,c,f,g,h){if(f){var i=x(b),j=c.fit||e.fit,k=c.position||e.position;h.eq=i,Re[Xc][i]=f.css(d.extend({left:Sd?0:r(b,Le.w,e.margin,Fd)},Sd&&l(0))),F(f[0])&&(f.appendTo(se),md(c.$video)),sc(h.$img,Le,j,k),sc(h.$full,Le,j,k)}})}function uc(a,b){if("thumbs"===Nd&&!isNaN(a)){var c=-a,f=-a+Le.nw;Be.each(function(){var a=d(this),g=a.data(),h=g.eq,i=function(){return{h:Ud,w:g.w}},j=i(),k=yd[h]||{},l=k.thumbfit||e.thumbfit,m=k.thumbposition||e.thumbposition;j.w=g.w,g.l+g.w<c||g.l>f||sc(g.$img,j,l,m)||b&&Pb([h],"navThumb",i,l,m)})}}function wc(a,b,c){if(!wc[c]){var f="nav"===c&&Od,g=0;b.append(a.filter(function(){for(var a,b=d(this),c=b.data(),e=0,f=yd.length;f>e;e++)if(c.data===yd[e]){a=!0,c.eq=e;break}return a||b.remove()&&!1}).sort(function(a,b){return d(a).data().eq-d(b).data().eq}).each(function(){if(f){var a=d(this),b=a.data(),c=Math.round(Ud*b.data.thumbratio)||Td;b.l=g,b.w=c,a.css({width:c}),g+=c+e.thumbmargin}})),wc[c]=!0}}function xc(a){return a-Se>Le.w/3}function yc(a){return!(Md||Je+a&&Je-zd+a||Cd)}function Gc(){var a=yc(0),b=yc(1);ue.toggleClass(Eb,a).attr(V(a)),ve.toggleClass(Eb,b).attr(V(b))}function Hc(){Ne.ok&&(Ne.prevent={"<":yc(0),">":yc(1)})}function Lc(a){var b,c,d=a.data();return Od?(b=d.l,c=d.w):(b=a.position().left,c=a.width()),{c:b+c/2,min:-b+10*e.thumbmargin,max:-b+Le.w-c-10*e.thumbmargin}}function Oc(a){var b=Dd[he].data();_(Ce,{time:1.2*a,pos:b.l,width:b.w-2*e.thumbborderwidth})}function Rc(a){var b=yd[a.guessIndex][he];if(b){var c=Oe.min!==Oe.max,d=a.minMax||c&&Lc(Dd[he]),e=c&&(a.keep&&Rc.l?Rc.l:h((a.coo||Le.nw/2)-Lc(b).c,d.min,d.max)),f=c&&h(e,Oe.min,Oe.max),g=1.1*a.time;_(ze,{time:g,pos:f||0,onEnd:function(){uc(f,!0)}}),ld(ye,K(f,Oe.min,Oe.max)),Rc.l=e}}function Tc(){_c(he),Qe[he].push(Dd[he].addClass(Wb))}function _c(a){for(var b=Qe[a];b.length;)b.shift().removeClass(Wb)}function bd(a){var b=Re[a];d.each(Ed,function(a,c){delete b[x(c)]}),d.each(b,function(a,c){delete b[a],c.detach()})}function cd(a){Fd=Gd=Je;var b=Dd[Xc];b&&(_c(Xc),Qe[Xc].push(b.addClass(Wb)),a||ie.show.onEnd(!0),v(se,0,!0),bd(Xc),tc(Ed),$(),bb())}function ed(a,b){a&&d.each(b,function(b,c){c&&d.extend(c,{width:a.width||c.width,height:a.height,minwidth:a.minwidth,maxwidth:a.maxwidth,minheight:a.minheight,maxheight:a.maxheight,ratio:S(a.ratio)})})}function fd(b,c){a.trigger(ib+":"+b,[ie,c])}function gd(){clearTimeout(hd.t),fe=1,e.stopautoplayontouch?ie.stopAutoplay():ce=!0}function hd(){fe&&(e.stopautoplayontouch||(id(),jd()),hd.t=setTimeout(function(){fe=0},Qc+Pc))}function id(){ce=!(!Cd&&!de)}function jd(){if(clearTimeout(jd.t),G.stop(jd.w),!e.autoplay||ce)return void(ie.autoplay&&(ie.autoplay=!1,fd("stopautoplay")));ie.autoplay||(ie.autoplay=!0,fd("startautoplay"));var a=Je,b=Dd[Xc].data();jd.w=G(function(){return b.state||a!==Je},function(){jd.t=setTimeout(function(){if(!ce&&a===Je){var b=Kd,c=yd[b][Xc].data();jd.w=G(function(){return c.state||b!==Kd},function(){ce||b!==Kd||ie.show(Md?Z(!Yd):Kd)})}},e.autoplay)})}function kd(){ie.fullScreen&&(ie.fullScreen=!1,Kc&&vc.cancel(le),Dc.removeClass(jb),Cc.removeClass(jb),a.removeClass(Zb).insertAfter(pe),Le=d.extend({},ee),md(Cd,!0,!0),rd("x",!1),ie.resize(),Pb(Ed,"stage"),Q(Ec,ae,_d),fd("fullscreenexit"))}function ld(a,b){Xd&&(a.removeClass(Ub+" "+Vb),b&&!Cd&&a.addClass(b.replace(/^|\s/g," "+Tb+"--")))}function md(a,b,c){b&&(qe.removeClass(nb),Cd=!1,o()),a&&a!==Cd&&(a.remove(),fd("unloadvideo")),c&&(id(),jd())}function nd(a){qe.toggleClass(qb,a)}function od(a){if(!Me.flow){var b=a?a.pageX:od.x,c=b&&!yc(xc(b))&&e.click;od.p!==c&&re.toggleClass(Cb,c)&&(od.p=c,od.x=b)}}function pd(a){clearTimeout(pd.t),e.clicktransition&&e.clicktransition!==e.transition?setTimeout(function(){var b=e.transition;ie.setOptions({transition:e.clicktransition}),Wd=b,pd.t=setTimeout(function(){ie.show(a)},10)},0):ie.show(a)}function qd(a,b){var c=a.target,f=d(c);f.hasClass(mc)?ie.playVideo():c===Ee?ie.toggleFullScreen():Cd?c===He&&md(Cd,!0,!0):b?nd():e.click&&pd({index:a.shiftKey||Z(xc(a._x)),slow:a.altKey,user:!0})}function rd(a,b){Me[a]=Oe[a]=b}function sd(a){var b=d(this).data().eq;pd({index:b,slow:a.altKey,user:!0,coo:a._x-ye.offset().left})}function td(a){pd({index:we.index(this)?">":"<",slow:a.altKey,user:!0})}function ud(a){X(a,function(){setTimeout(function(){Q(re)},0),nd(!1)})}function vd(){if(m(),u(),!vd.i){vd.i=!0;var a=e.startindex;(a||e.hash&&c.hash)&&(Ld=L(a||c.hash.replace(/^#/,""),yd,0===ie.index||a,a)),Je=Fd=Gd=Hd=Ld=z(Ld)||0}if(zd){if(wd())return;Cd&&md(Cd,!0),Ed=[],bd(Xc),vd.ok=!0,ie.show({index:Je,time:0}),ie.resize()}else ie.destroy()}function wd(){return!wd.f===Yd?(wd.f=Yd,Je=zd-1-Je,ie.reverse(),!0):void 0}function xd(){xd.ok||(xd.ok=!0,fd("ready"))}Cc=d("html"),Dc=d("body");var yd,zd,Ad,Bd,Cd,Dd,Ed,Fd,Gd,Hd,Id,Jd,Kd,Ld,Md,Nd,Od,Pd,Qd,Rd,Sd,Td,Ud,Vd,Wd,Xd,Yd,Zd,$d,_d,ae,be,ce,de,ee,fe,ge,he,ie=this,je=d.now(),ke=ib+je,le=a[0],me=1,ne=a.data(),oe=d("<style></style>"),pe=d(N(Yb)),qe=d(N(kb)),re=d(N(xb)).appendTo(qe),se=(re[0],d(N(Ab)).appendTo(re)),te=d(),ue=d(N(Db+" "+Fb+rc)),ve=d(N(Db+" "+Gb+rc)),we=ue.add(ve).appendTo(re),xe=d(N(Ib)),ye=d(N(Hb)).appendTo(xe),ze=d(N(Jb)).appendTo(ye),Ae=d(),Be=d(),Ce=(se.data(),ze.data(),d(N(jc)).appendTo(ze)),De=d(N($b+rc)),Ee=De[0],Fe=d(N(mc)),Ge=d(N(nc)).appendTo(re),He=Ge[0],Ie=d(N(qc)),Je=!1,Ke={},Le={},Me={},Ne={},Oe={},Pe={},Qe={},Re={},Se=0,Te=[];
qe[Xc]=d(N(yb)),qe[Zc]=d(N(Mb+" "+Ob+rc,N(ic))),qe[Yc]=d(N(Mb+" "+Nb+rc,N(hc))),Qe[Xc]=[],Qe[Zc]=[],Qe[Yc]=[],Re[Xc]={},qe.addClass(Ic?mb:lb).toggleClass(qb,!e.controlsonstart),ne.fotorama=this,ie.startAutoplay=function(a){return ie.autoplay?this:(ce=de=!1,t(a||e.autoplay),jd(),this)},ie.stopAutoplay=function(){return ie.autoplay&&(ce=de=!0,jd()),this},ie.show=function(a){var b;"object"!=typeof a?(b=a,a={}):b=a.index,b=">"===b?Gd+1:"<"===b?Gd-1:"<<"===b?0:">>"===b?zd-1:b,b=isNaN(b)?L(b,yd,!0):b,b="undefined"==typeof b?Je||0:b,ie.activeIndex=Je=z(b),Id=E(Je),Jd=U(Je),Kd=x(Je+(Yd?-1:1)),Ed=[Je,Id,Jd],Gd=Md?b:Je;var c=Math.abs(Hd-Gd),d=w(a.time,function(){return Math.min(Vd*(1+(c-1)/12),2*Vd)}),f=a.overPos;a.slow&&(d*=10);var g=Dd;ie.activeFrame=Dd=yd[Je];var i=g===Dd&&!a.user;md(Cd,Dd.i!==yd[x(Fd)].i),lc(Ed,"stage"),tc(Mc?[Gd]:[Gd,E(Gd),U(Gd)]),rd("go",!0),i||fd("show",{user:a.user,time:d}),ce=!0;var j=ie.show.onEnd=function(b){if(!j.ok){if(j.ok=!0,b||cd(!0),i||fd("showend",{user:a.user}),!b&&Wd&&Wd!==e.transition)return ie.setOptions({transition:Wd}),void(Wd=!1);Sb(),Pb(Ed,"stage"),rd("go",!1),Hc(),od(),id(),jd()}};if(Sd){var k=Dd[Xc],l=Je!==Hd?yd[Hd][Xc]:null;ab(k,l,te,{time:d,method:e.transition,onEnd:j},Te)}else _(se,{pos:-r(Gd,Le.w,e.margin,Fd),overPos:f,time:d,onEnd:j});if(Gc(),Nd){Tc();var m=y(Je+h(Gd-Hd,-1,1));Rc({time:d,coo:m!==Je&&a.coo,guessIndex:"undefined"!=typeof a.coo?m:Je,keep:i}),Od&&Oc(d)}return be="undefined"!=typeof Hd&&Hd!==Je,Hd=Je,e.hash&&be&&!ie.eq&&H(Dd.id||Je+1),this},ie.requestFullScreen=function(){return Qd&&!ie.fullScreen&&(_d=Ec.scrollTop(),ae=Ec.scrollLeft(),Q(Ec),rd("x",!0),ee=d.extend({},Le),a.addClass(Zb).appendTo(Dc.addClass(jb)),Cc.addClass(jb),md(Cd,!0,!0),ie.fullScreen=!0,Rd&&vc.request(le),ie.resize(),Pb(Ed,"stage"),Sb(),fd("fullscreenenter")),this},ie.cancelFullScreen=function(){return Rd&&vc.is()?vc.cancel(b):kd(),this},ie.toggleFullScreen=function(){return ie[(ie.fullScreen?"cancel":"request")+"FullScreen"]()},T(b,vc.event,function(){!yd||vc.is()||Cd||kd()}),ie.resize=function(a){if(!yd)return this;var b=arguments[1]||0,c=arguments[2];ed(ie.fullScreen?{width:"100%",maxwidth:null,minwidth:null,height:"100%",maxheight:null,minheight:null}:R(a),[Le,c||ie.fullScreen||e]);var d=Le.width,f=Le.height,g=Le.ratio,i=Ec.height()-(Nd?ye.height():0);return q(d)&&(qe.addClass(ub).css({width:d,minWidth:Le.minwidth||0,maxWidth:Le.maxwidth||ad}),d=Le.W=Le.w=qe.width(),Le.nw=Nd&&p(e.navwidth,d)||d,e.glimpse&&(Le.w-=Math.round(2*(p(e.glimpse,d)||0))),se.css({width:Le.w,marginLeft:(Le.W-Le.w)/2}),f=p(f,i),f=f||g&&d/g,f&&(d=Math.round(d),f=Le.h=Math.round(h(f,p(Le.minheight,i),p(Le.maxheight,i))),re.stop().animate({width:d,height:f},b,function(){qe.removeClass(ub)}),cd(),Nd&&(ye.stop().animate({width:Le.nw},b),Rc({guessIndex:Je,time:b,keep:!0}),Od&&wc.nav&&Oc(b)),$d=c||!0,xd())),Se=re.offset().left,this},ie.setOptions=function(a){return d.extend(e,a),vd(),this},ie.shuffle=function(){return yd&&O(yd)&&vd(),this},ie.destroy=function(){return ie.cancelFullScreen(),ie.stopAutoplay(),yd=ie.data=null,j(),Ed=[],bd(Xc),vd.ok=!1,this},ie.playVideo=function(){var a=Dd,b=a.video,c=Je;return"object"==typeof b&&a.videoReady&&(Rd&&ie.fullScreen&&ie.cancelFullScreen(),G(function(){return!vc.is()||c!==Je},function(){c===Je&&(a.$video=a.$video||d(d.Fotorama.jst.video(b)),a.$video.appendTo(a[Xc]),qe.addClass(nb),Cd=a.$video,o(),we.blur(),De.blur(),fd("loadvideo"))})),this},ie.stopVideo=function(){return md(Cd,!0,!0),this},re.on("mousemove",od),Me=db(se,{onStart:gd,onMove:function(a,b){ld(re,b.edge)},onTouchEnd:hd,onEnd:function(a){ld(re);var b=(Nc&&!ge||a.touch)&&e.arrows&&"always"!==e.arrows;if(a.moved||b&&a.pos!==a.newPos&&!a.control){var c=s(a.newPos,Le.w,e.margin,Fd);ie.show({index:c,time:Sd?Vd:a.time,overPos:a.overPos,user:!0})}else a.aborted||a.control||qd(a.startEvent,b)},timeLow:1,timeHigh:1,friction:2,select:"."+Xb+", ."+Xb+" *",$wrap:re}),Oe=db(ze,{onStart:gd,onMove:function(a,b){ld(ye,b.edge)},onTouchEnd:hd,onEnd:function(a){function b(){Rc.l=a.newPos,id(),jd(),uc(a.newPos,!0)}if(a.moved)a.pos!==a.newPos?(ce=!0,_(ze,{time:a.time,pos:a.newPos,overPos:a.overPos,onEnd:b}),uc(a.newPos),Xd&&ld(ye,K(a.newPos,Oe.min,Oe.max))):b();else{var c=a.$target.closest("."+Mb,ze)[0];c&&sd.call(c,a.startEvent)}},timeLow:.5,timeHigh:2,friction:5,$wrap:ye}),Ne=eb(re,{shift:!0,onEnd:function(a,b){gd(),hd(),ie.show({index:b,slow:a.altKey})}}),Pe=eb(ye,{onEnd:function(a,b){gd(),hd();var c=v(ze)+.25*b;ze.css(k(h(c,Oe.min,Oe.max))),Xd&&ld(ye,K(c,Oe.min,Oe.max)),Pe.prevent={"<":c>=Oe.max,">":c<=Oe.min},clearTimeout(Pe.t),Pe.t=setTimeout(function(){Rc.l=c,uc(c,!0)},Pc),uc(c)}}),qe.hover(function(){setTimeout(function(){fe||nd(!(ge=!0))},0)},function(){ge&&nd(!(ge=!1))}),M(we,function(a){Y(a),td.call(this,a)},{onStart:function(){gd(),Me.control=!0},onTouchEnd:hd}),we.each(function(){W(this,function(a){td.call(this,a)}),ud(this)}),W(Ee,ie.toggleFullScreen),ud(Ee),d.each("load push pop shift unshift reverse sort splice".split(" "),function(a,b){ie[b]=function(){return yd=yd||[],"load"!==b?Array.prototype[b].apply(yd,arguments):arguments[0]&&"object"==typeof arguments[0]&&arguments[0].length&&(yd=P(arguments[0])),vd(),ie}}),vd()},d.fn.fotorama=function(b){return this.each(function(){var c=this,e=d(this),f=e.data(),g=f.fotorama;g?g.setOptions(b,!0):G(function(){return!E(c)},function(){f.urtext=e.html(),new d.Fotorama(e,d.extend({},cd,a.fotoramaDefaults,b,f))})})},d.Fotorama.instances=[],d.Fotorama.cache={},d.Fotorama.measures={},d=d||{},d.Fotorama=d.Fotorama||{},d.Fotorama.jst=d.Fotorama.jst||{},d.Fotorama.jst.style=function(a){{var b,c="";tc.escape}return c+=".fotorama"+(null==(b=a.s)?"":b)+" .fotorama__nav--thumbs .fotorama__nav__frame{\npadding:"+(null==(b=a.m)?"":b)+"px;\nheight:"+(null==(b=a.h)?"":b)+"px}\n.fotorama"+(null==(b=a.s)?"":b)+" .fotorama__thumb-border{\nheight:"+(null==(b=a.h-a.b*(a.q?0:2))?"":b)+"px;\nborder-width:"+(null==(b=a.b)?"":b)+"px;\nmargin-top:"+(null==(b=a.m)?"":b)+"px}"},d.Fotorama.jst.video=function(a){function b(){c+=d.call(arguments,"")}var c="",d=(tc.escape,Array.prototype.join);return c+='<div class="fotorama__video"><iframe src="',b(("youtube"==a.type?a.p+"youtube.com/embed/"+a.id+"?autoplay=1":"vimeo"==a.type?a.p+"player.vimeo.com/video/"+a.id+"?autoplay=1&badge=0":a.id)+(a.s&&"custom"!=a.type?"&"+a.s:"")),c+='" frameborder="0" allowfullscreen></iframe></div>\n'},d(function(){d("."+ib+':not([data-auto="false"])').fotorama()})}(window,document,location,"undefined"!=typeof jQuery&&jQuery);
/*!
 * Vue.js v2.5.9
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Vue=t()}(this,function(){"use strict";function e(e){return void 0===e||null===e}function t(e){return void 0!==e&&null!==e}function n(e){return!0===e}function r(e){return!1===e}function i(e){return"string"==typeof e||"number"==typeof e||"boolean"==typeof e}function o(e){return null!==e&&"object"==typeof e}function a(e){return"[object Object]"===Si.call(e)}function s(e){return"[object RegExp]"===Si.call(e)}function c(e){var t=parseFloat(String(e));return t>=0&&Math.floor(t)===t&&isFinite(e)}function u(e){return null==e?"":"object"==typeof e?JSON.stringify(e,null,2):String(e)}function l(e){var t=parseFloat(e);return isNaN(t)?e:t}function f(e,t){for(var n=Object.create(null),r=e.split(","),i=0;i<r.length;i++)n[r[i]]=!0;return t?function(e){return n[e.toLowerCase()]}:function(e){return n[e]}}function d(e,t){if(e.length){var n=e.indexOf(t);if(n>-1)return e.splice(n,1)}}function p(e,t){return ji.call(e,t)}function v(e){var t=Object.create(null);return function(n){return t[n]||(t[n]=e(n))}}function h(e,t){function n(n){var r=arguments.length;return r?r>1?e.apply(t,arguments):e.call(t,n):e.call(t)}return n._length=e.length,n}function m(e,t){t=t||0;for(var n=e.length-t,r=new Array(n);n--;)r[n]=e[n+t];return r}function y(e,t){for(var n in t)e[n]=t[n];return e}function g(e){for(var t={},n=0;n<e.length;n++)e[n]&&y(t,e[n]);return t}function _(e,t,n){}function b(e,t){if(e===t)return!0;var n=o(e),r=o(t);if(!n||!r)return!n&&!r&&String(e)===String(t);try{var i=Array.isArray(e),a=Array.isArray(t);if(i&&a)return e.length===t.length&&e.every(function(e,n){return b(e,t[n])});if(i||a)return!1;var s=Object.keys(e),c=Object.keys(t);return s.length===c.length&&s.every(function(n){return b(e[n],t[n])})}catch(e){return!1}}function $(e,t){for(var n=0;n<e.length;n++)if(b(e[n],t))return n;return-1}function C(e){var t=!1;return function(){t||(t=!0,e.apply(this,arguments))}}function w(e){var t=(e+"").charCodeAt(0);return 36===t||95===t}function x(e,t,n,r){Object.defineProperty(e,t,{value:n,enumerable:!!r,writable:!0,configurable:!0})}function k(e){if(!Vi.test(e)){var t=e.split(".");return function(e){for(var n=0;n<t.length;n++){if(!e)return;e=e[t[n]]}return e}}}function A(e){return"function"==typeof e&&/native code/.test(e.toString())}function O(e){lo.target&&fo.push(lo.target),lo.target=e}function S(){lo.target=fo.pop()}function T(e){return new po(void 0,void 0,void 0,String(e))}function E(e,t){var n=e.componentOptions,r=new po(e.tag,e.data,e.children,e.text,e.elm,e.context,n,e.asyncFactory);return r.ns=e.ns,r.isStatic=e.isStatic,r.key=e.key,r.isComment=e.isComment,r.fnContext=e.fnContext,r.fnOptions=e.fnOptions,r.fnScopeId=e.fnScopeId,r.isCloned=!0,t&&(e.children&&(r.children=j(e.children,!0)),n&&n.children&&(n.children=j(n.children,!0))),r}function j(e,t){for(var n=e.length,r=new Array(n),i=0;i<n;i++)r[i]=E(e[i],t);return r}function N(e,t,n){e.__proto__=t}function L(e,t,n){for(var r=0,i=n.length;r<i;r++){var o=n[r];x(e,o,t[o])}}function I(e,t){if(o(e)&&!(e instanceof po)){var n;return p(e,"__ob__")&&e.__ob__ instanceof bo?n=e.__ob__:_o.shouldConvert&&!oo()&&(Array.isArray(e)||a(e))&&Object.isExtensible(e)&&!e._isVue&&(n=new bo(e)),t&&n&&n.vmCount++,n}}function M(e,t,n,r,i){var o=new lo,a=Object.getOwnPropertyDescriptor(e,t);if(!a||!1!==a.configurable){var s=a&&a.get,c=a&&a.set,u=!i&&I(n);Object.defineProperty(e,t,{enumerable:!0,configurable:!0,get:function(){var t=s?s.call(e):n;return lo.target&&(o.depend(),u&&(u.dep.depend(),Array.isArray(t)&&F(t))),t},set:function(t){var r=s?s.call(e):n;t===r||t!==t&&r!==r||(c?c.call(e,t):n=t,u=!i&&I(t),o.notify())}})}}function D(e,t,n){if(Array.isArray(e)&&c(t))return e.length=Math.max(e.length,t),e.splice(t,1,n),n;if(t in e&&!(t in Object.prototype))return e[t]=n,n;var r=e.__ob__;return e._isVue||r&&r.vmCount?n:r?(M(r.value,t,n),r.dep.notify(),n):(e[t]=n,n)}function P(e,t){if(Array.isArray(e)&&c(t))e.splice(t,1);else{var n=e.__ob__;e._isVue||n&&n.vmCount||p(e,t)&&(delete e[t],n&&n.dep.notify())}}function F(e){for(var t=void 0,n=0,r=e.length;n<r;n++)(t=e[n])&&t.__ob__&&t.__ob__.dep.depend(),Array.isArray(t)&&F(t)}function R(e,t){if(!t)return e;for(var n,r,i,o=Object.keys(t),s=0;s<o.length;s++)r=e[n=o[s]],i=t[n],p(e,n)?a(r)&&a(i)&&R(r,i):D(e,n,i);return e}function H(e,t,n){return n?function(){var r="function"==typeof t?t.call(n):t,i="function"==typeof e?e.call(n):e;return r?R(r,i):i}:t?e?function(){return R("function"==typeof t?t.call(this):t,"function"==typeof e?e.call(this):e)}:t:e}function B(e,t){return t?e?e.concat(t):Array.isArray(t)?t:[t]:e}function U(e,t,n,r){var i=Object.create(e||null);return t?y(i,t):i}function V(e,t){var n=e.props;if(n){var r,i,o={};if(Array.isArray(n))for(r=n.length;r--;)"string"==typeof(i=n[r])&&(o[Li(i)]={type:null});else if(a(n))for(var s in n)i=n[s],o[Li(s)]=a(i)?i:{type:i};e.props=o}}function z(e,t){var n=e.inject,r=e.inject={};if(Array.isArray(n))for(var i=0;i<n.length;i++)r[n[i]]={from:n[i]};else if(a(n))for(var o in n){var s=n[o];r[o]=a(s)?y({from:o},s):{from:s}}}function K(e){var t=e.directives;if(t)for(var n in t){var r=t[n];"function"==typeof r&&(t[n]={bind:r,update:r})}}function J(e,t,n){function r(r){var i=$o[r]||xo;c[r]=i(e[r],t[r],n,r)}"function"==typeof t&&(t=t.options),V(t,n),z(t,n),K(t);var i=t.extends;if(i&&(e=J(e,i,n)),t.mixins)for(var o=0,a=t.mixins.length;o<a;o++)e=J(e,t.mixins[o],n);var s,c={};for(s in e)r(s);for(s in t)p(e,s)||r(s);return c}function q(e,t,n,r){if("string"==typeof n){var i=e[t];if(p(i,n))return i[n];var o=Li(n);if(p(i,o))return i[o];var a=Ii(o);if(p(i,a))return i[a];var s=i[n]||i[o]||i[a];return s}}function W(e,t,n,r){var i=t[e],o=!p(n,e),a=n[e];if(X(Boolean,i.type)&&(o&&!p(i,"default")?a=!1:X(String,i.type)||""!==a&&a!==Di(e)||(a=!0)),void 0===a){a=G(r,i,e);var s=_o.shouldConvert;_o.shouldConvert=!0,I(a),_o.shouldConvert=s}return a}function G(e,t,n){if(p(t,"default")){var r=t.default;return e&&e.$options.propsData&&void 0===e.$options.propsData[n]&&void 0!==e._props[n]?e._props[n]:"function"==typeof r&&"Function"!==Z(t.type)?r.call(e):r}}function Z(e){var t=e&&e.toString().match(/^\s*function (\w+)/);return t?t[1]:""}function X(e,t){if(!Array.isArray(t))return Z(t)===Z(e);for(var n=0,r=t.length;n<r;n++)if(Z(t[n])===Z(e))return!0;return!1}function Y(e,t,n){if(t)for(var r=t;r=r.$parent;){var i=r.$options.errorCaptured;if(i)for(var o=0;o<i.length;o++)try{if(!1===i[o].call(r,e,t,n))return}catch(e){Q(e,r,"errorCaptured hook")}}Q(e,t,n)}function Q(e,t,n){if(Ui.errorHandler)try{return Ui.errorHandler.call(null,e,t,n)}catch(e){ee(e,null,"config.errorHandler")}ee(e,t,n)}function ee(e,t,n){if(!Ki&&!Ji||"undefined"==typeof console)throw e;console.error(e)}function te(){Ao=!1;var e=ko.slice(0);ko.length=0;for(var t=0;t<e.length;t++)e[t]()}function ne(e){return e._withTask||(e._withTask=function(){Oo=!0;var t=e.apply(null,arguments);return Oo=!1,t})}function re(e,t){var n;if(ko.push(function(){if(e)try{e.call(t)}catch(e){Y(e,t,"nextTick")}else n&&n(t)}),Ao||(Ao=!0,Oo?wo():Co()),!e&&"undefined"!=typeof Promise)return new Promise(function(e){n=e})}function ie(e){oe(e,No),No.clear()}function oe(e,t){var n,r,i=Array.isArray(e);if((i||o(e))&&!Object.isFrozen(e)){if(e.__ob__){var a=e.__ob__.dep.id;if(t.has(a))return;t.add(a)}if(i)for(n=e.length;n--;)oe(e[n],t);else for(n=(r=Object.keys(e)).length;n--;)oe(e[r[n]],t)}}function ae(e){function t(){var e=arguments,n=t.fns;if(!Array.isArray(n))return n.apply(null,arguments);for(var r=n.slice(),i=0;i<r.length;i++)r[i].apply(null,e)}return t.fns=e,t}function se(t,n,r,i,o){var a,s,c,u;for(a in t)s=t[a],c=n[a],u=Lo(a),e(s)||(e(c)?(e(s.fns)&&(s=t[a]=ae(s)),r(u.name,s,u.once,u.capture,u.passive)):s!==c&&(c.fns=s,t[a]=c));for(a in n)e(t[a])&&i((u=Lo(a)).name,n[a],u.capture)}function ce(r,i,o){function a(){o.apply(this,arguments),d(s.fns,a)}r instanceof po&&(r=r.data.hook||(r.data.hook={}));var s,c=r[i];e(c)?s=ae([a]):t(c.fns)&&n(c.merged)?(s=c).fns.push(a):s=ae([c,a]),s.merged=!0,r[i]=s}function ue(n,r,i){var o=r.options.props;if(!e(o)){var a={},s=n.attrs,c=n.props;if(t(s)||t(c))for(var u in o){var l=Di(u);le(a,c,u,l,!0)||le(a,s,u,l,!1)}return a}}function le(e,n,r,i,o){if(t(n)){if(p(n,r))return e[r]=n[r],o||delete n[r],!0;if(p(n,i))return e[r]=n[i],o||delete n[i],!0}return!1}function fe(e){for(var t=0;t<e.length;t++)if(Array.isArray(e[t]))return Array.prototype.concat.apply([],e);return e}function de(e){return i(e)?[T(e)]:Array.isArray(e)?ve(e):void 0}function pe(e){return t(e)&&t(e.text)&&r(e.isComment)}function ve(r,o){var a,s,c,u,l=[];for(a=0;a<r.length;a++)e(s=r[a])||"boolean"==typeof s||(u=l[c=l.length-1],Array.isArray(s)?s.length>0&&(pe((s=ve(s,(o||"")+"_"+a))[0])&&pe(u)&&(l[c]=T(u.text+s[0].text),s.shift()),l.push.apply(l,s)):i(s)?pe(u)?l[c]=T(u.text+s):""!==s&&l.push(T(s)):pe(s)&&pe(u)?l[c]=T(u.text+s.text):(n(r._isVList)&&t(s.tag)&&e(s.key)&&t(o)&&(s.key="__vlist"+o+"_"+a+"__"),l.push(s)));return l}function he(e,t){return(e.__esModule||so&&"Module"===e[Symbol.toStringTag])&&(e=e.default),o(e)?t.extend(e):e}function me(e,t,n,r,i){var o=ho();return o.asyncFactory=e,o.asyncMeta={data:t,context:n,children:r,tag:i},o}function ye(r,i,a){if(n(r.error)&&t(r.errorComp))return r.errorComp;if(t(r.resolved))return r.resolved;if(n(r.loading)&&t(r.loadingComp))return r.loadingComp;if(!t(r.contexts)){var s=r.contexts=[a],c=!0,u=function(){for(var e=0,t=s.length;e<t;e++)s[e].$forceUpdate()},l=C(function(e){r.resolved=he(e,i),c||u()}),f=C(function(e){t(r.errorComp)&&(r.error=!0,u())}),d=r(l,f);return o(d)&&("function"==typeof d.then?e(r.resolved)&&d.then(l,f):t(d.component)&&"function"==typeof d.component.then&&(d.component.then(l,f),t(d.error)&&(r.errorComp=he(d.error,i)),t(d.loading)&&(r.loadingComp=he(d.loading,i),0===d.delay?r.loading=!0:setTimeout(function(){e(r.resolved)&&e(r.error)&&(r.loading=!0,u())},d.delay||200)),t(d.timeout)&&setTimeout(function(){e(r.resolved)&&f(null)},d.timeout))),c=!1,r.loading?r.loadingComp:r.resolved}r.contexts.push(a)}function ge(e){return e.isComment&&e.asyncFactory}function _e(e){if(Array.isArray(e))for(var n=0;n<e.length;n++){var r=e[n];if(t(r)&&(t(r.componentOptions)||ge(r)))return r}}function be(e){e._events=Object.create(null),e._hasHookEvent=!1;var t=e.$options._parentListeners;t&&we(e,t)}function $e(e,t,n){n?jo.$once(e,t):jo.$on(e,t)}function Ce(e,t){jo.$off(e,t)}function we(e,t,n){jo=e,se(t,n||{},$e,Ce,e),jo=void 0}function xe(e,t){var n={};if(!e)return n;for(var r=0,i=e.length;r<i;r++){var o=e[r],a=o.data;if(a&&a.attrs&&a.attrs.slot&&delete a.attrs.slot,o.context!==t&&o.fnContext!==t||!a||null==a.slot)(n.default||(n.default=[])).push(o);else{var s=o.data.slot,c=n[s]||(n[s]=[]);"template"===o.tag?c.push.apply(c,o.children):c.push(o)}}for(var u in n)n[u].every(ke)&&delete n[u];return n}function ke(e){return e.isComment&&!e.asyncFactory||" "===e.text}function Ae(e,t){t=t||{};for(var n=0;n<e.length;n++)Array.isArray(e[n])?Ae(e[n],t):t[e[n].key]=e[n].fn;return t}function Oe(e){var t=e.$options,n=t.parent;if(n&&!t.abstract){for(;n.$options.abstract&&n.$parent;)n=n.$parent;n.$children.push(e)}e.$parent=n,e.$root=n?n.$root:e,e.$children=[],e.$refs={},e._watcher=null,e._inactive=null,e._directInactive=!1,e._isMounted=!1,e._isDestroyed=!1,e._isBeingDestroyed=!1}function Se(e,t,n){e.$el=t,e.$options.render||(e.$options.render=ho),Le(e,"beforeMount");var r;return r=function(){e._update(e._render(),n)},new Uo(e,r,_,null,!0),n=!1,null==e.$vnode&&(e._isMounted=!0,Le(e,"mounted")),e}function Te(e,t,n,r,i){var o=!!(i||e.$options._renderChildren||r.data.scopedSlots||e.$scopedSlots!==Oi);if(e.$options._parentVnode=r,e.$vnode=r,e._vnode&&(e._vnode.parent=r),e.$options._renderChildren=i,e.$attrs=r.data&&r.data.attrs||Oi,e.$listeners=n||Oi,t&&e.$options.props){_o.shouldConvert=!1;for(var a=e._props,s=e.$options._propKeys||[],c=0;c<s.length;c++){var u=s[c];a[u]=W(u,e.$options.props,t,e)}_o.shouldConvert=!0,e.$options.propsData=t}if(n){var l=e.$options._parentListeners;e.$options._parentListeners=n,we(e,n,l)}o&&(e.$slots=xe(i,r.context),e.$forceUpdate())}function Ee(e){for(;e&&(e=e.$parent);)if(e._inactive)return!0;return!1}function je(e,t){if(t){if(e._directInactive=!1,Ee(e))return}else if(e._directInactive)return;if(e._inactive||null===e._inactive){e._inactive=!1;for(var n=0;n<e.$children.length;n++)je(e.$children[n]);Le(e,"activated")}}function Ne(e,t){if(!(t&&(e._directInactive=!0,Ee(e))||e._inactive)){e._inactive=!0;for(var n=0;n<e.$children.length;n++)Ne(e.$children[n]);Le(e,"deactivated")}}function Le(e,t){var n=e.$options[t];if(n)for(var r=0,i=n.length;r<i;r++)try{n[r].call(e)}catch(n){Y(n,e,t+" hook")}e._hasHookEvent&&e.$emit("hook:"+t)}function Ie(){Ho=Mo.length=Do.length=0,Po={},Fo=Ro=!1}function Me(){Ro=!0;var e,t;for(Mo.sort(function(e,t){return e.id-t.id}),Ho=0;Ho<Mo.length;Ho++)t=(e=Mo[Ho]).id,Po[t]=null,e.run();var n=Do.slice(),r=Mo.slice();Ie(),Fe(n),De(r),ao&&Ui.devtools&&ao.emit("flush")}function De(e){for(var t=e.length;t--;){var n=e[t],r=n.vm;r._watcher===n&&r._isMounted&&Le(r,"updated")}}function Pe(e){e._inactive=!1,Do.push(e)}function Fe(e){for(var t=0;t<e.length;t++)e[t]._inactive=!0,je(e[t],!0)}function Re(e){var t=e.id;if(null==Po[t]){if(Po[t]=!0,Ro){for(var n=Mo.length-1;n>Ho&&Mo[n].id>e.id;)n--;Mo.splice(n+1,0,e)}else Mo.push(e);Fo||(Fo=!0,re(Me))}}function He(e,t,n){Vo.get=function(){return this[t][n]},Vo.set=function(e){this[t][n]=e},Object.defineProperty(e,n,Vo)}function Be(e){e._watchers=[];var t=e.$options;t.props&&Ue(e,t.props),t.methods&&We(e,t.methods),t.data?Ve(e):I(e._data={},!0),t.computed&&Ke(e,t.computed),t.watch&&t.watch!==eo&&Ge(e,t.watch)}function Ue(e,t){var n=e.$options.propsData||{},r=e._props={},i=e.$options._propKeys=[],o=!e.$parent;_o.shouldConvert=o;for(var a in t)!function(o){i.push(o);var a=W(o,t,n,e);M(r,o,a),o in e||He(e,"_props",o)}(a);_o.shouldConvert=!0}function Ve(e){var t=e.$options.data;a(t=e._data="function"==typeof t?ze(t,e):t||{})||(t={});for(var n=Object.keys(t),r=e.$options.props,i=n.length;i--;){var o=n[i];r&&p(r,o)||w(o)||He(e,"_data",o)}I(t,!0)}function ze(e,t){try{return e.call(t,t)}catch(e){return Y(e,t,"data()"),{}}}function Ke(e,t){var n=e._computedWatchers=Object.create(null),r=oo();for(var i in t){var o=t[i],a="function"==typeof o?o:o.get;r||(n[i]=new Uo(e,a||_,_,zo)),i in e||Je(e,i,o)}}function Je(e,t,n){var r=!oo();"function"==typeof n?(Vo.get=r?qe(t):n,Vo.set=_):(Vo.get=n.get?r&&!1!==n.cache?qe(t):n.get:_,Vo.set=n.set?n.set:_),Object.defineProperty(e,t,Vo)}function qe(e){return function(){var t=this._computedWatchers&&this._computedWatchers[e];if(t)return t.dirty&&t.evaluate(),lo.target&&t.depend(),t.value}}function We(e,t){for(var n in t)e[n]=null==t[n]?_:h(t[n],e)}function Ge(e,t){for(var n in t){var r=t[n];if(Array.isArray(r))for(var i=0;i<r.length;i++)Ze(e,n,r[i]);else Ze(e,n,r)}}function Ze(e,t,n,r){return a(n)&&(r=n,n=n.handler),"string"==typeof n&&(n=e[n]),e.$watch(t,n,r)}function Xe(e){var t=e.$options.provide;t&&(e._provided="function"==typeof t?t.call(e):t)}function Ye(e){var t=Qe(e.$options.inject,e);t&&(_o.shouldConvert=!1,Object.keys(t).forEach(function(n){M(e,n,t[n])}),_o.shouldConvert=!0)}function Qe(e,t){if(e){for(var n=Object.create(null),r=so?Reflect.ownKeys(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}):Object.keys(e),i=0;i<r.length;i++){for(var o=r[i],a=e[o].from,s=t;s;){if(s._provided&&a in s._provided){n[o]=s._provided[a];break}s=s.$parent}if(!s&&"default"in e[o]){var c=e[o].default;n[o]="function"==typeof c?c.call(t):c}}return n}}function et(e,n){var r,i,a,s,c;if(Array.isArray(e)||"string"==typeof e)for(r=new Array(e.length),i=0,a=e.length;i<a;i++)r[i]=n(e[i],i);else if("number"==typeof e)for(r=new Array(e),i=0;i<e;i++)r[i]=n(i+1,i);else if(o(e))for(s=Object.keys(e),r=new Array(s.length),i=0,a=s.length;i<a;i++)c=s[i],r[i]=n(e[c],c,i);return t(r)&&(r._isVList=!0),r}function tt(e,t,n,r){var i,o=this.$scopedSlots[e];if(o)n=n||{},r&&(n=y(y({},r),n)),i=o(n)||t;else{var a=this.$slots[e];a&&(a._rendered=!0),i=a||t}var s=n&&n.slot;return s?this.$createElement("template",{slot:s},i):i}function nt(e){return q(this.$options,"filters",e,!0)||Fi}function rt(e,t,n,r){var i=Ui.keyCodes[t]||n;return i?Array.isArray(i)?-1===i.indexOf(e):i!==e:r?Di(r)!==t:void 0}function it(e,t,n,r,i){if(n)if(o(n)){Array.isArray(n)&&(n=g(n));var a;for(var s in n)!function(o){if("class"===o||"style"===o||Ei(o))a=e;else{var s=e.attrs&&e.attrs.type;a=r||Ui.mustUseProp(t,s,o)?e.domProps||(e.domProps={}):e.attrs||(e.attrs={})}o in a||(a[o]=n[o],i&&((e.on||(e.on={}))["update:"+o]=function(e){n[o]=e}))}(s)}else;return e}function ot(e,t,n){var r=arguments.length<3,i=this.$options.staticRenderFns,o=r||n?this._staticTrees||(this._staticTrees=[]):i.cached||(i.cached=[]),a=o[e];return a&&!t?Array.isArray(a)?j(a):E(a):(a=o[e]=i[e].call(this._renderProxy,null,this),st(a,"__static__"+e,!1),a)}function at(e,t,n){return st(e,"__once__"+t+(n?"_"+n:""),!0),e}function st(e,t,n){if(Array.isArray(e))for(var r=0;r<e.length;r++)e[r]&&"string"!=typeof e[r]&&ct(e[r],t+"_"+r,n);else ct(e,t,n)}function ct(e,t,n){e.isStatic=!0,e.key=t,e.isOnce=n}function ut(e,t){if(t)if(a(t)){var n=e.on=e.on?y({},e.on):{};for(var r in t){var i=n[r],o=t[r];n[r]=i?[].concat(i,o):o}}else;return e}function lt(e){e._o=at,e._n=l,e._s=u,e._l=et,e._t=tt,e._q=b,e._i=$,e._m=ot,e._f=nt,e._k=rt,e._b=it,e._v=T,e._e=ho,e._u=Ae,e._g=ut}function ft(e,t,r,i,o){var a=o.options;this.data=e,this.props=t,this.children=r,this.parent=i,this.listeners=e.on||Oi,this.injections=Qe(a.inject,i),this.slots=function(){return xe(r,i)};var s=Object.create(i),c=n(a._compiled),u=!c;c&&(this.$options=a,this.$slots=this.slots(),this.$scopedSlots=e.scopedSlots||Oi),a._scopeId?this._c=function(e,t,n,r){var o=_t(s,e,t,n,r,u);return o&&(o.fnScopeId=a._scopeId,o.fnContext=i),o}:this._c=function(e,t,n,r){return _t(s,e,t,n,r,u)}}function dt(e,n,r,i,o){var a=e.options,s={},c=a.props;if(t(c))for(var u in c)s[u]=W(u,c,n||Oi);else t(r.attrs)&&pt(s,r.attrs),t(r.props)&&pt(s,r.props);var l=new ft(r,s,o,i,e),f=a.render.call(null,l._c,l);return f instanceof po&&(f.fnContext=i,f.fnOptions=a,r.slot&&((f.data||(f.data={})).slot=r.slot)),f}function pt(e,t){for(var n in t)e[Li(n)]=t[n]}function vt(r,i,a,s,c){if(!e(r)){var u=a.$options._base;if(o(r)&&(r=u.extend(r)),"function"==typeof r){var l;if(e(r.cid)&&(l=r,void 0===(r=ye(l,u,a))))return me(l,i,a,s,c);i=i||{},xt(r),t(i.model)&&gt(r.options,i);var f=ue(i,r,c);if(n(r.options.functional))return dt(r,f,i,a,s);var d=i.on;if(i.on=i.nativeOn,n(r.options.abstract)){var p=i.slot;i={},p&&(i.slot=p)}mt(i);var v=r.options.name||c;return new po("vue-component-"+r.cid+(v?"-"+v:""),i,void 0,void 0,void 0,a,{Ctor:r,propsData:f,listeners:d,tag:c,children:s},l)}}}function ht(e,n,r,i){var o=e.componentOptions,a={_isComponent:!0,parent:n,propsData:o.propsData,_componentTag:o.tag,_parentVnode:e,_parentListeners:o.listeners,_renderChildren:o.children,_parentElm:r||null,_refElm:i||null},s=e.data.inlineTemplate;return t(s)&&(a.render=s.render,a.staticRenderFns=s.staticRenderFns),new o.Ctor(a)}function mt(e){e.hook||(e.hook={});for(var t=0;t<Jo.length;t++){var n=Jo[t],r=e.hook[n],i=Ko[n];e.hook[n]=r?yt(i,r):i}}function yt(e,t){return function(n,r,i,o){e(n,r,i,o),t(n,r,i,o)}}function gt(e,n){var r=e.model&&e.model.prop||"value",i=e.model&&e.model.event||"input";(n.props||(n.props={}))[r]=n.model.value;var o=n.on||(n.on={});t(o[i])?o[i]=[n.model.callback].concat(o[i]):o[i]=n.model.callback}function _t(e,t,r,o,a,s){return(Array.isArray(r)||i(r))&&(a=o,o=r,r=void 0),n(s)&&(a=Wo),bt(e,t,r,o,a)}function bt(e,n,r,i,o){if(t(r)&&t(r.__ob__))return ho();if(t(r)&&t(r.is)&&(n=r.is),!n)return ho();Array.isArray(i)&&"function"==typeof i[0]&&((r=r||{}).scopedSlots={default:i[0]},i.length=0),o===Wo?i=de(i):o===qo&&(i=fe(i));var a,s;if("string"==typeof n){var c;s=e.$vnode&&e.$vnode.ns||Ui.getTagNamespace(n),a=Ui.isReservedTag(n)?new po(Ui.parsePlatformTagName(n),r,i,void 0,void 0,e):t(c=q(e.$options,"components",n))?vt(c,r,e,i,n):new po(n,r,i,void 0,void 0,e)}else a=vt(n,r,e,i);return t(a)?(s&&$t(a,s),a):ho()}function $t(r,i,o){if(r.ns=i,"foreignObject"===r.tag&&(i=void 0,o=!0),t(r.children))for(var a=0,s=r.children.length;a<s;a++){var c=r.children[a];t(c.tag)&&(e(c.ns)||n(o))&&$t(c,i,o)}}function Ct(e){e._vnode=null,e._staticTrees=null;var t=e.$options,n=e.$vnode=t._parentVnode,r=n&&n.context;e.$slots=xe(t._renderChildren,r),e.$scopedSlots=Oi,e._c=function(t,n,r,i){return _t(e,t,n,r,i,!1)},e.$createElement=function(t,n,r,i){return _t(e,t,n,r,i,!0)};var i=n&&n.data;M(e,"$attrs",i&&i.attrs||Oi,null,!0),M(e,"$listeners",t._parentListeners||Oi,null,!0)}function wt(e,t){var n=e.$options=Object.create(e.constructor.options);n.parent=t.parent,n.propsData=t.propsData,n._parentVnode=t._parentVnode,n._parentListeners=t._parentListeners,n._renderChildren=t._renderChildren,n._componentTag=t._componentTag,n._parentElm=t._parentElm,n._refElm=t._refElm,t.render&&(n.render=t.render,n.staticRenderFns=t.staticRenderFns)}function xt(e){var t=e.options;if(e.super){var n=xt(e.super);if(n!==e.superOptions){e.superOptions=n;var r=kt(e);r&&y(e.extendOptions,r),(t=e.options=J(n,e.extendOptions)).name&&(t.components[t.name]=e)}}return t}function kt(e){var t,n=e.options,r=e.extendOptions,i=e.sealedOptions;for(var o in n)n[o]!==i[o]&&(t||(t={}),t[o]=At(n[o],r[o],i[o]));return t}function At(e,t,n){if(Array.isArray(e)){var r=[];n=Array.isArray(n)?n:[n],t=Array.isArray(t)?t:[t];for(var i=0;i<e.length;i++)(t.indexOf(e[i])>=0||n.indexOf(e[i])<0)&&r.push(e[i]);return r}return e}function Ot(e){this._init(e)}function St(e){e.use=function(e){var t=this._installedPlugins||(this._installedPlugins=[]);if(t.indexOf(e)>-1)return this;var n=m(arguments,1);return n.unshift(this),"function"==typeof e.install?e.install.apply(e,n):"function"==typeof e&&e.apply(null,n),t.push(e),this}}function Tt(e){e.mixin=function(e){return this.options=J(this.options,e),this}}function Et(e){e.cid=0;var t=1;e.extend=function(e){e=e||{};var n=this,r=n.cid,i=e._Ctor||(e._Ctor={});if(i[r])return i[r];var o=e.name||n.options.name,a=function(e){this._init(e)};return a.prototype=Object.create(n.prototype),a.prototype.constructor=a,a.cid=t++,a.options=J(n.options,e),a.super=n,a.options.props&&jt(a),a.options.computed&&Nt(a),a.extend=n.extend,a.mixin=n.mixin,a.use=n.use,Hi.forEach(function(e){a[e]=n[e]}),o&&(a.options.components[o]=a),a.superOptions=n.options,a.extendOptions=e,a.sealedOptions=y({},a.options),i[r]=a,a}}function jt(e){var t=e.options.props;for(var n in t)He(e.prototype,"_props",n)}function Nt(e){var t=e.options.computed;for(var n in t)Je(e.prototype,n,t[n])}function Lt(e){Hi.forEach(function(t){e[t]=function(e,n){return n?("component"===t&&a(n)&&(n.name=n.name||e,n=this.options._base.extend(n)),"directive"===t&&"function"==typeof n&&(n={bind:n,update:n}),this.options[t+"s"][e]=n,n):this.options[t+"s"][e]}})}function It(e){return e&&(e.Ctor.options.name||e.tag)}function Mt(e,t){return Array.isArray(e)?e.indexOf(t)>-1:"string"==typeof e?e.split(",").indexOf(t)>-1:!!s(e)&&e.test(t)}function Dt(e,t){var n=e.cache,r=e.keys,i=e._vnode;for(var o in n){var a=n[o];if(a){var s=It(a.componentOptions);s&&!t(s)&&Pt(n,o,r,i)}}}function Pt(e,t,n,r){var i=e[t];!i||r&&i.tag===r.tag||i.componentInstance.$destroy(),e[t]=null,d(n,t)}function Ft(e){for(var n=e.data,r=e,i=e;t(i.componentInstance);)(i=i.componentInstance._vnode).data&&(n=Rt(i.data,n));for(;t(r=r.parent);)r.data&&(n=Rt(n,r.data));return Ht(n.staticClass,n.class)}function Rt(e,n){return{staticClass:Bt(e.staticClass,n.staticClass),class:t(e.class)?[e.class,n.class]:n.class}}function Ht(e,n){return t(e)||t(n)?Bt(e,Ut(n)):""}function Bt(e,t){return e?t?e+" "+t:e:t||""}function Ut(e){return Array.isArray(e)?Vt(e):o(e)?zt(e):"string"==typeof e?e:""}function Vt(e){for(var n,r="",i=0,o=e.length;i<o;i++)t(n=Ut(e[i]))&&""!==n&&(r&&(r+=" "),r+=n);return r}function zt(e){var t="";for(var n in e)e[n]&&(t&&(t+=" "),t+=n);return t}function Kt(e){return ya(e)?"svg":"math"===e?"math":void 0}function Jt(e){if("string"==typeof e){var t=document.querySelector(e);return t||document.createElement("div")}return e}function qt(e,t){var n=e.data.ref;if(n){var r=e.context,i=e.componentInstance||e.elm,o=r.$refs;t?Array.isArray(o[n])?d(o[n],i):o[n]===i&&(o[n]=void 0):e.data.refInFor?Array.isArray(o[n])?o[n].indexOf(i)<0&&o[n].push(i):o[n]=[i]:o[n]=i}}function Wt(r,i){return r.key===i.key&&(r.tag===i.tag&&r.isComment===i.isComment&&t(r.data)===t(i.data)&&Gt(r,i)||n(r.isAsyncPlaceholder)&&r.asyncFactory===i.asyncFactory&&e(i.asyncFactory.error))}function Gt(e,n){if("input"!==e.tag)return!0;var r,i=t(r=e.data)&&t(r=r.attrs)&&r.type,o=t(r=n.data)&&t(r=r.attrs)&&r.type;return i===o||ba(i)&&ba(o)}function Zt(e,n,r){var i,o,a={};for(i=n;i<=r;++i)t(o=e[i].key)&&(a[o]=i);return a}function Xt(e,t){(e.data.directives||t.data.directives)&&Yt(e,t)}function Yt(e,t){var n,r,i,o=e===wa,a=t===wa,s=Qt(e.data.directives,e.context),c=Qt(t.data.directives,t.context),u=[],l=[];for(n in c)r=s[n],i=c[n],r?(i.oldValue=r.value,tn(i,"update",t,e),i.def&&i.def.componentUpdated&&l.push(i)):(tn(i,"bind",t,e),i.def&&i.def.inserted&&u.push(i));if(u.length){var f=function(){for(var n=0;n<u.length;n++)tn(u[n],"inserted",t,e)};o?ce(t,"insert",f):f()}if(l.length&&ce(t,"postpatch",function(){for(var n=0;n<l.length;n++)tn(l[n],"componentUpdated",t,e)}),!o)for(n in s)c[n]||tn(s[n],"unbind",e,e,a)}function Qt(e,t){var n=Object.create(null);if(!e)return n;var r,i;for(r=0;r<e.length;r++)(i=e[r]).modifiers||(i.modifiers=Aa),n[en(i)]=i,i.def=q(t.$options,"directives",i.name,!0);return n}function en(e){return e.rawName||e.name+"."+Object.keys(e.modifiers||{}).join(".")}function tn(e,t,n,r,i){var o=e.def&&e.def[t];if(o)try{o(n.elm,e,n,r,i)}catch(r){Y(r,n.context,"directive "+e.name+" "+t+" hook")}}function nn(n,r){var i=r.componentOptions;if(!(t(i)&&!1===i.Ctor.options.inheritAttrs||e(n.data.attrs)&&e(r.data.attrs))){var o,a,s=r.elm,c=n.data.attrs||{},u=r.data.attrs||{};t(u.__ob__)&&(u=r.data.attrs=y({},u));for(o in u)a=u[o],c[o]!==a&&rn(s,o,a);(Gi||Xi)&&u.value!==c.value&&rn(s,"value",u.value);for(o in c)e(u[o])&&(da(o)?s.removeAttributeNS(fa,pa(o)):ua(o)||s.removeAttribute(o))}}function rn(e,t,n){if(la(t))va(n)?e.removeAttribute(t):(n="allowfullscreen"===t&&"EMBED"===e.tagName?"true":t,e.setAttribute(t,n));else if(ua(t))e.setAttribute(t,va(n)||"false"===n?"false":"true");else if(da(t))va(n)?e.removeAttributeNS(fa,pa(t)):e.setAttributeNS(fa,t,n);else if(va(n))e.removeAttribute(t);else{if(Gi&&!Zi&&"TEXTAREA"===e.tagName&&"placeholder"===t&&!e.__ieph){var r=function(t){t.stopImmediatePropagation(),e.removeEventListener("input",r)};e.addEventListener("input",r),e.__ieph=!0}e.setAttribute(t,n)}}function on(n,r){var i=r.elm,o=r.data,a=n.data;if(!(e(o.staticClass)&&e(o.class)&&(e(a)||e(a.staticClass)&&e(a.class)))){var s=Ft(r),c=i._transitionClasses;t(c)&&(s=Bt(s,Ut(c))),s!==i._prevClass&&(i.setAttribute("class",s),i._prevClass=s)}}function an(e){function t(){(a||(a=[])).push(e.slice(v,i).trim()),v=i+1}var n,r,i,o,a,s=!1,c=!1,u=!1,l=!1,f=0,d=0,p=0,v=0;for(i=0;i<e.length;i++)if(r=n,n=e.charCodeAt(i),s)39===n&&92!==r&&(s=!1);else if(c)34===n&&92!==r&&(c=!1);else if(u)96===n&&92!==r&&(u=!1);else if(l)47===n&&92!==r&&(l=!1);else if(124!==n||124===e.charCodeAt(i+1)||124===e.charCodeAt(i-1)||f||d||p){switch(n){case 34:c=!0;break;case 39:s=!0;break;case 96:u=!0;break;case 40:p++;break;case 41:p--;break;case 91:d++;break;case 93:d--;break;case 123:f++;break;case 125:f--}if(47===n){for(var h=i-1,m=void 0;h>=0&&" "===(m=e.charAt(h));h--);m&&Ea.test(m)||(l=!0)}}else void 0===o?(v=i+1,o=e.slice(0,i).trim()):t();if(void 0===o?o=e.slice(0,i).trim():0!==v&&t(),a)for(i=0;i<a.length;i++)o=sn(o,a[i]);return o}function sn(e,t){var n=t.indexOf("(");return n<0?'_f("'+t+'")('+e+")":'_f("'+t.slice(0,n)+'")('+e+","+t.slice(n+1)}function cn(e){console.error("[Vue compiler]: "+e)}function un(e,t){return e?e.map(function(e){return e[t]}).filter(function(e){return e}):[]}function ln(e,t,n){(e.props||(e.props=[])).push({name:t,value:n})}function fn(e,t,n){(e.attrs||(e.attrs=[])).push({name:t,value:n})}function dn(e,t,n,r,i,o){(e.directives||(e.directives=[])).push({name:t,rawName:n,value:r,arg:i,modifiers:o})}function pn(e,t,n,r,i,o){(r=r||Oi).capture&&(delete r.capture,t="!"+t),r.once&&(delete r.once,t="~"+t),r.passive&&(delete r.passive,t="&"+t),"click"===t&&(r.right?(t="contextmenu",delete r.right):r.middle&&(t="mouseup"));var a;r.native?(delete r.native,a=e.nativeEvents||(e.nativeEvents={})):a=e.events||(e.events={});var s={value:n};r!==Oi&&(s.modifiers=r);var c=a[t];Array.isArray(c)?i?c.unshift(s):c.push(s):a[t]=c?i?[s,c]:[c,s]:s}function vn(e,t,n){var r=hn(e,":"+t)||hn(e,"v-bind:"+t);if(null!=r)return an(r);if(!1!==n){var i=hn(e,t);if(null!=i)return JSON.stringify(i)}}function hn(e,t,n){var r;if(null!=(r=e.attrsMap[t]))for(var i=e.attrsList,o=0,a=i.length;o<a;o++)if(i[o].name===t){i.splice(o,1);break}return n&&delete e.attrsMap[t],r}function mn(e,t,n){var r=n||{},i=r.number,o="$$v";r.trim&&(o="(typeof $$v === 'string'? $$v.trim(): $$v)"),i&&(o="_n("+o+")");var a=yn(t,o);e.model={value:"("+t+")",expression:'"'+t+'"',callback:"function ($$v) {"+a+"}"}}function yn(e,t){var n=gn(e);return null===n.key?e+"="+t:"$set("+n.exp+", "+n.key+", "+t+")"}function gn(e){if(Yo=e.length,e.indexOf("[")<0||e.lastIndexOf("]")<Yo-1)return(ta=e.lastIndexOf("."))>-1?{exp:e.slice(0,ta),key:'"'+e.slice(ta+1)+'"'}:{exp:e,key:null};for(Qo=e,ta=na=ra=0;!bn();)$n(ea=_n())?wn(ea):91===ea&&Cn(ea);return{exp:e.slice(0,na),key:e.slice(na+1,ra)}}function _n(){return Qo.charCodeAt(++ta)}function bn(){return ta>=Yo}function $n(e){return 34===e||39===e}function Cn(e){var t=1;for(na=ta;!bn();)if(e=_n(),$n(e))wn(e);else if(91===e&&t++,93===e&&t--,0===t){ra=ta;break}}function wn(e){for(var t=e;!bn()&&(e=_n())!==t;);}function xn(e,t,n){var r=n&&n.number,i=vn(e,"value")||"null",o=vn(e,"true-value")||"true",a=vn(e,"false-value")||"false";ln(e,"checked","Array.isArray("+t+")?_i("+t+","+i+")>-1"+("true"===o?":("+t+")":":_q("+t+","+o+")")),pn(e,"change","var $$a="+t+",$$el=$event.target,$$c=$$el.checked?("+o+"):("+a+");if(Array.isArray($$a)){var $$v="+(r?"_n("+i+")":i)+",$$i=_i($$a,$$v);if($$el.checked){$$i<0&&("+t+"=$$a.concat([$$v]))}else{$$i>-1&&("+t+"=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{"+yn(t,"$$c")+"}",null,!0)}function kn(e,t,n){var r=n&&n.number,i=vn(e,"value")||"null";ln(e,"checked","_q("+t+","+(i=r?"_n("+i+")":i)+")"),pn(e,"change",yn(t,i),null,!0)}function An(e,t,n){var r="var $$selectedVal = "+('Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return '+(n&&n.number?"_n(val)":"val")+"})")+";";pn(e,"change",r=r+" "+yn(t,"$event.target.multiple ? $$selectedVal : $$selectedVal[0]"),null,!0)}function On(e,t,n){var r=e.attrsMap.type,i=n||{},o=i.lazy,a=i.number,s=i.trim,c=!o&&"range"!==r,u=o?"change":"range"===r?ja:"input",l="$event.target.value";s&&(l="$event.target.value.trim()"),a&&(l="_n("+l+")");var f=yn(t,l);c&&(f="if($event.target.composing)return;"+f),ln(e,"value","("+t+")"),pn(e,u,f,null,!0),(s||a)&&pn(e,"blur","$forceUpdate()")}function Sn(e){if(t(e[ja])){var n=Gi?"change":"input";e[n]=[].concat(e[ja],e[n]||[]),delete e[ja]}t(e[Na])&&(e.change=[].concat(e[Na],e.change||[]),delete e[Na])}function Tn(e,t,n){var r=ia;return function i(){null!==e.apply(null,arguments)&&jn(t,i,n,r)}}function En(e,t,n,r,i){t=ne(t),n&&(t=Tn(t,e,r)),ia.addEventListener(e,t,to?{capture:r,passive:i}:r)}function jn(e,t,n,r){(r||ia).removeEventListener(e,t._withTask||t,n)}function Nn(t,n){if(!e(t.data.on)||!e(n.data.on)){var r=n.data.on||{},i=t.data.on||{};ia=n.elm,Sn(r),se(r,i,En,jn,n.context),ia=void 0}}function Ln(n,r){if(!e(n.data.domProps)||!e(r.data.domProps)){var i,o,a=r.elm,s=n.data.domProps||{},c=r.data.domProps||{};t(c.__ob__)&&(c=r.data.domProps=y({},c));for(i in s)e(c[i])&&(a[i]="");for(i in c){if(o=c[i],"textContent"===i||"innerHTML"===i){if(r.children&&(r.children.length=0),o===s[i])continue;1===a.childNodes.length&&a.removeChild(a.childNodes[0])}if("value"===i){a._value=o;var u=e(o)?"":String(o);In(a,u)&&(a.value=u)}else a[i]=o}}}function In(e,t){return!e.composing&&("OPTION"===e.tagName||Mn(e,t)||Dn(e,t))}function Mn(e,t){var n=!0;try{n=document.activeElement!==e}catch(e){}return n&&e.value!==t}function Dn(e,n){var r=e.value,i=e._vModifiers;return t(i)&&i.number?l(r)!==l(n):t(i)&&i.trim?r.trim()!==n.trim():r!==n}function Pn(e){var t=Fn(e.style);return e.staticStyle?y(e.staticStyle,t):t}function Fn(e){return Array.isArray(e)?g(e):"string"==typeof e?Ma(e):e}function Rn(e,t){var n,r={};if(t)for(var i=e;i.componentInstance;)(i=i.componentInstance._vnode).data&&(n=Pn(i.data))&&y(r,n);(n=Pn(e.data))&&y(r,n);for(var o=e;o=o.parent;)o.data&&(n=Pn(o.data))&&y(r,n);return r}function Hn(n,r){var i=r.data,o=n.data;if(!(e(i.staticStyle)&&e(i.style)&&e(o.staticStyle)&&e(o.style))){var a,s,c=r.elm,u=o.staticStyle,l=o.normalizedStyle||o.style||{},f=u||l,d=Fn(r.data.style)||{};r.data.normalizedStyle=t(d.__ob__)?y({},d):d;var p=Rn(r,!0);for(s in f)e(p[s])&&Fa(c,s,"");for(s in p)(a=p[s])!==f[s]&&Fa(c,s,null==a?"":a)}}function Bn(e,t){if(t&&(t=t.trim()))if(e.classList)t.indexOf(" ")>-1?t.split(/\s+/).forEach(function(t){return e.classList.add(t)}):e.classList.add(t);else{var n=" "+(e.getAttribute("class")||"")+" ";n.indexOf(" "+t+" ")<0&&e.setAttribute("class",(n+t).trim())}}function Un(e,t){if(t&&(t=t.trim()))if(e.classList)t.indexOf(" ")>-1?t.split(/\s+/).forEach(function(t){return e.classList.remove(t)}):e.classList.remove(t),e.classList.length||e.removeAttribute("class");else{for(var n=" "+(e.getAttribute("class")||"")+" ",r=" "+t+" ";n.indexOf(r)>=0;)n=n.replace(r," ");(n=n.trim())?e.setAttribute("class",n):e.removeAttribute("class")}}function Vn(e){if(e){if("object"==typeof e){var t={};return!1!==e.css&&y(t,Ua(e.name||"v")),y(t,e),t}return"string"==typeof e?Ua(e):void 0}}function zn(e){Za(function(){Za(e)})}function Kn(e,t){var n=e._transitionClasses||(e._transitionClasses=[]);n.indexOf(t)<0&&(n.push(t),Bn(e,t))}function Jn(e,t){e._transitionClasses&&d(e._transitionClasses,t),Un(e,t)}function qn(e,t,n){var r=Wn(e,t),i=r.type,o=r.timeout,a=r.propCount;if(!i)return n();var s=i===za?qa:Ga,c=0,u=function(){e.removeEventListener(s,l),n()},l=function(t){t.target===e&&++c>=a&&u()};setTimeout(function(){c<a&&u()},o+1),e.addEventListener(s,l)}function Wn(e,t){var n,r=window.getComputedStyle(e),i=r[Ja+"Delay"].split(", "),o=r[Ja+"Duration"].split(", "),a=Gn(i,o),s=r[Wa+"Delay"].split(", "),c=r[Wa+"Duration"].split(", "),u=Gn(s,c),l=0,f=0;return t===za?a>0&&(n=za,l=a,f=o.length):t===Ka?u>0&&(n=Ka,l=u,f=c.length):f=(n=(l=Math.max(a,u))>0?a>u?za:Ka:null)?n===za?o.length:c.length:0,{type:n,timeout:l,propCount:f,hasTransform:n===za&&Xa.test(r[Ja+"Property"])}}function Gn(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max.apply(null,t.map(function(t,n){return Zn(t)+Zn(e[n])}))}function Zn(e){return 1e3*Number(e.slice(0,-1))}function Xn(n,r){var i=n.elm;t(i._leaveCb)&&(i._leaveCb.cancelled=!0,i._leaveCb());var a=Vn(n.data.transition);if(!e(a)&&!t(i._enterCb)&&1===i.nodeType){for(var s=a.css,c=a.type,u=a.enterClass,f=a.enterToClass,d=a.enterActiveClass,p=a.appearClass,v=a.appearToClass,h=a.appearActiveClass,m=a.beforeEnter,y=a.enter,g=a.afterEnter,_=a.enterCancelled,b=a.beforeAppear,$=a.appear,w=a.afterAppear,x=a.appearCancelled,k=a.duration,A=Io,O=Io.$vnode;O&&O.parent;)A=(O=O.parent).context;var S=!A._isMounted||!n.isRootInsert;if(!S||$||""===$){var T=S&&p?p:u,E=S&&h?h:d,j=S&&v?v:f,N=S?b||m:m,L=S&&"function"==typeof $?$:y,I=S?w||g:g,M=S?x||_:_,D=l(o(k)?k.enter:k),P=!1!==s&&!Zi,F=er(L),R=i._enterCb=C(function(){P&&(Jn(i,j),Jn(i,E)),R.cancelled?(P&&Jn(i,T),M&&M(i)):I&&I(i),i._enterCb=null});n.data.show||ce(n,"insert",function(){var e=i.parentNode,t=e&&e._pending&&e._pending[n.key];t&&t.tag===n.tag&&t.elm._leaveCb&&t.elm._leaveCb(),L&&L(i,R)}),N&&N(i),P&&(Kn(i,T),Kn(i,E),zn(function(){Kn(i,j),Jn(i,T),R.cancelled||F||(Qn(D)?setTimeout(R,D):qn(i,c,R))})),n.data.show&&(r&&r(),L&&L(i,R)),P||F||R()}}}function Yn(n,r){function i(){x.cancelled||(n.data.show||((a.parentNode._pending||(a.parentNode._pending={}))[n.key]=n),v&&v(a),b&&(Kn(a,f),Kn(a,p),zn(function(){Kn(a,d),Jn(a,f),x.cancelled||$||(Qn(w)?setTimeout(x,w):qn(a,u,x))})),h&&h(a,x),b||$||x())}var a=n.elm;t(a._enterCb)&&(a._enterCb.cancelled=!0,a._enterCb());var s=Vn(n.data.transition);if(e(s)||1!==a.nodeType)return r();if(!t(a._leaveCb)){var c=s.css,u=s.type,f=s.leaveClass,d=s.leaveToClass,p=s.leaveActiveClass,v=s.beforeLeave,h=s.leave,m=s.afterLeave,y=s.leaveCancelled,g=s.delayLeave,_=s.duration,b=!1!==c&&!Zi,$=er(h),w=l(o(_)?_.leave:_),x=a._leaveCb=C(function(){a.parentNode&&a.parentNode._pending&&(a.parentNode._pending[n.key]=null),b&&(Jn(a,d),Jn(a,p)),x.cancelled?(b&&Jn(a,f),y&&y(a)):(r(),m&&m(a)),a._leaveCb=null});g?g(i):i()}}function Qn(e){return"number"==typeof e&&!isNaN(e)}function er(n){if(e(n))return!1;var r=n.fns;return t(r)?er(Array.isArray(r)?r[0]:r):(n._length||n.length)>1}function tr(e,t){!0!==t.data.show&&Xn(t)}function nr(e,t,n){rr(e,t,n),(Gi||Xi)&&setTimeout(function(){rr(e,t,n)},0)}function rr(e,t,n){var r=t.value,i=e.multiple;if(!i||Array.isArray(r)){for(var o,a,s=0,c=e.options.length;s<c;s++)if(a=e.options[s],i)o=$(r,or(a))>-1,a.selected!==o&&(a.selected=o);else if(b(or(a),r))return void(e.selectedIndex!==s&&(e.selectedIndex=s));i||(e.selectedIndex=-1)}}function ir(e,t){return t.every(function(t){return!b(t,e)})}function or(e){return"_value"in e?e._value:e.value}function ar(e){e.target.composing=!0}function sr(e){e.target.composing&&(e.target.composing=!1,cr(e.target,"input"))}function cr(e,t){var n=document.createEvent("HTMLEvents");n.initEvent(t,!0,!0),e.dispatchEvent(n)}function ur(e){return!e.componentInstance||e.data&&e.data.transition?e:ur(e.componentInstance._vnode)}function lr(e){var t=e&&e.componentOptions;return t&&t.Ctor.options.abstract?lr(_e(t.children)):e}function fr(e){var t={},n=e.$options;for(var r in n.propsData)t[r]=e[r];var i=n._parentListeners;for(var o in i)t[Li(o)]=i[o];return t}function dr(e,t){if(/\d-keep-alive$/.test(t.tag))return e("keep-alive",{props:t.componentOptions.propsData})}function pr(e){for(;e=e.parent;)if(e.data.transition)return!0}function vr(e,t){return t.key===e.key&&t.tag===e.tag}function hr(e){e.elm._moveCb&&e.elm._moveCb(),e.elm._enterCb&&e.elm._enterCb()}function mr(e){e.data.newPos=e.elm.getBoundingClientRect()}function yr(e){var t=e.data.pos,n=e.data.newPos,r=t.left-n.left,i=t.top-n.top;if(r||i){e.data.moved=!0;var o=e.elm.style;o.transform=o.WebkitTransform="translate("+r+"px,"+i+"px)",o.transitionDuration="0s"}}function gr(e,t){var n=t?cs(t):as;if(n.test(e)){for(var r,i,o=[],a=n.lastIndex=0;r=n.exec(e);){(i=r.index)>a&&o.push(JSON.stringify(e.slice(a,i)));var s=an(r[1].trim());o.push("_s("+s+")"),a=i+r[0].length}return a<e.length&&o.push(JSON.stringify(e.slice(a))),o.join("+")}}function _r(e,t){var n=t?Hs:Rs;return e.replace(n,function(e){return Fs[e]})}function br(e,t){function n(t){l+=t,e=e.substring(t)}function r(e,n,r){var i,s;if(null==n&&(n=l),null==r&&(r=l),e&&(s=e.toLowerCase()),e)for(i=a.length-1;i>=0&&a[i].lowerCasedTag!==s;i--);else i=0;if(i>=0){for(var c=a.length-1;c>=i;c--)t.end&&t.end(a[c].tag,n,r);a.length=i,o=i&&a[i-1].tag}else"br"===s?t.start&&t.start(e,[],!0,n,r):"p"===s&&(t.start&&t.start(e,[],!1,n,r),t.end&&t.end(e,n,r))}for(var i,o,a=[],s=t.expectHTML,c=t.isUnaryTag||Pi,u=t.canBeLeftOpenTag||Pi,l=0;e;){if(i=e,o&&Ds(o)){var f=0,d=o.toLowerCase(),p=Ps[d]||(Ps[d]=new RegExp("([\\s\\S]*?)(</"+d+"[^>]*>)","i")),v=e.replace(p,function(e,n,r){return f=r.length,Ds(d)||"noscript"===d||(n=n.replace(/<!--([\s\S]*?)-->/g,"$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g,"$1")),Us(d,n)&&(n=n.slice(1)),t.chars&&t.chars(n),""});l+=e.length-v.length,e=v,r(d,l-f,l)}else{var h=e.indexOf("<");if(0===h){if(Cs.test(e)){var m=e.indexOf("--\x3e");if(m>=0){t.shouldKeepComment&&t.comment(e.substring(4,m)),n(m+3);continue}}if(ws.test(e)){var y=e.indexOf("]>");if(y>=0){n(y+2);continue}}var g=e.match($s);if(g){n(g[0].length);continue}var _=e.match(bs);if(_){var b=l;n(_[0].length),r(_[1],b,l);continue}var $=function(){var t=e.match(gs);if(t){var r={tagName:t[1],attrs:[],start:l};n(t[0].length);for(var i,o;!(i=e.match(_s))&&(o=e.match(hs));)n(o[0].length),r.attrs.push(o);if(i)return r.unarySlash=i[1],n(i[0].length),r.end=l,r}}();if($){!function(e){var n=e.tagName,i=e.unarySlash;s&&("p"===o&&vs(n)&&r(o),u(n)&&o===n&&r(n));for(var l=c(n)||!!i,f=e.attrs.length,d=new Array(f),p=0;p<f;p++){var v=e.attrs[p];xs&&-1===v[0].indexOf('""')&&(""===v[3]&&delete v[3],""===v[4]&&delete v[4],""===v[5]&&delete v[5]);var h=v[3]||v[4]||v[5]||"",m="a"===n&&"href"===v[1]?t.shouldDecodeNewlinesForHref:t.shouldDecodeNewlines;d[p]={name:v[1],value:_r(h,m)}}l||(a.push({tag:n,lowerCasedTag:n.toLowerCase(),attrs:d}),o=n),t.start&&t.start(n,d,l,e.start,e.end)}($),Us(o,e)&&n(1);continue}}var C=void 0,w=void 0,x=void 0;if(h>=0){for(w=e.slice(h);!(bs.test(w)||gs.test(w)||Cs.test(w)||ws.test(w)||(x=w.indexOf("<",1))<0);)h+=x,w=e.slice(h);C=e.substring(0,h),n(h)}h<0&&(C=e,e=""),t.chars&&C&&t.chars(C)}if(e===i){t.chars&&t.chars(e);break}}r()}function $r(e,t,n){return{type:1,tag:e,attrsList:t,attrsMap:Rr(t),parent:n,children:[]}}function Cr(e,t){function n(e){e.pre&&(s=!1),Es(e.tag)&&(c=!1)}ks=t.warn||cn,Es=t.isPreTag||Pi,js=t.mustUseProp||Pi,Ns=t.getTagNamespace||Pi,Os=un(t.modules,"transformNode"),Ss=un(t.modules,"preTransformNode"),Ts=un(t.modules,"postTransformNode"),As=t.delimiters;var r,i,o=[],a=!1!==t.preserveWhitespace,s=!1,c=!1;return br(e,{warn:ks,expectHTML:t.expectHTML,isUnaryTag:t.isUnaryTag,canBeLeftOpenTag:t.canBeLeftOpenTag,shouldDecodeNewlines:t.shouldDecodeNewlines,shouldDecodeNewlinesForHref:t.shouldDecodeNewlinesForHref,shouldKeepComment:t.comments,start:function(e,a,u){var l=i&&i.ns||Ns(e);Gi&&"svg"===l&&(a=Ur(a));var f=$r(e,a,i);l&&(f.ns=l),Br(f)&&!oo()&&(f.forbidden=!0);for(var d=0;d<Ss.length;d++)f=Ss[d](f,t)||f;if(s||(wr(f),f.pre&&(s=!0)),Es(f.tag)&&(c=!0),s?xr(f):f.processed||(Sr(f),Tr(f),Lr(f),kr(f,t)),r?o.length||r.if&&(f.elseif||f.else)&&Nr(r,{exp:f.elseif,block:f}):r=f,i&&!f.forbidden)if(f.elseif||f.else)Er(f,i);else if(f.slotScope){i.plain=!1;var p=f.slotTarget||'"default"';(i.scopedSlots||(i.scopedSlots={}))[p]=f}else i.children.push(f),f.parent=i;u?n(f):(i=f,o.push(f));for(var v=0;v<Ts.length;v++)Ts[v](f,t)},end:function(){var e=o[o.length-1],t=e.children[e.children.length-1];t&&3===t.type&&" "===t.text&&!c&&e.children.pop(),o.length-=1,i=o[o.length-1],n(e)},chars:function(e){if(i&&(!Gi||"textarea"!==i.tag||i.attrsMap.placeholder!==e)){var t=i.children;if(e=c||e.trim()?Hr(i)?e:Xs(e):a&&t.length?" ":""){var n;!s&&" "!==e&&(n=gr(e,As))?t.push({type:2,expression:n,text:e}):" "===e&&t.length&&" "===t[t.length-1].text||t.push({type:3,text:e})}}},comment:function(e){i.children.push({type:3,text:e,isComment:!0})}}),r}function wr(e){null!=hn(e,"v-pre")&&(e.pre=!0)}function xr(e){var t=e.attrsList.length;if(t)for(var n=e.attrs=new Array(t),r=0;r<t;r++)n[r]={name:e.attrsList[r].name,value:JSON.stringify(e.attrsList[r].value)};else e.pre||(e.plain=!0)}function kr(e,t){Ar(e),e.plain=!e.key&&!e.attrsList.length,Or(e),Ir(e),Mr(e);for(var n=0;n<Os.length;n++)e=Os[n](e,t)||e;Dr(e)}function Ar(e){var t=vn(e,"key");t&&(e.key=t)}function Or(e){var t=vn(e,"ref");t&&(e.ref=t,e.refInFor=Pr(e))}function Sr(e){var t;if(t=hn(e,"v-for")){var n=t.match(Ks);if(!n)return;e.for=n[2].trim();var r=n[1].trim(),i=r.match(Js);i?(e.alias=i[1].trim(),e.iterator1=i[2].trim(),i[3]&&(e.iterator2=i[3].trim())):e.alias=r.replace(qs,"")}}function Tr(e){var t=hn(e,"v-if");if(t)e.if=t,Nr(e,{exp:t,block:e});else{null!=hn(e,"v-else")&&(e.else=!0);var n=hn(e,"v-else-if");n&&(e.elseif=n)}}function Er(e,t){var n=jr(t.children);n&&n.if&&Nr(n,{exp:e.elseif,block:e})}function jr(e){for(var t=e.length;t--;){if(1===e[t].type)return e[t];e.pop()}}function Nr(e,t){e.ifConditions||(e.ifConditions=[]),e.ifConditions.push(t)}function Lr(e){null!=hn(e,"v-once")&&(e.once=!0)}function Ir(e){if("slot"===e.tag)e.slotName=vn(e,"name");else{var t;"template"===e.tag?(t=hn(e,"scope"),e.slotScope=t||hn(e,"slot-scope")):(t=hn(e,"slot-scope"))&&(e.slotScope=t);var n=vn(e,"slot");n&&(e.slotTarget='""'===n?'"default"':n,"template"===e.tag||e.slotScope||fn(e,"slot",n))}}function Mr(e){var t;(t=vn(e,"is"))&&(e.component=t),null!=hn(e,"inline-template")&&(e.inlineTemplate=!0)}function Dr(e){var t,n,r,i,o,a,s,c=e.attrsList;for(t=0,n=c.length;t<n;t++)if(r=i=c[t].name,o=c[t].value,zs.test(r))if(e.hasBindings=!0,(a=Fr(r))&&(r=r.replace(Zs,"")),Gs.test(r))r=r.replace(Gs,""),o=an(o),s=!1,a&&(a.prop&&(s=!0,"innerHtml"===(r=Li(r))&&(r="innerHTML")),a.camel&&(r=Li(r)),a.sync&&pn(e,"update:"+Li(r),yn(o,"$event"))),s||!e.component&&js(e.tag,e.attrsMap.type,r)?ln(e,r,o):fn(e,r,o);else if(Vs.test(r))pn(e,r=r.replace(Vs,""),o,a,!1,ks);else{var u=(r=r.replace(zs,"")).match(Ws),l=u&&u[1];l&&(r=r.slice(0,-(l.length+1))),dn(e,r,i,o,l,a)}else fn(e,r,JSON.stringify(o)),!e.component&&"muted"===r&&js(e.tag,e.attrsMap.type,r)&&ln(e,r,"true")}function Pr(e){for(var t=e;t;){if(void 0!==t.for)return!0;t=t.parent}return!1}function Fr(e){var t=e.match(Zs);if(t){var n={};return t.forEach(function(e){n[e.slice(1)]=!0}),n}}function Rr(e){for(var t={},n=0,r=e.length;n<r;n++)t[e[n].name]=e[n].value;return t}function Hr(e){return"script"===e.tag||"style"===e.tag}function Br(e){return"style"===e.tag||"script"===e.tag&&(!e.attrsMap.type||"text/javascript"===e.attrsMap.type)}function Ur(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];Ys.test(r.name)||(r.name=r.name.replace(Qs,""),t.push(r))}return t}function Vr(e){return $r(e.tag,e.attrsList.slice(),e.parent)}function zr(e,t,n){e.attrsMap[t]=n,e.attrsList.push({name:t,value:n})}function Kr(e,t){e&&(Ls=nc(t.staticKeys||""),Is=t.isReservedTag||Pi,Jr(e),qr(e,!1))}function Jr(e){if(e.static=Wr(e),1===e.type){if(!Is(e.tag)&&"slot"!==e.tag&&null==e.attrsMap["inline-template"])return;for(var t=0,n=e.children.length;t<n;t++){var r=e.children[t];Jr(r),r.static||(e.static=!1)}if(e.ifConditions)for(var i=1,o=e.ifConditions.length;i<o;i++){var a=e.ifConditions[i].block;Jr(a),a.static||(e.static=!1)}}}function qr(e,t){if(1===e.type){if((e.static||e.once)&&(e.staticInFor=t),e.static&&e.children.length&&(1!==e.children.length||3!==e.children[0].type))return void(e.staticRoot=!0);if(e.staticRoot=!1,e.children)for(var n=0,r=e.children.length;n<r;n++)qr(e.children[n],t||!!e.for);if(e.ifConditions)for(var i=1,o=e.ifConditions.length;i<o;i++)qr(e.ifConditions[i].block,t)}}function Wr(e){return 2!==e.type&&(3===e.type||!(!e.pre&&(e.hasBindings||e.if||e.for||Ti(e.tag)||!Is(e.tag)||Gr(e)||!Object.keys(e).every(Ls))))}function Gr(e){for(;e.parent;){if("template"!==(e=e.parent).tag)return!1;if(e.for)return!0}return!1}function Zr(e,t,n){var r=t?"nativeOn:{":"on:{";for(var i in e)r+='"'+i+'":'+Xr(i,e[i])+",";return r.slice(0,-1)+"}"}function Xr(e,t){if(!t)return"function(){}";if(Array.isArray(t))return"["+t.map(function(t){return Xr(e,t)}).join(",")+"]";var n=ic.test(t.value),r=rc.test(t.value);if(t.modifiers){var i="",o="",a=[];for(var s in t.modifiers)if(sc[s])o+=sc[s],oc[s]&&a.push(s);else if("exact"===s){var c=t.modifiers;o+=ac(["ctrl","shift","alt","meta"].filter(function(e){return!c[e]}).map(function(e){return"$event."+e+"Key"}).join("||"))}else a.push(s);return a.length&&(i+=Yr(a)),o&&(i+=o),"function($event){"+i+(n?t.value+"($event)":r?"("+t.value+")($event)":t.value)+"}"}return n||r?t.value:"function($event){"+t.value+"}"}function Yr(e){return"if(!('button' in $event)&&"+e.map(Qr).join("&&")+")return null;"}function Qr(e){var t=parseInt(e,10);if(t)return"$event.keyCode!=="+t;var n=oc[e];return"_k($event.keyCode,"+JSON.stringify(e)+","+JSON.stringify(n)+",$event.key)"}function ei(e,t){var n=new uc(t);return{render:"with(this){return "+(e?ti(e,n):'_c("div")')+"}",staticRenderFns:n.staticRenderFns}}function ti(e,t){if(e.staticRoot&&!e.staticProcessed)return ni(e,t);if(e.once&&!e.onceProcessed)return ri(e,t);if(e.for&&!e.forProcessed)return ai(e,t);if(e.if&&!e.ifProcessed)return ii(e,t);if("template"!==e.tag||e.slotTarget){if("slot"===e.tag)return _i(e,t);var n;if(e.component)n=bi(e.component,e,t);else{var r=e.plain?void 0:si(e,t),i=e.inlineTemplate?null:pi(e,t,!0);n="_c('"+e.tag+"'"+(r?","+r:"")+(i?","+i:"")+")"}for(var o=0;o<t.transforms.length;o++)n=t.transforms[o](e,n);return n}return pi(e,t)||"void 0"}function ni(e,t,n){return e.staticProcessed=!0,t.staticRenderFns.push("with(this){return "+ti(e,t)+"}"),"_m("+(t.staticRenderFns.length-1)+","+(e.staticInFor?"true":"false")+","+(n?"true":"false")+")"}function ri(e,t){if(e.onceProcessed=!0,e.if&&!e.ifProcessed)return ii(e,t);if(e.staticInFor){for(var n="",r=e.parent;r;){if(r.for){n=r.key;break}r=r.parent}return n?"_o("+ti(e,t)+","+t.onceId+++","+n+")":ti(e,t)}return ni(e,t,!0)}function ii(e,t,n,r){return e.ifProcessed=!0,oi(e.ifConditions.slice(),t,n,r)}function oi(e,t,n,r){function i(e){return n?n(e,t):e.once?ri(e,t):ti(e,t)}if(!e.length)return r||"_e()";var o=e.shift();return o.exp?"("+o.exp+")?"+i(o.block)+":"+oi(e,t,n,r):""+i(o.block)}function ai(e,t,n,r){var i=e.for,o=e.alias,a=e.iterator1?","+e.iterator1:"",s=e.iterator2?","+e.iterator2:"";return e.forProcessed=!0,(r||"_l")+"(("+i+"),function("+o+a+s+"){return "+(n||ti)(e,t)+"})"}function si(e,t){var n="{",r=ci(e,t);r&&(n+=r+","),e.key&&(n+="key:"+e.key+","),e.ref&&(n+="ref:"+e.ref+","),e.refInFor&&(n+="refInFor:true,"),e.pre&&(n+="pre:true,"),e.component&&(n+='tag:"'+e.tag+'",');for(var i=0;i<t.dataGenFns.length;i++)n+=t.dataGenFns[i](e);if(e.attrs&&(n+="attrs:{"+$i(e.attrs)+"},"),e.props&&(n+="domProps:{"+$i(e.props)+"},"),e.events&&(n+=Zr(e.events,!1,t.warn)+","),e.nativeEvents&&(n+=Zr(e.nativeEvents,!0,t.warn)+","),e.slotTarget&&!e.slotScope&&(n+="slot:"+e.slotTarget+","),e.scopedSlots&&(n+=li(e.scopedSlots,t)+","),e.model&&(n+="model:{value:"+e.model.value+",callback:"+e.model.callback+",expression:"+e.model.expression+"},"),e.inlineTemplate){var o=ui(e,t);o&&(n+=o+",")}return n=n.replace(/,$/,"")+"}",e.wrapData&&(n=e.wrapData(n)),e.wrapListeners&&(n=e.wrapListeners(n)),n}function ci(e,t){var n=e.directives;if(n){var r,i,o,a,s="directives:[",c=!1;for(r=0,i=n.length;r<i;r++){o=n[r],a=!0;var u=t.directives[o.name];u&&(a=!!u(e,o,t.warn)),a&&(c=!0,s+='{name:"'+o.name+'",rawName:"'+o.rawName+'"'+(o.value?",value:("+o.value+"),expression:"+JSON.stringify(o.value):"")+(o.arg?',arg:"'+o.arg+'"':"")+(o.modifiers?",modifiers:"+JSON.stringify(o.modifiers):"")+"},")}return c?s.slice(0,-1)+"]":void 0}}function ui(e,t){var n=e.children[0];if(1===n.type){var r=ei(n,t.options);return"inlineTemplate:{render:function(){"+r.render+"},staticRenderFns:["+r.staticRenderFns.map(function(e){return"function(){"+e+"}"}).join(",")+"]}"}}function li(e,t){return"scopedSlots:_u(["+Object.keys(e).map(function(n){return fi(n,e[n],t)}).join(",")+"])"}function fi(e,t,n){return t.for&&!t.forProcessed?di(e,t,n):"{key:"+e+",fn:"+("function("+String(t.slotScope)+"){return "+("template"===t.tag?t.if?t.if+"?"+(pi(t,n)||"undefined")+":undefined":pi(t,n)||"undefined":ti(t,n))+"}")+"}"}function di(e,t,n){var r=t.for,i=t.alias,o=t.iterator1?","+t.iterator1:"",a=t.iterator2?","+t.iterator2:"";return t.forProcessed=!0,"_l(("+r+"),function("+i+o+a+"){return "+fi(e,t,n)+"})"}function pi(e,t,n,r,i){var o=e.children;if(o.length){var a=o[0];if(1===o.length&&a.for&&"template"!==a.tag&&"slot"!==a.tag)return(r||ti)(a,t);var s=n?vi(o,t.maybeComponent):0,c=i||mi;return"["+o.map(function(e){return c(e,t)}).join(",")+"]"+(s?","+s:"")}}function vi(e,t){for(var n=0,r=0;r<e.length;r++){var i=e[r];if(1===i.type){if(hi(i)||i.ifConditions&&i.ifConditions.some(function(e){return hi(e.block)})){n=2;break}(t(i)||i.ifConditions&&i.ifConditions.some(function(e){return t(e.block)}))&&(n=1)}}return n}function hi(e){return void 0!==e.for||"template"===e.tag||"slot"===e.tag}function mi(e,t){return 1===e.type?ti(e,t):3===e.type&&e.isComment?gi(e):yi(e)}function yi(e){return"_v("+(2===e.type?e.expression:Ci(JSON.stringify(e.text)))+")"}function gi(e){return"_e("+JSON.stringify(e.text)+")"}function _i(e,t){var n=e.slotName||'"default"',r=pi(e,t),i="_t("+n+(r?","+r:""),o=e.attrs&&"{"+e.attrs.map(function(e){return Li(e.name)+":"+e.value}).join(",")+"}",a=e.attrsMap["v-bind"];return!o&&!a||r||(i+=",null"),o&&(i+=","+o),a&&(i+=(o?"":",null")+","+a),i+")"}function bi(e,t,n){var r=t.inlineTemplate?null:pi(t,n,!0);return"_c("+e+","+si(t,n)+(r?","+r:"")+")"}function $i(e){for(var t="",n=0;n<e.length;n++){var r=e[n];t+='"'+r.name+'":'+Ci(r.value)+","}return t.slice(0,-1)}function Ci(e){return e.replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")}function wi(e,t){try{return new Function(e)}catch(n){return t.push({err:n,code:e}),_}}function xi(e){var t=Object.create(null);return function(n,r,i){delete(r=y({},r)).warn;var o=r.delimiters?String(r.delimiters)+n:n;if(t[o])return t[o];var a=e(n,r),s={},c=[];return s.render=wi(a.render,c),s.staticRenderFns=a.staticRenderFns.map(function(e){return wi(e,c)}),t[o]=s}}function ki(e){return Ms=Ms||document.createElement("div"),Ms.innerHTML=e?'<a href="\n"/>':'<div a="\n"/>',Ms.innerHTML.indexOf("&#10;")>0}function Ai(e){if(e.outerHTML)return e.outerHTML;var t=document.createElement("div");return t.appendChild(e.cloneNode(!0)),t.innerHTML}var Oi=Object.freeze({}),Si=Object.prototype.toString,Ti=f("slot,component",!0),Ei=f("key,ref,slot,slot-scope,is"),ji=Object.prototype.hasOwnProperty,Ni=/-(\w)/g,Li=v(function(e){return e.replace(Ni,function(e,t){return t?t.toUpperCase():""})}),Ii=v(function(e){return e.charAt(0).toUpperCase()+e.slice(1)}),Mi=/\B([A-Z])/g,Di=v(function(e){return e.replace(Mi,"-$1").toLowerCase()}),Pi=function(e,t,n){return!1},Fi=function(e){return e},Ri="data-server-rendered",Hi=["component","directive","filter"],Bi=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated","errorCaptured"],Ui={optionMergeStrategies:Object.create(null),silent:!1,productionTip:!1,devtools:!1,performance:!1,errorHandler:null,warnHandler:null,ignoredElements:[],keyCodes:Object.create(null),isReservedTag:Pi,isReservedAttr:Pi,isUnknownElement:Pi,getTagNamespace:_,parsePlatformTagName:Fi,mustUseProp:Pi,_lifecycleHooks:Bi},Vi=/[^\w.$]/,zi="__proto__"in{},Ki="undefined"!=typeof window,Ji="undefined"!=typeof WXEnvironment&&!!WXEnvironment.platform,qi=Ji&&WXEnvironment.platform.toLowerCase(),Wi=Ki&&window.navigator.userAgent.toLowerCase(),Gi=Wi&&/msie|trident/.test(Wi),Zi=Wi&&Wi.indexOf("msie 9.0")>0,Xi=Wi&&Wi.indexOf("edge/")>0,Yi=Wi&&Wi.indexOf("android")>0||"android"===qi,Qi=Wi&&/iphone|ipad|ipod|ios/.test(Wi)||"ios"===qi,eo=(Wi&&/chrome\/\d+/.test(Wi),{}.watch),to=!1;if(Ki)try{var no={};Object.defineProperty(no,"passive",{get:function(){to=!0}}),window.addEventListener("test-passive",null,no)}catch(e){}var ro,io,oo=function(){return void 0===ro&&(ro=!Ki&&"undefined"!=typeof global&&"server"===global.process.env.VUE_ENV),ro},ao=Ki&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__,so="undefined"!=typeof Symbol&&A(Symbol)&&"undefined"!=typeof Reflect&&A(Reflect.ownKeys);io="undefined"!=typeof Set&&A(Set)?Set:function(){function e(){this.set=Object.create(null)}return e.prototype.has=function(e){return!0===this.set[e]},e.prototype.add=function(e){this.set[e]=!0},e.prototype.clear=function(){this.set=Object.create(null)},e}();var co=_,uo=0,lo=function(){this.id=uo++,this.subs=[]};lo.prototype.addSub=function(e){this.subs.push(e)},lo.prototype.removeSub=function(e){d(this.subs,e)},lo.prototype.depend=function(){lo.target&&lo.target.addDep(this)},lo.prototype.notify=function(){for(var e=this.subs.slice(),t=0,n=e.length;t<n;t++)e[t].update()},lo.target=null;var fo=[],po=function(e,t,n,r,i,o,a,s){this.tag=e,this.data=t,this.children=n,this.text=r,this.elm=i,this.ns=void 0,this.context=o,this.fnContext=void 0,this.fnOptions=void 0,this.fnScopeId=void 0,this.key=t&&t.key,this.componentOptions=a,this.componentInstance=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1,this.asyncFactory=s,this.asyncMeta=void 0,this.isAsyncPlaceholder=!1},vo={child:{configurable:!0}};vo.child.get=function(){return this.componentInstance},Object.defineProperties(po.prototype,vo);var ho=function(e){void 0===e&&(e="");var t=new po;return t.text=e,t.isComment=!0,t},mo=Array.prototype,yo=Object.create(mo);["push","pop","shift","unshift","splice","sort","reverse"].forEach(function(e){var t=mo[e];x(yo,e,function(){for(var n=[],r=arguments.length;r--;)n[r]=arguments[r];var i,o=t.apply(this,n),a=this.__ob__;switch(e){case"push":case"unshift":i=n;break;case"splice":i=n.slice(2)}return i&&a.observeArray(i),a.dep.notify(),o})});var go=Object.getOwnPropertyNames(yo),_o={shouldConvert:!0},bo=function(e){this.value=e,this.dep=new lo,this.vmCount=0,x(e,"__ob__",this),Array.isArray(e)?((zi?N:L)(e,yo,go),this.observeArray(e)):this.walk(e)};bo.prototype.walk=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)M(e,t[n],e[t[n]])},bo.prototype.observeArray=function(e){for(var t=0,n=e.length;t<n;t++)I(e[t])};var $o=Ui.optionMergeStrategies;$o.data=function(e,t,n){return n?H(e,t,n):t&&"function"!=typeof t?e:H(e,t)},Bi.forEach(function(e){$o[e]=B}),Hi.forEach(function(e){$o[e+"s"]=U}),$o.watch=function(e,t,n,r){if(e===eo&&(e=void 0),t===eo&&(t=void 0),!t)return Object.create(e||null);if(!e)return t;var i={};y(i,e);for(var o in t){var a=i[o],s=t[o];a&&!Array.isArray(a)&&(a=[a]),i[o]=a?a.concat(s):Array.isArray(s)?s:[s]}return i},$o.props=$o.methods=$o.inject=$o.computed=function(e,t,n,r){if(!e)return t;var i=Object.create(null);return y(i,e),t&&y(i,t),i},$o.provide=H;var Co,wo,xo=function(e,t){return void 0===t?e:t},ko=[],Ao=!1,Oo=!1;if("undefined"!=typeof setImmediate&&A(setImmediate))wo=function(){setImmediate(te)};else if("undefined"==typeof MessageChannel||!A(MessageChannel)&&"[object MessageChannelConstructor]"!==MessageChannel.toString())wo=function(){setTimeout(te,0)};else{var So=new MessageChannel,To=So.port2;So.port1.onmessage=te,wo=function(){To.postMessage(1)}}if("undefined"!=typeof Promise&&A(Promise)){var Eo=Promise.resolve();Co=function(){Eo.then(te),Qi&&setTimeout(_)}}else Co=wo;var jo,No=new io,Lo=v(function(e){var t="&"===e.charAt(0),n="~"===(e=t?e.slice(1):e).charAt(0),r="!"===(e=n?e.slice(1):e).charAt(0);return e=r?e.slice(1):e,{name:e,once:n,capture:r,passive:t}}),Io=null,Mo=[],Do=[],Po={},Fo=!1,Ro=!1,Ho=0,Bo=0,Uo=function(e,t,n,r,i){this.vm=e,i&&(e._watcher=this),e._watchers.push(this),r?(this.deep=!!r.deep,this.user=!!r.user,this.lazy=!!r.lazy,this.sync=!!r.sync):this.deep=this.user=this.lazy=this.sync=!1,this.cb=n,this.id=++Bo,this.active=!0,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new io,this.newDepIds=new io,this.expression="","function"==typeof t?this.getter=t:(this.getter=k(t),this.getter||(this.getter=function(){})),this.value=this.lazy?void 0:this.get()};Uo.prototype.get=function(){O(this);var e,t=this.vm;try{e=this.getter.call(t,t)}catch(e){if(!this.user)throw e;Y(e,t,'getter for watcher "'+this.expression+'"')}finally{this.deep&&ie(e),S(),this.cleanupDeps()}return e},Uo.prototype.addDep=function(e){var t=e.id;this.newDepIds.has(t)||(this.newDepIds.add(t),this.newDeps.push(e),this.depIds.has(t)||e.addSub(this))},Uo.prototype.cleanupDeps=function(){for(var e=this,t=this.deps.length;t--;){var n=e.deps[t];e.newDepIds.has(n.id)||n.removeSub(e)}var r=this.depIds;this.depIds=this.newDepIds,this.newDepIds=r,this.newDepIds.clear(),r=this.deps,this.deps=this.newDeps,this.newDeps=r,this.newDeps.length=0},Uo.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():Re(this)},Uo.prototype.run=function(){if(this.active){var e=this.get();if(e!==this.value||o(e)||this.deep){var t=this.value;if(this.value=e,this.user)try{this.cb.call(this.vm,e,t)}catch(e){Y(e,this.vm,'callback for watcher "'+this.expression+'"')}else this.cb.call(this.vm,e,t)}}},Uo.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},Uo.prototype.depend=function(){for(var e=this,t=this.deps.length;t--;)e.deps[t].depend()},Uo.prototype.teardown=function(){var e=this;if(this.active){this.vm._isBeingDestroyed||d(this.vm._watchers,this);for(var t=this.deps.length;t--;)e.deps[t].removeSub(e);this.active=!1}};var Vo={enumerable:!0,configurable:!0,get:_,set:_},zo={lazy:!0};lt(ft.prototype);var Ko={init:function(e,t,n,r){if(!e.componentInstance||e.componentInstance._isDestroyed)(e.componentInstance=ht(e,Io,n,r)).$mount(t?e.elm:void 0,t);else if(e.data.keepAlive){var i=e;Ko.prepatch(i,i)}},prepatch:function(e,t){var n=t.componentOptions;Te(t.componentInstance=e.componentInstance,n.propsData,n.listeners,t,n.children)},insert:function(e){var t=e.context,n=e.componentInstance;n._isMounted||(n._isMounted=!0,Le(n,"mounted")),e.data.keepAlive&&(t._isMounted?Pe(n):je(n,!0))},destroy:function(e){var t=e.componentInstance;t._isDestroyed||(e.data.keepAlive?Ne(t,!0):t.$destroy())}},Jo=Object.keys(Ko),qo=1,Wo=2,Go=0;!function(e){e.prototype._init=function(e){var t=this;t._uid=Go++,t._isVue=!0,e&&e._isComponent?wt(t,e):t.$options=J(xt(t.constructor),e||{},t),t._renderProxy=t,t._self=t,Oe(t),be(t),Ct(t),Le(t,"beforeCreate"),Ye(t),Be(t),Xe(t),Le(t,"created"),t.$options.el&&t.$mount(t.$options.el)}}(Ot),function(e){var t={};t.get=function(){return this._data};var n={};n.get=function(){return this._props},Object.defineProperty(e.prototype,"$data",t),Object.defineProperty(e.prototype,"$props",n),e.prototype.$set=D,e.prototype.$delete=P,e.prototype.$watch=function(e,t,n){var r=this;if(a(t))return Ze(r,e,t,n);(n=n||{}).user=!0;var i=new Uo(r,e,t,n);return n.immediate&&t.call(r,i.value),function(){i.teardown()}}}(Ot),function(e){var t=/^hook:/;e.prototype.$on=function(e,n){var r=this,i=this;if(Array.isArray(e))for(var o=0,a=e.length;o<a;o++)r.$on(e[o],n);else(i._events[e]||(i._events[e]=[])).push(n),t.test(e)&&(i._hasHookEvent=!0);return i},e.prototype.$once=function(e,t){function n(){r.$off(e,n),t.apply(r,arguments)}var r=this;return n.fn=t,r.$on(e,n),r},e.prototype.$off=function(e,t){var n=this,r=this;if(!arguments.length)return r._events=Object.create(null),r;if(Array.isArray(e)){for(var i=0,o=e.length;i<o;i++)n.$off(e[i],t);return r}var a=r._events[e];if(!a)return r;if(!t)return r._events[e]=null,r;if(t)for(var s,c=a.length;c--;)if((s=a[c])===t||s.fn===t){a.splice(c,1);break}return r},e.prototype.$emit=function(e){var t=this,n=t._events[e];if(n){n=n.length>1?m(n):n;for(var r=m(arguments,1),i=0,o=n.length;i<o;i++)try{n[i].apply(t,r)}catch(n){Y(n,t,'event handler for "'+e+'"')}}return t}}(Ot),function(e){e.prototype._update=function(e,t){var n=this;n._isMounted&&Le(n,"beforeUpdate");var r=n.$el,i=n._vnode,o=Io;Io=n,n._vnode=e,i?n.$el=n.__patch__(i,e):(n.$el=n.__patch__(n.$el,e,t,!1,n.$options._parentElm,n.$options._refElm),n.$options._parentElm=n.$options._refElm=null),Io=o,r&&(r.__vue__=null),n.$el&&(n.$el.__vue__=n),n.$vnode&&n.$parent&&n.$vnode===n.$parent._vnode&&(n.$parent.$el=n.$el)},e.prototype.$forceUpdate=function(){var e=this;e._watcher&&e._watcher.update()},e.prototype.$destroy=function(){var e=this;if(!e._isBeingDestroyed){Le(e,"beforeDestroy"),e._isBeingDestroyed=!0;var t=e.$parent;!t||t._isBeingDestroyed||e.$options.abstract||d(t.$children,e),e._watcher&&e._watcher.teardown();for(var n=e._watchers.length;n--;)e._watchers[n].teardown();e._data.__ob__&&e._data.__ob__.vmCount--,e._isDestroyed=!0,e.__patch__(e._vnode,null),Le(e,"destroyed"),e.$off(),e.$el&&(e.$el.__vue__=null),e.$vnode&&(e.$vnode.parent=null)}}}(Ot),function(e){lt(e.prototype),e.prototype.$nextTick=function(e){return re(e,this)},e.prototype._render=function(){var e=this,t=e.$options,n=t.render,r=t._parentVnode;if(e._isMounted)for(var i in e.$slots){var o=e.$slots[i];(o._rendered||o[0]&&o[0].elm)&&(e.$slots[i]=j(o,!0))}e.$scopedSlots=r&&r.data.scopedSlots||Oi,e.$vnode=r;var a;try{a=n.call(e._renderProxy,e.$createElement)}catch(t){Y(t,e,"render"),a=e._vnode}return a instanceof po||(a=ho()),a.parent=r,a}}(Ot);var Zo=[String,RegExp,Array],Xo={KeepAlive:{name:"keep-alive",abstract:!0,props:{include:Zo,exclude:Zo,max:[String,Number]},created:function(){this.cache=Object.create(null),this.keys=[]},destroyed:function(){var e=this;for(var t in e.cache)Pt(e.cache,t,e.keys)},watch:{include:function(e){Dt(this,function(t){return Mt(e,t)})},exclude:function(e){Dt(this,function(t){return!Mt(e,t)})}},render:function(){var e=this.$slots.default,t=_e(e),n=t&&t.componentOptions;if(n){var r=It(n),i=this,o=i.include,a=i.exclude;if(o&&(!r||!Mt(o,r))||a&&r&&Mt(a,r))return t;var s=this,c=s.cache,u=s.keys,l=null==t.key?n.Ctor.cid+(n.tag?"::"+n.tag:""):t.key;c[l]?(t.componentInstance=c[l].componentInstance,d(u,l),u.push(l)):(c[l]=t,u.push(l),this.max&&u.length>parseInt(this.max)&&Pt(c,u[0],u,this._vnode)),t.data.keepAlive=!0}return t||e&&e[0]}}};!function(e){var t={};t.get=function(){return Ui},Object.defineProperty(e,"config",t),e.util={warn:co,extend:y,mergeOptions:J,defineReactive:M},e.set=D,e.delete=P,e.nextTick=re,e.options=Object.create(null),Hi.forEach(function(t){e.options[t+"s"]=Object.create(null)}),e.options._base=e,y(e.options.components,Xo),St(e),Tt(e),Et(e),Lt(e)}(Ot),Object.defineProperty(Ot.prototype,"$isServer",{get:oo}),Object.defineProperty(Ot.prototype,"$ssrContext",{get:function(){return this.$vnode&&this.$vnode.ssrContext}}),Ot.version="2.5.9";var Yo,Qo,ea,ta,na,ra,ia,oa,aa=f("style,class"),sa=f("input,textarea,option,select,progress"),ca=function(e,t,n){return"value"===n&&sa(e)&&"button"!==t||"selected"===n&&"option"===e||"checked"===n&&"input"===e||"muted"===n&&"video"===e},ua=f("contenteditable,draggable,spellcheck"),la=f("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"),fa="http://www.w3.org/1999/xlink",da=function(e){return":"===e.charAt(5)&&"xlink"===e.slice(0,5)},pa=function(e){return da(e)?e.slice(6,e.length):""},va=function(e){return null==e||!1===e},ha={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"},ma=f("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),ya=f("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",!0),ga=function(e){return ma(e)||ya(e)},_a=Object.create(null),ba=f("text,number,password,search,email,tel,url"),$a=Object.freeze({createElement:function(e,t){var n=document.createElement(e);return"select"!==e?n:(t.data&&t.data.attrs&&void 0!==t.data.attrs.multiple&&n.setAttribute("multiple","multiple"),n)},createElementNS:function(e,t){return document.createElementNS(ha[e],t)},createTextNode:function(e){return document.createTextNode(e)},createComment:function(e){return document.createComment(e)},insertBefore:function(e,t,n){e.insertBefore(t,n)},removeChild:function(e,t){e.removeChild(t)},appendChild:function(e,t){e.appendChild(t)},parentNode:function(e){return e.parentNode},nextSibling:function(e){return e.nextSibling},tagName:function(e){return e.tagName},setTextContent:function(e,t){e.textContent=t},setAttribute:function(e,t,n){e.setAttribute(t,n)}}),Ca={create:function(e,t){qt(t)},update:function(e,t){e.data.ref!==t.data.ref&&(qt(e,!0),qt(t))},destroy:function(e){qt(e,!0)}},wa=new po("",{},[]),xa=["create","activate","update","remove","destroy"],ka={create:Xt,update:Xt,destroy:function(e){Xt(e,wa)}},Aa=Object.create(null),Oa=[Ca,ka],Sa={create:nn,update:nn},Ta={create:on,update:on},Ea=/[\w).+\-_$\]]/,ja="__r",Na="__c",La={create:Nn,update:Nn},Ia={create:Ln,update:Ln},Ma=v(function(e){var t={},n=/;(?![^(]*\))/g,r=/:(.+)/;return e.split(n).forEach(function(e){if(e){var n=e.split(r);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}),Da=/^--/,Pa=/\s*!important$/,Fa=function(e,t,n){if(Da.test(t))e.style.setProperty(t,n);else if(Pa.test(n))e.style.setProperty(t,n.replace(Pa,""),"important");else{var r=Ha(t);if(Array.isArray(n))for(var i=0,o=n.length;i<o;i++)e.style[r]=n[i];else e.style[r]=n}},Ra=["Webkit","Moz","ms"],Ha=v(function(e){if(oa=oa||document.createElement("div").style,"filter"!==(e=Li(e))&&e in oa)return e;for(var t=e.charAt(0).toUpperCase()+e.slice(1),n=0;n<Ra.length;n++){var r=Ra[n]+t;if(r in oa)return r}}),Ba={create:Hn,update:Hn},Ua=v(function(e){return{enterClass:e+"-enter",enterToClass:e+"-enter-to",enterActiveClass:e+"-enter-active",leaveClass:e+"-leave",leaveToClass:e+"-leave-to",leaveActiveClass:e+"-leave-active"}}),Va=Ki&&!Zi,za="transition",Ka="animation",Ja="transition",qa="transitionend",Wa="animation",Ga="animationend";Va&&(void 0===window.ontransitionend&&void 0!==window.onwebkittransitionend&&(Ja="WebkitTransition",qa="webkitTransitionEnd"),void 0===window.onanimationend&&void 0!==window.onwebkitanimationend&&(Wa="WebkitAnimation",Ga="webkitAnimationEnd"));var Za=Ki?window.requestAnimationFrame?window.requestAnimationFrame.bind(window):setTimeout:function(e){return e()},Xa=/\b(transform|all)(,|$)/,Ya=function(r){function o(e){return new po(j.tagName(e).toLowerCase(),{},[],void 0,e)}function a(e,t){function n(){0==--n.listeners&&s(e)}return n.listeners=t,n}function s(e){var n=j.parentNode(e);t(n)&&j.removeChild(n,e)}function c(e,r,i,o,a){if(e.isRootInsert=!a,!u(e,r,i,o)){var s=e.data,c=e.children,l=e.tag;t(l)?(e.elm=e.ns?j.createElementNS(e.ns,l):j.createElement(l,e),y(e),v(e,c,r),t(s)&&m(e,r),p(i,e.elm,o)):n(e.isComment)?(e.elm=j.createComment(e.text),p(i,e.elm,o)):(e.elm=j.createTextNode(e.text),p(i,e.elm,o))}}function u(e,r,i,o){var a=e.data;if(t(a)){var s=t(e.componentInstance)&&a.keepAlive;if(t(a=a.hook)&&t(a=a.init)&&a(e,!1,i,o),t(e.componentInstance))return l(e,r),n(s)&&d(e,r,i,o),!0}}function l(e,n){t(e.data.pendingInsert)&&(n.push.apply(n,e.data.pendingInsert),e.data.pendingInsert=null),e.elm=e.componentInstance.$el,h(e)?(m(e,n),y(e)):(qt(e),n.push(e))}function d(e,n,r,i){for(var o,a=e;a.componentInstance;)if(a=a.componentInstance._vnode,t(o=a.data)&&t(o=o.transition)){for(o=0;o<T.activate.length;++o)T.activate[o](wa,a);n.push(a);break}p(r,e.elm,i)}function p(e,n,r){t(e)&&(t(r)?r.parentNode===e&&j.insertBefore(e,n,r):j.appendChild(e,n))}function v(e,t,n){if(Array.isArray(t))for(var r=0;r<t.length;++r)c(t[r],n,e.elm,null,!0);else i(e.text)&&j.appendChild(e.elm,j.createTextNode(e.text))}function h(e){for(;e.componentInstance;)e=e.componentInstance._vnode;return t(e.tag)}function m(e,n){for(var r=0;r<T.create.length;++r)T.create[r](wa,e);t(O=e.data.hook)&&(t(O.create)&&O.create(wa,e),t(O.insert)&&n.push(e))}function y(e){var n;if(t(n=e.fnScopeId))j.setAttribute(e.elm,n,"");else for(var r=e;r;)t(n=r.context)&&t(n=n.$options._scopeId)&&j.setAttribute(e.elm,n,""),r=r.parent;t(n=Io)&&n!==e.context&&n!==e.fnContext&&t(n=n.$options._scopeId)&&j.setAttribute(e.elm,n,"")}function g(e,t,n,r,i,o){for(;r<=i;++r)c(n[r],o,e,t)}function _(e){var n,r,i=e.data;if(t(i))for(t(n=i.hook)&&t(n=n.destroy)&&n(e),n=0;n<T.destroy.length;++n)T.destroy[n](e);if(t(n=e.children))for(r=0;r<e.children.length;++r)_(e.children[r])}function b(e,n,r,i){for(;r<=i;++r){var o=n[r];t(o)&&(t(o.tag)?($(o),_(o)):s(o.elm))}}function $(e,n){if(t(n)||t(e.data)){var r,i=T.remove.length+1;for(t(n)?n.listeners+=i:n=a(e.elm,i),t(r=e.componentInstance)&&t(r=r._vnode)&&t(r.data)&&$(r,n),r=0;r<T.remove.length;++r)T.remove[r](e,n);t(r=e.data.hook)&&t(r=r.remove)?r(e,n):n()}else s(e.elm)}function C(n,r,i,o,a){for(var s,u,l,f=0,d=0,p=r.length-1,v=r[0],h=r[p],m=i.length-1,y=i[0],_=i[m],$=!a;f<=p&&d<=m;)e(v)?v=r[++f]:e(h)?h=r[--p]:Wt(v,y)?(x(v,y,o),v=r[++f],y=i[++d]):Wt(h,_)?(x(h,_,o),h=r[--p],_=i[--m]):Wt(v,_)?(x(v,_,o),$&&j.insertBefore(n,v.elm,j.nextSibling(h.elm)),v=r[++f],_=i[--m]):Wt(h,y)?(x(h,y,o),$&&j.insertBefore(n,h.elm,v.elm),h=r[--p],y=i[++d]):(e(s)&&(s=Zt(r,f,p)),e(u=t(y.key)?s[y.key]:w(y,r,f,p))?c(y,o,n,v.elm):Wt(l=r[u],y)?(x(l,y,o),r[u]=void 0,$&&j.insertBefore(n,l.elm,v.elm)):c(y,o,n,v.elm),y=i[++d]);f>p?g(n,e(i[m+1])?null:i[m+1].elm,i,d,m,o):d>m&&b(n,r,f,p)}function w(e,n,r,i){for(var o=r;o<i;o++){var a=n[o];if(t(a)&&Wt(e,a))return o}}function x(r,i,o,a){if(r!==i){var s=i.elm=r.elm;if(n(r.isAsyncPlaceholder))t(i.asyncFactory.resolved)?A(r.elm,i,o):i.isAsyncPlaceholder=!0;else if(n(i.isStatic)&&n(r.isStatic)&&i.key===r.key&&(n(i.isCloned)||n(i.isOnce)))i.componentInstance=r.componentInstance;else{var c,u=i.data;t(u)&&t(c=u.hook)&&t(c=c.prepatch)&&c(r,i);var l=r.children,f=i.children;if(t(u)&&h(i)){for(c=0;c<T.update.length;++c)T.update[c](r,i);t(c=u.hook)&&t(c=c.update)&&c(r,i)}e(i.text)?t(l)&&t(f)?l!==f&&C(s,l,f,o,a):t(f)?(t(r.text)&&j.setTextContent(s,""),g(s,null,f,0,f.length-1,o)):t(l)?b(s,l,0,l.length-1):t(r.text)&&j.setTextContent(s,""):r.text!==i.text&&j.setTextContent(s,i.text),t(u)&&t(c=u.hook)&&t(c=c.postpatch)&&c(r,i)}}}function k(e,r,i){if(n(i)&&t(e.parent))e.parent.data.pendingInsert=r;else for(var o=0;o<r.length;++o)r[o].data.hook.insert(r[o])}function A(e,r,i,o){var a,s=r.tag,c=r.data,u=r.children;if(o=o||c&&c.pre,r.elm=e,n(r.isComment)&&t(r.asyncFactory))return r.isAsyncPlaceholder=!0,!0;if(t(c)&&(t(a=c.hook)&&t(a=a.init)&&a(r,!0),t(a=r.componentInstance)))return l(r,i),!0;if(t(s)){if(t(u))if(e.hasChildNodes())if(t(a=c)&&t(a=a.domProps)&&t(a=a.innerHTML)){if(a!==e.innerHTML)return!1}else{for(var f=!0,d=e.firstChild,p=0;p<u.length;p++){if(!d||!A(d,u[p],i,o)){f=!1;break}d=d.nextSibling}if(!f||d)return!1}else v(r,u,i);if(t(c)){var h=!1;for(var y in c)if(!N(y)){h=!0,m(r,i);break}!h&&c.class&&ie(c.class)}}else e.data!==r.text&&(e.data=r.text);return!0}var O,S,T={},E=r.modules,j=r.nodeOps;for(O=0;O<xa.length;++O)for(T[xa[O]]=[],S=0;S<E.length;++S)t(E[S][xa[O]])&&T[xa[O]].push(E[S][xa[O]]);var N=f("attrs,class,staticClass,staticStyle,key");return function(r,i,a,s,u,l){if(!e(i)){var f=!1,d=[];if(e(r))f=!0,c(i,d,u,l);else{var p=t(r.nodeType);if(!p&&Wt(r,i))x(r,i,d,s);else{if(p){if(1===r.nodeType&&r.hasAttribute(Ri)&&(r.removeAttribute(Ri),a=!0),n(a)&&A(r,i,d))return k(i,d,!0),r;r=o(r)}var v=r.elm,m=j.parentNode(v);if(c(i,d,v._leaveCb?null:m,j.nextSibling(v)),t(i.parent))for(var y=i.parent,g=h(i);y;){for(var $=0;$<T.destroy.length;++$)T.destroy[$](y);if(y.elm=i.elm,g){for(var C=0;C<T.create.length;++C)T.create[C](wa,y);var w=y.data.hook.insert;if(w.merged)for(var O=1;O<w.fns.length;O++)w.fns[O]()}else qt(y);y=y.parent}t(m)?b(m,[r],0,0):t(r.tag)&&_(r)}}return k(i,d,f),i.elm}t(r)&&_(r)}}({nodeOps:$a,modules:[Sa,Ta,La,Ia,Ba,Ki?{create:tr,activate:tr,remove:function(e,t){!0!==e.data.show?Yn(e,t):t()}}:{}].concat(Oa)});Zi&&document.addEventListener("selectionchange",function(){var e=document.activeElement;e&&e.vmodel&&cr(e,"input")});var Qa={inserted:function(e,t,n,r){"select"===n.tag?(r.elm&&!r.elm._vOptions?ce(n,"postpatch",function(){Qa.componentUpdated(e,t,n)}):nr(e,t,n.context),e._vOptions=[].map.call(e.options,or)):("textarea"===n.tag||ba(e.type))&&(e._vModifiers=t.modifiers,t.modifiers.lazy||(e.addEventListener("change",sr),Yi||(e.addEventListener("compositionstart",ar),e.addEventListener("compositionend",sr)),Zi&&(e.vmodel=!0)))},componentUpdated:function(e,t,n){if("select"===n.tag){nr(e,t,n.context);var r=e._vOptions,i=e._vOptions=[].map.call(e.options,or);i.some(function(e,t){return!b(e,r[t])})&&(e.multiple?t.value.some(function(e){return ir(e,i)}):t.value!==t.oldValue&&ir(t.value,i))&&cr(e,"change")}}},es={model:Qa,show:{bind:function(e,t,n){var r=t.value,i=(n=ur(n)).data&&n.data.transition,o=e.__vOriginalDisplay="none"===e.style.display?"":e.style.display;r&&i?(n.data.show=!0,Xn(n,function(){e.style.display=o})):e.style.display=r?o:"none"},update:function(e,t,n){var r=t.value;r!==t.oldValue&&((n=ur(n)).data&&n.data.transition?(n.data.show=!0,r?Xn(n,function(){e.style.display=e.__vOriginalDisplay}):Yn(n,function(){e.style.display="none"})):e.style.display=r?e.__vOriginalDisplay:"none")},unbind:function(e,t,n,r,i){i||(e.style.display=e.__vOriginalDisplay)}}},ts={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterToClass:String,leaveToClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String,appearToClass:String,duration:[Number,String,Object]},ns={name:"transition",props:ts,abstract:!0,render:function(e){var t=this,n=this.$slots.default;if(n&&(n=n.filter(function(e){return e.tag||ge(e)})).length){var r=this.mode,o=n[0];if(pr(this.$vnode))return o;var a=lr(o);if(!a)return o;if(this._leaving)return dr(e,o);var s="__transition-"+this._uid+"-";a.key=null==a.key?a.isComment?s+"comment":s+a.tag:i(a.key)?0===String(a.key).indexOf(s)?a.key:s+a.key:a.key;var c=(a.data||(a.data={})).transition=fr(this),u=this._vnode,l=lr(u);if(a.data.directives&&a.data.directives.some(function(e){return"show"===e.name})&&(a.data.show=!0),l&&l.data&&!vr(a,l)&&!ge(l)&&(!l.componentInstance||!l.componentInstance._vnode.isComment)){var f=l.data.transition=y({},c);if("out-in"===r)return this._leaving=!0,ce(f,"afterLeave",function(){t._leaving=!1,t.$forceUpdate()}),dr(e,o);if("in-out"===r){if(ge(a))return u;var d,p=function(){d()};ce(c,"afterEnter",p),ce(c,"enterCancelled",p),ce(f,"delayLeave",function(e){d=e})}}return o}}},rs=y({tag:String,moveClass:String},ts);delete rs.mode;var is={Transition:ns,TransitionGroup:{props:rs,render:function(e){for(var t=this.tag||this.$vnode.data.tag||"span",n=Object.create(null),r=this.prevChildren=this.children,i=this.$slots.default||[],o=this.children=[],a=fr(this),s=0;s<i.length;s++){var c=i[s];c.tag&&null!=c.key&&0!==String(c.key).indexOf("__vlist")&&(o.push(c),n[c.key]=c,(c.data||(c.data={})).transition=a)}if(r){for(var u=[],l=[],f=0;f<r.length;f++){var d=r[f];d.data.transition=a,d.data.pos=d.elm.getBoundingClientRect(),n[d.key]?u.push(d):l.push(d)}this.kept=e(t,null,u),this.removed=l}return e(t,null,o)},beforeUpdate:function(){this.__patch__(this._vnode,this.kept,!1,!0),this._vnode=this.kept},updated:function(){var e=this.prevChildren,t=this.moveClass||(this.name||"v")+"-move";e.length&&this.hasMove(e[0].elm,t)&&(e.forEach(hr),e.forEach(mr),e.forEach(yr),this._reflow=document.body.offsetHeight,e.forEach(function(e){if(e.data.moved){var n=e.elm,r=n.style;Kn(n,t),r.transform=r.WebkitTransform=r.transitionDuration="",n.addEventListener(qa,n._moveCb=function e(r){r&&!/transform$/.test(r.propertyName)||(n.removeEventListener(qa,e),n._moveCb=null,Jn(n,t))})}}))},methods:{hasMove:function(e,t){if(!Va)return!1;if(this._hasMove)return this._hasMove;var n=e.cloneNode();e._transitionClasses&&e._transitionClasses.forEach(function(e){Un(n,e)}),Bn(n,t),n.style.display="none",this.$el.appendChild(n);var r=Wn(n);return this.$el.removeChild(n),this._hasMove=r.hasTransform}}}};Ot.config.mustUseProp=ca,Ot.config.isReservedTag=ga,Ot.config.isReservedAttr=aa,Ot.config.getTagNamespace=Kt,Ot.config.isUnknownElement=function(e){if(!Ki)return!0;if(ga(e))return!1;if(e=e.toLowerCase(),null!=_a[e])return _a[e];var t=document.createElement(e);return e.indexOf("-")>-1?_a[e]=t.constructor===window.HTMLUnknownElement||t.constructor===window.HTMLElement:_a[e]=/HTMLUnknownElement/.test(t.toString())},y(Ot.options.directives,es),y(Ot.options.components,is),Ot.prototype.__patch__=Ki?Ya:_,Ot.prototype.$mount=function(e,t){return e=e&&Ki?Jt(e):void 0,Se(this,e,t)},Ot.nextTick(function(){Ui.devtools&&ao&&ao.emit("init",Ot)},0);var os,as=/\{\{((?:.|\n)+?)\}\}/g,ss=/[-.*+?^${}()|[\]\/\\]/g,cs=v(function(e){var t=e[0].replace(ss,"\\$&"),n=e[1].replace(ss,"\\$&");return new RegExp(t+"((?:.|\\n)+?)"+n,"g")}),us={staticKeys:["staticClass"],transformNode:function(e,t){t.warn;var n=hn(e,"class");n&&(e.staticClass=JSON.stringify(n));var r=vn(e,"class",!1);r&&(e.classBinding=r)},genData:function(e){var t="";return e.staticClass&&(t+="staticClass:"+e.staticClass+","),e.classBinding&&(t+="class:"+e.classBinding+","),t}},ls={staticKeys:["staticStyle"],transformNode:function(e,t){var n=hn(e,"style");n&&(e.staticStyle=JSON.stringify(Ma(n)));var r=vn(e,"style",!1);r&&(e.styleBinding=r)},genData:function(e){var t="";return e.staticStyle&&(t+="staticStyle:"+e.staticStyle+","),e.styleBinding&&(t+="style:("+e.styleBinding+"),"),t}},fs={decode:function(e){return os=os||document.createElement("div"),os.innerHTML=e,os.textContent}},ds=f("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"),ps=f("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"),vs=f("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"),hs=/^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,ms="[a-zA-Z_][\\w\\-\\.]*",ys="((?:"+ms+"\\:)?"+ms+")",gs=new RegExp("^<"+ys),_s=/^\s*(\/?)>/,bs=new RegExp("^<\\/"+ys+"[^>]*>"),$s=/^<!DOCTYPE [^>]+>/i,Cs=/^<!--/,ws=/^<!\[/,xs=!1;"x".replace(/x(.)?/g,function(e,t){xs=""===t});var ks,As,Os,Ss,Ts,Es,js,Ns,Ls,Is,Ms,Ds=f("script,style,textarea",!0),Ps={},Fs={"&lt;":"<","&gt;":">","&quot;":'"',"&amp;":"&","&#10;":"\n","&#9;":"\t"},Rs=/&(?:lt|gt|quot|amp);/g,Hs=/&(?:lt|gt|quot|amp|#10|#9);/g,Bs=f("pre,textarea",!0),Us=function(e,t){return e&&Bs(e)&&"\n"===t[0]},Vs=/^@|^v-on:/,zs=/^v-|^@|^:/,Ks=/(.*?)\s+(?:in|of)\s+(.*)/,Js=/\((\{[^}]*\}|[^,{]*),([^,]*)(?:,([^,]*))?\)/,qs=/^\(|\)$/g,Ws=/:(.*)$/,Gs=/^:|^v-bind:/,Zs=/\.[^.]+/g,Xs=v(fs.decode),Ys=/^xmlns:NS\d+/,Qs=/^NS\d+:/,ec=[us,ls,{preTransformNode:function(e,t){if("input"===e.tag){var n=e.attrsMap;if(n["v-model"]&&(n["v-bind:type"]||n[":type"])){var r=vn(e,"type"),i=hn(e,"v-if",!0),o=i?"&&("+i+")":"",a=null!=hn(e,"v-else",!0),s=hn(e,"v-else-if",!0),c=Vr(e);Sr(c),zr(c,"type","checkbox"),kr(c,t),c.processed=!0,c.if="("+r+")==='checkbox'"+o,Nr(c,{exp:c.if,block:c});var u=Vr(e);hn(u,"v-for",!0),zr(u,"type","radio"),kr(u,t),Nr(c,{exp:"("+r+")==='radio'"+o,block:u});var l=Vr(e);return hn(l,"v-for",!0),zr(l,":type",r),kr(l,t),Nr(c,{exp:i,block:l}),a?c.else=!0:s&&(c.elseif=s),c}}}}],tc={expectHTML:!0,modules:ec,directives:{model:function(e,t,n){var r=t.value,i=t.modifiers,o=e.tag,a=e.attrsMap.type;if(e.component)return mn(e,r,i),!1;if("select"===o)An(e,r,i);else if("input"===o&&"checkbox"===a)xn(e,r,i);else if("input"===o&&"radio"===a)kn(e,r,i);else if("input"===o||"textarea"===o)On(e,r,i);else if(!Ui.isReservedTag(o))return mn(e,r,i),!1;return!0},text:function(e,t){t.value&&ln(e,"textContent","_s("+t.value+")")},html:function(e,t){t.value&&ln(e,"innerHTML","_s("+t.value+")")}},isPreTag:function(e){return"pre"===e},isUnaryTag:ds,mustUseProp:ca,canBeLeftOpenTag:ps,isReservedTag:ga,getTagNamespace:Kt,staticKeys:function(e){return e.reduce(function(e,t){return e.concat(t.staticKeys||[])},[]).join(",")}(ec)},nc=v(function(e){return f("type,tag,attrsList,attrsMap,plain,parent,children,attrs"+(e?","+e:""))}),rc=/^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/,ic=/^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/,oc={esc:27,tab:9,enter:13,space:32,up:38,left:37,right:39,down:40,delete:[8,46]},ac=function(e){return"if("+e+")return null;"},sc={stop:"$event.stopPropagation();",prevent:"$event.preventDefault();",self:ac("$event.target !== $event.currentTarget"),ctrl:ac("!$event.ctrlKey"),shift:ac("!$event.shiftKey"),alt:ac("!$event.altKey"),meta:ac("!$event.metaKey"),left:ac("'button' in $event && $event.button !== 0"),middle:ac("'button' in $event && $event.button !== 1"),right:ac("'button' in $event && $event.button !== 2")},cc={on:function(e,t){e.wrapListeners=function(e){return"_g("+e+","+t.value+")"}},bind:function(e,t){e.wrapData=function(n){return"_b("+n+",'"+e.tag+"',"+t.value+","+(t.modifiers&&t.modifiers.prop?"true":"false")+(t.modifiers&&t.modifiers.sync?",true":"")+")"}},cloak:_},uc=function(e){this.options=e,this.warn=e.warn||cn,this.transforms=un(e.modules,"transformCode"),this.dataGenFns=un(e.modules,"genData"),this.directives=y(y({},cc),e.directives);var t=e.isReservedTag||Pi;this.maybeComponent=function(e){return!t(e.tag)},this.onceId=0,this.staticRenderFns=[]},lc=(new RegExp("\\b"+"do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments".split(",").join("\\b|\\b")+"\\b"),new RegExp("\\b"+"delete,typeof,void".split(",").join("\\s*\\([^\\)]*\\)|\\b")+"\\s*\\([^\\)]*\\)"),function(e){return function(t){function n(n,r){var i=Object.create(t),o=[],a=[];if(i.warn=function(e,t){(t?a:o).push(e)},r){r.modules&&(i.modules=(t.modules||[]).concat(r.modules)),r.directives&&(i.directives=y(Object.create(t.directives),r.directives));for(var s in r)"modules"!==s&&"directives"!==s&&(i[s]=r[s])}var c=e(n,i);return c.errors=o,c.tips=a,c}return{compile:n,compileToFunctions:xi(n)}}}(function(e,t){var n=Cr(e.trim(),t);Kr(n,t);var r=ei(n,t);return{ast:n,render:r.render,staticRenderFns:r.staticRenderFns}})(tc).compileToFunctions),fc=!!Ki&&ki(!1),dc=!!Ki&&ki(!0),pc=v(function(e){var t=Jt(e);return t&&t.innerHTML}),vc=Ot.prototype.$mount;return Ot.prototype.$mount=function(e,t){if((e=e&&Jt(e))===document.body||e===document.documentElement)return this;var n=this.$options;if(!n.render){var r=n.template;if(r)if("string"==typeof r)"#"===r.charAt(0)&&(r=pc(r));else{if(!r.nodeType)return this;r=r.innerHTML}else e&&(r=Ai(e));if(r){var i=lc(r,{shouldDecodeNewlines:fc,shouldDecodeNewlinesForHref:dc,delimiters:n.delimiters,comments:n.comments},this),o=i.render,a=i.staticRenderFns;n.render=o,n.staticRenderFns=a}}return vc.call(this,e,t)},Ot.compile=lc,Ot});

/* axios v0.17.1 | (c) 2017 by Matt Zabriskie */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["axios"] = factory();
	else
		root["axios"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(2);
	var bind = __webpack_require__(3);
	var Axios = __webpack_require__(5);
	var defaults = __webpack_require__(6);

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);

	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);

	  // Copy context to instance
	  utils.extend(instance, context);

	  return instance;
	}

	// Create the default instance to be exported
	var axios = createInstance(defaults);

	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;

	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(utils.merge(defaults, instanceConfig));
	};

	// Expose Cancel & CancelToken
	axios.Cancel = __webpack_require__(23);
	axios.CancelToken = __webpack_require__(24);
	axios.isCancel = __webpack_require__(20);

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(25);

	module.exports = axios;

	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var bind = __webpack_require__(3);
	var isBuffer = __webpack_require__(4);

	/*global toString:true*/

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}

	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  navigator.product -> 'ReactNative'
	 */
	function isStandardBrowserEnv() {
	  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
	    return false;
	  }
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object') {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }

	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}

	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isBuffer: isBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim
	};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */

	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	module.exports = function (obj) {
	  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	}

	function isBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
	}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(6);
	var utils = __webpack_require__(2);
	var InterceptorManager = __webpack_require__(17);
	var dispatchRequest = __webpack_require__(18);

	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}

	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }

	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
	  config.method = config.method.toLowerCase();

	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);

	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }

	  return promise;
	};

	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});

	module.exports = Axios;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(2);
	var normalizeHeaderName = __webpack_require__(7);

	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}

	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(8);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(8);
	  }
	  return adapter;
	}

	var defaults = {
	  adapter: getDefaultAdapter(),

	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],

	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};

	defaults.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};

	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  defaults.headers[method] = {};
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});

	module.exports = defaults;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(2);

	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(2);
	var settle = __webpack_require__(9);
	var buildURL = __webpack_require__(12);
	var parseHeaders = __webpack_require__(13);
	var isURLSameOrigin = __webpack_require__(14);
	var createError = __webpack_require__(10);
	var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(15);

	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;

	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }

	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;

	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if (("production") !== 'test' &&
	        typeof window !== 'undefined' &&
	        window.XDomainRequest && !('withCredentials' in request) &&
	        !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }

	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }

	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

	    // Set the request timeout in MS
	    request.timeout = config.timeout;

	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || (request.readyState !== 4 && !xDomain)) {
	        return;
	      }

	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }

	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };

	      settle(resolve, reject, response);

	      // Clean up request
	      request = null;
	    };

	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config, null, request));

	      // Clean up request
	      request = null;
	    };

	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
	        request));

	      // Clean up request
	      request = null;
	    };

	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(16);

	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
	          cookies.read(config.xsrfCookieName) :
	          undefined;

	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }

	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }

	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }

	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
	        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
	        if (config.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }

	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }

	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }

	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }

	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }

	    if (requestData === undefined) {
	      requestData = null;
	    }

	    // Send the request
	    request.send(requestData);
	  });
	};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var createError = __webpack_require__(10);

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response.request,
	      response
	    ));
	  }
	};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var enhanceError = __webpack_require__(11);

	/**
	 * Create an Error with the specified message, config, error code, request and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, request, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, request, response);
	};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, request, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.request = request;
	  error.response = response;
	  return error;
	};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(2);

	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];

	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }

	      if (!utils.isArray(val)) {
	        val = [val];
	      }

	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });

	    serializedParams = parts.join('&');
	  }

	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(2);

	// Headers whose duplicates are ignored by node
	// c.f. https://nodejs.org/api/http.html#http_message_headers
	var ignoreDuplicateOf = [
	  'age', 'authorization', 'content-length', 'content-type', 'etag',
	  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
	  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
	  'referer', 'retry-after', 'user-agent'
	];

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) { return parsed; }

	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));

	    if (key) {
	      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
	        return;
	      }
	      if (key === 'set-cookie') {
	        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
	      } else {
	        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	      }
	    }
	  });

	  return parsed;
	};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(2);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;

	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;

	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }

	      urlParsingNode.setAttribute('href', href);

	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }

	    originURL = resolveURL(window.location.href);

	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :

	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	'use strict';

	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';

	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}

	module.exports = btoa;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(2);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));

	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }

	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }

	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }

	        if (secure === true) {
	          cookie.push('secure');
	        }

	        document.cookie = cookie.join('; ');
	      },

	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },

	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :

	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(2);

	function InterceptorManager() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	module.exports = InterceptorManager;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(2);
	var transformData = __webpack_require__(19);
	var isCancel = __webpack_require__(20);
	var defaults = __webpack_require__(6);
	var isAbsoluteURL = __webpack_require__(21);
	var combineURLs = __webpack_require__(22);

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}

	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);

	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }

	  // Ensure headers exist
	  config.headers = config.headers || {};

	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );

	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );

	  var adapter = config.adapter || defaults.adapter;

	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);

	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );

	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);

	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }

	    return Promise.reject(reason);
	  });
	};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(2);

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });

	  return data;
	};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return relativeURL
	    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
	    : baseURL;
	};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}

	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};

	Cancel.prototype.__CANCEL__ = true;

	module.exports = Cancel;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Cancel = __webpack_require__(23);

	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }

	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });

	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }

	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};

	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};

	module.exports = CancelToken;


/***/ }),
/* 25 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ })
/******/ ])
});
;
//# sourceMappingURL=axios.map

$(document).ready(function() {
  $('.menu .item')
    .tab();
});

new Vue({
  el: '#sidemenu',
  created: function() {
    this.getSideMenu();
  },
  data: {
    options: [],
    valor: 'asd',
  },
  methods: {
    getSideMenu: function() {
      var urlSideMenu = '/getSideMenu';
      axios.get(urlSideMenu).then(response => {
        this.options = response.data
      });
    },
    getAnnouncesByCategory: function(id) {
      var urlSideMenu = '/getSideMenu';
      window.location.href = 'your_url';
    }
  }
});
new Vue({
  el: '#index',
  created: function() {
    this.getAnuncios();
  },
  data: {
    announces: [],
    pagination: {
      'total': 0,
      'current_page': 0,
      'per_page': 0,
      'last_page': 0,
      'from': 0,
      'to': 0,
    },
  },
  computed: {
    isActived: function() {
      return this.pagination.current_page;
    },
    pagesNumber: function() {
      if (!this.pagination.to) {
        return [];
      }
      var from = this.pagination.current_page - 2;
      if (from < 1) {
        from = 1;
      }
      var to = from + (2 * 2);
      if (to >= this.pagination.last_page) {
        to = this.pagination.last_page
      }

      var pagesArray = [];
      while (from <= to) {
        pagesArray.push(from);
        from++
      }
      return pagesArray;
    }
  },
  methods: {
    getAnuncios: function(page) {
      var urlAnuncios = '/getLastAnnounces';
      axios.get(urlAnuncios).then(response => {
        this.announces = response.data
        //this.pagination = response.data.pagination
      });

    },
    changePage: function(page) {
      this.pagination.current_page = page;
      this.getCategorias(page);
    }
    // getAnnouncesByCategory: function() {
    //   axios.get('/Vehiculo', {
    //       params: {
    //         id: ''
    //       }
    //     })
    //     .then(function(response) {
    //       this.anuncios = response.data.anuncios.data,
    //         this.pagination = response.data.pagination
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // }
  }

});
new Vue({
  el: '#announce',
  created: function() {
    this.getAnnouncesByCatorSub();
  },
  data: {
    announces: [],
    pagination: {
      'total': 0,
      'current_page': 0,
      'per_page': 0,
      'last_page': 0,
      'from': 0,
      'to': 0,
    },
  },
  computed: {
    isActived: function() {
      return this.pagination.current_page;
    },
    pagesNumber: function() {
      if (!this.pagination.to) {
        return [];
      }
      var from = this.pagination.current_page - 2;
      if (from < 1) {
        from = 1;
      }
      var to = from + (2 * 2);
      if (to >= this.pagination.last_page) {
        to = this.pagination.last_page
      }

      var pagesArray = [];
      while (from <= to) {
        pagesArray.push(from);
        from++
      }
      return pagesArray;
    }
  },
  methods: {
    getAnnouncesByCatorSub: function() {
      var location = window.location.href;
      var n = location.search("-");
      var id = location.slice(n + 2);
      var cat = location.slice(n + 1);
      var cat1 = cat.slice(0, 1);
      var urlAnnounce = '';
      if (cat1 == 'S') {
        urlAnnounce = '/getAnnouncesBySubcategory/' + id;
      } else {
        urlAnnounce = '/getAnnouncesByCategory/' + id;
      }
      axios.get(urlAnnounce).then(response => {
          this.announces = response.data.anuncios.data,
            this.pagination = response.data.pagination
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

});
new Vue({
  el: '#detAnnounce',
  created: function() {
    this.getDetailAnnounce();
  },
  data: {
    detannounce: [],
    // images: [],
    comments: [],
  },
  methods: {
    getDetailAnnounce: function() {
      var location = window.location.href;
      var n = location.search("@");
      var id = location.slice(n + 1);
      urlAnnounce = '/getDetailAnnounce/' + id;
      axios.get(urlAnnounce).then(response => {
          this.detannounce = response.data.anuncio
          this.comments = response.data.comentarios
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
});
// new Vue({
//   el: '#categoria',
//   created: function() {
//     this.getCategorias(1);
//   },
//   data: {
//     edit: 0,
//     categorias: [],
//     txtnombre: '',
//     cbxcategoriapadre: '',
//     rdatipo: '',
//     fillCategoria: {
//       id: '',
//       nombre: '',
//       idPadre: '',
//     },
//     pagination: {
//       'total': 0,
//       'current_page': 0,
//       'per_page': 0,
//       'last_page': 0,
//       'from': 0,
//       'to': 0,
//     },
//   },
//   computed: {
//     isActived: function() {
//       return this.pagination.current_page;
//     },
//     pagesNumber: function() {
//       if (!this.pagination.to) {
//         return [];
//       }
//       var from = this.pagination.current_page - 2;
//       if (from < 1) {
//         from = 1;
//       }
//       var to = from + (2 * 2);
//       if (to >= this.pagination.last_page) {
//         to = this.pagination.last_page
//       }
//
//       var pagesArray = [];
//       while (from <= to) {
//         pagesArray.push(from);
//         from++
//       }
//       return pagesArray;
//     }
//   },
//   methods: {
//     getCategorias: function(page) {
//       var urlCategorias = 'categorias?page=' + page;
//
//       axios.get(urlCategorias).then(response => {
//         console.log(response);
//         // this.categorias = response.data,
//         // this.pagination = response.data.pagination
//       });
//
//     },
//     storeCategoria: function() {
//       var url = 'categorias';
//       idpadre = 0;
//       debugger;
//       if (this.rdatipo == "Subcategoria") {
//         idpadre = this.cbxcategoriapadre;
//       } else {
//         idpadre: 0;
//       };
//       axios.post(url, {
//         nombre: this.txtnombre,
//         idPadre: idpadre,
//
//       }).then(response => {
//         $('.ui.modal')
//           .modal('hide');
//         this.getCategorias();
//         this.txtnombre = '';
//         this.rdatipo = this.rdatipo,
//           toastr.success('Nueva categoria creada correctamente');
//       });
//     },
//     abrirModal: function() {
//       this.edit = 0;
//       $('.ui.modal')
//         .modal('show');
//     },
//     abrirDeleteModal: function() {
//       $('.ui.basic.modal')
//         .modal('show');
//     },
//     deleteCategoria: function(categoria) {
//       var url = 'categorias/' + categoria.id;
//       axios.delete(url).then(response => {
//         $('.ui.basic.modal')
//           .modal('hide');
//         this.getCategorias();
//         toastr.warning('Categoria eliminada de manera exitosa');
//
//       });
//     },
//     editCategoria: function(categoria) {
//       this.edit = 1;
//       this.fillCategoria.id = categoria.id;
//       this.fillCategoria.nombre = categoria.nombre;
//       this.fillCategoria.idPadre = categoria.idPadre;
//       $('.ui.modal')
//         .modal('show');
//     },
//     updateCategoria: function(id) {
//       var url = 'categorias/' + id;
//       axios.put(url, this.fillCategoria).then(response => {
//         this.getCategorias();
//         this.fillServicio = {
//           id: '',
//           nombre: '',
//           idPadre: '',
//         };
//         $('.ui.modal')
//           .modal('hide');
//       });
//     },
//     changePage: function(page) {
//       this.pagination.current_page = page;
//       this.getCategorias(page);
//       window.history.forward()
//     }
//   }
// });