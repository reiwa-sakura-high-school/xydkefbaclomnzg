(function() {
    function loadTextFile(url) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                const noticeDiv = document.querySelector('.notice');
                if (xhr.status === 200) {
                    var textData = xhr.responseText;
                    const lines = textData.split('\n');
                    lines.forEach(line => {
                        let text = line.trim();
                        let length = text.length;
                        if (length > 0) {
                            let div = document.createElement('div');
                            div.classList.add('line2');
                            div.innerText = text;
                            noticeDiv.appendChild(div);
                            let isFullWidth = text => {
                                for (let i =0; i<text.length; i++){if (text.charCodeAt(i)>255){return true;}}
                                return false;
                            };
                            if (isFullWidth(text)) {
                                if (length > 17) {
                                    let extraDivCount = Math.floor(length / 17);
                                    for (let i = 0; i < extraDivCount; i++) {
                                        noticeDiv.appendChild(Object.assign(document.createElement('div'),{className:'line2'}));
                                    }
                                }
                            } else {
                                if (length > 42) {
                                    let extraDivCount = Math.floor(length / 42);
                                    for (let i = 0; i < extraDivCount; i++) {
                                        noticeDiv.appendChild(Object.assign(document.createElement('div'),{className:'line2'}));
                                    }
                                }
                            }
                        }
                    });
                    noticeDiv.appendChild(Object.assign(document.createElement('div'),{className:'line2'}));
                } else {
                    let [e1,e2]=['div','div'].map(tag=>document.createElement(tag));
                    e1.innerText="読み込むときにエラー";
                    e2.innerHTML="(<a href='https://developer.mozilla.org/ja/docs/Web/HTTP/Status'>"+xhr.status+"</a>)が発生しました。";
                    [e1,e2].map(element=>element.classList.add('line2'));
                    noticeDiv.append(e1,e2);
                }
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    }
    var textFileUrl = 'https://reiwa-sakura.jp/cafemenu/c.txt';
    window.onload = function() {
        loadTextFile(textFileUrl);
    };
})();
