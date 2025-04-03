import { Tree } from "./bst";

function callback(node){
    console.log(node);
}


let arr = [];

for (let index = 0; index < 50; index++) {
    arr.push(Math.floor(Math.random() * 101));
}

let tree = new Tree(arr);
console.log(tree.isBalanced());
console.log("Level Order:");
tree.levelOrder(callback);
console.log("Pre Order:");
tree.preOrder(callback);
console.log("Post Order:");
tree.postOrder(callback);
console.log("In Order:");
tree.inOrder(callback);
tree.insert(105);
tree.insert(110);
tree.insert(130);
tree.insert(140);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
tree.debug();