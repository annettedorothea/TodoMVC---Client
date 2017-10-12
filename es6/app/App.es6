'use strict';

$.ajaxSetup({cache: false});


$(window).on('hashchange', function() {
    new InitAction().apply();
});

const container = ReactDOM.render(
    <Container />,
    document.getElementById('root')
);

AppUtils.start();

/*       S.D.G.       */

