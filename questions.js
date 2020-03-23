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
    },

    /* CSS Questions */
    {
        question: "What does CSS stand for?",
        choices:["Cascading Style Sheets","Colorful Style Sheets","Computer Style Sheets","Creative Style Sheets"],
        answer: 0
    },
    
    
    {
        question: "What is the correct HTML for referring to an external style sheet?",
        choices:["<link rel=\"stylesheet\" type=\"text/css\" href=\"mystyle.css\">","<style src=\"mystyle.css\">","<stylesheet>mystyle.css</stylesheet>"],
        answer: 0
    },
    
    
    {
        question: "Where in an HTML document is the correct place to refer to an external style sheet?",
        choices:["In the <head> section","At the end of the document","In the <body> section"],
        answer: 0
    },
    
    
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        choices:["<script>","<css>","<style>"],
        answer: 2
    },
    
    
    {
        question: "Which HTML attribute is used to define inline styles?",
        choices:["style","font","class","styles"],
        answer: 0
    },
    
    
    {
        question: "Which is the correct CSS syntax?",
        choices:["{body:color=black;}","body:color=black;","{body;color:black;}","body {color: black;}"],
        answer: 3
    },
    
    
    {
        question: "How do you insert a comment in a CSS file?",
        choices:["/* this is a comment */","// this is a comment //","' this is a comment","// this is a comment"],
        answer: 0
    },
    
    
    {
        question: "Which property is used to change the background color?",
        choices:["background-color","color","bgcolor"],
        answer: 0
    },
    
    
    {
        question: "How do you add a background color for all <h1> elements?",
        choices:["h1 {background-color:#FFFFFF;}","h1.all {background-color:#FFFFFF;}","all.h1 {background-color:#FFFFFF;}"],
        answer: 0
    },
    
    
    {
        question: "Which CSS property is used to change the text color of an element?",
        choices:["text-color","fgcolor","color"],
        answer: 2
    },
    
    
    {
        question: "Which CSS property controls the text size?",
        choices:["font-style","text-size","font-size","text-style"],
        answer: 2
    },
    
    
    {
        question: "What is the correct CSS syntax for making all the <p> elements bold?",
        choices:["<p style=\"font-size:bold;\">","<p style=\"text-size:bold;\">","p {font-weight:bold;}","p {text-size:bold;}"],
        answer: 2
    },
    
    
    {
        question: "How do you display hyperlinks without an underline?",
        choices:["a {text-decoration:none;}","a {text-decoration:no-underline;}","a {decoration:no-underline;}","a {underline:none;}"],
        answer: 0
    },
    
    
    {
        question: "How do you make each word in a text start with a capital letter?",
        choices:["text-transform:capitalize","transform:capitalize","text-style:capitalize","You can't do that with CSS"],
        answer: 0
    },
    
    
    {
        question: "Which property is used to change the font of an element?",
        choices:["font-weight","font-family","font-style"],
        answer: 1
    },
    
    
    {
        question: "How do you make the text bold?",
        choices:["font-weight:bold;","style:bold;","font:bold;"],
        answer: 0
    },
    
    
    
    {
        question: "Which property is used to change the left margin of an element?",
        choices:["indent","margin-left","padding-left"],
        answer: 1
    },
    
    
    {
        question: "When using the padding property; are you allowed to use negative values?",
        choices:["No","Yes"],
        answer: 0
    },
    
    
    {
        question: "How do you make a list that lists its items with squares?",
        choices:["list: square;","list-type: square;","list-style-type: square;"],
        answer: 2
    },
    
    
    {
        question: "How do you select an element with id 'demo'?",
        choices:["demo",".demo","#demo","*demo"],
        answer: 2
    },
    
    
    {
        question: "How do you select elements with class name 'test'?",
        choices:["*test","test","#test",".test"],
        answer: 3
    },
    
    
    {
        question: "How do you select all p elements inside a div element?",
        choices:["div.p","div + p","div p"],
        answer: 2
    },
    
    
    {
        question: "How do you group selectors?",
        choices:["Separate each selector with a comma","Separate each selector with a plus sign","Separate each selector with a space"],
        answer: 0
    },
    
    
    {
        question: "What is the default value of the position property?",
        choices:["relative","static","absolute","fixed"],
        answer: 1
    }
]