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
        let mid = Math.floor((arr.length-1)/2);
        let root = new Node(arr[mid]);

        root.left = this.buildTree(arr.slice(0,mid));
        root.right = this.buildTree(arr.slice(mid+1,arr.length));

        console.log(root);
        
        return root;
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
        console.log(`Tree: ${this.tree}`);
        this.prettyPrint(this.root);
    }
}

export {Tree}