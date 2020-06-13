// API Call by keyword
//https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=pAzVsQiL7Ld1Uxrjdfrvx0QUBBhOF5zG
var kword;
var APIkey = "pAzVsQiL7Ld1Uxrjdfrvx0QUBBhOF5zG";
var aURL;
// $("#search-term").on("change", startSearch);
$("#searchBtn").on("click", startSearch)
function startSearch(event) {
    event.stopPropagation();
    event.preventDefault();
    console.log("user start search");
    kword = $("#search-term").val();
    console.log("User input:", kword);
    getRecords(kword);
}  
function getRecords(kword) {
    var startYear = ($('#startYear').val());
    console.log('This is the startYear: ', startYear);
    var endYear = ($('#endYear').val());
    if(startYear && endYear){
        console.log('The value for startYear =' , startYear);
        console.log('The value for startYear =' , endYear);
        aURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + kword + "&api-key=" + APIkey + "&begin_date=" + startYear + "0101" + "&end_date=" + endYear + "0101";
    } else if (startYear){
        console.log('The value for startYear =' ,startYear);
        aURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + kword + "&api-key=" + APIkey + "&begin_date=" + startYear + "0101";
    } else {
        aURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + kword + "&api-key=" + APIkey;
    };
    console.log('aURL = ', aURL);
    console.log("getrecords entered");
    $.ajax({
        url: aURL,
        method: "GET"
    }).then(outResponse);
}
function outResponse(results) {  
    var retrieve = $("#numRec").val();
    for (var i = 0; i < retrieve; i++) {
        var contain = $('<div>')
        .css({
            "border-width": "1px",
            "border-style": "solid",
            "border-color": "lightgrey",
            "height":"150px"
        });
        var headline = $("<div>").text(results.response.docs[i].headline.main);
        var author = $("<div>").text(results.response.docs[i].byline.original);
        var date = $("<div>").text(results.response.docs[i].pub_date);
        var url = $("<a>").attr("href", results.response.docs[i].web_url).text(results.response.docs[i].web_url);
        var section = $("<div>").text(results.response.docs[i].section_name);
        //contain.appendTo("#topArticles");
        contain.append(headline, author, date, url, section);
        contain.appendTo("#topArticles");
    }
}

$("#clearBtn").on("click", function (){
    $("#topArticles").empty();
    $("#search-term").val('');
    $("#numRec").val('');
    $("#startYear").val('');
    $("#endYear").val('');
});