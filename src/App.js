import logo from './logo.svg';
import { BoldExtension } from 'remirror/extension/bold';
import { CorePreset } from 'remirror/preset/core';
import { CodeBlockExtension } from "remirror/extension/code-block";
import { RemirrorProvider, useManager, useRemirror } from 'remirror/react';

import { useState, useRef } from "react";
import { fromHtml, toHtml } from "remirror/core";

import './App.css';

const Menu = () => {
  const { commands, active } = useRemirror({ autoUpdate: true });

  return (
    <div>
      <button
        onClick={() => commands.toggleBold()}
        style={{ fontWeight: active.bold() ? 'bold' : undefined }}
      >
        B
      </button>
      <button
        onClick={() => commands.toggleCodeBlock()}
        style={{ fontWeight: active.codeBlock() ? 'bold' : undefined }}
      >
        CodeBlock
      </button>
    </div>
  );
};

const TextEditor = () => {
  const { getRootProps } = useRemirror();

  return <div id="editor" {...getRootProps()} />;
};

const EditorWrapper = () => {
  const manager = useManager([
    new CorePreset({}),
    new BoldExtension({}),
    new CodeBlockExtension({}),
  ]);

  const [state, setState]=useState(
    manager.createState({
      content: "<p></p>",
      stringHandler: fromHtml,
    })
  )

  return (
    <RemirrorProvider
      manager={manager}
      // value={state}
      // onChange={(parameter) => {
      //   setState(parameter.state);
      // }}
    >
      <div>
        <Menu />
        <TextEditor />
      </div>
    </RemirrorProvider>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="editor-wrapper">
          <EditorWrapper/>
        </div>
      </header>
    </div>
  );
}

export default App;
