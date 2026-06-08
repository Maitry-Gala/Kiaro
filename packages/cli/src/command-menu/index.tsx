import { useRef, type RefObject } from "react";
import { COMMANDS } from "./commands";
import type { ScrollBarRenderable } from "@opentui/core";
import { getFilteredCommands } from "./filter-commands";

const MAX_VISIBLE_ITEMS = 8;
const COMMAND_COL_WIDTH = Math.max(...COMMANDS.map((cmd) => cmd.name.length)) + 4;

type CommandMenuProps = {
    query: string;
    selectedIndex: number;
    scrollRef: RefObject<ScrollBarRenderable | null>;
    onSelect: (index: number) => void; 
    onExecute: (index: number) => void; 
};

export function CommandMenu({
    query,selectedIndex,scrollRef,onSelect,onExecute
}: CommandMenuProps){
    const filtered = getFilteredCommands(query);
};

