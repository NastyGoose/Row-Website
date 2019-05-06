export function preventDefault (e) {
    e = e || window.event;
    if (e.preventDefault) { e.preventDefault(); }
    e.returnValue = false;
}

export default class Time extends Date {
    constructor() {
        super();
    }

  static  whatTimeIsItNow = () => {
    const time = new Date().getHours();
    if (time >= 0 && time <= 5) return ('Good evening,');
    if (time >= 6 && time <= 11) return ('Good morning,');
    if (time >= 12 && time <= 16) return ('Good afternoon,');
    if (time >= 17 && time <= 23) return ('Good evening,');
    };

  static  whatDayIsItToday = () => {
    let today = new Date().getDay();
       switch (today) {
            case 1:
                return ('monday');
            case 2:
                return ('tuesday');
            case 3:
                return ('wednesday');
            case 4:
                return ('thursday');
            case 5:
                return ('friday');
            case 6:
                return ('saturday');
            case 0:
                return ('sunday');
        }
    };

}