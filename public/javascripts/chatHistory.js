// 聊天历史




// window.localStorage.clear();

// let chatContent = {user:"你好", ChatGPT:"你好！"}
// let arr = []

// arr.push(JSON.stringify(chatContent))
// arr.push(JSON.stringify(chatContent))

// window.localStorage.setItem("chatHistory", arr)

// window.localStorage.getItem("chatHistory") => String
// window.localStorage.getItem("chatHistory").replace("},", "};").split(';')


if (window.localStorage.getItem("chatHistory")) {
    const userPatter = 'user'
    const chatHistory_str = window.localStorage.getItem("chatHistory")
    // console.log(chatHistory_str.match(userPatter)["input"], "pip")

    //let chatHis = chatHistory_str.match(userPatter)["input"]

    let chatHis = window.localStorage.getItem("chatHistory").replace(/},/g, "};").split(';');
    let chatHistory = []

    chatHis.forEach((element, index) => {
        let chats = element.replace("},", "};").split(';')
        chats.forEach((element, index) => {
            chatHistory.push(element)
        })
    })

    console.log(chatHistory)
    chatHistory.forEach((element, index) => {

        console.log()
        let chat = JSON.parse(`${element}`);
        // console.log(JSON.parse(element))
        for (key in chat) {
            // console.log(key, chat[key])

            if (key == "user") {
                let chatBox = `
                    <div class="user container">
                        <div>
                            <p>${chat[key]}</p>
                        </div>
                        <div class="user_Avatar"></div>
                    
                    </div>
                        `
                $("div#chatView").append(chatBox);
            } else {
                let chatBox = `
                <div class="ChatGPT container">
                    <div></div>
                    <div>
                        <p>${chat[key]}</p>
                    </div>
                </div>
                `
                $("div#chatView").append(chatBox);
            }


        }


    })
}

let chatViewHeight = 0
$("#chatView div.container").each((index, ele) => {
    chatViewHeight += ele.offsetHeight
})
if (chatViewHeight - $("div#chatView").innerHeight() > -20) {
    var a = chatViewHeight - $("div#chatView").innerHeight()
    $('#chatView').animate({ scrollTop: a * 10 }, 1000)
}







