import "./App.css";
import React, {useState, useEffect} from "react";
import {ReactComponent as AddIcon} from "./plus.svg";
import {ReactComponent as DarkIcon} from "./dark.svg";
import {ReactComponent as LightIcon} from "./bright.svg";

export default function App() {
 const [darkMode, applyDark] = useState(false);
 const [msg, toggleMsg] = useState(false);
 const [notes, notesList] = useState([{id: 123, text: ""}]);

 const Navbar = (props) => <header>{props.children}</header>;

 const toggleDMode = (x) => {
  applyDark(!x);
  var root = document.querySelector(":root");
  if (x) {
   root.style.setProperty("--nav", "#fff");
   root.style.setProperty("--txt", "#000");
   root.style.setProperty("--btn", "#d2d2d2");
   root.style.setProperty("--shadow", "#a9a9a9");
  } else {
   root.style.setProperty("--nav", "#202020");
   root.style.setProperty("--txt", "#fff");
   root.style.setProperty("--btn", "#4e4e4e");
   root.style.setProperty("--shadow", "#363636");
  }
 };

 useEffect(() => {
  notes.length === 0 ? toggleMsg(true) : toggleMsg(false);
 }, [notes]);

 return (
  <div className="App">
   <Navbar>
    <h3>Notes App</h3>
    <div>
     <AddIcon
      onClick={() => {
       notesList([...notes, {id: Date.now(), text: ""}]);
      }}
     />
     {darkMode ? (
      <LightIcon
       onClick={() => {
        toggleDMode(true);
       }}
      />
     ) : (
      <DarkIcon
       onClick={() => {
        toggleDMode(false);
       }}
      />
     )}
    </div>
   </Navbar>

   <div className="list">
    {notes.map((item) => (
     <div className="note" key={item.id}>
      <div className="titlebar">
       <div
        className="close"
        onClick={(e) => {
         notesList(notes.filter((notes) => notes.id !== item.id));
        }}
       >
        -
       </div>
      </div>
      {/* Height-Responsive textarea  */}
      <textarea
       placeholder="Type here.."
       defaultValue={item.text}
       onInput={(e) => {
        e.target.style.height = "205px";
        e.target.style.height = e.target.scrollHeight + "px";
       }}
      ></textarea>
     </div>
    ))}
   </div>
   {msg ? <span id="msg">Click '+' to Add a new Note</span> : null}
  </div>
 );
}
