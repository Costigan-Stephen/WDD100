function include() {
    let file, xhttp;

    let allElements = document.getElementsByTagName('*'); // get all elements on the page

    for (let i = 0; i < allElements.length; i++) { // process all the elements looking for the custom attribute 'includefile'
        file = allElements[i].getAttribute("includefile");
        if (file) { // if the attribute is found, process an AJAX XMLHttpRequest
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        allElements[i].innerHTML = this.responseText;
                    }
                    if (this.status == 400) {
                        allElements[i].innerHTML = "Page not found!";
                    }
                    allElements[i].removeAttribute('includefile');
                    include(); // call the function again to start the process over
                }
            }
            xhttp.open('GET', 'https://github.com/Costigan-Stephen/WDD100/blob/master/modules/' + file, true); // matching file names in includes folder
            xhttp.send();
            
            var content = document.getElementById('gallery');  //content exists
            if (content) {
                cNav();
            }
            
            var date = document.getElementById('date'); //content exists
            if (date) {
                date();
            }

            return;
        }
    }
}
// initial call to the include function
include();
