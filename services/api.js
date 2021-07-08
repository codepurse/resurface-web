appointment_list = [
  {
    id: 1,
    time_start: "11:30 am",
    time_end: "12:00 pm",
    date: "06/28/2021",
    duration: "30 min",
    name: "Quick meeting",
    type: "Business",
    location: "Philippines",
    Host: "Jason Brumback",
    participants: [
      {
        name: "Mike boyer",
        image: "",
      },
      {
        name: "Matt cheney",
        image: "",
      },
    ],
    commentary: "asdasdasadasdsadasdasdasdasd",
    notes: "For testing purposes",
  },
  {
    id: 2,
    time_start: "2:30 am",
    time_end: "4:00 pm",
    date: "06/30/2021",
    duration: "2:30 min",
    name: "Session with my patient",
    type: "Session",
    location: "Philippines",
    Host: "Jason Brumback",
    participants: [
      {
        name: "Mike boyer",
        image: "",
      },
      {
        name: "Matt cheney",
        image: "",
      },
    ],
    commentary: "asdasdasadasdsadasdasdasdasd",
    notes: "For testing purposes",
  },
];

time_entry = [
  {
    id: 1,
    date: "07/07/21",
    clinician: [
      {
        name: "Matt cheney",
        image: "http://localhost:3000/Image/profile.jpg"
      },
    ],
    client: "Rose B Burtin",
    event_type: "Session",
    time: "11:11 am",
    notes:
      "A fresh take on undergraduate meFacal revision: concise lectures, realistic clinical cases, applied self-assessment.",
  },
  {
    id: 2,
    date: "07/07/21",
    clinician: [
      {
        name: "Matt cheney",
        image: "http://localhost:3000/Image/profile.jpg"
      },
    ],
    client: "AJ Alden Collins",
    event_type: "Travel",
    time: "9:30 am",
    notes:
      "The initial visit is a period for you and your therapist to get to know each other and get an idea of how to proceed.",
  },
];

documents_files = [
  {
    id: 1,
    type: "folder",
    name: "Los Angeles",
    date_created: "12/12/2021",
    date_update: "12/12/2021",
    size: "9.0 MB",
  },
  {
    id: 2,
    type: "folder",
    name: "Orange country",
    date_created: "12/12/2021",
    date_update: "10/10/2021",
    size: "5.3 MB"
  },
  {
    id: 3,
    type: "jpg",
    name: "Screenshot.jpg",
    date_created: "05/06/2021",
    date_update: "05/06/2021",
    size: "1.0 MB"
  },
  {
    id: 4,
    type: "docx",
    name: "Session.docx",
    date_created: "01/05/2021",
    date_update: "02/06/2021",
    size: "3.5 MB"
  }
]


emr_list = [
  {
    id: "1",
    family: "Collins Family",
    location: "Orange Country",
    date_created: "01/05/2021",
    date_update: "01/05/2021",
    count: "3"
  },
  {
    id: "2",
    family: "Burtin Family",
    location: "Los Angeles",
    date_created: "03/05/2022",
    date_update: "05/06/2022",
    count: "2"
  }
]

directory_list = [
  {
    id:"1",
    name: "Jason Brumback",
    location: "Orange country",
    email: "jason@theresurfacegroup.com",
    type: "Super Admin",
    status: "Active",
    image: "http://localhost:3000/Image/profile.jpg"
  },
  {
    id: "2",
    name: "Rex R Ferguson",
    location: "Los Angeles",
    email: "Rex@resurfacegroup.com",
    type: "Clinician",
    status: "Draft",
    image: "http://localhost:3000/Image/images.jpg"
  }
]
