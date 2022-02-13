// craete post
$(document).ready(function(){

    $("#deletePost").on("click", async function(e){
        console.log($("#postId").val())
        await fetch("/post/delete/" + $("#postId").val(), {
            method: "delete"
        })
    })

})