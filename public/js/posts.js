$(document).ready(function(){
    
    $("#createPostForm").hide()

    $("#createPost").on("click", function(){
        $("#createPostForm").fadeIn(500)
    })

    $("#closeButton").on("click", function(){
        $("#createPostForm").fadeOut(500)
    })

})