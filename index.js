/**
 * @fileoverview lodash map rule
 * @author Maksim Shuvaev
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


module.exports.rules = requireIndex(__dirname + "/lib/rules");

