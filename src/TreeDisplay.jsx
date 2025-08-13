import { useEffect, useState } from "react";

function layout(root, x = 0, y = 0, Pspacing = 300, Cspacing = 150, result = [], depth = 0) {
    if (root === null) return;

    // for restricting to only up to depth of 4
    if(depth > 4) return;

    // left subtree and half space each level
    layout(root.left, x - Pspacing, y + 100, Cspacing, Cspacing/2, result, depth + 1);

    // Add current with position
    result.push({
        node: root,
        data: root.data,
        x: x,
        y: y,
    });

    // Traverse right and half space each level
    layout(root.right, x + Pspacing, y + 100, Cspacing, Cspacing/2, result, depth + 1);

    return result;
}


function TreeDisplay({ root }) {

    // fixing the resizing of the window to rerender
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    // resize events and updates
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);




    // get current size of window
    const width = windowSize.width;
    const height = windowSize.height;
    // center root
    const centerX = width / 2;

    // layout of nodes
    const nodes = layout(root, centerX, 50) || [];

    // Build lines between parent and children
    const edges = [];
    for (let node of nodes) {
        if (node.node.left) {
            const child = nodes.find(n => n.node === node.node.left);
            if (child) {
                edges.push({ x1: node.x, y1: node.y, x2: child.x, y2: child.y });
            }
        }
        if (node.node.right) {
            const child = nodes.find(n => n.node === node.node.right);
            if (child) {
                edges.push({ x1: node.x, y1: node.y, x2: child.x, y2: child.y });
            }
        }
    }

    return (
        <div className="treeContainer">
            <svg width={width} height={height}>
                {/* Draw edges */}
                {edges.map((edge, idx) => (
                    <line
                        key={idx}
                        x1={edge.x1}
                        y1={edge.y1}
                        x2={edge.x2}
                        y2={edge.y2}
                        stroke="black"
                    />
                ))}

                {/* Draw nodes */}
                {nodes.map((node, idx) => (
                    <g key={idx} className="tree-node">
                        <circle cx={node.x} cy={node.y} r="25" />
                        <text x={node.x} y={node.y + 5} textAnchor="middle">

                            {node.data}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
}


export default TreeDisplay;