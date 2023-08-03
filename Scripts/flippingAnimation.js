$(document).ready(function() {
    
    // Load the business card data from cards.json
    //$.getJSON("https://gamedirection.github.io/Scripts/cards.json", function(cards) {
    $.getJSON("Scripts/cards.json", function(cards) {

        // For each card, create an image element for side A and side B, a link, and tags
        cards.forEach(function(card) {
            var flipBox = $('<div />', { 
                class: 'flip-box',
                'data-tags': card.tags.join(' ')
            });
            
            var flipBoxInner = $('<div />', { 
                class: 'flip-box-inner'
            });
            
            var imgA = $('<img />', { 
                id: card.id + '-A',
                src: 'Images/' + card.id + '-Side-A.jpg', 
                alt: card.id + ' Side A',
                class: 'flip-box-front'
            });

            var imgB = $('<img />', { 
                id: card.id + '-B',
                src: 'Images/' + card.id + '-Side-B.jpg', 
                alt: card.id + ' Side B',
                class: 'flip-box-back'
            });
            
            flipBoxInner.append(imgA, imgB);
            flipBox.append(flipBoxInner);
            
            // Add the flip box to the link and append to the div
            var link = $('<a />', { 
                href: card.url,
                target: '_blank'
            }).append(flipBox);
            $('#business-cards').append(link);

            // Adjust width of the flip-box div based on the image's aspect ratio
            imgA.on('load', function() {
                adjustFlipBoxWidth();
            });
        });

        // Adjust width of the flip-box div based on the image's aspect ratio
        function adjustFlipBoxWidth() {
            $('.flip-box').each(function() {
                var imgA = $(this).find('.flip-box-front');
                var aspectRatio = imgA.width() / imgA.height();
                $(this).width($(this).height() * aspectRatio);
            });
        }

        // Get all unique tags
        var allTags = Array.from(new Set(cards.flatMap(function(card) {
            return card.tags;
        })));

        // Create a button for each tag
        allTags.forEach(function(tag) {
            var button = $('<button />', { 
                text: tag,
                'data-tag': tag
            });

            // Add a click event to the button to add the tag to the search box
            button.on('click', function() {
                var searchBox = $('#search-box');
                var currentTags = searchBox.val().split(' ').filter(Boolean);  // Split the current value into an array and remove empty strings
                var tag = $(this).data('tag');
                if (!currentTags.includes(tag)) {
                    currentTags.push(tag);
                    searchBox.val(currentTags.join(' '));  // Add the tag to the search box
                    filterCards();  // Trigger the search
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

        // Adjust the flip box width when the images are loaded
        $('.flip-box img.flip-box-front').on('load', function() {
            adjustFlipBoxWidth();
        });
    });
});
