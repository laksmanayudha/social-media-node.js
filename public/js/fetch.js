// craete post
$(document).ready(function(){

    $("#createPostButton").on("click", async function(e){
        let imageData = $("#createImageData").prop("files")[0]
        let caption = $("#caption").val()

        console.log(imageData)

        let formData = new FormData();
        formData.append("caption", caption)
        formData.append("imageData", imageData)

        let config = {
            method: 'post',
            body: JSON.stringify({
                caption: caption,
                
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let dataFinal = await fetch('/post/create', config)
    })

})