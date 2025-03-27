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

    const schedule = SHOP_SCHEDULE.find(schedule => schedule.day.toLowerCase() === days[day].toLowerCase());

    if (!schedule) {
        // Find the next day's opening time
        const [nextSchedule, daycount] = findNextWorkingDay(day)
        const nextOpeningTimeInMinutes = timeToMinutes(nextSchedule.open);
        const currentTimeInMinutes = hour * 60 + min;
        let timeToNextOpeningInMinutes = (1440 - currentTimeInMinutes) + (daycount * 1440) + nextOpeningTimeInMinutes;
        const [hours, minutes] = timeDifference(0, timeToNextOpeningInMinutes);
        return `Shop is Currently Closed. and it will be open after ${hours} Hrs ${minutes} Mins`; // Shop is closed
    }

    const currentTimeInMinutes = hour * 60 + min;
    const openTimeInMinutes = timeToMinutes(schedule.open);
    const closeTimeInMinutes = timeToMinutes(schedule.close);

    // Check if current time is within the open-close time
    if (currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes <= closeTimeInMinutes) {
        const [hours, minutes] = timeDifference(currentTimeInMinutes, closeTimeInMinutes)
        return `Open, The shop will be closed within ${hours} Hrs ${minutes} Mins`; // Shop is open
    } else {
        let timeToNextOpeningInMinutes;

        // If the current time is after closing time today, calculate the time until the next day's opening.
        if (currentTimeInMinutes > closeTimeInMinutes) {
            // Find the next day's opening time
            const [nextSchedule, daycount] = findNextWorkingDay(day)
            const nextOpeningTimeInMinutes = timeToMinutes(nextSchedule.open);
            timeToNextOpeningInMinutes = (1440 - currentTimeInMinutes) + (daycount * 1440) + nextOpeningTimeInMinutes;
        }
        else {  // If the current time is before opening time today
            timeToNextOpeningInMinutes = openTimeInMinutes - currentTimeInMinutes;
        }

        // Calculate the time difference in hours and minutes
        const [hours, minutes] = timeDifference(0, timeToNextOpeningInMinutes);
        return `Shop is Currently Closed. and it will be open after ${hours} Hrs ${minutes} Mins`; // Shop is closed
    }
}

// function to convert 12-hour time format to 24-hour time format in minutes
function timeToMinutes(inputtime) {
    const [time, meridiem] = inputtime.split(" ");
    const [hours, minutes] = time.split(":").map(num => parseInt(num, 10) || 0);

    let hours24 = hours;
    // Convert 12-hour format to 24-hour format
    if (meridiem.toLowerCase() === 'am' && hours === 12) {
        hours24 = 0;
    }
    else if (meridiem.toLowerCase() === 'pm' && hours !== 12) {
        hours24 += 12;
    }

    return hours24 * 60 + minutes;
}


// function to find difference in time
function timeDifference(fromTimeInMinutes, toTimeInMinutes) {
    const diffInMinutes = toTimeInMinutes - fromTimeInMinutes;
    const hours = Math.floor(diffInMinutes / 60);
    const min = diffInMinutes % 60;
    return [hours, min];
}

// function to find the next working day object
function findNextWorkingDay(day) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let nextDay = (day + 1) % days.length; // Wrap around if it reaches array end
    let nextDaySchedule = SHOP_SCHEDULE.find(s => s.day.toLowerCase() === days[nextDay].toLowerCase());
    let daycount = 0;

    while (!nextDaySchedule) {
        nextDay = (nextDay + 1) % days.length;
        nextDaySchedule = SHOP_SCHEDULE.find(s => s.day.toLowerCase() === days[nextDay].toLowerCase());
        daycount++;
    }
    return [nextDaySchedule, daycount];
}