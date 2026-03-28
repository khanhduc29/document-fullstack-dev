// Đếm số lần xuất hiện của một phần tử trong một mảng.
// Ví dụ: input [1, 2, 3, 2, 4], 2 => output 2
// input [1, 2, 3, 4, 5], 6 => output 0

function countOccurence(arr, number){
	let count = 0;
	for(let i = 0; i < arr.length; i++){
		if(number == arr[i]) count = count + 1
	}
	return count
}

console.log(countOccurence([1, 2, 3, 2, 4], 2))
console.log(countOccurence([1, 2, 3, 4, 5], 6))