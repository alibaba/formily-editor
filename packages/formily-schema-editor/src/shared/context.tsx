import { createContext } from "react";
import { ISchemaEditor } from "../types";

export const EditorContext = createContext<ISchemaEditor>(null);
