import { Node, Connection } from "../types/indexs";

/**
 * Parses text input and converts it to mind map nodes and connections
 * @param text The input text to parse
 * @returns An object containing nodes and connections
 */
export function parseTextToMindMap(text: string): { nodes: Node[]; connections: Connection[] } {
  if (!text.trim()) {
    return { nodes: [], connections: [] };
  }

  const lines = text.split('\n').filter(line => line.trim());
  const nodes: Node[] = [];
  const connections: Connection[] = [];
  
  // Generate a root node from the first line
  const rootId = crypto.randomUUID();
  const rootText = lines[0].trim();
  
  nodes.push({
    id: rootId,
    text: rootText,
    parentId: null,
    level: 0,
    x: 0,
    y: 0
  });
  
  // Process the rest of the lines as children
  const stack: { id: string; level: number }[] = [{ id: rootId, level: 0 }];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    // Calculate indentation level
    const leadingSpaces = line.search(/\S|$/);
    const indentationLevel = Math.floor(leadingSpaces / 2) + 1;
    const text = line.trim();
    
    if (!text) continue;
    
    // Create new node
    const nodeId = crypto.randomUUID();
    
    // Find the appropriate parent by checking the indentation level
    while (stack.length > 0 && stack[stack.length - 1].level >= indentationLevel) {
      stack.pop();
    }
    
    const parentId = stack.length > 0 ? stack[stack.length - 1].id : rootId;
    
    // Add node
    nodes.push({
      id: nodeId,
      text,
      parentId,
      level: indentationLevel,
      // Initial positions will be calculated by the layout algorithm
      x: 0,
      y: 0
    });
    
    // Add connection
    connections.push({
      source: parentId,
      target: nodeId
    });
    
    // Push current node to stack
    stack.push({ id: nodeId, level: indentationLevel });
  }
  
  // Assign colors based on level
  const colors = ['#3B82F6', '#8B5CF6', '#14B8A6', '#F97316', '#EF4444', '#EC4899'];
  nodes.forEach(node => {
    const colorIndex = node.level % colors.length;
    node.color = colors[colorIndex];
  });

  return { nodes, connections };
}

/**
 * Applies a simple force-directed layout to the mind map nodes
 * @param nodes The nodes to position
 * @param connections The connections between nodes
 * @returns Positioned nodes
 */
export function calculateLayout(
  nodes: Node[],
  connections: Connection[]
): Node[] {
  if (nodes.length === 0) return [];
  
  const nodeCopy = [...nodes];
  const rootNode = nodeCopy.find(node => node.parentId === null);
  
  if (!rootNode) return nodeCopy;
  
  // Position root node at center
  rootNode.x = 0;
  rootNode.y = 0;
  
  // Create a map for quick access to nodes
  const nodeMap = new Map<string, Node>();
  nodeCopy.forEach(node => nodeMap.set(node.id, node));
  
  // Create a map of children for each node
  const childrenMap = new Map<string, string[]>();
  connections.forEach(connection => {
    if (!childrenMap.has(connection.source)) {
      childrenMap.set(connection.source, []);
    }
    childrenMap.get(connection.source)?.push(connection.target);
  });
  
  // Perform a breadth-first traversal to position nodes
  const queue = [rootNode.id];
  const visited = new Set<string>();
  visited.add(rootNode.id);
  
  const levelMap = new Map<number, Node[]>();
  levelMap.set(0, [rootNode]);
  
  // BFS to assign levels
  while (queue.length > 0) {
    const currentId = queue.shift()!;
    const currentNode = nodeMap.get(currentId)!;
    const children = childrenMap.get(currentId) || [];
    
    // Arrange children
    children.forEach((childId, index) => {
      if (visited.has(childId)) return;
      
      const childNode = nodeMap.get(childId);
      if (!childNode) return;
      
      visited.add(childId);
      queue.push(childId);
      
      const level = currentNode.level + 1;
      if (!levelMap.has(level)) {
        levelMap.set(level, []);
      }
      levelMap.get(level)?.push(childNode);
    });
  }
  
  // Position nodes based on their level
  const horizontalSpacing = 220;
  const verticalSpacing = 120;
  
  // Sort levels
  const sortedLevels = Array.from(levelMap.keys()).sort((a, b) => a - b);
  
  sortedLevels.forEach(level => {
    const nodesAtLevel = levelMap.get(level) || [];
    const levelWidth = nodesAtLevel.length * horizontalSpacing;
    
    nodesAtLevel.forEach((node, index) => {
      // Position based on level and index
      if (level === 0) {
        // Root node already positioned at center
      } else {
        // Position children in a semi-circle around their parent
        const parent = nodeMap.get(node.parentId || '')!;
        if (parent) {
          const parentChildren = childrenMap.get(parent.id) || [];
          const angle = (index - (parentChildren.length - 1) / 2) * 0.5 + Math.PI / 2;
          const radius = level * horizontalSpacing;
          
          node.x = parent.x + radius * Math.cos(angle);
          node.y = parent.y + radius * Math.sin(angle);
        }
      }
    });
  });
  
  return nodeCopy;
}