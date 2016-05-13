/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {

        /* allFeeds variable has been defined and is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loops through each feed in the allFeeds object and ensures
         * it has a URL defined and that the URL is not empty.
         */
        it('have valid URLs', function() {
            $.each(allFeeds, function( index, feed ) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });


        /* Loops through each feed in the allFeeds object and ensures
         * it has a name defined and that the name is not empty.
         */
        it('have valid names', function() {
            $.each(allFeeds, function( index, feed ) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });

    });

    describe('The Menu', function() {

        /* Menu element is hidden by default.
         */
        it('is hidden by default', function() {
            expect($( 'body' ).hasClass( 'menu-hidden' )).toBe(true);
        });

         /* Menu changes visibility when the menu icon is clicked.
          * Two expectations: (1) does the menu display when clicked and
          * (2) does it hide when clicked again?
          */
        it('toggles visibility correctly', function() {

            var spyEvent = spyOn($('.menu-icon-link'), 'click');

            $('.menu-icon-link').trigger( 'click' );
            expect($( 'body' ).hasClass( 'menu-hidden' )).toBe(false);

            $('.menu-icon-link').trigger( 'click' );
            expect($( 'body' ).hasClass( 'menu-hidden' )).toBe(true);

        });

    });

    describe('Initial Entries', function() {

        /* LoadFeed() is asynchronous so we make sure that it is done before
         * checking the specs.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* When the loadFeed function is called and completes its work,
         * there is at least a single .entry element within the .feed container.
         */
        it('load correctly', function() {
            expect($('.entry-link').length).toBeGreaterThan(0);
        });

    });

    describe('New Feed Selection', function() {

        var initialState,
            finalState;

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        beforeEach(function(done) {
            initialState = $('.entry-link h2:first').text();
            loadFeed(1, done);
        });

        afterEach(function() {
            loadFeed(0);
        });

        // When a new feed is loaded by the loadFeed function, content actually changes.
        it('updates content', function(done) {
            finalState = $('.entry-link h2:first').text();
            console.log(finalState);
            expect(finalState).not.toBe(initialState);
            done();
        });

    });

}());