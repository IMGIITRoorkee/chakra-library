let number_tags = document.querySelectorAll(".number");
let start=1;

for (let number_tag of number_tags){
    let number =start;
    if(Math.floor(number/10)==0){
        number = `0${number}`
    }
    number_tag.innerHTML=number;
    start++;
}
