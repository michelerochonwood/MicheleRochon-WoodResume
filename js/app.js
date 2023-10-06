(function () {
    // These are my view names linked to their corresponding URLs
    const viewMapping = {
        home: "views/shared/home.html",
        aboutme: "views/aboutme.html",
        contactme: "views/contactme.html",
        projects: "views/projects.html",
        services: "views/services.html",
    };

    let LoadHeader = () => {
        $.get("views/shared/header.html", (headerContents) => {
            $("header").html(headerContents);

            $("li > a").on("click", (event) => {
                event.preventDefault();
                const viewName = $(event.currentTarget).prop("id");

                // This checks if the viewName exists in the mapping above
                if (viewMapping.hasOwnProperty(viewName)) {
                    document.title = viewName;
                    LoadContent(viewMapping[viewName]); // This passes the URL to LoadContent
                } else {
                    console.error("View not found:", viewName); //added this to help me troubleshoot, as suggested by ChatGPT
                }
            });
        }).fail((error) => {
            console.error("Error loading header:", error);
        });
    };

    let LoadFooter = () => {
        $.get("views/shared/footer.html", (footerContents) => {
            $("footer").html(footerContents);
        }).fail((error) => {
            console.error("Error loading footer:", error);
        });
    };

    let LoadContent = (viewUrl) => {
        // This loads the content from the specified URL
        $.get(viewUrl, (content) => {
            $("#content").html(content);
        }).fail((error) => {
            console.error("Error loading content:", error);
        });
    };

    let Start = () => {
        LoadHeader();
        LoadFooter();
        LoadContent(viewMapping.home);
    };

    document.addEventListener("DOMContentLoaded", function () {
        // Start Michele's online resume
        Start();
        
        // Event handling for the header links
        $("ul.navbar-nav li.nav-item a.nav-link").on("click", function (event) {
            event.preventDefault();
            const viewName = $(this).prop("id"); 
            console.log("Clicked link with viewName:", viewName);
            document.title = viewName;
            LoadContent(viewMapping[viewName]);
        });
        // The form submission code starts here - I had to keep them separate because I did the form stuff last - thought it might break the whole site
        const handleFormSubmit = (event) => {
            event.preventDefault(); // This prevents the form from submitting, which I learned from ChatGPT, but I'm still not sure why that's necessary.

            // This is the JavaScript object that is supposed to store the form data
            const formData = {
                email: document.getElementById('exampleInputEmail1').value,
                password: document.getElementById('exampleInputPassword1').value,
                checked: document.getElementById('exampleCheck1').checked,
            };

            // This converts the JavaScript object to JSON
            const jsonData = JSON.stringify(formData);

            // This is supposed to send it to the console, but it doesn't appear to be working.
            console.log(jsonData);
        };

        // Add a submit event listener to the form
        const form = document.getElementById('myForm');
        form.addEventListener('submit', handleFormSubmit); //it appears that it is approaching midnight on the due date and I haven't much time to sort out why this isn't workng. This is where my abilities with JavaScript have reached an impasse - console is saying that it can't read this

    });
})();
