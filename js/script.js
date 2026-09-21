document.addEventListener("DOMContentLoaded", () => {

    const roles = [
        "Building AI-powered software for real businesses.",
        "Python Developer",
        "AI Automation Builder",
        "Future Machine Learning Engineer",
        "AI & Data Science Student"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const typing = document.getElementById("typing");

    function typeEffect() {
        const current = roles[roleIndex];

        if (!deleting) {
            typing.textContent = current.substring(0, charIndex++);
        } else {
            typing.textContent = current.substring(0, charIndex--);
        }

        let speed = deleting ? 40 : 80;

        if (!deleting && charIndex === current.length + 1) {
            deleting = true;
            speed = 1400;
        }

        if (deleting && charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();

});

/* =========================
   Smooth Spotlight Effect
========================= */

const spotlight = document.querySelector(".spotlight");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let currentX = mouseX;
let currentY = mouseY;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateSpotlight(){
    currentX += (mouseX - currentX) * 0.18;
    currentY += (mouseY - currentY) * 0.18;

    if(spotlight){
        spotlight.style.left = currentX + "px";
        spotlight.style.top = currentY + "px";
    }

    requestAnimationFrame(animateSpotlight);
}

animateSpotlight();

/* ================= Animated Counters ================= */

const counters = document.querySelectorAll(".stat-card h1");

const counterObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const counter = entry.target;
            const target = +counter.dataset.target;

            let count = 0;
            const speed = target / 80;

            function updateCounter(){
                if(count < target){
                    count += speed;
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(updateCounter);
                }else{
                    counter.innerText = target;
                }
            }

            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
});

counters.forEach(counter=> counterObserver.observe(counter));

/* ================= PROJECT POPUP ================= */

const projects = {
    expense:{
        title:"Expense Tracker AI",
        category:"PYTHON PROJECT",
        image:"assets/projects/expense-tracker.png",
        github:"https://github.com/JineshShingvi0/ai-expense-tracker-python-mysql",
        demo:"https://ai-expense-manager-u5yp.onrender.com",
        description:"AI-powered finance management platform with income, expenses, budgets, reports and future AI assistant integration.",
        tech:["Python","MySQL","AI","Analytics"],
        features:[
            "Track income and expenses.",
            "Monthly budget planning.",
            "Expense categories.",
            "Financial reports dashboard.",
            "AI spending assistant (Coming Soon)."
        ]
    },
    billing:{
        title:"Shingvi Supermart Billing Software",
        category:"BUSINESS SOFTWARE",
        image:"assets/projects/billing.png",
        github:"https://github.com/JineshShingvi0/python-mysql-inventory-management-gui",
        demo:"#",
        description:"Retail billing platform with customer management, WhatsApp reminders, loyalty points, inventory and GST billing.",
        tech:["Google Apps Script","Google Sheets","WhatsApp API"],
        features:[
            "Customer phone lookup.",
            "Loyalty points.",
            "Oil refill reminders.",
            "Inventory management.",
            "GST invoice generation."
        ]
    },
    cake:{
        title:"Soft & Sweet Cake Shop Website",
        category:"WEB PROJECT",
        image:"assets/projects/cake-shop.png",
        github:"https://github.com/YOUR_USERNAME/cake-shop-website",
        demo:"https://softandsweetcakeshopee.netlify.app",
        description:"Responsive cake ordering website with WhatsApp ordering, product catalog and customer feedback system.",
        tech:["HTML","CSS","JavaScript"],
        features:[
            "Responsive design.",
            "WhatsApp ordering.",
            "Cake catalog.",
            "Feedback section.",
            "Modern UI."
        ]
    },
    node:{
        title:"Node-RED Automation Hub",
        category:"AUTOMATION PROJECT",
        image:"assets/projects/node-red.png",
        github:"https://github.com/YOUR_USERNAME/node-red-projects",
        demo:"#",
        description:"Collection of Node-RED automations including weather alerts, WhatsApp chatbot, PDF monitor and bulk emails.",
        tech:["Node-RED","JavaScript","Automation"],
        features:[
            "WhatsApp chatbot.",
            "Weather alerts.",
            "PDF monitoring.",
            "Bulk email automation.",
            "IoT workflows."
        ]
    },
    student:{
        title:"Student Result Management System",
        category:"PYTHON PROJECT",
        image:"assets/projects/student-system.png",
        github:"https://github.com/JineshShingvi0/student-management-system-python-mysql",
        demo:"#",
        description:"Python console application with CRUD operations, JSON storage and automatic result calculation.",
        tech:["Python","JSON","OOP"],
        features:[
            "Add/Edit/Delete students.",
            "Search student.",
            "Result calculation.",
            "JSON database.",
            "Menu driven interface."
        ]
    }
};

const modal = document.getElementById("projectModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");
const modalFeatures = document.getElementById("modalFeatures");

const buttons = document.querySelectorAll(".view-project");

buttons.forEach(button=>{
    button.addEventListener("click",()=>{
        const project = projects[button.dataset.project];
        const githubBtn = document.querySelector(".github-btn");
        const demoBtn = document.querySelector(".demo-btn");

        if(githubBtn) githubBtn.href = project.github;
        if(demoBtn) demoBtn.href = project.demo;

        if(modal) modal.classList.add("active");
        document.body.style.overflow = "hidden";

        if(modalImage) modalImage.src = project.image;
        if(modalTitle) modalTitle.innerText = project.title;
        if(modalCategory) modalCategory.innerText = project.category;
        if(modalDescription) modalDescription.innerText = project.description;

        if(modalTech){
            modalTech.innerHTML = "";
            project.tech.forEach(item=>{
                modalTech.innerHTML += `<span>${item}</span>`;
            });
        }

        if(modalFeatures){
            modalFeatures.innerHTML = "";
            project.features.forEach(feature=>{
                modalFeatures.innerHTML += `<li>${feature}</li>`;
            });
        }
    });
});

const closeModalBtn = document.querySelector(".close-modal");
if(closeModalBtn){
    closeModalBtn.addEventListener("click", closeModal);
}

if(modal){
    modal.addEventListener("click",(e)=>{
        if(e.target === modal){
            closeModal();
        }
    });
}

function closeModal(){
    if(modal) modal.classList.remove("active");
    document.body.style.overflow = "auto";
}

/* ===== JOURNEY TIMELINE ===== */

const timelineItems = document.querySelectorAll(".timeline-item");
const timelineLine = document.querySelector(".timeline-line");

function revealTimeline() {
  timelineItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      item.classList.add("show");
    }
  });

  const timeline = document.querySelector(".timeline");
  if(timeline && timelineLine){
      const rect = timeline.getBoundingClientRect();
      const totalHeight = timeline.offsetHeight;
      const scrollDistance = (window.innerHeight * 0.4) - rect.top;
      const progress = Math.min(Math.max(scrollDistance / totalHeight, 0), 1);
      timelineLine.style.setProperty("--timelineFill", `${progress * 100}%`);
  }
}

