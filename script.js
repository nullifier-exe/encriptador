
/* Regras Codificador: 
"e" é convertido para "enter" 
"i" é convertido para "imes"
"a" é convertido para "ai"
"o" é convertido para "ober"
"u" é convertido para "ufat"
Apenas letras minúsculas
Não permite acentuação   
*/

/* Regras Decodificador: 
"enter" é convertido para "e" 
"imes" é convertido para "i"
"ai" é convertido para "a"
"ober" é convertido para "o"
"ufat" é convertido para "u"
Apenas letras minúsculas
Não permite acentuação     
*/

var cypherDictionary = {};
cypherDictionary["a"] = "ai";
cypherDictionary["e"] = "enter";
cypherDictionary["i"] = "imes";
cypherDictionary["o"] = "ober";
cypherDictionary["u"] = "ufat";     

function validadeTextOutput() {
    var afield = document.getElementById("answerField");
    var atext = document.getElementById("alert-text");

    if (afield.value == "") {
        afield.style["background-image"] = "url('resources/diamond-no-text.svg')";

        atext.style["visibility"] = "visible";                
    }
    if (!afield.value == "") {
        afield.style["background-image"] = "";

        atext.style["visibility"] = "hidden";
    }
}

function validadeCharInput(element) {
    element.value = element.value.replace(/[àáâãäèéêëìíîïòóôõöùúûü]/g, "");
    element.value = element.value.replace(/[A-Z]+/g, "");
}

// ↓ roda o código depois que o conteúdo html da página é carregado
document.addEventListener("DOMContentLoaded", function(){
    
    validadeTextOutput();

    function userTextEncrypt() { 
        var inputText = document.getElementById("userTextField").value;
        var newText = "";

        if (inputText === "") {
                alert("Favor digitar algum texto");
        }
        else {
            for (var index = 0; index < inputText.length; index++) {
                if (cypherDictionary[inputText[index]] != undefined) {
                    newText += cypherDictionary[inputText[index]];
                } 
                if (cypherDictionary[inputText[index]] == undefined) {
                    newText += inputText[index];
                }
            }

            document.getElementById("answerField").value = newText;
            validadeTextOutput();
        }
    }

    function userTextDcrypt() {
        var inputText = document.getElementById("userTextField").value;

        function decypherFor(index=0, text="", dictkey="") {
            if (text.substr(index, cypherDictionary[dictkey].length) == cypherDictionary[dictkey]) {                    
                inputText = text.substr(0, index) + 
                dictkey + 
                text.substr(index + cypherDictionary[dictkey].length);
            }
        }

        for (index = 0; index < inputText.length; index++) {
            decypherFor(index, inputText, "a");
            decypherFor(index, inputText, "e");
            decypherFor(index, inputText, "i");
            decypherFor(index, inputText, "o");
            decypherFor(index, inputText, "u");
        }

        document.getElementById("answerField").value = inputText;
        validadeTextOutput();
    }

    function copyOutputText() { 
        var popup = document.getElementById("copyAlert");
        popup.classList.remove("anim")
        var draft = document.getElementById("copyDraft");
        draft.value = document.getElementById("answerField").value;

        draft.select();
        navigator.clipboard.writeText(draft.value);
    
        setTimeout(function(){ popup.classList.add("anim") }, 10);
        
    }

    var buttonEncrypt = document.getElementById("buttonEncrypt");
    var buttonDcrypt = document.getElementById("buttonDcrypt");
    var buttonCopy = document.getElementById("buttonCopy");

    // atribuindo funções aos botões:
    buttonEncrypt.onclick = function() {userTextEncrypt();};
    buttonDcrypt.onclick = function() {userTextDcrypt();}
    buttonCopy.onclick = function() {copyOutputText();}
});