(function () {
    // Este script lo que hace, es en caso que se recarga la pagina, se queda en la misma posición, sin
    // desplazamiento hacia arriba. Realmente lo hace, pero luego teniendo un apunte en request form, se saca
    // la posición de scroolY. Y se mueve a nivel vertical. Esto pasa mucho al usar botones de form que recargan
    // la pagina y se nota mucho en los mobiles.

    function myWindowScroolOnLoad() {
        var scrollY = parseInt('<%=Request.Form["scrollY"] %>');
        if (!isNaN(scrollY)) {
            window.scrollTo(0, scrollY);
        }
    }
    window.onload = myWindowScroolOnLoad();

    window.onscroll = function () {
        var scrollY = document.body.scrollTop;
        if (scrollY === 0) {
            if (window.pageYOffset) {
                scrollY = window.pageYOffset;
            }
            else {
                scrollY = (document.body.parentElement) ? document.body.parentElement.scrollTop : 0;
            }
        }
        if (scrollY > 0) {
            var input = document.getElementById("scrollY");
            if (input == null) {
                input = document.createElement("input");
                input.setAttribute("type", "hidden");
                input.setAttribute("id", "scrollY");
                input.setAttribute("name", "scrollY");
                var form = document.getElementById("formSB");
                if (form) {
                    form.appendChild(input);
                }
            }
            input.value = scrollY;
        }
    };
}());