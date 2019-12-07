function switchLang() {
    var currentLanguage = window.localStorage.getItem("language")

    if (currentLanguage == "ru") {
        window.localStorage.setItem("language", "en");
        $('[lang="ru"]').hide();
        $('[lang="en"]').show();
    } else {
        window.localStorage.setItem("language", "ru");
        $('[lang="en"]').hide();
        $('[lang="ru"]').show();
    }
}