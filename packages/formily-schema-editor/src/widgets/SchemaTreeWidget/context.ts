import { createActions } from 'react-eva';

export const nodeRendererActions = createActions(
  'getSelectRow',
  'updateCursorPosition',
  'setActiveNode',
  "getActiveNodePath",
  'setChildrenVisible',
  "getChildrenVisible",
);