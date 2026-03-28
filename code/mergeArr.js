// Gộp 2 mảng
// Ví dụ: input [1, 2, 3], [4, 5] => output [1, 2, 3, 4, 5]

function mergeArr (arr1, arr2){
	const arr = [...arr1, ...arr2]
	return arr
}

console.log(mergeArr([1, 2, 3], [4, 5]))
console.log(mergeArr([10, 20], [30, 40, 50]))