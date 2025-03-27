const SHOP_SCHEDULE = [
    {
        day: 'Mon',
        open: '07:00 AM',
        close: '07:00 PM'
    },
    {
        day: 'Tue',
        open: '07:00 AM',
        close: '07:00 PM'
    },
    {
        day: 'Thu',
        open: '07:00 AM',
        close: '07:00 PM'
    },
    {
        day: 'Fri',
        open: '07:00 AM',
        close: '07:00 PM'
    }
];

console.log(checkShopStatus());

// Function to check if the shop is open or closed based on the current time
function checkShopStatus() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const currentDay = new Date();

    const day = currentDay.getDay();
    const hour = currentDay.getHours();
    const min = currentDay.getMinutes();

    const schedule = SHOP_SCHEDULE.find(schedule => schedule.day === days[day]);

    if (!schedule) {
        return 'Closed'; // Shop is closed on this day
    }

    const currentTimeInMinutes = hour * 60 + min;
    const openTimeInMinutes = timeToMinutes(schedule.open);
    const closeTimeInMinutes = timeToMinutes(schedule.close);

    // Check if current time is within the open-close time
    if (currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes <= closeTimeInMinutes) {
        return 'Open'; // Shop is open
    } else {
        return 'Closed'; // Shop is closed
    }
}

// function to convert 12-hour time format to 24-hour time format in minutes
function timeToMinutes(inputtime) {
    const [time, meridiem] = inputtime.split(" ");
    const [hours, minutes] = time.split(":").map(num => parseInt(num, 10) || 0);

    let hours24 = hours;
    // Convert 12-hour format to 24-hour format
    if (meridiem === 'AM' && hours === 12) {
        hours24 = 0;
    }
    else if (meridiem === 'PM' && hours !== 12) {
        hours24 += 12;
    }

    return hours24 * 60 + minutes;
}

