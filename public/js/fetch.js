// signUp
$(document).ready(function(){

    $("#buttonSignUp").on("click", function(){

        let req = {
            method: "POST",
            body: JSON.stringify({
                username: $("input[name=username]").val(),
                email: $("input[name=email]").val(),
                password: $("input[name=password]").val(),
                fullname: $("input[name=fullname]").val(),
                confirmPassword: $("input[name=confirmPassword]").val(),
            }),
    
            headers: {
                "Content-Type": "application/json"
            }
        }
    
        fetch("/user/create", req)
    })
})