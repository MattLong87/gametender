export default function getTimeColorBasedOnPlaytime(playtime, requestedPlayTime){
    const green = `#008c21`;
    const yellow = `#aab000`;
    const red = `#9e0000`;
    
    switch(requestedPlayTime){
        case '30':
            console.log('we are here')
            if(playtime <= 30){
                return green;
            }
            else if(playtime < 60){
                return yellow;
            }
            else{
                return red;
            }
        case '60':
            if(playtime > 30 && (playtime < 90)){
                return green;
            }
            else if(playtime <= 30 || (playtime >=90 && playtime < 150)){
                return yellow;
            }
            else{
                return red;
            }
        case '120':
            if(playtime >= 90 && playtime < 150){
                return green;
            }
            else if(playtime > 30){
                return yellow;
            }
            else{
                return red;
            }
        case '240':
            if (playtime >= 120){
                return green;
            }
            else if(playtime > 90){
                return yellow;
            }
            else{
                return red;
            }
        default:
            return '#000';
    }
}