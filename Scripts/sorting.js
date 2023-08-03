// sorting.js
$(document).ready(function() {
    // Get all unique tags from the HTML
    var allTags = Array.from(new Set($('.flip-box').map(function() {
        return $(this).data('tags').split(' ');
    }).get().flat()));

    // Create a button for each tag
    allTags.forEach(function(tag) {
        var button = $('<button />', { 
            text: tag,
            'data-tag': tag
        });

        // Add a click event to the button to add the tag to the search box
        button.on('click', function() {
            var searchBox = $('#search-box');
            var currentTags = searchBox.val().split(' ').filter(Boolean);
            var tag = $(this).data('tag');
            if (!currentTags.includes(tag)) {
                currentTags.push(tag);
                searchBox.val(currentTags.join(' '));
                filterCards();
            }
        });

        $('#tag-buttons').append(button);
    });

    // Clear search box when the clear button is clicked
    $('#clear-button').on('click', function() {
        $('#search-box').val('');
        filterCards();
    });

    // Filter cards based on search term when a key is released in the search box
    $('#search-box').on('keyup', function() {
        filterCards();
    });

    function filterCards() {
        var searchTerm = $('#search-box').val().toLowerCase().split(' ');
        $('.flip-box').each(function() {
            var tags = $(this).data('tags').toLowerCase().split(' ');
            if (searchTerm.some(term => tags.includes(term))) {
                $(this).parent().show();  // Show card if a tag includes the search term
            } else {
                $(this).parent().hide();  // Hide card otherwise
            }
        });
    }
});
