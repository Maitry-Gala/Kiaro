import type { KeyBinding } from "@opentui/core";
import { type TextareaRenderable } from "@opentui/core";
import { StatusBar } from "./status-bar";
import { CommandMenu } from "../command-menu";
import { useCommandMenu } from "../command-menu/command-menu";
import { useRef } from "react";

type Props = {
  onSubmit: (text: string) => void;
  disabled?: boolean;
};

export const TEXTAREA_KEY_BINDINGS: KeyBinding[] = [
    {name: "return", action: "submit"},
    {name: "enter", action: "submit"},
    {name: "return",shift: true, action: "newline"},
    {name: "enter", shift: true,action: "newline"},
    {name: "a", ctrl: true,action:"select-all"}
];
export function InputBar({ onSubmit, disabled = false }: Props) {
  const textareaRef = useRef<TextareaRenderable>(null);

  const {
    showCommandMenu,
    commandQuery,
    selectedIndex,
    scrollRef,
    handleContentChange,
    resolveCommand,
    setSelectedIndex,
  } = useCommandMenu();

  return (
    <box width="100%" flexDirection="column">
      {showCommandMenu && (
        <CommandMenu
          query={commandQuery}
          selectedIndex={selectedIndex}
          scrollRef={scrollRef}
          onSelect={(i) => setSelectedIndex(i)}
          onExecute={(i) => resolveCommand(i)}
        />
      )}
      <box border={["left"]} borderColor="cyan" width="100%">
        <box
          justifyContent="center"
          paddingX={2}
          paddingY={1}
          backgroundColor="#1A1A24"
          width="100%"
          gap={1}
          flexDirection="column"
        >
          <textarea
            ref={textareaRef}
            focused={!disabled}
            placeholder={`Ask anything... "Fix a bug in the database"`}
            keyBindings={TEXTAREA_KEY_BINDINGS}
            width="100%"
            onContentChange={() => handleContentChange(textareaRef.current?.plainText ?? "")}
          />
          <StatusBar />
        </box>
      </box>
    </box>
  );
}