window.addEventListener("scroll", revealTimeline);
window.addEventListener("load", revealTimeline);

/* ==========================================
   GITHUB HEATMAP
========================================== */

const githubGrid = document.getElementById("githubGrid");

if (githubGrid) {
  for (let i = 0; i < 240; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    const random = Math.random();

    if (random > 0.75) square.classList.add("active4");
    else if (random > 0.55) square.classList.add("active3");
    else if (random > 0.35) square.classList.add("active2");
    else if (random > 0.2) square.classList.add("active1");

    githubGrid.appendChild(square);
  }
}

/* ==========================================
   EARTH PARALLAX EFFECT
========================================== */

const earth = document.querySelector('.earth-wrapper');

if(earth){
    window.addEventListener('mousemove',(e)=>{
        const x = (window.innerWidth/2 - e.clientX)/35;
        const y = (window.innerHeight/2 - e.clientY)/35;
        earth.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    });
}

/* ==========================================
   CONTACT FORM (Email Redirect)
========================================== */

const contactForm = document.getElementById("contactForm");

if(contactForm){
    contactForm.addEventListener("submit",function(e){
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        const subject = `Portfolio Contact from ${name}`;
        const body = `Name: ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`;

        window.location.href = `mailto:jineshshingvi2@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}

/* ==========================================
   JINESH AI ASSISTANT CHATBOT LOGIC
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    const aiOrbBtn = document.getElementById("aiOrbBtn");
    const aiChatWindow = document.getElementById("aiChatWindow");
    const aiCloseBtn = document.getElementById("aiCloseBtn");
    const aiChatBody = document.getElementById("aiChatBody");
    const aiUserInput = document.getElementById("aiUserInput");
    const aiSendBtn = document.getElementById("aiSendBtn");
    const suggestionChips = document.querySelectorAll(".suggestion-chip");

    if (!aiOrbBtn) return;

    aiOrbBtn.addEventListener("click", () => {
        aiChatWindow.classList.toggle("active");
        if (aiChatWindow.classList.contains("active")) {
            aiUserInput.focus();
        }
    });

    if (aiCloseBtn) {
        aiCloseBtn.addEventListener("click", () => {
            aiChatWindow.classList.remove("active");
        });
    }

    function getAIResponse(query) {
        const q = query.toLowerCase();

        if (q.includes("expense") || q.includes("tracker") || q.includes("money") || q.includes("finance")) {
            return "💰 **Expense Tracker AI**: A flagship Python & MySQL application built by Jinesh featuring income/expense management, budget planning, category tracking, analytics, and an upcoming AI assistant integration!";
        } 
        else if (q.includes("billing") || q.includes("supermart") || q.includes("shop") || q.includes("oil")) {
            return "🛒 **Shingvi Supermart Billing Software**: Retail automation software built for an oil business with customer database lookup, phone auto-fill, loyalty points, GST invoicing, stock tracking, and WhatsApp reminder APIs!";
        }
        else if (q.includes("node") || q.includes("automation") || q.includes("weather") || q.includes("chatbot")) {
            return "⚙️ **Node-RED Automation Hub**: Jinesh's automation portfolio featuring OpenWeather API weather alerts, WhatsApp chatbot flows, PDF monitoring, and bulk email automation.";
        }
        else if (q.includes("education") || q.includes("college") || q.includes("aissms") || q.includes("ioit") || q.includes("study") || q.includes("degree")) {
            return "🎓 **Education**: Jinesh is a first-year B.Tech student pursuing Artificial Intelligence & Data Science at **AISSMS Institute of Information Technology (IOIT), Pune** (2026–2030).";
        }
        else if (q.includes("skill") || q.includes("python") || q.includes("mysql") || q.includes("javascript") || q.includes("tech")) {
            return "💻 **Tech Stack**: Jinesh specializes in Python, MySQL, JavaScript, HTML/CSS, Node-RED, Git/GitHub, Prompt Engineering, REST APIs, and Google Apps Script automation.";
        }
        else if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("reach") || q.includes("linkedin")) {
            return "📬 **Let's Connect!** You can reach Jinesh via email at **jineshshingvi2@gmail.com**, connect on LinkedIn, or check out his code repositories on GitHub!";
        }
        else if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
            return "Hello there! 👋 How can I help you learn more about Jinesh's AI & Software engineering projects?";
        }
        else {
            return "That's a great question! Jinesh is an AI & DS student at AISSMS IOIT building practical Python software, automation tools, and AI agents. Feel free to ask about his Expense Tracker, Supermart Billing, or skills!";
        }
    }

    function appendMessage(text, sender) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("ai-message");
        msgDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
        msgDiv.innerHTML = `<p>${text}</p>`;
        aiChatBody.appendChild(msgDiv);
        aiChatBody.scrollTop = aiChatBody.scrollHeight;
    }

    function handleUserMessage() {
        const text = aiUserInput.value.trim();
        if (!text) return;

        appendMessage(text, "user");
        aiUserInput.value = "";

        const typingDiv = document.createElement("div");
        typingDiv.classList.add("ai-message", "bot-message");
        typingDiv.id = "typingIndicator";
        typingDiv.innerHTML = `<p><i>AI is thinking...</i></p>`;
        aiChatBody.appendChild(typingDiv);
        aiChatBody.scrollTop = aiChatBody.scrollHeight;

        setTimeout(() => {
            const typingIndicator = document.getElementById("typingIndicator");
            if (typingIndicator) typingIndicator.remove();

            const reply = getAIResponse(text);
            appendMessage(reply, "bot");
        }, 800);
    }

    if (aiSendBtn) {
        aiSendBtn.addEventListener("click", handleUserMessage);
    }

    if (aiUserInput) {
        aiUserInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handleUserMessage();
        });
    }

    suggestionChips.forEach(chip => {
        chip.addEventListener("click", () => {
            const query = chip.getAttribute("data-query");
            aiUserInput.value = query;
            handleUserMessage();
        });
    });
});