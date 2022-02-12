function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return "Bearer " +  c.substring(nameEQ.length,c.length).split("Bearer%20")[1];
    }
    return null;
}

$(document).ready(function(){
    
    // show create posts
    // $("#createPostForm").hide(0)
    $("#createPost").on("click", function(){
        $("#createPostForm").removeAttr("hidden")
        $("#createPostForm").hide()
        $("#createPostForm").fadeIn(500)
    })

    // close create posts
    $("#closeButton").on("click",  async function(){

        let imageData = $("#imageDataCover").attr("src").split('/')
        imageData = imageData[imageData.length-1]

        $("#createPostForm").fadeOut(500)
        $("#createImageData").val('')
        $("#createImageData").removeAttr("hidden")
        $("#imageDataCover").attr("hidden", true).attr("src", " ")
        $("textarea").val('')

        // delete uploaded file
        // console.log(imageData)
        let config = {
            method: "post",
            body: JSON.stringify({
                imageName: imageData
            }),
            headers: {
                "Content-Type":"application/json",
                "Authorization":getCookie("token")
            }
        }
        await fetch("/api/images/delete", config);
    })

    //  show selected image when user upload image
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
        // console.log(getCookie("token"))

        // move data
        let imageData = $("#createImageData").prop('files')[0]
        let formData = new FormData()
        formData.append("imageData", imageData)
        $.ajax({
            url: '/api/images',
            type: 'post',
            headers:{'Authorization':getCookie("token")},
            data: formData,
            contentType: false,
            processData: false,
            success: function(response){
                // check if image
                if (response.valid){
                    // show image when selected
                    $("#createImageData").attr("hidden", true)
                    $("#imageDataCover").removeAttr("hidden").attr("src", response.temp)
                }else{
                    // set value to input if not image uploaded
                    $("#createImageData").val('')
                }
            },
         });
    })


})