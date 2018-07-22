function showLanguageIcon(language)
{
    document.getElementsByTagName('img')[0].src = 'images/' + language + '.png';
}

function updateDescriptionText(text){
    document.getElementById('desc-text').innerHTML = text;
}

function setFont(font){
    document.getElementById('css-text').style.fontFamily = font;
}

function setFontColor(color){
    document.getElementById('css-text').style.color = color;
}

function setFontSize(size){
    document.getElementById('css-text').style.fontSize = size;
}