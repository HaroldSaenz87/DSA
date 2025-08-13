import { useState } from 'react'
import './Styles/input.css'
import TreeDisplay from './TreeDisplay';


class TreeNode
{
    constructor(data)
    {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

function Insertion(root, data)
{
    const value = Number(data);

    if(isNaN(value))
    {
        alert("Please input a valid number");
        return root;
    }

    if(root === null)
    {
        return new TreeNode(value);
    }

    else if(value < root.data)
    {
        root.left = Insertion(root.left, value);
    }
    else if(value > root.data)
    {
        root.right = Insertion(root.right, value);
    }
    // for duplicates
    else
    {
        root.right = Insertion(root.right, value);
    }

    return root;
}

function findMin(node)
{
    while(node.left !== null)
    {
        node = node.left;
    }
    return node;
}

function Deletion(root, data)
{
    const value = Number(data);

    if(isNaN(value))
    {
        alert("Please input a valid number");
        return root;
    }

    if(root === null)
    {
        return null;
    }
    
    if(data < root.data)
    {
        root.left = Deletion(root.left, data);
    }
    else if(data > root.data)
    {
        root.right = Deletion(root.right, data);
    }
    else
    {
        // no child
        if(root.left === null && root.right === null)
        {
            return null;
        }
        // one child
        else if(root.left === null)
        {
            return root.right;
        }
        else if(root.right === null)
        {
            return root.left;
        }
        // two child
        else
        {
            let minRight = findMin(root.right);
            root.data = minRight.data;
            root.right = Deletion(root.right, minRight.data);
        }
    }

    return root;

}



function Inputs()
{
    const [inputVal,setVal] = useState('');
    const [delVal, SetDelVal] = useState('');
    const [treeRoot, setRoot] = useState(null);

    const AddString = () => 
    {
        if(inputVal.trim() === '')
        {
            alert("Please enter a number!");
            return;
        }

        // bst insert

        const newRoot = Insertion(treeRoot, inputVal);
        setRoot(newRoot);
        setVal('');

    };

    const DelString = () =>
    {
        if(delVal.trim() === '')
        {
            alert("Please enter a number to delete!");
            return;
        }

        const newRoot = Deletion(treeRoot, delVal);
        setRoot(newRoot);
        SetDelVal('');

    };

    return(
        <>
            <div className='TopContain'>

                <h2 className='title'>Binary Search Tree</h2>

                
                <div className="insert-del">

                    {/* Add string */}
                    <div className="contents">
                        <input type="text" className="stringName" placeholder="Enter a number..." value={inputVal} onChange={(e) => setVal(e.target.value)} />
                        <button className="btn-Add" onClick={AddString}>Insert</button>
                    </div>

                    {/* Delete string */}
                    <div className="content2">
                        <input type="text" className="stringName2" placeholder="Delete a number..." value={delVal} onChange={(e) => SetDelVal(e.target.value)} />
                        <button className="btn-Del" onClick={DelString}>Delete</button>
                    </div>
                </div>
            </div>
            <TreeDisplay root={treeRoot} />
        </>
    )

}

export default Inputs