webpackJsonp([1],{

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(33);
var sbt = __webpack_require__(93);
var utils = __webpack_require__(33);
var CorpusData = /** @class */ (function () {
    function CorpusData(text) {
        this.text = text;
        this.sentences = sbt.sentences(text, { parse_type: "strings", newline_boundaries: true })
            .map(function (s) { return s.replace(/ +/g, " "); });
        this.commaSentences = this.sentences
            .map(function (s, i) { return s.indexOf(",") >= 0 ? i : undefined; })
            .filter(function (a) { return a != undefined; });
    }
    CorpusData.prototype.pickRandomCommaSentence = function (contextSize) {
        var cs = this.commaSentences;
        var start = cs.findIndex(function (i) { return i >= contextSize; });
        if (start < 0) {
            start = 0;
        }
        var index = cs[utils.random(start, cs.length)];
        var contextStart = index - contextSize;
        return [this.sentences[index], this.sentences.slice(contextStart, contextStart + contextSize)];
    };
    CorpusData.create = function (text) {
        return new CorpusData(text);
    };
    return CorpusData;
}());
exports.CorpusData = CorpusData;
var Corpus = /** @class */ (function (_super) {
    __extends(Corpus, _super);
    function Corpus(name, source) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.source = source;
        _this._data = undefined;
        return _this;
    }
    Object.defineProperty(Corpus.prototype, "data", {
        get: function () {
            if (this._data) {
                return this._data;
            }
            if (typeof this.source === "function") {
                console.log("load lazy corpus " + this.name);
                var corpus = this.source();
                if (corpus.name != this.name) {
                    console.warn("Loaded corpus '" + corpus.name + "' into '" + this.name + "'");
                }
                this._data = corpus.data;
            }
            else {
                this._data = this.source;
            }
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Corpus.prototype.pickRandomCommaSentence = function (contextSize) {
        return this.data.pickRandomCommaSentence(contextSize);
    };
    Corpus.create = function (name, text) {
        return new Corpus(name, CorpusData.create(text));
    };
    Corpus.createLazy = function (name, loader) {
        return new Corpus(name, loader);
    };
    return Corpus;
}(utils_1.AutoIdAble));
exports.Corpus = Corpus;


/***/ }),

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(191);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(79)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 191:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(77)(undefined);
// imports


// module
exports.push([module.i, "body {\n    background-color: whitesmoke;\n    padding-bottom: 200px;\n}\n\n.input-block {\n    font: 15px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;\n    margin-bottom: 30px;\n}\n\n.input-block:last-child {\n    margin-bottom: 0px;\n}\n\n.editor-container {\n    background-color: lightgray;\n    margin: 5px 0;\n}\n\n.context-container, .editor-container {\n    font-size: 140%;\n    padding: 2px 4px\n}\n\n\n.switch {\n    vertical-align: middle;\n}\n\n.switch {\n  position: relative;\n  display: inline-block;\n  width: 30px;\n  height: 17px;\n  margin: 0 4px;\n  vertical-align: middle;\n}\n\n/* Hide default HTML checkbox */\n.switch input {display:none;}\n\n/* The slider */\n.slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ccc;\n  -webkit-transition: .1s;\n  transition: .1s;\n}\n\n.slider:before {\n  position: absolute;\n  content: \"\";\n  height: 13px;\n  width: 13px;\n  left: 2px;\n  bottom: 2px;\n  background-color: white;\n  -webkit-transition: .1s;\n  transition: .1s;\n}\n\n\n\ninput:checked + .slider {\n  background-color: #2196F3;\n}\n\ninput:focus + .slider {\n  box-shadow: 0 0 1px #2196F3;\n}\n\ninput:checked + .slider:before {\n  -webkit-transform: translateX(13px);\n  -ms-transform: translateX(13px);\n  transform: translateX(13px);\n}\n\n\n\n\n\n.toggle {\n    vertical-align: middle;\n}\n\n.toggle {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n}\n\n/* Hide default HTML checkbox */\n.toggle input {display:none;}\n\n/* The slider */\n.toggle-view {\n  cursor: pointer;\n  background-color: #ccc;\n  -webkit-transition: .4s;\n  transition: .4s;\n  padding: 2px 5px;\n}\n\n.toggle-view:before {\n  background-color: white;\n  -webkit-transition: .4s;\n  transition: .4s;\n}\n\ninput:checked + .toggle-view {\n  background-color: #2196F3;\n}\n\ninput:focus + .toggle-view {\n  box-shadow: 0 0 1px #2196F3;\n}\n\n.monaco-editor .margin {\n    background-color: #f0f0f0 !important\n}\n\n", ""]);

// exports


/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(4);
var Utils = __webpack_require__(33);
/** small wrapper for bootstrap form groups */
var FormGroup = /** @class */ (function (_super) {
    __extends(FormGroup, _super);
    function FormGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormGroup.prototype.render = function () {
        return (React.createElement("div", { className: "form-group" },
            React.createElement("label", { htmlFor: this.props.id, className: "col-sm-6 control-label" }, this.props.label),
            React.createElement("div", { className: "col-sm-6 " + (this.props.isStatic ? "form-control-static" : "") }, this.props.children)));
    };
    return FormGroup;
}(React.Component));
exports.FormGroup = FormGroup;
/** small wrapper for bootstrap form checkboxes */
var CheckboxForm = /** @class */ (function (_super) {
    __extends(CheckboxForm, _super);
    function CheckboxForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = _this.props.id || Utils.randomString();
        return _this;
    }
    CheckboxForm.prototype.onChange = function () {
        this.props.onChange(this.input.checked);
    };
    CheckboxForm.prototype.render = function () {
        var _this = this;
        return (React.createElement(FormGroup, { label: this.props.label, id: this.props.id, isStatic: true },
            React.createElement("input", { type: "checkbox", checked: this.props.checked, id: this.id, ref: function (e) { return _this.input = e; }, onChange: this.onChange.bind(this) })));
    };
    return CheckboxForm;
}(React.Component));
exports.CheckboxForm = CheckboxForm;
/** small wrapper for bootstrap form number field */
var NumberForm = /** @class */ (function (_super) {
    __extends(NumberForm, _super);
    function NumberForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = _this.props.id || Utils.randomString();
        return _this;
    }
    NumberForm.prototype.onChange = function () {
        this.props.onChange(+this.input.value);
    };
    NumberForm.prototype.render = function () {
        var _this = this;
        return (React.createElement(FormGroup, { label: this.props.label, id: this.props.id, isStatic: true },
            React.createElement("input", { type: "number", value: this.props.value, id: this.id, step: this.props.step, min: this.props.min, max: this.props.max, ref: function (e) { return _this.input = e; }, onChange: this.onChange.bind(this) })));
    };
    return NumberForm;
}(React.Component));
exports.NumberForm = NumberForm;
var SelectForm = /** @class */ (function (_super) {
    __extends(SelectForm, _super);
    function SelectForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = _this.props.id || Utils.randomString();
        return _this;
    }
    SelectForm.prototype.onChange = function () {
        this.props.onChange(this.input.value);
    };
    SelectForm.prototype.render = function () {
        var _this = this;
        return (React.createElement(FormGroup, { label: this.props.label, id: this.props.id, isStatic: true },
            React.createElement("select", { value: this.props.value, id: this.id, ref: function (e) { return _this.input = e; }, onChange: this.onChange.bind(this) }, this.props.items.map(function (item) { return (React.createElement("option", { key: item.value, value: item.value }, item.data)); }))));
    };
    return SelectForm;
}(React.Component));
exports.SelectForm = SelectForm;
var Switch = /** @class */ (function (_super) {
    __extends(Switch, _super);
    function Switch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = _this.props.id || Utils.randomString();
        return _this;
    }
    Switch.prototype.onChange = function () {
        this.props.onChange(this.input.checked);
    };
    Switch.prototype.render = function () {
        var _this = this;
        return (React.createElement("span", { className: "switch-grouper " + (this.props.className || "") },
            React.createElement("label", { htmlFor: this.id }, this.props.label),
            React.createElement("label", { className: "switch" },
                React.createElement("input", { type: "checkbox", checked: this.props.checked, id: this.id, ref: function (e) { return _this.input = e; }, onChange: this.onChange.bind(this) }),
                React.createElement("div", { className: "slider" }))));
    };
    return Switch;
}(React.Component));
exports.Switch = Switch;
var ToggleButton = /** @class */ (function (_super) {
    __extends(ToggleButton, _super);
    function ToggleButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = _this.props.id || Utils.randomString();
        return _this;
    }
    ToggleButton.prototype.onChange = function () {
        this.props.onChange(this.input.checked);
    };
    ToggleButton.prototype.render = function () {
        var _this = this;
        return (React.createElement("label", { className: "toggle " + (this.props.className || "") },
            React.createElement("input", { type: "checkbox", checked: this.props.checked, id: this.id, ref: function (e) { return _this.input = e; }, onChange: this.onChange.bind(this) }),
            React.createElement("div", { className: "toggle-view" }, this.props.label)));
    };
    return ToggleButton;
}(React.Component));
exports.ToggleButton = ToggleButton;
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message.prototype.render = function () {
        var props = this.props;
        var color = props.color || "red";
        var show = props.show === undefined ? true : props.show;
        return (React.createElement("span", { className: props.className, style: { color: color, display: show ? "" : "none" } }, props.children));
    };
    return Message;
}(React.Component));
exports.Message = Message;


