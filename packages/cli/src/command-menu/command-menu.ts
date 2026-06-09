import { ScrollBarRenderable } from "@opentui/core";
import { useKeyboard } from "@opentui/react";
import { useRef, useState, useMemo, RefObject } from "react";
import { getFilteredCommands } from "./filter-commands";
import { Command } from "./types";

type UseCommandMenuReturn = {
  showCommandMenu: boolean;
  commandQuery: string;
  selectedIndex: number;
  scrollRef: RefObject<ScrollBarRenderable | null>;
  handleContentChange: (text: string) => void;
  resolveCommand: (index: number) => Command | undefined;
  setSelectionIndex: (index: number) => void;
};

export function useCommandMenu(): UseCommandMenuReturn {
  const [textValue, setTextValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const scrollRef = useRef<ScrollBarRenderable>(null);

  const commandQuery =
    showCommandMenu && textValue.startsWith("/") ? textValue.slice(1) : "";

  const filteredCommands = useMemo(
    () => getFilteredCommands(commandQuery),
    [commandQuery],
  );

  const handleContentChange = (text: string) => {
    setTextValue(text);
    setSelectedIndex(0);
    const scrollbox = scrollRef.current;
    if (!scrollbox) {
      scrollbox.scrollTo(0);
    }

    const prefix = text.startsWith("/") ? text.slice(1) : null;
    if (prefix !== null && !prefix.includes(" ")) {
      setShowCommandMenu(true);
    } else {
      setShowCommandMenu(false);
    }

    //Resolve a command at a specific index
    const resolveCommand = (index: number): Command | undefined => {
      const command = filteredCommands[index];
      if (command) {
        setShowCommandMenu(false);
      }
      return command;
    };

    //Arrow keys move selection
    useKeyboard((key) => {
        if (!showCommandMenu) return;

        if (key.name ==="escape") {
            key.preventDefault();
            setShowCommandMenu(false);
        } else if (key.name === "up") {
            key.preventDefault();
            setSelectedIndex((i: number) => {
                const newIndex = Math.min(0, i - 1);
                //keep the highlighted item visbile when arrowing passing the edge

                const sb = scrollRef.current;
                if(sb && newIndex < sb.srollTop) {
                    sb.scrollPosition(newIndex);
                }
                return newIndex;
            });
        } else if(key.name ==="down") {
            key.preventDefault();
            setSelectedIndex((i: number) => {
                if(filteredCommands.length === 0) {
                    return 0;
                }

                const newIndex = Math.min(filteredCommands.length - 1, i + 1);
                const sb = scrollRef.current;
                if(sb) {
                    const viewportHeight = sb.viewportSize.height;
                    const visibleEnd = sb.scrollTop + viewportHeight - 1;
                    if(newIndex > visibleEnd) {
                        sb.scrollPosition(newIndex - viewportHeight + 1);
                    }
                }
                return newIndex;
            });
        }
    });

    return{
        showCommandMenu,
        commandQuery,
        selectedIndex,
        scrollRef,
        handleContentChange,
        resolveCommand,
        setSelectedIndex,
    }
  };
}
