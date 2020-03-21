// these questions are stored in an array of objects
const questions=[
    {
        question: "The answer is #3",
        choices: ["choose not thou 1","neither choose thou 2","accepting then that thou choose 3","4 is right out"],
        answer: 2 // remember that index start at 0
    },
    {
        question: "What does HTML stand for?",
        choices: ["Hyperlinks and Text Markdown Language","Hyper Text Markup Language","Home Tool Markdown Language", "Hyperlinked and Tooled Markup Language"],
        answer: 1 
    },
    {
        question: "Who is making the Web standards?",
        choices: ["The World Wide Web Consortium", "Microsoft", "Google","Mozilla"],
        answer:0
    },
    {
        question: "Choose the correct HTML element for the largest heading:",
        choices: ["<heading>", "<h6>", "<head>", "<h1>"],
        answer: 3
    },
    {
        question: "Choose the correct HTML element to define important text",
        choices: ["<important>","<i>","<strong>","<b>"],
        answer:2
    },
    {
        question: "Choose the correct HTML element to define bold text",
        choices: ["<important>","<i>","<strong>","<b>"],
        answer:3
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        choices: ["<break>","<lb>","<br>","<\\n"],
        answer:2
    },
    {
        question: "Choose the correct HTML element to define emphasized text",
        choices: ["<em>","<italic>","<emphasize>","<i>"],
        answer:0
    },
    {
        question: "Choose the correct HTML element to define italicized text",
        choices: ["<em>","<italic>","<emphasize>","<i>"],
        answer:3
    },
    {
        question: "What is the correct HTML for adding a background color?" ,
        choices: ["<background>yellow</background>","<body style=\"background-color:yellow;\">","body bg=\"yellow\">"],
        answer:1
    },
    {
        question: "What is the correct HTML for creating a hyperlink?",
        choices: ["<a name=\"http://www.placeholder.com\">link</a>","<a href=\"http://www.placeholder.com\">link</a>","<a src=\"http://www.placeholder.com\">link</a>","<a url=\"http://www.placeholder.com\">link</a>"],
        answer:1
    },
    {
        question: "Which character is used to indicate an end tag?",
        choices: ["^","<","/","*"],
        answer:2
    },
    {
        question: "How can you open a link in a new tab/browser window?",
        choices: ["<a href=\"url\" target=\"_blank\">", "<a href=\"url\" target=\"new\">", "<a href=\"url\" tab=\"new\"","<a href=\"url\" new"],
        answer:0
    },
    {
        question: "Which of these elements are all <table> elements?",
        choices: ["<table><head><tfoot>","<thead><body><tr>","<table><tr><tt>","<table><tr><td>"],
        answer:3
    },
    {
        question: "How can you make a numbered list?",
        choices: ["<ol>","<ul>","<nl>","<#l>"],
        answer:0
    },
    {
        question: "How can you make a bulleted list?",
        choices: ["<ol>","<ul>","<nl>","<bl>"],
        answer:1
    },
    {
        question: "What is the correct HTML for inserting an image?",
        choices: [ "<img src=\"image.gif\" alt=\"MyImage\">", "<image src=\"image.gif\" alt=\"MyImage\">", "<img href=\"image.gif\" alt=\"MyImage\">", "<img alt=\"MyImage\">image.gif</img>"],
        answer:0
    }
]