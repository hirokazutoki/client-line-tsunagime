import './index.css';
import liff from '@line/liff'

document.addEventListener("DOMContentLoaded", function () {
    liff
        .init({ liffId: process.env.LIFF_ID })
        .then(() => {
            console.log("Success! you can do something with LIFF API here.")

            document.getElementById('login').addEventListener("click", liff_login);
            document.getElementById('logout').addEventListener("click", liff_logout);
            document.getElementById('stp').addEventListener("click", liff_shareTargetPicler);
            document.getElementById('scan').addEventListener("click", liff_scan);

            document.getElementById('service_message').addEventListener("click", mini_serviceMessage);
            document.getElementById('custom_action').addEventListener("click", mini_customAction);

            if (liff.isLoggedIn()) {
                const idToken = liff.getDecodedIDToken();
                document.getElementById('profile_img').src = idToken.picture
                document.getElementById('profile_string').innerHTML = "こんにちは！" + idToken.name + "さん！"
            } else {
                document.getElementById('profile_string').innerHTML = "ログインされていません。"
            }
        })
        .catch((error) => {
            console.log(error)
        })
});


function liff_login() {
    liff.login()
}

function liff_logout() {
    liff.logout()
    location.reload()
}

function liff_shareTargetPicler() {
    if (liff.isLoggedIn()) {
        liff
            .shareTargetPicker(
                [
                    {
                        type: "text",
                        text: "Hello, World!",
                    },
                ]
            )
    } else {
        alert("shareTargetPickerの利用にはログインが必要です。")
    }
}

function liff_scan() {
    if (liff.isLoggedIn()) {
        liff
            .scanCodeV2()
            .then((result) => {
                alert(result.value)
            })
            .catch((error) => {
                console.log("error", error);
            });
    } else {
        alert("scanCodeV2の利用にはログインが必要です。")
    }
}

function mini_serviceMessage() {
    alert("現在Service Messageの利用には審査承認が必要です。")
}

function mini_customAction() {
    if (liff.isLoggedIn()) {
        liff
            .shareTargetPicker(
                [
                    customActionButtonMessage
                ]
            )
    } else {
        alert("Custom Actionの利用にはログインが必要です。")
    }
}

const baseUrl = window.location.origin;

const customActionButtonMessage = {
    "type": "flex",
    "altText": "代替テキスト",
    "contents":
        {
            "type": "bubble",
            "hero": {
                "type": "image",
                "url": baseUrl + "/header.png",
                "size": "full",
                "aspectRatio": "20:13",
                "aspectMode": "cover"
            },
            "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                    {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "Thanks!",
                                "size": "lg",
                                "color": "#000000",
                                "weight": "bold",
                                "wrap": true
                            }
                        ],
                        "spacing": "none"
                    },
                    {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "text",
                                "text": "ご注文を承りました。",
                                "size": "sm",
                                "color": "#999999",
                                "wrap": true
                            }
                        ],
                        "spacing": "none"
                    },
                    {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [
                                    {
                                        "type": "text",
                                        "text": "ピザ",
                                        "size": "sm",
                                        "color": "#555555",
                                        "wrap": false,
                                        "flex": 3
                                    },
                                    {
                                        "type": "text",
                                        "text": "× 1",
                                        "size": "sm",
                                        "color": "#111111",
                                        "wrap": false,
                                        "align": "end",
                                        "flex": 1
                                    }
                                ],
                                "flex": 1,
                                "spacing": "sm"
                            },
                            {
                                "type": "box",
                                "layout": "horizontal",
                                "contents": [
                                    {
                                        "type": "text",
                                        "text": "スパゲッティ",
                                        "size": "sm",
                                        "color": "#555555",
                                        "wrap": false,
                                        "flex": 3
                                    },
                                    {
                                        "type": "text",
                                        "text": "× 1",
                                        "size": "sm",
                                        "color": "#111111",
                                        "wrap": false,
                                        "align": "end",
                                        "flex": 1
                                    }
                                ],
                                "flex": 1,
                                "spacing": "sm"
                            }
                        ],
                        "spacing": "sm",
                        "margin": "lg",
                        "flex": 1
                    },
                    {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                            {
                                "type": "button",
                                "action": {
                                    "type": "uri",
                                    "label": "ご注文詳細",
                                    "uri": "https://liff.line.me/" + process.env.LIFF_ID + "/"
                                },
                                "style": "primary",
                                "height": "md",
                                "color": "#17c950"
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type": "uri",
                                    "label": "Share",
                                    "uri": "https://liff.line.me/" + process.env.LIFF_ID + "/"
                                },
                                "style": "link",
                                "height": "md",
                                "color": "#469fd6"
                            }
                        ],
                        "spacing": "xs",
                        "margin": "lg"
                    }
                ],
                "spacing": "md"
            },
            "footer": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                    {
                        "type": "separator",
                        "color": "#f0f0f0"
                    },
                    {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [
                            {
                                "type": "image",
                                "url": baseUrl + "/pizza_icon.png",
                                "flex": 1,
                                "gravity": "center"
                            },
                            {
                                "type": "text",
                                "text": "ほげほげピザ",
                                "flex": 19,
                                "size": "xs",
                                "color": "#999999",
                                "weight": "bold",
                                "gravity": "center",
                                "wrap": false
                            },
                            {
                                "type": "image",
                                "url": "https://vos.line-scdn.net/service-notifier/footer_go_btn.png",
                                "flex": 1,
                                "gravity": "center",
                                "size": "xxs",
                                "action": {
                                    "type": "uri",
                                    "label": "action",
                                    "uri": "https://liff.line.me/" + process.env.LIFF_ID + "/"
                                }
                            }
                        ],
                        "flex": 1,
                        "spacing": "md",
                        "margin": "md"
                    }
                ]
            }
        }
}
