// API Call by keyword
https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=pAzVsQiL7Ld1Uxrjdfrvx0QUBBhOF5zG

var kword;
var APIkey = "pAzVsQiL7Ld1Uxrjdfrvx0QUBBhOF5zG";
var aURL;


// $("#search-term").on("change", startSearch);
$("#searchBtn").on("click", startSearch)
function startSearch (event) {
    event.stopPropagation();
    event.preventDefault();
    console.log("user start search");
    kword = $("#search-term").val();
    console.log("User input:", kword);
    getRecords(kword);
}
function getRecords(kword) {
    aURL="https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + kword + "&api-key=" + APIkey;
    console.log("getrecords entered");
    $.ajax({
        url: aURL,
        method:"GET"
    }).then(outResponse);
}

function outResponse(results) {
    console.log("Testing docs", results.response.docs);
    console.log("Response is: ", results);
    console.log('Main: ', results.response.docs[0].headline.main);
    console.log('Byline: ', results.response.docs[0].byline.original);
    console.log('Abstract', results.response.docs[0].abstract);
    console.log('Pub Date', results.response.docs[0].pub_date);
// console.log('Image ', results[i].multimedia[0].url);
}


