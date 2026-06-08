import type { KeyBinding } from "@opentui/core";
import { StatusBar } from "./status-bar";

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
  return (
    <box width="100%" alignItems="center">
      <box
        border={["left"]} borderColor="cyan" width="100%"
      >
        <box
          position ="relative"
          justifyContent="center"
          paddingX={2}
          paddingY={1}
          backgroundColor="#1A1A24"
          width="100%"
          gap={1}
        >
          <textarea
            focused={!disabled}
            placeholder={`Ask anything... "Fix a bug in the database"`}
            keyBindings={TEXTAREA_KEY_BINDINGS}
            width="100%"
          />
          <StatusBar />
        </box>
      </box>
    </box>
  );
}
