// Đảo ngược chuỗi, ví dụ: "Hello World" => "dlroW olleH"
// input 1 2 3 4 5
// output 5 4 3 2 1


function reverseString(str){
    let reversed = '';
    for(let i = str.length - 1; i >= 0; i--){
        reversed = reversed + str[i];
    }
    return reversed;
}

console.log(reverseString('1 2 3 4 5'))