/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var defaultRandomStrings = "abcdefghijklmnopqrstuvwxyz0123456789";
function randomString(length, chars) {
    if (length === void 0) { length = 8; }
    if (chars === void 0) { chars = defaultRandomStrings; }
    var result = "";
    for (var i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}
exports.randomString = randomString;
function random(min, max) {
    var interval = max - min + 1;
    return Math.floor(Math.random() * interval + min);
}
exports.random = random;
function normFloat(num) {
    return parseFloat((Math.round(num * 100) / 100).toFixed(2));
}
exports.normFloat = normFloat;
var AutoIdAble = /** @class */ (function () {
    function AutoIdAble() {
        this.id = AutoIdAble.nextId++;
    }
    AutoIdAble.nextId = 1;
    return AutoIdAble;
}());
exports.AutoIdAble = AutoIdAble;


/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(4);
var ReactDOM = __webpack_require__(13);
var settings_1 = __webpack_require__(90);
var settingsPanel_1 = __webpack_require__(91);
var corpusPanel_1 = __webpack_require__(92);
var mainPanel_1 = __webpack_require__(97);
var corpus_1 = __webpack_require__(17);
__webpack_require__(76);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(190);
var GUI = /** @class */ (function (_super) {
    __extends(GUI, _super);
    function GUI(props) {
        var _this = _super.call(this, props) || this;
        _this.settings = new settings_1.Settings();
        var addLazy = function (name, loader) {
            _this.settings.addCorpus(corpus_1.Corpus.createLazy(name, loader));
        };
        // add default texts
        addLazy("The Adventures of Sherlock Holmes", function () { return __webpack_require__(192); });
        addLazy("Pride and Prejudice", function () { return __webpack_require__(193); });
        addLazy("Alice's Adventures in Wonderland", function () { return __webpack_require__(194); });
        return _this;
    }
    GUI.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("a", { href: "https://github.com/srtobi/comma-trainer" },
                React.createElement("img", { style: { position: "absolute", top: 0, right: 0, border: 0 }, src: "https://camo.githubusercontent.com/a6677b08c955af8400f44c6298f40e7d19cc5b2d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67", alt: "Fork me on GitHub", "data-canonical-src": "https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png" })),
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "page-header" },
                    React.createElement("h1", null,
                        "Comma Trainer ",
                        React.createElement("small", null,
                            "by ",
                            React.createElement("a", { href: "https://github.com/SrTobi/" }, "SrTobi")))),
                React.createElement("div", { className: "panel panel-default config-panel" },
                    React.createElement("div", { className: "panel-heading" },
                        React.createElement("h3", { className: "panel-title" },
                            React.createElement("a", { "data-toggle": "collapse", "data-target": "#settings-panel" }, "Settings"))),
                    React.createElement("div", { className: "panel-body collapse out", id: "settings-panel" },
                        React.createElement(settingsPanel_1.SettingsPanel, { settings: this.settings }))),
                React.createElement("div", { className: "panel panel-default config-panel" },
                    React.createElement("div", { className: "panel-heading" },
                        React.createElement("h3", { className: "panel-title" },
                            React.createElement("a", { "data-toggle": "collapse", "data-target": "#main-panel" }, "Testing area"))),
                    React.createElement("div", { className: "panel-body collapseo in", id: "main-panel" },
                        React.createElement(mainPanel_1.MainPanel, { settings: this.settings }))),
                React.createElement("div", { className: "panel panel-default config-panel" },
                    React.createElement("div", { className: "panel-heading" },
                        React.createElement("h3", { className: "panel-title" },
                            React.createElement("a", { "data-toggle": "collapse", "data-target": "#corpus-panel" }, "Corpus"))),
                    React.createElement("div", { className: "panel-body collapse out", id: "corpus-panel" },
                        React.createElement(corpusPanel_1.CorpusPanel, { settings: this.settings }))))));
    };
    return GUI;
}(React.Component));
var target = document.createElement("div");
ReactDOM.render(React.createElement(GUI, null), target);
document.body.appendChild(target);


