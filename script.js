// MENU FUNCTIONALITY

let menuButton = $('#menu-button');
let exitButton = $('#exit');
let navSection = $('#nav');

let homeLink = $('#home-link');
let aboutLink = $('#about-link');
let portfolioLink = $('#portfolio-link');
let contactLink = $('#contact-link');

menuButton.click(() => {
    navSection.css("left", "0");
    exitButton.css('display', 'block');
});

exitButton.click(exitMenu);
homeLink.click(exitMenu);
aboutLink.click(exitMenu);
portfolioLink.click(exitMenu);
contactLink.click(exitMenu);

function exitMenu()
{
    navSection.css("left", "100%");
    exitButton.css('display', 'none');
}