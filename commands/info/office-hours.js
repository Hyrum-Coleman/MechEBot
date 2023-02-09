

module.exports = function get_office_hours(course) {
    if (course === 'meen2300-001') { // DONE AND UP TO DATE
        let professor_hours = 'Wednesday and Friday, 1:00 - 2:15.\n\n';
        professor_hours += 'On Wednesday, the office hours are on zoom, and the password is 006740.\n';
        professor_hours += 'On Friday, the office hours are in person in MEK 3352.\n\n';

        let ta_hours = 'Thursdays from 12:00 - 1:00 on zoom.';
        return { professor_hours, ta_hours };
    }
    else if (course === 'ece2210-004') {  // DONE AND UP TO DATE
        let professor_hours = 'Mondays and Wednesdays after class until 12:15 pm in MEB 2278.\n\n';
        professor_hours += 'Professor Simpson also provides office hours by appointment, either in person or through zoom.\n\n';

        let ta_hours = 'Mondays:\n' +
            'TA: Emma\n' +
            '12:15 - 1:45 PM\n' +
            'Room MEB 2267 and through Zoom:\n' +
            'https://utah.zoom.us/j/5099844531\n' +
            '\n' +
            'Tuesdays:\n' +
            'TA: Utpal\n' +
            '11:00 - 12:30 PM\n' +
            'Room MEB 2255 A\n' +
            'TA: Kyle\n' +
            '2:00 - 3:00 PM\n' +
            'Room MEB 2255 A\n' +
            '\n' +
            'Wednesdays:\n' +
            'TA: Md Golam Dastgir\n' +
            '2:00 - 3:30 PM\n' +
            'Room MEB 2255A\n' +
            '\n' +
            'Thursdays: \n' +
            'TA: Braden\n' +
            '2:00 - 3:30 PM\n' +
            'Room MEB 2255A\n' +
            '\n' +
            'Fridays:\n' +
            'TA: Rich\n' +
            '9:00 - 10:30 AM\n' +
            'Room MEB 2267\n\n';
        return { professor_hours, ta_hours };
    }
    else if (course === 'meen2650-001') {  // DONE AND UP TO DATE
        let professor_hours = 'Tuesdays and Thursdays from 10:30 - 11:30 in MEK 2339\n\n'
        professor_hours += 'Professor Pan also provides office hours by appointment, either in person or through zoom.';
        let ta_hours = 'none';
        return { professor_hours, ta_hours };
    }
    else if (course === 'math3150-004') {  // DONE AND UP TO DATE
        let professor_hours = 'Fridays from 10:00 - 12:30 PM in JWB 333\n\n'
        professor_hours += 'Dr. Maitra also provides office hours by appointment, either in person or through zoom.';
        let ta_hours = 'none';
        return { professor_hours, ta_hours };
    }
};