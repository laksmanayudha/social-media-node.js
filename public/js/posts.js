$(document).ready(function(){
    
    // $("#createPostForm").hide(0)

    $("#createPost").on("click", function(){
        $("#createPostForm").removeAttr("hidden")
        $("#createPostForm").hide()
        $("#createPostForm").fadeIn(500)
    })

    $("#closeButton").on("click",  async function(){

        let imageData = $("#imageDataCover").attr("src").split('/')
        imageData = imageData[imageData.length-1]

        $("#createPostForm").fadeOut(500)
        $("#createImageData").val('')
        $("#createImageData").removeAttr("hidden")
        $("#imageDataCover").attr("hidden", true).attr("src", " ")

        // delete uploaded file
        console.log(imageData)
        let config = {
            method: "post",
            body: JSON.stringify({
                imageName: imageData
            }),
            headers: {
                "Content-Type":"application/json"
            }
        }
        await fetch("/api/images/delete", config);
    })

    $("#createImageData").on("change", async function(){
        // move data
        // let imageData = $("#createImageData").prop('files')[0]
        // let formData = new FormData()
        // formData.append("imageData", imageData)
        // let config = {
        //     method: "post",
        //     body: formData
        // }
        // let dataFinal = await fetch("/api/images", config);
        // console.log(dataFinal)

        // move data
        let imageData = $("#createImageData").prop('files')[0]
        let formData = new FormData()
        formData.append("imageData", imageData)
        $.ajax({
            url: '/api/images',
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response){
                if (response.valid){
                    $("#createImageData").attr("hidden", true)
                    $("#imageDataCover").removeAttr("hidden").attr("src", response.temp)
                }else{
                    $("#createImageData").val('')
                }
            },
         });
    })

})