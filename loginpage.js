

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    console.log('start')
    
    let storedUserList = localStorage.getItem('userName');
    
    // If there is no user list stored, return false
    if (!storedUserList) {
       alert('wrong password or user name')
    }

    // Parse the stored user list
    let userListGroup = JSON.parse(storedUserList);

    // Iterate through the user list to find a matching user
    for (let user of userListGroup) {
let Name = document.getElementById('userName').value; 
let pass = document.getElementById('form3Example4').value ; 
        console.log(user.userName) 
        console.log( user.password )
        console.log(Name) 
        console.log(pass)
        if (user.userName === userName || user.password === pass) {
            console.log('okay')
            location.assign("Home.html")    
             }
             else{
                alert('wrong password or user name')
             }  
    }

}
);

