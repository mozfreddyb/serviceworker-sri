/* Implementation of a script tag that honors sub-resource integrity.
 * Usage: <script is="sri-script">
 * reading material: https://w3c.github.io/webcomponents/explainer/#custom-element-section
 **/

var ScriptProto = Object.create(HTMLScriptElement.prototype);
ScriptProto.createdCallback = function() {
  // check src and remove (or not)
  // e.g. use this._root = this.createShadowRoot();
  console.log("SRI-Script created:", this);
  this.parentElement.removeChild(this);
};
ScriptProto.attributeChangedCallback= function() {
  console.log("SRI-Script attribute changed:", this)

};
ScriptProto.attachedCallback = function() {
  console.log("SRI-Script attached:", this);
}; // no need to do something when attached to the dom (?)

var SRI_Script = document.registerElement('sri-script',
  {
    extends: 'script',
    prototype: ScriptProto
  }
);

