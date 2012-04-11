var throwDOMException = require("../utils/throwDOMException.js"),
	_multimediaElement = ['AUDIO', 'EMBED', 'IFRAME', 'IMG', 'SOURCE', 'TRACK', 'VIDEO'],
	_linkElement = ["A","AREA","LINK"];

Object.defineProperty(window.Element.prototype, "itemValue", {
	"get" : function() {
		var element = this,
			elementName = element.nodeName;

		return element.getAttribute("itemscope") !== null ? element :
			element.getAttribute("itemprop") === null ? null :
			
			elementName === "META" ? element.content :
			~_multimediaElement.indexOf(elementName) ? element.src :
			~_linkElement.indexOf(elementName) ? element.href :
			elementName === "OBJECT" ? element.data :
			elementName === "TIME" && element.getAttribute("datetime") ? element.dateTime :
			"textContent" in element ? element.textContent :
				element.innerText;
	},
	"set" : function(value) {
		var element = this,
			elementName = element.nodeName;

		if(element.getAttribute("itemprop") === null) {
			throwDOMException("INVALID_ACCESS_ERR");
		}

		return element[
			elementName === 'META' ? "content" :
			~_multimediaElement.indexOf(elementName) ? "src" :
			~_linkElement.indexOf(elementName) ? "href" :
			elementName === 'OBJECT' ? "data" :
			elementName === 'TIME' && element.getAttribute('datetime') ? "dateTime" :
			"innerHTML"] = value;
	}
});