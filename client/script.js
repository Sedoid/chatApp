let userName,
    form = document.querySelector("#message");

console.log(Object.keys(localStorage));
if (localStorage.getItem("userName")) {
    userName = localStorage.getItem("userName");

    document.querySelector("#name").value = userName;
} else {
    console.log("found nothing like username in the storage");
    userName = "";
}

let socket = io();

$("form").on("submit", function (e) {
    e.preventDefault();
    userName = $("#name").val();
    localStorage.setItem("userName", userName);

    let text = $("#message").val();
    if (text != "") {
        text = {
            senderName: userName,
            message: text
        };

        socket.emit("message", text);
    }

    return false;
});

socket.on("message", data => {
    console.log(data);

    let chat = document.createElement("li");

    document.getElementsByTagName(
        "span"
    )[0].innerHTML = `Nobody is typing yet...`;

    chat.innerHTML = `<div> <span> ${data.senderName} </span> <br /> <br />  ${data.message} </div>`;
    let pattern = new RegExp(data.senderName);
    userName = localStorage.getItem("userName");

    if (userName == data.senderName) {
        chat.classList.add("me");
        console.log("Message is being sent by thesame user");
        console.log(data.senderName + " match " + localStorage.getItem("userName"));
        chat.style.justifyContent = "flex-end";
    } else {
        chat.classList.add("others");
        console.log("Message is being sent by a difference user");
    }
    document.querySelector("#history").appendChild(chat);
});

form.addEventListener("input", () => {
    console.log(`${userName} is typing...`);
    socket.emit("typing", `${userName} is typing...`);

    if (!form.value) socket.emit("typing", false);
});
socket.on("s_typing", data => {
    //let type =
    if (data) document.getElementsByTagName("span")[0].innerHTML = `${data}`;
    else
        document.getElementsByTagName(
            "span"
        )[0].innerHTML = `Nobody is typing yet...`;

    console.log("just recieved a typing event from the server");
    console.log(data);
});