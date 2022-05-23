let socialIconToNormalIcon =  new Map();
socialIconToNormalIcon.set('facebook_icon', 'facebook_logo');
socialIconToNormalIcon.set('twitter_icon', 'twitter_logo');
socialIconToNormalIcon.set('instagram_icon', 'instagram_logo');
socialIconToNormalIcon.set('youtube_icon', 'youtube_logo');
socialIconToNormalIcon.set('linkedin_icon', 'linkedin_logo');
socialIconToNormalIcon.set('web_icon', 'web_logo');
socialIconToNormalIcon.set('telegram_icon', 'telegram_logo');

let links = document.querySelectorAll(".ui.social-icon");
for (let link of links) {
    let a = link.classList[2];
    
    let image = document.createElement("img");
    image.className = 'ui icon';
    image.setAttribute('data-icon', socialIconToNormalIcon.get(a));
    link.appendChild(image);

}
