// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
  });
  
  
  // Whenever someone clicks a p tag
  $(document).on("click", "p", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h5>" + data.title + "</h5>");
        // An input to enter a new title
        $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.Note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });

    //   function renderEmpty() {
    
    //     var emptyAlert = $(
    //       [
    //         "<div class='alert alert-warning text-center'>",
    //         "<h4>Uh Oh. Looks like we don't have any new articles.</h4>",
    //         "</div>",
    //         "<div class='card'>",
    //         "<div class='card-header text-center'>",
    //         "<h3>What Would You Like To Do?</h3>",
    //         "</div>",
    //         "<div class='card-body text-center'>",
    //         "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
    //         "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
    //         "</div>",
    //         "</div>"
    //       ].join("")
    //     );
    //     // Appending this data to the page
    //     articleContainer.append(emptyAlert);
    //   }
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  })

  // need to refactor code 
//   add code to make call 
//   add code to show article
//   add code for buttons once arcticle a render on the page