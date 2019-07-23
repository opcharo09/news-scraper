$(document).ready(function() {
    
    var articleContainer = $(".article-container");

    $(document).on("click", ".btn.notes", handleArticleNotes);
    $(document).on("click", ".btn.save", handleNoteSave);
    $(document).on("click", ".btn.note-delete", handleNoteDelete);
    $(".clear").on("click", handleArticleClear);

    function initPage() {
        // Empty the article container, run an AJAX request for any saved headlines
        $.get("/api/headlines?saved=true").then(function(data) {
          articleContainer.empty();
          // If we have headlines, render them to the page
          if (data && data.length) {
            renderArticles(data);
          } else {
            // Otherwise render a message explaining we have no articles
            renderEmpty();
          }
        });
      // need to add the fucntions for the rest of the buttons on the save page.