/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = __webpack_require__(24);
var Settings = /** @class */ (function () {
    function Settings() {
        this.numContextSentences = 2;
        this.corpora = [];
        this.currentCorpus = undefined;
        this.showCommasLeft = true;
    }
    Settings.prototype.addCorpus = function (corpus) {
        this.corpora.push(corpus);
        if (!this.currentCorpus) {
            this.currentCorpus = corpus;
        }
    };
    __decorate([
        mobx_1.observable
    ], Settings.prototype, "numContextSentences", void 0);
    __decorate([
        mobx_1.observable
    ], Settings.prototype, "corpora", void 0);
    __decorate([
        mobx_1.observable
    ], Settings.prototype, "currentCorpus", void 0);
    __decorate([
        mobx_1.observable
    ], Settings.prototype, "showCommasLeft", void 0);
    return Settings;
}());
exports.Settings = Settings;


/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(4);
var mobx_react_1 = __webpack_require__(31);
var Vis = __webpack_require__(32);
var SettingsPanel = /** @class */ (function (_super) {
    __extends(SettingsPanel, _super);
    function SettingsPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SettingsPanel.prototype.onChangeCorpusSelection = function (name) {
        var settings = this.props.settings;
        settings.currentCorpus = settings.corpora.find(function (c) { return c.name == name; });
    };
    SettingsPanel.prototype.render = function () {
        var settings = this.props.settings;
        var currentCorpus = settings.currentCorpus;
        var corpusName = currentCorpus ? currentCorpus.name : "";
        return (React.createElement("div", null,
            React.createElement(Vis.SelectForm, { label: "Corpus", value: corpusName, items: settings.corpora.map(function (c) { return { value: c.name, data: c.name }; }), onChange: this.onChangeCorpusSelection.bind(this) }),
            React.createElement(Vis.NumberForm, { value: settings.numContextSentences, label: "Context sentences", min: 1, max: 10, onChange: function (newVal) { settings.numContextSentences = newVal; } }),
            React.createElement(Vis.CheckboxForm, { checked: settings.showCommasLeft, label: "Show commas left", onChange: function (newVal) { settings.showCommasLeft = newVal; } })));
    };
    SettingsPanel = __decorate([
        mobx_react_1.observer
    ], SettingsPanel);
    return SettingsPanel;
}(React.Component));
exports.SettingsPanel = SettingsPanel;


