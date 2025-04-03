import { Node } from './node'

class Tree{
    constructor(arr){
        this.tree = [...new Set(arr.sort(function(a,b){
            return a-b;
        }))];
        this.root = this.buildTree(this.tree);
    }

    buildTree(arr){    
        if(arr.length == 0){
            return null
        }
        let mid = Math.ceil((arr.length-1)/2);
        let root = new Node(arr[mid]);

        root.left = this.buildTree(arr.slice(0,mid));
        root.right = this.buildTree(arr.slice(mid+1,arr.length));
        
        return root;
    }

    insert(value){
        let currNode = this.root;
        let prevNode;
        let position;

        while(currNode !== null){
            prevNode = currNode;
            if(value < currNode.value){
                currNode = currNode.left;
                position = "left";
            }else{
                currNode = currNode.right;
                position = "right";
            }
        }

        prevNode[position] = new Node(value);
    }

    deleteItem(value){
        let currNode = this.root;
        let prevNode;
        let position;

        //traverse in the tree until the node with the right value is found
        while(currNode.value !== value){
            prevNode = currNode
            if(value < currNode.value){
                currNode = currNode.left;
                position = "left";
            }else{
                currNode = currNode.right;
                position = "right";
            }
        }

        let childCount = 0;
        let childpos;

        if(currNode.left !== null){childpos = "left"; childCount++};
        if(currNode.right !== null){childpos = "right"; childCount++};

        //modify the tree depending on how many child the nodes have
        if(childCount == 0){
            prevNode[position] = null;
        }else if(childCount == 1){
            prevNode[position] = currNode[childpos];
        }else{
            let successor = currNode.right;
            let prevSuccessor;
            while(successor.left != null){
                prevSuccessor = successor;
                successor = successor.left;
            }
            prevSuccessor.left = null;
            currNode.value = successor.value;
        }
        
    }

    //get the node that contains the current value
    find(value){
        let currNode = this.root;
        while(currNode.value !== value){
            if(value < currNode.value){
                currNode = currNode.left;
            }else{
                currNode = currNode.right;
            }
            if(currNode == null){return "No node with given value"}
        }
        return currNode;
    }

    //traverse to each node calling the callback function for each traversal in breadth-first level order
    levelOrder(callback){
        let currNode = this.root;
        let queue = [currNode];
        try{
            while(queue.length !== 0){
                callback(currNode);
                if(currNode.left !== null){queue.push(currNode.left)}
                if(currNode.right !== null){queue.push(currNode.right)}
                queue.shift();
                currNode = queue[0];
            }
        }catch(e){
            throw new Error("Callback is required");
        }
    }

    preOrder(callback,node=this.root){
        if(node == null){return}
        callback(node);
        let leftNode = this.preOrder(callback,node.left);
        let rightNode = this.preOrder(callback,node.right);        
    }

    inOrder(callback,node=this.root){
        if(node == null){return}
        let leftNode = this.inOrder(callback,node.left);
        callback(node);
        let rightNode = this.inOrder(callback,node.right);
    }

    postOrder(callback,node=this.root){
        if(node == null){return}
        let leftNode = this.postOrder(callback,node.left);
        let rightNode = this.postOrder(callback,node.right);
        callback(node);
    }

    height(node){
        if(node == null){return -1}
        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        return 1+ Math.max(leftHeight,rightHeight);
    }

    depth(node,currNode = this.root){
        if(currNode.value == node.value){return 0}
        if(node.value < currNode.value){
            return this.depth(node,currNode.left)+1
        }else{
            return this.depth(node,currNode.right)+1
        }
    }

    isBalanced(){
        let leftSubTree = this.height(this.root.left);
        let rightSubTree = this.height(this.root.right);
        if(Math.max(leftSubTree,rightSubTree) - Math.min(leftSubTree,rightSubTree) < 2){
            return true
        }
        return false
    }

    rebalance(){
        let arr = [];
        this.inOrder(node => arr.push(node.value));
        arr = [... new Set(arr)];
        this.root = this.buildTree(arr);
    }

    prettyPrint(node, prefix = "", isLeft = true){
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    debug(){
        this.prettyPrint(this.root);
        console.log("root: " + this.root.value);
    }
}

export {Tree}