current_page_id = null;
number_of_pages = null;
page_size = null;
received_object = null;


function display(page_id, page_size) {
    jQuery("#result").empty()
    jQuery("#right_div").empty()
    to_add = ""

    // to_add += "<ol>";

    lower_bound = page_size * (page_id - 1)
    higher_bound = page_size + (page_size * (page_id - 1))

    counter = 1;
    for (i = lower_bound; i < data.results.length && i < higher_bound; i++) {

        // to_add += "<li>"
        to_add += "#"
        to_add += i + counter;
        to_add += "<br>"
        to_add += `Title: ${data.results[i].original_title}`
        to_add += "<br>"

        to_add += `Description: ${data.results[i].overview}`
        to_add += "<br>"
        to_add += `<img src="http://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" height="100px"  >`

        to_add += `<button class="back_drop_buttons" id="${data.results[i].backdrop_path}"  >Display backdrop image </button>`
        to_add += "<hr>"
        // to_add += "</li>"
    }
    // to_add += "</ol>"
    jQuery("#result").append(to_add);
}

function paginate_menu() {
    $("#page_numbers").empty();
    number_of_pages = Math.ceil(data.results.length / Number(page_size));
    for (i = 1; i <= number_of_pages; i++) {
        $("#page_numbers").append(`<span> <button  id="${i}"> ${i} </button>  </span>`);
    }
}

function s_(res) {
    $("section").show();
    data = res
    page_id = 1
    $("#page_numbers").empty();
    paginate_menu();
    display(page_id, page_size);
}

function display_backdrop() {
    console.log($(this).attr('id'));
    x = $(this).attr('id')
    if (x) {
        jQuery("#plot").html(
            `<img src="http://image.tmdb.org/t/p/original/${x}" width="100%">`
        );
    }
    else {
        jQuery("#plot").html(
            " <h1> No image</h1>"
        );
    }
}
function search_() {
    $.ajax({
        // url: `https://imdb-api.com/en/API/Search/k_gtghng8q/${jQuery("#q_").val()}`,
        url: `https://api.themoviedb.org/3/search/movie?api_key=ed4ef9b0f9bcb9c237ab83a2c2ffb909&language=en-US&page=1&include_adult=false&query=${jQuery("#q_").val()}`,
        type: 'GET',
        success: s_
    })
}

function process_response(data) {
    received_object = data;
    for (i = 0; i < data.results.length; i++) {
        $("#results").append(data.results[i].original_title + "<br>");

        $("#results").append(data.results[i].overview + "<br>");
        x = data.results[i].poster_path
        image_html = `<img src='https://image.tmdb.org/t/p/w500/${x}'>`
        $("#results").append(image_html + "<br>");

        z = `<button id="${data.results[i].backdrop_path}" class="backdrop_button"> backdrop image!</button>`
        $("#results").append(z + "<br>" + "<hr>");
    }

    // inject the buttons 
    paginate_menu();
}

function navigate() {
    page_id = Number($(this).attr("id"));
    page_size = Number($("#page_size").val());
    current = page_id;
    $("#prev").show();
    $("#next").show();

    display(page_id, page_size);
}

function setup() {
    // alert('asd')
    // jQuery('#get_temperature_button').click(call_ajax)
    // call_ajax()
    page_size = Number($("#page_size").val());
    jQuery('#search').click(search_);
    jQuery('body').on('click', '.back_drop_buttons', display_backdrop);
    jQuery("body").on("click", "span button", navigate);
    $("#page_size").change(() => {
        // alert($(this).attr("value"));
        page_size = Number($("#page_size option:selected").val());
        // alert(page_size);
        paginate_menu();
        display(page_id, page_size);
    })
    $("section").hide();

    $("#first").click(() => {
        current = 1;
        display(1, page_size);
    });

    $("#last").click(() => {
        current = number_of_pages;
        display(number_of_pages, page_size);
    });

    $("#next").click(() => {
        if (current != number_of_pages)
            current = current + 1;
        display(current, page_size);
    });

    $("#prev").click(() => {
        if (current != number_of_pages)
            current = current + 1;
        display(current, page_size);
    });

    $("#next").hide();
    $("#prev").hide();
}

jQuery(document).ready(setup);