/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(4);
var mobx_react_1 = __webpack_require__(31);
var mobx_1 = __webpack_require__(24);
var corpus_1 = __webpack_require__(17);
var Vis = __webpack_require__(32);
var MinCommaSentences = 10;
var CorpusPanel = /** @class */ (function (_super) {
    __extends(CorpusPanel, _super);
    function CorpusPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.corpus = corpus_1.CorpusData.create("");
        _this.name = "";
        _this.corpusText = "";
        return _this;
    }
    CorpusPanel.prototype.submitCorpus = function (corpusData) {
        this.props.settings.addCorpus(new corpus_1.Corpus(this.name, corpusData));
        // reset form
        this.name = "";
        this.corpusText = "";
    };
    CorpusPanel.prototype.onCorpusTextChange = function (text) {
        this.corpusText = text;
        this.corpus = corpus_1.CorpusData.create(text);
    };
    CorpusPanel.prototype.render = function () {
        var _this = this;
        var corpus = this.corpus;
        var settings = this.props.settings;
        var nameExistsAlready = settings.corpora.some(function (c) { return c.name.toUpperCase() == _this.name.toUpperCase(); });
        var nameOk = this.name.length > 0 && !nameExistsAlready;
        var enoughCommaSentences = corpus.commaSentences.length >= MinCommaSentences;
        var submitEnabled = nameOk && enoughCommaSentences;
        return (React.createElement("div", null,
            React.createElement("div", null,
                React.createElement("input", { type: "text", placeholder: "Name", value: this.name, onChange: function (e) { return _this.name = e.target.value; } }),
                React.createElement(Vis.Message, { show: nameExistsAlready }, "Name already exists!")),
            React.createElement("div", null,
                React.createElement("textarea", { placeholder: "Enter your own text here", onChange: function (e) { return _this.onCorpusTextChange(e.target.value); }, value: this.corpusText })),
            React.createElement("div", null,
                React.createElement("table", null,
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null, "Characters: "),
                            React.createElement("td", null, this.corpusText.length)),
                        React.createElement("tr", null,
                            React.createElement("td", null, "Sentences: "),
                            React.createElement("td", null, corpus.sentences.length)),
                        React.createElement("tr", null,
                            React.createElement("td", null, "Sentences with comma: "),
                            React.createElement("td", null, corpus.commaSentences.length)))),
                React.createElement("br", null),
                React.createElement(Vis.Message, { show: !enoughCommaSentences },
                    "The Corpus should have at least ",
                    MinCommaSentences,
                    " sentences with commas!")),
            React.createElement("div", null,
                React.createElement("input", { type: "button", value: "Submit Corpus", disabled: !submitEnabled, onClick: function () { _this.submitCorpus(_this.corpus); } }))));
    };
    __decorate([
        mobx_1.observable
    ], CorpusPanel.prototype, "corpus", void 0);
    __decorate([
        mobx_1.observable
    ], CorpusPanel.prototype, "name", void 0);
    __decorate([
        mobx_1.observable
    ], CorpusPanel.prototype, "corpusText", void 0);
    CorpusPanel = __decorate([
        mobx_react_1.observer
    ], CorpusPanel);
    return CorpusPanel;
}(React.Component));
exports.CorpusPanel = CorpusPanel;


