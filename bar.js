export default function bar() {
  var btn = document.createElement("Button");
  var t = document.createTextNode("Click me!");
  btn.appendChild(t);
  document.body.appendChild(btn);
}