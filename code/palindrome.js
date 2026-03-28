
// Kiểm tra xem một chuỗi có phải là palindrome hay không.
// Một chuỗi được gọi là palindrome nếu nó đọc ngược lại vẫn giống như ban đầu. 
// Ví dụ: "madam" là một palindrome, trong khi "hello" không phải là một palindrome.
// input m a d a m
// output true
// input h e l l o
// output false


function isPalindrome(str){
    let reversed = "";
    for(let i = str.length -1; i>=0; i--){
        reversed = reversed + str[i];
    }
    return str === reversed;
}

console.log(isPalindrome('madam'));
console.log(isPalindrome('hello'));