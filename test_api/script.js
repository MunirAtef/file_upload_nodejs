
const baseUrl = 'localhost:3000';

function getAllUsers() {
    let request = new XMLHttpRequest();
    request.open('POST', `${baseUrl}/auth/users`);
    request.send();
    request.responseType = 'json'
    request.onload = () => {
        console.log(request.status);
        console.log(request.responseText);
    }
}


let js = {
    name: "munir",
    email: "munir@gmail.com",
    age: 20,
    phones: ["0", "1", "2"],
    address: {
        governorate: "memoufia",
        city: "tala"
    }
}

let sqj = {
    name: ["munir", "mohamed"],
    email: ["munir@gmail.com", "mohamed@gmail.com"],
    age: [20, 30],
    phones: [["0", "1", "2"], ["3", "4", "5"]],
    "address.governorate": [],
    "address.city": [],
}
