let currentUser;

let usersBoard = [
    {
        "name": "Heiner Müller",
        "email": "hmueller@company.com",
        "password": "test123",
        "phone": "",
        "short_name": "HM",
        "color": "HSL(300, 100%, 50%)"
    },

    {
        "name": "Sofia Maier",
        "email": "smaier@company.com",
        "password": "test987",
        "phone": "",
        "short_name": "SM",
        "color": "HSL(120, 100%, 50%)"
    },

    {
        "name": "Joe May",
        "email": "jmay@company.com",
        "password": "test246",
        "phone": "",
        "short_name": "JM",
        "color": "HSL(180, 100%, 50%)"
    },

    {
        "name": "Maria Mutschler",
        "email": "mmutschler@company.com",
        "password": "test135",
        "phone": "",
        "short_name": "MM",
        "color": "HSL(36, 100%, 50%)"
    },

    {
        "name": "Rainer Zufall",
        "email": "rzufall@company.com",
        "password": "test567",
        "phone": "",
        "short_name": "RZ",
        "color": "HSL(85, 100%, 50%)"
    },

    {
        "name": "Ali Alles",
        "email": "aalles@company.com",
        "password": "test765",
        "phone": "",
        "short_name": "AA",
        "color": "HSL(280, 100%, 50%)"
    }
];

let tasks = [
    [ // To-Do
        {
            "cat": "Design",
            "title": "Website redsign",
            "desc": "Modify the content of the main website",
            "date": "2023-02-15",
            "assignees": ['jmay@company.com', 'hmueller@company.com', 'smaier@company.com', 'mmutschler@company.com'] // mail-address
        }
    ],
    // [ // In Progress
    //     {
    //         "title": "Task B",
    //         "desc": "Do this and that",
    //         "cat": "Sales",
    //         "date": "2023-01-13",
    //         "assignees": ['aalles@company.com', 'rzufall@company.com'] // mail-address
    //     },
    //     {
    //         "title": "Task E",
    //         "desc": "Improve the code",
    //         "cat": "Developement",
    //         "date": "2023-03-13",
    //         "assignees": ['aalles@company.com', 'hmueller@company.com']
    //     }
    // ],
    // [ // Awaiting Feedback
    //     {
    //         "title": "Task C",
    //         "desc": "Do more stuff",
    //         "cat": "Marketing",
    //         "date": "2023-01-22",
    //         "prio": 2,
    //         "subtasks": [

    //         ],
    //         "assignees": ['jmay@company.com']
    //     },
    //     {
    //         "title": "Task D",
    //         "desc": "Sell some stuff",
    //         "cat": "Sales",
    //         "date": "2023-03-14",
    //         "assignees": ['rzufall@company.com', 'smaier@company.com']
    //     }
    // ],
    // [ // Done

    // ]
];

// 'color' refers to CSS classes
let categories = [
    {
        "name": "Sales",
        "color": "lightpink"
    },

    {
        "name": "Marketing",
        "color": "blue"
    },

    {
        "name": "Design",
        "color": "turquoise"
    },

    {
        "name": "Developement",
        "color": "red"
    }
];