/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(4);
var mobx_react_1 = __webpack_require__(31);
var mobx_1 = __webpack_require__(24);
var draft_js_1 = __webpack_require__(98);
var Vis = __webpack_require__(32);
var TestInstanceResult = /** @class */ (function () {
    function TestInstanceResult(chunks, missing, wrong, correct) {
        this.chunks = chunks;
        this.missing = missing;
        this.wrong = wrong;
        this.correct = correct;
    }
    Object.defineProperty(TestInstanceResult.prototype, "isCorrect", {
        get: function () {
            return this.missing == 0 && this.wrong == 0;
        },
        enumerable: true,
        configurable: true
    });
    return TestInstanceResult;
}());
function countCommas(str) {
    return (str.match(/,+/g) || []).length;
}
var TestInstance = /** @class */ (function () {
    function TestInstance(corpus, contextSize) {
        this.corpus = corpus;
        _a = corpus.pickRandomCommaSentence(contextSize), this.refSentence = _a[0], this.context = _a[1];
        this.testSentence = this.refSentence.replace(/,/g, "");
        this.commasNeeded = countCommas(this.refSentence);
        var _a;
    }
    Object.defineProperty(TestInstance.prototype, "result", {
        get: function () {
            return this._result;
        },
        enumerable: true,
        configurable: true
    });
    TestInstance.prototype.levenshteinMatrix = function (a, b) {
        var matrix = [];
        // increment along the first column of each row
        var i;
        for (i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        // increment each column in the first row
        var j;
        for (j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }
        // Fill in the rest of the matrix
        for (i = 1; i <= b.length; i++) {
            for (j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) == a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                }
                else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(matrix[i][j - 1] + 1, // insertion
                    matrix[i - 1][j] + 1)); // deletion
                }
            }
        }
        return matrix;
    };
    ;
    TestInstance.prototype.check = function (input) {
        var ref = this.refSentence;
        var m = this.levenshteinMatrix(input, ref);
        var i = ref.length, j = input.length;
        var missing = 0, wrong = 0;
        var chunks = [];
        var add = function (c, type) {
            var prev = chunks[0];
            if (prev && prev.type == type) {
                prev.content = c + prev.content;
            }
            else {
                chunks.unshift({ type: type, content: c });
            }
        };
        while (i > 0 && j > 0) {
            var cur = m[i][j];
            var next = m[i][j] - 1;
            if (i - 1 >= 0 && m[i - 1][j] == next) {
                add(ref.charAt(i - 1), "missing");
                --i;
                ++missing;
            }
            else if (j - 1 >= 0 && m[i][j - 1] == next) {
                add(input.charAt(j - 1), "wrong");
                --j;
                ++wrong;
            }
            else if (i - 1 >= 0 && j - 1 >= 0 && m[i - 1][j - 1] == cur) {
                var c = ref.charAt(i - 1);
                add(c, c == "," ? "correct" : "stuff");
                --i;
                --j;
            }
            else {
                throw "not possible!!!";
            }
        }
        this._result = new TestInstanceResult(chunks, missing, wrong, this.commasNeeded - missing);
    };
    __decorate([
        mobx_1.observable
    ], TestInstance.prototype, "_result", void 0);
    __decorate([
        mobx_1.computed
    ], TestInstance.prototype, "result", null);
    return TestInstance;
}());
var MainPanel = /** @class */ (function (_super) {
    __extends(MainPanel, _super);
    function MainPanel(props) {
        var _this = _super.call(this, props) || this;
        _this.waitForNewCorpus();
        return _this;
    }
    MainPanel.prototype.createNewTestInstance = function () {
        var settings = this.props.settings;
        this.testInst = new TestInstance(settings.currentCorpus, settings.numContextSentences);
        console.log("Created new instance:");
        console.log(this.testInst.context);
        console.log(this.testInst.refSentence);
        this.editorState = draft_js_1.EditorState.createWithContent(draft_js_1.ContentState.createFromText(this.testInst.testSentence));
    };
    MainPanel.prototype.waitForNewCorpus = function () {
        var _this = this;
        if (this.props.settings.currentCorpus === undefined) {
            mobx_1.when(function () { return _this.props.settings.currentCorpus !== undefined; }, this.createNewTestInstance.bind(this));
            this.testInst = undefined;
        }
        else {
            this.createNewTestInstance();
        }
    };
    MainPanel.prototype.onEditFieldChange = function (newEditorState) {
        var test = this.testInst;
        var text = newEditorState.getCurrentContent().getPlainText();
        var oldText = this.editorState.getCurrentContent().getPlainText();
        var hasContentChanged = text !== oldText;
        console.log("change!");
        if (hasContentChanged) {
            var ok = test.testSentence == text.replace(/,/g, "");
            if (!ok) {
                newEditorState = draft_js_1.EditorState.undo(newEditorState);
            }
        }
        this.editorState = newEditorState;
    };
    MainPanel.prototype.render = function () {
        var settings = this.props.settings;
        var test = this.testInst;
        if (!test) {
            return (React.createElement(Vis.Message, null, "No corpus selected!"));
        }
        var text = this.editorState.getCurrentContent().getPlainText();
        var result = test.result;
        console.log("result=", result);
        return (React.createElement("div", null,
            React.createElement("div", { className: "context-container" }, test.context.map(function (s) { return s + " "; })),
            React.createElement("div", { className: "editor-container" }, !result ?
                React.createElement(draft_js_1.Editor, { editorState: this.editorState, onChange: this.onEditFieldChange.bind(this) })
                :
                    result.chunks.map(function (c) {
                        switch (c.type) {
                            case "stuff": return React.createElement("span", null, c.content);
                            case "correct": return React.createElement("span", { style: { backgroundColor: "greenyellow" } }, c.content);
                            case "missing": return React.createElement("span", { style: { backgroundColor: "yellow" } }, c.content);
                            case "wrong": return React.createElement("span", { style: { backgroundColor: "red" } }, c.content);
                        }
                    })),
            React.createElement("div", null,
                React.createElement("input", { type: "button", value: "Check", disabled: result !== undefined, onClick: function () { return test.check(text); } }),
                React.createElement("input", { type: "button", value: "Next", onClick: this.createNewTestInstance.bind(this) })),
            React.createElement("div", { className: "info-container" },
                settings.showCommasLeft ? (React.createElement("span", null,
                    countCommas(text),
                    " / ",
                    test.commasNeeded,
                    " Commas ")) : undefined,
                result ? (React.createElement("span", null,
                    result.wrong,
                    " Wrong, ",
                    result.missing,
                    " Missing, ",
                    result.correct,
                    " Correct")) : undefined)));
    };
    __decorate([
        mobx_1.observable
    ], MainPanel.prototype, "testInst", void 0);
    __decorate([
        mobx_1.observable
    ], MainPanel.prototype, "editorState", void 0);
    MainPanel = __decorate([
        mobx_react_1.observer
    ], MainPanel);
    return MainPanel;
}(React.Component));
exports.MainPanel = MainPanel;


/***/ })

},[80]);
//# sourceMappingURL=main-ee165a470debf7893b7f.js.map