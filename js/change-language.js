function switchLang(){
    $('[lang="ru"]').toggle();
    $('[lang="en"]').toggle();
}

function loadLang(){
    $('[lang="ru"]').hide();
    console.log("load")
}