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
        $("#createPostButton").prop("disabled", true)

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

    $("#createPostButton").on("click", async function(){
        let imageData = $("#imageDataCover").attr("src").split('/')
        imageData = imageData[imageData.length-1]

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
                    $("#createPostButton").removeAttr("disabled")
                }else{
                    // set value to input if not image uploaded
                    $("#createImageData").val('')
                }
            },
         });
    })

    // love love love
    $(".action-love .fa-heart").on("click", function(){
        if( $(this).hasClass("far")){
            $(this).attr("class", "fa-lg ms-3 fas fa-heart text-danger")
        }else{
            $(this).attr("class", "fa-lg ms-3 far fa-heart text-black")
        }
    })

    // view and delete option
    $(".more-container i").on("click", function(e){
        let options = $(this).next()
        options.toggleClass("hide")
        options.toggleClass("unhide")

        // $('body').css({
        //     overflow: 'hidden',
        // });
        
    })

    $("#userIcon i").on("click", function(){
        let profileSetting = $(".profile-setting")
        profileSetting.toggleClass("hide")
        profileSetting.toggleClass("unhide")

    })

    // $("#search").on("blur", function(){
    //     let searchResult = $(".search-result")
    //     searchResult.removeClass("unhide")
    //     searchResult.addClass("hide")
    // })

    // live search
    $("#search").on("input", async function(){
        let input =  $("#search").val()
        let userResult = $(".user-search-profile")
        let searchResult = $(".search-result")

        if ( input != ""){

    
            let userData = await fetch("/api/user/search", {
                method: "post",
                body: JSON.stringify({
                    input: input
                }),
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":getCookie("token")
                }
            })
            userData = await userData.json()
            console.log(userData)
    
            // append elemnt
            if(userData.results.length != 0){
                searchResult.removeClass("hide")
                searchResult.addClass("unhide")
                let content = ``
                for(let user of userData.results){
                    content += `
                                <a class="text-decoration-none text-black " href="/profile">
                                    <div class="username-container d-flex align-items-center">
                                        <img src="/img/user.png" alt="">
                                        <div class="ms-3"><strong>${user.username}</strong></div>
                                    </div>
                                </a>
                            `
                }
        
                userResult.html(content)
            }else{
                userResult.html("")
                searchResult.addClass("hide")
                searchResult.removeClass("unhide")
            }
        }else{
            userResult.html("")
            searchResult.addClass("hide")
            searchResult.removeClass("unhide")
        }
       
    })
})