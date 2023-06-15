const getLocalDate = (isoDate) => {
    const localDate = new Date(isoDate);
    const formattedDate = localDate.toISOString().slice(0, 16).replace('T', 'T');
    console.log(formattedDate);
    return formattedDate;
}

const NormalTime = ({dateStr}) => {
    const dateObj = new Date(dateStr);

    console.log(dateObj);
    // Convert to local date and time
    const localDateStr = dateObj.toLocaleDateString();
    const localTimeStr = dateObj.toLocaleTimeString();

    // Convert to AM/PM format

    return localDateStr + " " + localTimeStr;
}


const donationStatus=["Pending","Rider Assigned","Picked Up"];

module.exports = { getLocalDate ,NormalTime,donationStatus};